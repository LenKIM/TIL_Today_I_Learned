# PART 3 Ajax
## Chapter 19 node.js 기본
 여기에서는 가장 기본적인 방법만 다뤄보도록 하겠습니다.
### 19.1 Ajax 개요
Ajax란 무엇인가?
자바스크립트처럼 특정한 프로그래밍 언어를 지칭하는 것이 아닙니다. 또한 jQuery와 같은 특정한 프레임워크를 지칭하는 것도 아닙니다.

**Ajax는 구현하는 방식을 뜻하는 말**
 Ajax를 사용하면 페이지를 전환하지 않고 서버에서 데이터를 받아와 사용자에게 보여줄 수 있습니다. 페이스북에서 타임라인에 어떤 포스트를 업로드할떄, 사용자는 멈춤이 없이 계속 사용 가능함.
### 19.2 데이터 전송 형식

 3가지 방식 CSV, XML, JSON형식

 **19.2.1 CSV형식**
  comma Separated value는 각 항목을 쉼포로 구분해 데이터를 표현하는 방식.

  예를 들어
  김정규,나이,21살,대학생

  이런식인데, 이렇게 되면 뭐가 뭔지 알기 힘들다.

   **19.2.2 XML형식**
   CSV형식은 각각의 데이터가 무엇을 나타내는지 알기 힘들다.
   그래서 나타난 것이 XML 형식, 이는  HTML형식처럼 태그로 데이터를 표현합니다.

     <?xml version="1.0" encoding="utf-8"?>
     <people>
      <person>
        <name>김정규</name>
        <age>21</age>
      </person>
      <person>
        <name>김정규2</name>
        <age>22</age>
      </person>
      <person>
        <name>김정규3</name>
        <age>23</age>
      </person>
      </people>

일부분만 보아도 각각의 데이터가 어떠한 것을 의미하는지 알 수 있다.
그러나 열고닫고등의 쓸모없는 태그가 많다.
**19.2.3 JSON형식**
 CSV JSON의 모든 단점을 섭렵해 만들어진 방식.
 [{
   "name": "모던 웹 디자인을 위한 HTML + CSS3 입문",
   "publisher" : "한빛미디어",
   "author" : "윤인성",
   "price" : "30000원"
   }, {
   "name": "모던 웹 디자인을 위한 HTML + CSS3 입문",
   "publisher" : "한빛미디어",
   "author" : "윤인성",
   "price" : "30000원"
     }, {
   "name": "모던 웹 디자인을 위한 HTML + CSS3 입문",
   "publisher" : "한빛미디어",
   "author" : "윤인성",
   "price" : "30000원"
   }]


**거의 표준 그러나 제약이 몃가지 있는데, JSON에는 객체, 배열, 문자열, 숫자, 불 null만 들어갈수 있습니다. 또한 문자열은 무조건 큰 따움표를 사용해야합니다.**


### 19.3 node.js 개요와 설치
(생략)
### 19.4 기본 파일 실행
(생략)
### 19.5 내부 모듈
 os 모듈

hostname() 운영체제 호스트 이름
type() 이름의 타입
platform() 운영체제 플랫폼을 리턴
arch() 아키텍체를 리턴
release() 버전을 리턴
uptime() 실행한 시간을 리턴
loadavg() 로드 에베리지 정보를 다음 배열 리턴
totalmem() 시스템의 총 메모리를 리턴
freemem() 시스템의 사용가능한 메모리를 리턴
cpus() CPU의 정보를 다음 객체 리턴
getNetworkInterfaces() 네트워크 인터페이스의 정보를 담은 배열 리턴

내무 모듈의 대한 정보는
https://nodejs.org/dist/latest-v6.x/docs/api/

### 19.6 외부 모듈
 기본적으로 갖지 않고 개인 또는 단체가 만들어 배포하는 모듈을 외부모듈

https://www.npmjs.com/
> npm install 모듈명

예를 들어 request 모듈을 설치한다면
> npm install request

### 19.7 서버 생성 및 실행

    var http = require('http');
    var express = require('express');

    var app = express();

    app.use(function (request, response) {
     response.send('<h1>안녕하세요.</h1>');
    });

    http.createServer(app).listen(52273, function(){
     console.log('Server Running at http://127.0.0.1:52273');
    });

