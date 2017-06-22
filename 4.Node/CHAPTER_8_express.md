# CHAPTER 8 express 모듈

 현재 Node.js 웹 서버를 개발할 때 가장 많이 사용하는 모듈

꼭 알아야할 개념.

개념|설명
--|---
express 모듈|http 모듈처럼 사용할 수 있지만 휠씬 더 많은 기능이 있는 외부 모듈
미들웨어|express모듈 use()메서드의 매개변수에 입력하는 함수를 말합니다.
router 미들웨어 | 페이지 라우팅을 지원하는 미들웨어
static 미들웨어 | 지정한 폴더에 있는 내용을 모두 웹 서버 루트폴더에 올릴때 사용합니다.
morgan 미들웨어 | 웹 요청이 들어왔을 때 로그를 출력합니다.
cookie parser 미들웨어 | 요청 쿠키를 추출합니다.
body parser 미들웨어 | POST요청 데이터를 추출합니다.
connect-multiparty 미들웨어 | multipart/form-data인코딩 방식을 사용해 POST요청 데이터를 추출합니다.
express-session 미들웨어 | 세션을 쉽게 생성할 수 있게 도와줍니다.
RESTful 웹 서비스 | 일관된 웹 서비스 인터페이스 설계 기반의 REST규정을 맞춰 만든 웹 서비스를 말합니다.

### __8.1 기본 서버

>//모듈 추출
const express = require('express');

>express 모듈을 사용한 서버 생성 및 실행

```javascript
//모듈을 추출합니다.
const express = require('express');

//서버를 생성
const app = express();

//request 이벤트 리스너를 설정합니다.
app.use((request, response) => {
  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.end('<h1>Hello express</h1>');
  });
  ```

  **"그럼 http 모듈을 사용하지? 왜 express모듈은 왜 사용하는가?"**

  express모듈은 http모듈처럼 사용할 수 있지만 휠씬 많은 기능이 있습니다.

  express모듈의 기본 서버 생성 코드는 외우고 사용할 수 있는 정도가 되어야 원활하게 예제 실습을 진행할 수 있습니다.

### __8.2 기본 응답 메서드(response)
request 이벤트 리스너의 매개변수에는 request객체와 response객체가 들어갑니다.

>request 이벤트 리스너 기본

```javascript
app.use((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html' });
  response.end('<h1>Hello express</h1>');
  });
  ```

위와같이 요청을 보내면~~~~

어떻게 응답하는데, response객체의 메서드를 보자.
메서드이름|설명
---|---
response.send([body])|매개변수의 자료형에 따라 적절한 형태로 응답합니다.
response.json([body])|JSON형태로 응답합니다.
response.jsonp([body])|JSONP형태로 응답합니다.
response.redirect([status,] path)|웹 페이지 경로를 강제로 이동합니다.

 > send()메서드 사용법
 ```javascript
 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.use((request,response) => {
   let output =[];
   for(let i = 0; i < 3; i++){
     output.push({
       count :i,
       name: 'name - '+ i
       })
   }

   //응답합니다.
   response.send(output);
   });

   app.listen(53147, () => {
     console.log('Server running at http://127.0.0.1:53147');
     });
```

 response.send()메서드 앞에 status()메서드를 사용하면, 상태 코드를 전달할 수 있다.

 ```javascript
 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.use((request,response,next) => {

   //응답합니다.
   response.status(404).send('<h1>ERROR</h1>');

   });

   app.listen(53147, () => {
     console.log('Server running at http://127.0.0.1:53147');
     });
```

