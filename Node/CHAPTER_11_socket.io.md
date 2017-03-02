
웹 소켓 = 실시간 양방향 통신을 위한 스펙
public = 자신을 포함한 모든 클라이언트에 데이터를 전달합니다.
broadcast = 자신을 제외한 모든 클라이언트에 데이터를 전달합니다.
private = 특정 클라이언트에 데이터를 전달합니다.


## CHAPTER 11 socket.io 모듈

### __11.1 socket.io 모듈 기본

socket.io
하하... 점검중이다...

예제 만들어서 실행해보기.

Lenui-MacBook-Pro:Node len$ export DEBUG=socket.io*
Lenui-MacBook-Pro:Node len$ node socket.io.server

디버그 모드 실행

socket.io:server initializing namespace / +0ms
socket.io:server creating engine.io instance with opts {"path":"/socket.io"} +2ms
socket.io:server attaching client serving req handler +4ms
Server running at http://127.0.0.1:53147

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

});
```
이렇게 하고 접속을 하면,

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
  이런식의 로그가 찍힙니다아!

  11.1.3 웹 소켓 이벤트는?
  이제 서버와 클라이언트 사이에 데이터를 교환해보면, socket.io모듈은 서버와 클라리언트사이에 데이터를 교환할 떄 이벤트를 사용합니다.
  socket객체의 이벤트는 기본적으로 connection / disconnect 가 존재하며,
  socket객체의 메서드는 on() / emit()이 존재하며, emit()은 소켓 이벤트를 발생한다는 말이다>
### __11.2 소켓 통신 종류

 1. public 통신
 public통신은 구현이 간단함
 io.sockets 객체의 emit()메서드를 사용하면 됨.
 아래와 가은 코드로 io.sockets객체의 emit()메서드를 사용해 smart이벤트를 발생시킵 이렇게하면 **현재 접속한 모든 사용자에게 메시지를 보낼 수 있다.**

 ```javascript
 //소켓 서버를 생성 및 실행
 const io = socketio.listen(server);
 io.sockets.on('connection', (socket) => {
   //rint이벤트
   socket.io('rint', (data) => {
     //public 통신
     io.sockets.emit('smart', data);
     });
 });
 ```

  2. broadcast 통신
  broadcast통신을 할 때는 socket객체의 broadcast 속성을 사용합니다. 코드 11-12처럼 broadcast객체의 emit()메서드를 사용하면 **자신을 제외한 모든 사용자에게 이벤트를 전달 할 수 있습니다.**
  ```javascript
  //소켓 서버를 생성 및 실행합니다.
  const io = socketio.listen(server);
  io.sockets.on('connection', (socket) => {
    //rint 이벤트
    socket.on('rint', (data) => {
      //중요!!! broadcast통신
      socket.broadcast.emit('smart',data);

      });
    });
  ```

  3. private 통신
  방을 만들어 통신하는 방법은 다음 절에서 설펴보고 지금은 간단하게 가장 최근 접속한 클라이언트 한 명에게 데이터를 전달하는 예제를 만들어보자.
  우선 변수 id를 선언하고 connection이벤트가 발생할 때 socket객체의 id속성을 저장합니다.

  ```javascript
  //소켓 서버를 생성 및 실행
  let id = 0;
  const io = socketio.listen(server);
  io.sockets.on('connection', (socket) => {
    //id를 설정
    id = socket.id;
    })
  ```

  이어서 io.sockets객체의 sockets속성에서 to()메서드로 특정 id를 선택하여 emit()메서드를 호출합니다. 이렇게 하면 가장 최근에 접속한 클라이언트에 데이터가 전달됩니다.

  ```javascript
  //소켓 서버를 생성 및 실행
  let id = 0;
  const io = socketio.listen(server);
  io.sockets.on('connection', (socket) => {
    //id를 설정
    id = socket.id;

    //rint 이벤트
    socket.on('rint', (data) => {
      //private 통신
      io.sockets.to(id).emit('smart', data);
      });
    });
  ```

  이 private 통신 방법을 사용하면 클라이언트를 랜덤으로 선택해 랜덤 채팅을 구현할 수 있습니다.

### __11.3 방 생성

 socket.io모듈은 방을 생성하는기능을 포함하고 있습니다.
 아래와 같은 메서드 사용함
 socket.join() -> 클라이언트를 방에 집어 넣습니다.
 io.sockets.in() / io.socekts.to() 특정 방에 있는 클라이언트를 추출합니다.

 여기서 in(), to()는 완전하게 같은 메서드임을 인지하자.

 

### __11.4 웹 채팅 프로그램
