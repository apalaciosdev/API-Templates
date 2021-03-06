# API b谩sica Node.js con Express

_API funcional con conexi贸n a base de datos de Mongo.db_

## Funcionalidad 馃殌

Esta API permite crear, guardar, modificar y eliminar Usuarios de una base de datos Mongo.

A parte, lleva incorporada un controlador de b煤squeda para filtrar.

Mira **controllers/users.js** para ver todos los controladores del proyecto.


## Pre-requisitos 馃搵
M贸dulos utilizados en esta API:

_Express_

```
npm i express
```

_Mongoose_

```
npm i mongoose
```

_Nodemon_

```
npm i nodemon
```

_Cors_

```
npm i cors
```

_Validator_

```
npm i validator
```

_Connect Multiparty_

```
npm i connect-multiparty
```

## Controladores 馃敡

### Edici贸n de la base de datos

Esta API tiene controladores que permiten **agregar**, **editar**, **borrar** o **filtrar** usuarios. 



### Archivos multimedia

A parte, tambien se permite la subida de archivos multimedia en cada usuario.
Como el proyecto se basa principalmente en la gesti贸n de usuarios, el controlador **upload** solamente permite subir im谩genes con extensi贸n ".png", ".jpg" o ".jpeg" (esto puede ser editable).


