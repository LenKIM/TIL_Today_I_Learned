## CHAPTER 7 외부 모듈

> 외부 모듈 설치

  npm install 모듈명
  npm install ejs
  npm install jade

>외부 모듈의 사용

//모듈을 추출
const ejs = require('ejs');
const jade = require('jade');

 jade모듈이 pug모듈이라는 이름으로 변경되었음.

### __7.1 ejs 모듈
### __7.2 jade 모듈
: PUG로 이름이 변경되었음.
### __7.3 서버 실행 모듈
### __7.4 기본적인 npm 명령어와 save 옵션

외부 모듈은 지형모듈과 전역모듈

템플릿 엔진모듈을 살펴봄.

const ejs = require('ejs');
const pug = require('pug');

console.log(ejs);

console.log(pug);

이렇게하면 쉽게 이 모듈이 어떤 속성과 메서드를 가지는지 알수 있다.

```javascript
    // 템플릿엔진
     const ejs = require('ejs');
     const http = require('http');
     const fs = require('fs');

     http.createServer((request, response) => {
       fs.readFile('ejspage.ejs', (erorror, file) => {
         //출력
         console.log(file);

         response.writeHead(200, {'Content-type' : 'text/html'});
         response.end('글자를 넣어주세요.');
       });
    }).listen(52223);
```

![스크린샷 2017-02-21 오전 9.56.24](http://i.imgur.com/NIEIsH7.png)

이런식으로 버퍼로 나오는데, 이를 해결하기 위해서는 console.log()부분에 encoding을 지정해주자.

ejs를 알아보는 깃헙 사이트.
https://github.com/tj/ejs
여기서 rander라는 것이 있는데!

항상 들어가서 공부하는 습관을 가질것!

    ejs.compile(str, options);
    // => Function

    ejs.render(str, options);
    // => str

jade 공부
https://github.com/pugjs/pug

    h1 = name
    - for(let i = 0; i < 10; i++) {
      - if(i % 2 == 0) {
      p 짝수 - #{i}
      - } else {
      p 홀수 - #{i}
      - }
    - }


## __7.3 서버 실행 모듈
 전역 모듈로 터미널에서 곧바로 사용할 수 있는 모듈
 전역 모듈을 설치할 때는 -g 옵션을 사용합니다.

 7.3.1 supervisor 모듈
 7.3.2 forever 모듈

## __7.4 기본적인 npm 명령어와 save 옵션
 이 절에서는 내가 만든 프로그램을 배포했을 때 상대방 쪽에서 내가 사용하던 버전의 모듈을 설치하게 하고 싶을 때는 어떻게 해야 할까요?
 다음을 살펴봅시다.

 **7.4.1 npm init**

 npm init 명령을 사용하면,
 프로젝트의 이름,
 버전,
 설명,
 엔트리 포인트 등을 요구합니다.
 그러고 난 이후로 package.json 파일이 생성되어 있습니다.

 **7.4.2 모듈 버전 선택과 저장**
 npm init명령 package.json파일을 만들었다면, 이러한 npm install 명령을 입렵할 떄 다음처럼 --save 옵션을 사용할 수 있습니다. --save 옵션을 사용하면 내가 프로그램을 만들 때 어떤 버전을 사용했는지 명시 할 수 있습니다.

 >npm install --save jade
 npm install --save ejs@1
