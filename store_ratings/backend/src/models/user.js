const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
class User extends Model { static init(sequelize) { return super.init({ name: { type: DataTypes.STRING(60), allowNull: false }, email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } }, address: { type: DataTypes.STRING(400) }, passwordHash: { type: DataTypes.STRING, allowNull: false } }, { sequelize, tableName: 'users' }); } setPassword(password) { this.passwordHash = bcrypt.hashSync(password, 10); } validatePassword(password) { return bcrypt.compareSync(password, this.passwordHash); } }
module.exports = User;
