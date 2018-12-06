const stationsController = require('../controllers/').stations;

module.exports = (app) => {
   
    app.post('/api/stations', stationsController.create);
    app.get('/api/stations', stationsController.list);
    app.put('/api/stations/:stationId', stationsController.update);
    app.delete('/api/stations/:stationId', stationsController.destroy);
};