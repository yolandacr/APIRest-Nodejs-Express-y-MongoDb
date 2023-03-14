'use strict'

var validator = require('validator');

var Topic = require('../models/topic');

var controller = {
    add: function(req,res){
        //Recoger el id del topic de la url
        console.log(req);
        var topicId = req.params.id;
        

        console.log(topicId);

        //Find por la id del topic
        Topic.findById(topicId).exec((err, topic) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: "Error en la petición"
                });
            }

            if(!topic){
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el tema",
                    topicId
                });
            }

            //Comprobar objeto usuario y validar datos
            if(req.body.content){
                //Validar los datos
                try{
                    var validate_content = !validator.isEmpty(req.body.content);  
                }catch(err){
                    return res.status(200).send({
                        message: 'No has comentado nada'
                    });
                }

                if(validate_content){
                    console.log(req.user);
                    var comment = {
                        user: req.user,
                        content: req.body.content
                    };

                    //En la propiedad comments del objeto resultante hacerun push
                    topic.comments.push(comment);

                    //Guardar el topic completo
                    topic.save((err) => {

                        if(err){
                            return res.status(500).send({
                                status: 'error',
                                message: "Error al guardar el comentario"
                            });
                        }

                    //Devolver la respuesta
                        return res.status(200).send({
                            state: 'success',
                            topic
                        }); 

                    });
                   

                }else{
                    return res.status(200).send({
                        message: 'No se ha validado correctamente'
                    }); 
                }
            }

        });
       
    },

    update: function(req,res){
        return res.status(200).send({
            message: "Método de edición de un comentario"
        });
    },

    delete: function(req,res){
        return res.status(200).send({
            message: "Método de borrado comentarios"
        });
    }


};

module.exports = controller;

