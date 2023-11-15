const express= require ('express')
const controller = require('../Controller/ControllerCar')
const carRoutes= express.Router();  

carRoutes.get('/getCars',controller.getAllCars);
carRoutes.post('/addCar',controller.addCar)
carRoutes.put('/updateCar/:id',controller.updateCar)
carRoutes.get('/getCarById/:id',controller.getCarById)
carRoutes.get('/getCarsByOwner/:id',controller.getMyCars)
carRoutes.delete('/deleteCar/:id',controller.deleteCar)

module.exports = carRoutes
