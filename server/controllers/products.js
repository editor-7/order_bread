const Product = require('../models/Product');

const getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ order: 1, createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, desc, category, price, img, size, unit } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: '상품명과 가격을 입력해 주세요.' });
    }
    const product = await Product.create({
      name,
      desc: desc || `정성스럽게 구운 ${name}`,
      category: category || name,
      price: Number(price),
      img: img || '/jpg/01.jpg',
      size: size || '1개',
      unit: unit || 'EA',
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    res.json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
