import Image from 'next/image';
import Logo from '@images/Logo.png';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center text-4xl">
      <Image src={Logo} width={200} height={200} alt="로고" />
    </div>
  );
}
