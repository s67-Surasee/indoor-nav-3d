import axios from 'axios';
import { getGuestId } from './guest-id';

// สร้างตัวยิง API พื้นฐาน
export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // รอเปลี่ยนเป็น URL จริงของทีม Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// ด่านตรวจก่อนส่งออก (Interceptor)
apiClient.interceptors.request.use(
  (config) => {
    // ดึง ID ล่าสุดมา
    const guestId = getGuestId();
    
    // ถ้ามี ID ให้ยัดใส่ Header x-guest-id
    if (guestId) {
      config.headers['x-guest-id'] = guestId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);