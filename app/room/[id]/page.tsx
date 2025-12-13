"use client";

import { useParams, useRouter } from "next/navigation";
import { useRoomStore } from "@/lib/store";
import { useEffect } from "react";

export default function RoomLobby() {
  const { id } = useParams();
  const router = useRouter();

  const {
    players,
    addPlayer,
    isHost,
    setHost,
    readyPlayers,
    setReady,
  } = useRoomStore();

  // Auto-register player
  useEffect(() => {
    const name = "Player-" + Math.random().toString(36).substring(2, 5);
    addPlayer(name);
  }, []);

  function startGame() {
    router.push(`/room/${id}/draw`);
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Room: {id}</h1>

      <h2 className="text-xl mt-6 font-semibold">Players</h2>
      <ul className="mt-2 space-y-2">
        {players.map((p) => (
          <li
            key={p}
            className="bg-gray-100 p-3 rounded flex items-center justify-between"
          >
            <span>{p}</span>
            <span
              className={`text-sm ${
                readyPlayers.includes(p) ? "text-green-600" : "text-gray-400"
              }`}
            >
              {readyPlayers.includes(p) ? "Ready" : "Not Ready"}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setReady()}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
      >
        Mark Ready
      </button>

      {isHost && (
        <button
          onClick={startGame}
          className="mt-4 w-full py-3 bg-green-600 text-white rounded-lg"
        >
          Start Game
        </button>
      )}
    </main>
  );
}
