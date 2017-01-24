// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// app.use(function (request, response) {
//   response.send('<h1>안녕하세요.</h1>');
// });
//
// http.createServer(app).listen(52273, function(){
//   console.log('Server Running at http://127.0.0.1:52273');
// });

// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// app.use(function (request, response, next) {
//   console.log('first');
//   next();
//   });
// app.use(function (request, response, next) {
//   console.log('second');
//   next();
//   });
// app.use(function (request, response, next) {
//   response.send('<h1>Hello Middleware.. !</h1>') });
//
// http.createServer(app).listen(52273, function(){
//  console.log('Server Running at http://127.0.0.1:52273');
// });

// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// app.use(function (request, response, next) {
//   request.test = 'request.test';
//   response.test = 'respose.test';
//   next();
//   });
//
// app.use(function (request, response, next) {
//   response.send('<h1>' + request.test + '::' + response.test + '</h1>');
// });
//
// http.createServer(app).listen(52273, function(){
//  console.log('Server Running at http://127.0.0.1:52273');
// });

// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// app.use(express.logger());
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.session());
// app.use(express.static('public'));
// app.use(app.router);
//
// http.createServer(app).listen(52273, function(){
//  console.log('Server Running at http://127.0.0.1:52273');
// });

// var http = require('http');
// var express = require('express');

// var app = express();

// app.use(express.logger());
// app.use(express.bodyParser());
// app.use(express.cookieParser());
// app.use(express.session());
// app.use(express.static('public'));
// app.use(function (request, response) {
  // response.send('<h1>Hello Middleware..!</h1>');
// });
// app.use(app.router);

// http.createServer(app).listen(52273, function(){
 // console.log('Server Running at http://127.0.0.1:52273');
// });
//
// var http = require('http');
// var express = require('express');
//
// var app = express();
//
// // app.use(express.logger());
// // app.use(express.bodyParser());
// // app.use(express.cookieParser());
// // app.use(express.session());
// app.use(express.static('public'));
// app.use(app.router);
//
// //GET POST PUT DELETE요청 방식은 나중에 알아보고
//
// //라우트합니다.
// app.all('/a', function(request, response) {
//   response.send('<h1>Page A</h1>')
//
// });
// app.all('/b', function(request, response) {
//   response.send('<h1>Page B</h1>')
// });
// app.all('/c', function(request, response) {
//   response.send('<h1>Page C</h1>')
// });
//
// http.createServer(app).listen(52273, function(){
//  console.log('Server Running at http://127.0.0.1:52273');
// });

var http = require('http');
var express = require('express');

//변수 선언
var items = [{
  name: '우유',
  price: '20000'
},{
  name: '홍차',
  price: '5000'
},{
  name: '커피',
  price: '4000'
} ];

var app = express();

app.use(express.static('public'));
app.use(app.router);

//GET POST PUT DELETE요청 방식은 나중에 알아보고

//라우트합니다.
app.all('/data.html', function(request, response) {
  var output = '';
  output += '<!DOCTYPE html>';
  output += '<HTML>';
  output += '<head>';
  output += '   <title>Date HTML</title>';
  output += '</head>';
  output += '<body>';

  items.forEach(function (item) {
    output += '<div>';
    output += ' <h1>' + item.name + '<h1>';
    output += ' <h2>' + item.price + '<h2>';
    output += '</div>';
  });

  output += '</body>';
  output += '</html>';
  response.send(output);
  //원래는 템플릿 엔진을 활용하는데, 조금 어려움

});
app.all('/data.json', function(request, response) {
  response.send(items);
});

app.all('/data.xml', function(request, response) {
  var output = '';
  output += '<?xml version="1.0" encoding="UTF-8" ?>';
  output += '<products>';
  items.forEach(function (item) {
    output += '<product>';
    output += '<name>' + item.name + '</name>';
    output += '<price>'+ item.price + '</price>';
    output += '</product>';
  });
  output += '</products>';
  response.type('text/xml');
  response.send(output);
});

app.all('/parameter', function(request, response) {
  var name = request.param('name');
  var region = request.param('region');

//응답
response.send('<h1>' + name + ':' + region + '</h1>');
});

app.all('/parameter2/:id', function(request, response) {
  var id = request.param('id');
//:id 주의!
response.send('<h1>' + id + '</h1>');
});

http.createServer(app).listen(52273, function(){
 console.log('Server Running at http://127.0.0.1:52273');
});
