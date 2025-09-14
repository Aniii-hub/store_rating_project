const { Model, DataTypes } = require('sequelize');
class Role extends Model { static init(sequelize) { return super.init({ name: { type: DataTypes.STRING, allowNull: false, unique: true } }, { sequelize, tableName: 'roles' }); } }
module.exports = Role;
