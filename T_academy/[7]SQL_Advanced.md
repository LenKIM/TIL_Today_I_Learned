학습목표
1. 저장 프로시저(Stored Procedure)
2. 트리거(Trigger)
---

## 1. Stored Procedure
: SQL을 함수형태로 저장하고 사용하는 방법
미리 만들어놓고 하기 때문에 좀더 빠른 사용자 경험을 할 수 있다.

**저장 프로시저 정의**
```
CREATE PROCEDURE 프로시저명(인자 인자형,...)
BEGIN
 SQL 문장들
END
```

**저장 프로시저 호출**
```
CALL 프로시저명;
```

**저장 프로시저 삭제**
```
DROP PROCEDURE 프로시저명;
```

서브루틴 = 프로시저
리턴값이 없으면 프로시저 있으면 함수라 정의함.

**저장함수(Stored Function)**
: SQL을 함수형태로 저장하고 사용하는 방법

**저장 함수 정의**
```
CREATE FUNCTION 함수명(인자 인자형,...) RETURNS 타입
BEGIN
 SQL 문장들
END
```

**함수 호출**
```
함수명(인자);
```

**함수 삭제**
```
DROP FUNCTION 프로시저명;;
```

![스크린샷 2017-04-05 오후 4.30.22](http://i.imgur.com/Uegoh3e.png)
DELIMITER란? 구분 문자를 뜻한다.

## 트리거(Trigger)
- 특별한 조건이 되면 자동으로 호출(콜백:Callback)되는 저장 프로시저
- 예)레코드를 삭제되면 자동으로 참조무결성을 체크하는 트리거

**트리거 정의**
```
CREATE TRIGGER 트리거명 BEFORE(또는 AFTER) CRUD ON 테이블명 FOR EACH ROW
BEGIN
 (변경 전(OLD.칼럼명) 또는 변경 후(NEW.칼럼명)을 이용한 처리)
END
```

**저장 프로시저 삭제**
DROP RPOCEDURE 트리거명

![스크린샷 2017-04-05 오후 4.37.29](http://i.imgur.com/Hpg3EDc.png)
 