### __8.3 기본 요청 메서드(request)
 response 객체와 마찬가지로 request 객체에도 메서드와 속성이 추가됨

 request객체의 속성과 메서드.

 메서드/속성 이름 | 설명
 ---|----
 params| 라우팅 매개변수를 추출합니다.
 query | 요청 매개변수를 추출합니다.
 headers | 요청 헤더를 추출합니다.
 header() | 요청 헤더의 속성을 지정 또는 추출합니다.
 accepts(type) | 요청 헤더의 Accept 속성을 확인합니다.
 is(type) | 요청 헤더의 Content-Type 속성을 확인합니다.

 8.3.1 요청 헤더의 속성 추출
 header()메서드를 사용하면 손쉽게 요청 헤더의 속성을 지정하거나 추출할 수 있습니다. 웹 브라우저로 HTTP요청을 하면 반드시 User-Agent속성이 따라오므로 User-Agent속성을 추출해봅시다.

 >User-Agent속성

 ```javascript
 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.use( (request,response) => {
   //User-Agent 속성을 추출
   const agent = request.header('User-Agent');
   console.log(request.headers);
   console.log(agent);
   });

   app.listen(53147, () => {
     console.log('Server running at http://127.0.0.1:53147');
     });
```

8.3.2 요청 매개변수 추출

 ```javascript
 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.use( (request,response,next) => {
   //변수를 선언
   let name = request.query.name;
   let region = request.query.region;
   //응답합니다.
   response.send('<h1>' + name + '-' + region + '</h1>');
   });

   app.listen(53147, () => {
     console.log('Server running at http://127.0.0.1:53147');
     });
```
 이렇게하고 http://127.0.0.1:53147?name=len&region=Guri 이렇게 요청하면
 //응답합니다. 라고 나온 부분과 비슷하게 나옴.

### __8.4 미들웨어 개요
 express모듈은 request 이벤트 리스너를 연결하는데 use()메서드를 사용한다는 것이다. 왜 http모듈과 다르게 use()메서드를 사용하는 것일까요?

 우선 use()메서드는 여러번 사용 가능합니다.
  그리고 use() 매개변수로는 (request, response, next) => {} 형태의 함수를 입력합니다.


 ```javascript

 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.use( (request, response, next) => {
   console.log("첫 번째 미들웨어");
   next();
   });

 //request 이벤트 리스너를 설정
 app.use( (request, response, next) => {
   console.log("두 번째 미들웨어");
   next();
   });

 //request 이벤트 리스너를 설정
 app.use( (request, response, next) => {
   console.log("세 번째 미들웨어");

    //응답합니다.
    response.writeHead(200, { 'Content-Type' : 'text/html'});
    response.end('<h1>express Basic</h1>')
    });

 app.listen(53147, () => {
   console.log('Server running at http://127.0.0.1:53147');
   });

```

 그러면 next를 타고 첫번째 미들웨어 / 두번째 미들웨어 / 세번째 미들웨어 이라고 콘솔에 로그를 찍고 브라우저에(클라이언트)에 express Basic 를 나타냅니다.


 그렇다면 '왜?' 사용하는가? 그래 use()메서드가 '미들웨어'라는 것은 알겠는데? 왜왜?

 미들웨어에서 request객체와 response객체에 속성 또는 메서드를 추가하면 다른 미들웨어에서도 추가한 속성과 메서드를 사용할 수 있기 때문에 use()메서드를 사용합니다.

**즉, 미들웨어를 사용하면 특정한 작업을 수행하는 모듈을 분리해서 만들 수 있습니다.**

***"그냥 하나에 모두 입력하면 안되나요? 왜 귀찮게 분리해서 사용해요?"***

이유는 재사용할 수 있기 때문입니다.

개념|설명
--|---
express 모듈|http 모듈처럼 사용할 수 있지만 휠씬 더 많은 기능이 있는 외부 모듈
미들웨어|express모듈 use()메서드의 매개변수에 입력하는 함수를 말합니다.
router 미들웨어 | 페이지 라우팅을 지원하는 미들웨어
static 미들웨어 | 지정한 폴더에 있는 내용을 모두 웹 서버 루트폴더에 올릴때 사용합니다.
morgan 미들웨어 | 웹 요청이 들어왔을 때 로그를 출력합니다.
cookie parser 미들웨어 | 요청 쿠키를 추출합니다.
body parser 미들웨어 | POST요청 데이터를 추출합니다.
connect-multiparty 미들웨어 | multipart/form-data인코딩 방식을 사용해 POST요청 데이터를 추출합니다.
express-session 미들웨어 | 세션을 쉽게 생성할 수 있게 도와줍니다.
RESTful 웹 서비스 | 일관된 웹 서비스 인터페이스 설계 기반의 REST규정을 맞춰 만든 웹 서비스를 말합니다.

