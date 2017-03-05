
일단 파이어베이스의 데이터베이스는 NoSQL 그러니까,
최근에 공부했던, MongoDB같은 느낌!

그리고 예상대로 JSON으로 되어있다. 원본 API문서를 보면

The Firebase Realtime Database is a cloud-hosted database. Data is stored as JSON and synchronized in realtime to every connected client. When you build cross-platform apps with our iOS, Android, and JavaScript SDKs, all of your clients share one Realtime Database instance and automatically receive updates with the newest data.

이라고 써져있다.

그리고 큰 특징이 IOS android JavaScript SDK로 이루어진 모든 클라이언트들이 하나의 공유된 데이터베이스를 가질수 있다라는 것이다.

Data is persisted locally, and even while offline, realtime events continue to fire, giving the end user a responsive experience. When the device regains connection, the Realtime Database synchronizes the local data changes with the remote updates that occurred while the client was offline, merging any conflicts automatically.

또한 신기한게, 오프라인 상태에서도 데이터를 저장했다가 인터넷이 연결되면 저장되었던 데이터를 서버로 보낸다라는 것!! 자동으로!!

 그럼 진지하게 파이어베이스 데이터베이스를 안드로이드에서 사용하는 예제를 해보자.
(나중에 자바스크립트로도 해봅시다... ㅎㅎ)

늘 그렇듯... sdk를 다운받아 봅시다아~~~~
(진짜 이 다운받는 행동도 자동화 해줬으면...)

```
compile 'com.google.firebase:firebase-database:10.2.0'
```

이렇게 작성해주고, 만약에 역시나, IDE가 이걸 못찾는다! 그러면 Google repository를 최신버전으로 업데이트 해주어여한다!

 현제 사용되는 프로젝트 예제가 SQLite를 사용하고 있으나, 그 위에 파이어베이스의 데이터베이스로 이전하는 방식으로 진행해보자.

  목표
  1. 파이어베이스의 데이터베이스의 기본예제를 사용하여 CRUD를 익힌다.
  2. 가지고있는 SQLite을 데이터를 구글 데이터베이스로 옮겨보자.

  문서API에는 Authentication을 먼저 인증 한 후 사용해주기를 권장한다.
  그러나... 나는 인증을 나중에 일단 데이터베이스를 사용하는 걸 우선으로 진행해보자.

  1-1 Write to your database

  일단 데이터베이스의 사용을 가져오기위해서는 getInstance로 가져와야한다.

  ```java
  // Write a message to the database
FirebaseDatabase database = FirebaseDatabase.getInstance();
DatabaseReference myRef = database.getReference("message");

myRef.setValue("Hello, World!");
```

You can save a range of data types to the database this way, including Java objects. When you save an object the responses from any getters will be saved as children of this location.

 그러니까, 자바 오브젝트를 포함에서 다양한 Type의 데이터를 저런 식으로 저장할 수 있다~~~ 이런말.. 영어를 CV하는 이유는 해석상 왔다갔다 하기 싫고 영어가 더 깔끔하기 때문에.

 위의 예제를 실행하고, 파이어베이스로 들어가서 확인을 해보면,

![스크린샷 2017-03-05 오후 11.34.40](http://i.imgur.com/fCpwn5a.png)

 예스!! 근데 주의 할점!

  분명 이 예제를 어찌어찌 하시다보면, 처음에 왜 안되지 할것입니다.
  바로, 규칙을 설정을 안하셔서 그런데, 위에서 말했다 시피, 파이어데이터베이스는 인증된 사람만이 이용하게 만드는 것이 구글이 지향하는 것입니다.
  그러므로 처음 규칙을 들어가게 되면

  ```
  {
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
이런 식으로 지정되어 있어, IDE상에서 Denied 된다고 로그될거다.

저걸

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

해야지, 데이터베이스가 들어간다!
