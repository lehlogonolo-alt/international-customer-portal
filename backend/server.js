const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const https = require('https');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

//  Core Middleware
app.use(express.json({ limit: '10kb' })); // prevent large payload attacks
app.use(helmet()); // sets secure HTTP security headers

app.use(cors({
  origin: ['https://localhost', 'http://localhost'], // allow local dev only
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

//  Rate Limiting (prevents brute force & DDoS)
const limiter = rateLimit({
   
 windowMs: 15 * 60 * 1000,  // 15 minutes
 max: 100,                  // limit each IP to 100 requests per window
  message: '⛔ Too many requests — try again later.'
});
app.use(limiter);

//  Content Security Policy — prevents XSS & clickjacking
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self';");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

//  Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/employee', require('./routes/employeeRoutes')); // employee protected routes

//  Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

//  Redirect HTTP → HTTPS (optional when deployed)
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

//  HTTPS Certificate
const sslOptions = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.crt')
};

//  Start secure HTTPS server
const PORT = process.env.PORT || 5000;
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Secure server running at https://localhost:${PORT}`);
});

module.exports = app;

