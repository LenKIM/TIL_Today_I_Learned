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
