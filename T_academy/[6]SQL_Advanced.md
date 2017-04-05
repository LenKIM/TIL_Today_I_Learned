학습목표
1. 트랜잭션 개념
2. 락(Lock)
3. 트랜잭션의 격리수준(Isolation)
----

## 1. 트랜잭션
 - 복수의 SQL문을 수행하는 도중(예: 은행 간의 이체)에 장애가 발생했을 때 장애에 대응할 수 있도록 하는 기능
    - 전체 수행(Commit)과 전체 취소(Rollback) 두가지의 결과값만 가져아함
    - 기본적으로 SQL의 수행모드는 AutoCommit모드(줄단위 커밋모드)
    - 트랜잭션을 지원하기 위해서는 AutoCommit모드를 오프시켜야 함
    - InnoDB 스토리지엔지만 가능함.

예제
 - 트랜잭션 기본 설정 확인
 - AutoCommit 설정 끄기(줄단위 커밋모드 취소)
 - 트랜잭션 커밋/롤백하기

 결과
```
select @@autocommit;(1 = true/ 0= false)
set autocommit = false;(중요)
create database sampleDB;
create table BusinessCard(Name Varchar(255), Address Varchar(255), Telephone Varchar(255));
insert into BusinessCard Value('Bob', 'Seocho-dong 123', '123-4567');
commit or rollback;
```

#### ACID특성
 - 원자성(Atomicity)
  All-or-nothing, Commit/Rollback
 - 일관성(Consistency)
 트랜잭션 전후에 데이터가 손상을 받으면 안됨
 같은 데이터가 다른 값을 가지면 안됨
 - 고립성/격리수준(Isolation)
 여러 개의 트랜잭션이 수행될 때 성능과 데이터 안정성간의 Trade-off
 - 지속성(Durability)
 트랜잭션이 종료된 이후에도 데이터에 문제가 없어여 됨(장기간)

## 2. 락(Lock)
- 공유자원(리소스)에 대해 여러 개의 트랜잭션이 접근하려고 경쟁하려고 할 때 제어하는 방법
    - 동시성제어(Concurrency Control)라고 하고 보통 Lock으로 해결
    - 프로그래밍에서는 동기화(Synchronization)이라고 함
- 일관성(Consistency)과 무결성(Integrity)을 지키기위해서 적용

**Lock Granularity**
- 테이블단위 락(Table Lock)
:동일한 테이블을 다른 트랜잭션이 사용하고 있다고 접근 금지
MyISAM
- 줄단위 락(Row Lock)
:동일한 줄(Row)만 접근 금지(테이블 락에 비해 높은 성능)
InnoDB

![스크린샷 2017-04-05 오후 4.07.47](http://i.imgur.com/FGO0rhe.png)

## 3. 격리(Isolation)
**트랜잭션의 격리수준(Isolation level)**
성능과 데이터의 일관성을 사이에 결정하는 방식!
**트랜잭션에 일관성없는 데이터를 허용하는 레벨**
- Read Uncommitted
    - 트랜잭션이 처리되는 도중에 다른 트랜잭션이 해당 데이터를 읽기를 허용(Uncommitted data)
    - 성능은 높지만 데이터의 안정성이 떨어짐
- Read Committed
    - 트랜잭션이 끝난 이후에만 접근하도록 허용(Committed data)
- Repeatable Read
    - 다른 트랜잭션이 업데이트하는 것을 금지하지만 레코드 추가하는 것은 허용하는 방식
- Serializable
    - 트랜잭션이 동시에 수행되는 것이 금지되고 순차적으로 수행됨

![스크린샷 2017-04-05 오후 4.17.13](http://i.imgur.com/Wpu74vN.png)
