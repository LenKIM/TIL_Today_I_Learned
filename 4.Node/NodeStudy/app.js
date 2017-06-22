
/** 익스프레스를 사용한 가장 단순한 샘플
미들웨어 사용하기
/process/showCookie
/process/setUserCookie
*/

 const express = require('express');
 const http = require('http');
 const path = require('path');


//Express의 미들웨어 불러오기
const bodyParser = require('body-parser');
const static = require('serve-static');

//Express의 미들웨어 불러오기
const cookieParser = require('cookie-parser');
//Session 미들웨어
const expressSession = require('express-session');

const errorHandler = require('errorhandler');

//에러 핸들러 모듈 사용
const expressErrorHandler = require('express-error-handler');

 //익스프레스 객체 생성
 const app = express();

 //기본 포트를 app객체에 속성으로 설정
 app.set('port', process.env.PORT || 3000);

//body=parser를 사용해 application/json파싱
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use('/public', static(path.join(__dirname, 'public')));

 app.use(cookieParser());

 app.use(expressSession({
   secret : 'my key',
   resave:true,
   saveUninitialized : true
 }));

//라우터 객체 참조
const router = express.Router();

//라우터 함수 등록
router.route('/process/login').post(function(req, res) {
  console.log('/process/login 요청 처리함');


  const paramId = req.body.id || req.query.id;
  const paramPassword = req.body.password || req.query.password;

  if(req.session.user) {
    //이미 로그인된 상태
    console.log('이미 로그인되어 상품 페이지로 이동');

    res.redirect('/public/product.html');
  }else {
    //세션저장
    req.session.user = {
      id: paramId,
      name:'소녀시대',
      authorized: true
    };
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express 로그인 성공</h1>');
	res.write('<div><p>Param id : ' + paramId + '</p></div>');
	res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>")
	res.end();
  }
});

router.route('/process/logout').get((req,res) => {
  console.log('/process/logout 호출됨');

  if(req.session.user) {
    //로그인된 상태
    console.log('로그아웃합니다.');

    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
      console.log('세션을 삭제하고 로그아웃되었스비다');
      res.redirect('/public/login.html');
    });
  } else {
    //로그인 안된 상태
    console.log('아직 로그인되어있지 않다.');
    res.redirect('/public/login.html');
  }
});
//상품 정보 라우팅 함수
router.route('/process/product').get((req,res) => {
  console.log('/process/product호출');

  if (req.session.user) {
    res.redirect('/public/product.html');
  } else {
    res.redirect('/public/login.html')
  }
});

//라우터 객체를 app객체에 등록
app.use('/', router);

// // 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res) {
// 	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
// });

// 404 에러 페이지 처리
var errorHandler2 = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler2);

 http.createServer(app).listen(app.get('port'), () => {
   console.log('Running http server at 127.0.0.1 :' + app.get('port'));
 })
