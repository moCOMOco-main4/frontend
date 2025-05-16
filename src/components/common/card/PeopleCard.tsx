'use client';

import Image from 'next/image';
import Logo from '@images/Logo.png';
import { MessageCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { chatOption } from '@/api/options/chatOption';
import { User } from '@/types/moim';

type PeopleCardProps = {
  user: User;
};

const PeopleCard = ({ user }: PeopleCardProps) => {
  const postJoinMutation = useMutation(chatOption.joinChat());

  return (
    <div className="flex flex-col items-center">
      <Image
        src={
          // user.profile_image ||
          Logo
        }
        className="w-full rounded-xl"
        alt="유저 이미지"
      />
      <p className="flex w-full items-center justify-center gap-0.5 overflow-hidden">
        <span className="truncate">{user.nickname}</span>
        <MessageCircle
          size={16}
          color="gray"
          onClick={() => postJoinMutation.mutate(user.id)}
        />
      </p>
    </div>
  );
};

export default PeopleCard;
