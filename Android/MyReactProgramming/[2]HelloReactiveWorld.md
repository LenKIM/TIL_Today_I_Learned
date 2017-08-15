이번에 살펴볼 내용은 리액티브의 기본 사용법에 대해 알아봅시다.


### Hello Reactive World

```java
apply plugin: 'com.android.application'

android {
    compileSdkVersion 23
    buildToolsVersion "23.0.2"

    defaultConfig {
        applicationId "io.realm.test"
        minSdkVersion 15
        targetSdkVersion 23
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.1.1'
    compile 'io.reactivex:rxandroid:1.1.0'
}
```

Gradle 설정
```java
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:23.1.1'
    compile 'io.reactivex:rxandroid:1.1.0'
}
```



```java
package io.realm.simpleobservable;

import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

import rx.Observable;
import rx.Subscriber;

public class MainActivity extends ActionBarActivity {
    private static final String TAG = MainActivity.class.getName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Observable<String> simpleObservable =
                Observable.create(new Observable.OnSubscribe<String>() {
                    @Override
                    public void call(Subscriber<? super String> subscriber) {
                        subscriber.onNext("Hello RxAndroid !!");
                        subscriber.onCompleted();
                    }
                });

        simpleObservable
                .subscribe(new Subscriber<String>() {
                    @Override
                    public void onCompleted() {
                        Log.d(TAG, "complete!");
                    }

                    @Override
                    public void onError(Throwable e) {
                        Log.e(TAG, "error: " + e.getMessage());
                    }

                    @Override
                    public void onNext(String text) {
                        ((TextView) findViewById(R.id.textView)).setText(text);
                    }
                });
    }
}
```
 onNext()를 통해서 하나씩 발생되고,
 발행이 끝나면 onCompleted()로 끝나고,
 onError()를 통해 에러를 처리!

 **just()**

 3개의 AppInfo객체만 갖고 있고 이 객체를 옵저버블로 변환해 RecyclerView 아이템에 추가하고 싶다고 생각하자.

 ```java
 List<AppInfo> apps = ApplicationsList.getInstance().getList();
 AppInfo appOne = apps.get(0);
 AppInfo appTwo = apps.get(10);
 AppInfo appThree = apps.get(24);

 loadApps(appOne, appTwo, AppThree);
 ```

 여기서 loadApps를 보면 다음과 같은 구조를 가진다.

 ```java
 private void loadApps(AppInfo appOne, AppInfo appTwo, AppInfo appThree) {
   mRecyclerView.setVisibility(View.VISIABLE);

   Observable.just(appOne, appTwo, appThree)
   .subscribe(new Observer<AppInfo>() {
     @Override
     public void onCompleted(){

     }

     @Override
     public void onError(){

     }

     @Override
     public void onNext(){

     }
   })
 }
 ```

 **repeat()**

 무엇인가 반복하고 싶을 때 활용합니다.
[자세히 보기](http://reactivex.io/documentation/operators/repeat.html)

![repeat.c](http://i.imgur.com/hW0wyZ0.png)

The Repeat operator emits an item repeatedly. Some implementations of this operator allow you to repeat a sequence of items, and some permit you to limit the number of repetitions.

 **defer()**

defer()는 지연초기화(Lazy Initialization)을 제공하는 함수,
즉 구독이 발생할 때 비로소 옵저버블을 생성한다. defer()의 파라미터로 Funco<R>을 가지는데 이 함수는 구독이 발생할 때마다 호출되기 때문에 매번 새로운 옵저버블 객체가 생성된다.

![defer.c](http://i.imgur.com/xVqt9v1.png)

샘플 코드
```java
Observable<Integer> source = Observable.defer(() => {
  System.out.printIn("Create an Observable");
  return Observable.just(0);
  })

source.delaySubscription(1, TimeUnit.SECONDS)
.subscribe(
  i -> System.out.printIn("Next" + i),
  e -> System.err.printIn("Error" + i),
  () -> System.out.printIn("Completed"),
  )

source.delaySubscription(1, TimeUnit.SECONDS)
.subscribe(
  i -> System.out.printIn("Next" + i),
  e -> System.err.printIn("Error" + i),
  () -> System.out.printIn("Completed"),
  )
```

결과
Create an Observable
Next : 0
Completed

Create an Observable
Next : 0
Completed

**fromCallable()**
파라미터로 Callable을 갖는다. defer와 마찬가지로 구독이 발생할 때 Callable의 call()함수가 호출되는 지연 초기화를 위한 함수다.
![스크린샷 2017-08-08 오후 11.14.01](http://i.imgur.com/VShmYjV.png)

샘플코드
```java
Observable<String> source = Observable.fromCallable(() -> "Hello World");
source.subscribe(
i -> System.out.printIn("Next: " + i),
e -> System.err.printIn("Error: " + i),
() -> System.out.printIn("Completed ")
)

결과
Next: Hello World
Completed
```
**range()**
특정 범위 내의 정수 값을 순차적으로 발행하는 옵저버블을 생성, 파라미터로 시작 값과 개수를 갖는다.

![스크린샷 2017-08-08 오후 11.23.39](http://i.imgur.com/NIa7eOA.png)

샘플 코드
```java
Observable<Integer> source = Observable.range(1,3);

source.subscribe(
  i -> System.out.printIn("Next: " + i),
  e -> System.err.printIn("Error: " + i),
  () -> System.out.printIn("Completed ")
  )
```
결과
Next:1
Next:2
Next:3
Completed

**interval()**
특정 시간 간격을 주기로 0부터 증가하는 정수 값을 발행하다.

![스크린샷 2017-08-08 오후 11.17.17](http://i.imgur.com/RmWUme4.png)

샘플 코드
```java
Observable<Long> source = Observable.interval(1, TimeUnit.SECONDS);

source.take(3).subscribe(
  i -> System.out.printIn("Next: " + i),
  e -> System.err.printIn("Error: " + i),
  () -> System.out.printIn("Completed ")
  )
```

결과
Next : 0
Next : 1
Next : 2
Completed

**timer()**
특정 시간 이후에 숫자 0을 발행한다. 스케줄러로 computation을 사용하고, 변경 가능하다.

![스크린샷 2017-08-08 오후 11.30.17](http://i.imgur.com/CvCf3RP.png)

샘플 코드
```java
Observable<Long> source = Observable.timer(3, TimeUnit.SECONDS);
source.subscribe(
i -> System.out.printIn("Next: " + i),
e -> System.err.printIn("Error: " + i),
() -> System.out.printIn("Completed ")
)
```
