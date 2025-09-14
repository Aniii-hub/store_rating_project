require('dotenv').config();
const app = require('./app');
const { sequelize, Role, User } = require('./models');
const port = process.env.PORT || 4000;
async function start() {
  await sequelize.sync({ alter: true });
  const roles = ['SystemAdmin','Normal','StoreOwner'];
  for (let r of roles) await Role.findOrCreate({ where: { name: r } });
  const adminRole = await Role.findOne({ where: { name: 'SystemAdmin' }});
  const [adminUser, created] = await User.findOrCreate({ where: { email: 'admin@example.com' }, defaults: { name: 'System Administrator Account XYZ', address: 'Head Office', roleId: adminRole.id, passwordHash: '' } });
  if (created) { adminUser.setPassword('Admin@123'); await adminUser.save(); console.log('Created admin admin@example.com / Admin@123'); }
  app.listen(port, () => console.log('Server running on', port));
}
start();
