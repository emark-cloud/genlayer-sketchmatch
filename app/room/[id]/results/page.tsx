"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGenLayer } from "@/hooks/useGenLayer";
import { useRoomStore } from "@/lib/store";
import Leaderboard from "@/components/Leaderboard";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const client = useGenLayer();
  const { isHost } = useRoomStore();

  const [leaderboard, setLeaderboard] = useState<[string, number][]>([]);
  const [evaluated, setEvaluated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function evaluateRound() {
    setLoading(true);
    try {
      await client.action("sketchmatch", "evaluate_round", {});
    } catch (err) {
      console.error("Evaluation failed:", err);
    }
    await fetchLeaderboard();
    setLoading(false);
  }

  async function fetchLeaderboard() {
    try {
      const data = await client.view("sketchmatch", "get_leaderboard", {});
      setLeaderboard(data.leaderboard);
      setEvaluated(data.evaluated);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

      {!evaluated && isHost && (
        <button
          onClick={evaluateRound}
          disabled={loading}
          className="bg-blue-600 text-white w-full py-3 rounded-lg mb-4"
        >
          {loading ? "Evaluating..." : "Evaluate Round"}
        </button>
      )}

      <Leaderboard leaderboard={leaderboard} />

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-800 text-white w-full py-3 rounded-lg"
      >
        Play Again
      </button>
    </main>
  );
}
