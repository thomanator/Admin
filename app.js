var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/kbase';

app.set('views',__dirname);
app.set('view engine','jade');



app.get('/',function(req,res) {
	res.render('home');
})

app.get('/sample',function(req,res){
	res.render('sample');  
});

app.get('/login',function(req,res){
	res.render('sample2');
});

app.get('/register',function(req,res){
	res.render('sample3')
    console.log('connected');
})

io.on('connection',function(socket) {
  console.log('connected');
  socket.on('blah',function(msg) {
	 console.log('entered socket')
    MongoClient.connect(url, function (err, db) {
	  
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      }
      else {
		console.log('inserting');
        var users = db.collection('users');
        users.insert({firstname:msg.a,lastname:msg.b,username:msg.c,password:msg.d});      
      }
	});
  });
});
http.listen(3000);
