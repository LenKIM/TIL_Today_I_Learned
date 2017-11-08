
## 안드로이드의 다양한 Listener

사실 내가 쓰는 리스너느 굉장히 단순했다.

오직
```java
startBtn.setOnClickListener(new View.OnClickListener() {

           @Override
           public void onClick(View v) {

           }
       });
```

이번에 조금 범위를 넓혀 보자.
`View.OnTouchListener: boolean onTouch(View v, MotionEvent event)`
`View.OnKeyListener: boolean onKey(View v, int keyCode, KeyEvent event)`
`View.OnClickListener: boolean onClick(View v)`
`View.OnFocusChangeListener: void OnFocusChange(View v, boolean hasFocus)`

### 터치 이벤트 처리하기
```java
view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                int action = motionEvent.getAction();

                float curX = motionEvent.getX();
                float curY = motionEvent.getY();

                if(action == MotionEvent.ACTION_DOWN){
                    printIn("손가락 눌림 : " + curX +  " , " + curY) ;
                } else if(action == MotionEvent.ACTION_MOVE){
                    printIn("손가락 움직임 : " + curX +  " , " + curY) ;
                } else if(action == MotionEvent.ACTION_UP){
                    printIn("손가락 땜 : " + curX +  " , " + curY) ;
                }
                return true;
            }
      });
```

터치 이벤트의 경우, View를 상속받아서 터치의 경우의 수를 활용한다.  
눌림, 움직임, 땜 등을 활용한다.

TextView를 OnTouchListener를 붙이니까 다음과 같은 에러가 경고가 발생했다.
![스크린샷 2017-11-08 오전 10.46.13](https://i.imgur.com/NANvV0y.png)
경고 내용이 테스트뷰의 경우, 이상적으로 클릭이 맞다. 라는 내용의 경고!

### 제스처 이벤트 처리하기
제스처 이벤트는 터치 이벤트 중에서 스크롤 등을 구별한 후 알려주는 이벤트이다. 제스쳐 이벤트를 처리해주는 클래스는 GestureDetetor이며 이 객체를 만들고 터치 이벤트를 전달하면 GestureDetetor 객체에서 각상황에 맞는 메소드를 호출한다.

```java
GestureDetector detector = new GestureDetector(this, new GestureDetector.OnGestureListener() {
            @Override
            public boolean onDown(MotionEvent motionEvent) {
                return false;
            }

            @Override
            public void onShowPress(MotionEvent motionEvent) {

            }

            @Override
            public boolean onSingleTapUp(MotionEvent motionEvent) {
                return false;
            }

            @Override
            public boolean onScroll(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
                return false;
            }

            @Override
            public void onLongPress(MotionEvent motionEvent) {

            }

            @Override
            public boolean onFling(MotionEvent motionEvent, MotionEvent motionEvent1, float v, float v1) {
                return false;
            }
        });
```

 가장 대표적인것이 스크롤(Scroll)과 폴딩(Fling)인데 스크롤은 손가락으로 드래그와는 일반적인 경우에 해당하고 플링은 빠른 속도로 스크롤을 하는 경우에 해당.

 스크롤은 이동한 거리값이 중요하게 처리되며 플링은 이동한 속도값이 중요하게 처리된다.

### 키 이벤트 처리하기

키 입력의 경우에는 onKeyDown()과 같은 메소드를 재정의하여 처리할 수 있다.
메소드로 전달되는 파라미터는 두 개이며, KeyCode는 어떤 키가 사용되는지 구별할 때 사용되는 KeyEvent는 키 입력 이벤트에 대한 정보를 알고 싶을 때 사용됩니다.

```java
@Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        // 시스템 [BACK]버튼이 눌렸을 경우 토스트 메시지 보여주기
        if(keyCode == KeyEvent.KEYCODE_BACK){
            Toast.makeText(this, "BACK KEY 눌림", Toast.LENGTH_SHORT).show();
        }
        return true;
    }
```

더불어 boolean onKey(View v, int keyCode, KeyEvent event) 메소드의 경우에는 뷰의 OnKeyListener 인터페이스를 구현할 때 사용

```java
public class MainActivity extends AppCompatActivity implements View.OnKeyListener{

    @Override
    public boolean onKey(View view, int i, KeyEvent keyEvent) {
        return false;
    }
  }
```

### 포커스 이벤트 처리하기

키를 입력할 때 발생하는 이벤트는 포커스(Focus)를 가진 뷰에게 전달됩니다. 이때 포커스는 화면의 보이는 뷰들 중의 하나에 부여되게 되는데 안드로이드 시스템은 일반적으로 포커스를 받은 뷰의 색상이나 표시를 바꾸어 줌으로써 구분합니다. 예를 들어, 입력상자의 역할을 하는 EditText는 포커스를 받으면 커서가 생기게됩니다.

예시 코드

```java
button_selector.xml

<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_focused="true" android:state_pressed="true" android:drawable="@drawable/ic_launcher_foreground"/>
    <item android:state_focused="false" android:state_pressed="true" android:drawable="@drawable/ic_launcher_foreground"/>
    <item android:drawable="@drawable/ic_launcher_foreground"/>
</selector>
```

```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context="yyy.xxx.com.myapplication.MainActivity"
        android:orientation="vertical"
        >


    <TextView
            android:id="@+id/textView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:background="#ff0000cc"
            android:text="포커스 받기"
            android:textSize="20dp"
            android:focusable="true"
            />

    <EditText
            android:id="@+id/editText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="텍스트를 입력"
            android:textSize="20dp"
            android:background="@drawable/button_selector"
            />

    <Button
            android:id="@+id/showButton"
            android:layout_width="160dp"
            android:layout_height="wrap_content"
            android:text="보여주기"
            android:textSize="20dp"
            android:textStyle="bold"
            />


</LinearLayout>
```

 이렇게 백그라운드로 xml을 선언하고 키를 입력할 때 발생하는 이벤트는 포커르를 가진 뷰에게 전달된다!

 항상 클릭이벤트만 써서 활용했다면 활용범위를 넓혀서 UI/UX적으로 적재적소로 활용하자.
