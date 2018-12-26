/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Sensor = require('../models/').Sensor;
const {validationResult} = require('express-validator/check');

module.exports = {
    create(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
                .create({
                    state: req.body.state,
                    name: req.body.name,
                    type: req.body.type,
                    stationID: req.params.stationId,
                    port: req.body.port
                })
                .then(sensor => res.status(201).send(sensor))
                .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Sensor
                .findAll({})
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
    },
    listStationSensorByState(req,res){
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
                .findAll({
                    where: {
                        stationID: req.params.stationId,
                        state: req.params.state
                    },
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
    },
    listSensorByState(req,res){
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
            .findAll({
                where: {
                    state: req.params.state
                },
            })
            .then(sensors => res.status(200).send(sensors))
            .catch(error => res.status(400).send(error));
    },
    listSensorByType(req,res){
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
            .findAll({
                where: {
                    type: req.params.type
                },
            })
            .then(sensors => res.status(200).send(sensors))
            .catch(error => res.status(400).send(error));
    },
    listSensorStation(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        const type = req.query.type;
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        if(type != null){
            return Sensor
                .findOne({
                    where: {
                        stationID: req.params.stationId,
                        type: req.query.type
                    },
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
        }
        else {
            return Sensor
                .findAll({
                    where: {
                        stationID: req.params.stationId,
                    },
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
        }
    },
    retrieve(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
                .findOne({
                    where: {
                        id: req.params.sensorId,
                    },
                })
                .then(sensor => {
                    if (!sensor) {
                        return res.status(404).send({
                            message: 'Sensor not found'
                        });
                    }
                    return res.status(200).send(sensor);
                })
                .catch(error => res.status(400).send(error));
    },
    retrieveByName(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
                .findOne({
                    where: {
                        name: req.params.name,
                    },
                })
                .then(sensor => {
                    if (!sensor) {
                        return res.status(404).send({
                            message: 'Sensor not found'
                        });
                    }
                    return res.status(200).send(sensor);
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Sensor
                .findOne({
                    where: {
                        id: req.params.sensorId,
                    }
                })
                .then(sensor => {
                    if (!sensor) {
                        create(req, res);
                        return res.status(404).send({
                            message: 'Sensor Not Found',
                        });
                    }
                    return sensor
                            .update({
                                state: req.body.state || sensor.state,
                                type: req.body.type || sensor.type,
                                name: req.body.name || sensor.name,
                                port : req.body.port || sensor.port
                            })
                            .then(() => res.status(200).send(sensor))
                            .catch((error) => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
};

