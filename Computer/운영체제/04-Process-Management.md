## 프로세스 관리

###  프로세스 생성(Process Creation)

- Copy-On-Write(COW) 기법
  - 부모프로세서의 코드데이터스택을 그대로 복사하기보다는 write가 발생할 때 Copy 하겠다. 그 이전까지는 부모프로세스의 코드데이터스택을 공유한다.
  - 가능하면 공유하고 원칙적으로는 독립적이다.
- 부모 프로세스가 자식 프로세스를 복제해서 생성됨
- 프로세스의 트리(계층 구조)형성
- 프로세스는 자원을 필요로 함
  - 운영체제로부터 받는다.
  - 부모와 공유한다.
- 자원의 공유
  - 부모와 자식이 모든 자원을 공유하는 모델
  - 일부를 공유하는 모델
  - 전혀 공유하지 않는 모델
- 수행(Execution)
  - 부모와 자식은 공존하며 수행되는 모델
  - 자식이 종료(terminate)될 때까지 부모가 기다리는(wait)모델
- 주소 공간(Address space)
  - 자식은 부모의 공간을 복사함(binary and OS data)
  - 자식은 그 공간에 새로운 프로그램을 올림
- 유닉스의 예
  - fork() 시스템 콜이 새로운 프로세스를 생성
    - 부모를 그대로 복사(OS data except PID + binary)
    - 주소 공간 할당
  - fork 다음에 이어지는 exec()시스템 콜을 통해 새로운 프로그램을 메모리에 올림
- 복제하고 나서 필요한건만 덮어씌우는 방식.

### 프로세스 종료(Process Termination)

- 프로세스가 마지막 명령을 수행한 후 운영체제에게 이를 알려줌(**exit**)
  - 자식이 부모에게 output data를 보냄(via **WAIT**).
  - 프로세스의 각종 자원들이 운영체제에 반납됨
- 부모 프로세스가 자식의 수행을 종료시킴(**abort**) - 강제종료라고도 부름
  - 자식이 할당 자원의 한계치를 넘어섬
  - 자식에게 할당된 태스크가 더 이상 필요하지 않음
  - 부모가 종료(exit)하는 경우
    - 운영체제는 부모 프로세스가 종료하는 경우 자식이 더 이상 수행되도록 두지 않는다.
    - 자손들을 일단 죽이고나서 부모인 자신이 죽는다.
    - 단계적인 종료



## Fork() 시스템 콜

- A Process is created by the fork() system call.

  \- creates a new address space that is duplicate of the caller.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmm4d0e5jqj310s0hkn6q.jpg)



*fork()는 무한정으로 만들어 지는가?* 아니.

정확하게는 프로그램카운터를 복제한다.

문제가 있는데, 복제를 했는데, 복제본이 자신이 본인이라고 믿을 경우.



![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmm4jhkb0aj315e0i816k.jpg)

와

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmm4kxj7ikj315a0iwh1r.jpg)



**차이는?** 두번째 그림의 두번째 코드의 첫번째 printf의 호출 시기가 2번째꺼는 안보일 것이다.  
왜냐하면, 포크가 되는 순간에 나오기 때문이다.



## exec() 시스템 콜

- A process can execute a different program by the exec() system call.
  - Replaces the memory image of the caller with a new program



- Exec 을 하게되면, 새로운 프로그램을 씌우는 역할을 수행할 수 있다.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmm4pk4atgj30yg0hsgv0.jpg)



**한번 exec을 하면 다시 되돌아 올 수 없다!**



![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmm4t4hdtqj30s409ijwz.jpg)

**Hello, I am parent는 출력되지 않는다.**  
 왜냐하면 exec을 하게되면 복제가 되었기 때문에.



## wait() 시스템 콜

- 프로세스 A가 wait()시스템 콜을 호출하면
  - 커널은 child가 종료될 때까지 프로세스 A를 sleep시킨다.(block 상태)
  - Child process가 종료되면 커널은 프로세스 A를 깨운다(ready 상태)

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmm4z4cppnj30zu0joamm.jpg)

