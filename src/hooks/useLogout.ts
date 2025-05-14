'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchClient } from '@api/fetchClient';

export const useLogout = () => {
  const router = useRouter();
  const { access, logout } = useAuthStore();

  const logoutHandler = async () => {
    try {
      await fetchClient('/api/auth/logout/', 'POST');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      logout();
      router.push('/auth/login');
    }
  };

  return logoutHandler;
};
