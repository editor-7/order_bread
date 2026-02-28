require('./config/env');
const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
connectDB();

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Shopping Mall API Server is running!' });
});

// API 라우트
app.use('/api', require('./routes'));

// 서버 시작
app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
  console.log(`MongoDB URI: ${config.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  if (config.NODE_ENV === 'production') {
    console.log('NODE_ENV: production');
  }
});
