## socketIo의 Room

목표 : socketio의 방 개념 이해하기.

```javascript
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
```
일단 io.sockets.on('connection')을 통해서 연결을 시도하면서,
매개변수로 socket을 매개변수로 시작하는데, 이때,
socket의 이벤트중에 join을 활용하여, 방을 만들어 들어갑니다.

그리고 message라는 이벤트를 정의하여 message이벤트를 emit시킵니다. 내용은 text

자, 그럼 HTML을 볼 시간입니다.
```
window.onload = () => {
  //변수를 선언합니다.
  let room = prompt('방 이름을 입력하세요.','');
  //소켓을 연결합니다.
  var socket = io.connect();

  socket.emit('join', room);
  socket.on('message', function (data) {
    $('<p>' + data + '</p>').appendTo('body');
  });

  //문서 객체 이벤트를 연결
  document.getElementById('button').onclick = function () {
        //데이터 전송
        socket.emit('message', 'socket.io room message');
  };
};
```

 전체 코드는 아래에 첨부 하겠습니다.
 여튼, io.connect();를 통해 socket을 가져오고...
 emit()메서드를 통해서 이벤트를 발생시킵니다. 이때 room은 위에서 prompt로 받아온 변수입니다.
 다음에 message라는 이벤트를 정의합니다.
 그리고 그 이벤트 정의 안에서 message라는 이벤트 물론, 이 이벤트는 js에서 정의한 이벤트입니다.
 그 뒤에 socket.io room message라는 매개변수는 무시됩니다.
 왜냐하면 정의한 매개변수보다 더 많이 또는 적게하면 무시되기 때문입니다.

전체 코드.
```javascript
const fs = require('fs');

//서버를 생성
const server = require('http').createServer();
const io = require('socket.io').listen(server);

//서버 실행
server.listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
});

//웹 서버 이벤트 연결
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

```

HTML
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src ="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src ="/socket.io/socket.io.js"></script>
    <script>
    window.onload = () => {
      //변수를 선언합니다.
      let room = prompt('방 이름을 입력하세요.','');
      //소켓을 연결합니다.
      var socket = io.connect();

      socket.emit('join', room);
      socket.on('message', function (data) {
        $('<p>' + data + '</p>').appendTo('body');
      });

      //문서 객체 이벤트를 연결
      document.getElementById('button').onclick = function () {
            //데이터 전송
            socket.emit('message', 'socket.io room message');
      };
    };
    </script>
    <title></title>
  </head>
  <body>
    <button id = "button">EMIT</button>
  </body>
</html>
```
