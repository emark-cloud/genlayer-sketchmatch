"use client";

import { create } from "zustand";

interface RoomState {
  players: string[];
  readyPlayers: string[];
  isHost: boolean;
  selfName: string | null;

  addPlayer: (name: string) => void;
  setReady: () => void;
  setHost: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  players: [],
  readyPlayers: [],
  isHost: false,
  selfName: null,

  addPlayer: (name: string) => {
    const { players, selfName } = get();

    // First player becomes host
    if (players.length === 0) {
      set({ isHost: true });
    }

    set({
      players: [...players, name],
      selfName: name
    });
  },

  setReady: () => {
    const { selfName, readyPlayers } = get();

    if (!selfName) return;

    if (!readyPlayers.includes(selfName)) {
      set({ readyPlayers: [...readyPlayers, selfName] });
    }
  },

  setHost: () => set({ isHost: true }),
}));
