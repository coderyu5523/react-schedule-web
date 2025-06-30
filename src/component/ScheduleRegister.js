import React from 'react';
import CalendarView from './CalendarView';

function ScheduleRegister({
  date,
  setDate,
  input,
  setInput,
  addTask,
  showCalendar,
  setShowCalendar,
  tileContent,
  onCalendarChange,
  tasksByDate,
  removeTask
}) {
  return (
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
        <CalendarView
          date={date}
          onCalendarChange={onCalendarChange}
          //tileContent={tileContent}
          //tasksByDate={tasksByDate}
        />
      )}
    </div>
  );
}

export default ScheduleRegister; 