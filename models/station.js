'use strict';
module.exports = (sequelize, DataTypes) => {
    const Station = sequelize.define('Station', {
        ipAdress: {
            type: DataTypes.INET,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
        },
        frequency: {
            type: DataTypes.INTEGER,
        },
        position: {
            type: DataTypes.GEOMETRY('POINT')
        }

    }, {
        timestamps: true,
        paranoid: true,
        deletedAt: 'destroyTime',
        freezeTableName: true,
        tableName: 'Stations'
    });
    Station.associate = function (models) {
        Station.hasMany(models.Sensor, {
            foreignKey: 'stationID',
            as: 'sensors'
        });
    };
    return Station;
};