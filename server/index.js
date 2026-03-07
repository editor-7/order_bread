require('./config/env');
const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const connectDB = require('./config/db');

const app = express();

// Middleware - CORS (Vercel 등 모든 origin 허용)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function start() {
  await connectDB();
}

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Shopping Mall API Server is running!' });
});

// CloudType 헬스체크용
app.get('/health', (req, res) => res.status(200).send('ok'));

// API 라우트
app.use('/api', require('./routes'));

// 서버 시작
start().then(() => {
  app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
  console.log(`MongoDB URI: ${config.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  if (config.NODE_ENV === 'production') {
    console.log('NODE_ENV: production');
  }
  });
}).catch((err) => {
  console.error('서버 시작 실패:', err);
  process.exit(1);
});
