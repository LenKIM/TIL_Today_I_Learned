## 1. Otto as event bus system

#### 1.1. Otto as event bus system

Otto is an Open Source project designed to provide an event bus implementation so that components can publish and subscribe to events.

Otto has been a fork of the Guava event bus library from Google and been redesigned to support Android as well as possible. Unlike the Guava event bus, Otto does not consider event subscriptions from base classes or interfaces to improve performance of the library and to keep the application code simple and unambiguous.

Otto 이벤트 버스는 구글의 Guava event bus를 fork하여 리디자인된 오픈소스 라이브러리이다. Guava와는 달리, otto는 클래스나 인터페이스의 event subscriptions을 고려하지 않는다.

#### 1.2. Installation
The usage of this library in Java or Android is very simple, download the JAR and its one requirement from Download Otto and add it to the classpath of your application.

If you are using Maven or Gradle as build system you can simply add a dependency to group ID com.squareup, artifactId otto and the version 1.3.5 (current as of this writing).

#### 1.3. When to use Otto?
Otto is a great way to communicate between your activity and fragments or to communicate between an activity and a service.

=> Otto는 액티비티와 프래그먼트간의 통신 할 때, 또는 액티비티와 서비스간의 통신을 효과적으로 할 수 있는 라이브러리!

#### 1.4. How to setup Otto?
To use Otto, create a singleton instance of the Bus class and provide access to it for your Android components. This is typically done in the Application object of your Android application.

=> 안드로이드에서 사용한다고 가정하고, 오토를 사용하기 위해서는 `Bus`싱글톤 객체를 생성하고, access를 안드로이드 components에 제공해야합니다.

`public static Bus bus = new Bus(ThreadEnforcer.MAIN);`

In this example the ThreadEnforcer.MAIN parameter is used, in this case Otto enforces that events are only send from the main thread. If you want to be able to send events from any thread use the ThreadEnforcer.ANY parameter.

#### 1.5. How to register and unregister for events?
Event registration is done via the @Subcribe annotation on a public single parameter method. The method parameter is the event key, i.e., if such an data type is send via the Otto event bus the method is called.

```Java
// subscribe for string messages

@Subscribe
public void getMessage(String s) {
        Toast.makeText(this, s, Toast.LENGTH_LONG).show();
}

//subscribe for TestData messages

@Subscribe
public void getMessage(TestData data) {
        Toast.makeText(getActivity(), data.message, Toast.LENGTH_LONG).show();
}

//requires a registration e.g. in the onCreate method
bus.register(this);
```
To unregister from events use the unregister() method.

#### 1.6. How to send events
For sending events it is not necessary to register with the event bus. Simple call the post() method of the Bus class.

=> 보내는 이벤트는 이벤트버스를 등록할 필요 없다. 단순하게 post() 메소드를 통해 전송하면 된다.

```java
// post a string object
bus.post("Hello");

// example data to post
public class TestData {
        public String message;
}

// post this data
bus.post(new TestData().message="Hello from the activity");
```

#### 1.7. How can new components receive the last event?
If new components, like a dynamically created fragment, should receive event data during their creation, components can register as producer for such event data with the @Produce annotation.

=> 만약 동적으로 생성된 프로그먼트와 같은 새로운 컴포넌트가 event data를 생성하는 동안 받아야 한다면, 그 새로운 컴포넌트들은 생성자(producer)등록할 수 있다.

Event receivers must register via the register method of the Bus class.
=> 이벤트리서버는 반듯이 register method을 통해 등록되어야 한다!

```java
@Produce
public String produceEvent() {
        return "Starting up";
}
```

---
사용 후기.

일단 첫번째로, 인터페이스를 통한 프래그먼트와 액티비티간의 값 전달 코딩 부분이 없다. 그게 가장 큰 장점일거같다.
그러나, 단점으로는 디버깅을 하기위해 트래킹을 해야하는데, 이를 해결하기가 힘들다.

특히 안드로이드 스튜디오와 같은 Lint를 쓰는 곳에서는 개발자 머리속에서 확인해야한다.

#### Example
**Main Activity**
```java
package otto.library.java.vogella.com.myottotutorial;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.squareup.otto.Bus;
import com.squareup.otto.Subscribe;
import com.squareup.otto.ThreadEnforcer;

public class MainActivity extends AppCompatActivity {

    public static Bus sBus;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (savedInstanceState == null) {
            getFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholdrFragment()).commit();
        }

        sBus = new Bus(ThreadEnforcer.MAIN);
        sBus.register(this);
    }

    @Subscribe
    public void getMessage(String s) {
        Toast.makeText(this, s + "getgetget", Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            TestData t = new TestData();
            t.message = "Hello from the activity";
            sBus.post(t);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public class TestData {
        public String message;
    }
}
```

**PlaceholdrFragment**
```java
public class PlaceholdrFragment extends Fragment {

    public PlaceholdrFragment() {

    }
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_main,
                container, false);
        View button = rootView.findViewById(R.id.fragmentbutton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MainActivity.sBus.post("Hello from the Fragment");
            }
        });
        MainActivity.sBus.register(this);
        return rootView;
    }

    @Subscribe
    public void getMessage(MainActivity.TestData data) {
        Toast.makeText(getActivity(), data.message, Toast.LENGTH_SHORT).show();
    }

    @Produce
    public String produceEvent(){
        return "Starting up";
    }
}
```
