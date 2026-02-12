// src/system-state/guest-id.ts
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'nav_guest_id';

export const getGuestId = (): string => {
  let guestId = localStorage.getItem(STORAGE_KEY);
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem(STORAGE_KEY, guestId);
    console.log('[System] New Guest ID Created:', guestId);
  }
  return guestId;
};