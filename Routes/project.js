'use strict';

var express = require('express');
var ProjectController = require('../Controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

//Metodos Get 
router.get('/home', ProjectController.home);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.get('/get-image/:image', ProjectController.getImageFile);

//Metodos Post
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImagen);

//Metodos Put
router.put('/updateproject/:id', ProjectController.updateProject);

//Metodos Delete
router.delete('/deleteProject/:id', ProjectController.deleteProject);

module.exports = router;