"use client";

import { create } from "zustand";

interface RoomState {
  roomId: string | null;
  players: string[];
  selfName: string | null;
  isHost: boolean;
  drawings: Record<string, string>;
  roundEvaluated: boolean;

  setRoom: (id: string) => void;
  addPlayer: (name: string) => void;
  resetRoom: () => void;
  saveDrawing: (player: string, img: string) => void;
  setRoundEvaluated: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
  roomId: null,
  players: [],
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

  resetRoom: () =>
    set({
      roomId: null,
      players: [],
      selfName: null,
      isHost: false,
      drawings: {},
      roundEvaluated: false,
    }),

  saveDrawing: (player, img) =>
    set((state) => ({
      drawings: {
        ...state.drawings,
        [player]: img,
      },
    })),

  setRoundEvaluated: () => set({ roundEvaluated: true }),
}));
