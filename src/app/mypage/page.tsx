import React from 'react';

export default function Mypage() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center min-h-screen">
        <section className="p-12 min-w-[700px] min-h-[500px] flex flex-col items-center">
          <h2>USER NAME 님의정보</h2>
          <img src="/images/Logo.png" alt="프로필" className="w-40 h-40 rounded-full object-cover mb-3" />
          <div>USER NAME</div>
          <div className="flex gap-2 mb-6 w-full justify-start">
            <div>프론트엔드</div>
            <div>디자이너</div>
          </div>
          <div className="flex gap-6 w-full justify-between">
            <div className="p-4 min-w-[310px] min-h-[160px] flex flex-col">
              <div>자기소개</div>
              <div>반갑습니다!</div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-4 min-w-[220px] min-h-[80px]">
                <div>사용 가능 스택</div>
                <nav className="flex gap-2">
                  <ul className="flex gap-2">
                    <li className="list-none">
                      <img src="/images/stack_js.svg" alt="js" className="w-9 h-9" />
                    </li>
                    <li className="list-none">
                      <img src="/images/stack_ts.png" alt="ts" className="w-9 h-9" />
                    </li>
                    <li className="list-none">
                      <img src="/images/stack_React.png" alt="react" className="w-9 h-9" />
                    </li>
                    <li className="list-none">
                      <img src="/images/stack_next.png" alt="next" className="w-9 h-9" />
                    </li>
                    <li className="list-none">
                      <img src="/images/stack_git.png" alt="git" className="w-9 h-9" />
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="p-4 min-w-[220px]">
                <div>링크</div>
                <input type="text" value="https://github.com/" readOnly className="w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}