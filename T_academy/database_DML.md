

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

 14. LIKE 검색
 - 정확한 키워드를 모를 경우 일부만으로 검색하는 방법
 - 와일드카드(%, _ )를 사용하여 패턴매팅
  `select 컬럼명 from 테이블명 where 컬럼명 like 패턴`
 - 와일드카드(Wildcard)
  `%: 0-n글자, _: 1글자`
 - LIKE의 검색은 매칭하기 위해 DBMS에 부담이 많으므로 LIKE에 OR와 같은 논리 조건자를 중복해서 사용하지 않은 게 좋음
 (바람직 하지 않은 예)
 select * from 테이블명 where like 컬럼명1 like ... or 컬럼명2 like ...;

 예제
 - city 테이블에서 국가코드가 K로 시작하는/끝나는/중간에 들어있는 국가코드를 표시
 - city 테이블에서 국가코드가 K로 시작하는 3글자 국가코드를 표시하시오.
 : SELECT CountryCode FROM city WHERE CountryCode LIKE 'K%'
 : SELECT CountryCode FROM city WHERE CountryCode LIKE '%K'
 : SELECT CountryCode FROM city WHERE CountryCode LIKE '%K%'
 : SELECT CountryCode FROM city WHERE CountryCode LIKE 'K__'

 15. NULL값
 - NULL이란? 해당 컬럼의 값이 없다는 의미(해당 컬럼이 NULL값을 허용하는 경우)
 - NULL값을 가지고 있는 컬럼을 검색하려면 is NULL
 - 반대는 is not NULL

 예제
 - country테이블에서 기대수명(LifeExpectancy)이 없는 국가개수를 표시
 - country테이블에서 기대수명이 있는 국가개수을 표시

 : SELECT count(*) from country where LifeExpectancy is NULL;
 : SELECT count(*) from country where LifeExpectancy is not NULL;

 갯수를 세는 것이기에 count(*) !!

 16. NULL함수
 - 숫자컬럼을 연산해야 할 때 NULL을 처리해주는 함수
 - NULL값이 나오면 다른 값(주로 0)으로 대체해서 계산에 문제없도록 처리
 - IFFULL/COALESCE(MySQL), ISNULL(SQL Server), NVL(오라글)

 예제
 - country테이블의 기대수명의 평균값을 표시
 - country테이블의 기대수명값이 들어있는 개수를 표시하시오.(NULL값 미반영/반영)
 ```
 : SELECT avg(LifeExpectancy) FROM country;
 : SELECT avg(IFNULL(LifeExpectancy,0)) FROM country;
 : SELECT count(LifeExpectancy) FROM country;
 ```
 17. 집합함수(GROUP BY/HAVING)를 활용할 수 있습니다.
 - 집합함수와 같이 사용해 그룹별 연산을 적용한다.
 `SELECT 컬럼명, 집합함수명(컬럼명) from 테이블명 group by 컬럼명;`

 예제
 - city테이블의 국가코드별 도시숫자를 구하시오
```
 : SELECT CountryCode, count(CountryCode) FROM city group by CountryCode;
```

- Having은 집합연산에 WHERE 조건절 대체로 사용

예제
- city테이블의 국가코드별 도시숫자를 구하시오(단, 70개이상의 도시를 가지는 국가만)

```
SELECT CountryCode, count(CountryCode) from city group by CountryCode having count(CountryCode) >= 70;
```

18. 마지막 DML
18-1 서브쿼리(SubQuery)
- 쿼리문 내에 또다른 쿼리문이 있는 형태
- 서브쿼리는 메인쿼리에 포함되는 관계
  - ()를 사용해 감싸는 형태
  - ORDER BY를 사용하지 못한다.

사용 가능한 위치  
- SELECT/FROM/WHERE/HAVING/ORDER BY/VALUES(INSERT)/SET(UPDATA)

종류
- 단일행(Single Row)서브쿼리
  - 결과가 레코드 하나인 서브쿼리
  - 일반 연산자(=, >,M, ...)사용
- 다중행(Multi Row)서브쿼리
  - 결과가 레코드 여러 개의 서브쿼리
  - IN/ ALL/ ANY /EXIST
**ALL** : 여러 개의 레코드의 AND효과(가장 큰 값보다 큰) Population > ALL(select Population)
**ANY** : 여러 개의 레코드의 OR효과(가장 작은 값보다 큰) Population > ANY(select Population)
**IN/EXISTS** : 결과값 중에 있는 것 중에서의 의미 IN은 전체 레코드를 스캔하고, EXISTS는 존재여부만 확인하고 스캔하지 않음(상대적으로 속도빠름) / 존재하는 TRUE , 존재하지 않으면 FALSE


