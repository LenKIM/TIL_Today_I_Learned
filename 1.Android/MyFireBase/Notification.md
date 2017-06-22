
## 파이어베이스 Notification 연결하기.

![스크린샷 2017-03-03 오후 9.47.28](http://i.imgur.com/P1ikoXN.png)

처음 프로젝트 Name을 입력하면 이러한 화면이 나옵니다.

그럼 패키지 이름 = 앱의 패키지 이름
SHA-1의 경우는.. 저는 편하게 안드로이드 스튜디오에서 New Project한 후, Map Activty를 눌러 확인합니다.

기타 그 뒤의 방법은 충분히 따라하실거라 생각하고 패스하겠습니다.


1. Notification 사용하기.

 - Prerequisites
    - A device running Android 4.0 (Ice Cream Sandwich) or newer, and Google Play services 10.2.0 or higher
    - The Google Play services SDK from the Google Repository, available in the Android SDK Manager
    - The latest version of Android Studio, version 1.5 or higher

아래 내용을 app상의 gradle에 추가해주어야 한다.
```
compile 'com.google.firebase:firebase-core:10.2.0'
    compile 'com.google.firebase:firebase-messaging:10.2.0'
```  
'com.google.firebase:firebase-core:10.2.0'
위의 라이브러리는 Firebase Analytics를 제공한다.

만약에 Failed File이 뜬다면 Google Repository을 최신으로 업데이트하면 해결된다...

위의 문제를 방금 겪음..

이렇게하고,

![스크린샷 2017-03-03 오후 10.46.25](http://i.imgur.com/wQGKezD.png)


Notification탭을 눌러주고

![스크린샷 2017-03-03 오후 11.05.19](http://i.imgur.com/ZLAfA1m.png)

1. Fields like User segment and Expires determine the message target and delivery options.

2. Fields like Message text and Custom data are sent to the client in a payload comprised of key/value pairs.

Some of these latter keys are also available through the FCM server API. For example, key/value pairs entered in Custom data are handled as a data payload for the notification. Other fields map directly to keys in the FCM notification payload.

The keys that the Notifications console sends to clients are

![스크린샷 2017-03-03 오후 11.11.07](http://i.imgur.com/xo9AWjk.png)

Key | Console field label | Description
---|---|---
제목 | 메세지 제목 | 제목
바디 | 메세지 내용 | 내용
데이터 | 커스텀 데이터 | Key/value 로 보낼 수 있다.


## 메세지를 받기위해서는 FirebaseMessagingService 를 extend한 클래스를 선언해야한다.

```java
public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String TAG = MyFirebaseMessagingService.class.getSimpleName();

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
    }

    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }
}
```

Foreground에서 메세지를 받으려면 위의 메소드 두 개를 선언해야한다.

onMessageReceived의 경우 아래 두가지 경우를 제외한 모든 상황에서 메세지를 받을 수 있다.

 - Notifications delivered when your app is in the background. In this case, the notification is delivered to the device’s system tray. A user tap on a notification opens the app launcher by default.

백그라운데 있을때 노티가 제공된다. 이런 경우에는 디바이스의 시스템 tray내에 배달되는데, 유저는 탭을 눌러 디폴트로 앱에 접속하게 만든다.

- Messages with both notification and data payload, both background and foreground. In this case, the notification is delivered to the device’s system tray, and the data payload is delivered in the extras of the intent of your launcher Activity.

노티와 데이터 payload 둘다 메시지된다. 이러한 경우 노디는 시스템 트레이에 배달된다.


또한 노티의 아이콘을 커스텀 할 수 있는데(색깔과 그림),

<!-- Set custom default icon. This is used when no icon is set for incoming notification messages.
 See README(https://goo.gl/l4GJaQ) for more. -->
    <meta-data
            android:name="com.google.firebase.messaging.default_notification_icon"
            android:resource="@android:drawable/ic_notification_clear_all" />
    <!-- Set color used with incoming notification messages. This is used when no color is set for the incoming
         notification message. See README(https://goo.gl/6BKBk7) for more. -->
    <meta-data
            android:name="com.google.firebase.messaging.default_notification_color"
            android:resource="@color/colorAccent" />

  위의 줄을 Manifest.xml에서 Application 아래에 삽입한다.

또한

```
<service
        android:name=".thread.MyFirebaseMessagingService">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT"/>
    </intent-filter>
</service>
```


  onMessageReceived에서 RemoteMessage를 통해 FB에서 보낸 메시지를 받을 수 있다. 받은 메세지로 PendingIntent를 통해 커스텀 노티를 만들면 완성.

**onDeletedMessages()은 그럼 무엇일까?**

In some situations, FCM may not deliver a message. This occurs when there are too many messages (>100) pending for your app on a particular device at the time it connects or if the device hasn't connected to FCM in more than one month. In these cases, you may receive a callback to FirebaseMessagingService.onDeletedMessages(). When the app instance receives this callback, it should perform a full sync with your app server. If you haven't sent a message to the app on that device within the last 4 weeks, FCM won't call onDeletedMessages().

 1. 노티가 100개 이상 뜰 경우
 2. 디바이스가 FCM에 1달 이상 연결이 안될경우

 onDeletedMessages가 호출된다.

```java
 public class MyFirebaseMessagingService extends FirebaseMessagingService {

     private static final String TAG = MyFirebaseMessagingService.class.getSimpleName();

     @Override
     public void onMessageReceived(RemoteMessage remoteMessage) {
         super.onMessageReceived(remoteMessage);

         // TODO(developer): Handle FCM messages here.
         // Not getting messages here? See why this may be: https://goo.gl/39bRNJ
         Log.d(TAG, "From: " + remoteMessage.getFrom());

         // Check if message contains a data payload.
         if (remoteMessage.getData().size() > 0) {
             Log.d(TAG, "Message data payload: " + remoteMessage.getData());
         }

         // Check if message contains a notification payload.
         if (remoteMessage.getNotification() != null) {
             Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
             sendNotification(remoteMessage.getNotification().getBody());
         }

         // Also if you intend on generating your own notifications as a result of a received FCM
         // message, here is where that should be initiated. See sendNotification method below.
     }

     /**
      * Create and show a simple notification containing the received FCM message.
      *
      * @param messageBody FCM message body received.
      */
     private void sendNotification(String messageBody) {
         Intent intent = new Intent(this, MainActivity.class);
         intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
         PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
                 PendingIntent.FLAG_ONE_SHOT);

         Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
         NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                 .setSmallIcon(R.drawable.ic_action_name)
                 .setContentTitle("FCM Message")
                 .setContentText(messageBody)
                 .setAutoCancel(true)
                 .setSound(defaultSoundUri)
                 .setContentIntent(pendingIntent);

         NotificationManager notificationManager =
                 (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

         notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());
     }

     @Override
     public void onDeletedMessages() {
         super.onDeletedMessages();
     }
 }
 ```
