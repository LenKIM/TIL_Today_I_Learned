학습목표
1. Full Text Search
2. Bulk insert
----

## 1. FUll Text Search(전문 검색)

- 기존 SQL의 LIKE검색은 여러 개의 검색필터를 동시에 매칭시키는 방식
여러개의 OR을 사용하여 부담됨
- 여래 개의 조건문을 AND/OR 시킬 경우 심각한 성능 저하
- 하지만 네이버/다음과 같은 포탈검색
    - T아카데미란 단어를 검색하면 통합검색은 카페, 블로그, 이미지, 지도, 뉴스, 쇼핑을 검색
    - cafe like 'T아카데미' or blog like 'T아카데미 ----
- 결과는 동일하지만 DB서버에 부담을 주지 않는 방식
: **Full Text Search!**
```
- 기본적으로 컬럼 내용 전체를 단순 문자열로 생각하고 검색하는 방식
- 문자편집기의 편집 찾기/바꾸기 메뉴의 동작방식과 유사
```

**MySQL의 Full Text Search 방식**
- 자연어 검색
- 불린 검색
- 퀴리 확장 검색

**Full Text Search 인덱스 생성**
- ALTER TABLE 테이블명 ADD FULLTEXT(컬럼명);

![스크린샷 2017-04-05 오후 2.58.08](http://i.imgur.com/C7bdn9T.png)
---
![스크린샷 2017-04-05 오후 3.05.11](http://i.imgur.com/lT7QycQ.png)

**사용구문!**
 자연어 검색
 - 검색의 정확도 확인 as score
 - 결과는 검색의 정확도에 대한 내림차순 정렬
 이 말 뜻은, 가장 높은 매칭률을 순서대로 보여준다!!
 ```
 where match(컬럼명) against('검색어/검색문장')
 ```
 불린 검색
 - 검색의 정확도에 따른 정렬이 안되고 연산자 사용한 구문 검색 가능
 - 필수단어(+), 예외단어(-), 부분단어(*)
```
where match(컬럼명)
  against("단어*" -제외단어 in boolean mode);
```

## 2. Bulk Insert

- INSERT의 경우 레코드를 추가한 후 내부적으로 인덱스 자구성 작업(정렬 등)이 필요
- 여러 개의 레코드를 넣어야 하는 경우 하나의 레코드 입력할 때 마다 이 작업이 연속적으로 발생
- 이 문제점을 해결해줌

- 인덱스 작업 정지
: ALTER TABLE '테이블명' DISABLE KEYS

- 인덱스 작업 재설정
: ALTER TABLE '테이블명' ENABLE KEYS

넣는 방법
1. INSERT INTO 테이블명 VALUES(...) VALUES(...);

2. 파일로 덤프
  - SQL을 사용한 방식  
    기존의 SOURCE 명령어와 유사(백업/복원 참조)  
  - CSV(Comma Separated Value)파일을 사용한 방식  
    LOAD DATA INFILE 'C:₩₩PATH₩FILE_NAME'  
    INTO TABLE 테이블명  
    FIELDS TERMINATED BY '₩t' ENCLOSED BY '"' ESCAPED BY '₩₩'  
    LINES STARTING BY '' TERMINATED BY '₩n'  

    ![스크린샷 2017-04-05 오후 3.30.11](http://i.imgur.com/3DXK9Df.png)
