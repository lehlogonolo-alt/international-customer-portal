import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import '../App.css';

function LoginForm() {
  const [form, setForm] = useState({
    username: '',
    accountNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const isEmployee = form.accountNumber.trim() === '';
    const endpoint = isEmployee ? '/api/auth/employee/login' : '/api/auth/login';

    const payload = isEmployee
      ? { username: form.username, password: form.password }
      : form;

    try {
      const res = await API.post(endpoint, payload);
      const token = res.data.token;
      const decoded = jwtDecode(token); 

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', decoded.role);

      alert('Login successful');

      if (decoded.role === 'employee') {
        navigate('/employee-dashboard');
      } else if (decoded.role === 'customer') {
        navigate('/customer-dashboard');
      } else {
        alert('Unknown role. Please contact support.');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <span role="img" aria-label="bank" className="login-logo">🏦</span>
          <h2>Welcome back!</h2>
          <p className="login-sub">Sign in to your account</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
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
            name="accountNumber"
            value={form.accountNumber}
            placeholder="Account Number (leave blank for employee)"
            onChange={handleChange}
          />
          <input
            className="login-input"
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="login-btn" type="submit">Login</button>
        </form>
        <p className="login-register">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;





