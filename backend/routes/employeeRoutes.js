const express = require('express');
const router = express.Router();
const employeeOnly = require('../middleware/employeeOnly');
const Payment = require('../models/Payment');

//  Import input validation for employee actions
const { employeeLoginValidation } = require('../middleware/validateInput');

//  Employee login route (static accounts only — no registration)
router.post('/login', employeeLoginValidation, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Example static login check (replace with your actual static users)
    const staticUsers = [
      { username: 'admin1', password: 'Admin@123' },
      { username: 'financeUser', password: 'Finance@123' },
    ];

    const user = staticUsers.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Simulate session/token creation
    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

//  Get all payments not yet submitted to SWIFT (employee-only)
router.get('/unverified', employeeOnly, async (req, res) => {
  try {
    const payments = await Payment.find({ submittedToSwift: false });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments', error: err.message });
  }
});

module.exports = router;
