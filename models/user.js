'use strict'

const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                default: null,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            status: { type: DataTypes.ENUM("available ", "assign",), defaultValue: "available" },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        },
        {
            tableName: 'User'
        }
    )
    User.associate = function () { }
    return User
}
