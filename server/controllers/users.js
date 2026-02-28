const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/User');

// Create - 유저 생성
const createUser = async (req, res) => {
  try {
    const { email, name, password, user_type } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: '이메일, 이름, 비밀번호를 모두 입력해 주세요.' });
    }
    
    // 비밀번호 암호화
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      user_type: user_type || 'customer',
    });
    
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Login - 로그인
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 입력해 주세요.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '가입되지 않은 이메일입니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
    }

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: '로그인 성공',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
  }
};

// Read All - 유저 목록 조회
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read One - 유저 단일 조회
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update - 유저 수정
const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    // 비밀번호가 포함된 경우 암호화
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete - 유저 삭제
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
    }
    res.json({ message: '유저가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
