import CommonInput from '@/components/common/input';
import { Search } from 'lucide-react';

const MoimList = () => {
  return (
    <div className="p-7">
      <div className="flex w-[300px]">
        <CommonInput box="line" placeholder="검색" width={100} />
        <Search color="#a0b092" />
      </div>
    </div>
  );
};

export default MoimList;
