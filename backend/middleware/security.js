/**
 * middleware/security.js
 * Security hardening middleware.
 */
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security headers (Helmet + CSP + HSTS)
function setHelmet(app) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
    })
  );
}

// Request rate limiting (anti-DDoS)
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Helper to enforce HTTPS
function enforceHTTPS(req, res, next) {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') return next();
  return res.status(400).json({ error: 'Use HTTPS connection' });
}

// Whitelisting helper
function whitelistField(field, regex) {
  return (req, res, next) => {
    const val = req.body[field];
    if (val && !regex.test(val)) {
      return res.status(400).json({ error: `Invalid ${field}` });
    }
    next();
  };
}

module.exports = { setHelmet, apiRateLimiter, enforceHTTPS, whitelistField };
