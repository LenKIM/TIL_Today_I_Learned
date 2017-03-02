부록 F MongoDB

MongoDB는 자바스크립트로 데이터를 관리하는 데이터베이스입니다. node.js가 크룸 V8 자바스크립트
엔진을 사용한 것처럼 MongoDB 도 V8 자바스크립트 엔진을 사용합니다.

__F.1 설치
  [생략]

  Howbrew를 사용하여 설치 하였음.

  아래는 기록.

  Lenui-MacBook-Pro:~ len$ /usr/bin/ruby -e "$(curl -fsSL http://raw.githubusercontent.com/Homebrew/install/master/install)"
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew
==> The following existing directories will be made group writable:
/usr/local/share/doc
==> The following existing directories will have their owner set to len:
/usr/local/share/doc
==> The following existing directories will have their group set to admin:
/usr/local/share/doc

Press RETURN to continue or any other key to abort
==> /usr/bin/sudo /bin/chmod u+rwx /usr/local/share/doc
Password:
==> /usr/bin/sudo /bin/chmod g+rwx /usr/local/share/doc
==> /usr/bin/sudo /usr/sbin/chown len /usr/local/share/doc
==> /usr/bin/sudo /usr/bin/chgrp admin /usr/local/share/doc
==> /usr/bin/sudo /bin/mkdir -p /Users/len/Library/Caches/Homebrew
==> /usr/bin/sudo /bin/chmod g+rwx /Users/len/Library/Caches/Homebrew
==> /usr/bin/sudo /usr/sbin/chown len /Users/len/Library/Caches/Homebrew
==> Downloading and installing Homebrew...
remote: Counting objects: 870, done.
remote: Compressing objects: 100% (552/552), done.
remote: Total 870 (delta 551), reused 479 (delta 295), pack-reused 0
Receiving objects: 100% (870/870), 202.94 KiB | 95.00 KiB/s, done.
Resolving deltas: 100% (551/551), completed with 267 local objects.
From https://github.com/Homebrew/brew
 + 6648ff1...76ca97b master     -> origin/master  (forced update)
 * [new tag]         1.1.10     -> 1.1.10
 * [new tag]         1.1.6      -> 1.1.6
 * [new tag]         1.1.7      -> 1.1.7
 * [new tag]         1.1.8      -> 1.1.8
 * [new tag]         1.1.9      -> 1.1.9
HEAD is now at 76ca97b Merge pull request #2082 from reitermarkus/spec-os_mac_language
==> Tapping homebrew/core
Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'...
remote: Counting objects: 4159, done.
remote: Compressing objects: 100% (4013/4013), done.
remote: Total 4159 (delta 30), reused 452 (delta 9), pack-reused 0
Receiving objects: 100% (4159/4159), 3.32 MiB | 120.00 KiB/s, done.
Resolving deltas: 100% (30/30), done.
Tapped 4010 formulae (4,190 files, 10.4M)
==> Cleaning up /Library/Caches/Homebrew...
==> Migrating /Library/Caches/Homebrew to /Users/len/Library/Caches/Homebrew...
==> Deleting /Library/Caches/Homebrew...
Already up-to-date.
==> Installation successful!

==> Homebrew has enabled anonymous aggregate user behaviour analytics.
Read the analytics documentation (and how to opt-out) here:
  https://git.io/brew-analytics

==> Next steps:
- Run `brew help` to get started
- Further documentation:
    https://git.io/brew-docs
Lenui-MacBook-Pro:~ len$ brew install mongodb
==> Installing dependencies for mongodb: openssl
==> Installing mongodb dependency: openssl
==> Downloading https://homebrew.bintray.com/bottles/openssl-1.0.2k.sierra.bottl
######################################################################## 100.0%
==> Pouring openssl-1.0.2k.sierra.bottle.tar.gz
==> Using the sandbox
==> Caveats
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

This formula is keg-only, which means it was not symlinked into /usr/local.

Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries

If you need to have this software first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find this software you may need to set:
    LDFLAGS:  -L/usr/local/opt/openssl/lib
    CPPFLAGS: -I/usr/local/opt/openssl/include

