Data control Language

학습목표
1. 권한 설정
2. 역할의 개념
3. MySQL원격접속하는 설정방법

접근권한 설정
- 권한 및 역할 설정하는 언어
- 특정 테이블에 대한 CRUD권한 설정


예제
사용자 SampleUser를 새로 하나 추가/삭제하시오.
```
use mysql;
select user, host from user;

CREATE USER 'sampleUser'@'localhost' IDENTIFIFD BY ' 비밀번호';

//사용자 삭제
drop user 사용자명@호스트;

//반영하기
flush privileges;
```

예제
1. sampleUser(localhost/로컬랜/인터넷전체)의 접속을 허용하시오.
2. localhost의 sampleuser에게 World DB의 검색/추가권한을 부여하시오.
3. localhost의 sampleUser에게 world DB의 city테이블의 도시명의 업데이트 권한을 부여하시오.
4. localhost의 sampleUser의 모든 권한을 삭제하시오.

```
1-1 grant all privileges on world.* to sampleUser@localhost identified by '비밀번호';

1-2 grant all privileges on world.* to sampleUser@'192.168.0.%' identified by '비밀번호';

1-3 grant all privileges on world.* to sampleUser@% identified by '비밀번호';

2 grant select, insert world.* to sampleUser@localhost identified by '비밀번호';

3 grant update(Name) on world.city to sampleUser@localhost identified by '비밀번호';

4 revoke all privileges on *.* from sampleU@localhost;

show grants for sampleUser;
```

2. 역할 설정
 - 개별 테이블에 대한 CRUD권한을 사용자별로 설정하면 경우의 수가 **테이블 수 x 사용자 수의 조합** 이 생김
 - 이런 문제점을 개선하기 위해서 롤(역할)을 정하고 **역할 별 권한 설정** 하고 **사용자에게 역할을 부여** 하는 형태로 사용
 - 사용자가 여러 개의 롤을 가지는 것이 가능함(관리자, 사용자등)
 - **MySQL에는 ROLE관련 명령이 지원안됨**

2-1. 역할 생성
 - CREATE ROLE 역할명;

2-2. 역할에 대해 권한 설정
 - GRANT CRUD ON 테이블명 TO 역할명;

2-3. 사용자에게 역할 부여
 - GRANT 역할 TO 사용자명;

 예제
 1. World DB를 다루는 world_admin역할을 생성
 2. world_admin역할에 city 테이블 추가/삭제 권한을 부여
 3. sampleUser에게 world_admin역할을 부여하시오.

 ```
CREATE ROLE world_admin;
GRANT INSERT, DELETE ON city TO world_admin;
GRANT world_admin to sampleUser;
 ```

 3. MySQL 원격접속 설정
 - MySQL을 동일시스템 외에 접근가능하도록 설정
 - 사용자를 원격사용자로 등록
 - my.ini수정(bind-address 부분 주석처리)
  /# Instead of skip-networking the default is now to listen only on
  /# localhost which is more compatibale and not is not less secure.
  **# bind-address = 127.0.0.1**

- MySQL 서버 재시작
- 방화벽 3306포트 열기
