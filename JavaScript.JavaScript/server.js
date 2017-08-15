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
//
// var http = require('http');
// var express = require('express');
//
// //변수 선언
// var items = [{
//   name: '우유',
//   price: '20000'
// },{
//   name: '홍차',
//   price: '5000'
// },{
//   name: '커피',
//   price: '4000'
// } ];
//
// var app = express();
//
// app.use(express.static('public'));
// app.use(app.router);

//GET POST PUT DELETE요청 방식은 나중에 알아보고

// 라우트합니다.
//
// app.all('/parameter', function(request, response) {
//   var name = request.param('name');
//   var region = request.param('region');
//
// //응답
// response.send('<h1>' + name + ':' + region + '</h1>');
// });
//
// app.all('/parameter2/:id', function(request, response) {
//   var id = request.param('id');
// //:id 주의!
// response.send('<h1>' + id + '</h1>');
// });
// <-------------Ajax 로 다루는 get, put, delete, post------> 부분을 한곳.
//
// var http = require('http');
// var express = require('express');
//
// //변수 선언
// var items = [{
//   name: '우유',
//   price: '20000'
// },{
//   name: '홍차',
//   price: '5000'
// },{
//   name: '커피',
//   price: '4000'
// } ];
//
// var app = express();
//
// app.use(express.static('public'));
// app.use(express.bodyParser());
// app.use(app.router);
//
// app.all('/data.html', function(request, response) {
//   var output = '';
//   output += '<!DOCTYPE html>';
//   output += '<HTML>';
//   output += '<head>';
//   output += '   <title>Date HTML</title>';
//   output += '</head>';
//   output += '<body>';
//
//   items.forEach(function (item) {
//     output += '<div>';
//     output += ' <h1>' + item.name + '<h1>';
//     output += ' <h2>' + item.price + '<h2>';
//     output += '</div>';
//   });
//
//   output += '</body>';
//   output += '</html>';
//   response.send(output);
//   //원래는 템플릿 엔진을 활용하는데, 조금 어려움
//
// });
// app.all('/data.json', function(request, response) {
//   response.send(items);
// });
//
// app.all('/data.xml', function(request, response) {
//
//   var output = '';
//   output += '<?xml version="1.0" encoding="UTF-8" ?>';
//   output += '<products>';
//   items.forEach(function (item) {
//     output += '<product>';
//     output += '<name>' + item.name + '</name>';
//     output += '<price>'+ item.price + '</price>';
//     output += '</product>';
//   });
//   output += '</products>';
//   response.type('text/xml');
//   response.send(output);
// });
//
// app.get('/products', function (request, response) {
//
//   response.send(items);
//   });
//
// app.get('/products/:id', function(request, response) {
//
//   var id = Number(request.param('id'));
//
//   if(isNaN(id)) {
//     //오류 잘못된 경우
//     response.send({
//       error : 'plz put the number'
//       });
//   } else if(items[id]) {
//     response.send(items[id]);
//   } else {
//     //No item
//     response.send({
//       error : '존재하지 않는 데이터입니다!'
//       });
//   }
// });
//
// app.post('/products', function (request, response) {
//   //데이터 추가 post
//   var name = request.param('name');
//   var price = request.param('price');
//
//   var item = {
//     name: name,
//     price: price
//   };
//
//   //데이터를 추가
//   items.push(item);
//
//   //응답
//   response.send({
//     message: '데이터를 추가했습니다.',
//     data:item
//   });
// });
//
// app.put('/products/:id', function (request, response) {
//
//   var id = Number(request.param('id'));
//   var name = request.param('name');
//   var price = request.param('price');
//
//   if (items[id]) {
//     //데이터를 수정
//     if (name) {
//       items[id].name = name;
//     }
//     if (price) {
//       items[id].price = price;
//     }
//
//     response.send({
//       message: '데이터를 수정했습니다.',
//       data: items[id]
//     });
//   } else {
//     //오류: 요소가 없는 경우
//     response.send({
//       error: '존재하지 않는 데이터입니다!'
//     });
//   }
// });
//
// app.del('/products/:id', function (request, response) {
//   //변수 선언
//   var id = Number(request.param('id'));
//
//   if (isNaN(id)) {
//     //오류 잘못된 경로
//     response.send({
//       error : 'put the numbers'
//     });
//   }else if (items[id]) {
//     //정상: 데이터 삭제
//     items.splice(id, 1);
//     response.send({
//       message : '데이터를 삭제함 '
//     });
//   } else {
//     //요소가 없을경우
//     response.send({
//       error: '존재하지 않는 데이터'
//     })
//   }
// });
//
// http.createServer(app).listen(52273, function(){
//  console.log('Server Running at http://127.0.0.1:52273');
// });

// ----------여기는 데이터베이스 웹 서비스에 관한내용 22.4 ------

var http = require('http');
var express = require('express');
var mysql = require('mysql');

//데이터베이스와 연결
var client = mysql.createConnection({
  user: 'root',
  password: 'root',
  database: 'company'
});

 //데이터베이스 퀴리 사용
 // client.query('USE Company')
// client.query('SELECT * FROM products', function(error, result, fields) {
//     if (error) {
//       console.log('쿼리문장에 오류가 있습니다.');
//     } else {
//       console.log(result);
//     }
// });

//웹 서버를 생성
var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(app.router);
// 전체 데이터 조회
app.get('/products', function(request, response) {
  //데이터베이스 요청을 수행
  client.query('SELECT * FROM products', function(error, data) {
    response.send(data);
  });
});

//개별 데이터 조회
app.get('/products/:id', function(request, response) {
  //변수를 선언
  var id = Number(request.param('id'));

  //데이터베이스 요청을 수행
  client.query('SELECT * FROM products WHERE id=?', [ id
  ], function(error, data) {
    if (error) {
      console.log('쿼리문장에 오류');
    }
    response.send(data);
  })
 });
app.post('/products', function(request, response) {
    //변수를 선언
    var name = request.param('name');
    var modelnumber = request.param('modelnumber');
    var series = request.param('series');

    //데이터베이스 요청을 수행
    client.query('INSERT INTO products (name, modelnumber, series) VALUES(?,?,?)', [
      name, modelnumber, series
    ], function (error, data) {
      response.send(data);
    });
  });
app.put('/products/:id', function(request, response) {
    //변수를 선언합니다.
    var id = Number(request.param('id'));
    var name = request.param('name');
    var modelnumber = request.param('modelnumber');
    var series = request.param('series');
    var query = 'UPDATE products SET '

    //쿼리를 생성합니다.
    if(name) query += 'name="' + name + '" ';
    if(modelnumber) query += 'modelnumber="' + modelnumber + '" ';
    if(series) query += 'series="' + series + '" ';
    query = 'WHERE id=' + id;

    //데이터베이스 요청을 수행
    client.query(query, function(error, data) {
      response.send(data);
    });
});
app.del('/products/:id', function(request, response) {
  // 변수를 선언합니다.
  var id = Number(request.param('id'));

  //데이터베이스 요청을 수행
  client.query('DELECT FROM products WHERE id=?', [
    id
  ], function (error, data) {
    response.send(data);
  });
});

http.createServer(app).listen(52237, function () {
  console.log('Server Running at http://127.0.0.1:52273');
});
