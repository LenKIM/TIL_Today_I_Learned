# Rxjava Android 활용하기.

[참고 사이트](https://brunch.co.kr/@yudong/33) : https://brunch.co.kr/@yudong/33

`#반응형프로그래밍` `#람다식` `#자바8` `#객체지향의반대용어?`

안드로이드에서는 N부터 Java8을 지원.

*참조 사이트에서 저자가 정의한 반응형 프로그래밍이란?*

"반응형 프로그래밍은 명령형(imperative)프로그래밍의 반대말이다."

: 명령형 프로그래밍은 우리가 지금까지 해온 Java라고 생각하면 된다. 내가 원하는 동작을 하나씩 구구절절 프로그래밍하는 것. 변수, for, if, while 등의 제어문을 사용하는 것을 지양합니다.

: 명령형 프로그래밍의 반대말은 선언형(declarative)프로그래밍입니다. 대표적인 예로 SQL

"반응형 프로그래밍은 함수형 프로그래밍을 활용"

: 함수형 언어는 함수를 단지 호출하는 대상이 아닌 변수로도 할 수 있고 인자로도 넘길 수 있습니다. 어려운 말로 일급시민이라고 합니다.

"반응형 프로그래밍은 데이터의 흐름에서 시작된다."

: 사실 반응형 프로그래밍을 공부할 때 가장 와닿지 않는 말입니다. 데이터 흐름에서 시작되지 않는 프로그램이 어디 있나요? 가장 간단한 로그인 화면을 구현할 때도 사용자의 ID와 비밀번호라는 엄연한 데이터의 흐름이 존재.

 `반응형 프로그래밍은 함수형 프로그래밍 언어의 도구들을 가지고 데이터 흐름을 composable하게 구현하는 것입니다.`

---
>실습하기

```java
app의 build.gradle에 아래와 같이 설정한다.
compile 'io.reactivex.rxjava2:rxjava:2.1.0'
compile 'io.reactivex.rxjava2:rxandroid:2.0.1'
```

Hello world가 존재하는 XML 텍스트뷰를 변경해준다.
android:id="@+id/hello_text"
```java
.java안에서 TextView tv = (TextView)findViewById(R.id.hello_text);
Observable.just(tv.getText().toString()) // input
.map(s -> s + " Rx!") //operators
.subscribe(text -> tv.setText(text)) // output
```

  이렇게 하면 결과가 `Hello World! Rx!` 이렇게 나온다.

크게 3가지 부분
1) input
2) operators
3) output

1) input은 어떤 것도 가능하다. 단순하게는 문자열, 배열, ArrayList<T>등에서 좀더 복잡하게는 사용자 이벤트, ListView와 같은 UI컴포넌트, 서버와의 통신도 될 수 있다.

2) operators부분은 그것을 결과로 가공하는 것.

여기서 기존의 프로그래밍과 다른 부분을 보인다. 결과를 가공하는 코드가 기존의 for, if, while와 같은 제어문이 아닙니다.
제어문은 명령형 프로그래밍(imperative programming)의 구성요소입니다.

*메서도 체이닝(Chaining Operators)을 통해서 operators를 연속적으로 붙일 수 있습니다. 그것을 조합(compose)한다고 합니다.*

그림을 통해 각 메서드 체이닝을 설명한 사이트 : [http://rxmarbles.com/](http://rxmarbles.com/)
문서 :
[http://reactivex.io/documentation/operators.html](http://reactivex.io/documentation/operators.html)


 중요한 것은 operators를 잘 아는 것이 아니라, 중요한 것은 그것을 왜? 어디에? 써야 하는지를 아는것!
 혹은 쓰지 말아야하는지? 입니다.

아래 코드를 통해 람다 표현식을 다시한번 짚어보쟈!
 ```java
 .java안에서 TextView tv = (TextView)findViewById(R.id.hello_text);
 Observable.just(tv.getText().toString()) // input
 .map(s -> s + " Rx!") //operators
 .subscribe(text -> tv.setText(text)) // output
 ```

 1) s -> s+ " Rx!"
 2) text -> tv.setText(text);

 익명 클래스를 축약식으로 표현해놓다고 보면 된다.
 ```java
 Observable.just(tv.getText().toString())
              .map(new Func1<String, String>() {
                @Override
                public String call(String s) {
                  return s + " Rx";
                }
              })
              .subscribe(new Action1<String>(){
                @Override
                public void call(String text){
                  tv.setText(text);
                }
              });
```

*람파 표현식은 반응형 프로그래밍의 필수적이고 가장 기초적인 도구입니다.*

---

### Rx적인 생각이란?
```java
@Test
public void testGuGudan(){
    int dan = 3;

    for (int row = 1; row <=9 ; row++) {
        System.out.println(dan + " * " + row + " = " + (dan*row));

    }

    assertTrue(true);
}
```

 이것을 Rx적으로 코딩을 해보쟈.

```java
int dan = 3;
Observable.range(1,9)
          .map(row -> dan + "*" + row + "=" + (dan * row))
          .map(row -> row + '\n')
          .subscribe(guguResult::append);
```

 일단 For문이 없다.
 For문 없이 이 코드에서는 range(X,N)을 활용하였다.

 range(1,9)을 활용해 {1,2,3,4,5,6,7,8,9} 를 만들고

 이 각각에 대해서 map()이 호출됩니다.
 첫번째 map에서는 출력할 라인을 만들고 그 다음 map()에는 newline을 추가
 앞서 composable이라고 말씀드렸듯이 여러개의 map()을 추가로 붙일 수 있습니다.
 마지막 결과를 출력하기 위해서 subscribe()을 활용
원래는 `subscribe(text -> guguResult.append(text))`이였으나 생략됨

### 함수형으로 생각하는 것은 어려울까?

왜 함수형이 나왔을까?


### 구구단 완성형 코드
```java
TextView output = (TextView) findViewById(R.id.resultView);
        EditText input = (EditText) findViewById(R.id.input_guguDan);
        Button print = (Button) findViewById(R.id.printButton);

        print.setOnClickListener(v -> {
            output.setText("");
            Observable
                    .just(input.getText().toString())
                    .map(dan -> Integer.parseInt(dan))
                    .filter(dan -> 1 < dan && dan < 10)
                    .flatMap(dan -> Observable.range(1,9),
                            (dan, row) -> dan + " * " + row + " = " + (dan*row))
                    .map(row -> row + '\n')
                    .subscribe(
                            output::append,
                            e -> Toast.makeText(mContext,
                                    "GuGuDan could be between 2 and 9 dan.",
                                    Toast.LENGTH_SHORT).show());
        });
```
 여기서 핵심은 flatMap()이라고 말할 수 있다.

 ![스크린샷 2017-06-02 오후 2.01.02](http://i.imgur.com/pdi4yOH.png)

만약 생각하는 연산자가 없다면, 직접 연산자를 만들어야 한다.
이러한 직접연산자를 피하기 위해서는 내장 메서드들을 알아야하는데, 이에 대한 러닝커브가 크다.

좀 더 자세한 연산자에 대한 내용은 ![https://brunch.co.kr/@yudong/38](https://brunch.co.kr/@yudong/38) 참고하자.

기본적인 메서드등을 설명해주신다.
