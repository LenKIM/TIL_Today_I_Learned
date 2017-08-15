
const fs = require('fs');

//서버를 생성
const server = require('http').createServer();
const io = require('socket.io').listen(server);

//서버 실행
server.listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
});

//d웹 서버 이벤트 연결
server.on('request', (request, response) => {
  //HTMLPage.html파일 읽기
  fs.readFile('SocketIoHTMLpage.html', (error, data) => {
    response.writeHead(200, { 'Content-Type' : 'text/html'});
    response.end(data);
  });
});

io.sockets.on('connection', (socket) => {

//방 이름을 저장할 변수
let roomName = null;

//join 이벤트
socket.on('join', (data) => {
  roomName = data;
  socket.join(data);

});

//message이벤트
socket.on('message', (data) => {
  io.sockets.in(roomName).emit('message', 'test');

    });
  });

/*
Lenui-MacBook-Pro:socket len$ node socket.io.server
  socket.io:server initializing namespace / +0ms
  socket.io:server creating engine.io instance with opts {"path":"/socket.io"} +2ms
  socket.io:server attaching client serving req handler +4ms
Server running at http://127.0.0.1:53147
  socket.io:server serve client source +11s
  socket.io:server incoming connection with id hvdNJBO-4_7NvFGOAAAA +168ms
  socket.io:client connecting to namespace / +2ms
  socket.io:namespace adding socket to nsp / +1ms
  socket.io:socket socket connected - writing packet +2ms
  socket.io:socket joining room hvdNJBO-4_7NvFGOAAAA +1ms
  socket.io:client writing packet {"type":0,"nsp":"/"} +1ms
  socket.io-parser encoding packet {"type":0,"nsp":"/"} +0ms
  socket.io-parser encoded {"type":0,"nsp":"/"} as 0 +1ms
  socket.io:socket joined room hvdNJBO-4_7NvFGOAAAA +3ms

  이런식으로 나왔음.
*/
