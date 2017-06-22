
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

//웹서버 생성

 const server = http.createServer( (req, res) => {
  //  HTML페이지 읽기
  fs.readFile('SocketIoHTML', (error, data) => {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(data);
  });
}).listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket) => {

});
