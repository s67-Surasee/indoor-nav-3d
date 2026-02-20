import { v4 as uuidv4 } from 'uuid';

const GUEST_ID_KEY = 'nav_guest_id';

// ฟังก์ชันดึงหรือสร้าง Guest ID
export const getGuestId = () => {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  
  // ถ้าไม่มี ID ในเครื่อง ให้สร้างใหม่
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem(GUEST_ID_KEY, guestId);
    console.log(`[System] New Guest ID Generated: ${guestId}`);
  }
  
  return guestId;
};