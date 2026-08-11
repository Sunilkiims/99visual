// scripts/generate-embeddings.ts
//
// One-time (and "whenever knowledge.ts changes") script.
// NOT part of the live app — run manually from your terminal:
//
//   npx tsx scripts/generate-embeddings.ts

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Next.js auto-loads .env.local when running via `next dev`, but this script
// runs standalone via tsx, so we load it manually here — BEFORE importing
// lib/openai, which needs it available at module-init time.
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

type EmbeddedChunk = {
  id: string;
  text: string;
  embedding: number[];
};

async function main() {
  // Dynamic imports here run AFTER dotenv.config() above, unlike static
  // imports which get hoisted to the top of the file regardless of position.
  const { openai } = await import("../lib/openai");
  const { KNOWLEDGE_CHUNKS } = await import("../lib/knowledge");

  console.log(`Embedding ${KNOWLEDGE_CHUNKS.length} knowledge chunks...`);

  const results: EmbeddedChunk[] = [];

  for (const chunk of KNOWLEDGE_CHUNKS) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk.text,
    });

    results.push({
      id: chunk.id,
      text: chunk.text,
      embedding: response.data[0].embedding,
    });

    console.log(`  ✓ Embedded: ${chunk.id}`);
  }

  const outPath = path.join(process.cwd(), "lib", "knowledge-embeddings.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

  console.log(`\nDone. Wrote ${results.length} embeddings to lib/knowledge-embeddings.json`);
}

main().catch((err) => {
  console.error("Failed to generate embeddings:", err);
  process.exit(1);
});