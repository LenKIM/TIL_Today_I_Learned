CHAPTER 2 Node.js 개발 환경 구축
__2.1 LTS 버전과 Current 버전
__2.2 윈도우 설치
__2.3 우분투 설치
__2.4 맥 설치
__2.5 첫 번째 Node.js 애플리케이션
__2.6 두 번째 Node.js 애플리케이션

변수와 상수.

var

변수는 "let"
상수는 "const"

변수
let a = 10;
let a;
a = 10;

상수
const a = 10;

"모든 var 를  Const로 교체하고
거기서 오류나는 부분은 let으로 변경한다."


첫 번쨰 Node.js 애플리케이션
console.log('Hello World...!');

그러나 이러한 것도 템플릿 문자열로 바꿀수 있는데,

console.log('출력: &{a + a}');

이정도?

const http = require('http');

//웹 서버를 만들고 실행
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-type': 'text/html'});
  response.end('<h1> Hello world!</h1>')
}).listen(52273, function ->
  console.log('Server running at http://127.0.0.1:52273/'));


  
