'use client';
import detail from '@/mockup/detail.json';
import { Moim } from '@/types/moim';
import { CalendarDays, MapPin } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface MoimProps {
  params: {
    id: string;
  };
}

const MoimDetailPage = ({ params }: MoimProps) => {
  const moim = (detail as Moim[]).find(item => item.id === Number(params.id));

  if (!moim) return notFound();

  return (
    <div className="h-full w-full space-y-8 bg-white px-20 py-10">
      <h1 className="text-center text-3xl">{moim.title}</h1>
      <hr />
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <Image
          src={moim.writer.profile_image}
          alt={moim.writer.nickname}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{moim.writer.nickname}</span>
        <span>·</span>
        <span>{new Date(moim.created_at).toLocaleDateString()}</span>
      </div>

      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <CalendarDays size={16} />
          {new Date(moim.date).toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          {moim.place_name} ({moim.address})
        </div>
      </div>

      <div>{moim.content}</div>

      <div className="border-t pt-6">
        <h2 className="mb-2 text-lg font-semibold">
          참여자 {moim.participants.length} / {moim.max_people}
        </h2>
        <div className="flex gap-4">
          {moim.participants.map(user => (
            <div key={user.id} className="flex flex-col items-center text-sm">
              <Image
                src={user.profile_image}
                alt={user.nickname}
                width={100}
                height={100}
                className="rounded-full"
              />
              <span className="pt-2">{user.nickname}</span>
            </div>
          ))}
        </div>
      </div>

      {moim.is_closed ? (
        <p className="text-red-500">모집이 마감되었습니다.</p>
      ) : (
        <p className="text-green-600">모집 중</p>
      )}
    </div>
  );
};

export default MoimDetailPage;
