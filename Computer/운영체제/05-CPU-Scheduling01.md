# CPU Scheduling

**스케줄링 알고리즘을 크게 2개로 나누면**

(=강제로 빼앗지 않는 방법) 비선점형
Nonpreemptive

(=강제로 빼앗는 방법) 선점형
preemptive



###  CPU의  성능척도는?

- **CPU utilization(이용률)**

  \- keep the CPU as busy as possible  
  \- CPU가 놀지 않고 일을 하는 시간  

- **Throughput(처리량)**

  \- # of processes that complete their execution per time unit  
  \- 주어진 시간동안 몃개의 작업을 처리 했는가?

- **Turnaround time(소요시간, 반환시간)**

  \- amount of time to execute a particular process  
  \- CPU를 쓰러 들어와서 다쓰고 I/O하러 나갈때까지 걸린 시간을 의미한다.

- **Waiting time(대기 시간)**

  \- amount of time a process has been waiting in the ready queue  
  \- CPU를 쓰고자하더라도 CPU가 하나라서 기다리는 순수한 시간

- **Response time(응답 시간)**

  \- amount of time it takes from when a request was submitted until the first response is produced, NOT output  
  (for time-sharing environment)  
  \- Ready큐에 들어와서 CPU쓰겠다고 말하고, 처음 CPU를 쓰게되는 시간까지  
  \-(중국집에서) 첫번째 음식이 나오기까지의 시간.



*왜 성능측정을 3개로 나눠서 측정하는 이유가 있는가??*



**스케쥴링 알고리즘을 크게 2개로 나누면**

(=강제로 빼앗지 않는 방법)비선점형
Nonpreemptive

(=강제로 빼앗는 방법) 선점형
preemptive



### 01 FCFS(First-Come First-Served)

-  먼저 온 순서대로 처리하는 것.  


- **비선점형 스케줄링**
- 효율적이지 않다. 

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmoemrr86hj31200uutms.jpg)

앞에서 오래써써 평균 wating time이 오래 걸렸다.  
앞에 어떤 프로세스가 버티고있는가에 따라 천자만별 차이가 난다.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmoewvwwzfj312y0v07mb.jpg)

콘보이 이펙트 (=호위효과)
앞에서 엄청난 똥차가 대기할 경우 오래걸리는 현상을 Convoy effect



### 02 SJF(Shortest-Job-First)

CPU를 사용하고자하는 시간이 CPU burst가 짫은 I/O에게 CPU를 준다.

- 각 프로세스의 다음 번 CPU burst time을 가지고 스케줄링에 활용

- CPU burst time이 가장 짧은 프로세스를 제일 먼저 스케줄

- Two schemes:
  \- Nonpreemptive  
  ​      : 일단 CPU를 잡으면 이번 CPU burst가 완료될 때까지 CPU를 선점당하지 않음  

  \- Preemptive  
  ​     : 현재 수행중인 프로세스의 남은 burst time보다 더 짧은 CPU burst time을 가지는 새로운 프로세스가 도착하면 CPU를 빼앗김  
  \- 이 방법을 Shortes-Remaining-Time-First(SRTF)이라고도 부름

- SJF is optimal

  \- 주어진 프로세스에 대해 minium average waiting time을 보장  

  \- Preemptive 형이다.



예제. Non-Preemptive SJF
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmofcxw4u2j316m0vgaoh.jpg)



P1이 무혈입성한 뒤, 짫은 것부터 시작하게 된다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmofeb7q3rj31480w6k62.jpg)



P1이 2.0까지 진행되다가 P2가 시작되고 P2버스트타임보다 짫은 P3가 1.

**대기 시간이 더 짫은 것을 보여준다**  
위의 3초는 어떤 스케줄링 알고리즘을 해도 3초보다 적은 값을 낼 수 없다.

이렇게 좋은 알고리즘에 2가지 문제가 있다.

- Starvation(기아현상)
  \- 선점형으로 SJP를 진행할 경우 긴 지연시간을 가진 프로세스는 계속해서 해결하지 못할 수 있다.  

