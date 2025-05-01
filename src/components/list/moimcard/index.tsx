import Button from '@/components/common/button';
import { moimCard } from './types';

interface ListProps {
  data: moimCard[];
}
export const MoimCard = ({ data }: ListProps) => {
  return (
    <div className="grid grid-cols-2 gap-7 md:grid-cols-4">
      {data.map(item => {
        const statusText = item.is_closed ? '모집완료' : '모집중';
        const statusColor = item.is_closed ? 'red' : 'green';
        const formattedDate = new Date(item.date).toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        return (
          <div key={item.id} className="flex rounded-md border shadow-md">
            <div className="flex-1 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="w-20 p-2 text-center">
                  <Button size="sm" color={statusColor}>
                    {statusText}
                  </Button>
                </div>

                <span className="text-sm text-gray-500">
                  정원: {item.max_people}명
                </span>
              </div>
              <span className="text-sm text-gray-500"> {item.category}</span>
              <h1 className="mb-1 text-lg font-semibold">{item.title}</h1>
              <p className="mb-2 text-sm text-gray-700">
                장소: {item.place_name}
              </p>
              <div className="flex items-center justify-between">
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
