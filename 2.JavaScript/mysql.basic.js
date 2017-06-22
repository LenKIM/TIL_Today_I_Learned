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
