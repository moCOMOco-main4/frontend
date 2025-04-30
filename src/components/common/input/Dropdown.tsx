'use client';

import { useState } from 'react';

type DropdownProps = {
  defaultValue: string; // string 타입으로 제한
};

const categoryList = ['프론트엔드(FE)', '백엔드(BE)', '풀스택', '디자이너'];

export default function Dropdown({ defaultValue }: DropdownProps) {
  const [selected, setSelected] = useState<string>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex cursor-pointer items-center justify-between gap-[20px] border-b-[2px] border-main-base py-2"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span className="font-gmarket text-[15px] font-light text-gray-400">
          {selected}
        </span>
        <span className="text-xl text-main-base">▼</span>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-md">
          {categoryList.map((category, index) => (
            <li
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-green-100"
              onClick={() => {
                setSelected(category);
                setIsOpen(false);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
