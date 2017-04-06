##리플리카셋(ReplicaSet)

1. Primary 서버
: 리플리카셋에서 첫번째 입력을 담당하는 서버
2. secondary 서버
: Primary서버를 제외한 나머지 서버

만약 Primary서버에 문제가 생기면 자동으로 secondary 서버에서 데이터 입/출력을 담당하게됨
**특징**
- 프라이머리 서버는 세컨더리 서버를 2초단위로 상태를 체크하여 데이터 동기화를 위해 HeartBeat확인

- HeartBeat의 수신 결과, 세컨더리 서버를 사용 할 수 없는 상황이 되더라도 데이터 복제만 중단 될뿐 프라이머리 서버는 데이터 수신/저장을 계속 담당

- 세컨더리 서버가 복구되면 그간의 밀린 데이터를 복구해주기 위해 프라이머리 서버는 Oplog를 저장하게 되는데, 이후 세컨더리가 복구되면 자동으로 동기화 해줌

- 만일 프라이머리 서버가 장애 상황이 된다면, 세컨더리 서버를 프라이머리 서버를 만듦


**동작원리**

- 복제 집합(ReplicaSet)은 한 개의 Primary와 두개의 secondary로 구성

- 복제 집합으로 구성된 각각의 노드는 자신을 제외한 다른 노드들이 죽었는지 살았는지에 대해 HeartBeat를 이용하여 주기적으로 검사

- 몽고디비의 HeartBeat는 2초 다누이로 수행되며 HeartBeat를 받은 서버는 자신의 상태코드로 HeartBeat를 요청한 서버에 보내줌

- Primary서버는 HeartBeat는 항상 복제 집합을 구성하고 있는 노드 개수를 과반수만큼을 유지하고 있어야 한다. 만약 Primary서버가 과반수의 HeartBeat를 가지고 있지 않는다면, 해당 서버는 secondary서버로 전환되고 전체 복제 집합은 Primary서버 부재에 따른 투표를 시행

- Primary가 될 수 있는 자격 조건으로는 priority(마스터가 될수 있는 우선순위)와 votes등

![스크린샷 2017-04-06 오후 6.15.49](http://i.imgur.com/gCWGFFI.png)

**MongoDB 복제 시스템 한계**
- 한 복제 집합을 구성할 수 있는 노드의 최대 개수는 12개
- 한 복제 집합에서 투표할 수 있는 노드의 최대 개수는 7개
- 슬레이브가 아무리 빨리 데이터를 동기화 한다고 해도, 마스터와의 통신 지연시간만큼의 차이를 가질 수 있음
- 부하를 견디지 못해서 마스터 서버가 죽었을 경우, Oplog에 동기화 되지않은채 남아있는 데이터 연산을 잃어버리는 현상이 발생할 수 있음
- 저널링 파일에 데이터를 저장하는 방법의 경우에도 Group commits 주기 안에 데이터가 존재하는데도 시스템이 다운되어 메모리에 저장된 데이터가 날라갔을 경우에도 복구가 불가능함

첫번째 Primary서버를 설정
`mongod --replSet downSet - dbpath /data/ -port 10000`

첫번째 secondary서버를 만들면
`mongod --replSet downSet - dbpath /data2/ -port 10001`

두번쨰 secondary서버를 만들면
`mongod --replSet downSet - dbpath /data3/ -port 10002`

이제 레플리카셋을 완성시키기 위해서는

10000 포트로 접속후
`>var config = {_id:'downSet', members:[{_id:0,host:'localhost:10000'},{_id:1,host:'localhost:10001'},{_id:2,host:'localhost:10002'}]};`

`>rs.initiate(config);`

이렇게 하면 동기화를 시작한다!

복제와 비슷하게
![스크린샷 2017-04-06 오후 6.26.23](http://i.imgur.com/02qZH1g.png)

![스크린샷 2017-04-06 오후 6.26.48](http://i.imgur.com/VDzEPCQ.png)

복제와 다른게 있다면 마스터/슬레이브등의 설정을 하지 않음!

![스크린샷 2017-04-06 오후 6.28.12](http://i.imgur.com/CymU4KU.png)

복제와 다르게, 쳐다보는 포트가 없다!
Primary와 같은 레벨에 존재하고 있다!

위의 명령어와 같은 방법을 다시한번 설명하고 있는것.

결과
![스크린샷 2017-04-06 오후 6.31.08](http://i.imgur.com/6aTW9gd.png)



위에서 설명한거처럼 만약 Primary서버가 손상이 되면
다른 secondary서버중 하나가 Primary로 변화게 된다.

![스크린샷 2017-04-06 오후 6.35.58](http://i.imgur.com/JaTiFQX.png)
