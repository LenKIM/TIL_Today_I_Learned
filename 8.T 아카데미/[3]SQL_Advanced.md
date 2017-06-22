
### 학습목표
1. 데이터베이스 백업
2. 데이터베이스 복원
3. 데이터베이스 로그
---

1. 데이터베이스 백업

특정 DB, 테이블에서 특정 파일에 저장하는 것을 말합니다.

MySQL에서는 전용 명령어가 있다.

**전체 데이터베이스 백업**
mysqldump -u아이디 -p --all-databases > 덤프파일명.sql

**특정 데이터베이스 백업**
mysqldump -u아이디 -p -databases DB명 > 덤프파일명.sql

**전체 테이블 백업(데이터포함)**
mysqldump -u아이디 -p DB명 테이블명 > 덤프파일명.sql

**스키마만 백업**
mysqldump -u아이디 -p --no-data > 덤프파일명.sql

**데이터만 백업**
mysqldump -u아이디 -p --no-create-info > 덤프파일명.sql

  **1-1. 워크벤치에서 데이터베이스 백업하기.**

![스크린샷 2017-04-05 오후 1.36.21](http://i.imgur.com/6jMNGV8.png)

2. 데이터베이스 복원
 콘솔상에서는
 - mysql -u아이디 -p DB명 < 파일명(지정해야함) = DB만
 - mysql -u아이디 -p < 파일명 = ALL
 - mysql -u아이디 -p DB명 테이블명< 파일명 = TABLE

 프롬프트(prompt)
 - SQL > source 파일명.

 **2-1. 워크벤치에서 데이터베이스 복원하기.**

 ![스크린샷 2017-04-05 오후 1.47.49](http://i.imgur.com/ctNBCtK.png)

 ![스크린샷 2017-04-05 오후 1.49.15](http://i.imgur.com/FeVh13l.png)


3. 데이터베이스 로그
- 데이터베이스 운영 상황을 별도의 파일에 저장
    - 에러로그(Error Log) => MySQL구동과 모니터링, Query에러에 관련된 메시지를 포함
    - 일반로그(General Log) => 전체 쿼리에 대해서 General log를 활성화 시켜서 저장 기능
    - 슬로우 쿼리 로그(Slow Query log) => long_query_time에 설정된 시간 이상을 소요한 쿼리를 기록
    - 이진 로그(Binary Log)/릴레이 로그(Relay Log) => MySQL쿼리를 수행하면서 쌓는 로그, 시점 복구등을 수행하는 역할/ Replication에서 사용 / 바이너리 로그(마스터)/릴레이 로그(슬레이브)에서 사용, 내용동일

    
