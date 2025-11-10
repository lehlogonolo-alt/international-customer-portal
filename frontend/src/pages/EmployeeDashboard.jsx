import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || role !== 'employee') {
      navigate('/');
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await API.get('/api/employee/unverified', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payments');
      }
    };

    fetchPayments();
  }, [navigate, token, role]);

  const handleVerify = async (id) => {
    try {
      await API.put(`/api/payments/verify/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(prev =>
        prev.map(p => p._id === id ? { ...p, verified: true } : p)
      );
      toast.success('✅ Payment verified');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Verification failed');
    }
  };

  const handleSubmitToSwift = async (id) => {
    try {
      await API.put(`/api/payments/submit/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(prev => prev.filter(p => p._id !== id));
      toast.success('📤 Submitted to SWIFT');
    } catch (err) {
      toast.error(err.response?.data?.message || 'SWIFT submission failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="dashboard-card">
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>Employee Dashboard</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <button
            className="login-btn"
            style={{ background: '#e57373', marginBottom: '1rem' }}
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('userRole');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginTop: '2rem', width: '100%' }}>
          <h3>Unverified Payments</h3>
          {error && <p className="error">{error}</p>}
          <div className="table-scroll">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Provider</th>
                  <th>Payee Account</th>
                  <th>SWIFT Code</th>
                  <th>Timestamp</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p._id}>
                    <td>{p.amount}</td>
                    <td>{p.currency}</td>
                    <td>{p.provider}</td>
                    <td>{p.payeeAccount}</td>
                    <td>{p.swiftCode}</td>
                    <td>{new Date(p.timestamp).toLocaleString()}</td>
                    <td>
                      {p.verified
                        ? <span className="status-badge verified">✅ Verified</span>
                        : <span className="status-badge pending">⏳ Unverified</span>}
                    </td>
                    <td>
                      <div className="action-group">
                        {!p.verified && (
                          <button className="action-btn" onClick={() => handleVerify(p._id)}>Verify</button>
                        )}
                        <button
                          className="action-btn"
                          onClick={() => handleSubmitToSwift(p._id)}
                          disabled={!p.verified}
                          title={!p.verified ? 'Verify first to enable submission' : 'Submit to SWIFT'}
                        >
                          Submit to SWIFT
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

export default EmployeeDashboard;






