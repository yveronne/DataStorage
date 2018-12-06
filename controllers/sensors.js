/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Sensor = require('../models/').Sensor;

module.exports = {
    create(req, res) {
        return Sensor
                .create({
                    state: req.body.state,
                    name: req.body.name,
                    type: req.body.type,
                    stationID: req.params.stationId
                })
                .then(sensor => res.status(200).send(sensor))
                .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Sensor
                .all()
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
    },
    listSensorStation(req, res) {
        return Sensor
                .findAll({
                    where: {
                        stationID: req.params.stationId,
                    },
                })
                .then(sensors => res.status(200).send(sensors))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Sensor
                .find({
                    where: {
                        id: req.params.sensorId,
                        stationID: req.params.stationId,
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
        return Sensor
                .find({
                    where: {
                        id: req.params.sensorId,
                        stationID: req.params.stationId,
                    }
                })
                .then(sensor => {
                    if (!sensor) {
                        create(req, res);
                        return res.status(404).send({
                            message: 'sensor Not Found',
                        });
                    }
                    return sensor
                            .update({
                                state: req.body.state, //|| sensor.state,
                                type: req.body.type, //|| sensor.type,
                                name: req.body.name, //|| sensor.name
                            })
                            .then(() => res.status(200).send(sensor))
                            .catch((error) => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    }
};

