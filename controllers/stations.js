/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Station = require('../models/').Station;
const Sensor = require('../models/').Sensor;

module.exports = {
    create(req, res) {
        return Station
                .create({
                    ipAdress: req.body.ipAdress,
                    frequency: req.body.frequency,
                    position: req.body.position,
                    name: req.body.name,
                })
                .then(station => res.status(200).send(station))
                .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Station
                /*.findAll({
                    include: [{
                            model: Sensor,
                            as: "sensors"
                        }],
                })*/
                .all()
                .then(stations => res.status(200).send(stations))
                .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
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
    update(req, res) {
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
                            .update({
                                ipAdress: req.body.ipAdress || station.ipAdress,
                                frequency: req.body.frequency || station.frequency,
                                position: req.body.position || station.position,
                                name: req.body.name || station.name
                            })
                            .then(stationupdated => res.status(200).send(stationupdated))
                            .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
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
    },
}