여기서 개인이 만든 미들웨어와 기업이 만든 미들웨어를 포함 시킬수 있습니다.

### __8.5 router 미들웨어
 express모듈은 페이지 라우팅을 지원합니다.  페이지 라우팅 기능은 express모듈에 내장되어 있는 미들웨어의 기능이라 보통 자동으로 사용할 수 있게 설정되므로 미들웨어로 사용한다는 느낌을 받지 못할수도 있습니다.

 어쨋거나 페이지 라우팅은 클라언트 요청에 적절한 페이지를 제공하는 기술입니다.

 메서드 이름 | 설명
 ---|---
 get(path,callback) | GET요청이 발생했을 때의 이벤트 리스너를 지정합니다.
 post(path,callback) | POST요청이 발생했을 때의 이벤트 리스너를 지정합니다.
 put(path,callback) | PUT요청이 발생했을 때의 이벤트 리스너를 지정합니다.
 delete(path,callback) | DELETE 요청이 발생했을 때의 이벤트 리스너를 지정합니다.
 all(path,callback) | 모든 요청이 발생했을 때의 이벤트리스너를 지정

 ```javascript

 //모듈 추출
 const express = require('express');

 //서버 생성
 const app = express();

 //request 이벤트 리스너를 설정
 app.get('/a', (request, response) => {
   response.send('<a href= "/b">Go to B</a>')
   })

 app.get('/b', (request, response) => {
   response.send('<a href= "/a">Go to A</a>')
   })

app.listen(53147, () => {
   console.log('Server running at http://127.0.0.1:53147');
   });

 ```

 이렇게 하고 http://127.0.0.1:53147/a 입력해보라!

 >이번에는 라우팅 매개변수 추출하는것
/:id를 활용하는 것!

  ```javascript

  //모듈 추출
  const express = require('express');

  //서버 생성
  const app = express();

  //request 이벤트 리스너를 설정
  app.get('/page/:id', (request, response) => {

    //변수를 선언
    let name = request.params.id;

    //응답합니다.
    response.send('<h1>' + name + '</h1>')
    })

//서버를 실행
 app.listen(53147, () => {
    console.log('Server running at http://127.0.0.1:53147');
    });

```

//경로를 지정할 때는 대소문자를 무시하는 것이 기본 설정입니다.

---
 ***중요!!***
 params속성과 query속성의 차이를 확실히 이해해야 합니다.
 params => /:id처럼 ':'기호를 사용해 지정된 라우팅 매개변수
 query => ?name=A와 같은 요청 매개변수
 ---

 전체 선택자
express모듈의 페이지 라우팅에는 전체 라우팅을 사용 할 수 있다.
```javascript
//request 이벤트 리스너를 설정
app.get('/index', (request, response) => {
  response.send('<h1>Index Page</h1>');
  });

app.get('*', (request, response) => {
  response.status(404).send('<h1>ERROR - Page Not Found</h1>');
  });
```
### __8.6 static 미들웨어

 static 미들웨어를 사용하면 지정한 폴더에 있는 내용을 모두 웹 서버 루트 폴더에 올립니다.
 이 말은 즉슨, index에 필요한 사진이나 노래등을 웹 서버 루트에 올림으로써, 바로 접근이 가능하게 만든다는 의미를 나타냅니다!

### __8.7 morgan 미들웨어

 morgan미들웨어는 웹 요청이 들어왔을 때 로그를 출력하는 미들웨어.
 외부 모듈이므로 설치해야합니다.

 >npm install morgan

 [생략]

### __8.8 cookie parser 미들웨어

