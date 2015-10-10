var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  port = 8888;

  app.use(express.static(__dirname + '/public'));
  app.use(bodyParser.json());
  app.use(cors());

var mongoPort = process.env.MONGO_PORT || 27017;
var mongoURI  = 'mongodb://localhost:' + mongoPort + '/barebones';



var UserScheme = new mongoose.Schema({
  name: {type: String},
  // _id: {type: Number},
  messages: [{type : mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});


var MessageSchema = new mongoose.Schema({
  message: {type: String, required: true},
  _creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});



var User = mongoose.model('User', UserScheme);
var Message = mongoose.model('Message', MessageSchema);




var serverPort = process.env.EXPRESS_PORT || 8181;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
  console.log('mdb listening on:', mongoPort);
});

app.post('/api/Users', function(req, res){
console.log(req.body);
  new User(req.body).save(function(err, data) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(data);
    }
  })
  //
  // Message.create(req.body, function(err, result){
  //
  //   if(err){
  //     res.send(err);
  //   }
  //   else{
  //     res.send(result);
  //   }
  // })
})

app.post('/api/messages', function(req, res){
  new Message(req.body).save(function(err, data){
    if (err){
      res.status(500).send(err)
    } else {
      res.send(data);
    }
  })

});

app.get('/api/messages', function(req, res){
  Message.find({})
  .populate("_creator")

  //play here
  .exec(function (err, messages) {
    if (err) {
      return res.json(err);
    }else{
      console.log(messages);
      return res.json(messages)
  }
  })
});

app.listen(port, function(){
    console.log('listening on port ' + port);
  });
