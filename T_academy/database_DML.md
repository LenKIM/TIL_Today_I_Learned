

# 데이터베이스 기초

SQL(DML)

1. SQL의 개념과 종류
2. CRUD개념
3. 실습을 통해 CRUD에 대한 SQL문 사용 방법 습득

SQL => Structured Query Language

- 데이터베이스에 있는 필요한 정보를 사용할 수 있도록 도와주는 언어
- 사용방법이나 문법이 다른 언어보다 단순함
- 하나를 배워두면 모든 DBMS에서 사용가능함
- 인터프리터
- 대소문자 구별하지 않음(데이터 내용은 구별함)

DML(Data Manipulation Language)

DDL(Data Definition Language)

DCL(Data Control Language)

CRUD(Create, Retrieve, Updata, Delete)


쿼리 결과 중복제거는? => DISTINCT

1. DISTINCT 연산자
 - SELECT문의 결과값에서 특정 컬럼만 출력할 경우 중복된 값들이 나오는 경우에 이를 제거해서 표시하는 기능
 - select DISTINCT 컬럼명1, 컬럼명2, ... from 테이블명

DISTINCT를 사용해서 중복된 데이터를 제거할 수 있다!

2. 논리 연산자.
(AND, OR, NOT)


3. 논리 연산자
(IN, BETWEEN)

국가코드가 'KOR', 'CHN', 'JPN'인 도시를 찾으시오
SELECT * FROM WHERE CountryCode in ('KOR','CHN','JPN')

'OR'를 3가지 사용해서 표현하는 거보다 더 간편하게 표현 할 수 있다.

BETWEEN은 범위를 설정해서 쉽게 이용가능

4. 결과정렬(ORDER BY)
SELECT문의 결과값을 특정한 컬럼을 기준으로 오름차순/내림차순으로 정렬해서 표시  
SELECT * FROM 테이블명 WHERE 조건절 ORDER BY 컬럼명 ASC/DESC  
기본값은 오름차순 정렬임/ 여러 개의 컬럼을 나열하면 순서대로 정렬  

5. 결과 값 일부만 조회(LIMIT/TOP/ROWNUM)
 LIMIT(ROWNUM,TOP)
 - SQL쿼리 결과 중 상위 몃 개만 보여주는 쿼리
 - select 컬럼명1, 컬럼명2,...from테이블명 where 조건절 limit 숫자
 - 대표적인 비표준 기능

 : 입력한 숫자만큼만 보여주는 함수

6. 집합함수(aggregate function)의 개념
 - 테이블의 전체 레코드를 대상으로 특정 컬럼을 적용해서 한 개의 값을 리턴하는 함수
 - count(), avg(), sum(), min(), max(), first(),last()

 사용법은?
 select count(*) from city where CountryCode="KOR"
 select sum(Population) from city where CountryCode="KOR"
 select avg(Population) from city where CountryCode="KOR"
 select min(Population) from city where CountryCode="KOR"
 select max(Population) from city where CountryCode="KOR"

7. 유용한 함수

LENGTH(column)
MID(str, start, end)
UPPER()/LOWER()
ROUND(column, num)

8. Join의 개념

- 서로 다른 테이블을 공통 컬럼을 기준으로 합치는 테이블 단위 연산
- 조인의 결과 테이블은 이전 테이블의 컬럼 수의 합과 같다.
- select * from 테이블1 join 테이블2 on 테이블1.컬럼명 = 테이블2.컬럼명---
- 조인시 서로 다른 테이블에 같은 컬럼명이 존재하면 구분을 위해 테이블명 컬럼명으로 사용해서 표시.

예제
  city테이블과 country 테이블을 조인하자.
  city.CountryCode = country.code

select * from city join country on city.CountryCode = country.Code;

select city.CountryCode, country.GNP from city join country on city.CountryCode


**조인**의 종류는?

조인시 NULL값이 허용하는 내부조인과 외부조인으로 구분
INNER JOIN / LEFT JOIN / RIGHT JOIN / FULL JOIN

INNER JOIN - 조인시 NULL값을 허용하지 않음
LEFT JOIN - 조인시 JOIN의 왼쪽 테이블의 NULL값을 표함해서 표기
RIGHT JOIN - 조인시 JOIN의 오른쪽 테이블의 NULL값을 표함해서 표기
FULL JOIN - Mysql은 지원안함.

9. 별명(ALIAS)
- SQL쿼리 결과 생성시 컬럼명에 대한 별명을 사용해 표시하는 기능
- SELECT 테이블명1.컬럼명1 AS 별명1, 테이블명2.컬럼명2 AS 별명2 FROM ...
- 조인할 때 많이 사용됨.

10. 뷰(View)
- SQL쿼리의 결과값을 임시테이블로 저장해서 사용할 수 있음.
- 사용용도가 끝나면 명시적으로 삭제해야함 (DROP VIEW 뷰명...)
- CREATE VIEW 뷰명 AS SELECT...

11. SELECT INTO
- 쿼리결과를 새 테이블로 만든다.
- MySQL에서는 CREATE TABLE 테이블명 SELECT * FROM 테이블명
- 기존에 존재하지 않는 테이블이 새로 생성된다.
(일종의 뷰와 동일한 효과)

예제 city테이블의 내용에서 국가코드가 'KOR'인 도시를 찾아 city_new 테이블에 넣으세요.

create table city_new select * from city where CountryCode="KOR";

12. INSERT INTO SELECT
- 쿼리 결과를 기존의 테이블에 추가한다(기존 테이블이 존재해야함)
- INSERT INTO 테이블명1 SELECT * FROM 테이블명2 WHERE 조건절 ~~~
- SELECT하는 테이블과 INSERT하는 테이블이 동일해야 한다.

예제 city테이블의 내용에서 국가코드가 'KOR'인 도시를 찾아 city_kor테이블에 넣으시오.

INSERT INTO city_kor select * FROM city WHERE CountryCode='KOR';

13. CASE ~ WHEN ~ END

- SQL의 조건문(if/switch문)에 해당
- 조건값에 따른 처리를 구분할 수 있다.

 CASE WHEN 조건값1 THEN ~  
      WHEN 조건값2 THEN ~  

 예제  
 city 테이블에서 도시명이 3자가 넘어가는 경우에 앞쪽 세 자만 대문자로 출력하고, 도시의 인구를 같이 표시하시오.

 select case WHEN length(Name) > 3 then upper(mid(Name, 1,3))  
 WHEN length(Name) <=3 then Name  
 END Population from city  
