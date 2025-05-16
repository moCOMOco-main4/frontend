import { GetMoimLIST, moimCard, MoimPayload } from '@/types/moim';
import { fetchClient } from '../fetchClient';

export const moimsAPI = {
  postMoims: async (payload: MoimPayload): Promise<MoimPayload[]> => {
    return fetchClient('/posts/', 'POST', {
      isAuth: true,
      body: payload,
    });
  },
  getMoimsList: async (): Promise<GetMoimLIST[]> => {
    return fetchClient(`/posts/`, 'GET', { isAuth: true });
  },
  getMoimDetail: async (id: Number) => {
    return fetchClient(`/posts/${id}/`, 'GET', { isAuth: true });
  },
  deleteMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/`, 'DELETE', { isAuth: true });
  },
  editMoim: async (
    id: Number,
    payload: MoimPayload,
  ): Promise<MoimPayload[]> => {
    return fetchClient(`/posts/${id}/`, 'PUT', {
      isAuth: true,
      body: payload,
    });
  },
  applyMoim: async (id: Number, role: string) => {
    return fetchClient(`/posts/${id}/apply/`, 'POST', {
      isAuth: true,
      body: role,
    });
  },
  likeMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/like/`, 'POST', { isAuth: true });
  },
  disLikeMoim: async (id: Number) => {
    return fetchClient(`/posts/${id}/unlike/`, 'DELETE', { isAuth: true });
  },
};
