
Node.js의 기본적으로 여러 가지 모듈을 제공함.

Node.js가 제공하는 동기와 비동기의 차이를 fs모듈로 직접 알아봅시다.

 > 꼭 알아둘 개념

 개념 | 설명
 --- | ---
 Node.js | Node.js의 주요기능을 설명하는 문서
 url모듈 | 인터넷 주소를 다루는데 사용
 Query String 모듈 | URL객체의 쿼리를 다루는데 사용
 util모듈 | Node.js의 보조 기능
 crypto모듈 | 해시생성과 암호화를 수행
 File System모듈 | 파일을 다루는데 사용

 4.1 OS 모듈

 어떻게 정보를 찾는가?

 ![스크린샷 2017-02-21 오전 8.51.40](http://i.imgur.com/KPIY6wn.png)


접속하여

![스크린샷 2017-02-21 오전 8.51.51](http://i.imgur.com/re79jAg.png)

요런 것에 들어가서 하나하나 필요한 정보를 찾아서 사용해야 한다!

문서를 다 외우는 것보다는 어떻게 사용하는가에 초점을 맞춘다.


 4.2 url모듈
 가장 많이 사용되는 parse메서드 이는 URL문자열을 URL객체로 변환해 리턴합니다.
 반대는 format(urlObj)

 resolve(from,to) 매개변수를 조합해 완전한 URL문자열을 생성해 리턴.

 4.3 Query String 모듈
url객체의 쿼리와 관련된 모듈입니다.


 4.4 util 모듈

자주 사용되므로 메소드를 눈에 익혀놓기

 ![스크린샷 2017-02-21 오전 9.03.47](http://i.imgur.com/1QgmwdJ.png)

 4.5 crypto 모듈

 해시 생성과 암호화를 수행하는 모듈

![스크린샷 2017-02-21 오전 9.06.26](http://i.imgur.com/2kllWrB.png)

![스크린샷 2017-02-21 오전 9.06.44](http://i.imgur.com/3vGTxGN.png)


 >crypto 모듈을 사용한 암호화

     //모듈 추출
     const crypto = require('crypto');

     //변수 선언
     const = '1234';
     const = 'PASSWORD'

     //암호화
     const cipher = crypto.createCipher('aes192', key);
     cipher.update(input, 'utf8', 'base64');
     const cipheredOutput = cipher.final('base64');

     //암호화 해제
     const decipher = crypto.createDecipher('aes192', key);
     decipher.update(cipheredOutput, 'base64', 'utf8');
     const decipheredOutput = decipher.final('utf8');

     //출력
     console.log('원래 문자열 ' + input);
     console.log('암호화' + cipheredOutput);
     console.log('암호화 해제' + decipheredOutput);

     ![스크린샷 2017-02-21 오전 9.21.53](http://i.imgur.com/3KGjPSI.png)

 4.6 File System 모듈

 https://nodejs.org/api/fs.html#fs_file_system

 ![스크린샷 2017-02-21 오전 9.25.46](http://i.imgur.com/5ANLcHj.png)


 메서드이름 | 설명
 ---|----
 readFile(file,encoding,callback) | 파일을 비동기적으로 읽는다
 readFileSync(file,encoding) | 파일을 동기적으로 읽는다
 writeFile(file,encoding,callback) | 파일을 비동기적으로 씀
 writeFileSync(file,data,encoding) | 파일을 동기적으로 씀

 
