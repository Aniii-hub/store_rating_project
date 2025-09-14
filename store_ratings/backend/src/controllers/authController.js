const { User, Role } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { body, validationResult } = require('express-validator');

exports.signupValidators = [
  body('name').isLength({ min: 20, max: 60 }),
  body('email').isEmail(),
  body('address').isLength({ max: 400 }),
  body('password').isLength({ min: 8, max: 16 }).matches(/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/)
];

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, address, password } = req.body;
  try {
    const role = await Role.findOne({ where: { name: 'Normal' } });
    const user = await User.create({ name, email, address, roleId: role.id, passwordHash: '' });
    user.setPassword(password);
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginValidators = [body('email').isEmail(), body('password').exists()];

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }, include: { model: Role } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  if (!user.validatePassword(password)) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, role: user.Role.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, role: user.Role.name });
};
