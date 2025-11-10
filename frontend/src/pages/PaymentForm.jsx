import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function PaymentForm() {
  const [form, setForm] = useState({
    amount: '',
    currency: '',
    provider: '',
    payeeAccount: '',
    swiftCode: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');

      const res = await API.post('/api/payments', form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(res.data.message || 'Payment submitted');

      if (role === 'employee') {
        navigate('/employee-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>Submit Payment</h2>
          <p className="login-sub">Send a payment securely</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input className="login-input" name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
          <input className="login-input" name="currency" placeholder="Currency" onChange={handleChange} required />
          <input className="login-input" name="provider" placeholder="Provider" onChange={handleChange} required />
          <input className="login-input" name="payeeAccount" placeholder="Payee Account" onChange={handleChange} required />
          <input className="login-input" name="swiftCode" placeholder="SWIFT Code" onChange={handleChange} required />
          <button className="login-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;


