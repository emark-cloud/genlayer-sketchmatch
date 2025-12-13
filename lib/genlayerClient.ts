import { GenLayerClient } from "genlayer";

export function createGenLayerClient() {
  const apiKey = process.env.NEXT_PUBLIC_GENLAYER_API_KEY || "";

  if (!apiKey) {
    console.warn("⚠️ Warning: GenLayer API key missing.");
  }

  return new GenLayerClient({
    apiKey,
  });
}
