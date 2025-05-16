import { fetchClient } from '@/api/fetchClient';
import { Schedule } from '@/types/schedule';

export const scheduleAPI = {
  getScheduleList: async (): Promise<Schedule[]> => {
    return fetchClient('/posts/schedules/list/', 'GET', { isAuth: true });
  },
};
