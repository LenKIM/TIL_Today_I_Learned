## Memory Mamagement



### 논리적 vs 물리적 주소

**Logical address(=virtual address)**

- 프로세스마다 독립적으로 가지는 주소 공간
- 각 프로세스마다 0번지부터 시작
- CPu가 보는 주소는 logical address 임

**Physical address**

- 메모리에 실제 올라가는 위치



주소 바인딩 : 주소를 결정하는 것

Symbolic Address -> Logical Address -> Physical address

논리적 주소에서 물리적 주소로 변환되는 시점이 언제인가?

symblic이 무엇일까? 프로그래머입장에서 실제 주소가 아니라 코드를 통해 메모리를 사용하는데, 이 때 코드가 어떻게 보면 symbolic 이라고 말할 수 있다.  

### 주소 바인딩(Address Binding)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3hfm5fqrj313w0u2x4p.jpg)

- Compile time binding   
  논리적 주소를 물리적 주소로 결정되어 있는 주소를 활용한다. 0, 10, 20, 30, 40 등 낭비되는 공간이 많아서 더 이상 활용되지 않는다.  

  \- 물리적 메모리 주소(physical address)가 컴파일 시 알려짐  
  \- 시작 위치 변경시 재컴파일  
  \- 컴파일러는 절대 코드(absolute code)생성

- Load time binding  
  물리적주소 500번부터 올리겠다라는 것  
  \- Loader의 책임하에 물리적 메모리 주소 부여  
  \- 컴파일러가 재배가능코드(relocatable code)를 생성한 경우 가능

- Execution time binding(=Run time binding)  
  실행도중에 주소가 바뀔수 있다라는 것을 말합니다.  
  \- 수행이 시작된 이후에도 프로세스의 메모리 상 위치를 옮길 수 있음  
  \- CPU가 주소를 참조할 때마다 binding을 점검(address mapping table)  
  \- 하드웨어적인 지원이 필요.  (base and limit register MMU)

지금의 컴퓨터는 Run time binding을 사용한다.



CPU가 바라보고있는 것인 Logical  address를 보고 있다. 잘 생각보면 그렇다.  

### #런타임 바인딩이 되려면 하드웨어가 필요한데? MMU

### Memory-Management Unit (MMU)

**\- logical address를 physical address로 매핑해주는 Hardware device**

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3hsn5fcmj312m0t87fl.jpg)

만약 limit register보다 더 큰 메모리의 주소를 달라고 한다면 악의적으로 나쁜 접근이기 때문에 막는다.

Hardware Support for Address Translation

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3htjyxwwj31380pqds1.jpg)

 여기서 다시한번 살펴보면, no로가면 trap에 걸린다.



**이제부터는 4가지 정도 용어를 살펴볼 것이다.**

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3i06dnr6j31020okjyk.jpg)

#### Dynamic Loading

- 프로세스 전체를 메모리에 미리 다 올리는 것이 아니라 해당 루틴이 불려질 때 메모리에 load하는 것

- Memory utilization의 향상

- 가끔식 사용되는 많은 양의 코드의 경우 유용

- 운영체제의 특별한 지원 없이 프로그램 자체에서 구현가능(OS는 라이브러리를 통해 지원 가능)

  \- Loading : 메모리로 올리는 것

지금의 컴퓨터는 Dynamic loading과 유사하지만, 엄연히 OS의 페이징기법에 의해서 OS에 의해서 변하기 때문에 다른 것이다. 프로그래머가 직접 Dynamic Loading을 할 수 있는 코딩을 한다. 이를 라이브러리릍 통해서 동작시킴  

#### Overlays

- 메모리에 프로세스의 부분 중 실제 필요한 정보만을 올림
- 프로세스의 크기가 메모리보다 클 때 유용
- 운영체제의 지원없이 사용자에 의해 구현
- 작은 공간의 메모리를 사용하던 초창기 시스템에서 수작업으로 프로그래머가 구현  
  \- "Manual overlay"  
  \- 프로그래밍이 매우 복잡  
  \- 라이브러리가 아니라 직접 수작업

#### Swapping

- Swapping  
  \- 프로세스를 일시적으로 메모리에서 backing store(보조기억장치)로 쫓아 내는것

- Backing store(= swap area)  
  \- 디스크

- Swap in / Swap out  
  \- 일반적으로 중기 스케줄러에 의해 swap out 시킬 프로세스 선정  
  \- priority-based CPU scheduling algorithm

  - priority가 낮은 프로세스를 swapped out 시킴
  - priority가 높은 프로세스를 메모리 시킴  

  \- Compile time 혹은 load time binding 에서는 원래 메모리 위치로 swap in 해야 함  
  \- Execution time 혹은 load time binding에서는 원래 메모리 위치로 swap in해야 함  
  \- swap time은 대부분 transfer time(swap되는 양에 비례하는 시간)임

- 잘생각해보면 Run time binding과 조합적으로 이루어질 것이라 예상할 수 있다.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3ie47om0j30za0skwt0.jpg)



본연의 swapping은 이것이 맞지만, 현대는 페이징 기법에 의해서 일부 페이지만 쫒겨나는것을 swapping이라고도 표현한다. 그러나 원칙적으로는 프로그램의 구성요소 모든 부분이 쫒겨나는 것을 말한다.

#### Dynamic Linking

- Linking을 실행 시간(execution time)까지 미루는 기법

- **Static linking**

  \- 라이브러리가 프로그램의 실행 파일 코드에 포함됨  
  \- 실행 파일의 크기가 커짐  
  \- 동일한 라이브러리를 각각의 프로세스가 메모리에 올리므로 메모리 낭비(printf 함수의 라이브러리 코드)

