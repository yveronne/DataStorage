/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const stations=require("../controllers/stations");
const sensors=require('../controllers/sensors');
const weatherDatas=require("../controllers/weatherDatas");
const forecastDatas=require("../controllers/forecastDatas");
const validator=require('../controllers/validator');

module.exports={
    stations,
    sensors,
    weatherDatas,
    forecastDatas,
    validator
};

