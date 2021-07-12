'use strict'

var express = require('express');
var UserController = require('../controllers/users');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/avatar_images'}); // Middleware upload

// RUTAS TEST
//                 ruta                 metodo



// RUTAS
router.post('/save', UserController.save);                            //Guardar nuevo User                  (http://localhost:3900/api/save)  ->  Body > x-www-form-urlencoded
router.get('/get-users', UserController.getUsers);                    //Ver listado de Users                (http://localhost:3900/api/get-users)
router.get('/user-filter/:id', UserController.getUnicUser);           //Filtrar Users                       (http://localhost:3900/api/user-filter/<user_id>)
router.put('/user-update/:id', UserController.update);                //Actualizar User                     (http://localhost:3900/api/user-update/<user_id>)  ->  Body > x-www-form-urlencoded
router.delete('/user-delete/:id', UserController.delete);             //Eliminar Users                      (http://localhost:3900/api/user-delete/<user_id>)

router.post('/upload-image/:id', md_upload, UserController.upload);   //Añadir imagen al usuario            (http://localhost:3900/api/upload-image)  ->  POST > Body > form-data > [key] file0
router.get('/get-image/:image', UserController.getImage);             //Ver imagen del usuario              (http://localhost:3900/api/get-image/<imagen>)
router.get('/search/:search', UserController.search);                 //Buscar                              (http://localhost:3900/api/search/<texto a buscar>)



module.exports = router;