- 다음 CPU Burst Time의 시점을 알 수 없습니다.  
  그러나 추칭(estimate)만이 가능합니다.  
  어떻게?  
  **과거의 CPU burst time을 이용해서 추정합니다.(주로 exponential averaging)**  
  ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmofo3b3tfj312y0u619w.jpg)

  ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmofqv1wfgj317c0wytn7.jpg)

  ​

### 03 Priority Scheduling

- 우선순위가 가장 높은 프로세스에게 우선권을 주겠다.
- 이것도 Preemptive와 nonpreemptive로 나누어 진다.
- A priority number(integer) is associated with each process
- Highest priority를 가진 프로세스에게 CPU할당
  (Smallest integer = Highest priority)
- SJF는 일종의 Priority Scheduling이다.
  \- Priority = Predicted Next CPU Burst time
- Problem
  \- Starvation(기아 현상) : Low Priority Processes May Never Execute
- Soultion
  \- Aging(노화) : as time progresses increase the priority of the process

### 04 Round Robin(RR)

- 각 프로세스는 동일한 크기의 할당 시간(Time Quantum)을 가짐  
  (일반적으로 10-100 milliseconds)  
- 할당 시간이 지나면 프로세스는 선점(preempted)당하고 ready queue의 제일 뒤에 가서 다시 줄을 선다. 
- N개의 프로세스가 Ready Queue에 있고 할당 시간이 Q time unit인 경우 각 프로세스는 최대 q time unit단위로 CPU시간의 1/N을 얻는다.
  **=> 어떤 프로세스도 (n-1)q time unit 이상 기다리지 않는다.**
- Performance  
  \- Q large => FCFS  
  \- Q small => context switch 빈번 발생
- **RR방식의 장점은 응답시간이 굉장히 빨라지는 특징이 있다.**

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmog5g4h9uj315c0weh2j.jpg)

일반적으로 SJF보다 average turnaround time이 길지만 response time은 더 짫다.



![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmoga7a9l2j311u0yanej.jpg)

**Round Robin의 장점은?**  
Turnaround time보다 response time이 굉장히 좋다라는 것!

**빈번하게 발생하는 I/O와 오래사용하는 CPU의 프로세스등이 다양하기 때문에 CPU 스케줄링이 필요하다.**

### 05 Multilevel Queue

- Ready queue를 여러 개로 분할
  \- **foreground**(interactive)  
  \- **background**(Batch - No Human Interaction)  
- 각 큐는 독립적인 스케줄링 알고리즘을 가짐
  \- **foreground** - RR  
  사람과 인러럽트하는 거기 때문에 라운드로빈  
  \- **background** - FCFS  
  CPU가 긴 경우,컨테스트오버헤드를 없애기 위해서 FCFS 사용  
- 큐에 대한 스케줄링이 필요
  \- Fixed priority scheduling  
     \- serve all from foreground then from background.
     \- Possiblity of starvation

  \- Time slice  
  : 각 큐에 CPU time을 적절한 비율로 할당  
- 각 큐에 차별해서 줄을 세운다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fmogj5tgurj315m0xe7fa.jpg)

 가장 순위가 높은건  

1. 운영체제  
2. 사람과 호응하는 프로세스
3. 배치프로세스(CPU만 오래 사용하는 것)
4. student processes


그러나 오직 한 큐에서만 머무는 마치 진골제같은 방식은 문제가 있다. 그래서 아래와 같은 **멀티레벨 피드백 큐**가 나왔다.

### 06 Multilevel Feedback Queue

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmogwcuuvcj31180qwtnf.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fmogwhf08oj310y0r87cv.jpg)

CPU가 긴 IO는 아래로 내려간다.


