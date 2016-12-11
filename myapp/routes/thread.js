var express = require('express');
var router = express.Router();

// load des model de bdd
var threadModel = require('../models/thread.js');
var messageModel = require('../models/message.js');

/* GET liste des threads */
router.get('/', function(req, res) {
  threadModel.find(null, function (err, threads) {
    if (err) {
      res.respond("Threads impossible à trouver", 503);
      throw err;
    }
    res.respond(threads, 200);
  });
});

/* PUT ajout d'un thread */
router.put('/', function(req, res) {
  // création du message associé au thread
  var message = req.body.messages[0];
  var monMessage = new messageModel({ pseudo : message.pseudo });
  monMessage.message = message.message;
  monMessage.save(function (err) {
    if (err) {
      res.respond("Threads impossible à créer", 503);
      throw err;
    }
    console.log('Message ajouté dans la bdd \\o/ !');
  });

  // création du thread
  var monThread = new threadModel({ createur : req.body.createur });
  monThread.title = req.body.title;
  monThread.messages = [monMessage];
  monThread.save(function (err) {
    if (err) {
      res.respond("Threads impossible à créer", 503);
      throw err;
    }
    console.log('Thread ajouté dans la bdd \\o/ !');
    res.respond("thread ajouté", 201);
  });
});

/* GET list les messages d'un thread */
router.get('/:id', function(req, res) {
  threadModel.find({ _id : req.params.id }, function (err, threads) {
    if (err) {
      res.respond("Threads impossible à trouver", 503);
      throw err;
    }
    if(threads.length >= 0){
      res.respond(threads[0], 200);
    } else {
      res.respond("Aucune donnée", 404);
    }
  });
});

/* PATCH Ajout un message au thread */
router.patch('/:id', function(req, res) {
  var monMessage = new messageModel({ pseudo : req.body.pseudo });
  monMessage.message = req.body.message;
  monMessage.save(function (err) {
    if (err) {
      res.respond("Threads impossible à créer", 503);
      throw err;
    }
    console.log('Message ajouté dans la bdd \\o/ !');
  });

  threadModel.find({ _id : req.params.id }, function (err, threads) {
    if (err) {
      res.respond("Threads impossible à trouver", 503);
      throw err;
    }

    if(threads.length >= 0){
      var mesMessages = threads[0].messages.concat([monMessage]);

      threadModel.update({ _id : req.params.id }, { messages : mesMessages }, function (err) {
        if (err) {
          res.respond("Threads impossible à trouver", 503);
          throw err;
        }
        console.log('Message ajouté au thread !');
        res.respond("Message ajouté au thread !", 200);
      });
    } else {
      res.respond("Aucune donnée", 404);
    }
  });
});

/* DELETE supprime un thread */
router.delete('/:id', function(req, res) {
  threadModel.remove({ _id : req.params.id }, function (err) {
    if (err) {
      throw err;
    }
    console.log('Thread supprimé !');
    res.respond('Thread supprimé !', 200);
  });
});

// /* DELETE supprime un message d'un thread */
// router.delete('/:id/:id', function(req, res) {
//   threadModel.find({ _id : req.params.id }, function (err, threads) {
//     if (err) {
//       res.respond("Threads impossible à trouver", 503);
//       throw err;
//     }
//
//     if(threads.length >= 0){
//       var mesMessages = threads[0].messages.concat([monMessage]);
//
//       threadModel.update({ _id : req.params.id }, { messages : mesMessages }, function (err) {
//         if (err) {
//           res.respond("Threads impossible à trouver", 503);
//           throw err;
//         }
//         console.log('Message ajouté au thread !');
//         res.respond("Message ajouté au thread !", 200);
//       });
//     } else {
//       res.respond("Aucune donnée", 404);
//     }
//   });
// });

module.exports = router;
