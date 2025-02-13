import axios from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store';

const apiClient = axios.create({
  withCredentials: true, // ✅ 쿠키 자동 전송
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'https://bibimfront.vercel.app/',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['authorization'];
    if (newAccessToken) {
      useAuthStore.getState().updateAccessToken(newAccessToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)
export default apiClient; 