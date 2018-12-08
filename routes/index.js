const sensorsController = require('../controllers/').sensors;
const stationsController = require('../controllers/').stations;
const weatherDataController = require('../controllers/').weatherDatas;
const forecastDataController = require('../controllers/').forecastDatas;
const validator=require('../controllers/').validator;

module.exports = (app) => {
    
    // sensors routes
    app.get('/api/sensors', sensorsController.list); //list all sensors
    app.put('/api/sensors/:sensorId',validator.validate('retrieveSensor'),sensorsController.update); // update a sensor
    app.get('/api/sensors/:sensorId',validator.validate('retrieveSensor'),sensorsController.retrieve); //retrieve a particular sensor
    app.post('/api/stations/:stationId/sensors',validator.validate('createSensor'), sensorsController.create); //create a sensor
    app.get('/api/stations/sensors/:state',validator.validate('listSensorByState'), sensorsController.listSensorByState); //list all sensors with state = :state
    app.get('/api/stations/:stationId/sensors',validator.validate('listSensorStation'), sensorsController.listSensorStation); //list all sensors of a specific station
    app.get('/api/stations/:stationId/sensors/:state',validator.validate('listStationSensorByState'),sensorsController.listStationSensorByState); //list all sensors of a station with state = :state

    //stations routes
    app.post('/api/stations',validator.validate('createStation'), stationsController.create); //create a station
    app.get('/api/stations', stationsController.list); //list all stations
    app.get("/api/stations/:stationId",validator.validate('retrieveStation'),stationsController.retrieve);
    app.put('/api/stations/:stationId',validator.validate('retrieveStation'), stationsController.update); //update informations on a station
    app.delete('/api/stations/:stationId', validator.validate('retrieveStation'),stationsController.destroy); //delete a station

    //weather datas routes
    app.get("/api/datas",weatherDataController.list); //list all the weather data
    app.post("/api/:sensorId/datas", validator.validate("storeDatas"),weatherDataController.create); //store weather datas from a specific sensor
    // app.put('/api/:sensorId/datas/:id',validator.validate("updateDatas"),weatherDataController.update);
    app.get("/api/:sensorId/datas", validator.validate("retrieveDatas"),weatherDataController.listSensorDatas); // list all the weather data of a particular sensor
    
    //ForecastData routes
    app.get("/api/forecastdatas", forecastDataController.list);//list all forecast weather data
    app.post("/api/:sensorId/forecastdatas",validator.validate("storeDatas") ,forecastDataController.create);//store forecast weather datas from a specific sensor
    app.put('/api/:sensorId/forecastdatas/:id',validator.validate("updateDatas"),forecastDataController.update);
    app.get("/api/:sensorId/forecastdatas",validator.validate("retrieveDatas"), forecastDataController.listSensorDatas);// list all forecast weather data of a particular sensor

};