import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// 날짜를 YYYY-MM-DD (로컬)로 변환하는 함수
function toYMD(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function App() {
  const [tasksByDate, setTasksByDate] = useState({});
  const [input, setInput] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return toYMD(today);
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasksByDate(prev => {
      const prevTasks = prev[date] || [];
      return { ...prev, [date]: [...prevTasks, input.trim()] };
    });
    setInput('');
  };

  const removeTask = (dateKey, idx) => {
    setTasksByDate(prev => {
      const prevTasks = prev[dateKey] || [];
      const newTasks = prevTasks.filter((_, i) => i !== idx);
      return { ...prev, [dateKey]: newTasks };
    });
  };

  // 날짜 내림차순 정렬
  const sortedDates = Object.keys(tasksByDate)
    .filter(d => (tasksByDate[d] && tasksByDate[d].length > 0))
    .sort((a, b) => b.localeCompare(a));

  // 달력에 일정이 있는 날짜에 점 표시 (로컬 기준)
  const tileContent = ({ date: calDate, view }) => {
    if (view !== 'month') return null;
    const ymd = toYMD(calDate);
    if (tasksByDate[ymd] && tasksByDate[ymd].length > 0) {
      return <div style={{ textAlign: 'center', marginTop: 2 }}><span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#6c63ff' }}></span></div>;
    }
    return null;
  };

  // 달력에서 날짜 클릭 시 해당 날짜로 이동 (로컬 기준)
  const onCalendarChange = (value) => {
    if (value instanceof Date) {
      setDate(toYMD(value));
      // setShowCalendar(false); // 달력 모드 유지
    }
  };

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (current > 20 && current > lastScroll) {
        setShowHeader(false);
      } else if (current < lastScroll || current <= 20) {
        setShowHeader(true);
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="App app-flex-layout">
      {showHeader && (
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          background: 'transparent',
          color: '#3b3b5c',
          fontWeight: 700,
          fontSize: '1.7rem',
          letterSpacing: '-1px',
          padding: '22px 0 18px 0',
          textAlign: 'center',
          zIndex: 100,
          boxShadow: '0 2px 12px 0 rgba(80,80,180,0.08)'
        }}>
          내 일정 관리하기
        </header>
      )}
      <div style={{height: 80, minWidth: 0}} />
      <div className="register-panel">
        <h2>일정 등록</h2>
        <form onSubmit={addTask}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ minWidth: 120, marginRight: 8 }}
          />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="새 일정 입력"
            type="text"
          />
          <button type="submit">추가</button>
        </form>
        <button
          type="button"
          style={{ marginTop: 12, background: '#fff', color: '#6c63ff', border: '1.5px solid #6c63ff', borderRadius: 8, padding: '8px 18px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
          onClick={() => setShowCalendar(v => !v)}
        >
          {showCalendar ? '목록으로 보기' : '달력으로 보기'}
        </button>
        {showCalendar && (
          <div style={{ marginTop: 24 }}>
            <Calendar
              value={new Date(date)}
              onClickDay={onCalendarChange}
              tileContent={tileContent}
              calendarType="gregory"
              locale="ko-KR"
            />
            <div style={{ marginTop: 16 }}>
              <b>{date} 일정</b>
              <ul>
                {(tasksByDate[date] || []).length === 0 && <li className="empty">일정이 없습니다.</li>}
                {(tasksByDate[date] || []).map((task, idx) => (
                  <li key={idx}>
                    <span>{task}</span>
                    <button className="delete-btn" onClick={() => removeTask(date, idx)}>삭제</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      {!showCalendar && (
        <div className="list-panel">
          <h2>일정 목록</h2>
          <div className="schedule-container" style={{ boxShadow: 'none', marginTop: 0, padding: '20px 18px 16px 18px' }}>
            {sortedDates.length === 0 && <div className="empty">일정이 없습니다.</div>}
            {sortedDates.map(dateKey => (
              <div key={dateKey} style={{ marginBottom: 24 }}>
                <div style={{ marginBottom: 8, color: '#6c63ff', fontWeight: 500, fontSize: '1.08rem' }}>{dateKey} 일정</div>
                <ul>
                  {tasksByDate[dateKey].map((task, idx) => (
                    <li key={idx}>
                      <span>{task}</span>
                      <button className="delete-btn" onClick={() => removeTask(dateKey, idx)}>삭제</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

