const express = require('express');
const router = express.Router();
const { register, login, employeeLogin } = require('../controllers/authController');
const { registerValidation, loginValidation, employeeLoginValidation } = require('../middleware/validateInput');
const { validationResult } = require('express-validator');

//  Customer Registration
router.post('/register', registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, register);

//  Customer Login
router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, login);

//  Static Employee Login
router.post('/employee/login', employeeLoginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, employeeLogin);

module.exports = router;

