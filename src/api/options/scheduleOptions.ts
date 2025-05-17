import { scheduleAPI } from '@/api/functions/scheduleAPI';
import { QueryClient, queryOptions } from '@tanstack/react-query';

export const scheduleOption = {
  scheduleList: (postId: number) =>
    queryOptions({
      queryKey: ['schedule', postId],
      queryFn: () => scheduleAPI.getScheduleList(postId),
    }),
  postSchedule: (postId: number, queryClient: QueryClient) => ({
    mutationFn: ({ date, memo }: { date: string; memo: string }) =>
      scheduleAPI.postSchedule(postId, { date, memo }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', postId],
      });
    },
    onError: (error: unknown) => {
      console.error('일정 등록 실패:', error);
    },
  }),
  deleteSchedule: (postId: number, queryClient: QueryClient) => ({
    mutationFn: () => scheduleAPI.deleteSchedule(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', postId],
      });
    },
    onError: (error: unknown) => {
      console.error('일정 삭제 실패:', error);
    },
  }),
  updateSchedule: (postId: number, queryClient: QueryClient) => ({
    mutationFn: ({ date, memo }: { date: string; memo: string }) =>
      scheduleAPI.updateSchedule(postId, { date, memo }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', postId],
      });
    },
    onError: (error: unknown) => {
      console.error('일정 수정 실패:', error);
    },
  }),
};
