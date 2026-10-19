// lib/schema-date.ts
// ─────────────────────────────────────────────────────────────────────────────
// Date validation / serialisation for JSON-LD.
//
// WHY THIS EXISTS
// Google Search Console reported "Invalid datetime value" for `dateModified`
// on the /about ProfilePage. Google types ProfilePage.dateCreated/dateModified
// as DateTime, and that node emitted `dateModified: "2025-06-01"` — a bare
// calendar date with no time or offset — while its `dateCreated` was the full
// "2023-01-01T00:00:00+05:30" (which is why only dateModified was flagged).
//
// The site still mixed bare dates ("2026-09-12") and full date-times across
// every page's JSON-LD, so the same warning could reappear for any DateTime-
// typed property. Every graph now passes through `normaliseSchemaDates()`
// (called by buildGraph in lib/schema.ts), which:
//
//   • turns a bare "YYYY-MM-DD" into "YYYY-MM-DDT00:00:00+05:30" — start of
//     that day in the business's own time zone (IST). This adds no new claim:
//     it is the same calendar day, written in the format Google expects;
//   • turns Date objects and Unix timestamps into ISO 8601 strings;
//   • passes through strings that are already valid ISO 8601 date-times;
//   • DROPS the property entirely when the value is empty, null, undefined,
//     an Invalid Date, or any other string that isn't a real ISO 8601 date
//     (e.g. "19/10/2026", "Oct 19, 2026"). These properties are optional, so
//     omitting a bad value is correct; inventing one (e.g. `new Date()`) is not.
// ─────────────────────────────────────────────────────────────────────────────

/** Offset used for bare calendar dates — the business is in Bengaluru (IST). */
const SITE_UTC_OFFSET = '+05:30';

/**
 * schema.org properties whose values are dates/date-times. Normalised wherever
 * they appear in a graph, at any depth. `foundingDate` is intentionally absent:
 * it is a schema.org `Date` and a year-only value ("2020") is legitimate.
 */
export const SCHEMA_DATE_KEYS = [
  'dateCreated',
  'dateModified',
  'datePublished',
  'dateUpdated',
  'datePosted',
  'uploadDate',
  'validThrough',
  'validFrom',
  'startDate',
  'endDate',
  'expires',
] as const;

const DATE_KEY_SET: ReadonlySet<string> = new Set(SCHEMA_DATE_KEYS);

export type SchemaDateInput = string | number | Date | null | undefined;

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
// ISO 8601 date-time with mandatory time-zone designator (Z or ±hh:mm).
const DATE_TIME =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,9})?)?(Z|[+-]\d{2}:\d{2})$/;

function isRealCalendarDate(y: number, m: number, d: number): boolean {
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/**
 * Converts a date value into a valid ISO 8601 date-time string, or returns
 * `undefined` when the value isn't a trustworthy date. Never falls back to
 * "now".
 */
export function toSchemaDateTime(value: SchemaDateInput): string | undefined {
  if (value === null || value === undefined) return undefined;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value <= 0) return undefined;
    // Heuristic: < 1e11 is seconds (covers dates up to year 5138), else ms.
    const ms = value < 1e11 ? value * 1000 : value;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
  }

  if (typeof value !== 'string') return undefined;
  const s = value.trim();
  if (!s) return undefined;

  const dateOnly = DATE_ONLY.exec(s);
  if (dateOnly) {
    const [, y, m, d] = dateOnly;
    if (!isRealCalendarDate(+y, +m, +d)) return undefined;
    return `${s}T00:00:00${SITE_UTC_OFFSET}`;
  }

  const dateTime = DATE_TIME.exec(s);
  if (dateTime) {
    const [, y, m, d, hh, mm, ss = '0'] = dateTime;
    if (!isRealCalendarDate(+y, +m, +d)) return undefined;
    if (+hh > 23 || +mm > 59 || +ss > 59) return undefined;
    return Number.isNaN(Date.parse(s)) ? undefined : s;
  }

  // Locale strings, slashes, missing offsets, Unix timestamps-as-strings, etc.
  return undefined;
}

/**
 * Deep-walks a JSON-LD value and normalises every date property listed in
 * SCHEMA_DATE_KEYS. Invalid values are removed (and logged at build/render
 * time so they can be fixed at the source). Returns a new object; the input
 * is not mutated (the shared org/website nodes are module-level constants).
 */
export function normaliseSchemaDates<T>(input: T, path = '$'): T {
  if (Array.isArray(input)) {
    return input.map((v, i) => normaliseSchemaDates(v, `${path}[${i}]`)) as T;
  }
  if (input === null || typeof input !== 'object' || input instanceof Date) {
    return input;
  }

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (DATE_KEY_SET.has(key)) {
      const iso = toSchemaDateTime(value as SchemaDateInput);
      if (iso) {
        out[key] = iso;
      } else if (value !== undefined && value !== null && value !== '') {
        console.warn(
          `[schema] Dropped invalid ${key} at ${path}.${key}: ${JSON.stringify(value)}`,
        );
      }
      continue;
    }
    out[key] = normaliseSchemaDates(value, `${path}.${key}`);
  }
  return out as T;
}
