# (웹)WWW

서버의 TCP, UDP, SCTP 포트는 80번으로 지정  
\- 보안을 위해 8000, 8080등을 이용  
\- 보안이 강화된 HTTPS(HTTP over TLS/SSL)의 경우 TCP, UDP, SCTP포트 443 이용

- 웹 브라우저는 http또는 https서비스에 지정된 포트를 통해 서버와 연결 시도

  - 다양한 웹 브라우저 존재

- 웹 서버와 연결이 되면 클라이언트의 정보 요구에 대해 서버가 웹 문서 회신

- 사용자 요구마다 연결 설정과 해제 반복

  ​

- URL(Uniform Resource Locator)  

  \- 서버의 자원 명칭  
  \- 사용하는 프로토콜, 서버의 호스트 이름, 서버 내부의 파일경로명으로 구성  
  \- 예: http://www.korea.co.kr/welcom.html  
  \- UNIX/Linux 시스템

- HTTP(HyperText Transfer Protocol)

- 연결 설정과 해제

  1. 사용자가 웹 브라우저에 웹 서버의 URL주소 입력
  2. 웹 브라우저가 DNS서버에게 웹 서버의 호스트 이름을 IP주소로 변경 요청
  3. 웹 브라우저가 \<IP주소 + 포트80번> 의 웹 서버와 TCP 연결 시도
  4. 웹 브라우저가 웹 서버에게 최초 화면을 위한 GET 명령 전송
  5. 웹 서버가 웹 브라우저에게 요청한 웹 문서를 회신
  6. 웹 브라우저와 웹 서버 사이의 연결 해제
  7. 웹 브라우저가 사용화면에 웹 문서를 출력

![](https://ws2.sinaimg.cn/large/006tKfTcgy1foev0moyqlj314r0s5dmf.jpg)





## APM(Apache, PHP, MySQL)

- Apache - 웹 서버 프로그램, 대응되는 프로그램은 MS의 lls(Internet Information Services)
- PHP - 유닉스/리눅스 환경에서 지원되며, HTML언어의 기능을 보강, 대응되는 언어 MS의 ASP, Java언어 기반 JSP등
- MySQL - 데이터베이스 기능 지원, 대응되는 DB : Oracle DB, MariaDB
- APM의 동작 원리
  1. 웹 브라우저가 Apache에 웹 문서 요청
  2. PHP코드 처리 필요시 PHP에 요청
  3. 데이터베이스 처리 필요시 MySQL에 요청
  4. 데이터베이스 결과 회신
  5. PHP가 실행 결과인 HTML코드 회신
  6. 웹 문서를 웹 브라우저에 회신

![](https://ws3.sinaimg.cn/large/006tKfTcgy1foev0a4k37j31690zf7bm.jpg)



- PHP코드의 처리
  - PHP코드는 HTML문서에 Embedded 형식으로 작성 : <? 와 ?>이 구분자
  - 웹 브라우저에 회신하는 내용: PHP코드는 서버에서 실행되고 결과만 회신



## HTML(HyperText Markup Language)

- 웹 브라우저에서 데이터를 어떻게 표시하는지 나태냄
- HTML로 작성한 문서는 서버에 보관
- 클라이언트는 그 문서를 받아 화면에 표시



**HTML 문서 구조**

- HTML로 시작해서 /HTML로 종료
- 헤더 / 바디

![](https://ws3.sinaimg.cn/large/006tKfTcgy1foev3wu55hj31kw0njq8l.jpg)



## HTTP(HyperText Transfer protocol)

- 웹브라우저는 URL을 이용 원하는 자원표현
- HTTP메소드(method)를 이용하여 데이터를 요청(GET)하거나, 회신(POST)
- 요청과 응답
  - RFC 2617으로 발표된 HTTP 1.1 버전 - 클라이언드의 요청과 서버의 응답에 의해 동작하는 간단한 프로토콜
  - 요청 - HTTP클라이언트가 서버에 요청을 전송. 요청 메소드, URL, HTTP버전과 기타 부가정보 포함
  - 응답 - HTTP 서버가 요청의 결과인 응답 코드가 포함된 정보를 회신
- 비상태(stateless) 연결
  - 요청과 응답 이후, 연결이 끊어지므로 비상태 프로토콜
- MIME(Multipurpose Internet Message Extenstions)
  - 기존 ASCII 문자로 구성된 텍스트만이 전송 가능했던 전자우편을 멀티미디어 데이터 전송도 가능하도록 확장한 것



### 요청 메시지

- 구성

![](https://ws4.sinaimg.cn/large/006tKfTcgy1foev9gckraj31kw10tq9v.jpg)



![](https://ws3.sinaimg.cn/large/006tKfTcgy1foev9vn1avj31kw0krnbr.jpg)

예)

GET / HTTP/1.1
요청 메서드 : GET
URL : /
HTTP 버전 : HTTP/1.1



### 응답 메시지

- 요청메시지와 유사한, 요청문 대신 상태문(Status line)사용

![](https://ws2.sinaimg.cn/large/006tKfTcgy1foevb1g7wmj31k912fq99.jpg)

- 상태문의 구성
  - HTTP 버전 / 상태 코드 / 상태 이름

![](https://ws4.sinaimg.cn/large/006tKfTcgy1foevbm62t0j31h50ppgxe.jpg)





## HTTP의 동작 과정

- 요청 메시지
  ![](https://ws4.sinaimg.cn/large/006tKfTcgy1foevc2v9bcj31kw0b2div.jpg)

  \- 요청 메서드 : GET  
  \- URL : /index.php  
  \- HTTP버전 : HTTP/1.1
  \- 서버 주소 : uu.ac.kr

- 응답 메시지

  ![](https://ws4.sinaimg.cn/large/006tKfTcgy1foevd3qjw2j31kq14aaro.jpg)



## CGI(Common Gateway Interface)

**왜?**

- HTML로만 웹문서를 작성하는 경우 서버의 정보만이 일반적으로 받아들이는 단방향 정보 흐름


- 사용자가 입력하는 정보에 따른 처리 기능 제공 필요

**자바스크립트를 예로 들을 수 있겠다** **이를 통해 외부 프로그램과 연계법을 정했다.**

[위키 이야기](https://ko.wikipedia.org/wiki/공용_게이트웨이_인터페이스)

