## 왜 세미포어가 생겼나?

프로세스 간 메시지를 전송하거나, 공유메모리를 통해 특정 데이터를 공유하게 되는 경우 문제가 발생할 수 있습니다. 즉, 공유된 자원에 여러 개의 프로세스가 동시에 접근하면서 문제가 발생하는 것으로써 공유된 자원 속 하나의 데이터는 한 번에 하나의 프로세스만 접근할 수 있도록 제한해 두어야 하기 때문에, 이를 위하여 고안된 것이 바로 **Semaphore** 입니다.



*Cf) 세마포어와 뮤텍스의 차이는?*

세마포어는 공유된 자원의 데이터를 여러 프로세스가 접근하는 것을 막는 것.

뮤텍스는 공유된 자원의 데이터를 한 쓰레드가 접근하는 것을 막는 것.



**컴퓨터가 여러 프로그램을 동시에 수행하는 다중 프로그래밍 시스템에서는 프로세스들간의 상호배제와 동기화를 위한 기본적인 연산이 필요하게 되고 세마포어는 여러 프로세스들에 의해 공유되는 변수로 정의됩니다.**

```
procedure P(S){
 	while(S <= 0){ do wait} => 최초 S값은 1
 	S = S - 1  => S가 0이면 1이 될 때까지 wait
 	end P => S를 0로 만들어 다른 프로세스가 들어오지 못하도록 함.
}

procedure V(S){  => 현재 상태는 S가 0
 	S = S + 1 => S를 1로 원위치시켜 해제하는 과정
 	end V => 이제는 다른 프로세스가 들어 올 수 있음
}

```



즉, 한 프로세스가 P나 V를 수행하는 동안에는 프로세스가 인터럽트를 당하지 않게 됩니다. 이제 P와 V를 사용하면 다음과 같이 위험지역에 대한 상호배제를 구현할 수 있게 됩니다.

P(S);

위험지역(Critical Section) = 임계영역

V(S);



최초의 S값은 1이고, 위와 같은 위험지역을 포함하는 두 개의 프로세스 A와 B가 있다고 할 때, A와 B는 서로 독립적으로 수행되지만, 두 프로세스가 동시에 위험 지역으로 들어가서는 안된다.  

위와 같이 세미포어를 사용하면 P(S)를 먼저 수행하는 프로세스가 S를 0으로 해놓고 위험지역에 들어가므로 나중에 도착하는 프로세스는 P에서 더이상 진행되지 못하고 기다리게 된다. 먼저 들어갔던 프로세스가 V(S)를 해주어야 비로서 P(S)에서 기다리던 프로세스가 위험지역에 들어갈 수 있고 따라서 상호배제가 실현.



“Mutual Exclusion 으로 상호배제라고도 한다. Critical Section을 가진 쓰레드/프로세스들의 Runnig Time이 서로 겹치지 않게 각각 단독으로 실행되게 하는 기술입니다. 다중 프로세스들의 공유 리소스에 대한 접근을 조율하기 위해 locking과 unlocking을 사용합니다. 



**뮤텍스란(Mutex)? **



즉, 쉽게 말하면 뮤텍스 객체를 두 쓰레드/프로세스간에 동시에 사용할 수 없다는 의미입니다.

 

**세마포어란?(Semaphore) **

” 세마포어는 리소스의 상태를 나타내는 간단한 카운터로 생각할 수 있습니다. 일반적으로 비교적 긴 시간을 확보하는 리소스에 대해 이용하게 되며, 유닉스 시스템의 프로그래밍에서 세마포어는 운영체제의 리소스를 경쟁적으로 사용하는 다중 프로세스에서 행동을 조정하거나 또는 동기화 시키는 기술입니다. 

세마포어는 운영체제 또는 커널의 한 지정된 저장장치 내 값으로서, 각 프로세스는 이를 확인하고 변경할 수 있습니다. 확인되는 세마포어의 값에 따라, 그 프로세스가 즉시 자원을 사용할 수 있거나, 또는 이미 다른 프로세스에 의해 사용 중이라는 사실을 알게 되면 재시도하기 전에 일정 시간을 기다려야만 합니다. 세마포어는 이진수 (0 또는 1)를 사용하거나, 또는 추가적인 값을 가질 수도 있습니다. 세마포어를 사용하는 프로세스는 그 값을 확인하고, 자원을 사용하는 동안에는 그 값을 변경함으로써 다른 세마포어 사용자들이 기다리도록 해야합니다.



**Mutex와 Semaphore의 차이점은 ?**

