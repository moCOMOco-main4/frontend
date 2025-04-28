import React from 'react';

export default function Mypage() {
  return (
    <div className="bg-moko-bg min-h-screen font-['Pretendard']">
      {/* 마이페이지 카드 */}
      <main className="flex justify-center items-center min-h-screen">
        <section className="bg-moko-card rounded-xl shadow-sm p-12 min-w-[700px] min-h-[500px] flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6">USER NAME 님의정보</h2>
          <img src="" alt="프로필" className="w-40 h-40 rounded-full object-cover mb-3" />
          <div className="font-semibold text-xl mb-2">USER NAME</div>
          {/* 탭 */}
          <div className="flex gap-2 mb-6">
            <div className="bg-white border border-moko-border rounded-lg px-4 py-1 font-medium">프론트엔드</div>
            <div className="bg-white border border-moko-border rounded-lg px-4 py-1 font-medium">디자이너</div>
          </div>
          {/* 정보 카드 */}
          <div className="flex gap-6">
            {/* 자기소개 */}
            <div className="bg-moko-bg rounded-lg p-4 min-w-[220px] min-h-[120px] flex flex-col">
              <div className="font-semibold mb-2">자기소개</div>
              <div className="text-gray-500 text-sm">반갑습니다!</div>
            </div>
            {/* 스택 및 링크 */}
            <div className="flex flex-col gap-3">
              <div className="bg-moko-bg rounded-lg p-4 min-w-[220px] min-h-[80px]">
                <div className="font-semibold mb-2">사용 가능 스택</div>
                <div className="flex gap-2">
                  <img src="/stack_js.png" alt="js" className="w-9 h-9" />
                  <img src="/stack_ts.png" alt="ts" className="w-9 h-9" />
                  <img src="/stack_react.png" alt="react" className="w-9 h-9" />
                  <img src="/stack_next.png" alt="next" className="w-9 h-9" />
                  <img src="/stack_notion.png" alt="notion" className="w-9 h-9" />
                </div>
              </div>
              <div className="bg-moko-bg rounded-lg p-4 min-w-[220px]">
                <div className="font-semibold mb-2">링크</div>
                <input type="text" value="https://github.com/" readOnly className="w-full border border-moko-border rounded-md p-1 bg-white" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}