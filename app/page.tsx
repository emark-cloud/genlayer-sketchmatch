"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  function createRoom() {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    router.push(`/room/${id}`);
  }

  function joinRoom() {
    if (!roomId.trim()) return;
    router.push(`/room/${roomId.toUpperCase()}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">SketchMatch</h1>

      <div className="bg-white shadow p-6 rounded-lg w-full max-w-md space-y-6">
        <button
          onClick={createRoom}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg"
        >
          Create New Room
        </button>

        <div className="text-center text-gray-500">OR</div>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full border rounded-lg p-3 text-lg"
        />

        <button
          onClick={joinRoom}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
        >
          Join Room
        </button>
      </div>
    </main>
  );
}
