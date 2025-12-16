"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRoomStore } from "@/lib/store";

export default function RoomLobby() {
  const { id } = useParams();
  const router = useRouter();

  const { players, addPlayer, isHost, setRoom } = useRoomStore();

  useEffect(() => {
    setRoom(id as string);
    const name = "Player-" + Math.random().toString(36).substring(2, 5);
    addPlayer(name);
  }, []);

  function startGame() {
    router.push(`/room/${id}/draw`);
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Room {id}</h1>

      <h2 className="text-xl font-semibold mb-2">Players</h2>

      <ul className="space-y-2">
        {players.map((p) => (
          <li key={p} className="bg-gray-100 p-3 rounded">
            {p}
          </li>
        ))}
      </ul>

      {isHost && (
        <button
          onClick={startGame}
          className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg"
        >
          Start Game
        </button>
      )}
    </main>
  );
}
