'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ForecastDatas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
      },
      type: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.REAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sensorID:{
          type: Sequelize.INTEGER,
          references: {
              model: 'Sensors',
              key:'id',
              as:'sensorID',
          },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ForecastDatas');
  }
};