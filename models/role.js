const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL,
        },
        dapartment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: 'department',
            referencesKey: 'id',
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'role',
    }
)

module.exports = Role ;
