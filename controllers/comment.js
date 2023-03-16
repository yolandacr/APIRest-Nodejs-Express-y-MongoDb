'use strict'

var validator = require('validator');

var Topic = require('../models/topic');

var controller = {
    add: function(req,res){
        //Recoger el id del topic de la url
        var topicId = req.params.id;
        

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
        //Conseguir id de comentario que llega por la id
        var commentId = req.params.id;
        

        //Recoger datos y validar
        var params = req.body;
      

        //Validar los datos
        try{
            var validate_content = !validator.isEmpty(params.content);
            
            if(validate_content){
                //Find and update
                Topic.findOneAndUpdate(
                    { "comments._id": commentId },
                    { "$set":{
                        "comments.$.content": params.content
                        } 
                    },
                    {new:true},
                    (err,topicUpdated) => {
                        if(err){
                            return res.status(500).send({
                                status: 'error',
                                message: "Error en la petición"
                            });
                        }
            
                        if(!topicUpdated){
                            return res.status(404).send({
                                status: 'error',
                                message: "No existe el tema",
                                commentId
                            });
                        }
                        //Devolver datos
                        return res.status(200).send({
                            status: "success",
                            topic: topicUpdated
                        });
                    });
            }
        }catch(err){
            return res.status(200).send({
                message: 'No has comentado nada'
            });
        }

       
    },

    delete: function(req,res){
        //Sacar el id del topic y del comentario a borrar
        var topicId = req.params.topicId;
        var commentId = req.params.commentId;

        //Buscar el topic
        Topic.findById(topicId,(err,topic)=>{
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
            //Seleccionar el subdocumento(comentario)
            var comment = topic.comments.id(commentId);

            //Borrar el comentario
            if(comment){
                comment.remove();
                //Guardar el topic
                topic.save((err)=>{
                    if(err){
                        return res.status(500).send({
                            status: 'error',
                            message: "Error en la petición"
                        });
                    }
                    //Devolver un resultado
                    return res.status(200).send({
                        status: "success",
                        topic
                    });
                });
               
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el comentario",
                    topicId
                });
            }
            
        });
    }


};

module.exports = controller;

