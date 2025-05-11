'use client';

import { myMoimOption } from '@/api/options/myMoimOption';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import MyMoimCard from '@/components/mypage/MyMoimCard';
import { useQuery } from '@tanstack/react-query';

export default function LikePage() {
  const { data } = useQuery(myMoimOption.likedList());
  const likeList = data ?? [];

  return (
    <MyMoimBox title="관심 모임 목록">
      {likeList.length > 0 ? (
        likeList.map(moim => <MyMoimCard key={moim.id} moim={moim} />)
      ) : (
        <p className="text-main-soft text-center text-sm">
          관심 설정한 모임이 없어요
        </p>
      )}
    </MyMoimBox>
  );
}
