'use strict'

module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define(
        'Report',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                default: null,
            },
            last_name: {
                type: DataTypes.STRING,
                default: null,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: { type: DataTypes.ENUM("pending ", "assign", "completed"), defaultValue: "pending" },
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
            tableName: 'Report'
        }
    )
    Report.associate = function (models) {
        const { User } = models;
        Report.belongsTo(User, {
            foreignKey: { name: "userId", },
            defaultValue: null,
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    }

    return Report
}
