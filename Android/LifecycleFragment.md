
# LifecycleFragment

LifecycleFragment이란?


![스크린샷 2017-05-28 오전 11.35.29](http://i.imgur.com/lVq5wz2.png)


This class is a temporary implementation detail until Lifecycles are integrated with support library.

이 클래스는 일시적 실행 항목이다. 라이프사이클이 서포트라이브러리와 함께 통합되기 전 까지?

 이것만 보면 정확히 어떤 말인지 모르나, 한번 자세히 살펴보자.

![스크린샷 2017-05-28 오전 11.39.53](http://i.imgur.com/FoGwMRx.png)

 여기서 주의해서 볼 것이 있는데,
 ### android.arch.lifecycle
 바로 이 패키지이다

 흔히 우리가 알고 있는 라이프라이클은 override를 해서 처음 액티비티 접근할때 동작하는 단계가 onCreate onStart onResume onPause onStop onDestory 을 알고 있다.

 근데, 현제 내가 어떤 라이프사이클에 있는지 알고 싶을때, 위의 패키지를 뜯어보면 좋은 함수들이 있다.

 즉 LifecycleFragment는 위의 패키지를 담고있는 Fragment라고 보면 된다.

 ```java
 //
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package android.arch.lifecycle;

import android.arch.lifecycle.LifecycleObserver;
import android.support.annotation.MainThread;

public abstract class Lifecycle {
    public Lifecycle() {
    }

    @MainThread
    public abstract void addObserver(LifecycleObserver var1);

    @MainThread
    public abstract void removeObserver(LifecycleObserver var1);

    @MainThread
    public abstract Lifecycle.State getCurrentState();

    public static enum State {
        DESTROYED,
        INITIALIZED,
        CREATED,
        STARTED,
        RESUMED;

        private State() {
        }

        public boolean isAtLeast(Lifecycle.State state) {
            return this.compareTo(state) >= 0;
        }
    }

    public static enum Event {
        ON_CREATE,
        ON_START,
        ON_RESUME,
        ON_PAUSE,
        ON_STOP,
        ON_DESTROY,
        ON_ANY;

        private Event() {
        }
    }
}
 ```

 이걸 보면, 어떤 메소드가 있는지 볼수 있다.

 또한 이벤트열거형을 보고 어떤 라이프사이클에서 이벤트를 열고 싶다면 이를 활용하면 좋을듯!

 ```java
 private final ProductClickCallback mProductClickCallback = new ProductClickCallback() {
    @Override
    public void onClick(Product product) {

        if (getLifecycle().getCurrentState().isAtLeast(Lifecycle.State.STARTED)) {
            ((MainActivity) getActivity()).show(product);
        }
    }
};
 ```

위와 같이 사용 가능하다.

현재 내가 어떤 라이프사이클에 위치하는지 파악가능하고, 이를 통해 어떤 이벤트||상태를 확인||구현 가능하다 :)
