const { Model, DataTypes } = require('sequelize');
class Store extends Model { static init(sequelize) { return super.init({ name: { type: DataTypes.STRING(255), allowNull: false }, email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } }, address: { type: DataTypes.STRING(400) } }, { sequelize, tableName: 'stores' }); } }
module.exports = Store;
