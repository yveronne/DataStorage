/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const weatherDataController=require('../controllers/').weatherDatas;

module.exports=(app)=>{
    app.post("/api/stations/:sensorId/datas",weatherDataController.create);
    app.get("/api/stations/datas",weatherDataController.list);
};

