"use client";

import { GenLayerClient } from "genlayer";

export function useGenLayer() {
  const apiKey = process.env.NEXT_PUBLIC_GENLAYER_API_KEY ?? "";

  const client = new GenLayerClient({
    apiKey,
  });

  return client;
}
