import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CustomerDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || role !== 'customer') {
      navigate('/');
    }
  }, [navigate, token, role]);

  return (
    <div className="login-bg">
      <div className="login-card" style={{ paddingTop: '2.5rem' }}>
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>Welcome to the Dashboard</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <button className="login-btn" onClick={() => navigate('/submit-payment')}>Make a Payment</button>
          <button className="login-btn" onClick={() => navigate('/payment-history')}>View Payment History</button>
          <button
            className="login-btn"
            style={{ background: '#e57373', marginTop: '0.5rem' }}
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userRole');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;



