
//모듈을 추출합니다
const fs = require('fs');
const ejs = require('ejs');
const http = require('http');
const express = require('express');

//생성자 함수를 선언합니다.
let counter = 0;

function Product(name, image, price, count) {
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
   //HTMLPage.html 파일을 읽습니다.
   var htmlPage = fs.readFileSync('HTMLPage.html', 'utf8');

   //응답합니다.
   response.send(ejs.render(htmlPage, {
     products: products
   }));
 });


//웹 서버를 실행합니다.
server.listen(53147, () => {
  console.log('Server Running at http://127.0.0.1:53147');
});

//소켓 버서를 생성 및 실행
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
 //함수를 선언합니다.
function onReturn(index) {
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
 let cart = { };

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
 });

 //buy 이벤트
 socket.on('buy', (index) => {
   //타이머를 제거합니다.
   clearTimeout(cart[index].timerID);

   //카트에서 물건을 제거합니다.
   delete cart[index];

   //count event emit!
   io.sockets.emit('count', {
     index: index,
     count: products[index].count
   });
 });

 //return 이벤트
 socket.on('return', (index) => {
    onReturn(index);
 });
})
