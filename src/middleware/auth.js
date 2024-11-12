const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/auth');

const authMiddleware = async (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return { isAuth: false, user: null };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { isAuth: true, user: decoded };
  } catch (err) {
    return { isAuth: false, user: null };
  }
};

module.exports = authMiddleware;