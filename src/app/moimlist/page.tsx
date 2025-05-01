import CommonInput from '@/components/common/input';
import { MoimCard } from '@/components/list/moimcard';
import { Search } from 'lucide-react';
import listApi from '@/mockup/listapi.json';

const MoimList = () => {
  return (
    <div className="flex flex-col gap-10 p-7">
      <div className="flex w-[300px]">
        <CommonInput box="line" placeholder="검색" width={100} />
        <Search color="#a0b092" />
      </div>
      <MoimCard data={listApi} />
    </div>
  );
};

export default MoimList;
