
## DDL

1. 스키마 정의를 이해
2. 테이블의 각 컬럼의 자료형을 지정할 수 있다
3. 테이블의 제약조건을 지정할 수 있습니다.

### 1. DDL이란?
데이터베이스와 테이블을 CRUD.
테이블에 대한 정보는 메타데이터로 데이터사전에 저장관리된다.

생성은 CREATE DATABASE

테이블 생성은 CREATE TABLE xxxx(Name Type, Name2 Type2).... 이런식으로 만든다.

### 2. 자료형?
  - 정수형(부호있음/부호없음)
  - 실수형(길이, 소수점 이하 자리수)
    1. FLOAT(size, d)
    2. DOUBLE(size, d)
    3. DECIMAL(size, d)
  - 문자열
    1. CHAR 고정길이 문자열
    2. VARCHAR 가변길이 문자열
  - TEXT 문자열
  - BLOB(Binary Large Object)
  - 시간관련
    1. DATE
    2. TIME
    3. DATETIME
    4. TIMESTAMP

### 3. 제약 조건(Constraint)
: 입력 데이터의 제약조건을 걸어 해당되지 않는 데이터는 이력되지 않음
1. NOT NULL 데이터가 NULL이 되면안됨
2. UNIQUE 테이블에 동일한 값이 입력되어 있을 경우 받아들이지 않음
3. PRIMARY KEY 기본키 제약조건
4. FOREIGN KEY -> 외래키 제약조건
5. CHECK -> 입력값 체크(MySQL에서 동작 안됨)
6. DEFAULT -> 컬럼값이 입력되지 않으면 기본값을 입력

예제
- 1. BusinessCard 테이블의 이름(Name)이 NULL이면 안됨
- 2. Name이 동일한 값이 허용되지 않도록 지정
- 3. Primary_key 테이블의 이름을 기본키로 지정함
- 4. 외래키 지정하기 Salary 테이블의 BusinessCard_id 를 외부키로 지정
- 5. BusinessCard테이블의 Age값은 0이상이여야 함.
- 6. BusinessCard테이블의 주소값이 지정되지 않으면 'SEOUL'러 입력되도록 하시오.
- 7. 자동증가(BusinessCard의 ID값을 자동증가되도록 지정하시오.)
```
테이블 제약조건 확인하고자 할때는 desc BusinessCard 검색

 1. Create table BusinessCard(Name varChar(255) not null, Address varchar(255), Telephone varchar(255));

 2. Create table BusinessCard(Name varchar(255) UNIQUE, Address
  varChar(255), Telephone varchar(255));

 3. Create table BusinessCard(id int not null,Name varchar(255) UNIQUE, Address varChar(255), Telephone varchar(255), **primary key(id)**);

 4. Create table BusinessCard(id int not null,Name varchar(255) UNIQUE, Address varChar(255), Telephone varchar(255), **primary key(id)**);

 Create table Salary(id int not null,salary_amount int, business_card_id int not null, **primary key(id)**, foreign key(Business_card_id) references BusinessCard(id));

 5.

 6. Create table BusinessCard(Name varChar(255) not null, Address varchar(255) default 'SEOUL', Telephone varchar(255));

 7. Create table BusinessCard(ID int auto_increment, Name varChar(255) not null, Address varchar(255), Telephone varchar(255) primary_key(id));
```
----
 학습목표
 1. 중복정보의 제거에 대해 알 수 있습니다.
 2. 정규형에 대해 알 수 있습니다.
 3. 참조무결성에 대해 알 수 있습니다.
----

1. 중복정보 제거
  - 테이블 간의 정보는 중복되지 않아야 함
      - 동일한 정보가 여러 군대 테이블에 저장되어 있으면 수정에 대한 부담과 무결성유지가 쉽지 않다.
      - 하나의 정보는 한 군데만 나오도록 한다.
  - 이를 위해 정규화를 통해 중복성 제거
      - 제1정규형, 제2정규형, 제3정규형
  - 중복성 제거 후 필요한 정보는 외래키를 통한 조인(JOIN)을 통해 필요한 정보를 구한다.

  :RDB에서 가장 핵심적인 내용임을 인지하지.

예제
- City테이블의 국가코드외에 국가명을 추가할 경우 생길 문제에 대해 말하시오.
```
alter table city add column CountryCode varchar(255)
```
국가명을 'South Korea'에서 'Republic of Korea'로 변경하려면
**Country 테이블의 Name값과 city테이블의 CountryName 값에서 'South Korea'를 모두 변경해줘야 함**


