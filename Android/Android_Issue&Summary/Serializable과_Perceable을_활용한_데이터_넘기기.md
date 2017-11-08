# Serializable 과 Parcelable
Java의 기본 요소

다음 두개는 데이터를 직렬화하여 타 클래스 또는 액티비티에 넘겨줄 때 활용할 수 있다.

두 액티비티간에 데이터를 전달할 때 Bundle 객체를 활용한다.

Bundle객체는 해시테이블과 유사해서 putExtra(), getXXXextre()메서도로 넣거나 뺀다.

이거 여기까지는 잘알지만,

기본 자료형의 경우 그냥 쓰면된다.
그렇다면 수정된 클래스라면? 또는 엄청난 미디어라면? 어떻게 넘겨줄꺼지?
바이트 배열?

**전달하고 싶은 데이터가 기본 자료형이 아니라 객체(Object)자료형인 경우에는 객체 자체를 전달할 수 없습니다.**
따라서 객체의 데이터들을 바이트 배열로 변환하여 전달하거나 또는 Serializable인터페이스를 구현하는 객체를 만들어 직렬화한 후 전달할 수 있습니다. 직렬화 방법은 표준 자바에서도 해봤지만, 안드로이드에서는 Serializable인터페이스와 유사한 Parcelable을 권장한다. 이유는 직렬화했을 때 크기가 작아 안드로이드 내부의 데이터 전달에 자주 사용됩니다. 이 인터페이스를 사용하면 데이터를 전달하기 위해 객체를 직접 번들에 추가할 수 있습니다. Parcelable
인터페이스를 구현하여 객체를 직접 전달하려면 다음과 같은 두 가지 메소드를 구현해야 한다.

```Java
public abstract int describeContent();
public abstract void writeToParcel(Parcel dest, int flag);
```

writeToParcel()메소드는 객체가 가지고 있는 데이터를 Parcel 객체로 만들어 주는 역할.
이 Parcel 객체는 Bundle 객체처럼 readOOO()와 writeOOO() 형태를 가진 메소드를 제공하므로 기본 테이터 타입을 넣고 확인할 수 있도록 합니다. 위의 두 가지 메소드를 구현했다면 CREATOR라는 상수를 만들어야 하는데 이 상수는 Parcel 객체로부터 데이터를 읽어 들여 객체를 생성하는 역할을 합니다. 이 객체는 상수로 정의되므로 반드시 static final로 선언되어야 합니다.

전달하고자 하는 클래스의 Parcelable 을 구현한 클래스가 있어야 한다. 예시로
```java
package yyy.xxx.com.myapplication;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by len on 2017. 11. 8..
 */

public class SimpleData implements Parcelable {

    int number;
    String message;

    public SimpleData(int number, String message) {
        this.number = number;
        this.message = message;
    }

    //Parcel 객체에서 읽기
    protected SimpleData(Parcel in) {
        number =  in.readInt();
        message = in.readString();

    }

    @Override
    public int describeContents() {
        return 0;
    }

    //Percel객체로 쓰기
    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeInt(number);
        parcel.writeString(message);
    }
    //CREATOR 상수 정의
    public static final Creator<SimpleData> CREATOR = new Creator<SimpleData>() {
        @Override
        public SimpleData createFromParcel(Parcel in) {
            //SimpleData 생성자를 호출해 Parcel 객체에서 읽기
            return new SimpleData(in);
        }

        @Override
        public SimpleData[] newArray(int size) {
            return new SimpleData[size];
        }
    };

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

```
MainActivity에서 다음과같이 선언한다.
```java
public void onButton1Clicked(View v){
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);

        SimpleData data = new SimpleData(100, "Hello Android");
        intent.putExtra(KEY_SIMPLE_DATA,data);
        startActivityForResult(intent, REQUEST_CODE_MENU);
    }
```

그러면 SubMainActivity에서는
```java
package yyy.xxx.com.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity{

    private static final String KEY_SIMPLE_DATA = "data";
    TextView mTextView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = findViewById(R.id.textView);
        Button button = findViewById(R.id.showButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent();
                intent.putExtra("name", "mije");

                //응답을 전달받고 종료
                setResult(RESULT_OK, intent);
                finish();
            }
        });

        //메인 액티비티로부터 전달 받은 인텐트를 확인
        Intent intent = getIntent();
        processIntent(intent);
    }

    private void processIntent(Intent intent) {
        if(intent != null){
            //인텐트 안의 번들 객체를 참조합니다.
            Bundle bundle = intent.getExtras();

            //번들 객체 안의 SimpleData 객체를 참조
            SimpleData data = (SimpleData) bundle.getParcelable(KEY_SIMPLE_DATA);
            //텍스트뷰에 값을 보여줍니다

            mTextView.setText("전달 받은 데이터 \n number : " + data.getNumber() + "\nMessage : " + data.getMessage());
        }
    }
}
```
같이 활용할 수 있다.

이번에는 Serializable은?

```java
public class User implements Serializable{
    private String name;
    private transient String password;
    private String email;
    public int age;

    public User(String name, String password, int age) {
        this.name = name;
        this.password = password;
        this.age = age;
    }

    public String toString() {
        return "(" + name + ", " + password + ", " + email + ", " + age + ")";
    }
}

public class MainClass {
    private static final String USERINFO_SER = "user.ser";

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        conductSerializing();
        conductDeserializing();
    }

    public static void conductSerializing() {
        try {
            FileOutputStream fos = new FileOutputStream(USERINFO_SER);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            ObjectOutputStream out = new ObjectOutputStream(bos);

            User u1 = new User("이방원", "1234", "lby@abc.com", 30);
            User u2 = new User("무휼", "8877", "mh1398@abc.com", 25);

            ArrayList list = new ArrayList<>();
            list.add(u1);
            list.add(u2);

            out.writeObject(u1);
            out.writeObject(u2);
            out.writeObject(list);
            out.close();
            System.out.println("직렬화 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void conductDeserializing(){
        try {
            FileInputStream fis = new FileInputStream(USERINFO_SER);
            BufferedInputStream bis = new BufferedInputStream(fis);
            ObjectInputStream in = new ObjectInputStream(bis);

            User u1 = (User) in.readObject();
            User u2 = (User) in.readObject();
            ArrayList list = (ArrayList) in.readObject();

            System.out.println(u1.toString());
            System.out.println(u2.toString());
            System.out.println("count :: " + list.size());
            System.out.println(list.toString());

            in.close();
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}


출처: http://flowarc.tistory.com/entry/Java-객체-직렬화Serialization-와-역직렬화Deserialization [Blank의 빈 공간]

참고: http://cafe369.daum.net/_c21_/bbs_search_read?grpid=1MWA2&fldid=aAfL&datanum=73&contentval=&docid=1MWA2aAfL7320110321094557
```
