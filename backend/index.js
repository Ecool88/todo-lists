const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const passport = require("passport");
const passportJWT = require("passport-jwt");
const cors = require('cors');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



var users = [
  {
    id: 1,
    name: 'test',
    password: 'test',
    token: null,
    todos: [{
      id: '1',
      title: 'some task',
      completed: false,
    }]
  },
  {
    id: 2,
    name: 'test1',
    password: 'test1',
    token: null,
  },
  {
    id: 3,
    name: 'test2',
    password: 'test2',
    token: null,
    todos: [{
      id: '1',
      title: 'some task for user 3',
      completed: true,
    }]
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

const app = express();

app.use(passport.initialize());
app.use(cors());


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});

// проверка пользователя и выдача ему токена
app.post("/api/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  var user = users[_.findIndex(users, {name: name})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === password) {
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    user.token = token
    var id = user.id
    res.json({message: "ok", token, id});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

// удаление токена пользвоателя когда он разлогиневается
app.get('/api/logout/user/:id', function(req, res) {
  if(req.params.id){
    var id = req.params.id;
  }
  var user = users[_.findIndex(users, user => user.id == id)];
  if( !user ){
    res.status(401).json({message:"no such user found"});
  } else {
    user.token = null
    res.json({message:"you successfully logged out"});
  }
});


// получения списка его заданий
app.get('/api/user/:id', function(req, res) {
  if(req.params.id){
    var id = req.params.id;
  }
  var user = users[_.findIndex(users, user => user.id == id)];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  } else {
    if (req.query.token !== user.token) {
      res.status(403).json({message:"You do not have access to this page"});
    } else {
      res.json({todos: user.todos || []});
    }
  }
});


// добавление задания в список Todd
app.post('/api/user/:id', function(req, res) {
  if(req.params.id){
    var id = req.params.id;
  }
  var user = users[_.findIndex(users, user => user.id == id)];
  if( !user ){
    res.status(401).json({message:"no such user found"});
  } else {
    if (req.body.token !== user.token) {
      res.status(403).json({message:"You do not have access to this page"});
    } else {
      todo = req.body.todo
      user.todos ? user.todos.push(todo) : user.todos = [todo]
      res.json({ todos: user.todos });
    }
  }
});

// Изменение задания в списке Todd
app.put('/api/user/:id', function(req, res) {
  if(req.params.id){
    var id = req.params.id;
  }
  var user = users[_.findIndex(users, user => user.id == id)];
  if( !user ){
    res.status(401).json({message:"no such user found"});
  } else {
    if (req.body.token !== user.token) {
      res.status(403).json({message:"You do not have access to this page"});
    } else {
      let idTodo = req.body.todo.id
      let todoIndex = _.findIndex(user.todos, todo => todo.id == idTodo)
      user.todos[todoIndex] = req.body.todo
      res.json({ todos: user.todos });
    }
  }
});


// todo подумать как убрарть GET параметры в урле и передать в параметрах delete
// удаление задания в списке Todd
app.delete('/api/user/:id/task/:idtodo/:token', function(req, res) {
  if(req.params.id){
    var id = req.params.id;
  }
  var user = users[_.findIndex(users, user => user.id == id)];
  if( !user ){
    res.status(401).json({message:"no such user found"});
  } else {
    if (req.params.token !== user.token) {
      res.status(403).json({message:"You do not have access to this page"});
    } else {
      let idTodo = req.params.idtodo
      let todoIndex = _.findIndex(user.todos, todo => todo.id == idTodo)
      user.todos.splice(todoIndex, 1)
      res.json({ todos: user.todos });
    }
  }
});



app.listen(3000, function() {
  console.log("Express api running");
});
