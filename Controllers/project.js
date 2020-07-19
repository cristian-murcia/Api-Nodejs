'use strict';

var Project = require('../Models/project');
var fs = require('fs'); //Libreria File System
var path = require('path');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy el home'
        });
    },

    test: function (req, res) {
        res.status(200).send({
            message: 'Soy el metodo test del controlador project'
        });
    },

    // Metodo que nos permite guardar datos en la base de datos
    saveProject: function (req, res) {
        var project = new Project();
        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el documento.' });
            if (!projectStored) return res.status(404).send({ message: 'Peticion no encontrada' });

            return res.status(200).send({ project: projectStored });
        });
    },

    // Metodo para mostrar detalles de un proyecto de la base de datos
    getProject: function (req, res) {
        var projectId = req.params.id;
        if (projectId == null) return res.status(404).send({ message: 'El proyecto no encontrado' });

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error al mostrar registro' });
            if (!project) return res.status(404).send({ message: 'El proyecto no encontrado' });
            return res.status(200).send({
                project
            });
        });
    },

    // Metodo que trae todos los registros de la coleccion de Projects
    getProjects: function (req, res) { //sort() filtra por parametro
        Project.find().sort('year').exec((err, projects) => { //exec() ejecuta un query en mongo

            if (err) return res.status(500).send({ message: 'Error al mostrar registro' });
            if (!projects) return res.status(404).send({ message: 'El proyecto no encontrado' });
            return res.status(200).send({
                projects
            });
        });
    },

    //Metodo para actualizar datos del registro
    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;
        
        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {

            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!projectUpdated) res.status(404).send({ message: 'No existe el proyecto' });
            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    //Metodo para borrar registros
    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {

            if (err) return res.status(500).send({ message: 'No se pudo borrar el registro.' });
            if (!projectDeleted) return res.status(404).send({ message: 'No se encontro el registro a borrar' });
            return res.status(200).send({
                project: projectDeleted,
                message: 'Registro Borrado'
            });
        });
    },

    //Metodo para la subida de archivos
    uploadImagen: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no cargada.';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\'); //split() separa la cadena de texto despues del '\\'.
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'La imagen no se ha subido' });
                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no encontrado' });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => { //unlink() borra un archivo de cierta ruta.
                    return res.status(200).send({ message: 'La extension no es valida.' });
                });
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },

    //Metodo que retorna una lista de imagenes de proyectos 
    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        })
    }

};

module.exports = controller;