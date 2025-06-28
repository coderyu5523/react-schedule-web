import React, { useState, useEffect } from 'react';
import Header from './Header';
import ScheduleRegister from './component/ScheduleRegister';
import ScheduleList from './component/ScheduleList';
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
      <Header show={showHeader} />
      <div style={{height: 80, minWidth: 0}} />
      <ScheduleRegister
        date={date}
        setDate={setDate}
        input={input}
        setInput={setInput}
        addTask={addTask}
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        tileContent={tileContent}
        onCalendarChange={onCalendarChange}
        tasksByDate={tasksByDate}
        removeTask={removeTask}
      />
      {!showCalendar && (
        <ScheduleList
          sortedDates={sortedDates}
          tasksByDate={tasksByDate}
          removeTask={removeTask}
        />
      )}
    </div>
  );
}

export default App;

