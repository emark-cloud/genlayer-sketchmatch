"use client";

import { GenLayerClient } from "@/lib/genlayerClient";

export function useGenLayer() {
  const apiKey = process.env.NEXT_PUBLIC_GENLAYER_API_KEY || "";

  return new GenLayerClient(apiKey);
}
