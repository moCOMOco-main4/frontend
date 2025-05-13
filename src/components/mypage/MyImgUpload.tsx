'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Logo from '@images/Logo.png';
import Edit from '@images/edit.png';

interface Props {
  imageUrl: string | null;
  onImageChange: (file: File, previewUrl: string) => void;
}

export default function ProfileImageUploader({
  imageUrl,
  onImageChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="relative h-[150px] w-[150px]">
      <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-300">
        <Image
          src={preview || imageUrl || Logo.src}
          alt="User Image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
          //   Next.js는 해당 이미지를 중요 리소스로 간주 -> 선로딩
          priority
        />
      </div>
      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onImageChange(file, url);
          }
        }}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="absolute bottom-2 right-2 z-20 flex items-center justify-center rounded-full border bg-white p-2 shadow-lg"
      >
        <Image src={Edit} alt="Edit" className="h-[15px] w-[15px]" />
      </button>
    </div>
  );
}
