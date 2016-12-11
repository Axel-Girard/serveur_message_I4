var express = require('express');
var router = express.Router();

var userModel = require('../models/user.js');

/* GET affiche un membre */
router.get('/:id', function(req, res) {
  userModel.find({ _id : req.params.id }, function (err, users) {
    if (err) {
      throw err;
    }
    if(users.length > 0){
      res.respond(users[0], 200);
    } else {
      res.respond("Aucune donnée", 404);
    }
  });
});

/* PUT ajout d'un membre */
router.put('/creation', function(req, res) {
  // vérification du pseudo unique
  userModel.find({ pseudo : req.body.pseudo }, function (err, users) {
    if (err) {
      throw err;
    }
    if(users.length > 0){
      res.respond("Pseudo déjà utilisé", 403);
    } else {
      var monUser = new userModel({ pseudo : req.body.pseudo });
      monUser.mdp = req.body.mdp;
      monUser.save(function (err) {
        if (err) {
          throw err;
        }
        console.log('Membre ajouté dans la bdd \\o/ !');
        res.respond(monUser._id, 201);
      });
    }
  });
});

/* GET affiche un membre */
router.post('/connect', function(req, res) {
  userModel.find({ pseudo : req.body.pseudo, mdp: req.body.mdp }, function (err, users) {
    if (err) {
      throw err;
    }
    if(users.length > 0){
      res.respond(users[0]._id, 200);
    } else {
      res.respond("Aucune donnée", 404);
    }
  });
});

/* DELETE supprime d'un membre */
router.delete('/:idUser', function(req, res) {
  userModel.remove({ _id : req.params.idUser }, function (err) {
    if (err) throw err;
    console.log('Membre supprimé !');
  });
});

module.exports = router;
