"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRoomStore } from "@/lib/store";

export default function HomePage() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const resetRoom = useRoomStore((s) => s.resetRoom);

  function createRoom() {
    resetRoom(); // 🔥 critical fix
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/room/${id}`);
  }

  function joinRoom() {
    if (!roomId.trim()) return;
    resetRoom(); // also reset on join
    router.push(`/room/${roomId.toUpperCase()}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8">SketchMatch</h1>

      <div className="bg-white shadow p-6 rounded-lg w-full max-w-md space-y-6">
        <button
          onClick={createRoom}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Create New Room
        </button>

        <div className="text-center text-gray-500">OR</div>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={joinRoom}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          Join Room
        </button>
      </div>
    </main>
  );
}
