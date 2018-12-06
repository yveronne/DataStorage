const sensorsController = require('../controllers/').sensors;
const stationsController = require('../controllers/').stations;
const weatherDataController = require('../controllers/').weatherDatas;
const forecastDataController = require('../controllers/').forecastDatas;

module.exports = (app) => {
    

    // sensors routes
    app.post('/api/stations/:stationId/sensors', sensorsController.create); //create a sensor
    app.get('/api/stations/sensors', sensorsController.list); //list all sensors
    app.get('/api/stations/:stationId/sensors', sensorsController.listSensorStation); //list all sensors of a specific station
    app.put('/api/stations/:stationId/sensors/:sensorId/',sensorsController.update); // update a sensor
    app.get('/api/stations/:stationId/sensors/:sensorId',sensorsController.retrieve); //retrieve a particular sensor

    //stations routes
    app.post('/api/stations', stationsController.create); //create a station
    app.get('/api/stations', stationsController.list); //list all stations 
    app.put('/api/stations/:stationId', stationsController.update); //update informations on a station
    app.delete('/api/stations/:stationId', stationsController.destroy); //delete a station

    //weather datas routes
    app.post("/api/stations/:sensorId/datas", weatherDataController.create); //store weather datas from a specific sensor
    app.get("/api/stations/datas", weatherDataController.list); //list all the weather data
    app.get("/api/stations/:sensorId/datas", weatherDataController.listSensorDatas); // list all the weather data of a particular sensor
    
    //ForecastData routes
    app.post("/api/stations/:sensorId/forecastdatas", forecastDataController.create);//store forecast weather datas from a specific sensor
    app.get("/api/stations/forecastdatas", forecastDataController.list);//list all forecast weather data
    app.get("/api/stations/:sensorId/datas", forecastDataController.listSensorDatas);// list all forecast weather data of a particular sensor

};

