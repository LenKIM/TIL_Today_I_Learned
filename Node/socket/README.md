
 ## Socket.io 기초.

 일단 어쩌면 내가 노드를 공부하기위한 목적은 이놈 때문에 먼 산을 돌아돌아 온거 일 수도 있다.

 최대한 자세히 적어보도록 노력하겠습니다.


처음 필요한 모듈을 추출해 오자.
```javascript
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
```

 그리고 웹 서버를 생성하고,
```javascript
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
```

```javascript
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
```

여기서 socketio 서버를 생성하고 이벤트를 생성하여 정의하는 부분이다.
rint라는 이벤트를 정의했다. 그리고 emit()를 통해 'smart'라는 이벤트를 발생 시켰다.

여기서 HTML페이지를 볼 필요가 있다.
여기에 smart의 이벤트가 정의되어 있다.

```
window.onload = () => {
  //소켓을 연결합니다.
  let socket = io.connect();

  //소켓 이벤트를 연결
  socket.on('smart', (data) => {
      alert(data);
  });

  //문서 객체 이벤트를 연결
  document.getElementById('button').onclick = () => {
        let text = document.getElementById('text').value;

        //데이터 전송
        socket.emit('rint', text);
  };
```

```javascript
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
```

전체 HTML 문서
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src ="/socket.io/socket.io.js"></script>
    <script>
    window.onload = () => {
      //소켓을 연결합니다.
      let socket = io.connect();

      //소켓 이벤트를 연결
      socket.on('smart', (data) => {
          alert(data);
      });

      //문서 객체 이벤트를 연결
      document.getElementById('button').onclick = () => {
            let text = document.getElementById('text').value;

            //데이터 전송
            socket.emit('rint', text);
      };
    };
    </script>
    <title></title>
  </head>
  <body>
    <input type="text" id="text" />
    <input type="button" id="button" value="echo" />
  </body>
</html>
```
