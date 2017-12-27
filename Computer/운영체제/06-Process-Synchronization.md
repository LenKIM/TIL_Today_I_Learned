## 데이터 접근(intro)

컴퓨터 시스템 안에서 어떻게 데이터가 접근하는가???

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv53dz1wxj30zw0tsk47.jpg)

#### **Race Condition(경쟁 상태)**

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv551266ij313u0sm4je.jpg)

**과연 컴퓨터에 경쟁상태가 많이 생길까?**

CPU라는 것은 자기의 주소공간만 본다아! 그래서 문제가 안생길거처럼 보이는데, CPU가 여러개 있는 멀티 CPU 프로세서 상태에서는 아닐 것! 특히 프로세스들이 본인 직접실행할 수 없을 경우 커널의 코드가 실행될 경우. 



#### OS에서 race condtion은 언제 발생하는가?

1. ##### Kernel 수행 중 인터럽트 발생시

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmv5dc40t8j31140t0wqo.jpg)

2. ##### Process가 System call을 하여 kernel mode로 수행 중인데 context switch가 일어나는 경우

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv5hwitdwj30zw0tmwsg.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv5iaf4ryj311g0s0ao4.jpg)

3. ##### Multiprocessor에서 shared memory 내의 kernel data

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv5n1aoxyj30zc0rkasm.jpg)



### Process Synchronization 문제

- 공유 데이터(shard data)의 동시 접근(concurrent access)은 데이터의 불일치 문제(inconsistency)를 발생시킬 수 있다.

- 일관성(consistency)간의 실행 순서(orderly execution)를 정해주는 메커니즘 필요

- #### Race condition

  - 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황
  - 데이터의 최종 연산 결과는 마지막에 그 데이터를 다룬 프로세스에 따라  달라짐

- race condition을 막기 위해서는 concurrent process는 동기화(synchronize) 되어야 한다.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv5t8pudnj30yy0swk5g.jpg)

#### The Critical-Section Problem 임계구역

- n개의 프로세스가 공유 데이터를 동시에 사용하기를 원하는 경우
- 각 프로세서는 code segment에는 공유 데이터를 접근하는 코드인 critical section이 존재
- 임계 구역안에 들어가있으면, 공유 메모리에 못들어가게 막는다!



![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv5w7mmtaj310w0tadwz.jpg)

**어떻게하면 프로세스 동기화 문제를 해결할 수 있는지?**



![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv5x7sypvj30zo0r6qep.jpg)

**소프트웨어적으로 Critcal-section을 해결해보자**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv5x1w18oj31020sge3p.jpg)

위 3가지!

- Mutual Exclusion(상호 배제)
- Progress(진행)
- Bounded Waiting(유한 대기)



![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmv6gqm6qvj312c0rktrx.jpg)

소프트웨어적으로 turn을 확인해서 critical section에  넣고 나올때 상대방 turn으로 변경시켜서 동작한다. 그러나 이러한 문제점은 Process 문제가 발생한다. 아무도 없는 Critical section이 없을때도 동작한다. 즉 충족시켜주는 못한다. 

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv6i2oz24j312g0t6kcc.jpg)

프로세스 안에 들어가기 위한 플래그를 설정하여, 들어가고자하는 의중을 표시하는 것.



결국 CS에 들어간 후에 flag를 변경한다. 이는 알고리즘1과 유사하다.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv6m60a2yj31fg118b29.jpg)



모든 경우의 수를 다 따져서 들어가있지 않으면 들어가는.....  둘다 들어가려고 하는 경우에만 turn을 따져서 동작하게 하고,

그러나 이 방법도 문제가 있는데... 바로 **Busy Waiting!(= spin lock)**  
**(계속 CPU와 memory를 쓰면서 wait)하는 것!**  



Busy Waiting을 해결하기 위해 아래와 같이 작업한다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv6whje46j31fs17y1kx.jpg)

lock이 걸려있는가? 아닌가?를 확인해서 CS를 소프트웨어적으로 동작시킵니다.



### Semaphores

추상 자료형이란? Object와 Operation으로 구성되어 있는것!

- 앞의 방식들을 추상화시킴

- Semaphore **S**

  -  Integer variable
  - 아래의 두 가지 atomic 연산에 의해서만 접근 가능

  **P는 세미포어를 획득하는 과정**  
  자원이 있으면 뺐고

  **V는 다 사용하고 반납하는 과정이라고 생각**

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv7681o55j30sq0e4wk2.jpg)

**atomic 연산을 가정한다.**

그러나 이러한 연산에도 busy-wait 문제가 발생한다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmv79yy59lj31300p4h1d.jpg)

세마포어를 활용해서 쉽게 Critical Section문제를 해결할 수 있다.   
**busy-wait(=spin lock)**
**Block & Wakeup방식의 구현(=sleep lock)**
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv7d41s9mj312y0tsndn.jpg)



### Block & Wakeup Implementation

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv7eb7173j31160si7n1.jpg)



구체적으로 어떻게 구현되는지 살펴봅시다.  
자원을 여분이 있다면 획득하고 Block()  
자원의 여분이 없다면 wakeup(P) 방식으로 동작시킨다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv7g5a72cj311c0r8tpm.jpg)

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmv7k2y4flj30yw0i2qdd.jpg)



Block/wakeup이 더 좋지만, 사실 block/wakeup도 오버헤드가 존재한다! 어느 정도 Critical section의 길이에 따라 다르다.



세미포어도 2가지로 나눌 수 있다. 이미 앞에서 설명한거와 같이. 두가지.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmv7mhmc7vj30zg0jownq.jpg)

**그러나 세미포어를 쓰다보면 원치않는 결과를 낼 수 있다.**

## Deadlock and Starvation



프로세스 2개 사이에서 둘이서 하나씩 쥐고 놓지 않는 상태(Deadlock)  
![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv7pyjm3zj311q0rcanq.jpg)



**Deadlock** 문제를 어떻게 해결할 수 있을까?  
**자원을 획득하는 순서를 똑같이 맞쳐준다면 해결할 수 있을 것이다!!!!!**

**Starvation?**
 특정 프로세스가 자원을 쥔 상태에서 빠져나오지 않는 상태

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmv7t82nfdj310u0s2k9o.jpg)

**Starvation이 일어날 수 있는 원인이 되는 것!**