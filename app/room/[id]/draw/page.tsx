"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";
import { useWallet } from "@/hooks/useWallet";
import { useGenLayer } from "@/hooks/useGenLayer";

export default function DrawPage() {
  const { id } = useParams();
  const router = useRouter();
  const { account } = useWallet();
  const client = useGenLayer();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(dataUrl: string) {
    if (isSubmitted || isSubmitting) return;

    if (!dataUrl.startsWith("data:image")) {
      alert("Invalid drawing. Please try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      await client.action("sketchmatch", "submit_drawing", {
        player:
          account || "anon-" + Math.random().toString(36).slice(2, 6),
        base64_img: dataUrl,
      });

      setIsSubmitted(true);
      router.push(`/room/${id}/results`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit drawing. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Draw your submission</h1>

      <DrawingCanvas
        onSubmit={handleSubmit}
        disabled={isSubmitted || isSubmitting}
      />
    </main>
  );
}
