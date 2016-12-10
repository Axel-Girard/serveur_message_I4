// initialise la bdd
// connection à la base mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://88.190.3.123:27018/messages', function(err) {
  if (err) throw err;
  console.log('Connexion à mongodb');
});

// En cas de deconnexion a la bdd
mongoose.connection.on('disconnected', function () {
  console.log('Deconnexion de mongodb');
});

// Fermeture de la base de données lors de la fermeture du server
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Déconnexion à bdd');
    process.exit(0);
  });
});
