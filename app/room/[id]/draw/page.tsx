"use client";

import { useParams, useRouter } from "next/navigation";
import DrawingCanvas from "@/components/DrawingCanvas";
import Timer from "@/components/Timer";
import { useState } from "react";
import { useGenLayer } from "@/hooks/useGenLayer";
import { useWallet } from "@/hooks/useWallet";

export default function DrawPage() {
  const { id } = useParams();
  const router = useRouter();
  const client = useGenLayer();
  const { account } = useWallet();

  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(dataUrl: string) {
  if (isSubmitted) return;

  setIsSubmitted(true);

  try {
    await client.action("sketchmatch", "submit_drawing", {
      player: account || "anon-" + Math.random().toString(36).substring(2, 6),
      base64_img: dataUrl,
    });
  } catch (err) {
    console.error("Submission failed:", err);
  }

  router.push(`/room/${id}/results`);
}

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Draw the Prompt</h1>

      <Timer seconds={60} onComplete={() => router.push(`/room/${id}/results`)} />

      <DrawingCanvas onSubmit={handleSubmit} disabled={isSubmitted} />

      {isSubmitted && (
        <p className="text-center text-gray-500 mt-4">
          Submission sent! Waiting for results…
        </p>
      )}
    </main>
  );
}
