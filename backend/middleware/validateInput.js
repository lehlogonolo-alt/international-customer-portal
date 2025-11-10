const { body } = require('express-validator');

//  Customer Registration Validation
exports.registerValidation = [
  body('fullName')
    .matches(/^[A-Za-z\s]{2,50}$/)
    .withMessage('Full name must be 2–50 letters'),

  body('idNumber')
    .matches(/^\d{13}$/)
    .withMessage('ID number must be 13 digits'),

  body('accountNumber')
    .matches(/^\d{10}$/)
    .withMessage('Account number must be 10 digits'),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must be 8+ chars, include uppercase, number, and special character')
];

//  Customer Login Validation
exports.loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),

  body('accountNumber')
    .matches(/^\d{10}$/)
    .withMessage('Account number must be 10 digits'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

//  Employee Login Validation
exports.employeeLoginValidation = [
  body('username')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
    .notEmpty()
    .withMessage('Username is required'),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password is required')
];

