const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied: Not an employee' });
    }

    req.user = decoded; // Attach decoded token to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Access denied: Invalid token' });
  }
};
