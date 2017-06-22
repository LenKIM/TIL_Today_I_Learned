## This is made by Len

MyNodeApplication 프로젝트는

Android(Retrofit2) + Node.js(espress@4)이용하여 만들었습니다.

데이터베이스는 MongoDB를 사용하였으며,
클라우드에 올릴 예정이였으나, heroku 또는 AWS에서 MongoDB가 유료이고,
특히 heroku의 경우 일정 부분 무료이긴 하나, 필요성을 느끼지 못하여 Localhost에서  
확인 할 수 있수 있습니다.


### Node.js

만든 파일을 확인하기 위해서는 npm install을 통하여 package.json에 있는 파일들을  
모두 설치해야 합니다.

`$ npm install`

아! MongoDB도 설치되어야 합니다! 잊지말아주세요.

 그런뒤, MongoDB의 서버를 열어 주셔야합니다.
  `$ mongod`

다음,

`$ node app.js`  
를 통해 서버의 Port를 Open해주세요.  

### Android

튜트리얼이 아니기 때문에 자세한 설명은 생략하겠습니다.
Retrofit2를 활용하여 PUT/GET/POST/DELETE의 기능을 넣는 것을 목표로 개발되었습니다.


여기서 주의할 점이 있습니다. 핸드폰과 PC의 Localhost는 다를 수 있습니다!(특히! 공유기를 쓰신다면..) 그렇기 때문에 서버의 IP주소를 알아낸뒤, 안드로이드 코드에서 baseUrl부분을 수정해 주셔아합니다~!!! 그리고 한가지 더! 디버깅모드가 아마 안될겁니다. 만약에 여러분이 카페에서 이코드를 실행한다면...
와이파이락? 이라는 메세지와함께 영원히 액티비티를 보여주지 않죠...


제 프로젝트를 사용하셔서 펌하셔도 되지만, 그래도 간단히 출처 남겨주세요 : )
