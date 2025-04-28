import Image from 'next/image';
import React from 'react';

export default function mypage() {
  return (
    <div style={{ background: '#F6FBEF', minHeight: '100vh', fontFamily: 'Pretendard, sans-serif' }}>
      {/* 마이페이지 카드 */}
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <section style={{ background: '#E6F1DF', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 48, minWidth: 700, minHeight: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 24 }}>USER NAME 님의정보</h2>
          <img src="" alt="프로필" style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>USER NAME </div>
          {/* 탭 */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <div style={{ background: '#fff', border: '1px solid #B6CDBD', borderRadius: 8, padding: '4px 16px', fontWeight: 500 }}>프론트엔드</div>
            <div style={{ background: '#fff', border: '1px solid #B6CDBD', borderRadius: 8, padding: '4px 16px', fontWeight: 500 }}>디자이너</div>
          </div>
          {/* 정보 카드 */}
          <div style={{ display: 'flex', gap: 24 }}>
            {/* 자기소개 */}
            <div style={{ background: '#F6FBEF', borderRadius: 8, padding: 16, minWidth: 220, minHeight: 120, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>자기소개</div>
              <div style={{ color: '#888', fontSize: 14 }}>반갑습니다!</div>
            </div>
            {/* 스택 및 링크 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: '#F6FBEF', borderRadius: 8, padding: 16, minWidth: 220, minHeight: 80 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>사용 가능 스택</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <img src="/stack_js.png" alt="js" style={{ width: 36, height: 36 }} />
                  <img src="/stack_ts.png" alt="ts" style={{ width: 36, height: 36 }} />
                  <img src="/stack_react.png" alt="react" style={{ width: 36, height: 36 }} />
                  <img src="/stack_next.png" alt="next" style={{ width: 36, height: 36 }} />
                  <img src="/stack_notion.png" alt="notion" style={{ width: 36, height: 36 }} />
                </div>
              </div>
              <div style={{ background: '#F6FBEF', borderRadius: 8, padding: 16, minWidth: 220 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>링크</div>
                <input type="text" value="https://github.com/" readOnly style={{ width: '100%', border: '1px solid #B6CDBD', borderRadius: 6, padding: 4, background: '#fff' }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}