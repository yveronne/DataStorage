'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Stations', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ipAdress: {
                type: Sequelize.INET,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING
            },
            frequency: {
                type: Sequelize.INTEGER
            },
            position: {
                type: Sequelize.GEOMETRY('POINT')
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            destroyTime: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Stations');
    }
};