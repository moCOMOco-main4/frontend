'use client';

import { myMoimOption } from '@/api/options/myMoimOption';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import { useQuery } from '@tanstack/react-query';

export default function JoinPage() {
  const { data } = useQuery(myMoimOption.joinedList());
  const joinList = data ?? [];

  return (
    <MyMoimBox title="참여 모임 목록">
      {joinList.length > 0 ? (
        joinList.map(moim => <MyMoimCard key={moim.id} moim={moim} />)
      ) : (
        <p className="text-main-soft text-center text-sm">
          참여중인 모임이 없어요
        </p>
      )}
    </MyMoimBox>
  );
}
