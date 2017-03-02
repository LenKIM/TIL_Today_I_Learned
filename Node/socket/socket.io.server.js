
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

//웹서버 생성

 const server = http.createServer( (req, res) => {
  //  HTML페이지 읽기
  fs.readFile('SocketIoHTMLpage.html', (error, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {

  //rint 이벤트
  socket.on('rint', (data) => {
    //클라이언트가 전송한 데이터를 출력합니다.
    console.log('Client Send data: ', data);

    //클라이언트에 smart 이벤트를 발생시킵니다.
    socket.emit('smart', data);
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
