import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await API.get('/api/payments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data);
      } catch (err) {
        alert('Failed to load payment history');
        navigate('/');
      }
    };
    fetchPayments();
  }, [navigate]);

  const renderStatus = (payment) => {
    if (payment.submittedToSwift) {
      return <span className="status-badge submitted">📤 Submitted to SWIFT</span>;
    }
    if (payment.verified) {
      return <span className="status-badge verified">✅ Verified</span>;
    }
    return <span className="status-badge pending">⏳ Pending</span>;
  };

  return (
    <div className="login-bg">
      <div className="login-card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>My Payment History</h2>
        </div>
        {payments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7a90' }}>No payments found</p>
        ) : (
          <div style={{ width: '100%', marginTop: '1rem' }}>
            {payments.map(payment => (
              <div
                key={payment._id}
                style={{
                  border: '1px solid #e0eafc',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                  background: '#f8fafc'
                }}
              >
                <p><strong>Amount:</strong> {payment.amount}</p>
                <p><strong>Currency:</strong> {payment.currency}</p>
                <p><strong>Provider:</strong> {payment.provider}</p>
                <p><strong>Payee Account:</strong> {payment.payeeAccount}</p>
                <p><strong>SWIFT Code:</strong> {payment.swiftCode}</p>
                <p><strong>Status:</strong> {renderStatus(payment)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentHistory;

