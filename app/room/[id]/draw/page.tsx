"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";
import Timer from "@/components/Timer";
import { useWallet } from "@/hooks/useWallet";
import { useGenLayer } from "@/hooks/useGenLayer";

export default function DrawPage() {
  const { id } = useParams();
  const router = useRouter();
  const { account } = useWallet();
  const client = useGenLayer();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prompt, setPrompt] = useState("Loading prompt...");

  useEffect(() => {
    async function loadPrompt() {
      try {
        const res = await client.view("sketchmatch", "get_prompt", {});
        setPrompt(res.prompt);
      } catch {
        setPrompt("Draw something creative!");
      }
    }

    loadPrompt();
  }, []);

  async function handleSubmit(dataUrl: string) {
    if (isSubmitted) return;
    setIsSubmitted(true);

    await client.action("sketchmatch", "submit_drawing", {
      player: account || "anon-" + Math.random().toString(36).substring(2, 6),
      base64_img: dataUrl,
    });

    router.push(`/room/${id}/results`);
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Prompt</h1>

      <p className="bg-yellow-100 border border-yellow-300 p-4 rounded mb-4">
        {prompt}
      </p>

      <Timer seconds={60} onComplete={() => handleSubmit("AUTO")} />

      <DrawingCanvas onSubmit={handleSubmit} disabled={isSubmitted} />
    </main>
  );
}
