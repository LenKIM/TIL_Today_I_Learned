
이번 장에서는 XMLHttpRequest통신과 웹 소켓 통신을 함께 사용하는 방법.

XMLHttpRequest란?
HTTP통신을 기반으로하는 웹 브라우저에서 쉽게 데이터를 받을 수 있게 해줍니다.

일단 구성은 public  app.js HTMLPage로 이루어져 있다.

```javascript

//모듈을 추출합니다
const fs = require('fs');
const ejs = require('ejs');
const http = require('http');
const express = require('exress');

//생성자 함수를 선언합니다.
let counter = 0;

Product(name, image, price, count) => {
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

//변수를 선언합니다.
 let products = [
   new Product('Javascript','chrome.jpeg', 28000,30),
   new Product('jQuery','chrome.jpeg', 28000,30),
   new Product('Node.js','chrome.jpeg', 32000,30),
   new Product('Socket.io','chrome.jpeg', 17000,30),
   new Product('Connect','chrome.jpeg', 18000,30),
   new Product('EJS','chrome.jpeg', 12000,30)
 ]

 //웹서버를 생성합니다.
 const app = express();
 const server = http.createServer(app);

 //웹서버를 설정합니다.
 app.use(express.static(__dirname + '/public'));

 //라우터를 수행합니다.
 app.get('/', (request, response) => {

 });


//웹 서버를 실행합니다.
server.listen(53147, () => {
  console.log('Server Running at http://127.0.0.1:53147');
});

//소켓 버서를 생성 및 실행
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {

})
```

일단 처음에 이렇게 설정하여 static으로 public폴더를 서버에 올리고 router 미들웨어를 사용해 사용자에게 적절한 페이지를 제공합니다.

처음 라우터는 이런식으로 설정합니다.
```javascript
//라우터를 수행합니다.
app.get('/', (request, response) => {
  //HTMLPage.html 파일을 읽습니다.
  const htmlPage = fs.readFileSync('HTMLPage.html', 'utf8');

  //응답합니다.
  response.send(ejs.render(htmlPage, {
    products: products
  }));
});
```

 이제 소켓 서버를 들여야 보자
 ```javascript
 //소켓 버서를 생성 및 실행
 const io = require('socket.io').listen(server);
 io.sockets.on('connection', (socket) => {
  //함수를 선언합니다.
  onReturn(index) => {

  };

  //변수를 선언합니다
  var cart = { };

 //cart 이벤트
  socket.on('cart', (index) => {

   };

  //buy 이벤트
  socket.on('buy', (index) => {

  });

  //return 이벤트
  socket.on('return', (index) => {

  });
 })
 ```

여기서 cart를 배열이 아닌 객체로 선언한 이유는 delete키워드로 요소를 쉽게 제거하기 위해서입니다. 이어서 return이벤트부터 작성합니다. return이벤트가 발생하면 onReturn()함수가 실행합니다.

```javascript
//소켓 버서를 생성 및 실행
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
 //함수를 선언합니다.
 onReturn(index) => {
   //물건 개수를 증가시킵니다.
   products[index].count++;

   //타이머를 제거
   clearTimeout(cart[index].timerID);

   //카트에서 물건을 제거
   delete cart[index];

   //count 이벤트를 발생시킵니다.
   io.sockets.emit('count', {
     index: index,
     count: products[index].count
   });
 };

 //변수를 선언합니다
 var cart = { };

//cart 이벤트
 socket.on('cart', (index) => {

  };

 //buy 이벤트
 socket.on('buy', (index) => {

 });

 //return 이벤트
 socket.on('return', (index) => {
    onReturn(index);
 });
})

```

cart의 이벤트 작성하기.
```javascript
//cart 이벤트
 socket.on('cart', (index) => {
   //물건 개수를 감소시킵니다.
   products[index].count--;

   //카트에 물건을 넣고 타이머를 시작합니다.
   cart[index] = {};
   cart[index].index = index;
   cart[index].timerID = setTimeout( () => {
     onReturn(index);
   }, 10 * 60 * 1000);

   // count 이벤트를 발생시킵니다.
   io.sockets.emit('count', {
     index: index,
     count: products[index].count
   });
  };
```
buy의 이벤트
```javascript
//buy 이벤트
socket.on('buy', (index) => {
  //타이머를 제거합니다.
  clearTimeout(cart[index].timerID);

  //카트에서 물건을 제거합니다.
  delete cart[index];

  //count event emit!
  io.sockets.emit('count' {
    index: index,
    count: products[index].count
  });
});
```


JqueryMobile을 사용하였으며, 지극히 예제이므로 맛보기로 작성하였습니다.  
이와 관련 코드는 HTMlpage.html을 참조해 주시기 바랍니다.
