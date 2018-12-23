'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.
         
         Example:
         return queryInterface.bulkInsert('People', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */

        return queryInterface.bulkInsert('Sensors', [{
                name: "Capteur 1",
                stationID: 1,
                type: 'humidite',
            },
            {
                name: "Capteur 2",
                stationID: 1,
                type: 'temperature',
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.
         
         Example:
         return queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('Sensors', null, {});
    }
};
