## Disk Scheduling

**디스크를 관리하는 최소 단위는 섹터이다.**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fndr8u0rqrj314e0uqnnw.jpg)

섹터는 디스크 내부에서 관리하는 단위이고, 이는 컨트롤러가 조절한다. 

디스크를 관리하는 단위는 Logical block이라고 한다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fndr9z0nssj31320lg7dl.jpg)

1차원 배열에서 몃번째 정보를 달라라고 요청하면 디스크 컨트롤러는 어떠한 원판에 어떤 트랙에 어떠한 조각에 위치시키겠는가를 결정.

Logical block과 Secoter가 매핑되어 있다.  

**포맷팅이랑 디스크를 컨트롤러가 읽고 쓸 수 있도록 섹터들로 나누는 과정이다.** 각각의 섹터는 logical block을 저장하기도 하지만 부가적으로 header와 trailer가 저장된다. 이 두개는 sectort number, ECC(Error-Correcting Code)등의 정보가 저장되며 Controller가 직접 접근 및 운영한다. ECC는 마치 핑거프린트와 같이 축약된 정보를 담고 있다.



![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndrqr2kczj312o0s6ayo.jpg)

C  / D드라이브 나누는 것을 파티셔닝이라고 한다. OS는 각각의 독립적인 디스크로 취급한다.

Logical formatting을 파일 시스템을 만드는 것이라고 한다.  

### Disk을 접근하는 시간은 어떻게 되는지?

크게 3가지로 나눠지는데,

1. Seek time : 가장 큰 시간이 걸린다.
2. Rotational latency : 헤드가 원하는 섹터에 도달하기까지 걸리는 회전지연시간(Seek time의 10/1)
3. Transfer time : 실제 데이터의 전송시간 (거의 시간이 안듬)

여러 개의 요청을 효율적으로 처리해서 seek time을 줄이는데 목표로 한다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fnds1j499aj311w0r2akk.jpg)

디스크보다는 운영체제가 디스크 스케줄링 알고리즘을 처리한다. 논리블럭을 보고 디스크 스케줄링을 처리한다.
98, 183, 37, 122, 14, 124, 65, 67

1. FCFS  
   ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fnds3nx3unj30z80t6tj7.jpg)
   디스크의 헤드가 순서대로 처리하게 된다면 헤드의 이동거리가 위와 같이 굉장히 비효율적이다.

2. SSTF
   ![](https://ws3.sinaimg.cn/large/006tKfTcgy1fnds4rx0zaj310u0tgk1y.jpg)

   디스크의 이동거리가 FCFS보다는 줄어드는게 사실이지만, Starvation이 발생할 수 있다는 것이 단점이다.

3. SCAN (엘리베이터 스케줄링이라고도 불린다.)
   어떤 상황에 구애받지 않고, 가장 바깥쪽까지 처리하고 반대로 또 쭉욱
   ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fnds7ku1jfj310e0sg12a.jpg)
   비교적 효율적이다. 그러나 문제점으로 가운데 부분은 기다리는 시간의 예상 기대치가 짫다. 왜 그럴까? 잘생각해보면 중간에 기다려야하는 요소들이 존재할 것이다.
   ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndsh6oexlj310s0syqak.jpg)

   ​

4. C-SCAN
   이동거리는 다시 길어질 수 있지만, 큐에 들어온 대기 시간이 SCAN보다는 더욱 균일해질 것이다.
   ![](https://ws4.sinaimg.cn/large/006tKfTcgy1fndsb6fmhij30zg0owqa9.jpg)

5. N-SCAN  
   \- SCAN의 변형 알고리즘  
   \- 일단 arm이 한 방향으로 움직이기 시작하면 그 시점 이후에 도착한 job은 되돌아올 때 service

6. C-LOOK
   SCAN은 요청이 있든 없든 끝에서 끝을 갔는데, 이것이 비효율적이다라고 판단하여 183까지 가고 더이상 요청이 없으므로 방향을 틀어서 14까지만 갔다가 돌아온다.
   ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fndsfzwecjj30z60tan5c.jpg)

   ​

**어떤 알고리즘이 좋은 알고리즘이냐?**
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndsjblqa2j30zy0m4gxx.jpg)

파일을 어떻게 할당하는가에 따라 디스크 스케쥴링의 성능을 좌우한다.

### Swap-Space Management

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndstyi404j312g0q04ki.jpg)

보조기억장치를 활용하는 두가지 이유는 

1.  메모리가 휘발성의 성질을 가지고 있기 때문에
2.  D RAM 메모리가 한정되어 있기 때문에

Seek Time을 줄이기 위해서 큰 단위로 순차적으로 할당한다. 512 512 512 16 32 64 128 등등.



### RAID(Redundant Array of Independent Disks)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndszk1y4uj31300tanc3.jpg)

