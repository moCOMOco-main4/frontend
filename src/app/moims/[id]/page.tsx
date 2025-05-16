import { MoimDetail } from '@/components/moim/moimdetail';
import detail from '@/mockup/detail.json';
import { Moim } from '@/types/moim';

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
    <div>
      <MoimDetail data={moim} />
    </div>
  );
};

export default MoimDetailPage;
