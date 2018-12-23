'use strict';
const Sensor=require('../models').Sensor;

// todo add a method to retrieve the station associated to the data

module.exports = (sequelize, DataTypes) => {
    const WeatherData = sequelize.define('WeatherData', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.REAL,
            allowNull: false
        },
        sensorID: {
            type: DataTypes.INTEGER,
            references: {
                model: Sensor,
                key: 'id',
            }
        }
    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: 'WeatherDatas'
    });
    WeatherData.associate = function (models) {
        WeatherData.belongsTo(models.Sensor, {
            foreignKey: 'sensorID',
            targetKey: 'id'
        });
    };
    return WeatherData;
};