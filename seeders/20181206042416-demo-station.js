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
        return queryInterface.bulkInsert('Stations', [{
                name: 'station 1',
                ipAdress: '192.168.8.1',
                position: 'Point (39.807222 -76.984722)',
                frequency: 20,
                createdAt: new Date(),
                updatedAt: new Date()
            },{
                name: 'station 2',
                ipAdress: '192.168.8.6',
                position: 'Point (11.500125 3.862692)',
                frequency: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});

    },

    down: (queryInterface, Sequelize) => {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.
         
         Example:
         return queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('', null, {});
    }
};
