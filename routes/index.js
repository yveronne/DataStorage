const sensorsController = require('../controllers/').sensors;
const stationsController = require('../controllers/').stations;
const weatherDataController = require('../controllers/').weatherDatas;
const forecastDataController = require('../controllers/').forecastDatas;
const validator=require('../controllers/').validator;

module.exports = (app) => {
    

    // sensors routes
    app.post('/api/stations/:stationId/sensors',validator.validate('createSensor'), sensorsController.create); //create a sensor
    app.get('/api/stations/sensors', sensorsController.list); //list all sensors
    app.get('/api/stations/:stationId/sensors',validator.validate('listSensorStation'), sensorsController.listSensorStation); //list all sensors of a specific station
    app.put('/api/stations/:stationId/sensors/:sensorId',validator.validate('retrieveSensor'),sensorsController.update); // update a sensor
    app.get('/api/stations/:stationId/sensors/:sensorId',validator.validate('retrieveSensor'),sensorsController.retrieve); //retrieve a particular sensor

    //stations routes
    app.post('/api/stations',validator.validate('createStation'), stationsController.create); //create a station
    app.get('/api/stations', stationsController.list); //list all stations
    app.get("/api/stations/:stationId",validator.validate('retrieveStation'),stationsController.retrieve);
    app.put('/api/stations/:stationId',validator.validate('retrieveStation'), stationsController.update); //update informations on a station
    app.delete('/api/stations/:stationId', validator.validate('retrieveStation'),stationsController.destroy); //delete a station

    //weather datas routes
    app.post("/api/stations/:sensorId/datas", validator.validate("storeDatas"),weatherDataController.create); //store weather datas from a specific sensor
    app.get("/api/stations/sensors/datas",weatherDataController.list); //list all the weather data
    app.put('/api/stations/:sensorId/datas/:id',validator.validate("updateDatas"),weatherDataController.update);
    app.get("/api/stations/:sensorId/datas", validator.validate("retrieveDatas"),weatherDataController.listSensorDatas); // list all the weather data of a particular sensor
    
    //ForecastData routes
    app.post("/api/stations/:sensorId/forecastdatas",validator.validate("storeDatas") ,forecastDataController.create);//store forecast weather datas from a specific sensor
    app.get("/api/stations/sensors/forecastdatas", forecastDataController.list);//list all forecast weather data
    app.put('/api/stations/:sensorId/forecastdatas/:dataId',validator.validate("updateDatas"),forecastDataController.update);
    app.get("/api/stations/:sensorId/datas",validator.validate("retrieveDatas"), forecastDataController.listSensorDatas);// list all forecast weather data of a particular sensor

};

