'use strict'

var express = require ('express');
var CommentController = require('../controllers/comment');

var router = express.Router();
var md_auth = require('../middlewares/authenticated');

router.post('/comment/topic/:id', CommentController.add);
router.put('/comment/:id', md_auth.authenticated, CommentController.update);
router.delete('/comment/:topicId/:commentId', md_auth.authenticated, CommentController.delete);


module.exports= router;