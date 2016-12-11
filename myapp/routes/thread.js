var express = require('express');
var router = express.Router();

// load des model de bdd
var userModel = require('../models/user.js');
var threadModel = require('../models/thread.js');
var messageModel = require('../models/message.js');

/* GET liste des threads */
router.get('/', function(req, res) {
  threadModel.find(null, function (err, threads) {
    if (err) throw err;
    res.respond(threads, 200);
  });
});

/* PUT ajout d'un thread */
router.put('/', function(req, res) {
  // recherche du membre
  var queryUser = userModel.find(null);
  queryUser.where('_id', req.body.idUser).limit(1);
  queryUser.exec(function (err, users) {
    if (err) throw err;
    if(users.length > 0){
      // création du message associé au thread
      var message = req.body.messages[0];
      var monMessage = new messageModel({ pseudo : users[0].pseudo });
      monMessage.message = message.message;
      monMessage.save(function (err) {
        if (err) throw err;
        console.log('Message ajouté dans la bdd \\o/ !');
      });

      // création du thread
      var monThread = new threadModel({ createur : users[0].pseudo });
      monThread.title = req.body.title;
      monThread.messages = [monMessage];
      monThread.save(function (err) {
        if (err) throw err;
        console.log('Thread ajouté dans la bdd \\o/ !');
        res.respond(monThread._id, 201);
      });
    } else {
      res.respond("Vous devez être authentifié pour créer un thread", 401);
    }
  });
});

/* GET list les messages d'un thread */
router.get('/:id', function(req, res) {
  threadModel.find({ _id : req.params.id }, function (err, threads) {
    if (err) throw err;
    if(threads.length > 0){
      res.respond(threads[0], 200);
    } else {
      res.respond("Aucune donnée", 404);
    }
  });
});

/* PATCH Ajout un message au thread */
router.patch('/:idTrhead', function(req, res) {
  // recherche du membre
  var queryUser = userModel.find(null);
  queryUser.where('_id', req.body.idUser).limit(1);
  queryUser.exec(function (err, users) {
    if (err) throw err;
    if(users.length > 0){
      var monMessage = new messageModel({ pseudo : users[0].pseudo });
      monMessage.message = req.body.message;
      monMessage.save(function (err) {
        if (err) throw err;
        console.log('Message ajouté dans la bdd \\o/ !');
      });

      threadModel.find({ _id : req.params.idTrhead }, function (err, threads) {
        if (err) throw err;

        if(threads.length > 0){
          var mesMessages = threads[0].messages.concat([monMessage]);

          threadModel.update({ _id : req.params.idTrhead }, { messages : mesMessages }, function (err) {
            if (err) throw err;
            console.log('Message ajouté au thread !');
            res.respond("Message ajouté au thread !", 200);
          });
        } else {
          res.respond("Aucune donnée", 404);
        }
      });
    } else {
      res.respond("Vous devez être authentifié pour créer un thread", 401);
    }
  });
});

/* DELETE supprime un thread */
router.delete('/:idThread', function(req, res) {
  threadModel.remove({ _id : req.params.idThread }, function (err) {
    if (err) throw err;
    console.log('Thread supprimé !');
    res.respond('thread supprimé !', 200);
  });
});

/* DELETE supprime un message d'un thread */
router.delete('/:idThread/:idMessage', function(req, res) {
  messageModel.remove({ _id : req.params.idMessage }, function (err) {
    if (err) throw err;
    console.log('Message supprimé !');
  });
});

module.exports = router;
