# Chapter 22 MySQL 데이터베이스
 프로그램 종료와 함께 사라지는 데이터를 휘발성데이터(volatile date)
 프로그램 종료해도 사라지지않는 데이터를 비휘발성데이터(non- volatile date)

## 22.1 설치
  (생략)
## 22.2 기본 명령어
  MySQL 데이터베이스에서 가장 기본적인 개념과
    MySQL 데이터베이스 코드라고 부를 수 있는 퀴리 문장을 알아보쟈

예 | 용어
----|----
도서관 | 데이터베이스
책 | 테이블
정보 | 데이터

**22.2.1 데이터베이스 생성**
데이터베이스 생성할 때는 "CREATE DATABASE 이름" 퀴리 문장을 사용
**생성할 때는**
>mysql> CREATE DATABASE company;

 **생성한 데이터를 사용할 때는**
 >USE Company

 **22.2.2 테이블 생성**
새로에 위치한 열(Columm)을 필드 / 가로에 위치하는 행을 레코드라고 부름

 ***자료형***
 자료형|설명
 ---|---
 VARCHAR | 문자열
 INT | 정수 숫자
 DOUBLE | 실수 숫자

 테이블생성.

     mysql> CREATE TABLE products (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      modelnumber VARCHAR(15) NOT NULL,
      series VARCHAR(30) NOT NULL
     );

테이블 생성뒤, "DESCRIBE 테이블명"형태의 퀴리 문장으로 테이블 필드와 관련된 정보를 살펴 볼 수 있다.

 **22.2.3 데이터 저장**
 데이터베이스는 테이블을 소유할 수 있고 테이블에는 데이터를 저장할 수 있습니다. 우선 데이터 입력하기

    mysql> INSERT INTO products(name, modelnumber, series) VALUES
    ('Eric Clapton', '011725929', 'Artist'),
    ('sdasf','123125','Assdfgb'),
    ('Eric Clapton', '011725929', 'Artist'),
    ('sdasf','123125','Assdfgb'),
    ('Eric Clapton', '011725929', 'Artist'),
    ('sdasf','123125','Assdfgb'),


**22.2.4 데이터 조회**
  "SELECT 필드, 필드 FROM 테이블" 형태인 퀴리 문자을 사용.

  SELECT * FROM products;
  SELECT id, name, series FROM products;

**22.2.5 조건 검사**
  다음아래는 생략함.
  필요시

  https://www.gitbook.com/book/lenkim/sql-firststep/

  참고하여 공부하기.

## 22.3 MySQL 모듈

 모듈 설치하기
 > npm install mysql

 MySQL모듈 추출
 //모듈을 추출합니다
 var mysql = requires('mysql');

 MySQL 모듈의 메서드
 메서드이름 | 설명
 ---|---
 createConnection(options) | 데이터베이스에 접속

 options객체에는 다음의 속성이 존재합니다.
 속성이름|설명
 -----|-----
 host | 연결할 호스트를 나타냅니다.
 port | 연결할 포트를 나타냅니다.
 user | 사용자 이름을 나타냅니다.
 password | 사용자 비밀번호를 나타냅니다.
 database | 연결할 데이터베이스를 나타냅니다.
 debug | 디버그 모드를 사용할지 나타냅니다.

createConnection()메서드를 사용하면 client 객체가 생성됩니다.
Mysql모듈은 이렇게 생성한 Client객체로 데이터베이스에 있는 데이터에 접근합니다.

     //모듈을 추출
     var mysql = require('mysql');

     //데이터베이스와 연결
     var client = mysql.createConnection({
       user: 'root',
       password: '비밀번호'
       });

>Client객체의 메서드

메서드 이름 | 설명
-----|-----
query(sql[, callback]) | 퀴리 문장을 실행합니다.

    //모듈을 추출
    var mysql = require('mysql');

    //데이터베이스와 연결
    var client = mysql.createConnection({
      user: 'root',
      password: '비밀번호'
      });

    client.query('USE Company');

query()메서드도 node.js의 다른 메서드와 마찬가지로 이벤트 기반 비동기 처리방식을 사용합니다.

    client.query('USE Company');
    client.query('SELECT * FROM products', function(error, result, fields) {
      if(error) {
        console.log('퀴리 문장에 오류가 있습니다.');
      } else {
        console.log(result);
      }
    });

