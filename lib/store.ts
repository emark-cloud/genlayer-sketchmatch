"use client";

import { create } from "zustand";

interface RoomState {
  roomId: string | null;
  players: string[];
  readyPlayers: string[];
  selfName: string | null;
  isHost: boolean;
  drawings: Record<string, string>; // player -> base64
  roundEvaluated: boolean;

  setRoom: (id: string) => void;
  addPlayer: (name: string) => void;
  setReady: () => void;
  setHost: () => void;
  saveDrawing: (player: string, img: string) => void;
  setRoundEvaluated: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  roomId: null,
  players: [],
  readyPlayers: [],
  selfName: null,
  isHost: false,
  drawings: {},
  roundEvaluated: false,

  setRoom: (id) => set({ roomId: id }),

  addPlayer: (name) => {
    const { players } = get();

    // First player becomes host
    if (players.length === 0) {
      set({ isHost: true });
    }

    set({
      players: [...players, name],
      selfName: name,
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

  saveDrawing: (player, img) => {
    const { drawings } = get();
    set({
      drawings: {
        ...drawings,
        [player]: img,
      },
    });
  },

  setRoundEvaluated: () => set({ roundEvaluated: true }),
}));
