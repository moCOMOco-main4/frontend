'use client';

import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/schedule.css';
import { Schedule } from '@/types/schedule';
import MyMoimBox from '@/components/mypage/MyMoimBox';
import Calendar from 'react-calendar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { scheduleOption } from '@/api/options/scheduleOptions';
import { myMoimOption } from '@/api/options/myMoimOption';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MySchedule = () => {
  const [date, setDate] = useState<Value>(new Date());

  const { data: joined } = useQuery(myMoimOption.joinedList());
  const joinedMoim = joined?.map(moim => moim.id) ?? [];

  const { data: schedules } = useQuery(
    scheduleOption.scheduleList(joinedMoim[0]),
  );

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
  };

  const queryClient = useQueryClient();
  const postScheduleMutation = useMutation(
    scheduleOption.postSchedule(23, queryClient),
  );

  return (
    <MyMoimBox title="일정 관리">
      <div className="rounded-2xl bg-white p-6">
        <div>
          <div className="mb-4 flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#E1F0D3]"></div>
              <span className="text-sm text-gray-600">일정이 있는 날짜</span>
            </div>
          </div>
          <Calendar
            onChange={handleDateChange}
            value={date}
            locale="ko-KR"
            className="!w-full !border-none"
            tileClassName={getTileClassName}
          />
          <button
            onClick={() =>
              postScheduleMutation.mutate({
                date: '2025-05-18T23:41:58.947Z',
                memo: '테스트 일정 1',
              })
            }
          >
            생성
          </button>
        </div>
        {/* {Array.isArray(date) ? null : (
          <div className="mt-4 space-y-2">
            {getSchedulesForDate(date)?.length > 0 ? (
              getSchedulesForDate(date).map(schedule => (
                <div
                  key={schedule.id}
                  className="rounded-lg border px-4 py-2 shadow-sm"
                >
                  <p className="font-semibold text-main-dark">
                    {schedule.title}
                  </p>
                  <p className="text-sm text-gray-500">{schedule.place}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                선택한 날짜에 일정이 없습니다.
              </p>
            )}
          </div>
        )} */}
      </div>
    </MyMoimBox>
  );
};

export default MySchedule;