cookie parser 미들웨어는 요청쿠키를 추출하는 미들웨어.
cookie parser 미들웨어를 사용하면 request객체와 response객체에 cookies속성과 cookie()메서드가 부여됩니다.

 간단한 예제를 바로 만들어보면, 일단 쿠키를 저장할 수 있는 Set-Cookie페이지와 쿠키를 볼 수 있는 getCookie페이지를 생성샇ㅂ니다.

 ```javascript
 //모듈 추출
 const express = require('express');
 const cookieParse = require('cookie-parser');

 //서버 생성
 const app = express();

 //미들웨어를 설정
 app.use(cookieParse());

 //라우터를 설정
 app.get('/getCookie', (request, response) => {
   // 응답합니다.
   response.send(request.cookie);
   });

   //라우터를 설정
   app.get('/setCookie', (request, response) => {
     // 쿠키를 생성합니다.
     response.cookie('string', 'cookie');
     response.cookie('json', {
       name: 'cookie',
       property: 'delicious'
       });

      //응답합니다.
      response.redirect('/getCookie');
    });

   //서버를 실행
   app.listen(53147, () => {
     console.log('Server running at http://127.0.0.1:53147');
     })

```
 cookie()메서드의 세 번쨰 매개변수에는 다음과 같이 옵션 객체를 입력할 수있다.
 ```javascript
 response.cookie('string','cookie', {
   maxAge: 6000,
   secure: true
   });
   ```

### __8.9 body parser 미들웨어
 body parser미들웨어는 POST요청 데이터를 추출하는 미들웨어입니다. 이 미들웨어를 사용하면 request객체에 body 속성을 부여됩니다. 일단 다음 명령으로 body parser미들웨어를 설치합니다.

 > npm install body-parser

 ***주의!!***
 body-parser 미들웨어는 'application/x-www-form-urlencoded'라는 인코딩 방식만 지원합니다.

 body parser를 활용한 로그인을 구현해보겠습니다.

 일단 app.js 와 login.html을 만듭시다.


```javascript

//모듈 추출
const fs = require('fs');
const express = require('express');
const cookieParse = require('cookie-parser');
const bodyParser = require('body-parser');

//서버 생성
const app = express();

//미들웨어를 설정
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended: false}));

//라우터를 설정
app.get('/', (request, response) => {
  if (request.cookies.auth) {
    response.send('<h1>Login Success</h1>');
  } else {
    response.redirect('/login');
  }
});
//라우터를 설정
app.get('/login', (request, response) => {
  fs.readFile('login.html', (error,data) => {
response.send(data.toString())
    });
  });

//라우터를 설정
app.post('/login', (request, response) => {
  //쿠키를 생성
  const login = request.body.login;
  //body에서 이름에 해당하는 부분으로 끌어올수 있다. 여기서는 login / password
  const password = request.body.password;

  //출력
  console.log(login, password);
  console.log(request.body);

  //로그인을 확인
  if(login == 'len' && password == '1234') {
    //로그인 성공
    response.cookie('auth', true);
    response.redirect('/');
  } else {
    //로그인 실패
    response.redirect('/login');
    }
  });

//서버를 실행
app.listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
})

```

html은

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Login Page</title>
  </head>
  <body>
    <h1>Login Page</h1>
    <hr />
    <form method="post">
      <table>
        <tr>
          <td><label>Username</label></td>
          <td><input type= "text" name="login" /></td>
        </tr>
        <tr>
          <td><label>Password</label></td>
          <td><input type= "password" name="password" /></td>
        </tr>
      </table>
      <input type="submit" name="" />
    </form>
  </body>
