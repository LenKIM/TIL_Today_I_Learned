
## 브로드캐스트리시버 이해하기.

일단 브로드캐스트리시버를 이해하기 위해서는 Intent부터 이해하고 있어야 합니다.

>인텐트 설명

https://developer.android.com/guide/components/intents-filters.html?hl=ko#Building

안드로이드 시스템은 최대한 적은 전력을 소모함으로써 가능한 한 오랫동안 배터리를 사용할 수 있게 하려고 한다. 하지만 안드로이드 어플리케이션에서 기기를 무척 자유롭게 제어할 수 있는 만큼 각기 다른 이벤트와 기기 변경사항에 잘 반응하게 끔 개발자가 어플을 구현하는 것이 중요하다.

그러한 측면에서 브로드캐스트리시버는 굉장히 중요하다. 또한 브로드캐스트리시버에서 사용되는 이벤트들도 잘 알고있는 것이 좋다.

주로 쓰는 BroadcastReceiver Action 이름 모음
http://aroundck.tistory.com/146

안드로이드에서는 어플리케이션에서 정의한 새 Intent액션이나 안드로이드 API나 서드파드 어플리케이션에서 정의한 액션을 사용해 브로드캐스트를 보낼수 있다. 어플리케이션 내에서나 두 어플 사이에는 백그라운드로 이벤트를 보내고 싶을때는 이 방식이 좋다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.yyy.xxx.mybroadcastreceiver">


    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
            android:allowBackup="true"
            android:icon="@mipmap/ic_launcher"
            android:label="@string/app_name"
            android:supportsRtl="true"
            android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver android:name=".ConnectionReceiver">
            <intent-filter>
                <action android:name="com.yyy.xxx.mybroadcastreceiver.SOME_ACTION" />
            </intent-filter>
        </receiver>

    </application>

</manifest>

```

 일단 매니페스트에서 눈여겨 볼 것은 <intent-filter>내에 선언 된 것들과 <receiver>를 보아야한다. 이 곳에서는 어떤 브로드캐스트리시버를 등록되었는지(물론 인텐트필터를 프로그래밍적으로도 등록할수 있다.), 어떤 액티비티가 메인으로 시작되는지 알 수 있다.

```xml
<intent-filter>
    <action android:name="android.intent.action.MAIN" />

    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```

***여기서 아래 세 가지 요소 중 하나 이상을 사용하여 허용할 인텐트 유형을 지정할 수 있습니다.***

```xml
<activity android:name="ShareActivity">
    <intent-filter>
        <action android:name="android.intent.action.SEND"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:mimeType="text/plain"/>
    </intent-filter>
</activity>
```

<action>
name 특성에서 허용된 인텐트 작업을 선언합니다. 이 값은 어떤 작업의 리터럴 문자열 값이어야 하며, 클래스 상수가 아닙니다.
<data>
허용된 데이터 유형을 선언합니다. 이때 데이터 URI(scheme, host, port, path 등)와 MIME 유형의 여러 가지 측면을 나타내는 하나 이상의 속성을 사용하는 방법을 씁니다.
<category>
name 특성에서 허용된 인텐트 카테고리를 선언합니다. 이 값은 어떤 작업의 리터럴 문자열 값이어야 하며, 클래스 상수가 아닙니다.

>참고: 암시적 인텐트를 수신하려면 인텐트 필터 안에 CATEGORY_DEFAULT 카테고리를 반드시 포함해야 합니다. startActivity() 및 startActivityForResult() 메서드는 모든 인텐트를 마치 CATEGORY_DEFAULT 카테고리를 선언한 것처럼 취급합니다. 이 카테고리를 인텐트 필터에서 선언하지 않으면 액티비티에 어떤 암시적 인텐트도 확인되지 않습니다.


 그림으로 보면,

 ![브로드캐스트 그림](http://www.intertech.com/Blog/wp-content/uploads/2014/05/broadcasts.png)

 또한 브로드캐스트리시버는 서비스내에서도 startService()를 통해 핸들러를 걸쳐 만나기도 한다.

 ```java
 public class MainActivity extends AppCompatActivity {

     IntentFilter mIntentFilter;
     ConnectionReceiver mReceiver;

     @Override
     protected void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);
         setContentView(R.layout.activity_main);

         //초기화
         ButterKnife.inject(this);

         mReceiver = new ConnectionReceiver();
         mIntentFilter = new IntentFilter("len");
 //        mIntentFilter.addAction("len");
     }

     @Override
     protected void onResume() {
         super.onResume();
         registerReceiver(mReceiver, mIntentFilter);
     }

     @Override
     protected void onDestroy() {
         super.onDestroy();
         unregisterReceiver(mReceiver);
     }

     @OnClick(R.id.btn_broadcast)
     void someMethod(){
         Intent intent = new Intent("SOME_ACTION");
         sendBroadcast(intent);
     }

     @OnClick(R.id.btn_connection)
     void connection(){
 //        Toast.makeText(getApplicationContext(), "하하하",Toast.LENGTH_SHORT).show();
         Intent intent2 = new Intent("LEN");
         sendBroadcast(intent2);
     }
 }
 ```

 일반 버터나이프로 시도하였고,
과정은
1. 각 버튼에 대해 sendBroadcast()를 통해서 인텐트를 날립니다.
2. 그리고 라디오처럼 어딘가로 보낸 인텐트는 개발자가 작성한 <intent-filter>가 맞다면 해당 인텐트필터 이벤트를 실행합니다.

 이 말은 즉슨, 인텐트필터를 작성하지 않았다면 아무리 sendBroadcast를 보내도 동작하지 않는다는 말입니다.

저의 경우에는 매니페스트에 하나, 그리고 프로그래밍적으로 하나를 선언했습니다.
```xml
<receiver android:name=".ConnectionReceiver">
           <intent-filter>
               <action android:name="com.yyy.xxx.mybroadcastreceiver.SOME_ACTION" />
           </intent-filter>
       </receiver>
```
```java
mIntentFilter = new IntentFilter("len");
```

3. 이렇게 선언된 인텐트필터를 걸쳐 액션에 맞는 이벤트가 동작됩니다.

```java

public class ConnectionReceiver extends BroadcastReceiver {


    @Override
    public void onReceive(Context context, Intent intent) {

        String action = intent.getAction();
        Log.d("Action : ",  "" + intent.getAction());

        if (action.equals("SOME_ACTION")) {
            Toast.makeText(context, "Get Action from Main Activity", Toast.LENGTH_SHORT).show();
        }
        else if (action.equals("LEN")) {
            {
                ConnectivityManager cm =
                        (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

                NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
                boolean isConnected = activeNetwork != null &&
                        activeNetwork.isConnectedOrConnecting();

                if (isConnected) {
                    try {
                        Toast.makeText(context, "Network is connected", Toast.LENGTH_SHORT).show();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    Toast.makeText(context, "Network is changed or reconnected", Toast.LENGTH_LONG).show();

                }
            }
        }
    }
}
```

 이런식으로 동작합니다. intent.getAction() 메서드를 통해 해당 이벤트를 찾아 동작시킵니다.

 끝!
