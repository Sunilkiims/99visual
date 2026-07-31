// lib/retrieve.ts
//
// Real retrieval step for RAG: embeds the user's question, compares it against
// pre-computed chunk embeddings (lib/knowledge-embeddings.json) using cosine
// similarity, and returns the most relevant chunks of text.

import { openai } from "./openai";
import knowledgeEmbeddings from "./knowledge-embeddings.json";

type EmbeddedChunk = {
  id: string;
  text: string;
  embedding: number[];
};

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export type RetrievedChunk = {
  id: string;
  text: string;
  score: number;
};

/**
 * Given a user query, returns the topK most semantically relevant
 * knowledge chunks, ranked by cosine similarity.
 */
export async function retrieveRelevantChunks(
  query: string,
  topK: number = 3
): Promise<RetrievedChunk[]> {
  const queryEmbeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  });

  const queryVector = queryEmbeddingResponse.data[0].embedding;

  const chunks = knowledgeEmbeddings as EmbeddedChunk[];

  const scored: RetrievedChunk[] = chunks.map((chunk) => ({
    id: chunk.id,
    text: chunk.text,
    score: cosineSimilarity(queryVector, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK);
}

/**
 * Convenience helper: returns retrieved chunks joined into a single string,
 * ready to drop into a system prompt.
 */
export async function retrieveContextString(
  query: string,
  topK: number = 3
): Promise<string> {
  const chunks = await retrieveRelevantChunks(query, topK);
  return chunks.map((c) => `- ${c.text}`).join("\n");
}