const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      // Mongoose 6+ 에서는 아래 옵션들이 기본값이므로 선택적으로 사용
    });
    console.log(`MongoDB 연결됨: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB 연결 오류:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
