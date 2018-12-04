'use strict';
module.exports = (sequelize, DataTypes) => {
    const WeatherData = sequelize.define('WeatherData', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
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
        timestamps: false,
        freezeTableName: true,
        tableName: 'WeatherData'
    });
    WeatherData.associate = function (models) {
        WeatherData.belongsTo(models.Sensor, {
            foreignKey: 'sensorID',
            targetKey: 'id'
        });
    };
    return WeatherData;
};