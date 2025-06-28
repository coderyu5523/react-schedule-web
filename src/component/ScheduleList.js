import React from 'react';

function ScheduleList({ sortedDates, tasksByDate, removeTask }) {
  return (
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
  );
}

export default ScheduleList; 