### 19.8 미들웨어
     app.use()메서드에 입력하는 콜백함수는 request이벤트 리스너입니다. 사용자가 서버에 접속하면 자동으로 실행됩니다. request 이벤트 리스터는 다음 형태입니다.

     app.use(function(request, response, next){

       });

  app.use()는 여러번 사용가능한데, 매개변수 next는 다음 콜백함수를 의합니다.


    var http = require('http');
    var express = require('express');

    var app = express();

    app.use(function (request, response, next) {
      console.log('first');
      next();
      });
    app.use(function (request, response, next) {
      console.log('second');
      next();
      });
    app.use(function (request, response, next) {
      response.send('<h1>Hello Middleware.. !</h1>') });

    http.createServer(app).listen(52273, function(){
     console.log('Server Running at http://127.0.0.1:52273');
    });

결과가 first second first second 이런식으로 발생되는데,
원인은, 이유는 **파비콘** 웹브라우저가 웹사이트의 파비콘을 얻고자 자동으로 요청하기 때문에 발생한 것입니다.
웹 브라우저 상단에 표시되는 아이콘을 의미합니다.

 이렇게 미들웨어를 사용하면 request객체와 response 객체에 기능을 추가할 수있다.

     var http = require('http');
     var express = require('express');

     var app = express();

     app.use(function (request, response, next) {
       request.test = 'request.test';
       response.test = 'respose.test';
       next();
       });

     app.use(function (request, response, next) {
       response.send('<h1>' + request.test + '::' + response.test + '</h1>');
     });

     http.createServer(app).listen(52273, function(){
      console.log('Server Running at http://127.0.0.1:52273');
     });

 그래서! 미들웨어를 어디서 써야하는거죠?
 ***미들웨어는 "과거의 나"또는 "다른 사람"이 미리 만들어둔 기능을 "현재 서버"에 적용할 때 사용하는 것.***

     var http = require('http');
     var express = require('express');

     var app = express();

     app.use(express.logger());
     app.use(express.bodyParser());
     app.use(express.cookieParser());
     app.use(express.session());
     app.use(express.static('public'));
     app.use(app.router);

     http.createServer(app).listen(52273, function(){
      console.log('Server Running at http://127.0.0.1:52273');
     });

### 19.9 정적 파일 제공
가장 먼저 알아볼 미들웨어는 static 미들웨어.
static 미들웨어는 정적 파일을 제공할 떄 사용하는 미들웨어.

정적 파일이란 뭐나면, **변화하지 않는 일반 파일을 의미합니다**
네이버를 새로고침할때, 계속해서 변경되는건 동적파일

반면 기본적인 스타일시트 파일과 자바스크립트 파일은 아무리 요청해도 바뀌지 않습니다. 이러한 파일을 정적파일.

 static 미들웨어의 사용법을 봅시다!

     var http = require('http');
     var express = require('express');

     var app = express();

     // app.use(express.logger());
     // app.use(express.bodyParser());
     // app.use(express.cookieParser());
     // app.use(express.session());
     app.use(express.static('public'));
     app.use(function (request, response) {
       response.send('<h1>Hello Middleware..!</h1>');
     });
     // app.use(app.router);

     http.createServer(app).listen(52273, function(){
      console.log('Server Running at http://127.0.0.1:52273');
     });

 http://127.0.0.1:52273/index.html
 이렇게 입력하면, public/index.html;

 오오.. 신기하구나!!!!!!!! 그럼 더 넣어볼까 다른 종류를? 작동하지 않음....

### 19.10 라우터
 사용자의 요청에 따라 사용자가 필요한 정보를 제공하는 것을 "라우트(route)한다"라고 표현합니다. 그리고 이러한 기능을 수행하는 미들웨어를 "라우터"라고 부릅니다.

     var http = require('http');
     var express = require('express');

     var app = express();

     // app.use(express.logger());
     // app.use(express.bodyParser());
     // app.use(express.cookieParser());
     // app.use(express.session());
     app.use(express.static('public'));
     app.use(app.router);

     //GET POST PUT DELETE요청 방식은 나중에 알아보고

     //라우트합니다.
     app.all('/a', function(request, response) {
       response.send('<h1>Page A</h1>')

     });
     app.all('/b', function(request, response) {
       response.send('<h1>Page B</h1>')
     });
     app.all('/c', function(request, response) {
       response.send('<h1>Page C</h1>')
     });

     http.createServer(app).listen(52273, function(){
      console.log('Server Running at http://127.0.0.1:52273');
     });


