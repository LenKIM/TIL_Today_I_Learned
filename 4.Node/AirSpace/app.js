
// 모듈을 설치하는 부분
//app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();



let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("connected to mongod server");
})

let Board = require('./models/board');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//PORT
const port = process.env.PORT || 8080;
//ROUTER
let router = require('./routes')(app, Board);
//라우터를 불러 왔으므로 라우터를 입력해야한다.


//RUN server
const server = app.listen(port, () => {
  console.log("Server running at http://localhost/" + port);
})

//https://velopert.com/594
