  var express = require('express');
  var mysql = require('mysql');
  var DButils = require('./DButils');
  var app = express();
  var iso8601 = require('iso8601');

  var bodyParser = require('body-parser');

  app.use(bodyParser.json());       // to support JSON-encoded bodies
  var cors = require('cors');
  app.use(cors());


  /*
    var Connection2 = require('tedious').Connection;  
      var config = {  
          userName: 'testServer',  
          password: '1qazxsW2',  
          server: 'ise2017.database.windows.net',  
          // When you connect to Azure SQL Database, you need these next options.  
          options: {encrypt: true, database: 'demoServer'}  
      };  
      var connection2 = new Connection2(config);  
      connection2.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Connected Azure");  
          
           
      });  
      */


      var connection = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        port: '3306',
        password: 'adir1a2s',
        database: 'shop'
      });


      connection.getConnection(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }

        console.log('\nconnected to shop Database');
      });

      //GET:
      app.get('/getCategories', function (req, res) {
        DButils.select(connection, "categories", "*", function(result){
            res.send(result);
           console.log("success to insert new token thing");   
      });
        //console.log('JSON-result:', json);
    });


      //POST:
      app.post('/register', function (req, res) {
        console.log(req.query.id); 
        var DBInsertion = {
          clientID: req.body.clientID, 
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          phone: req.body.phone,
          cellular: req.body.cellular,
          mail: req.body.mail,
          creditCardNumber: req.body.creditCardNumber,
          isAdmin: req.body.isAdmin
        };

        var data = {
          ClientID: DBInsertion.clientID, 
          FirstName: DBInsertion.firstName,
          LastName: DBInsertion.lastName,
          Address: DBInsertion.address,
          City: DBInsertion.city,
          Country: DBInsertion.country,
          Phone: DBInsertion.phone,
          Cellular: DBInsertion.cellular,
          Mail: DBInsertion.mail,
          CreditCardNumber: DBInsertion.creditCardNumber,
          isAdmin: DBInsertion.isAdmin
        };
        DButils.insert(connection, "clients", data, function(insertStatus){
          if(insertStatus){
           res.send('success to insert new token thing')
           console.log("success to insert new token thing");   
         } else {
          console.log("Failed to insert new token thing");
        }
      });
      })


      app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
      })

/*
      var Request = require('tedious').Request;  
      var TYPES = require('tedious').TYPES;  


      function executeStatement() {  
        request = new Request("INSERT authors (firstName, lastName) VALUES ('erez', 'shalom');", function(err) {  
         if (err) {  
          console.log(err);}  
        });  
        request.addParameter('authorID',TYPES.Int );  
        request.addParameter('firstName', TYPES.NVarChar);  
        request.addParameter('lastName', TYPES.NVarChar);  
        console.log("Product id of inserted to azure!");       
        connection2.execSql(request);  
      }
      */
