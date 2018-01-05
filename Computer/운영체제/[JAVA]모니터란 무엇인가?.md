## 자바 모니터

자바 스레드 동기화 모델은 "모니터"라는 개념을 적용하고 있다. 모니터에 대해서 먼저 간단하게 살펴보고 자바 동기화에 대해 상세하게 살펴보자.  



참고 사이트 : http://kiwi99.tistory.com/22?category=375710

![](https://ws4.sinaimg.cn/large/006tNc79gy1fn594q82z1j310w0psqm9.jpg)

**Monitor(모니터)의 개념**

-  하나의 데이터(객체)마다 하나의 모니터를 결합할 수 있으며, 모니터는 그것이 결합된 데이터(객체)가 동시에 두개 이상  의 스레드에 의해 접근 할 수 없도록 막는 잠금(lock)기능을 제공함으로써 동기화를 수행한다는 것이 주된 내용이다.


-  즉, 데이터(객체)에 모니터를 결합하면 하나의 스레드가 그 데이터를 사용하는 동안에는 다른 스레드들이 그 데이터를 사              용할 수 없게 된다.


- 자바에서는 synchronized메소드가 선언된 객체와 synchronized블럭에 의해 동기화되는 모든 객체에 고유한 모니터가 결합이 되어 동기화 작업을 수행하게 된다.



**모니터의 구성**

- 스레드 단위로 모니터락을 획득하거나(acquire lock) 반환한다.(release lock)
- 동기화 코드(동기화메소드나 블럭)를 수행할 때에는 동기화 대상 인스턴스와 결합된 Monitor Lock을 획득한 후에 진입이 가능하며, 동기화 코드를 벗어날 때에는 Monitor Lock을 반환하게 된다.


-  동기화 대상 인스턴스별로 이와 결합된 Monitor가 존재하며 해당 모니터는 현재 락을 획득한 스레드와 Lock Count정보를 관리한다.


- 모니터가 Lock Count정보를 유지한다는 것은 동일 스레드가 중복해서 lock을 걸수 있다는 의미이다     



![](https://ws4.sinaimg.cn/large/006tNc79gy1fn598tz4n9j310o0pe7f3.jpg)

**Monitor와 스레드 대기 자료구조 2가지**

- 모니터는 락을 획득하기 위해 시도하는 스레드를 대기시키기 위한 자료구조와 조건변수(Conditional Variable)로서의역할을 수행하기 위해 특정조건이 만족될 때까지 스래드를 대기시키기 위한 자료구조를 가지고 있다.          

​          **1) EntrySet(진입셋)**
​              ㅇ 자바 공식 교제에서는 LOCK-POOL이라는 명칭을 사용
​              ㅇ 모니터락을 기다리는 스레드를 담아두기 위한 자료구조
​          **2) WaitSet(대기셋)**
​              ㅇ 자바 공식 교제에서는 WAIT-POOL이라는 명칭을 사용
​              ㅇ 모니터가 notify(notifyAll)해줄 때까지 기다리는 스레드를 담는 자료구조



2.  자바 Monitor의 동작과정

   **A. 모니터 락 회득(acquire) 및 반환(release) 과정**

   ![](https://ws1.sinaimg.cn/large/006tNc79gy1fn59c6lekkj310m0qo4cm.jpg)

   1) 한 스레드가 동기화 코드 영역(synchronized method or block)에 접근하기 위해 EntrySet에 진입한다.  

   - Runnable 상태 -> BLOCKED상태

   2) 모니터락을 소유한 스레드가 있다면 해당 스레드가 모니터락을 반환할 때까지 EntrySet에서 대기한다.

   - BLOCKED상태

   3) 모니터락을 소유한 스레드가 없다면 EntrySet에서 대기하던 스레드 중 하나의 스레드가 선택되어 모니터락을 획득하고 실행을 하게 된다. 동기화 코드영역을 벗어나면서 소유한 모니터락을 반환한다.

   - 선택된 스레드 : Runnable 상태, 나머지 스레드 : BLOCKED 상태

     ​

   **B. 조건에 따른 스레드 처리 과정**

   ![](https://ws4.sinaimg.cn/large/006tNc79gy1fn59ghdvb3j31100uitpe.jpg)

   1) 한 스레드가 모니터락을 획득하고 동기화 코드 영역(synchronized method or block)에 진입  

   - Runnable 상태

   2) 조건이 만족되지 않아 현재 스레드를 대기(wait(), wait(long)호출)시키면 해당 스레드는 소유한 모니터락을 반환한 후 WaitSet에서 대기한다. 락을 반환하는 이유는 조건이 만족되기 위해서는 다른 스레드가 접근해서 무엇가 작업을 해주어야 하기 때문에 반환을 하는 것이다.

   - Runnable 상태 -> WAITING / TIMED-WAITING 상태

   3) 다른 스레드가 모니터락을 획득하여 동기화 코드 영역에 진입, 작업을 수행한 후 WaitSet에서 대기중인 스레드에게 그 사실을 알리기 위해 신호(notify(), notifyALL())를 보낸다.

   4) WaitSet에서 대기하던 스레드는 신호를 받으면 WaitSet에서 EntrySet으로 옮겨진다. 왜냐하면 다시 실행을 하기 위해서는 모니터락을 획득해야 하기 때문에 EntrySet으로 옮겨진 것이다. 신호를 보낸 스레드가 동기화 코드 영역을 벗어나면(모니터 락을 반환하면) EntrySet에서 대기하던 스레드 중 하나의 스레드가 선택되어 모니터락을 획득하고 실행을 하게 된다.

   - 선택된 스레드 : Runnable상태, 나머지 스레드 : BLOCKED상태

   **주의!!! 선택이 되지 않았다고 다시 WAITING / TIMED-WAITING상태로 가는 것이 아니다. 신호(notify()/notifyAll())를 받는 시점에서 WaitSet에서 EntrySet으로 이동을 했으므로 락을 얻기 위해 대기하는 BLOCKED상태가 되는 것이다.**


