const api = require("../Controller/ControllerUser");
const express= require('express');
const ControllerUser = require('../Controller/ControllerUser')

const UsersRoutes= express.Router()

UsersRoutes.post('/SignUp',ControllerUser.SignUp);
UsersRoutes.post('/SignIn',ControllerUser.SignIn);

UsersRoutes.get('/getCurrentUser',(req,res)=>res.send(req.user));

module.exports = UsersRoutes