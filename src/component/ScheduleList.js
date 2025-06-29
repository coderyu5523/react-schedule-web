import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'



function ScheduleList() {
  const [tasksByDate, setTasksByDate] = useState({});
  const [sortedDates, setSortedDates] = useState([]);

  //supabase 연결
  const supabaseUrl = 'https://vcgqdoozijktlhgbzyps.supabase.co'
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)

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
        // 날짜별로 그룹핑
        const grouped = schedule.reduce((acc, item) => {
          const dateKey = item.cdt.slice(0, 10); // YYYY-MM-DD
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(item);
          return acc;
        }, {});
        setTasksByDate(grouped);
        setSortedDates(Object.keys(grouped).sort());
      }
    }
    getSchedule();
  }, [supabase]);

  return (
    <div className="list-panel">
      <h2>일정 목록</h2>
      <div className="schedule-container" style={{ boxShadow: 'none', marginTop: 0, padding: '20px 18px 16px 18px' }}>
        {sortedDates.length === 0 && <div className="empty">일정이 없습니다.</div>}
        {sortedDates.map(dateKey => (
          <div key={dateKey} style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 8, color: '#6c63ff', fontWeight: 500, fontSize: '1.08rem' }}>{dateKey}</div>
            <ul>
              {tasksByDate[dateKey].map((task) => (
                <li key={task.id}>
                  <span>{task.title}</span>
                  {/* 삭제 버튼 등 추가 가능 */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScheduleList; 