3. 자바 Monitor가 지원하는 동기화

ㅇ 자바 모니터는 다음 두가지 동기화를 모두 지원해 주고 있다. 
​     **A.  Mutual Exclusion(상호배제)**

- 상호배제라는 것은 둘 이상의 스레드가 임계영역에 동시에 접근하는 것을 막는 것을 말한다.
- 다수의 스레드가 데이터를 공유할 때 서로 간섭없이 접근하고자 할때 필요하다.
- 동기화코드(동기화 메소드 또는 블럭)를 통해 동기화 대상 인스턴스의 Lock을 얻은 스레드만이 임계영역에 접근이 가능하며, Lock을 얻지 못한 스레드는 EntrySet(Lock Pool)에서 대기하였다가 다음 기회에 Lock을 얻기 위해 경쟁하게 된다.

​     **B. Cooperation(협력)**

- 모니터가 조건변수의 역할을 수행, 멀티스레드간 공유데이터의 동시접근을 막을 뿐만이 아니라 접근 순서도 컨트롤   하는 것을 말한다.
- 같은 목적을 가진 스레드간에 협력해서 효율적으로 작업을 할 수 있도록 하겠다 라는 의미이다. 생산자-소비자 스레드를 생각해보면 단순히 상호배제만을 해서는 부족하다. 즉 동시접근도 차단하고 생산자스레드가 생산을 했을 때 소비자 스레드에게 이를 알려서 작업을 할 수 있도록 해 주는 것이 필요하다. 이런 것이 바로 스레드간의 협업이다.


- 동기화 대상 인스턴스의 wait() / notify() / notifyall()메소드를 이용하여 스레드간 접근 순서 컨트롤을 수행할 수 있다.