==> Summary
🍺  /usr/local/Cellar/openssl/1.0.2k: 1,696 files, 12M
==> Installing mongodb
==> Downloading https://homebrew.bintray.com/bottles/mongodb-3.4.2.sierra.bottle
######################################################################## 100.0%
==> Pouring mongodb-3.4.2.sierra.bottle.tar.gz
==> Caveats
To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
==> Summary
🍺  /usr/local/Cellar/mongodb/3.4.2: 17 files, 261.9M
Lenui-MacBook-Pro:~ len$


MongoDB 시작하면

2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] MongoDB starting : pid=43692 port=27017 dbpath=/data/db 64-bit host=Lenui-MacBook-Pro.local
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] db version v3.4.2
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] git version: 3f76e40c105fc223b3e5aac3e20dcd026b83b38b
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] OpenSSL version: OpenSSL 1.0.2k  26 Jan 2017
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] allocator: system
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] modules: none
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] build environment:
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten]     distarch: x86_64
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten]     target_arch: x86_64
2017-02-23T14:43:59.085+0900 I CONTROL  [initandlisten] options: {}
2017-02-23T14:43:59.086+0900 I STORAGE  [initandlisten] wiredtiger_open config: create,cache_size=7680M,session_max=20000,eviction=(threads_max=4),config_base=false,statistics=(fast),log=(enabled=true,archive=true,path=journal,compressor=snappy),file_manager=(close_idle_time=100000),checkpoint=(wait=60,log_size=2GB),statistics_log=(wait=0),
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten]
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten]
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten]
2017-02-23T14:43:59.650+0900 I CONTROL  [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
2017-02-23T14:43:59.859+0900 I FTDC     [initandlisten] Initializing full-time diagnostic data capture with directory '/data/db/diagnostic.data'
2017-02-23T14:43:59.989+0900 I INDEX    [initandlisten] build index on: admin.system.version properties: { v: 2, key: { version: 1 }, name: "incompatible_with_version_32", ns: "admin.system.version" }
2017-02-23T14:43:59.989+0900 I INDEX    [initandlisten] 	 building index using bulk method; build may temporarily use up to 500 megabytes of RAM
2017-02-23T14:44:00.004+0900 I INDEX    [initandlisten] build index done.  scanned 0 total records. 0 secs
2017-02-23T14:44:00.005+0900 I COMMAND  [initandlisten] setting featureCompatibilityVersion to 3.4
2017-02-23T14:44:00.006+0900 I NETWORK  [thread1] waiting for connections on port 27017

그리고

또다른 터미널을 활용해서 mongo를 실행시키면 이렇게 !
mongo를 실행하면

2017-02-23T14:43:59.989+0900 I INDEX    [initandlisten] 	 building index using bulk method; build may temporarily use up to 500 megabytes of RAM
2017-02-23T14:44:00.004+0900 I INDEX    [initandlisten] build index done.  scanned 0 total records. 0 secs
2017-02-23T14:44:00.005+0900 I COMMAND  [initandlisten] setting featureCompatibilityVersion to 3.4
2017-02-23T14:44:00.006+0900 I NETWORK  [thread1] waiting for connections on port 27017
2017-02-23T14:44:47.363+0900 I NETWORK  [thread1] connection accepted from 127.0.0.1:60768 #1 (1 connection now open)
2017-02-23T14:44:47.364+0900 I NETWORK  [conn1] received client metadata from 127.0.0.1:60768 conn1: { application: { name: "MongoDB Shell" }, driver: { name: "MongoDB Internal Client", version: "3.4.2" }, os: { type: "Darwin", name: "Mac OS X", architecture: "x86_64", version: "16.4.0" } }

__F.2 기본 명령어
```java
> var a = 0;
> for(var i = 0; i < 273; i++) {a += i; }
37128
> a
37128
> for(var i = 0; i < 273; i++) {a += i; }
74256
> for(var i = 0; i < 273; i++) {a += i; }
111384
> for(var i = 0; i < 273; i++) {a += i; }
148512
> for(const i = 0; i < 273; i++) {a += i; }
2017-02-23T14:48:55.323+0900 E QUERY    [thread1] TypeError: invalid assignment to const `i' :
@(shell):1:27
> for(let i = 0; i < 273; i++) {a += i; }
185640
> for(let i = 0; i < 273; i++) {a += i; }
222768
> db
test
>
```
 **데이터베이스와 컬렉션이란?**
 ![enter image description here](https://image.slidesharecdn.com/20150802mongodbcrud-150802120756-lva1-app6892/95/mongo-db-crud-3-638.jpg?cb=1438517417)

![KakaoTalk_Photo](http://i.imgur.com/VJgvNtk.jpg)


 ***우선 데이터베이스를 생성해보쟈***
 - 'use 데이터베이스이름'으로 데이터베이스를 변경하면 자동으로 데이터베이스가 생성


    > db
    test
    > use node
    switched to db node
    > db
    node

 컬렉션을 생성할 떄는 createCollection()메서드를 사용
**위에서 말한것처럼 컬렉션은 데이터베이스에서 테이블이랑 같은 개념.**

> db.createCollection('product')
{ "ok" : 1 }


**데이터를 저장해 봅시다.**
저장할때는 save()를 사용합니다.
db.product.save({name : 'pencil', price: 500})

> db.product.save({name : 'pencil', price: 500})
WriteResult({ "nInserted" : 1 })

find()메서드를 사용하면 컬렉션 내부의 데이터를 확인할 수 있습니다. 다음처럼 find()메서드를 사용하면 방금 저장한 데이터를 출력하는 것을 확인할 수 있습니다.

> db.product.find()
{ "_id" : ObjectId("58ae7a1410c5a92a9a51e071"), "name" : "pencil", "price" : 500 }

 결과를 보면 자동으로  _id속성이 생성한 것을 확인할 수 있다. _id속성은 데이터를 저장한 시간을 기반으로 만들어진 속성으로 각각의 객체를 구분할 수 있게 해줍니다.

  그러나 저렇게 하면 "데이터를 입력하면 데이터의 형태가 일정하지 않잖아요?"

  그렇다. 단순히 JSON형식으로 문서에 데이터를 저장하는 것입니다. 따라서 MySQL데이터베이스와 같은 관계형 데이터베이스의 테이블 처럼 같은 형태의 데이터를 입력할 필요가 없습니다.

  > db.product.save({name : 'eraser', price: 500})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'notebook', price: 2000})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'glue', price: 700})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'scissor', price: 2000})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'stapler', price: 3000})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'pen', price: 1000})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'brush', price: 2000})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'knife', price: 500})
WriteResult({ "nInserted" : 1 })
> db.product.save({name : 'protractor', price: 500})
WriteResult({ "nInserted" : 1 })

아래와 같이 입력했음.

**데이터를 검색하는 부분입니다.**
 데이터를 검색할 때는 이전에 살펴본 것처럼 find()메서드를 사용!!
 ***사용하면 다음처럼 데이터를 배열 형태로 추출할 수 있습니다.***

 > db.product.find()
{ "_id" : ObjectId("58ae7a1410c5a92a9a51e071"), "name" : "pencil", "price" : 500 }
{ "_id" : ObjectId("58ae7c28d70088164b798ccc"), "name" : "eraser", "price" : 500 }
{ "_id" : ObjectId("58ae7c35d70088164b798ccd"), "name" : "notebook", "price" : 2000 }
{ "_id" : ObjectId("58ae7c3ed70088164b798cce"), "name" : "glue", "price" : 700 }
{ "_id" : ObjectId("58ae7c74d70088164b798ccf"), "name" : "scissor", "price" : 2000 }
{ "_id" : ObjectId("58ae7c81d70088164b798cd0"), "name" : "stapler", "price" : 3000 }
{ "_id" : ObjectId("58ae7c8ed70088164b798cd1"), "name" : "pen", "price" : 1000 }
{ "_id" : ObjectId("58ae7c97d70088164b798cd2"), "name" : "brush", "price" : 2000 }
{ "_id" : ObjectId("58ae7ca1d70088164b798cd3"), "name" : "knife", "price" : 500 }
{ "_id" : ObjectId("58ae7cacd70088164b798cd4"), "name" : "protractor", "price" : 500 }

 원하지 않는 속성을 추출하지 않고 싶을때는 find()메서드의 두 번째 매개변수에 속성을 선택하고 불값을 입력. 아래 코드에서는  _id속성을 false로 지정했으므로 _id속성을 출력하지 않음.

 > db.product.find({},{_id:false})
{ "name" : "pencil", "price" : 500 }
{ "name" : "eraser", "price" : 500 }
{ "name" : "notebook", "price" : 2000 }
{ "name" : "glue", "price" : 700 }
{ "name" : "scissor", "price" : 2000 }
{ "name" : "stapler", "price" : 3000 }
{ "name" : "pen", "price" : 1000 }
{ "name" : "brush", "price" : 2000 }
{ "name" : "knife", "price" : 500 }
{ "name" : "protractor", "price" : 500 }

 그렇다면 첫번째 매개변수는 무엇일까?????? 바로 그걸로 조건을 검사합니다.
 예를 들어 다음 명령은 price속성이 500인 데이터만 추출

 > db.product.find({price:500},{_id:false})
{ "name" : "pencil", "price" : 500 }
{ "name" : "eraser", "price" : 500 }
{ "name" : "knife", "price" : 500 }
{ "name" : "protractor", "price" : 500 }

숫자 범위를 선택하고 싶을 때는 연산자를 사용함.

만약 하나의 객체만 추출하고 싶을 때는 findOne()메서드를 사용합니다. findOne()메서드를 사용하면 find()메서드로 추출 할 수 있는 배열의 가장 첫 번째에 위치한 데이터를 추출합니다.

> db.product.findOne()
{
	"_id" : ObjectId("58ae7a1410c5a92a9a51e071"),
	"name" : "pencil",
	"price" : 500
}

**데이터의 정렬은 이렇게**

> db.product.find({price: 500}, {_id:false}).sort({ name:1})
```json
{ "name" : "eraser", "price" : 500 }
{ "name" : "knife", "price" : 500 }
{ "name" : "pencil", "price" : 500 }
{ "name" : "protractor", "price" : 500 }
```
 오름차순은 1 내림차순은  -1

 **특정 위치에 있는 데이터를 선택하는 방법은??**

  DB에서 사용하는 페이징을 하기위해서는 limit()메서드와 skip()메서드를 사용합니다.

  우선 Limit()메서드부터 살펴보면, 다음 코드는 sort()메서드를 사용해 price속성으로 오름차순 정렬하고 Limit()메서드를 사용해 상위 3개의 데이터만 추출

  > db.product.find().sort({ price: 1}).limit(3)
  ```javascript
{ "_id" : ObjectId("58ae7a1410c5a92a9a51e071"), "name" : "pencil", "price" : 500 }
{ "_id" : ObjectId("58ae7c28d70088164b798ccc"), "name" : "eraser", "price" : 500 }
{ "_id" : ObjectId("58ae7ca1d70088164b798cd3"), "name" : "knife", "price" : 500 }
```

> db.product.find().sort({ price: 1}).skip(3).limit(3)
```javascript
{ "_id" : ObjectId("58ae7cacd70088164b798cd4"), "name" : "protractor", "price" : 500 }
{ "_id" : ObjectId("58ae7c3ed70088164b798cce"), "name" : "glue", "price" : 700 }
{ "_id" : ObjectId("58ae7c8ed70088164b798cd1"), "name" : "pen", "price" : 1000 }
```

**자,이제 데이터를 수정해 봅시다.**

 MongoDB는 save()메서드를 사용해 _id속성이 일치하는 데이터를 저장하면 자동으로 원래 데이터를 수정합니다. 우선 이 내용을 바탕으로 데이터를 수정해봅시다. 우선 다음 명령을 사용해 name속성이 knife인 데이터를 추출하고 변수 temp에 저장합니다.

> var temp = db.product.findOne({ name : 'knife'})

> temp
```javascript
{
	"_id" : ObjectId("58ae7ca1d70088164b798cd3"),
	"name" : "knife",
	"price" : 500
}
```
>

 요런식으로 일단 접근 한 뒤,
temp변수의 price속성으로 변경한 뒤에 save()메서드를 사용하면 데이터가 자동으로 수정됩니다.

> temp.price = 700

```700```

> db.product.save(temp)

```WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })```

>


또는 update()메서드를 사용해도 데이터를 수정할 수 있습니다.
update()메서드는 다음과 같은 형태를 갖습니다.

    >db.collection.update(
     <query>,
     <update>,
     {
       upsert:<boolean>,
       multi:<boolean>,
       writeConcern: <document>
     }
    )

매개변수  upsert는 upsert를 사용할지 사용하지 않을지를 지정합니다. 매개변수multi는 바뀌야 할 대상이 하나 이상일 때 하나만 바꿀지 전부 바꿀지 지정합니다. 매개변수 writeConcern은 데이터를 업데이트할 때 필요한 설정값을 지정합니다.

db.product.update({ name : 'knife'}, {$set: { price: 500}}, { upsert: false, multi:true})

update쓸때, $set을 사용합니다 이 연산자는 다른 속성은 그래도 유지하고 특정 속성만 변셩할 수 있게 만들어줍니다.

**데이터를 삭제하려면**

remove()메서드를 사용해야합니다.

> db.product.remove({ name: 'protractor' });
WriteResult({ "nRemoved" : 1 })
>

만약에 db.product.remove()를 작성하면 다 지워지므로 주의!!!

 __F.3 mongojs 모듈

  npm install mongojs 를 통해서 모듈 설치하고 위에서 만든 데이터베이스를 연결합니다.

  const mongojs = require('monojs')
  var db = mongojs('node', ['products']);

  이렇게하면 db객체가 생성되면 위에서 배웠던 product 컬렉션을 쓸 수 있다!!

--------
```javascript
// 모듈을 추출합니다.
const mongojs = require('mongojs');
const express = require('express');
const bodyParser = require('body-parser');