*fork를 하고나서, wait를 만나면?*

부모프로세스는 잠들어 버리는데, 언제까지? 자식프로세스를 위한 코드가 다 실행되고 나서 다시 깨어난다.

## exit() 시스템 콜

- 프로그램의 종료

  ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmm56bbl0bj30yc0gytk3.jpg)




## 정리

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmm59d1jy7j313s0oen5n.jpg)

## 프로세스 간 협력

- 독립적 프로세스(Independent process)
  \- 프로세스는 각자의 주소 공간을 가지고 수행되므로 원칙적으로 하나의 프로세스는 다른 프로세스의 수행에 영향을 미치지 못함

- 협력 프로세스

  \- 프로세스 협력 메커니즘을 통해 하나의 프로세스가 다른 프로세스의 수행에 영향을 미칠 수 있음

- 프로세스 간 협력 메커니즘(**IPC** : Interprocess Communication)

  - 메서지를 전달하는 방법
    - Message passing - 커널을 통해 메시지 전달

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmm5d8725mj30zs0u4ncx.jpg)

​	**커널을 통해서 Process A, B가 서로 교환을 한다.**


- 주소공간을 공유하는 방법
  - shared Memory : 서로 다른 프로세스 간에도 일부 주소 공간을 공유하게 하는 shared memory 메커니즘이 있음

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmm5ezdw2tj30yk0u6e1q.jpg)

**Cf)** Thread - thread는 사실상 하나의 프로세스이므로 프로세스 간 협력으로 보기는 어렵지만 동일한 process를 구성하는 thread 간에는 주소 공간을 공유하므로 협력 가능

**CPU와 I/O burst의 연속!!**

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmm61hm0apj30zq0tads0.jpg)

CPU를 일련의 명령어로 연속적으로 사용하는 것 - CPU burst
I/O를 연속적으로 실행하는 것 - I/O burst

#### 운영체제에 따라 동작 방식이 다르다.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmm62bljgaj30za0tkqku.jpg)

#### JOB의 종류가 섞여있다? 무슨 말?

INTERACTIVE한 JOB은 I/O bound job!  
CPU만 아주 오랫동안 쓰는 걸 CPU bound JOB이라고 부른다!  

**문제는 I/O bound job이 문제!!**  

**CPU를 공평하게 주기보다는 효율적으로 주기 위해 스케줄링 절대단위로 필요하다.**

## 프로세스의 특성 분류

- 프로세스는 그 특성에 따라 다음 두 가지로 나눔
  - I/O - bound process
    - CPU를 잡고 계산하는 시간보다 I/O에 많은 시간이 필요한 JOB
    - Many short CPU bursts
  - CPU - bound process
    - 계산 위주의 job
    - Few very long CPU bursts.



## CPU Scheduler & Dispatcher

- CPU Scheduler(운영체제에 CPU Scheduler 코드가 있음)
  - Ready 상태의 프로세스 중에서 이번에 CPU를 줄 프로세스를 고른다.
- Dispatcher(운영체제에 CPU Scheduler 코드가 있음)
  - CPU의 제어권을 CPU scheduler에 의해 선택된 프로세스에게 넘긴다.
  - 이 과정을 context switch(문맥 교환)라고 한다.
- CPU 스켸줄링이 필요한 경우는 프로세스에게 다음과 같은 상태 변화가 있는 경우이다.
  1. Running -> Blocked(예 : I/O 요청하는 시스템 콜)
  2. Running -> Ready(예: 할당시간만료로 Timer Interrupt)
  3. Blocked -> Ready(예: I/O 완료후 인터럽트)
  4. Terminate
- 1, 4에서의 스케줄링은 nonpreemptive(=강제로 빼앗지 않고 자진 반납) - 비선점
- All other scheduling is preemptive(=강제로 빼앗음) - 선점