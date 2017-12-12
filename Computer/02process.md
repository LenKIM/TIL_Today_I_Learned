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

data안에 PCB로 저장한다.

프로세스 하나 실행할 때마다 PCB를 얼마나? 메모리를 얼마나? 줘야할지 관리한다.



**프로세스는 상태(state)가 변경되며 수행된다.**

- Running
  - CPU를 잡고 instruction을 수행중인 상태
- Ready
  - CPU를 기다리는 상태(메모리 등 다른 조건을 모두 만족하고)
- Blocked(wait, sleep)
  - CPU를 주어도 당장  instruction을 수행할 수 없는 상태
  - Process 자신이 요청한 event(예: I/O)가 즉시 만족되지 않아 이를 기다리는 상태
  - (예) 디스크에서 file을 읽어와야 하는 경우
- New : 프로세스가 생성중인 상태
- Terminated : 수행(execution)이 끝난 상태

![](https://ws4.sinaimg.cn/large/006tNc79gy1fme3f04wvcj314m0s2dtn.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fme3hmjjn7j314s0uc19m.jpg)



타이머가 발생하면 CPU에서 돌고있는 프로세스는 Ready queue의 뒤로 들어가게 되고 다음 process가 동작하게 됩니다.

CPU의 프로세스가 DISK 큐 뒤로 돌아가고 블록상태로 유지된다.
두드리면 CPU의 인터럽트를 호출하고, 하던일을 잠깐 멈춘 뒤, Ready queue에 넣고 기다린다.



운영체제 커널에 자료구조로 큐를 만들어놓고, 각각의 I/O와 CPU에 관리를 수행합니다. 아래 그림 참조

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

만약에 인터럽트에 걸리면 ??? 다음 시간에 알려줄게요~

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



Suspended (Stopped)상태?

- 외부적인  이유로 프로세스의 수행이 정지된 상태
- 프로세스는 통째로 디스크에 swap out된다.
- (예) 사용자가 프로그램을 일지 정지 시킨 경우(break key)
  시스템이 여러 이유로 프로세스를 잠시 중단 시킴
  (메모리에 너무 많은 프로레스가 올라와 있을 때)



![](https://ws1.sinaimg.cn/large/006tNc79gy1fme4rfzfp8j30ze0mq7i2.jpg)

monitor = kernel 



![](https://ws4.sinaimg.cn/large/006tNc79gy1fme4ulfswij314c0uk7r7.jpg)



서스펜드라는것은 메모리를 모두 읽어버리는 것!