## 22.4 데이터베이스 웹 서비스

>기본 프레임.

    var http = require('http');
    var express = require('express');
    var mysql = require('mysql');

    //데이터베이스와 연결
    var client = mysql.createConnection({
      user: 'root',
      password: 'root',
      database: 'company'
    });

    //데이터베이스 퀴리 사용
    // client.query('USE Company')
    client.query('SELECT * FROM products', function(error, result, fields) {
        if (error) {
          console.log('쿼리문장에 오류가 있습니다.');
        } else {
          console.log(result);
        }
    });

>규모를 조금 더 크게하면


    var http = require('http');
    var express = require('express');
    var mysql = require('mysql');

    //데이터베이스와 연결
    var client = mysql.createConnection({
      user: 'root',
      password: 'root',
      database: 'company'
    });


    //웹 서버를 생성
    var app = express();
    app.use(express.static('public'));
    app.use(express.bodyParser());
    app.use(app.router);
    // 전체 데이터 조회
    app.get('/products', function(request, response) {
      //데이터베이스 요청을 수행
      client.query('SELECT * FROM products', function(error, data) {
        response.send(data);
      });
    });

    //개별 데이터 조회
    app.get('/products/:id', function(request, response) {
      //변수를 선언
      var id = Number(request.param('id'));

      //데이터베이스 요청을 수행
      client.query('SELECT * FROM products WHERE id=?', [ id
      ], function(error, data) {
        if (error) {
          console.log('쿼리문장에 오류');
        }
        response.send(data);
      })
     });
    app.post('/products', function(request, response) {
        //변수를 선언
        var name = request.param('name');
        var modelnumber = request.param('modelnumber');
        var series = request.param('series');

        //데이터베이스 요청을 수행
        client.query('INSERT INTO products (name, modelnumber, series) VALUES(?,?,?)', [
          name, modelnumber, series
        ], function (error, data) {
          response.send(data);
        });
      });
    app.put('/products/:id', function(request, response) {
        //변수를 선언합니다.
        var id = Number(request.param('id'));
        var name = request.param('name');
        var modelnumber = request.param('modelnumber');
        var series = request.param('series');
        var query = 'UPDATE products SET '

        //쿼리를 생성합니다.
        if(name) query += 'name="' + name + '" ';
        if(modelnumber) query += 'modelnumber="' + modelnumber + '" ';
        if(series) query += 'series="' + series + '" ';
        query = 'WHERE id=' + id;

        //데이터베이스 요청을 수행
        client.query(query, function(error, data) {
          response.send(data);
        });
    });
    app.del('/products/:id', function(request, response) {
      // 변수를 선언합니다.
      var id = Number(request.param('id'));

      //데이터베이스 요청을 수행
      client.query('DELECT FROM products WHERE id=?', [
        id
      ], function (error, data) {
        response.send(data);
      });
    });

    http.createServer(app).listen(52237, function () {
      console.log('Server Running at http://127.0.0.1:52273');
    });

위에 put / del / post / get 부분 외우기!

## 22.5 Ajax를 사용한 데이터 추가와 삭제

    <head>
    <meta charset="UTF-8">
    <title>Ajax Sample</title>
    <script
    	src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"
    	type="text/javascript"></script>
    <script>
    	$(document).ready(function() {
    		//데이터를 보여주는 함수
    		function selectData() {
    			//#output내부의 내용물 제거
    			$('#output').empty();

    			//Ajax 수행

    			$getJSON('/products', function(data) {

    				$(data).each(function(index, item) {
    					var output = '';
    					output += '<tr>';
    					output += '	<td>' + item.id + '</td>';
    					output += '	<td>' + item.name + '</td>';
    					output += '	<td>' + item.modelnumber + '</td>';
    					output += '	<td>' + item.series + '</td>';
    					output += '</tr>';
    					$('#output').append(output);

    				});
    			});
    		}
    		//데이터 추가
    		$('#insert_form').submit(function(event) {
    			//Ajax 수행
    			var data = $(this).serialize();
    			$.post('/products', data, selectData);
    			//기본 이벤트 제거
    			event.preventDefault();
    		});

    		//초기 화면에 데이터 표시
    		selectData();
    	});
    </script>

    </head>