![](https://ws4.sinaimg.cn/large/006tKfTcgy1fmogyrmpnfj311u0pah0e.jpg)

##  

#CPU가 여러개일 경우의 Multiple-Processor Scheduling

**Multiple-Processor Scheduling ?**

- CPU가 여러 개인 경우 스케줄링은 더욱 복잡해짐

- Homogeneous processor(동일 기능 프로세서)인 경우
  - Queue에 한줄로 세워서 각 프로세서가 알아서 꺼내가게 할 수 있다.
  - 반드시 특정 프로세서에서 수행되어야 하는 프로세스가 있는 경우에는 문제가 더 복잡해짐

- Load sharing
  - 특정 CPU만 놀고 다른 CPU는 놀면 안되기 때문에 Load sharing이 필요!
  - 일부 프로세서에 job을 올리지 않도록 부하에 적절히 공유하는 메커니즘 필요
  - 별개의 큐를 두는 방법 vs 공동 큐를 사용하는 방법
    ​

- Symmtric Multiprocessing(SMP) - 대칭 다중처리
  - 모든 CPU가 대등한 관계를 말함
  - 각 프로세서가 각자 알아서 스켸줄링 결정
  - 공통의 Ready Queue를 갖거나, 각자 고유(Private)의 Ready Queue를 가질 수 있다.
    ​

- Asymmetirc multiprocessing - 비대칭 다중처리
  - CPU가 여러개 있는데, 그 중 하나가 전체적인 컨트롤을 담당하는 것!
  - 자료 공유의 필요성이 감소시키므로 단순하다.
  - 하나의 프로세서가 시스템 데이터의 접근과 공유를 책짐지고 나머지 프로세서는 거기에 따름

- 프로그램 친화성(Processor affinity) : 프로세스의 프로세서 이주 정도

  - 프로세스가 수행될 때는 프로세서(CPU)의 캐시에 올라가므로, 프로세서를 이주하는 것은 상당한 비용이 드는 작업이다.
  - **약한 친화성(soft affinity)** : 가급적 동일 프로세서에서 수행하려 하나, 이주할 수도 있다.
  - **강한 친화성(hard affinity)** : 시스템 호출을 사용하여, 어떤 프로세스는 처리기 사이를 이주하지 않는다고 명시할 수 있다.

- **NUMA(Non-Uniform Memory Access)** 구조인 경우, 프로세서 친화성을 더욱 잘 고려할 필요가 있다.
  ![](https://ws2.sinaimg.cn/large/006tNc79gy1fpkapcbb5wj30me0c0dgv.jpg)

- SMP 시스템에서 여러 프로세서를 최대한 활용하려면 부하를 모든 처리기에 균등하게 배분하는 것이 중요하다.

- 하나의 공통 준비완료 큐를 사용하면 부하 균등화가 용이하다.

- 반면에, SMP를 지원하는 현대 운영체제에서는 각 프로세서가 **개별적인 준비완료 큐**를 가지고 있다.

  ​



## Real-Time Scheduling

- Hard real-time systems  
  : Hard real-time task는 정해진 시간안에 반드시 끝내도록 스케줄링해야 함
- Soft real-time computing  
  : Soft real time task는 일반 프로세스에 비해 높은 Prioirty를 갖도록 해야 함.
  ​

## Thread Scheduling

-  사용자 수준과 커널 수준 스레드로 구분
- 다대일, 다대다 모델에서, 스레드 라이브러리(thread library)는 사용자 수준스레드를 LWP에서 동작하도록 스케줄한다.
  - 이 경우, 스케줄링 경쟁이 프로세스 내에서 발생하기 때문에, 프로세스-경쟁 범위 (Process-contention scope: PCS) 라 부른다.
  - (라이브러리에서 수행되므로, 사실 커널은 사용자 수준 스레드의 존재를 알지 못한다.)
    ​
- Local Scheduling  
  : User level thread의 경우 사용자 수준의 thread libreay에 의해 어떤 thread를 스켸줄할지 결정  
- Global Scheduling  
  : Kernel level thread의 경우 일반 프로세스와 마찬 가지로 커널의 단기 스케줄러가 어떤 thread를 스케줄할지 결정  
  ​



## Algorithm Evaluation(알고리즘 평가)

어떤알고리즘이 좋은 평가하는 3가지 방법이 있다.  

- Queueing models(이론적인 방법)  
  : **확률 분포**로 주어지는 **arrival rate**와 **service rate**등을 통해 각종 **performance index** 값을 계산
- Implementation(구현) & Measurement(성능 측정)  
  : **실제 시스템**에 알고리즘을 **구현**하여 실제 작업(**workload**)에 대해서 성능을 **측정** 비교
- Simulation(모의 실험)  
  : 알고리즘을 **모의프로그램**으로 작성 후 **trace**(input)를 입력으로 하여 결과 비교

