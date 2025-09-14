const { Model, DataTypes } = require('sequelize');
class Rating extends Model { static init(sequelize) { return super.init({ value: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } } }, { sequelize, tableName: 'ratings' }); } }
module.exports = Rating;
