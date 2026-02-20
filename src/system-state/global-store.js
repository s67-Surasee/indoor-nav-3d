import { create } from 'zustand';

export const useStore = create((set) => ({
  // --- ค่าเริ่มต้น ---
  guestId: null,
  currentFloor: 1, 
  userPosition: null,
  targetLocation: null,
  navigationPath: [],
  selectedAvatar: null,

  // --- ฟังก์ชันเปลี่ยนค่า ---
  setGuestId: (id) => set({ guestId: id }),
  setFloor: (floor) => set({ currentFloor: floor }),
  setUserPosition: (pos) => set({ userPosition: pos }),
  setTargetLocation: (target) => set({ targetLocation: target }),
  setNavigationPath: (path) => set({ navigationPath: path }),
  setAvatar: (avatarId) => set({ selectedAvatar: avatarId }),
  
  resetNavigation: () => set({ targetLocation: null, navigationPath: [] }),
}));