- **Dynamic linking**

  \- 라 이브러리가 실행시 연결(link)됨  
  \- 라이브러리 호출 부분에 라이브러리 루틴의 위치를 찾기 위한 stub이라는 작은 코드를 둠  
  \- 라이브러리가 이미 메모리에 있으면 그 루틴의 주소로 가고 없으면 디스크에서 읽어옴  
  \- 운영체제의 도움이 필요.



##### 물리적인 메모리를 어떻게 관리할 것인가??

### Allocation of Physical Memory

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3inuc3v1j313k0t81dg.jpg)

- 연속할당  
  : 앞에서 주소를 설명해서 보여줬던 그림이 연속할당에 의한 메모리 관리 기법  
  \- Fixed partition allocation  
  \- Variable partition allocation  
- 불연속할당  
  : 프로그램을 구성하는 주소 공간을 잘게 쪼개서 일부는 저쪽에, 일부는 이쪽에 올리는 것을 불연속할당이라고 한다.  
  \- Paging  
  \- Segmentation  
  \- Paged Segmentation  



### 연속 할당

- 고정분할방식
- 가변분할방식

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3ixj2mykj311a0tkqly.jpg)

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3ir7zybzj314u0toaou.jpg)



낭비되는 메모리 조각이 위에서 발생했다.  
외부조각
: 이 프로그램을 메모리에 올릴려고 하는데, 올릴려는 공간이 너무 작아 들어갈 수 없는 경우

내부조각  
: 프로그램 B를 넣었지만 남는 부분을 내부조각이라고 부른다.

그러나 상황에 따라 조각을 부르는 이름이 달라질 수 있다.  

가변분할 방식은 차곡차곡 쌓아 올린 후, A, B C로 놓은 뒤에 B가 끝나고 D가 수행될 때 , B가 작아서 들어갈 수 없기에 외부 조각  

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3iyaxw6rj311s0te17h.jpg)



어디에 프로그램을 넣어야 하는가? 가변분할에서 발생하는 이문제에 대해서 

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3j0tbx5gj313g0um7oc.jpg)

위와 같이 해결한다!



또다른 해결방법으로 compaction이 있는데, 이는 사용 중인 메모리 영역을 한군대로 모으는 것! 위 2번째 그림의 방식과 동일.



![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn3j5h0somj313g0t04by.jpg)



## 가변분할 방식 3가지(Paging /Segmentation / Paged Segmentation)



하나의 프로그램을 같이 페이지로 잘라서 페이지 단위로 물리적인 공간에 올려놓거나 Backing store에 올려놓는 것을 말함.  


가변분할을 사용하는 경우, 주소변환을 페이징별로 해야되기 때문에 어드레스 바인딩이 더 어려워 진다!  


Segmentation 기법은, 의미있는 단위로 자르는 것을 Segmentation이라고 부른다.  



## Paging

**물리적인 메모리에 비연속 할당을 하는 여러가지 기법 중에 하나!**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn3jro7fdvj30zs0tith4.jpg)

index를 활용해서 곧바로 접근할 수 있는 자료구조이다.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3jujdfqtj30z80sqdnx.jpg)

**위의 d는 오프셋을 의미한다.**  


![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3k0fyk3bj31360lcql8.jpg)



속도 향상을 위해서 TLB라는 캐시를 활용한다.

2번의 접근을 막기 위해서 캐시메모리를 둔다.  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn3k3h25v6j30xk0twn5f.jpg)

메모리 주소변환을 위한 별도의 캐시를 두는데, 이를 TLB라고 한다.  
TLB에 있을경우 직접적 접근 만약 없으면 page table에 접근한 뒤, 내용을 TLB에 넣는다.  

그러나 TLB에 접근해서 찾는 것이 동기적이라면, 오래 걸릴것이다. 그래서 

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3kaguoh5j31g40y24qp.jpg)

그렇다면 얼마나 효과적일까?

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3kc1wqnij30zi0non68.jpg)



**캐시메모리를 이용해서 접근이 더 빠르게 한다.**

### 이번에는 2단계 페이지테이블이 있다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3kev0cl3j30zs0ssdqd.jpg)



왜 이런 2단계 페이지 테이블을 쓰는가?  
속도를 빠르게 하던지, 공간을 줄이던지 등 과연 2단계 페이지테이블은 왜 쓰는 걸까?

속도는 일단 아니고, 공간을 효과적으로 줄일 수 있다.  

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3kg7j9x5j311y0mmaqr.jpg)

2^10 = K 

2^20 = M

2^30 = G

때문에 4G의 주소 공간을 쓸 수 있다. 

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3kev0cl3j30zs0ssdqd.jpg)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3ksy0n6rj313u0tqnf4.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn3kt7wmkoj312y0rogtt.jpg)


2^12을 구분하기 위해서는 12비트가 필요하다.



시간은 더 걸리지만 공간을 줄일수 있다? 아닐걸? 엔트리가 100만개 그러나 2단계를 쓸 경우, 동일하게 100만개 

그럼 왜 2단계 페이지 테이블을 쓰는거지?

 왜? 1단계 paging의 일부분은 사용하지 않는다. 그렇기 때문에 2단계 Paing table을 사용할 경우, 사용하지 않는 공간에 대해서는 null을 포인터만 가리키고 사용되는 부분을 더 효율적으로 쓸 수 있다.



![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3l6d1dcfj31kw10r7wh.jpg)

