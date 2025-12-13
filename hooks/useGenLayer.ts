"use client";

import { GenLayerClient } from "@/lib/genlayerClient";

export function useGenLayer() {
  return new GenLayerClient();
}
