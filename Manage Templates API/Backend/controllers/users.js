'use strict'

var validator = require('validator');
var UserSchema = require('../models/users')
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/users');


var controller = {

    save: (req, res) => {                       
        //Recoger parametros por post (recojemos los que nos llegue por el body)
        var params = req.body;
        console.log(params);

        //Validar datos con Validator
        try{                                          //KEY nombre
            var validate_nombre = !validator.isEmpty(params.nombre);  //Cuando no esté vacío este campo
            var validate_apellidos = !validator.isEmpty(params.apellidos);
        }catch(err){
            return res.status(200).send({
                status: error,
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_nombre && validate_apellidos){ //Ejecutamos esto cuando los datos estén validados
            //Crear el objeto a guardar
            var user = new UserSchema();

            //Asignar valores al objeto (Scheema de models user)
            user.nombre = params.nombre;
            user.apellidos = params.apellidos;
            user.image = null;


            //Guardar en base de datos
            user.save((err, userStored) => {

                if (err || !userStored){ //Si no va, avisa
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado !!!'
                    });
                }


            //Devolver respuesta 
                else{ //Si va, gurda y di success
                    return res.status(200).send({
                        status: 'success',
                        user: userStored
                    });
                }
            })
        }

        else{ //sinó
            return res.status(200).send({
                status: "error",
                message: 'Los datos no son válidos'
            }); 
        }
    },




    // Método para obtener los usuarios
    getUsers: (req, res) => {
        // Find
         //({condiciones})        objeto general del bd
        UserSchema.find({}).sort('-_id').exec((err, user) => {
            
            if(err){
                return res.status(500).send({
                    status: "Error",
                    message: 'Error al devolver los articulos'
                }); 
            }

            if(!user){
                return res.status(404).send({
                    status: "Error",
                    message: 'No hay articulos para mostrar',
                }); 
            }


            return res.status(200).send({
                status: "succes",
                user
            }); 
        })
    },



    getUnicUser: (req, res) => {

        var userId = req.params.id;

        // Comprobar que existe
        if(!userId || userId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el usuario'
            });
        }

        // Buscar el articulo
        UserSchema.findById(userId, (err, user) => {
            
            if(err || !user){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                user
            });
        });
    },





    update: (req, res) => {
        // Recoger el ID del articulo que viene por la url
        var userId = req.params.id;   

        // Recoger los datos que llegan por PUT (body)
        var params = req.body;  

        // Validar los datos
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);  //Cuando no esté vacío este campo
            var validate_apellidos = !validator.isEmpty(params.apellidos);
        }
        catch(err){
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_nombre && validate_apellidos){   /* si son true  */
            // Find and update
            UserSchema.findOneAndUpdate({_id: userId}, params, {new:true}, (err, userUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if(!userUpdated){  //Si no me llega userUpdated
                    return res.status(500).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }  

                return res.status(500).send({
                    status: 'success',
                    user: userUpdated
                });
                    
            });
        }
        
        else{
            // Devolver respuesta
    
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
       

    },



    delete: (req, res) => {
        // Recoger el ID de la URL
        var userId = req.params.id; 

        // Find and delete            id igual 
        UserSchema.findOneAndDelete({_id:userId}, (err, userRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!userRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'El usuario no se ha borrado, posiblemente no existe'
                });
            }

            return res.status(200).send({
                status: 'success',
                user: userRemoved
            });
        });
    },




    upload: (req, res) => {
        // Configurar el modulo connect multiparty router/users.js (hecho)

        // Recoger el fichero de la peticion
        var file_name = 'Imagen no subida';

        if(!req.files){  //Si no llega ninguna foto
            return res.status(404).send({
                status: error,
                message: file_name
            });
        }

        // Conseguir el nombre y la extension del archivo
                              //nombre fichero  file0
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');   //Para separar los trozos y quedarme con el tercero (upload\\users\rzx324x....) cogemos la tercera franja
                                                  //  * ADVERTENCIA *  EN LINUX O MAC  ->   var file_split = file_path.split('/');


        // Nombre del archivo
        var file_name = file_split[2];

        //Extension del fichero
        var extension_split = file_name.split('\.');
        var file_extension = extension_split[1];


        // Comprobar la extension, solo imagenes, si no es valido borrar el fichero
        if(file_extension != 'png' && file_extension != 'jpg' && file_extension != 'jpeg' && file_extension != 'gif'){
            //Borrar el archivo
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'La extension de la imagen no es válida'
                });
            });
        }
        
        else{
            // Si todo es valido
            var userId = req.params.id;    // Sacar ID de la url

            // Buscar el usuario, asignarle el nombre de la imagen y asignarlo
            UserSchema.findOneAndUpdate({_id: userId}, {image: file_name}, {new:true}, (err, userUpdated) => {

                if(err || !userUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del usuario'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: userUpdated
                });
            });    
        }
    },



    getImage: (req, res) => {
        var file = req.params.image;   //Sacar nombre de la imagen del usuario
        console.log(file);
        var path_file = './upload/avatar_images/'+file;  //Ruta completa del archivo


        fs.exists(path_file, (exists) => {  //Comprobar si el archivo existe
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }

            else{
                return res.status(200).send({
                    status: 'success',
                    message: 'La imagen no existe'
                });
            }
        })
    },



    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;


        // Find or 
        UserSchema.find({ "$or": [
            { "nombre": { "$regex": searchString, "$options": "i" }},
            { "apellidos": { "$regex": searchString, "$options": "i" }},
        ]})
        .sort([['date', 'descending']])
        .exec((err, users) => {
            
            if(err){
                return res.status(200).send({
                    status: 'error',
                    message: 'Error en la peticion',
                    searchString
                });
            };

            if(!users){
                return res.status(200).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con la busqueda',
                    searchString
                });
            };
            
            return res.status(200).send({
                status: 'success',
                users
            });

            
        })

    }

};


module.exports = controller;