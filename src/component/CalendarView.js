import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { createClient } from '@supabase/supabase-js'


function CalendarView({ date, onCalendarChange}) {

  const supabaseUrl = 'https://vcgqdoozijktlhgbzyps.supabase.co'
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

  const [tasks, setTasks] = useState([]);
  const [taskDates, setTaskDates] = useState([]);

  // 로컬 타임존 기준 YYYY-MM-DD 반환 함수
  function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    async function getSchedule() {
      // schedule 테이블 가져오기
      let { data: schedule, error } = await supabase
        .from('schedule')
        .select('*');

        if (error) {
          console.error('Supabase error:', error.message);
          return; // 에러가 있으면 이후 코드 실행하지 않음
        }

        if (schedule) {
          // 날짜별로 그룹핑 (로컬 타임존 기준)
          const grouped = schedule.reduce((acc, item) => {
            const localDate = new Date(item.cdt);
            const dateKey = getLocalDateKey(localDate);
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(item);
            return acc;
          }, {});
          setTasks(grouped[date] || []);
          setTaskDates(Object.keys(grouped));
        }
      }
    getSchedule();
  }, [supabase,date]);

  function renderTileContent({ date, view }) {
    if (view === 'month') {
      const dateKey = getLocalDateKey(date);
      if (taskDates.includes(dateKey)) {
        return <div style={{ color: 'red', fontSize: 24 }}>•</div>; // 점 또는 원하는 표시
      }
    }
    return null;
  }



  return (
    <div style={{ marginTop: 24 }}>
      <Calendar
        value={new Date(date)}
        onClickDay={onCalendarChange}
        tileContent={renderTileContent}
        calendarType="gregory"
        locale="ko-KR"
      />
      <div style={{ marginTop: 16 }}>
        <b>{date} 일정</b>
        <ul>
          {tasks.length === 0  && <li className="empty">일정이 없습니다.</li>}
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              {/* 삭제 버튼 등 추가 가능 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CalendarView; 