//모듈 추출 부분
var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');

  //변수를 선언
//숫자 0은 빈 공간, 숫자 1은 예약 가능한 좌석, 숫자 2는 예약이 완료된 좌석으로 구분
var seats = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

 //웹 서버를 생성합니다
 var app = express();
 var server = http.createServer(app);

 //라우트를 수행합니다.
app.get('/', (request, response, next) => {
  fs.readFile('HTMLPage.html', (error, data) => {
    response.send(data.toString());
  });
});

app.get('/seats', (request, response, next) => {
  response.send(seats);
});

//웹 서버를 실행
server.listen(53147, () => {
  console.log('server Running at http://127.0.0.1:53147');
});

//소켓 서버를 생성 및 실행
var io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  socket.on('reserve', (data) => {
    seats[data.y][data.x] = 2;
    io.sockets.emit('reserve', data);
  });
});
