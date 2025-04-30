import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [schedules, setSchedules] = useState<{ [key: string]: string[] }>({});
  const [newSchedule, setNewSchedule] = useState('');

  const handleAddSchedule = () => {
    if (!selectedDate || !newSchedule.trim()) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setSchedules(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newSchedule.trim()]
    }));
    setNewSchedule('');
  };

  const handleDeleteSchedule = (date: string, index: number) => {
    setSchedules(prev => ({
      ...prev,
      [date]: prev[date].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">일정 관리</h1>
        <div className="mb-8">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow"
            locale={ko}
          />
        </div>
        
        {selectedDate && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              {format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })} 일정
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSchedule}
                onChange={(e) => setNewSchedule(e.target.value)}
                placeholder="새로운 일정을 입력하세요"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                추가
              </button>
            </div>
            <div className="space-y-2">
              {schedules[format(selectedDate, 'yyyy-MM-dd')]?.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{schedule}</span>
                  <button
                    onClick={() => handleDeleteSchedule(format(selectedDate, 'yyyy-MM-dd'), index)}
                    className="text-red-500 hover:text-red-700"
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
  );
}
