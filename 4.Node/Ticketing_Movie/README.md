
이 장에서는 영화예매에 관한 node.js를 구현함을 목표로 한다.

어디까지나, 이 예제를 통해 어떻게 서버와 클라이언트 통신하고, 어떻게 Node.js를 활용하는 지를 목표로 한다.

 이 장에서는 실시간 영화 애매 어플리케이션을 만드는 것을 목표로 한다.
 Ajax를 사용해 화면에 현재 좌석을 출력하고 socket.io모듈로 좌석 예약 상황을 실시간으로 전달하는 기능 을 만듭니다.

 모듈 이름 | 설명
 ---|----
 Socket.io@1 | 소켓 서버를 생성할 때 사용합니다.
 express@4 | 웹 서버를 생성할 때 사용합니다.
 http | 웹 서버를 실행 할 때 사용합니다.
 fs | 파일을 읽을 때 사용합니다.

```
Lenui-MacBook-Pro:Ticketing_Movie len$ express init

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options


   create : init
   create : init/package.json
   create : init/app.js
   create : init/public
   create : init/public/images
   create : init/public/javascripts
   create : init/public/stylesheets
   create : init/public/stylesheets/style.css
   create : init/routes
   create : init/routes/index.js
   create : init/routes/users.js
   create : init/views
   create : init/views/index.jade
   create : init/views/layout.jade
   create : init/views/error.jade
   create : init/bin
   create : init/bin/www

   install dependencies:
     $ cd init && npm install

   run the app:
     $ DEBUG=init:* npm start

Lenui-MacBook-Pro:Ticketing_Movie len$
```
