'use client';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/schedule.css';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Schedule = {
  post_id: number;
  post_title: string;
  date: string;
  memo: string;
  type: string;
};

export default function SchedulePage() {
  const [date, setDate] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    try {
      const response = await fetch(
        'https://api.mocomoco.store/api/schedules/me/',
      );
      const data = await response.json();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('일정을 불러오는데 실패했습니다:', error);
      setSchedules([]);
    }
  }

  const getSchedulesForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return schedules.filter(schedule => schedule.date === dateStr);
  };

  return (
    <MyMoimBox title="일정 관리">
      {/* 메인 컨텐츠 */}
      <div className="rounded-2xl border bg-white p-6 shadow-lg">
        <div className="flex gap-8">
          {/* 달력 */}
          <div className="flex-1">
            <Calendar
              onChange={setDate}
              value={date}
              locale="ko-KR"
              className="!w-full !border-none"
              tileClassName={({ date }) => {
                const dateSchedules = getSchedulesForDate(date);
                return dateSchedules.length ? 'has-schedule' : null;
              }}
            />
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#E1F0D3]"></div>
                <span className="text-sm text-gray-600">
                  내가 생성한 그룹 일정
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#F6FBEF]"></div>
                <span className="text-sm text-gray-600">다른 그룹 일정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyMoimBox>
  );
}
