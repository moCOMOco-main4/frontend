import { fetchClient } from '@/api/fetchClient';
import { moimCard } from '@/components/moim/moimcard/types';

export const myMoimAPI = {
  getLikedList: async (): Promise<moimCard[]> => {
    return fetchClient('/api/v1/posts/liked/', 'GET', { isAuth: true });
  },
  getJoinedList: async (): Promise<moimCard[]> => {
    return fetchClient('/api/v1/posts/applied/', 'GET', { isAuth: true });
  },
  deleteMyMoim: async (id: number) => {
    return fetchClient(`/api/v1/posts/${id}/cancel/`, 'DELETE', {
      isAuth: true,
    });
  },
};
