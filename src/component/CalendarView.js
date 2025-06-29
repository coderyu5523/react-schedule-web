import React from 'react';
import Calendar from 'react-calendar';

function CalendarView({ date, onCalendarChange, tileContent, tasksByDate }) {
  return (
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
          {(tasksByDate[date] || []).map((task) => (
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