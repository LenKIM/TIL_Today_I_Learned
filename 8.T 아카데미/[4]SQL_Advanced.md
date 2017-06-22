
## 1. DB 파티셔닝/샤딩

왜 하는가?
VLDB란? 하나의 DB가 하나의 DBMS시스템에 다 들어가기 힘들어지는 경우
 - 테이블 들을 여러 개의 군으로 나뉘 분산 저장
 - 하나의 테이블이 방대한 경우에는 사전방식와 같이 나눠 저장

### 파티셔닝(Partitioning)
- DBMS 레벨 분할

**샤딩(Sharding)**
- DBMS외부에서 분할 / 응용레벨에서 구별해야 함

----

**파티셔닝의 제약사항(Constraints)**
- 테이블단위 연산이 힘들어짐(비용문제)
    - 조인연산 어려움 -> 정규화(Normalization)문제
    - 역정규화(Denormalization) -> 중복허용으로 해결

- 외래키(FK)의 효용 문제
    - 레코드 추가시 참조무결성 조건 체크 -> 시스템 부담증가로 수동전환
    - CRUD시 위치(LOCATION)를 인색해야 함(파티셔닝/샤딩이 다름)

**데이터베이스 파티셔닝의 이점!**
  - 데이터 전체 검색시 필요한 부분만 탐색해 성능 증가
  - 전체 데이터를 손실할 가능성이 줄어듬 -> 가용성(Availability)향상
  - 파티션별 백업/복구 가능
  - 파티션 단위로 I/O 분산가능 -> **업데이트 성능 증가**
  **특히 쓰기할때 좋음!**

**파티셔닝의 방식**
- 범위(range) a-m/n-r/s-z
- 해쉬(hash) 해시함수 파티션별로 크기를 비슷하게 나눔
- 리스트(list) 특정한 컬럼을 기준
- 컴포지트(composite) - range-hash /range-list

**MySQL파티셔닝**
- 최대 1024개
- 모든 파티션은 동일한 스토리지 엔진

![스크린샷 2017-04-05 오후 2.29.36](http://i.imgur.com/RRja35l.png)

예제)

파티션 추가/삭제  

ALTER TABLE BusinessCard ADD PARTITION(  
  PARTITION p4 VALUES LESS THAN (2005));  

ALTER TABLE BusinessCard DROP PARTITION p4;  

파티션 분할/병합

ALTER TABLE BusinessCard
  REORGANIZE PARTITION p3 INTO(
    PARTITION p3 VALUES LESS THAN (2015),
    PARTITION p4 VALUES LESS THAN MAXVALUE);)

ALTER TABLE BusinessCard
  REORGANIZE PARTITION p2,p3 INTO(
    PARTITION p23 VALUES LESS THAN (2014),
    )

----

## 2. 데이터베이스 복제
- DBMS의 내용을 복제해 동일한 DB내용을 유지
- 두 개 이상의 DBMS시스템을 마스터/슬레이브로 나눠 마스터 DBMS ->슬레이브 DBMS로 SQL쿼리 복제(SELECT제외)
    - 데이터 업데이트(CUD)는 마스터에게
    - 읽기(R)는 슬레이브에게
- **읽기 성능 향상**
- 웹서버 시스템 성능확장에 적합

: 이렇게하면 뭐가 좋은가?
읽을때는 슬레이브에서만 읽기 때문에 Read성능이 향상됨
이러한 웹서버시스템에서 구축하는건 대부분 이렇게 구성되어 있습니다.

#### 로그 기반 복제
 - Statement Based : SQL문제복제, SQL에 따라 결과가 달라지는 경우

 - Row Based : SQL에 따라 변경된 라인만 기록하는 방식
 데이터가 많이 변경된 경우 데이터 커짐

 - Mixed 두 방식 복합

#### 실제 데이터베이스를 복제하려면
- 두 개의 MYsQL서버 필요
- 물리적으로 두 개의 서버 vs  가상화 시스템
- 주로 리눅스 서버에 사용
- 설정이 복잡하기 때문에 별도의 자료 참조
  - http://dev.mysql.com/doc/refmain/최신버전/kr/replication.html
