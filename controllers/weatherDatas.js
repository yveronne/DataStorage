/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const WeatherData = require('../models/').WeatherData;
const {validationResult} = require('express-validator/check');

module.exports = {
    create(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return WeatherData
                .create({
                    date: req.body.date,
                    value: req.body.value,
                    type: req.body.type,
                    sensorID: req.params.sensorId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                .then(weatherData => res.status(200).send(weatherData))
                .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        
        return WeatherData
                .all()
                .then(weatherDatas => res.status(200).send(weatherDatas))
                .catch(error => res.status(400).send(error));
    },
    listSensorDatas(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return WeatherData
                .findAll({
                    where: {
                        sensorID: req.params.sensorId,
                    },
                })
                .then(weatherDatas => res.status(200).send(weatherDatas))
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return WeatherData
                .find({
                    where: {
                        id:req.params.id,
                        sensorID: req.params.sensorId,
                    },
                })
                .then(station => {
                    if (!station) {
                        return res.status(404).send({
                            message: 'station Not Found',
                        });
                    }

                    return station
                            .update({
                                type: req.body.type || station.type,
                                value: req.body.value || station.value,
                                sensorID: req.body.sensorId || station.sensorID
                            })
                            .then(stationupdated => res.status(200).send(stationupdated))
                            .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    /*destroy(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Station
                .find({
                    where: {
                        id: req.params.stationId
                    },
                })
                .then(station => {
                    if (!station) {
                        return res.status(404).send({
                            message: 'station Not Found',
                        });
                    }
                    return station
                            .destroy()
                            .then(() => res.status(200).send({
                                    message: 'Station deleted successfully',
                                }))
                            .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },*/
    
};

