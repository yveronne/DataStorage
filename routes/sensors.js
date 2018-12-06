/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const sensorsController=require('../controllers/').sensors;


module.exports=(app)=>{
    app.post('/api/stations/:stationId/sensors', sensorsController.create);
    app.get('/api/sensors', sensorsController.list);
    /*app.put('/api/stations/:stationId', sensorsController.update);
    app.delete('/api/stations/:stationId', sensorsController.destroy);*/
};
