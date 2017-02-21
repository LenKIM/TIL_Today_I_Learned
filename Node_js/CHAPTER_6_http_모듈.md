## CHAPTER 6 http 모듈

### __6.1 요청과 응답

 어떤 개념인지 확실하게 할 필요가 있다.
 개념 이해를 첫번째로 한다!

개념| 설명
---|---
요청 | 웹 페이지에 접속하려고 하는 어떤 요청을 말합니다.
응답 | 요청을 받아 이를 처리하는 작업을 말합니다.
Http모듈 | HTTP 웹 서버와 관련된 모든 기능을 담은 모듈입니다.
server 객체 | 웹 서버를 생성하는 데 꼭 필요한 객체입니다.
response 객체 | 응답 메시지를 작성할 때 request 이벤트 리스너의 두 번째 매개변수로 전달되는 객체입니다.
request 객체 | 응답 메시지를 작성할 때 request 이벤트 리스너의 첫번째 매개변수로 전될되는 객체입니다.

https://nodejs.org/api/http.html

 클라이언트와 서버는 편지를 주고받은 것처럼 요청과 응답을 처리합니다. 클라이언트가 서버로 보내는 편지를 요청메시지라고 부르며 서버가 클라이언트로 보내는 편지를 응답 메시지라고 합니다. 이 편지를 쓰는 방식에 따라 HTTP웹 서버, HTTPS 웹 서버 등으록 분합니다.

  편지는 '스트림'을 타고~
  **여기서 스트림이란??**
*프로그램이 프로그램 외부와 통신할 때는 컴퓨터 속에 흐르는 물갈이 라고 비유할 수있는 스트림을 사용합니다. 예를 들어 키보드 입력이 프로그램 안으로 들어갈 떄는 표준 입력 스트림을 사용합니다. 마찬가지로 웹에서 데이터가 전송될 때도 스트림을 이요합니다*

