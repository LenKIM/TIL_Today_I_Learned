## 프로세스

### 프로세스의 개념

"Process is a program in execution"

##### 프로세스의 문맥(context)

특정 시점을 놓고 봤을때, 어디까지 수행을 했는가를 알려주는 것!

- CPU 수행 상태를 나타내는 하드웨어 문맥
  - Program Counter
    - 프로그램 카운터가 코드를 가르키고 있어, 현재 상태를 저장한다.
  - 각종 register
- 프로세스의 주소 공간
- 프로세스 관련 커널 자료구조
  - PCB(Process Control Block)
  - Kernel stack



![](https://ws2.sinaimg.cn/large/006tNc79gy1fme30bzq0cj313k0tudw0.jpg)



**과거의 상태를 현재에 정확하게 상태를 규명하는 것을 문맥이라고 한다.**

문맥은 위와 같이 크게 3개에 따라 분류할 수 있다.

프로세스의 DATA 영역 안에 PCB로 저장한다.

**프로세스 하나 실행할 때마다 PCB를 얼마나? 메모리를 얼마나? 줘야할지 관리한다.**



**프로세스는 상태(state)가 변경되며 수행된다.**

- **Running**
  - CPU를 잡고 instruction을 수행중인 상태
    ​
- **Ready**
  - CPU를 기다리는 상태(메모리 등 다른 조건을 모두 만족하고)
    ​
- **Blocked(WAIT, SLEEP)**
  - CPU를 주어도 당장  instruction을 수행할 수 없는 상태
  - Process 자신이 요청한 event(예: I/O)가 즉시 만족되지 않아 이를 기다리는 상태
  - (예) 디스크에서 file을 읽어와야 하는 경우
    ​
- **New** : 프로세스가 생성중인 상태
- **Terminated** : 수행(execution)이 끝난 상태
  ​

![](https://ws4.sinaimg.cn/large/006tNc79gy1fme3f04wvcj314m0s2dtn.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fme3hmjjn7j314s0uc19m.jpg)



타이머가 발생하면 CPU에서 돌고있는 프로세스는 Ready queue의 뒤로 들어가게 되고 다음 process가 동작하게 됩니다.  

CPU의 프로세스가 DISK 큐 뒤로 들어가고 블록상태로 유지된다.  
두드리면 CPU의 인터럽트를 호출하고, 하던 일을 잠깐 멈춘 뒤, Ready queue에 넣고 기다린다.  

운영체제 커널에 자료구조로 큐를 만들어놓고, 각각의 I/O와 CPU에 관리를 수행합니다.  

**아래 그림 참조**

![](https://ws4.sinaimg.cn/large/006tNc79gy1fme3ptsi0vj31480u8k97.jpg)



#### Process Control Block(PCB)

![](https://ws1.sinaimg.cn/large/006tNc79gy1fme3rbs4osj313u0u81bz.jpg)

정확한 CPU 우선순위 값 유지.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fme3tz2lptj310c0tyarp.jpg)

Process A에서 Process B 로 넘어가는 과정을 문맥 교환(Context switch)이라고 부른다!



![](https://ws2.sinaimg.cn/large/006tNc79gy1fme3xdahp2j314i0tw4m9.jpg)



(2)의 경우 캐쉬 메모리를 다 지워야 하지만, 만약 유저모드에서 커널모드 그리고 다시 유저모드로 돌아갈 경우에는 지울 필요가 없다.



#### 프로세스를 스켸줄링 하기 위한 큐

- Job queue - 현재 시스템 내에 있는 모든 프로세스의 집합
- Ready queue - 현재 메모리 내에 있으면서 CPU를 잡아서 실행되기를 기다리는 프로세스의 집합
- Device queues - I/O device의 처리를 기다리는 프로세스의 집합
- 프로세스들은 각 큐들을 오가며 수행된다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fme48msy9ij30zy0tqgxs.jpg)



![](https://ws3.sinaimg.cn/large/006tNc79gy1fme49tptxsj30zg0rkdr4.jpg)



종료되면 빠져나간다.

또는 자식 프로세스를 만들 수 있다.



#### 스케줄러(Scheduler)

- Long-term scheduler (장기 스케줄러 or job scheduler)
  - 시작 프로세스 중 어떤 것들을 ready queue로 보낼지 결정
  - 프로세스에 memory(및 각종 자원)을 주는 문제
  - degree of Multiprogramming을 제어
  - time sharing system에는 보통 장기 스케줄러가 없음(무조건 Ready)
  - 어떤 프로세스가 new상태인지, 정보를 줄지 안줄지?
- Short-term scheduler(단기 스케줄러 or CPU scheduler)
  - 어떤 프로세스를 다음번에 running시킬지 결정
  - 프로세스에 CPU를 주는 문제
  - 충분히 빨라야 함(millisecond 단위)
- Medium-Term Scheduler(중기 스케줄러 or Swapper)
  - 여유 공간 마련을 위해 프로세스를 통째로 메모리에서 디스크로 쫒아냄
  - 프로세스에게서 memory를 뻇는 문제
  - Degree of Multiprogramming을 제어
  - 지금의 컴퓨터에는 중기 스케줄러를 활용한다.
    너무 많은 메모리가 올라가면 중재역할.
  - 앞에 3개의 상태에서 중기 스케줄러 때문에 Suspended라는 상태가 생겼다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fme4nbq2fwj310w0totuk.jpg)

## 스케줄러

- 프로세스를 스케줄링하기 위한 Queue에는 세 가지 종류가 존재한다.

- Job Queue : 현재 시스템 내에 있는 모든 프로세스의 집합
- Ready Queue : 현재 메모리 내에 있으면서 CPU를 잡아서 실행되기를 기다리는 프로세스의 집합
- Device Queue : Device I/O 작업을 대기하고 있는 프로세스의 집합

각각의 Queue에 프로세스들을 넣고 빼주는 스케줄러에도 크게 세 가지 종류가 존재한다.  

#### 장기스케줄러(Long-term scheduler or job scheduler)  

메모리는 한정되어 있는데 많은 프로세스들이 한꺼번에 메모리에 올라올 경우, 대용량 메모리(일반적으로 디스크)에 임시로 저장된다. 이 pool에 저장되어 있는 프로세스 중 어떤 프로세스에 메모리를 할당하여 ready queue로 보낼지 결정하는 역할을 한다.  

- 메모리와 디스크 사이의 스케줄링을 담당.  
- 프로세스에 memory(및 각종 리소스)를 할당(admit)  
- degree of Multiprogramming 제어
- 메모리에 여러 프로그램이 올라가는 것) 몇 개의 프로그램이 올라갈 것인지를 제어
- 프로세스의 상태
- new -> ready(in memory)
- cf) 메모리에 프로그램이 너무 많이 올라가도, 너무 적게 올라가도 성능이 좋지 않은 것이다. 참고로 time sharing system 에서는 장기 스케줄러가 없다. 그냥 곧바로 메모리에 올라가 ready 상태가 된다.


#### 단기스케줄러(Short-term scheduler or CPU scheduler)

- CPU와 메모리 사이의 스케줄링을 담당.
- Ready Queue에 존재하는 프로세스 중 어떤 프로세스를 running 시킬지 결정.
- 프로세스에 CPU를 할당(scheduler dispatch)
- 프로세스의 상태
- ready => running => waiting => ready

#### 중기스케줄러(Medium-term scheduler or Swapper)

- 여유 공간 마련을 위해 프로세스를 통째로 메모리에서 디스크로 쫓아냄 (swapping)
- 프로세스에게서 memory를 deallocate
- degree of Multiprogramming 제어
- 현 시스템에서 메모리에 너무 많은 프로그램이 동시에 올라가는 것을 조절하는 스케줄러.
- 프로세스의 상태
- ready => suspended
- Process state - suspended

Suspended(stopped) : 외부적인 이유로 프로세스의 수행이 정지된 상태로 메모리에서 내려간 상태를 의미한다. 프로세스 전부 디스크로 swap out된다. blocked 상태는 다른 I/O 작업을 기다리는 상태이기 때문에 스스로 ready state로 돌아갈 수 있지만 이 상태는 외부적인 이유로 suspending되었기 때문에 스스로 돌아갈 수 없다.

##### Suspended (Stopped) 상태?

- 외부적인  이유로 프로세스의 수행이 정지된 상태
- 프로세스는 통째로 디스크에 swap out된다.
- (예) 사용자가 프로그램을 일지 정지 시킨 경우(break key)
  시스템이 여러 이유로 프로세스를 잠시 중단 시킴
  (메모리에 너무 많은 프로레스가 올라와 있을 때)



![](https://ws1.sinaimg.cn/large/006tNc79gy1fme4rfzfp8j30ze0mq7i2.jpg)

monitor = kernel 



![](https://ws4.sinaimg.cn/large/006tNc79gy1fme4ulfswij314c0uk7r7.jpg)



#### Suspend 라는것은 메모리를 모두 읽어버리는 것!

왜? 서스펜드가 생겼는가? 에 대해 생각해보자.

메모리에 너무 많은 프로세스가 올라올 경우, 메모리는 보조기억장치로 프로세스를 쫒아낸다.  
이 때 ready상태의 프로세스 또는 Blocked 상태의 프로세스가 Swap Out Swap In 될 수 있다.
**꼭 기억하기!!**

## 2번째 강의

#### 프로세스 내부의 CPU수행단위를 Thread라고 부른다.

### "A thread (or lightweight process) is a basic unit of CPU utilization" 

- Thread가 독립적으로 가지는 것
  - Program counter
  - Register set
  - stack space
    ​
- Thread가 동료 thread와 공유하는 부분(=TASK)
  - Code Section
  - Data Section
  - OS Resources
    ​
- 전통적인 개념의 HeavyWeight Process는 하나의 thread를 가지고 있는 Task로 볼 수 있다.



![](https://ws3.sinaimg.cn/large/006tNc79gy1fmgao5ti63j31380taqfx.jpg)

##### 프로세스가 하나 주어지면 하나의 스택이 만들어지고, 프로그램 카운터를 여러개 두고 스택안에 만들어 진다.

메모리 주소공간을 공유하고 프로세스상태도 하나이기 때문에 공유한다.
PCB안에 공통으로 쓰는 것은 공유한다. 



### Thread의 장점

- 다중 스레드로 구성된 태스크 구조에서는 하나의 서버 스레드가 blocked(wating) 상태인 동안에도 동일한 태스크 내의 다른 스레드가 실행(running)되어 빠른 처리를 할 수 있다.
- 동일한 일을 수행하는 다중 스레드가 협력하여 높은 처리율(throughput)과 성능 향상을 얻을 수 있다.
- 스레드를 사용하면 병렬성을 높일 수 있다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmgb2e23vej314m0tcqie.jpg)

### 싱글스레드와 멀티스레드의 차이점

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmgb3pao9xj312i0qiqgy.jpg)



레지스터 셋과 스택 부분



### 스레드의 장점

1. **응답성**
   Ex) 웹페이지를 불러오는 경우, http를 호출하는데, 이미지가 안나올 수 있음. 여기서도 동기식/비동기식 입출력의 차이에서도 찾아볼 수 있다.
   ​

2. **자원 공유**

   N개의 스레드들은 코드, 데이터, 각종 프로세스 자원을 공유할 수 있다.
   효율적으로 쓸수 있는 효과가 나타난다.

3. **경제성**
   컨테스트 스위치가 일어날때,프로세스가 전환될 때 오버헤드가 심하다.
   그러나 프로세스 내부에서 CPU간의 스위치가 일어날 경우 대단히 간단하다. Solaris의 경우에는 두 가지 overhead가 각각 30배, 5배 더 든다고 한다. 결론은 가능하면 같은 일을하는 거라면 프로세스보다 스레드를 만드는 것이 좋다.

4. **CPU가 여러개일 때의 장점**
   각각의 스레드가 병렬적으로 다른 스레드에서.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmgb5ux2qfj311o0scnfl.jpg)



#### 스레드의 구현  

- 커널에 의한 스레드 구현. 
  커널 스레드는 스레드가 여러개가 있다는 사실을 운영체제가 알고 있다.  
- 유저에 의한 스레드 구현. 
  라이브러리를 통한 스레드르를 구현한다.  
  사용자에 의해 스레드를 관리 한다.  
- 어떤 것은 리얼 타임 스레드도 있다.