예제
- 국가명이 'South Korea'의 국가코드를 찾아 이에 해당하는 도시의 수를 표시하오.
- City 테이블에서 국가코드가 'KOR'인 도시의 평균 인구 수보다 많은 도시들의 이름을 표시하시오.
```
결과
1. select count(*) from city where CountryCode = (SELECT Code FROM WHERE Name='South Korea');

2. SELECT Name, Population FROM city WHERE Population > (SELECT avg(Population) FROM city WHERE CountryCode='KOR') order by Population desc;

```
- 다중컬럼(Multi column)서브쿼리
  - 결과가 여러개인 컬럼으로 구성된

예제
- 국가명이 'South Korea', 'China', 'Japen'의 국가코드를 찾아 이에 해당되는 도시의 수를 각각 표시하시오.
- 인구가 5,000,000명이 넘어가는 도시의 도시이름, 국가코드, 인구 수를 표시(IN)

```
결과 확인
SELECT CountryCode, count(*) FROM city WHERE CountryCode IN (SELECT Code FROM country WHERE Name in ('South Korea', 'China', 'Japan')) GROUP BY CountryCode;

SELECT Name, CountryCode, Population FROM city WHERE (Name, CountryCode) in (SELECT Name, CountryCode FROM city WHERE Population > 5000000);
```

예제
- 한국의 모든(ALL)도시의 인구 수보다 많은 도시를 찾아 표시하시오.
- 한국에서 어떤(ANY)도시의 인구 수보다 많은 도시를 찾아 표시하시오.

```
결과확인
SELECT Name, CountryCode, Population FROM City WHERE Population > ALL(SELECT Population FROM city WHERE CountryCode = 'KOR');

한국에서 가장 큰 인구를 가진 도시를 기준으로 검색한다.

SELECT Name, CountryCode, Population FROM city WHERE Population > ANY(SELECT Population FROM city WHERE CountryCode = 'KOR');
```

예제
- 국가코드가 'KOR', 'CHN', 'JPN'인 도시명과 국가코드, 인구 수를 출력하시오.(EXISTS)

```
결과확인
SELECT Name, CountryCode, Population FROM city WHERE EXISTS (SELECT * FROM CountryCode CountryCode IN ('KOR','CHN','JPN'));
```

18-2 집합연산(UNION, INTERSECT, MINUS)에 대해 배울 수 있다.

- 각종 집합연산 지원
- 합집합(UNION), 교집합(INTERSECT), 차집합(MINUS),...
- MySQL은 INTERSECT/MINUS는 지웒지 않음

- UNION - 두 쿼리의 결과값을 합쳐서 리턴함
  - SELECT 쿼리1 UNION SELECT 쿼리2 UNION ...
  - 두 쿼리를 결과 형식이 동일해야 함 **(기본적으로 DISTINCT적용)**
  - 다르 테이블이라도 결과값의 형식만 일치하면됨
- UNION ALL - 중복을 허용하는 UNION
  - SELECT 쿼리1 UNION ALL SELECT 쿼리2 UNION


예제(UNION을 사용)
- city 테이블에서 국가코드가 'KOR', 국가코드가 'CHN'인 도시를 구하시오.
- UNION/UNION ALL을 사용해 차이를 확인하시오. (국가코드명을 사용)

```
결과
SELECT * FROM city WHERE CountryCode= 'KOR' UNION SELECT * FROM city WHERE CountryCode='CHN';

SELECT CountryCode FROM city WHERE CountryCode='KOR'
```

 - INTERSECT : 두 쿼리의 결과값 중 공통값을 찾아서 리턴함
    - SELECT 쿼리1 INTERSECT SELECT 쿼리2
    - 두 쿼리의 결과 형식이 동일해야 함(기본적으로 DISTINCT 적용)
    - 다른 테이블이라도 결과갑의 형식만 일치하면 됨

- MINUS/EXCEPT : 쿼리1 결과값에서 쿼리2 결과값을 빼서 리턴함
    - SELECT 쿼리1 MINUS SELECT 쿼리2

그러나 MySQL에서는 위 두개의 메소드를 지원 안함/ 다른 쿼리로 대체해서 사용해야 함
