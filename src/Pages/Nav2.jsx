// Nav2.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Nav2.css';

const Nav2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const storeName =
    location.state?.storeName ||
    localStorage.getItem('storeName') ||
    'Your Store';

  return (
    <header className="nav2-container">
      <div className="nav2-logo" onClick={() => navigate('/', { state: { storeName } })}>
        Local<span className="nav2-highlight">Scope</span>
      </div>
      <nav className="nav2-menu">
        <span
          className={currentPath === '/home' ? 'active' : ''}
          onClick={() => navigate('/home', { state: { storeName } })}
        >
          Dashboard
        </span>
        <span
          className={currentPath === '/catlog' ? 'active' : ''}
          onClick={() => navigate('/catlog', { state: { storeName } })}
        >
          Catalog
        </span>
        <span
          className={currentPath === '/orders' ? 'active' : ''}
          onClick={() => navigate('/orders', { state: { storeName } })}
        >
          Orders
        </span>
      </nav>
    </header>
  );
};

export default Nav2;