1. Semaphore는 Mutex가 될 수 있지만 Mutex는 Semaphore가 될 수 없다.(Mutex는 상태가 0,1 두 개뿐인 Binary Semaphore)
2. Semaphore는 소유할 수 없는 반면, Mutex는 소유가 가능하며 소유주가 이에 대한 책임을 집는다.(Mutex의 경우 상태가 두개 뿐인 lock이므로 lock을 '가질'수 있다.)
3. Mutex의 경우 Mutex를 소유하고 있는 쓰레드가 이 Mutex를 해제할 수 있습니다. 하지만 Semaphore의 경우 이러한 Semaphore를 소유하지 않는 쓰레드가 Semaphore를 해제 할 수 있습니다.
4. Semaphore는 시스템 범위에 걸쳐있고 파일시스템상의 파일 형태로 존재, 반면 Mutex는 프로세스 범위를 가지며 프로세스가 종료될 때 자동으로 Clean up된다.



★★★ 가장 큰 차이점은 관리하는 동기화 대상이 갯수입니다. Mutex는 동기화 대상이 오직 하나뿐일 때, Semaphore는 동기화 대상이 하나 이상일 때 사용합니다.



뮤텍스란 MUTual EXclusion. 말 그대로 "상호 배제"로 해석 된다.
가장 쉽게 생각하자면 중복 실행 금지 프로그램이라고 생각하면 될지도.
윈도우에 프로그램을 하나만 띄워야 하는 프로그램을 만들거나, 
실행 되고 있는 프로그램을 다시 실행 했을 경우 "실행 중인 해당 프로그램을 보여주거나" "이미 실행 되었다는 메시지"를 뿌려 주는 식이라고 가정한다면 뮤텍스를 사용 하는것이 좋다.
윈도우 서비스용 프로그램이 대표적인 예라고 할 수 있다.(2번 이상 동시에 실행이 되진 않으니까..)

그러면 세마포어(semaphore: 수신호)는?  
한 컴퓨터에 사용자가 노트장이라는 프로그램을 최대한 5개만 실행 되도록 개발 하고 싶다면 바로 세마포어를 써야 한다.
여기서 "최대한 5개만" 이라는 5의 수치는 임계세션(Critical Section)의 계수이고 이런 임계세션을 관리 하는 것을 계수 세마포어라고 하며 세마포어 중 하나인 것이다.

사용자가 notepad.exe를 실행 명령에 20번을 입력하고 동시에 실행 시키려 한다면, 5번만 실행 되고 15번은 무시 되게 하거나, 5번을 실행 하고 하나씩 종료 될 때를 기다렸다가 순차적으로 15개의 노트장을 실행 시켜 줄 수도 있다. 

다시 정리 하자면 뮤텍스는 상호배제 알고리즘으로 synchronization로 만든 블록 사이의 로직이 실행이 다 끝날 때까지 락을 걸어 사용한다고 했을 때,

세마포어는 상호배제 알고리즘을 사용하나 거기에 임계영역에 대한 범위를 만들어서 자원을 보호한다고 생각하면 된다.
참고로 이진 세마포어에서 임계섹션이 0과 1을 갖는 쓰레드나 프로세스는 뮤텍스라고 생각해도 무방하다.



```java
import java.util.Random;
import java.util.concurrent.Semaphore;

public class Main {
    private static final Random rd = new Random(10000);

    static class Log {
        public static void debug(String strMessage) {
            System.out.println(Thread.currentThread().getName() + " : " + strMessage);
        }
    }

    class SemaphoreResource extends Semaphore {
        private static final long serialVersionUID = 1L;

        public SemaphoreResource(final int permits) {
            super(permits);
        }

        public void use() throws InterruptedException {
            acquire(); // 세마포어 리소스 확보

            try {
                doUse();
            } finally {
                release(); // 세마포어 리소스 해제
                Log.debug("Thread 종료 후 남은  permits: " + this.availablePermits());
            }
        }

        protected void doUse() throws InterruptedException {
            // 임의의 프로그램을 실행하는데 거리는 가상의 시간
            int sleepTime = 100;
            Thread.sleep(sleepTime); // 런타임 시간 설정
            Log.debug(" Thread 실행..................." + sleepTime);
            /** something logic **/
        }
    }

    class MyThread extends Thread {
        private final SemaphoreResource resource;

        public MyThread(String threadName, SemaphoreResource resource) {
            this.resource = resource;
            this.setName(threadName);
        }

        @Override
        public void run() {
            try {
                resource.use();
            } catch (InterruptedException e) {
            }
        }
    }

    public static void main(String... s) {
        System.out.println("Test Start...");
        SemaphoreResource resource = new Main().new SemaphoreResource(1);
        for (int i = 0; i < 20; i++) {
            new Main().new MyThread("Thread-" + i, resource).start();
        }
    }
}
```

