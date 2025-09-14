const { Store, Rating, User } = require('../models');
const { Op } = require('sequelize');
exports.createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;
  try {
    const store = await Store.create({ name, email, address, ownerId });
    res.json(store);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.listStoresPublic = async (req, res) => {
  const { q, sortBy = 'name', dir = 'ASC' } = req.query;
  const where = {};
  if (q) where[Op.or] = [{ name: { [Op.iLike]: `%${q}%` } }, { address: { [Op.iLike]: `%${q}%` } }];
  const stores = await Store.findAll({ where, include: [{ model: Rating }] , order: [[sortBy, dir]] });
  const out = stores.map(s => {
    const avg = s.Ratings.length ? (s.Ratings.reduce((a,b)=>a+b.value,0)/s.Ratings.length).toFixed(2) : null;
    return { id: s.id, name: s.name, address: s.address, rating: avg };
  });
  res.json(out);
};
exports.submitRating = async (req, res) => {
  const { storeId } = req.params;
  const { value } = req.body;
  const userId = req.user.id;
  if (!value || value < 1 || value > 5) return res.status(400).json({ message: 'Invalid rating' });
  try {
    const existing = await Rating.findOne({ where: { storeId, userId } });
    if (existing) {
      existing.value = value;
      await existing.save();
      return res.json({ message: 'Rating updated' });
    }
    const rating = await Rating.create({ storeId, userId, value });
    res.json({ message: 'Rating submitted', rating });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.listRatingsForStore = async (req, res) => {
  const { storeId } = req.params;
  const ratings = await Rating.findAll({ where: { storeId }, include: [User] });
  res.json(ratings.map(r => ({ id: r.id, value: r.value, user: { id: r.User.id, name: r.User.name, email: r.User.email } })));
};
