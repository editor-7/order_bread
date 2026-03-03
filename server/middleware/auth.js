const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '로그인이 필요합니다.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }
};

const requireAdmin = async (req, res, next) => {
  if (!req.user || req.user.user_type !== 'admin') {
    return res.status(403).json({ message: '관리자 권한이 필요합니다.' });
  }
  next();
};

module.exports = { requireAuth, requireAdmin };
