'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function SchedulePage() {
  const [date, setDate] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<{ [key: string]: string[] }>({});
  const [newSchedule, setNewSchedule] = useState('');

  const handleAddSchedule = () => {
    if (!date || !newSchedule.trim()) return;

    const dateKey = format(
      date instanceof Date ? date : date[0]!,
      'yyyy-MM-dd',
    );
    setSchedules(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newSchedule.trim()],
    }));
    setNewSchedule('');
  };

  const handleDeleteSchedule = (dateKey: string, index: number) => {
    setSchedules(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#F7FFE6]">
      {/* 마이페이지 리스트 */}
      <div className="w-64 border-r border-[#E1F0D3] bg-[#F7FFE6] p-8">
        <nav className="space-y-4">
          <Link
            href="/mypage"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <span className="font-medium">내 정보</span>
          </Link>
          <Link
            href="/mypage/schedule"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <span className="font-medium text-[#4CAF50]">일정 관리</span>
          </Link>
          <Link
            href="/mypage/groups"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
          >
            <span className="font-medium">관심 모임</span>
          </Link>
        </nav>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-12">
        <h1 className="mb-12 text-4xl font-bold">일정 관리</h1>
        
        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <div className="flex gap-12">
            {/* 달력 */}
            <div className="flex-1">
              <Calendar
                onChange={setDate}
                value={date}
                locale="ko-KR"
                className="!w-full !border-none"
                tileClassName={({ date }) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  return schedules[dateKey]?.length ? 'has-schedule' : null;
                }}
              />
              <div className="mt-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-[#E1F0D3]"></div>
                  <span className="text-base text-gray-600">
                    내가 생성한 그룹 일정
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-[#F6FBEF]"></div>
                  <span className="text-base text-gray-600">다른 그룹 일정</span>
                </div>
              </div>
            </div>

            {/* 일정 목록 */}
            {date && (
              <div className="w-[500px]">
                <h2 className="mb-6 text-2xl font-semibold">
                  {format(
                    date instanceof Date ? date : date[0]!,
                    'yyyy년 MM월 dd일',
                    { locale: ko },
                  )}
                </h2>
                <div className="mb-6">
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={e => setNewSchedule(e.target.value)}
                    placeholder="새로운 일정을 입력하세요"
                    className="w-full rounded-lg border border-gray-300 p-3 text-lg"
                  />
                  <button
                    onClick={handleAddSchedule}
                    className="mt-3 w-full rounded-lg bg-[#4CAF50] px-6 py-3 text-lg text-white hover:bg-[#45a049]"
                  >
                    일정 추가
                  </button>
                </div>
                <div className="space-y-3">
                  {schedules[
                    format(date instanceof Date ? date : date[0]!, 'yyyy-MM-dd')
                  ]?.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border bg-[#F6FBEF] p-4"
                    >
                      <span className="text-lg">{schedule}</span>
                      <button
                        onClick={() =>
                          handleDeleteSchedule(
                            format(
                              date instanceof Date ? date : date[0]!,
                              'yyyy-MM-dd',
                            ),
                            index,
                          )
                        }
                        className="text-lg text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .react-calendar {
          background-color: transparent;
          border: none;
        }
        .react-calendar__tile {
          padding: 1.5em 0.5em;
          position: relative;
          height: 80px;
          font-size: 1.2em;
        }
        .react-calendar__tile--now {
          background: #f6fbef;
        }
        .react-calendar__tile--active {
          background: #e1f0d3 !important;
        }
        .react-calendar__tile.has-schedule::after {
          content: '';
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #4caf50;
        }
        .react-calendar__navigation button {
          font-size: 1.4em;
          padding: 1.2em;
        }
        .react-calendar__month-view__weekdays {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 1.1em;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #d10000;
        }
      `}</style>
    </div>
  );
}
