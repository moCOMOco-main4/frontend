'use client';

import CommonInput from '@/components/common/input/Input';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Logo from '@images/Logo.png';
import Edit from '@images/edit.png';
import Dropdown from '@/components/common/input/Dropdown';
import Button from '@/components/common/button/Button';
import { ROLE_LIST } from '@/constants/config';
import { useAuthStore } from '@/store/useAuthStore';
import { userAPI } from '@/api/functions/userAPI';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/api/functions/uploadFileAPI';

export default function EditForm() {
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);

  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intro, setIntro] = useState('');
  const [link, setLink] = useState('');
  const [pofolLink, setPofolLink] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // placeholder 폰트 공통 지정
  const fontSize = 'text-base placeholder:text-sm md:placeholder:text-lg';

  useEffect(() => {
    // [ 소셜 로그인 시 자동 이메일 추가 - 변경 불가 ]
    if (user?.email) {
      setEmail(user.email);
    }

    const fetchUser = async () => {
      const data = await userAPI.getUser();
      setNickname(data.nickname);
      setPhone(data.phone || '');
      setIntro(data.intro || '');
      setLink(data.github_url || '');
      setCategory(data.position_name);
      setPofolLink(data.portfolio_url || '');

      if (data.profile_image) {
        setImageUrl(data.profile_image);
      }
    };
    fetchUser();
  }, []);

  // [링크 유효성 검사]
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);

      const isHttp = ['http:', 'https:'].includes(parsed.protocol);
      const hasValidTLD = /\.[a-z]{2,}$/i.test(parsed.hostname);

      return isHttp && hasValidTLD;
    } catch {
      return false;
    }
  };

  // [전화번호 유효성 검사]
  const isValidPhone = (phone: string) => {
    const phoneWithoutHyphen = phone.replace(/-/g, '');
    return /^01[016789]\d{7,8}$/.test(phoneWithoutHyphen);
  };

  // [저장 버튼 핸들러]
  const handleSave = async () => {
    if (!nickname || !category) {
      alert('닉네임과 분야는 필수 항목입니다.');
      return;
    } else if (link && !isValidUrl(link)) {
      alert(
        '링크는 http(s)://로 시작하고 유효한 도메인(TLD)을 포함해야 합니다. \n예: https://github.com',
      );
      return;
    } else if (phone && !isValidPhone(phone)) {
      alert(
        '전화번호 형식이 올바르지 않습니다. \n예: 010-1234-5678 또는 01012345678',
      );
      return;
    }

    try {
      let imageUrl: string | undefined = undefined;

      if (file) {
        imageUrl = await uploadImage(file); // 이미지 업로드 후 URL 받아옴
        setImageUrl(imageUrl);
      }

      const fullImageUrl = imageUrl
        ? `https://api.mocomoco.store${encodeURI(imageUrl)}`
        : Logo;

      await userAPI.editUser({
        nickname: nickname,
        phone: phone,
        intro: intro,
        github_url: link,
        position_name: category,
        portfolio_url: pofolLink,
      });

      const updatedUser = await userAPI.getUser();
      updateUser(updatedUser);

      alert('정보가 저장되었습니다!');
      router.push('/mypage'); // 저장 후 마이페이지 이동도 가능
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const fullImageUrl = imageUrl
    ? `https://api.mocomoco.store${encodeURI(imageUrl)}`
    : Logo;

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="mb-[20px] flex min-h-screen w-full items-center justify-center px-4">
        <div className="flex w-full max-w-[700px] flex-col justify-center gap-[50px] rounded-[20px] bg-white p-[30px] drop-shadow-md sm:p-[50px]">
          <p className="text-right text-sm underline md:text-base">
            {' '}
            회원탈퇴{' '}
          </p>
          <p className="text-center font-gmarket text-xl font-light md:text-[30px]">
            내정보 수정
          </p>
          <div className="flex items-center justify-center">
            <div className="relative h-[150px] w-[150px]">
              <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-300">
                <Image
                  src={previewUrl || fullImageUrl}
                  alt="User Image"
                  fill
                  className="z-[-1] object-cover"
                  // fill 속성 사용 시 sizes 속성 지정 필수
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={e => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                    setPreviewUrl(URL.createObjectURL(selectedFile));
                  }
                }}
              />
              <button
                onClick={handleEditClick}
                className="absolute bottom-2 right-2 z-20 flex items-center justify-center rounded-full border bg-white p-2 shadow-lg"
              >
                <Image src={Edit} alt="Edit" className="h-[15px] w-[15px]" />
              </button>
            </div>
          </div>
          <CommonInput
            // label=""
            placeholder="닉네임 [ 2글자 이상, 10글자 이하 ] "
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            box="line"
            className={fontSize}
          />
          <CommonInput
            // label=""
            placeholder="이메일 [ ex. user123@email.com ]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            box="line"
            className={fontSize}
            // 이메일은 소셜로그인에 적용된 이메일만 사용 가능. 즉, 변경 불가
            readOnly
          />
          <CommonInput
            // label=""
            placeholder="연락처 [ ex. 010-1234-5678 ]"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            box="line"
            className={fontSize}
          />
          <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[200px]">
            <Dropdown
              selected={category}
              onSelect={setCategory}
              // ...r
              categories={ROLE_LIST as unknown as string[]}
              placeholder="분야"
              className="text-sm md:text-lg"
            />
          </div>
          <CommonInput
            // label=""
            placeholder="소개글 [ 본인을 소개해주세요 ! ]"
            value={intro}
            onChange={e => setIntro(e.target.value)}
            box="textarea"
            className={fontSize}
          />
          <div className="flex flex-col gap-[30px]">
            <CommonInput
              label="GitHub Link"
              placeholder="링크 추가"
              value={link}
              onChange={e => setLink(e.target.value)}
              box="line"
              className={fontSize}
            />
            <CommonInput
              label="portfolio Link"
              placeholder="링크 추가"
              value={pofolLink}
              onChange={e => setPofolLink(e.target.value)}
              box="line"
              className={fontSize}
            />
          </div>
          <Button
            type="submit"
            className="w-[100px] self-center"
            onClick={handleSave}
          >
            {' '}
            저장{' '}
          </Button>
        </div>
      </div>
    </>
  );
}
