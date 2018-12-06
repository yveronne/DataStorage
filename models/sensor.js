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
        timestamps: false,
        freezeTableName: true,
        tableName: 'Sensors'
    });
    Sensor.associate = function (models) {
        Sensor.belongsTo(models.Station, {
            foreignKey: 'stationID',
            targetKey: 'id'
        });
    };
    return Sensor;
};