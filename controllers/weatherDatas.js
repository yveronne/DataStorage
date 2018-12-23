/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const WeatherData = require('../models/').WeatherData;
const Sensor = require('../models/').Sensor;
const Station = require('../models/').Station;
const {validationResult} = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
            .findAll({
                where: {
                    date: {
                        [Op.gte]: new Date(),
                        [Op.lt]: new Date(new Date() + 24*60*60*1000)
                    }
                }
            })
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
            .findOne({
                where: {
                    id: req.params.id,
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
    listSome(req, res){
        return WeatherData
            .findAll({
                where: {
                    date: {
                        [Op.gte] : new Date(req.query.start) ,
                        [Op.lte] : new Date(req.query.end) ,
                    }
                }

            })
            .then(weatherDatas => res.status(200).send(weatherDatas))
            .catch(error => res.status(400).send(error));
    }

};

