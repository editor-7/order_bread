const mongoose = require('mongoose');
const config = require('../config/env');
const Product = require('../models/Product');

const INITIAL_PRODUCTS = [
  { name: '깜바뉴', desc: '정성스럽게 구운 깜바뉴', category: '클래식', price: 18000, img: '/jpg/08.jpg', size: '1개', unit: 'EA' },
  { name: '바게트', desc: '정성스럽게 구운 바게트', category: '바게트', price: 15000, img: '/jpg/02.jpg', size: '1개', unit: 'EA' },
];

async function seed() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(INITIAL_PRODUCTS);
      console.log('초기 상품 2개 등록 완료');
    }
  } catch (err) {
    console.error('Seed 오류:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