```Java

## 상호 배제를 활용한 동기화 방식
public class Thread_Sync_01_03 {
    /**
     * 1. 동기화메소드방식을 이용한 동기화테스트
     * - counter를 증가시키는 스레드와 감소시키는 스레드를 동일한 횟수로 동작시켜서
     * 그 결과를 확인해본다. 정상적인 동기화 처리가 되었다면 늘 결과 count는 0가
     * 되어야 한다.
     */
    public static void test_01() {
        final Main counterObj = new Main();

        Thread t1 = new Thread("Increase-Thread") {
            public void run() {
                for (int i = 0; i < 20; i++) {
                    counterObj.increase1();
                }
            }
        };

        Thread t2 = new Thread("Decrease-Thread") {
            public void run() {
                for (int i = 0; i < 20; i++) {
                    counterObj.decrease1();
                }
            }
        };

        long startTime = System.currentTimeMillis();
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
        }
        long endTime = System.currentTimeMillis();
        System.out.println("총 처리시간(ms) : " + (endTime - startTime));
    }

    /**
     * 2. 동기화블럭을 이용한 동기화 테스트
     */
    public static void test_02() {
        final Main counterObj = new Main();

        Thread t1 = new Thread("Increase-Thread") {
            public void run() {
                for (int i = 0; i < 20; i++) {
                    counterObj.increase2();
                }
            }
        };

        Thread t2 = new Thread("Decrease-Thread") {
            public void run() {
                for (int i = 0; i < 20; i++) {
                    counterObj.decrease2();
                }
            }
        };

        long startTime = System.currentTimeMillis();
        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
        }
        long endTime = System.currentTimeMillis();
        System.out.println("총 처리시간(ms) : " + (endTime - startTime));
    }

}
/**
 * 1. couter정보를 공유하는 클래스
 * - 동기화메소드방식으로 동기화한 메소드
 * - 동기화블럭방식으로 동기화한 메소드
 *
 * @author 정일영(kiwi99kr @ gmail.com)
 */
class Main {
    private int counter;

    /**
     * 1. 동기화메소드를 이용한 counter증가 메소드
     */
    public synchronized void increase1() {
        //sleep을 준 이유는 값을 증가시키기 전에 처리하는 작업을 가정한 것임
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
        }
        counter++;
        System.out.println("[" + Thread.currentThread().getName() + "] : " + this.counter);
    }

    /**
     * 2. 동기화메소드를 이용한 counter증가 메소드
     */
    public synchronized void decrease1() {
        //sleep을 준 이유는 값을 감소시키기 전에 처리하는 작업을 가정한 것임
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
        }
        counter--;
        System.out.println("[" + Thread.currentThread().getName() + "] : " + this.counter);
    }

    /**
     * 3. 동기화블럭을 이용한 counter증가 메소드
     */
    public void increase2() {
        //sleep을 준 이유는 값을 증가시키기 전에 처리하는 작업을 가정한 것임
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
        }
        synchronized (Main.this) {
            counter++;
            System.out.println("[" + Thread.currentThread().getName() + "] : " + this.counter);
        }
    }

    /**
     * 4. 동기화블럭을 이용한 counter증가 메소드
     */
    public synchronized void decrease2() {
        //sleep을 준 이유는 값을 감소시키기 전에 처리하는 작업을 가정한 것임
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
        }
        synchronized (Main.this) {
            counter--;
            System.out.println("[" + Thread.currentThread().getName() + "] : " + this.counter);
        }
    }


    /**
     * 두 테스트 결과를 보면, 동기화블럭방식(test_02())을 이용한 총 처리시간이 당연히
     * 짧음을 알 수 있다. 동기화 코드 영역을 최소한으로 가져감으로써 그만큼 동시성이
     * 향상된 결과이다.
     */
    public static void main(String[] ar) {
//        Thread_Sync_01_03.test_01();
        Thread_Sync_01_03.test_02();
    }
}

```



두번째는 협업에 의한 동기화 방식.

1. 협업(Cooperation)을 하기 위한 동기화

- 스레드간의 접근순서를 동기화하기 위해서는 Object클래스에 정의되어 있는 wait및 notify계역 메소드를 이용할 수 있다.

2. Object클래스의 스레드 컨드롤 메소드를 살펴보자.

