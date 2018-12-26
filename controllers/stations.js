/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Station = require('../models/').Station;
const Sensor = require('../models/').Sensor;
const {validationResult} = require('express-validator/check');

module.exports = {
    create(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const point = {type: 'point', coordinates: [req.body.longitude, req.body.latitude]};

        return Station
                .create({
                    ipAdress: req.body.ipAdress,
                    frequency: req.body.frequency,
                    position: point, //"ST_MakePoint("+req.body.longitude+", "+req.body.latitude+")",
                    name: req.body.name,
                })
                .then(station => res.status(200).send(station))
                .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Station
                .findAll({
                    include: [{
                            model: Sensor,
                            as: "sensors"
                        }],
                    order: [
                        ['createdAt', 'DESC'],
                        [{model: Sensor, as: 'sensors'}, 'createdAt', 'DESC'],
                    ],
                })
                //.all()
                .then(stations => res.status(200).send(stations))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Station
                .findById(req.params.stationId, {
                    include: [{
                            model: Sensor,
                            as: "sensors",
                        }],
                })
                .then(station => {
                    if (!station) {
                        return res.status(404).send({
                            message: 'station not found'
                        });
                    }
                    return res.status(200).send(station);
                })
                .catch(error => res.status(400).send(error));
    },
    retrieveByName(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Station
                .find({where: {
                        name: req.params.name
                    },
                    include: [{
                            model: Sensor,
                            as: "sensors",
                        }],
                })
                .then(station => {
                    if (!station) {
                        return res.status(404).send({
                            message: 'station not found'
                        });
                    }
                    return res.status(200).send(station);
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        return Station
                .findById(req.params.stationId, {
                    include: [{
                            model: Sensor,
                            as: "sensors",
                        }],
                })
                .then(station => {
                    if (!station) {
                        return res.status(404).send({
                            message: 'station Not Found',
                        });
                    }
                    var point = null;
                    if (req.body.longitude && req.body.latitude) {
                        point = {type: 'point', coordinates: [req.body.longitude, req.body.latitude]};
                    } else if (req.body.longitude) {
                        point = {type: 'point', coordinates: [req.body.longitude, station.position.coordinates[1]]};
                    } else if (req.body.latitude) {
                        point = {type: 'point', coordinates: [station.position.coordinates[0], req.body.latitude]};
                    } else {
                        point = station.position;
                    }
                    return station
                            .update({
                                ipAdress: req.body.ipAdress || station.ipAdress,
                                frequency: req.body.frequency || station.frequency,
                                position: point,
                                name: req.body.name || station.name
                            })
                            .then(stationupdated => res.status(200).send(stationupdated))
                            .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        const errors = validationResult(req); // to get the result of above validate fn
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        return Station
                .findById(req.params.stationId, {
                    include: [{
                            model: Sensor,
                            as: "sensors",
                        }],
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
                    /*return station
                     .destroy()
                     .then(() => {
                     Sensor
                     .destroy({
                     where: {stationID: station.id}
                     })
                     .then(() => res.status(200).send({
                     message: 'Station deleted successfully',
                     })
                     )
                     .catch(error => res.status(400).send(error))
                     })
                     .catch(error => res.status(400).send(error));*/
                })
                .catch(error => res.status(400).send(error));
    },
};

