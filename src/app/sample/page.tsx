'use client';

import { useState } from 'react';
import FloatingButton from '@/components/common/button/FloatingButton';
import FavoriteButton from '@/components/common/button/FavoriteButton';
import ToggleButton from '@/components/common/button/ToggleButton';
import ChatRooms from '@/components/ChatRooms';
import ChatModal from '@/components/common/modal/ChatModal';

export default function HomePage() {
  const [isOn, setIsOn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAlarm] = useState(false);
  const [chatType, setChatType] = useState<'private' | 'group'>('private');

  return (
    <main className="p-6">
      <FavoriteButton />
      <ToggleButton isOn={isOn} handleToggle={next => setIsOn(next)} />
      {isChatOpen ? (
        <ChatModal onClose={() => setIsChatOpen(false)}>
          <ChatRooms
            chatRoomList={[
              {
                roomId: 'a1b2c3',
                postId: 12,
                postTitle: '강남 모각코 구해요!',
                latestMessage: '내일 14시에 시작해요~',
                latestTime: '2025-04-25T19:40:00',
                unreadCount: 2,
                participants: ['우중', '지안', '승우'],
              },
            ]}
            chatType={chatType}
            setChatType={setChatType}
          />
        </ChatModal>
      ) : (
        <FloatingButton
          alarm={isAlarm}
          handleOpen={() => setIsChatOpen(true)}
        />
      )}
    </main>
  );
}