// 데이터베이스를 연결합니다.
const db = mongojs('node', ['products']);

// 서버를 생성/실행합니다.
const app = express();
app.listen(52273, () => {
  console.log('app Running at http://127.0.0.1:52273');
});

// 미들웨어를 추가합니다.
app.use(bodyParser.urlencoded({
  extended: false
}));

// 라우트합니다.
app.get('/product', (request, response) => {
  db.products.find((error, results) => {
    response.send(results);
  })
});
app.post('/product', (request, response) => {
  // 변수를 선언합니다.
  const body = request.body;

  // 예외를 처리합니다.
  if (!body.id) { return response.send('id를 보내주세요'); }
  if (!body.name) { return response.send('name을 보내주세요'); }
  if (!body.price) { return response.send('price을 보내주세요'); }

  // 변수를 추출합니다.
  const id = body.id;
  const name = body.name;
  const price = Number(body.price);

  // 데이터를 저장합니다.
  db.products.save({
    name: name,
    price: price
  }, (error, result) => {
    response.send(error || result);
  });
});

app.get('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  db.products.findOne({
    _id: mongojs.ObjectId(id)
  }, (error, result) => {
    if (error) {
      response.send('오류가 발생했습니다.');
    } else {
      response.send(result);
    }
  });
});
app.put('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  // 데이터를 하나 찾습니다.
  db.products.findOne({
    _id: mongojs.ObjectId(id)
  }, (error, result) => {
    // 데이터를 수정합니다.
    if (request.body.name) { result.name = request.body.name; }
    if (request.body.price) { result.price = Number(request.body.price); }

    // 저장합니다.
    db.products.save(result, (error, result) => {
      // 응답합니다.
      response.send(error || result);
    });
  });
});
app.delete('/product/:id', (request, response) => {
  // 변수를 선언합니다.
  const id = request.params.id;

  // 데이터를 제거합니다.
  db.products.remove({
    _id: mongojs.ObjectId(id)
  }, (error) => {
    // 응답합니다.
    response.send('제거되었습니다');
  });
});
```