### 19.11 응답과 응답 형식
 - /date.html 데이터를 HTML
 - /date.json 데이터를 JSON
 - /date.xml 데이터를 XML

  기본 서버 구성해보면...
  **19.11.1 HTML 응답**

      var http = require('http');
      var express = require('express');

      //변수 선언
      var items = [{
        name: '우유',
        price: '20000'
      },{
        name: '홍차',
        price: '5000'
      },{
        name: '커피',
        price: '4000'
      } ];

      var app = express();

      app.use(express.static('public'));
      app.use(app.router);

      //GET POST PUT DELETE요청 방식은 나중에 알아보고

      //라우트합니다.
      app.all('/data.html', function(request, response) {
        var output = '';
        output += '<!DOCTYPE html>';
        output += '<HTML>';
        output += '<head>';
        output += '   <title>Date HTML</title>';
        output += '</head>';
        output += '<body>';

        items.forEach(function (item) {
          output += '<div>';
          output += ' <h1>' + item.name + '<h1>';
          output += ' <h2>' + item.price + '<h2>';
          output += '</div>';
        });

        output += '</body>';
        output += '</html>';
        response.send(output);
        //원래는 템플릿 엔진을 활용하는데, 조금 어려움

      });
      app.all('/data.json', function(request, response) {
        response.send(items);
      });
      app.all('/data.xml', function(request, response) {
        response.send('<h1>Page C</h1>')
      });

      http.createServer(app).listen(52273, function(){
       console.log('Server Running at http://127.0.0.1:52273');
      });

**19.11.2 JSON 응답**
문자열 HTML
배열 JSON
객체 JSON

    app.all('/data.json', function(request, response) {
      response.send('<h1>Page B</h1>')
    });

**19.11.3 XML 응답**

    app.all('/data.xml', function(request, response) {
      var output = '';
      output += '<?xml version="1.0" encoding="UTF-8" ?>';
      output += '<products>';
      items.forEach(function (item) {
        output += '<product>';
          output += '<name>' + item.name + '</name>';
          output += '<price>'+ item.price + '</price>';
        output += '</product>';
      });
      output += '</products>';
      response.type('text/xml');
      response.send(output);
    });

### 19.12 Postman 크롬 확장 프로그램
 Postman 크룸 확장 프로그램은 HTTP요청을 수행하는 프로그램
 Postman을 사용하면 HTTP요청을 수행.
 좀더 써봐야 할 듯...

### 19.13 요청과 요청 매개 변수

 서버는 클라이언트에게 파일 또는 문자열을 제공함으로써 정보를 제공
 그렇다면 클라이언트는 서버로 어떻게 정보를 제공할까?

 요청 매개변수를 알아하는데,
 요런거? http://주소/경로?키A=값&키B=값B

**19.13.1 일반 요청 매개변수**

일반 요청 매개변수를 추출하는 방법은?
app.all('/parameter', function ( request, response) {

  });

일반 요청 매개변수를 추출할 때는 request.param() 메서드를 사용합니다.

    app.all('/parameter', function(request, response) {
      var name = request.param('name');
      var region = request.param('region');

    //응답
    response.send('<h1>' + name + ':' + region + '</h1>');
    });

  이렇게 하고 parameter를 쓰면 name, region을 서버가 클라이언트로부터 정보를 받을수 있다.

**19.13.2 동적 라우트 요청 매개변수**
 위키피디아의 검색은 다음 검색과 다르게 다음 형태로 라우트됩니다.
 **키=값 형태의 요청 매개변수를 사용하는 것이 아니라 경로에 직접 입력합니다.**
- HTML검색 > http://en.wikipedia.org/wiki/HTML
- Cloud검색 > http://en.wikipedia.org/wiki/Cloud
- Sky검색 > http://en.wikipedia.org/wiki/Sky


    app.all('/parameter2/:id', function(request, response) {
      var id = request.param('id');
    //:id 주의!
    response.send('<h1>' + id + '</h1>');
    });

> ':id'라고 쓴다는거를 기억하자!

### 19.14 요청 방식
    지금까지 배운것.
    1. 특정 경로에 요청을 처리하는 방법
    2. 클라이언트에서 전달된 데이터를 처리하는 방법

만약에 "집에서 밥을 먹어"하면 집과 밥은 데이터를 보냈는데, '먹어'라는 동작을 나타내는 것을 "요청 방식"로 처리합니다.
**메서드** |**의미**
----|------
GET | 자원 조회
POST | 자원 추가
PUT | 자원 수정
DELETE | 자원 삭제
HEAD | 자원의 메타 데이터 조회
OPTIONS | 사용 가능한 요청 방식 조회
TRACE | 테스트 목적의 데이터 조회
CONNECT | 연결 요청


### 19.15 서버 정리
