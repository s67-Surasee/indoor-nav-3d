// src/system-state/api-client.ts
import axios from 'axios';
import { getGuestId } from './guest-id';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // แก้เป็น URL Backend ของพี่ไปป์
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const guestId = getGuestId();
  if (guestId) {
    config.headers['x-guest-id'] = guestId;
  }
  return config;
});