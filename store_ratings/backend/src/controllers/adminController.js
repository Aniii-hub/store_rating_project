const { User, Role, Store, Rating } = require('../models');
const { Op } = require('sequelize');
exports.dashboard = async (req, res) => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();
  res.json({ totalUsers, totalStores, totalRatings });
};
exports.createUser = async (req, res) => {
  const { name, email, address, password, roleName } = req.body;
  try {
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) return res.status(400).json({ message: 'Invalid role' });
    const user = await User.create({ name, email, address, roleId: role.id, passwordHash: '' });
    user.setPassword(password);
    await user.save();
    res.json({ message: 'User created' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.listUsers = async (req, res) => {
  const { q, role, sortBy = 'name', dir = 'ASC' } = req.query;
  const where = {};
  if (q) where[Op.or] = [{ name: { [Op.iLike]: `%${q}%` } }, { email: { [Op.iLike]: `%${q}%` } }, { address: { [Op.iLike]: `%${q}%` } }];
  if (role) {
    const roleObj = await Role.findOne({ where: { name: role } });
    if (roleObj) where.roleId = roleObj.id;
  }
  const users = await User.findAll({ where, include: [Role], order: [[sortBy, dir]] });
  res.json(users.map(u => ({ id: u.id, name: u.name, email: u.email, address: u.address, role: u.Role.name })));
};
exports.listStores = async (req, res) => {
  const { q, sortBy = 'name', dir = 'ASC' } = req.query;
  const where = {};
  if (q) where[Op.or] = [{ name: { [Op.iLike]: `%${q}%` } }, { address: { [Op.iLike]: `%${q}%` } }];
  const stores = await Store.findAll({ where, include: [{ model: Rating }], order: [[sortBy, dir]] });
  const out = stores.map(s => {
    const avg = s.Ratings.length ? (s.Ratings.reduce((a,b)=>a+b.value,0)/s.Ratings.length).toFixed(2) : null;
    return { id: s.id, name: s.name, email: s.email, address: s.address, rating: avg };
  });
  res.json(out);
};
