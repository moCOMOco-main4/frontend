import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { Schedule } from '@/types/schedule';

export const useSchedules = () => {
  const { access } = useAuthStore();

  return useQuery<Schedule[]>({
    queryKey: ['schedules'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.mocomoco.store/posts/schedules/list/',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      );
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
  });
};