</html>
```

### __8.10 connect-multiparty 미들웨어

 일반적인 입력 양식은 application/x-www-form-urlencoded 인코딩 방식을 사용합니다. 그런데 파일은 일반적인 입력 양식 데이터와 비교했을 때 용량이 큽니다. 따라서 웹 브라우저는 파일을 전송 할 때 multipart/form-data 인코딩 방식을 사용합니다.

 **"GET 요청과 POST요청은 왜 다른건가요?"**

 요청방식과 인코딩 방식은 동시에 사용하는 것이랍니다. POST 방식이면서 application/x-www-form-urlencoded 인코딩일 수 있으며, POST방식이면서 multipart/form-data 인코딩 방식일 수 있습니다. 그런데 body-parser미들웨어는 multipart/form-data인코딩 방식을 지원하지 않습니다. multipart/form-data 인코딩 방식을 사용할 수 있게 해주는 미들웨어는 connect-multiparty 미들웨어입니다.

 ```javascript


 //모듈 추출
 const fs = require('fs');
 const express = require('express');
 const multipart = require('connect-multiparty');

 //서버 생성
 const app = express();

 //미들웨어를 설정
 app.use(multipart({uploadDir:__dirname + '/multipart'}));

 //라우터를 설정
 app.get('/', (request, response) => {
   fs.readFile('HTMLPage.html', (error,data) => {
     response.send(data.toString());
   });
 });

 app.post('/', (request,response) => {
   //변수를 선언
   const comment = request.body.comment;
   const imageFile = request.files.image;

   if (imageFile) {
     //변수를 선언
     const name = imageFile.name;
     const path = imageFile.path;
     const type = imageFile.type;

     //이미지 파일 확인
     if(type.indexOf('image') != -1){
       //이미지 파일의 경우: 파일 이름을 변경합니다.
       const outputPath = __dirname + '/multipart/'+ Date.now() + '_'+name;
       fs.rename(path, outputPath, (error) => {
         response.redirect('/');
       });

     }else {
       //이미지가 아닌경우 삭제
       fs.unlink(path, (error) => {
         response.sendStatus(400);
       });
     }
   } else {
     response.sendStatus(404);
   }

   // console.log(request.body);
   // console.log(request.files);
 })

 //서버스를 실행
 app.listen(53147, () => {
   console.log('Server running at http://127.0.0.1:53147');
 })

```

```html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Multipart Upload</title>
  </head>
  <body>
    <h1>File Upload<h1>
      <form method="post" enctype="multipart/form-data">
        <table>
          <tr>
              <td>Comment: </td>
              <td><input type="text" name="comment" /></td>
          </tr>
          <tr>
              <td>File: </td>
              <td><input type="file" name="image" /></td>
          </tr>
        </table>
        <input type="submit" />
      </form>
  </body>
</html>

```

 특정한 페이지 라우팅에만 미들웨어 적용하려면 이렇게

    app.post('/', multipart, (request,response) => {

    });

### __8.11 express-session 미들웨어

 쿠키가 클라이언트의 웹 브라우제에 정보를 저장하는 기술이라면, 세션은 서버에 정보를 저장하는 기술입니다. 일반적으로 세션은 클라이언트에 세션 식별자 쿠키를 부여합니다. 그러고 부여한 세션 식별자 쿠기와 대응되는 서버에 위치하는 별도 저장소에 데이터를 저장합니다.

 이 미들웨어는 express-session 세션을 쉽게 생성할 수 있게 도와주는 미들웨어입니다.

 간단한 예를 보면

 ```javascript
 //모듈을 추출합니다.
 const express = require('express');
 //서버 생성
 const app = express();

 //미들웨어를 설정
 app.use(session({
   secret : 'secret key'.
   resave : false,
   saveUninitialized: true
   }));

  app.use((request, response) => {
    //세션을 저장합니다.
    request.session.now = (new Date()).toUTCString();

    //응답합니다.
    response.send(request.session);
    });

 //서버스를 실행
 app.listen(53147, () => {
   console.log('Server running at http://127.0.0.1:53147');
 })

```

위 코드는 세션을 저장하고 출력하는 간단한 예제.
request객체의 session속성을 출력합니다. 접속할 때마다 현재 시간을 now세션에 저장합니다.

### __8.12 RESTful 웹 서비스 개발





기본 HTTP와 Espress의 차이점은 response에서 큰 차이를 보인다.

 그리고 기본 응답 메서드에서 send()메서드로 자바스크립트 객체를 입력하면 JSON형식으로 출력합니다.
