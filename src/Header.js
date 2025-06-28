import React from 'react';

function Header({ show }) {
  if (!show) return null;
  return (
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
  );
}

export default Header; 