import { Moim, MoimPayload } from '@/types/moim';
import { fetchClient } from '../fetchClient';

export const moimsApi = {
  postMoims: async (payload: MoimPayload) => {
    return fetchClient('/api/posts', 'POST', {
      isAuth: true,
      body: payload,
    });
  },
  getMoimsList: async () => {
    return fetchClient(`/api/posts/`, 'GET', { isAuth: false });
  },
  getMoimDetail: async (id: Number) => {
    return fetchClient(`/api/posts/${id}/`, 'GET', { isAuth: false });
  },
  deleteMoim: async (id: Number) => {
    return fetchClient(`/api/posts/${id}/`, 'DELETE', { isAuth: true });
  },
  editMoim: async (id: Number, payload: MoimPayload) => {
    return fetchClient(`/api/posts/${id}/`, 'PUT', {
      isAuth: true,
      body: payload,
    });
  },
  applyMoim: async (id: Number, role: string) => {
    return fetchClient(`/api/posts/${id}/apply/`, 'POST', {
      isAuth: true,
      body: role,
    });
  },
  cancelMoim: async (id: Number) => {
    return fetchClient(`/api/posts/${id}/cancel/`, 'DELETE', { isAuth: true });
  },
  likeMoim: async (id: Number) => {
    return fetchClient(`/api/posts/${id}/like/`, 'POST', { isAuth: true });
  },
};
