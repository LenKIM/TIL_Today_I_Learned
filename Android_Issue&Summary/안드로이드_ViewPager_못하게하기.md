
문제.

처음 로직대로 ViewPager를 활용해서 만들었으나,
지도 맵이 들어가면서 ViewPager가 쓸 데없이 동작하는 문제가 발생했다.

그래서 이걸 어떻게 할까하다가, 차라리 ViewPager를 없애는 방안으로 가려고했는데, 그러면 이미 만들어져 있는 기능이 엎기가 무리가 있어 ViewPager에 활성화/비활성화 기능을 추가하는 방안으로 나갔다.

아래 스택오버플로우를 보고 참고하였다.

```java
package com.yyy.xxx.airspace;

import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * Created by len on 2017. 4. 27..
 */

public class CustomViewPager extends ViewPager {
        private boolean enabled; //이 것이 스크롤을 막아주는 중요 변수!

        public CustomViewPager(Context context, AttributeSet attrs) {
            super(context, attrs);
            this.enabled = true;
        }

        @Override
        public boolean onTouchEvent(MotionEvent event) {
            try {
                if (this.enabled) {
//				Log.i("INFO", "스크롤 중..");
                    return super.onTouchEvent(event);

                }
            } catch (Exception e) {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String exceptionAsStrting = sw.toString();
                Log.e("INFO", exceptionAsStrting);
            }
            return false;
        }


        @Override
        public boolean onInterceptTouchEvent(MotionEvent event) {
            if (this.enabled) {
                return super.onInterceptTouchEvent(event);
            }
            return false;
        }
        public void setPagingEnabled() { //이 메소드를 이용해서 스크롤을 풀어주고
            this.enabled = true;
        }
        public void setPagingDisabled() { //이 메소드를 이용해서 스크롤을 막아줍니다.

        this.enabled = false;

        }
    }
```

이렇게하고 xml 레이아웃에서도 그냥 ViewPager가 아니라 CustomViewPager로 변경해야됨을 명심하지.

끝!

아아, 한가지 더, 활용방법은 setPagingDisabled() / setPagingEnabled()를 활용해서 사용할 수 있다.
