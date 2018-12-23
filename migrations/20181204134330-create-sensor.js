'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Sensors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            state: {
                type: Sequelize.ENUM,
                values: ["enabled", "disabled", "broken"],
                defaultValue: 'enabled'
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING

            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
                type: Sequelize.DATE
            },
            stationID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Stations',
                    key: 'id',
                    as: 'StationID',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Sensors');
    }
};