import { getMoimDetail } from '@/api/functions/moimsAPI';
import MoimEditForm from '@/components/moim/moimeditform';
import { notFound } from 'next/navigation';
interface Props {
  params: { id: string };
}

export default async function moimEdit({ params }: Props) {
  const id = Number(params.id);
  const data = await getMoimDetail(id);

  if (!data) return notFound();
  return (
    <>
      <MoimEditForm id={id} data={data} />
    </>
  );
}
