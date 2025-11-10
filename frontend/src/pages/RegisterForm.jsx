import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function RegisterForm() {
  const [form, setForm] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/api/auth/register', form);
      alert(res.data.message || 'Registration successful');
      navigate('/'); // Redirect to login after success
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>Create your account</h2>
          <p className="login-sub">Join our banking portal</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            name="fullName"
            value={form.fullName}
            placeholder="Full Name (2–50 letters)"
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="idNumber"
            value={form.idNumber}
            placeholder="ID Number (13 digits)"
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="accountNumber"
            value={form.accountNumber}
            placeholder="Account Number (10 digits)"
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="login-input"
            name="password"
            type="password"
            value={form.password}
            placeholder="Password (8+ chars, uppercase, number, special)"
            onChange={handleChange}
            required
          />
          <button className="login-btn" type="submit">Register</button>
        </form>
        <p className="login-register">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;



