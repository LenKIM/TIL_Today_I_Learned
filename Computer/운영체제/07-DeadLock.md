## DeadLock

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn2cuheofjj30zi0skwqx.jpg)



### Deadlock

- 일련의 프로세스들이 서로가 가진 자원을 기다리며 block된 상태

### Resource(자원)

- 하드웨어, 소프트웨어 등을 포함하는 개념
- (예) I/O devioce, CPU cycle, memory space, semaphore 등
- 프로세스가 자원을 사용하는 절차
  - Request, Allocate, use, Release
- Deallock Example 1
  - 시스템에 2개의 tape drive가 있다.
  - 프로세스 P1과 P2 각각이 하나의 tape drive를 보유한 채 다른 하나를 기다리고 있다.
- Deallock Example 2
  - Binary semaphores A and B



### Deadlock 발생의 4가지 조건

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn2d1ayruzj310a0kuk6m.jpg)



데드락이 발생했는지 확인하기 위해서는 Resource-Allocation Graph(자원할당그래프)를 그려서 알아보게 됩니다.


![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn2d65uy89j30zw0m87cg.jpg)

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn2dbn6xszj310k0s6toe.jpg)

- 그래프에 cycle이 없으면 deadlock이 아니다.
- 그래프에 cycle이 있으면 (그럴수도, 아닐수도)
  - If only one instance per resource type, the deadlock
  - if serveral instances per resource type, possibility of deadlock



### 데드락의 처리 방법?

1. Deadlock Prevention  

   \- 자원 할당 시 Deadlock의 4가지 필요 조건 중 어느 하나가 만족되지 않도록 하는 것

2. Deadlock Avoidance  
   \- 자원 요청에 대한 부가적인 정보를 이용해서 deadlock의 가능성이 없는 경우에만 자원을 할당  
   \- 시스템 state가 원래 state로 돌아올 수 있는 경우에만 자원 할당

위 두 가지는 예방 방법

3. Deadlock Detection and recovery  
   \- Deadlock 발생은 허용하되 그에 대한 detection 루틴을 두어 deadlock 발견시 recover
4. Deadlock Ignorance  
   \- Deadlock을 시스템이 책임지지 않음  
   \- UNIX를 포함한 대부분의 OS가 채택

위 두 가지는 예방이 아니라 놔두고 처리



### Deadlock Prevention

- **Mutual Exclusion**  
  \- 공유해서는 안되는 자원의 경우 반드시 성립해야 함
- **Hold and Wait**  
  \- 프로세스가 자원을 요청할 때 다른 어떤 자원도 가지고 있지 않아야 한다.  
  \- 방법1. 프로세스 시작 시 모든 필요한 자원을 할당받게 하는 방법  
  \- 방법2 자원이 필요한 경우 보유 자원을 모두 놓고 다시 요청
- **No Preemption**  
  \- process가 어떤 자원을 기다려야 하는 경우 이미 보유한 자원이 선점됨  
  \- 모든 필요한 자원을 얻을 수 있을 때 그 프로세스는 다시 시작된다.  
  \- State를 쉽게 save하고 restore할 수 있는 자원에서 주로 사용(CPU, memory)
- **Circular Wait**  
  \- 모든 자원 유형에 할당 순서를 정하여 정해진 순서대로만 자원 할당  
  \- 예를 들어 순서가 3인 자원 Ri를 보유 중인 프로세스가 1인 자원Rj을 할당받기 위해서는 우선 Ri를 release해야 한다.

#### => Utilization 저하, throughput 감소, starvation 문제

생기지도 않을 데드락을 생각해서 만들기 때문에 위와같은 이유같이 불안전 발생

### Deadlock Avoidance  

- 자원 요청에 대한 부가정보를 이용해서 자원 할당이 deadlock으로 부터 안전(safe)한지를 동적으로 조사해서 안전한 경우에만 할당
- 가장 단순하고 일반적인 모델은 프로세스들이 필요로 하는 각 자원별 최대 사용량을 미리 선언하도록 하는 방법임.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn2dro4tnfj310e0gqtk8.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn2dw7w7kpj310o0sy7k5.jpg)

프로세스가 하나라면 Resource Allocation Graph Algo 를 사용하여 해결

점선은 프로세스가 항상 자원에게만 가고, 의미는 평생에 한번은 사용할 일이 있다라는 의미.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn2e03cywsj310o0u4aru.jpg)

만약 가능성이 있으면 변경되어 애초에 방지한다.

여러개의 프로세스의 경우에는 아래와 같이 작성하여 해결

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn2e8ps8uvj313k0se4dw.jpg)



Available은 전체에서 Allocation을 빼면 나온다. 그리고 프로세스를 사용하고 나서 반납할 수 있는 프로세스를 찾아랏!

최대요청을 가정한다. => Banker's Algorithm은 이를 뜻한다. 왜 최대로 요청해야지 안정한가? **Max로 되면 더 이상 요청할 수 없기 때문에 무조건 반납하게 될 것이다.**  이를 가정해서 무조건 최대요청을 가정!

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn2eums7rnj31cy142avj.jpg)



### Deadlock Detection And Recovery

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn2ezs98pfj31120p2wru.jpg)

싱글 프로세스의 경우에는 아래와 같이 Wait-for graph 알고리즘을 활용합니다.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn2ey31cvfj30wq0ocn58.jpg)

사이클을 찾는 오버헤드는 얼마나 될까? O(n^2)



다중 프로세스의 경우에는 

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn2f3ifs6hj30y00o2tkr.jpg)



데드락이 있는가 없는가는 낙관적인 접근으로 확인해야 한다.

**만약 P2의 Request가 0 0 1 이라면 데드락이 발생한다.**



만약 위와 같이 데드락이 발견이 된다면?

1. 연루된 프로세스들을 끝내버린다.
2. 하나씩 없애보면서 데드락을 예방한다.
3. 자원 선점

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn2f9ijghij311c0lw13s.jpg)



### Deadlock Ignorance

- Deadlock이 일어나지 않는다고 생각하고 아무런 조치도 취하지 않음
  - Deadlock이 매우 드물게 발생하므로 deadlock에 대한 조치 자체가 더큰 overhead일 수 있음
  - 만약, 시스템에 deadlock이 발생한 경우 시스템이 비정상적으로 작동하는 것을 사람이 느낀 후 직접 process를 죽이는 등의 방법으로 대처
  - UNIX, Windows 등 대부분의 OS가 이를 채택한다.