"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGenLayer } from "@/hooks/useGenLayer";
import { useRoomStore } from "@/lib/store";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const client = useGenLayer();
  const { isHost } = useRoomStore();

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [evaluated, setEvaluated] = useState(false);

  async function evaluate() {
  try {
    const res = await client.action("sketchmatch", "evaluate_round", {});
    console.log("Evaluation result:", res);
  } catch (err) {
    console.error("Evaluation error:", err);
  }

  await fetchResults();
}


  async function fetchResults() {
    const data = await client.view("sketchmatch", "get_leaderboard", {});
    setLeaderboard(data.leaderboard);
    setEvaluated(data.evaluated);
  }

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

      {!evaluated && isHost && (
        <button
          onClick={evaluate}
          className="bg-blue-600 text-white w-full py-3 rounded-lg mb-4"
        >
          Evaluate Round
        </button>
      )}

      <ul className="space-y-3">
        {leaderboard.map(([player, score], index) => (
          <li
            key={player}
            className="flex justify-between bg-gray-100 p-3 rounded"
          >
            <span>
              {index + 1}. {player}
            </span>
            <span>{score} pts</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-800 text-white w-full py-3 rounded-lg"
      >
        Play Again
      </button>
    </main>
  );
}
