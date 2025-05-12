'use client';

import { notificationOption } from '@/api/options/notificationOption';
import NotificationCard from '@/components/notifications/NotificationCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Notifications = () => {
  const { data } = useQuery(notificationOption.notiList());
  const notiList = data ?? [];

  const queryClient = useQueryClient();
  const patchReadMutation = useMutation(
    notificationOption.patchRead(queryClient),
  );

  return (
    <>
      <p className="mb-1 text-main-dark">알림</p>
      {notiList.length > 0 ? (
        <div className="space-y-1 overflow-y-auto">
          {notiList.map(noti => (
            <button
              key={noti.Notification_id}
              onClick={() => patchReadMutation.mutate(noti.Notification_id)}
              className="w-full text-start"
            >
              <NotificationCard notification={noti} />
            </button>
          ))}
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-main-dark">
            새로운 알림이 없어요
          </p>
        </>
      )}
    </>
  );
};

export default Notifications;
