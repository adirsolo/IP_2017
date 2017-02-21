var express = require('express');
var mysql = require('mysql');
var DButils = require('./DButils');
var app = express();
var iso8601 = require('iso8601');

var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
 var cors = require('cors');
 app.use(cors());



  var Connection2 = require('tedious').Connection;  
    var config = {  
        userName: 'testServer',  
        password: '1qazxsW2',  
        server: 'ise2017.database.windows.net',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: true, database: 'bbbb'}  
    };  
    var connection2 = new Connection2(config);  
    connection2.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected Azure");  
         
    });  



var connection = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '1234',
  database: 'sakila'
});
connection.getConnection(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('\nconnected to sakila Database');
});




app.get('/insertActorGet', function (req, res) {
  
console.log(req.query.id); 
	var DBInsertion = {actor_id: req.query.id, first_name: "erez", last_name: "shalom", last_update: iso8601.toDate(new Date().toISOString())};

	var data = {actor_id: DBInsertion.actor_id, first_name: DBInsertion.first_name, last_name: DBInsertion.last_name, last_update: DBInsertion.last_update};
    DButils.insert(connection, "actor", data, function(insertStatus){
 			if(insertStatus){
                 res.send('success to insert new token thing')
                console.log("success to insert new token thing");   
            } else {
                console.log("Failed to insert new token thing");
            }


    });

  console.log("Hello World!");
})



app.post('/insertActorPost', function (req, res) {
  
console.log(req.query.id); 
  var DBInsertion = {actor_id: req.body.id, first_name: "erez", last_name: "shalom", last_update: iso8601.toDate(new Date().toISOString())};

  var data = {actor_id: DBInsertion.actor_id, first_name: DBInsertion.first_name, last_name: DBInsertion.last_name, last_update: DBInsertion.last_update};
    DButils.insert(connection, "actor", data, function(insertStatus){
      if(insertStatus){
                 res.send('success to insert new token thing')
                console.log("success to insert new token thing");   
            } else {
                console.log("Failed to insert new token thing");
            }


    });

  console.log("Hello World!");
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




