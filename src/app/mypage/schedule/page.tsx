'use client';

import MyMoimBox from '@/components/mypage/MyMoimBox';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/schedule.css';
import { useQueryClient } from '@tanstack/react-query';
import { scheduleAPI } from '@/api/functions/scheduleAPI';
import { Schedule } from '@/types/schedule';
import { setDate } from 'date-fns';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function SchedulePage() {
  const [date, setDate] = useState<Value>(new Date());
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data: Schedule[] = await scheduleAPI.getScheduleList();
        setSchedules(data);
      } catch (err) {
        console.error('유저 정보 가져오기 실패:', err);
      }
    };

    fetchSchedule();
  }, []);

  const getSchedulesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return schedules?.filter((schedule: Schedule) =>
      schedule.date.startsWith(dateString),
    );
  };

  const getTileClassName = ({ date }: { date: Date }) => {
    const dateSchedules = getSchedulesForDate(date);
    if (dateSchedules?.length === 0) return null;
    return 'has-schedule';
  };

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    // 날짜가 변경될 때마다 데이터를 리페치
  };

  return (
    <MyMoimBox title="일정 관리">
      <div className="rounded-2xl border bg-white p-6 shadow-lg">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">일정 캘린더</h2>
            </div>
            <Calendar
              onChange={handleDateChange}
              value={date}
              locale="ko-KR"
              className="!w-full !border-none"
              tileClassName={getTileClassName}
            />
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-[#E1F0D3]"></div>
                <span className="text-sm text-gray-600">일정이 있는 날짜</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MyMoimBox>
  );
}
