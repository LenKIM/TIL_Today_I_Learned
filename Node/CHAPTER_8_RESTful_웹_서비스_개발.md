

"Restful규정이 뭔가요?"

일관된 웹 서비스 인터페이스 설게를 위해서 만들어진것,

다음 규정은 이렇다,

경로 | /collection | /collection/:id
---|----|---
GET방식 | 컬렉션을 조회합니다. |컬렉션의 특정 요소를 조회합시다.
POST방식 | 컬렉션에 새로운 데이터를 추가합니다.| 사용하지 않습니다.
PUT방식 | 컬렉션 전체를 한꺼번에 변경합니다.|컬렉션에 특정 요소를 수정합니다.
DELETE방식| 컬렉션 전체를 삭제합니다.|컬렉션의 특정요소를 삭제합니다.

예를 들면
GET /user - 모든 사용자 전체를 조회
GET /user/273 - 특정 사용자 조회
POST /user - 사용자를 추가합니다.
PUT /user:id - 특정 사용자 정보를 수정
DELETE /user:id - 특정 사용자 정보를 제거


```javascript
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

```



-------

동영상에서 사용된 소스 코드

```javascript
// 모듈을 추출합니다.
const express = require('express');
const bodyParser = require('body-parser');


// 서버를 생성/실행합니다.
const app = express();
app.listen(52273, () => {
  console.log('app Running at http://127.0.0.1:52273');
});

// 미들웨어를 추가합니다.
app.use(bodyParser.urlencoded({
  extended: false
}));

// 변수를 선언합니다.
const users = {};

// 라우트합니다.
app.get('/user', (request, response) => {
  response.send(users);
});
app.post('/user', (request, response) => {
  // 변수를 선언합니다.
  const body = request.body;

  // 예외를 처리합니다.
  if (!body.id) { return response.send('id를 보내주세요'); }
  if (!body.name) { return response.send('name을 보내주세요'); }
  if (!body.region) { return response.send('region을 보내주세요'); }

  // 변수를 추출합니다.
  const id = body.id;
  const name = body.name;
  const region = body.region;

  // 데이터를 저장합니다.
  users[id] = {
    name: name,
    region: region
  };

  // 응답합니다.
  response.send(users[id]);
});

app.get('/user/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;
  response.send(users[id]);
});
app.put('/user/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  // 데이터를 수정합니다.
  if (request.body.name) {
    users[id].name = request.body.name;
  }
  if (request.body.region) {
    users[id].region = request.body.region;
  }

  // 응답합니다.
  response.send(users[id]);
});
app.delete('/user/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  // 데이터를 제거합니다.
  delete users[id]

  // 응답합니다.
  response.send('제거되었습니다');
});
```