네이버로 요청을 보내고 응답하는 부분을 보면...
![스크린샷 2017-02-21 오후 2.18.17](http://i.imgur.com/be7hTJg.png)

[요청 메시지]
![스크린샷 2017-02-21 오후 2.18.53](http://i.imgur.com/VKbSyeP.png)

[응답 메시지]
![스크린샷 2017-02-21 오후 2.18.22](http://i.imgur.com/TR1bcpj.png)

 [정리]
 - 요청 메시지를 사용해야 사용자에게 적절한 웹 페이지를 제공할 수 있습니다. 그리고 응답 메시지를 사용하면 쿠키를 저장하거나 추출할 수 있고 강제로 웹 페이지를 이동시킬 수도 있습니다. Node.js는 HTTP웹 서버와 관련된 모든 기능은 http모듈로 담았습니다.

### __6.2 server 객체

http모듈에서 가장 중요한건 바로  server 객체를 생성하는것,

```javascript
//모듈을 추출
const http = require('http');

//웹 서버를 생성
const server = http.createServer();

//웹 서버를 실행
server.listen(53147);
```
 2가지 메서드가 있음을 주의!
 listen(port[, callback]) -> 서버를 실행
 close([callback]) -> 서버를 종료

 이번에는 server객체의 이벤트를 연결하는 코드를 작성해보자.
각 이벤트의 종류들은 꼭 API를 참고하자.

```javascript
//모듈 추출
const http = require('http');

// server 객체를 생성
const server = http.createServer();

// server 객체에 이벤트를 연결
server.on('request', function(code) {
  console.log('Request On');
  });

// server 객체에 이벤트를 연결
server.on('connection', function(code) {
  console.log('connection On');
  });

// server 객체에 이벤트를 연결
server.on('close', function(code) {
  console.log('Close On');
  });

//listen()메서드를 실행
server.listen(53147);
```

### __6.3 response 객체
 response객체의 메서드는 딱 2가지 밖에 없다!
 메서드이름 | 설명
 ---|---
 writeHead(statusCode[, statusMessage][,headers]) |응답 헤더를 작성
 end([data][, encoding][,callback]) |응답 본문를 작성

 > 그럼 간단한 응답메시지를 작성해보자.

 ```javascript
 //웹 서버를 생성하고 실행
 require('http').createServer(function (request, response) {
   //응답합니다.
   response.writeHead(200, { 'Content-type' : 'text/html'});
   response.end('<h1>Hello Web Server with Node.js </h1>');
   }).listen(53147, function(){
     console.log('Server Running at http://127.0.0.1:53147');
     });
 ```
 응답코드는
 https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

 **참조하자.**

 6.3.1 File System 모듈을 사용한 HTML 페이지 제공
 6.3.2 이미지와 음악 파일 제공
 6.3.3 쿠키 생성
 6.3.4 페이지 강제 이동

위는 생략

### __6.4 request 객체
 server객체의 request이벤트가 발생할 때 이벤트 리스너의 첫번째 매개변수에는 request객체가 들어갑니다.

 >request의 객체의 속성

 속성이름|설명
 ---|---
 method| 클라이언트의 요청 방식
 url|클라이언트가 요청한 URL을 나타냅니다.
 headers| 요청메세지 헤더를 나타냅니다.
 trailers | 요청 메시지 트레일러를 나타냅니다.
 httpVersion | HTTP프로토콜 버전을 나타냅니다.

  위의 속성을 사용하면 사용자가 요청한 페이지를 적절하게 제공하는 것은 물론 요청 방식에 따라 페이지를 구분할 수 있습니다.

**6.4.1 url 속성을 사용한 페이지 구분**

 예시로 내가 2개의 HTML파일 Index.html / OtherPage.html 을 만들었다고 가정하자!

 ```javascript
 //모듈을 추출
 const http = require('http');
 const fs = require('fs');
 const url = require('url');

 //서버를 생성 및 실행합니다.
 http.createServer((request, response) => {
   //url 속성을 사용한 페이지 구분!!
   const pathName = url.parse(request.url).pathname;

   //페이지를 구분 여기서부터가 중요함!!!!!!!!!!!!!!!!
   if(pathname == '/'){
     //Index 파일 읽음
     fs.readFile('Index.html', function(error, data){
       //응답합니다.
       response.writeHead(200, { 'Content-type' : 'text/html'});
       response.end(data);
       });
   } else if (pathname == '/OtherPage') {
      fs.readFile('OtherPage.html', (error, data) => {
        //응답
        response.writeHead(200, {'Content-type' : 'text/html'});
        response.end(data);
        });
   }
   }).listen(53147, () => {
     console.log('Server Running at http://127.0.0.1:53147');
     });
```

  **6.4.2 method 속성을 사용한 페이지 구분**

  ```javascript
  //모듈을 추출
  const http = require('http');

  //서버를 생성 및 실행합니다.
  http.createServer((request, response) => {
  if(request.method == 'GET') {
    console.log('GET 요청입니다.');
  } else if (request.method == 'POST') {
    console.log('POST 요청');
  }
    }).listen(53147, () => {
      console.log('Server Running at http://127.0.0.1:53147');
      });
 ```

  아쉽게도 웹브라우저에 URL을 입력하는 것만으로는 POST 요청을 수행할 수 없습니다.
  **6.4.3 GET 요청 매개변수 추출**

 request객체의 method속성을 사용해 GET요청과 POST요청을 구분하는 방법을 배웠음, 그렇다면 어떻게 처리해야 될까??

  ```javascript
  const http = require('http');
  const url = require('url');

  //모듈을 사용
  http.createServer(function (request, response) {
    //요청 매새변수를 추출
    let query = url.parse(request.url, true).query;;

    //GET 요청 매개변수 출력
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.end('<h1>' + JSON.stringify(query) + '</h1>');
    }).listen(53147, () => {
      console.log('Server Running at http://127.0.0.1:53147');
      });
```

  여기서 JSON.stringify는 요청하는 매개변수를 JSON형식으로 출력시켜주는 함수입니다.

  **6.4.4 POST 요청 매개변수 추출**
   POST방식은 GET방식과 달리 데이터를 더 많이 담을 수 있고 보안 측면에서도 좋습니다. GET방식은 요청하면서 매개변수 형식을로 노출되어 데이터를 전달하지만 POST 방식은 요청한 후 데이터를 별도로 전달하기 때문입니다.

   >POST 요청 데이터 추출

   ```javascript

   //모듈 추출
   var http = require('http');

   //모듈 사용
   http.createServer( (request, response) => {
     request.on('data',function(data) {
       console.log('POST Data:' ,data);
       })
     }).listen(53147);

 ```

**6.4.5 쿠키 추출**

 처음에 처음 접속하면 undefined으로 뜨고나서 두 번쨰 이후 접속하면 나타난다.
 이유는 개발자가 그렇게 만들어서........

   ```javascript
   //모듈 추출
   var http = require('http');

   //모듈 사용
   http.createServer( (request, response) => {

     //GET COOKIE
     const cookie = request.headers.cookie;

     //SET cookie
     response.writeHead(200, {
       'Content-Type':'text/html',
       'Set-Cookie':['name = Rinsdjlg', 'region = Seoul']
       });

       //응답합니다.
       response.end('<h1>' + JSON.stringify(cookie) + '</h1>');
     }).listen(53147, () => {
       console.log('Server Running at http://127.0.0.1:53147');
       });

 ```
------

```javascript
//모듈 추출
var http = require('http');

//모듈 사용
http.createServer( (request, response) => {

//쿠키가 있는지 확인
if(request.headers.cookie) {
  //쿠키를 추출하고 분해
  const cookie = request.headers.cookie.split(';').map((element) => {
    let element = element.split('=');
    return {
      key: element[0],
      value: element[1]
    };
  });

  //응답합니다.
  response.end('<h1>' + JSON.stringify(cookie) + '</h1>');

  } else {
    //쿠키를 생성
    response.writeHead(200, {
      'Content-Type':'text/html',
      'Set-Cookie':['name = Rinsdjlg', 'region = Seoul']
      });

      //응답합니다.
      response.end('<h1>쿠키를 생성했습니다.</h1>');
  }
}).listen(53147, () => {
  console.log('Server Running at http://127.0.0.1:53147');
  });

```
