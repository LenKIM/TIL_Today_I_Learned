
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

### 1-1 Write to your database

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

 **규칙**에 대해서 조금더 이야기한다면,
 ```
 {
    "rules": {
        ".read": true,
        ".write": true,
        "users": {
            "$user": {
                "name": {
                    ".validate": "newData.isString() && newData.val().length < 50"
                },
                "email": {
                    ".validate": "newData.isString() && newData.val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i)"
                }
            }
        }
    }
```

이런 식으로 정규식 뿐만아니라, 글자 크기, 그리고 이메일인지 아닌지의 등등 validate시킬 수 있다.

### 1-2 Read from your database

To make your app data update in realtime, you should add a ValueEventListener to the reference you just created.

The onDataChange() method in this class is triggered once when the listener is attached and again every time the data changes, including the children.

DB를 업데이트하기 위해서는 ValueEventListener를 이용해야합니다.

onDataChange()는 listener가 attached되면 딱 한번 동작되어지며, 데이터가 변경될때마다 다시한번 동작되어집니다.

 그리고 listener로 쓰이는 것이 3가지있는데,

1.addValueEventListener(ValueEventListener)

이를 어떻게 사용해야 될까??

기본
```java
 // Read from the database
        myRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // This method is called once with the initial value and again
                // whenever data at this location is updated.
                String value = dataSnapshot.getValue(String.class);
                Log.d("Mainactivity", "Value is: " + value);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
                Log.w("Mainactivity", "Failed to read value.", error.toException());
            }
        });
```

예를 들어 스테고사우르스보다 키가 작은 공룡의 이름을 검색할 수 있습니다.

```java
dinosaursRef.child("stegosaurus").child("height").addValueEventListener(new ValueEventListener() {
    @Override
    public void onDataChange(DataSnapshot stegoHeightSnapshot) {
        Integer favoriteDinoHeight = stegoHeightSnapshot.getValue(Integer.class);
        Query query = dinosaursRef.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2);
        query.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                // Data is ordered by increasing height, so we want the first entry
                DataSnapshot firstChild = dataSnapshot.getChildren().iterator().next();
                System.out.println("The dinosaur just shorter than the stegosaurus is: " + firstChild.getKey());
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // ...
            }
        });
    }

    @Override
    public void onCancelled(DatabaseError databaseError) {
        // ...
    }
});
```

2.addListenerForSingleValueEvent(ValueEventListener)
데이터를 오직 한번만 읽는 리스너
한 번만 호출되고 즉시 삭제되는 콜백이 유용한 경우가 있습니다. 이때 이 리스너를 사용합니다.

```
myRef.addListenerForSingleValueEvent(new ValueEventListener() {
           @Override
           public void onDataChange(DataSnapshot dataSnapshot) {
               String value = dataSnapshot.getValue(String.class);
               Log.d("addListenerForS", "Value is: " + value);
           }

           @Override
           public void onCancelled(DatabaseError databaseError) {
               Log.w("Mainactivity", "Failed to read value.", databaseError.toException());

           }
       });
```
3.addChildEventListener(ChildEventListener)

하위 추가할 떄 사용하는 리스너


블로깅 앱에 추가되는 새 게시물 각각의 데이터만 검색하려면 child_added를 사용합니다.

```java
myRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {

child_added 이벤트는 일반적으로 데이터베이스에서 항목 목록을 검색하는 데 사용됩니다. 위치의 전체 내용을 반환하는 value와 달리 child_added는 기존 하위 항목마다 한 번씩 발생한 후 지정된 경로에 하위 항목이 새로 추가될 때마다 다시 발생합니다. 새 하위 항목의 데이터를 포함하는 스냅샷이 이벤트 콜백에 전달됩니다. 정렬을 위해 이전 하위 항목의 키를 포함하는 두 번째 인수도 전달됩니다.

              Post newPost = dataSnapshot.getValue(Post.class);
                     System.out.println("Author: " + newPost.author);
                     System.out.println("Title: " + newPost.title);
                     System.out.println("Previous Post ID: " + prevChildKey);
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {
              child_changed 이벤트는 하위 노드가 수정될 때마다 발생합니다. 여기에는 하위 노드의 하위에 대한 수정이 포함됩니다. 이 이벤트는 일반적으로 child_added 및 child_removed와 함께 항목 목록의 변경에 대응하는 데 사용됩니다. 이벤트 콜백에 전달되는 스냅샷에는 하위 항목의 업데이트된 데이터가 포함됩니다.

              child_changed를 사용하여 블로그 게시물이 수정될 때 업데이트된 데이터를 읽을 수 있습니다.

              Post changedPost = dataSnapshot.getValue(Post.class);
       System.out.println("The updated post title is: " + changedPost.title);

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

              child_removed 이벤트는 바로 아래 하위 항목이 삭제될 때 발생합니다. 이 이벤트는 일반적으로 child_added 및 child_changed와 함께 사용됩니다. 이벤트 콜백에 전달되는 스냅샷에는 삭제된 하위 항목의 데이터가 포함됩니다.

블로그 예제에서는 child_removed를 사용하여 삭제된 게시물에 대한 알림을 콘솔에 로깅합니다.

Post removedPost = dataSnapshot.getValue(Post.class);
       System.out.println("The blog post titled " + removedPost.title + " has been deleted");

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
```

예제를 공부 할 수 있는 곳(Google 보다 휠씬 이해하기 쉬움) http://www.androidhive.info/2016/10/android-working-with-firebase-realtime-database/

한국어 파이어베이스 API
https://firebase.google.com/docs/database/server/retrieve-data?hl=ko
