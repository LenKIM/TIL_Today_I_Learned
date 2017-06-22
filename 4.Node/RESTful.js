const express = require('express');
const bodyParser = require('body-parser');

//더미 데이터베이스를 구현
 let DummyDB = ( () => {

   var DummyDB = {};
   var storage = [];
   var count = 1;

   // 메서드를 구현합니다.
   DummyDB.get = (id) => {
     if (id) {
       //변수를 가공
       id = (typeof id == 'string')? Number(id) : id;

       //데이터를 선택합니다.
       for(var i in storage) if (storage[i].id == id) {
         return storage[i];
       }

     } else {
       return storage;
     }
   };

   DummyDB.insert = (data) => {
     data.id = count++;
     storage.push(data);
     return data;
   };

   DummyDB.remove = (id) => {
     //변수를 가공
     id = (typeof id == 'string') ? Number(id) : id;

     //제거
     for(var i in storage) if (storage[i].id == id) {
       //데이터를 제거
       storage.splice(i,1);

       //리턴 데이터 삭제 성공
       return true;
   }

   //리턴 데이터 삭제 실패
   return false;
 };

 return DummyDB;
 })();

 //서버 생성
 let app = express();

 //미들웨어를 설정
 app.use(bodyParser.urlencoded({
   extended: false
 }));


 //라우터를 설정
 app.get('/user', (request, response) => {
   response.send(DummyDB.get());
 });
 app.get('/user/:id', (request, response) => {
   response.send(DummyDB.get(request.params.id));
 });
 app.post('/user', (request, response) => {
    //변수를 선언
    const name = request.body.name;
    const region = request.body.region;

    //유효성 검사
    if(name && region) {
      response.send(DummyDB.insert({
        name: name,
        region: region
      }));
    } else {
      throw new Error ('error')
    }
 });
 app.put('/user/:id', (request, response) => {
    //변수를 선언
    let id = request.params.id;
    let name = request.body.name;
    let region = request.body.region;

    //데베 수정
    let item = DummyDB.get(id);
    item.name = name || item.name;
    item.region = region || item.region;

    //응답
    response.send(item);
 });
 app.delete('/user/:id', (request, response) => {
   response.send(DummyDB.remove(request.params.id));
 });

app.listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
})
