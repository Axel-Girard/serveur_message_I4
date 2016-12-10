var express = require('express');
var router = express.Router();

// load des model de bdd
var threadModel = require('../models/thread.js');
var messageModel = require('../models/message.js');

/* GET messages of a thread listing. */
router.get('/', function(req, res) {
  var monThread = new threadModel({ createur : 'Mopi' });
  monThread.title = 'Une idée ?';
  monThread.save(function (err) {
    if (err) throw err;
    console.log('Thread ajouté dans la bdd \\o/ !');
  });


  threadModel.find(null, function (err, threads) {
    if (err) {
      res.respond("Threads impossible à trouver", 503);
    }
    // message est un tableau de hash
    res.respond(threads, 200);
  });
});

/* GET messages of a thread listing. */
router.get('/:id', function(req, res) {
  var monMessage = new messageModel({ pseudo : 'Mopi' });
  monMessage.message = 'Message!';
  monMessage.save(function (err) {
    if (err) throw err;
    console.log('Message ajouté dans la bdd \\o/ !');
  });
  threadModel.update({ _id : req.params.id }, { messages : monMessage }, function (err) {
    if (err) throw err;
    console.log('Messages modifiés !');
  });

  threadModel.find({ _id : req.params.id }, function (err, threads) {
    if (err) {
      res.respond("Threads impossible à trouver", 503);
    }
    // message est un tableau de hash
    res.respond(threads, 200);
  });
  // var monMessage = new messageModel({ pseudo : 'Mopi' });
  // monMessage.message = 'Message!';
  // monMessage.save(function (err) {
  //   if (err) throw err;
  //   console.log('Message ajouté dans la bdd \\o/ !');
  // });
  //
  //
  // messageModel.find(null, function (err, message) {
  //   if (err) {
  //     res.respond("Message impossible à trouver", 503);
  //   }
  //   // message est un tableau de hash
  //   res.respond(message, 200);
  // });
});

module.exports = router;
