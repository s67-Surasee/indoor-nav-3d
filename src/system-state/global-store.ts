// src/system-state/global-store.ts
import { create } from 'zustand';

interface AppState {
  currentFloor: number;
  userPosition: { x: number; y: number; z: number } | null;
  targetLocationId: string | null;
  
  setFloor: (floor: number) => void;
  setUserPosition: (x: number, y: number, z: number) => void;
  setTargetLocation: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  currentFloor: 1,
  userPosition: null,
  targetLocationId: null,

  setFloor: (floor) => set({ currentFloor: floor }),
  setUserPosition: (x, y, z) => set({ userPosition: { x, y, z } }),
  setTargetLocation: (id) => set({ targetLocationId: id }),
}));