![](https://ws4.sinaimg.cn/large/006tNc79gy1fn5ac8os6ij312c13gtt7.jpg)



A. `public final void wait() throws InterruptedExeption` 

- 다른 스레드가 대상 객체에 대하여 notify() 또는 notifyAll()메소드를 호출할 때까지 대기한다.
- 내부 처리과정을 살펴보면 다음과 같다.
  1. wait()를 호출하려면, 먼저 동기화 대상 인스턴스에 결합된 모니터락을 소유하고 있어야 한다. 즉 동기화 코드 영역내에 진입을 한 상태에서 호출하여야 한다. 그렇지 않으면 IIIegalMonitorStateException이 발생한다.
  2. wait()를 호출한다는 의미는 "대상객체의 특정조건이 만족할 때까지 대기하겠다"라는 의미이므로 먼저 다른 스레드에 의해서 대상객체에 어떤 작업을 수행 할 수 있도록 모니터락을 해제한다.
  3. 해당 모니터의 WaitSet(wait-pool)에 등록되어 대기한다.
  4. 다른 스레드에 의해 동기화 대상 인스턴스의 notify() 또는 notifyAll()메소드가 호출될 때까지 대기한다.
  5. 다른 스레드에 의해 notify() 또는 notifyAll()이 되면, 해당 모니터의 WaitSet에서 대기하던 스레드는 하나 또는 전체가 EntrySet으로 이동한 후, notify를 호출한 스레드가 모니터락을 반환하게 되면 EntrySet에서 대기하던 스레드들은 모니터락을 얻기 위해 경쟁한다.

B. `public final void wait(long timeout) throws InterruptedException`

- 다른 스레드에 의해 notify될 때까지 지정한 시간동안 현재 스레드를 대기시키는 메소드

C. `public final void notify()`

- 소유한 모니터(락)의 WaitSet(Wait-pool)에서 대기중인 스레드중 하나의 스레드를 실행가능 하도록 깨워준다.(Wakeup).
- 좀 더 정확하게 말하면, 소유한 모니터(락)의 WaitSet(Wait-Pool)에 대기하고 있던 스레드중 하나의 스레드를 모니터의 EntrySet(Lock-pool)으로 이동시킨다. 그 이후에 notify()를 호출한 스레드가 모니터락을 반환하게 되면 EntrySet(Lock-Pool)에서 대기중이던 스레들이 경합하여 하나의 스레드가 모니터락을 획득하게 된다.



D. `public final void notifyAll()`

- 소유한 모니터(락)의 WaitSet(Wait-Pool)에서 대기중인 모든 스레드를 실행가능 하도록 깨워준다(Wakeup). 
- 좀 더 정확하게 말하면, notify()시에는 WaitSet에서 대기중인 스레드중 하나의 스레드만 선택을 했지만, notifyAll()을 하게되면 WaitSet에서 대기중인 모든 스레드를 EntrySet으로 이동시켜준다.



3. wait/notify계열 메소드사용시 주의할 점

 A. 스레드가 wait()를 한다는 것은 특정 조건이 만족이 될 때까지 기다리겠다 라는 의미이다. 그런데 현재 모니터를 소유한 스레드가 notify(or notifyAll)를 해 준다는 것은 WAITING하고 있는 스레드에게 원하는 상태가 되었다는 확인이 아니라 그러한 상태가 되었을 것이라는 힌트를 주는 것에 불과하다는 사실이다. 이게 무슨말인고 하니, 특정조건을 만족시켜 notify/notifyAll을 한다고 해도 WAITING스레드 뿐만이 아니라 BLOCKED스레드가 함께 경쟁을 하면서 모니터락을 획득하려고 시도를 하는데, 스레드가 모니터락을 획득했을 때 여전히 그 조건이 만족되는지는 확인을 해 보지 않는 한 알 수 없다 라는 의미이다.

B. 따라서 wait()메소드를 호출할 때에는 "반드시 loop문으로 구성"하여 wait()메소드에서 빠져 나올 때 원하는 조건 상태가 되어 있는지 반복적으로 체크를 하도록 해 주어야 한다.

 ```XML
<CODE-TEMPLATE> wait()/wait(long)메소드 사용 예
       public synchronized methodA(){
           while(조건만족하지 않으면){
               try{
                   wait();
               catch(InterruptedException e){}
            }
           ~~~~
       }
 ```



```java
/**
 *1. 메시지박스 클래스
 *  - 하나의 메시지만 저장이 가능
 *  - 메시지를 송신(send)하는 메소드와 메시지를 수신(receive)하는
 *    메소드간에 동기화처리 되어있다.
 *
 * @author 정일영(kiwi99kr@gmail.com)
 */
class MessageBox{
    private String message;
    //메시지가 있는지 여부를 체크하기 위한 flag, wait()호출 조건이 된다.
    private boolean hasMessage;

    public synchronized void send(String s){
        //루프를 통해 메시지여부를 체크함에 주의!!!
        while(hasMessage){
            try{
                //메시지가 있으면 락을 반환하고 WaitSet에서 대기한다.
                this.wait();
            }catch(InterruptedException e){}
        }
        this.hasMessage = true;
        this.message =s;
        this.notifyAll();
    }

    public synchronized String receive(){
        while(!hasMessage){
            try{
                //메시지가 없으면 락을 반환하고 WaitSet에서 대기한다.
                this.wait();
            }catch(InterruptedException e){}
        }
        this.hasMessage = false;
        this.notify();
        return this.message;
    }
}

/**
 *2. 송신용 Runnable 구현클래스
 *
 * @author 정일영(kiwi99kr@gmail.com)
 */
class SendRunnable implements Runnable{
    private MessageBox box;
    public SendRunnable(MessageBox box){
        this.box = box;
    }
    public void run(){
        for(int i=0; i<10; i++){
            String message = i+"메시지("+System.nanoTime()+")";
            System.out.println(message);
            box.send(message);
        }
    }
}

/**
 *3. 수신용 Runnable 구현 클래스
 * @author 정일영(kiwi99kr@gmail.com)
 */
class RecvRunnable implements Runnable{
    private MessageBox box;
    public RecvRunnable(MessageBox box){
        this.box = box;
    }
    public void run(){
        for(int i=0; i<10; i++){
            System.out.println("["+Thread.currentThread().getName()+"] : "+box.receive());
        }
    }
}

public class Main {
    public static void test_01(){
        MessageBox box = new MessageBox();
        Thread sendT = new Thread(new SendRunnable(box),"송신스레드");
        Thread recvT1 = new Thread(new RecvRunnable(box),"수신스레드1");
        Thread recvT2 = new Thread(new RecvRunnable(box),"수신스레드2");
        sendT.start();
        recvT1.start();
        recvT2.start();
    }
    public static void main(String []ar){
        test_01();
    }
}
```