'use strict';
module.exports = (sequelize, DataTypes) => {
    const ForecastData = sequelize.define('ForecastData', {
        date: {
            type: DataTypes.DATEONLY,
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
        tableName: 'ForecastData'
    });
    ForecastData.associate = function (models) {
        ForecastData.belongsTo(models.Sensor, {
            foreignKey: 'sensorID',
            targetKey: 'id'
        });
    };
    return ForecastData;
};