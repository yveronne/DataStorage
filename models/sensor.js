'use strict';
const Station=require('../models').Station;

module.exports = (sequelize, DataTypes) => {
    const Sensor = sequelize.define('Sensor', {
        name: DataTypes.STRING,
        state: {
            type: DataTypes.ENUM,
            values:["enabled", "disabled", "broken"],
            defaultValue: 'enabled'
        },
        type: DataTypes.ARRAY(DataTypes.TEXT),
        stationID: {
            type: DataTypes.INTEGER,
            references: {
                model: Station,
                key: 'id',
            }
        }

    }, {
        timestamps: true,
        freezeTableName: true,
        tableName: 'Sensors'
    });
    Sensor.associate = function (models) {
        Sensor.belongsTo(models.Station, {
            foreignKey: 'stationID',
            targetKey: 'id'
        });
        Sensor.hasMany(models.WeatherData, {
            foreignKey: 'sensorID',
            as: 'datas',
            onDelete: 'SET NULL'
        });
        Sensor.hasMany(models.ForecastData, {
            foreignKey: 'sensorID',
            as: 'forecastdatas',
            onDelete: 'SET NULL'
        })
    };
    return Sensor;
};