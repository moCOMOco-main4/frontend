'use client';

import ChatRoomCard from '@/components/ChatRoomCard';
import Button from '@/components/common/button/Button';
import useClickOutside from '@/hooks/useClickOutside';
import { ChatRoom } from '@/types/chat';
import { CircleX, User, Users } from 'lucide-react';
import { useRef } from 'react';

type chatProps = {
  onClose: () => void;
  chatRoomList: ChatRoom[];
  chatType?: 'private' | 'group';
  setChatType?: React.Dispatch<React.SetStateAction<'private' | 'group'>>;
};

const ChatModal = ({
  onClose,
  chatRoomList,
  chatType = 'private',
  setChatType,
}: chatProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  const modalSize = 'h-[560px] w-[360px]';
  const modalClass = `fixed bottom-10 right-10 z-30 flex flex-col justify-between rounded-3xl bg-main-medium p-5 shadow-xl transition-all duration-300 ease-out ${modalSize}`;
  const tabClass =
    'mr-0.5 rounded-t-xl border border-b-0 border-main-base px-3 py-1';

  return (
    <div ref={modalRef} className={modalClass} aria-label="chat modal">
      <div className="flex justify-between">
        <div>
          <button
            className={`${tabClass} ${chatType === 'private' ? 'bg-main-base' : ''}`}
            onClick={() => setChatType?.('private')}
          >
            <User stroke="gray" />
          </button>
          <button
            className={`${tabClass} ${chatType === 'group' ? 'bg-main-base' : ''}`}
            onClick={() => setChatType?.('group')}
          >
            <Users stroke="gray" />
          </button>
        </div>
        <CircleX className="cursor-pointer" onClick={onClose} />
      </div>
      {chatRoomList && chatRoomList.length > 0 ? (
        <div className="flex-1 space-y-1 overflow-y-scroll scroll-smooth pr-0.5">
          {chatRoomList.map(room => (
            <ChatRoomCard key={room.roomId} chatRoom={room} />
          ))}
        </div>
      ) : (
        <>
          <p className="text-main-soft text-center text-sm">
            채팅 내역이 없어요
          </p>
          <Button>채팅 시작하기</Button>
        </>
      )}
    </div>
  );
};

export default ChatModal;
