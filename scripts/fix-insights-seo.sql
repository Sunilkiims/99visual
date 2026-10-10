-- scripts/fix-insights-seo.sql
-- ─────────────────────────────────────────────────────────────────────────────
-- One-off data clean-up for the Insights SEO rows. NOT run automatically.
--
-- Why: the admin API used to save every article's canonical URL as
--   https://99visualsolutions.com/insights/<slug>
-- (a different domain), and the og/twitter title/description columns kept
-- stale text from earlier article titles. The code no longer reads those bad
-- values, so the live pages are correct without this script — it only makes
-- the stored data match what the pages now render.
--
-- How to run (after deploying the code change), against the production DB:
--   psql "$DATABASE_URL" -f scripts/fix-insights-seo.sql
-- Review the SELECT output first; everything runs in one transaction.
-- ─────────────────────────────────────────────────────────────────────────────
BEGIN;

-- 1. Preview what will change.
SELECT p.slug, s."canonicalUrl", s."ogTitle", s."twitterTitle", s.robots
FROM post_seo s
JOIN posts p ON p.id = s."postId"
ORDER BY p.slug;

-- 2. Canonical → the article's own production URL.
UPDATE post_seo s
SET "canonicalUrl" = 'https://www.99visual.com/insights/' || p.slug
FROM posts p
WHERE p.id = s."postId"
  AND s."canonicalUrl" IS DISTINCT FROM 'https://www.99visual.com/insights/' || p.slug;

-- 3. Clear social fields the editor cannot edit (they can only be stale).
UPDATE post_seo
SET "ogTitle" = NULL,
    "ogDescription" = NULL,
    "twitterTitle" = NULL,
    "twitterDescription" = NULL;

-- 4. Settings default pointed at the wrong domain as well.
UPDATE settings SET "siteUrl" = 'https://www.99visual.com'
WHERE "siteUrl" IS DISTINCT FROM 'https://www.99visual.com';

COMMIT;
