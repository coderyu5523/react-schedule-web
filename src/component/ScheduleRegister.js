import React from 'react';
import Calendar from 'react-calendar';

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
  );
}

export default ScheduleRegister; 