2. 정규형
  - 중복을 제거하기 위해 테이블 정의 규칙
      1. 제 1 정규형
      : 나눌 수 있을 만큼 쪼개라
      2. 제 2 정규형
      : 테이블의 컬럼들이 기본키와 직접 연관되는 컬럼만으로 구성하라.
      3. 제 3 정규형
      : 컬럼들 간의 종속관계가 있으면 안 됨.


좀더 자세하게 살펴보면,

제 1 정규형 나눌만큼 쪼개라라는 말은?

1대 다 , 다대다와 같이 관계를 생각하여 쪼개라~!

제 2 정규형 테이블의 컬럼들이 기본키와 직접 연관되는 컬러만으로 구성하라.

제 3 정규형 컬럼들 간의 종속관계가 있으면 안 됨.

3. 참조 무결성(Referential Integrity)
 - 외래키(FK)에 적용되는 규칙
 - 외래키와 참조되는 원래 테이블의 키와 관계를 명시
 - 외래키를 참조하면 원래 테이블에 해당 레코드값이 반드시 존재해야 한다.
 - 만약 원래 레코드를 삭제하려면 참조하는 외래키(FK)값을 먼저 NULL로 만드렁야 함
 - 외래키 참조관계가 있을 경우에 레코드 추가/삭제시 선후관계를 나타냄

 예제
 - city테이블과 Country테이블(Code)과의 관계를 이용해 새로운 국가코드'ZZZ' Country에 추가하고 도시 'YYY'를 city에 추가/삭제하라.

 ```
 insert into Country(Code, name) Values ('ZZZ', 'ZZZ');
 insert into city(Name, CountryCode) Values ('YYY', 'ZZZ');

 delete from city where Name = 'YYY' and CountryCode='ZZZ';
 delete from Country where Code = 'ZZZ' and Name='ZZZ';
 순서를 바꾸면 에러발생함!!!!!
 ```

---
학습목표
1. ALTER/DROP
2. 테이블 삭제 명령어에 대해 공부
---

1. 스키마 수정
ALTER명령어는 이미 생성된 스키마에 대해 수정할 경우 사용한다.
  - ALTER TABLE 테이블명 ADD 컬럼명 데이터타입
  - ALTER TABLE 테이블명 DROP COLUMN 컬럼명
  - ALTER TABLE 테이블명 CHANGE new_컬럼명 데이터타입(컬럼명변경)
  - ALTER TABLE 테이블명 MODIFY 컬럼명 데이터타입(컬럼타입변경)

기본키 제약조건 추가/기본키 제약조건 삭제
  - ALTER TABLE 테이블명 ADD PRIMARY KEY(컬럼명)
  - ALTER TABLE 테이블명 DROP PRIMARY KEY(컬럼명)

UNIQUE 제약조건 추가/삭제
  - ALTER TABLE 테이블명 ADD UNIQUE(컬럼명)
  - ALTER TABLE 테이블명 ADD CONSTRAINT 제약명 UNIQUE(컬럼명1, 컬럼명2)
  - ALTER TABLE 테이블명 DROP UNIQUE 제약명

외래키 제약조건 추가/삭제
  - ALTER TABLE 테이블명 ADD FOREIGN KEY(컬럼명) REFERENCES 원테이블명(원컬럼명)
  - ALTER TABLE 테이블명 DROP FOREIGN KEY 컬럼명

테이블명
  - ALTER TABLE 테이블명 RENAME new_테이블명

CHECK 제약조건 추가/삭졔(MySQL은 동작안함)
  - ALTER TABLE 테이블명 ADD CHECK 조건
  - ALTER TABLE 테이블명 ADD CONSTRAINT 조건명 CHECK(조건절)
  - ALTER TABLE 테이블명 DROP CHECK 조건명

DEFAULT 제약조건 추가/삭제
  - ALTER TABLE 테이블명 ALTER 컬럼명 SET DEFAULT 기본값
  - ALTER TABLE 테이블명 ALTER 컬럼명 DROP DEFAULT

2. 스키마 삭제
데이터베이스 삭제 => DROP DATABASE 데이터베이스명

테이블삭제
1. DROP TABLE 테이블명
  - 테이블 삭제, 내용과 테이블 전체 삭제
2. DELETE * FROM 테이블명
  - 레코드를 일일이 하나씩 지움, 테이블 스키마는 유지
3. TRUNCATE TABLE 테이블명
  - 테이블 내용만 지움, 테이블 스키마는 유지, 전용명령어
