## 버터나이프

사용방법
이 라이브러리의 목적은

Activity, View의 findViewById를 편하게 쓰기
View의 onClickListener 등을 편하게 쓰기

입니다. 어떤 개발자님들은 이걸 잘쓰면 handler도 편하게 쓸수 있다. 이런 말씀을 해주셨는데, 사실 제일 큰 목적은 위의 2가지라고 생각합니다.
```java
compile 'com.jakewharton:butterknife:8.5.1'
annotationProcessor 'com.jakewharton:butterknife-compiler:8.5.1'
```

 일단 버터나이프를 쓰기위해서는 위와같은 선언을 해야합니다.

 싱크를 맞쳐주고....

```java

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 *  버터나이프의 버전이 틀릴 경우에 발생하는 에러에 대해서 꼭 맞쳐야 한다!
 *  핸들러 때문에 버터나이프를 많이 사용한다.
 *
 */
public class MainActivity extends AppCompatActivity {

    @BindView(R.id.btn_2)
    Button mButton2;

    @BindView(R.id.textView2)
    TextView mTextView2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //initalization
        ButterKnife.bind(this);


        Button aa = (Button) findViewById(R.id.btn_1);
        aa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getApplicationContext(), "1번 버튼입니다", Toast.LENGTH_SHORT).show();
            }
        });
        mTextView2.setText("1234");
        TextView bb = (TextView) findViewById(R.id.textView1);
    }

        @OnClick(R.id.btn_2)
        void onClickmethod(){
            Toast.makeText(getApplicationContext(), "2번 버튼입니다",Toast.LENGTH_SHORT).show();

        }
    }
```

  위 에시에서 Annotation을 주의깊게 보쟈! 저게 바로 버터나이프다!
@BindView(R.id.textView2) 이런식으로 써서 findViewById를 작성하지 않고도 사용이 가능하다.

또한 버튼 리스터 OnClickListener의 경우도 .setOnClickListener를 사용해야 하지만

```java
@OnClick(R.id.btn_2)
void onClickmethod(){
    Toast.makeText(getApplicationContext(), "2번 버튼입니다",Toast.LENGTH_SHORT).show();

}
```
위와 같이 하여 코드량을 줄일 수 있다.

 더 많은 기능이 있지만 이는 API문서를 확인하자!
 http://jakewharton.github.io/butterknife/

 끝!
