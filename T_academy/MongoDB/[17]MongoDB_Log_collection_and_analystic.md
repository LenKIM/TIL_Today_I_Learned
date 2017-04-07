학습목표
1. MongoDB의 로그
2. MongoDB의 자체 모니터링 도구
----

1. MongoDB의 로그

**MongoDB의 모니터링 전략**
  - 데이터베이스 활동을 실시간 리포팅하는 유틸리티 활용
  (MongoDB 다운로드 패키지에 포함된 유틸리티)
  - 데이터베이스 명령 활용(현재 데이터베이스의 상태에 대한 통계 확인 가능)
  - MMS모니터링 서비스(MMS Montitoring Service)활용

  MMS란? 데이터에 대한 시각화 및 경고 등을 제공하는 무료서비스

  1-1. MongoStat
  - MongoDB가 동작하는 내부 상황에 대한 정보를 확인하기 위한 툴
  - 1초에 한번씩 mongod, mongos성능을 측정
  - MongoDB내에서 일어나는 다양한 이벤트(insert, find,updata,delete)에 대한 정보와 메모리 상태(mapped, vsize, res,faults, locked) 등의 정보 확인 가능
  - MongoStat 사용방법: 커멘트라인에서 "mongostat"이라고 입력
  - rowcount를 통해 출력될 데이터 row수를 지정 가능
  (만약 이 값을 지정하지 않는다면 계속해서 관련 정보 출력)

  `mongostat -rowcount 50`

![스크린샷 2017-04-07 오후 4.55.23](http://i.imgur.com/ktt9F46.png)
![스크린샷 2017-04-07 오후 4.56.11](http://i.imgur.com/TgKzTIc.png)
![스크린샷 2017-04-07 오후 4.57.17](http://i.imgur.com/TOOtFds.png)
![스크린샷 2017-04-07 오후 4.57.58](http://i.imgur.com/2lDlho1.png)

 - mongotop은 컬렉션 단위의 응답 속도 확인이 가능함
 - db.serverStatus()나 mongostat에 나오는 요청 건수와 같이 계산 하거나, 참고 지표정보로 봐야함.
 - mongostat에서 중요한 지표는 page fault, qr, locked등임
 - 갑자기 page fault가 증가하고 서비스가 지연된다면 full scan 쿼리를 날렸을 가능성이 높음
 - 쓰기 요청이 많아질 경우 qr수치가 높아지고 그 만큼 읽기 대기 중인 상태가 많아지므로 체감상 서비스가 지연된다고 느낄 수 있음

 ![스크린샷 2017-04-07 오후 5.03.15](http://i.imgur.com/4URxy1W.png)
![스크린샷 2017-04-07 오후 5.04.31](http://i.imgur.com/dTAB0Wj.png)


1-2 웹 모니터링 도구

  - 앞선 도구들은 데이터베이스라면 대부분 지원하는 기본적인 명령어
  - MongoDB는 웹상에서 MongoDB을 상황을 모니터링 할 수 있는 환경을 제공함
  - NoSQL솔루션의 특성 상 한 대 이상의 서버에서 사용할 수도 있기에 접근성이 높은 웹 모니터링 환경을 기본적으로 제공해줌
  - 웹 모니터링 기능을 활성화시키고 싶다면 mongodb 데몬을 실행할 때 --rest 옵션을 주면 됨

  포트번호 28017번 포트가 모니터링 도구

  `mongod -dbpath c:₩mongodb₩var --rest`
  127.0.0.1:28017번 포트로 웹에서 확인가능

  https://www.slideshare.net/revolutionistK/mongo-db-monitoring-mongodb-korea

  여기 참조할것!

  1-3 Log수집
  - 실시간으로 mongodb의 상태를 확인하는 것도 중요하지만 아무래도 모든 서버를 실시간으로 체크한다는 것은 불가능함
  - 로그데이터나 상태정보가 필요한 경우 장애가 발생했을 경우이거나 아니면 정기적인 점검 과정에서 필요하게 됨
  - 따라서,mongodb에서 일어나는 상황을 파일로 저장할 필요가 있음
  - logpath옵션을 몽고디비 데몬을 실행 시 사용하면 몽고디비의 로그를 저장가능한 상태가 됨
  - 꽤 많은 정보를 저장하기 때문에 log파일명을 일정 시간 단위로 바뀌줄 필요가 있음
`mongod -dbpath c:₩mongodb₩var -logpath c:₩mongodb₩testlog.txt`

  2. MongoDB의 자체 모니터링 도구
   **Mongostat**
   mongod, mongos 성능 측정하는 도구로 사용한다!

   ![스크린샷 2017-04-07 오후 5.13.48](http://i.imgur.com/wKoSinc.png)

   ![스크린샷 2017-04-07 오후 5.16.24](http://i.imgur.com/SJ4CT53.png)

   ![스크린샷 2017-04-07 오후 5.17.43](http://i.imgur.com/MeM7pbe.png)

   ![스크린샷 2017-04-07 오후 5.17.54](http://i.imgur.com/diruoSL.png)

   위의 이론으로 배운것을 하나씩 실습해봄!!!
