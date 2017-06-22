학습목표
1. 메타데이터에 대해 알수있습니다.
2. 캐릭터셋(CharacterSet, Collation)에 대해 알수 있습니다.
3. 스토리지엔진(InnoDB, MyISAM)에 대해 공부
----

### 1. 메타데이터란?
- 데이터를 위한 데이터
- DB, 테이블의 스키마에 대한 정보를 저장하는 테이블
- DB명 테이블명, 컬럼명, 사용자명, SHOW명령어의 결과값,...

실습방법!
SHOW DATABASES;
SHOW TABLES;
SHOW TABLE STATUS;
SHOW COLUME;
...

##### 데이터사전(Data Dictionary)
: Information_schema

- 데이터베이스의 정보 저장
- 시스템 카탈로그(System Catalog)
- 일반적으로 읽기전용정보(Read_only)

실습방법!
Use INFORMATION_SCHEMA; SHOW TABLES;

- CHARACTER_SETS
- COLLATION
- COLLATION_CHARACTER_SET_APPLICABILITY
- COLUMNS
- COLUMNS_PRIVILEGES
- REFERENTIAL_CONSTRAINTS
- STATISTICS
- TABLES
- TABLES_CONSTRAINTS
...

##### 데이터디렉토리(Data Directory)
- DBMS의 모든 데이터가 저장되는 디렉토리
- DB저장, 상태 및 로그저장
각 OS마다 로그가 저장되는 위치가 다름을 인지할 것!!!

### 2. 캐릭터셋/콜레이션
: CharacterSet/Collation
- 문자인코딩 정보/메타데이터의 일종
- 문자열(VARCHAR, CHAR)의 값을 저장할 때 사용되는 기본정보
- DB/테이블별로 별도 설정 가능
```
ASCII/ISO-8859-1 아스키계열
EUC-KR/KSC_5601 한글 완성형 계열
UTF-8/UNICODE 유니코드계열
UTF8(기본)
```

Collation
- 데이터를 정렬(문자간의 비교)할 때 사용하는 정보
- 정렬 시에 대소문자를 구분/비구분여부 설정(case Senstitive/Insensitive)
- 한글데이터의 경우 무의미
```
utf8-general-ci(기본값/추천)
utf8-unicode-ci
```

이러한 설정을 하기위해서는 데이터를 백업 또는 초기에 설정해야한다!!

### 3. 스토리지 엔진
- 데이터베이스엔진(Database Engine)이라고도 불림
- DBMS가 데이터를 CRUD할 떄 사용하는 기본 컴포넌트
- 대표적으로 MyISAM과 InnoDB등이 있음
- 데이터 접근속도/안정성/트랜잭션의 지원 여부등의 차이가 있음
- 기본값은 InnoDB(MySQL 5.7기준)

예제
1. MySQL 기본 스톨지 엔진 확인
2. 기본 스토리지엔진을 변경하시오.

결과
```
SELECT engine, support FROM Information_schema.engines WHERE support='DEFAULT';

SET default_storage_engine=MyISAM;(리부팅시 리셋)

my.ini 변경

```
