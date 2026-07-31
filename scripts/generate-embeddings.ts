// scripts/generate-embeddings.ts
//
// One-time (and "whenever knowledge.ts changes") script.
// NOT part of the live app — run manually from your terminal:
//
//   npx tsx scripts/generate-embeddings.ts
//
// It reads KNOWLEDGE_CHUNKS, generates an embedding for each chunk via the
// OpenAI embeddings API, and writes the result to lib/knowledge-embeddings.json.

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Next.js auto-loads .env.local when running via `next dev`, but this script
// runs standalone via tsx, so we load it manually here.
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import { openai } from "../lib/openai";
import { KNOWLEDGE_CHUNKS } from "../lib/knowledge";

type EmbeddedChunk = {
  id: string;
  text: string;
  embedding: number[];
};

async function main() {
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