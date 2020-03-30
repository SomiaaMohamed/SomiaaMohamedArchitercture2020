const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB'),
      itemRoutes = require('./expressRoutes/itemRoutes');
      Users = require('./expressRoutes/userRoutes');
      Collections = require('./expressRoutes/collectionRoutes')
      Categories = require('./expressRoutes/categorieRoutes')
      Ouvrage = require('./expressRoutes/ouvrageRoutes')

      mongoose.Promise = global.Promise;
      mongoose.connect(config.DB).then(
          () => {console.log('Database is connected') },
          err => { console.log('Can not connect to the database'+ err)}
        );
      const app = express();
      app.set('view engine', 'ejs');
      app.use(express.static('public'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended : false}));
      app.use(cors());
      app.use("/items", itemRoutes);
      app.use("/users", Users);
      app.use("/collections",Collections);
      app.use('/uploads',express.static('uploads'));
      app.use("/categories", Categories);
      app.use("/ouvrages", Ouvrage);
    
    
      const port = process.env.PORT || 4000;

      const server = app.listen(port, function(){
        console.log('Listening on port ' + port);
      });
