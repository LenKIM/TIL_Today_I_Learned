## Memory Mamagement

### 논리적 vs 물리적 주소

**Logical address(=virtual address)**

- 프로세스마다 독립적으로 가지는 주소 공간
- 각 프로세스마다 0번지부터 시작
- CPU가 보는 주소는 logical address 임

**Physical address**

- 메모리에 실제 올라가는 위치



주소 바인딩 : 주소를 결정하는 것

Symbolic Address -> Logical Address -> Physical address

논리적 주소에서 물리적 주소로 변환되는 시점이 언제인가?

symblic이 무엇일까? 프로그래머입장에서 실제 주소가 아니라 코드를 통해 메모리를 사용하는데, 이 때 코드가 어떻게 보면 symbolic 이라고 말할 수 있다.  



## BACKGROUND

- 전형적인 명령어 실행 과정:

  1) 기억장치로부터 한 명령어를 가져온다 : fetch  
  2)명령어를 해독한다. decoding  
  3) 기억장치로부터 피연산자를 가져와서 명령어를 실행한다. 계산 결과를 다시 기억장치에 저장한다. (execute, store)  

- 사용자 프로그램의 실행 과정

  ![](https://ws2.sinaimg.cn/large/006tNc79gy1fpkifl578dj30no0fwq5i.jpg)

  - 연결 편집기(Linkage Editor)
    - 재배치 가능한 주소를 절대 주소로 바인딩(Binding)시킨다.
  - 기억장치 주소 공간에서 명령어와 데이터의 바인딩의 종류 : 바인딩 시점에 따라
    - 컴파일 시간(compile time) 바인딩
      \- 컴파일 시간에 기억장치 내에 들어갈 위치를 알아 바인딩하는 것으로 절대 코드를 생성한다.  
      \- 재배치 가능한 주소로 바인딩  
      \- MS-DOS의 command.com 파일
    - 적제 시간(load time) 바인딩  
      \- 프로그램이 주기억장치로 적재되는 시간에 이뤄짐  
      \- 이 경우 시작주소가 변경되면 사용자 코드를 언제나 다시 적재하면 된다.  
    - 실행시간(execution time) 바인딩  
      \- 실행 시점에 바인딩이 이뤄짐  
      \- 절대주소로 바인딩

  [참고하면 좋은 자료](http://contents.kocw.or.kr/document/lec/2011_2/chungbuk/LeeJongyun_09.pdf)

### 주소 바인딩(Address Binding)

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3hfm5fqrj313w0u2x4p.jpg)

- Compile time binding   
  논리적 주소를 물리적 주소로 결정되어 있는 주소를 활용한다. 0, 10, 20, 30, 40 등 낭비되는 공간이 많아서 더 이상 활용되지 않는다.  

  \- 물리적 메모리 주소(physical address)가 컴파일 시 알려짐  
  \- 시작 위치 변경시 재컴파일  
  \- 컴파일러는 절대 코드(absolute code)생성

- Load time binding  
  물리적주소 500번부터 올리겠다라는 것  
  \- **Loader**의 책임하에 물리적 메모리 주소 부여  
  \- 컴파일러가 재배치가능코드(relocatable code)를 생성한 경우 가능

- **Execution time binding(=Run time binding)**  
  실행도중에 주소가 바뀔수 있다 라는 것을 말합니다.  
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

#### Dynamic Linking

- Linking을 실행 시간(execution time)까지 미루는 기법

- **Static linking**

  \- 라이브러리가 프로그램의 실행 파일 코드에 포함됨  
  \- 실행 파일의 크기가 커짐  
  \- 동일한 라이브러리를 각각의 프로세스가 메모리에 올리므로 메모리 낭비(printf 함수의 라이브러리 코드)

- **Dynamic linking**

  \- 라이브러리가 실행시 연결(link)됨  
  \- 라이브러리 호출 부분에 라이브러리 루틴의 위치를 찾기 위한 stub이라는 작은 코드를 둠  
  \- 라이브러리가 이미 메모리에 있으면 그 루틴의 주소로 가고 없으면 디스크에서 읽어옴  
  \- 운영체제의 도움이 필요.

#### Overlays

- 메모리에 프로세스의 부분 중 실제 필요한 정보만을 올림
- 프로세스의 크기가 메모리보다 클 때 유용
- 운영체제의 지원없이 사용자에 의해 구현
- 작은 공간의 메모리를 사용하던 초창기 시스템에서 수작업으로 프로그래머가 구현  
  \- "Manual overlay"  
  \- 프로그래밍이 매우 복잡  
  \- 라이브러리가 아니라 직접 수작업
-  자주 사용되는 부분은 메모리에 상주시키고, 그렇지 않은부분은 오버레이 영역으로 정의하여 필요에 따라 적재한다.
-  또한오버레이영역은시스템버퍼와같이다른용도로도사용된다.
- 상주 부분에는 오버레이 구동기(overlay driver)로 포함된다.
- 중첩(overlay) 구조를 위해 특별한 재배치 또는 연결프로그램이 필요하다.
- 중첩기법의경우OS가할일은거의없고,반면에
- 프로그래머가 해야 할 일은 많다.

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



## 물리적인 메모리를 어떻게 관리할 것인가??

### Allocation of Physical Memory

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3inuc3v1j313k0t81dg.jpg)

- 연속할당(Contiguous allocation)  
  : 앞에서 주소를 설명해서 보여줬던 그림이 연속할당에 의한 메모리 관리 기법  
  \- Fixed partition allocation  
  \- Variable partition allocation  
- 불연속할당(Noncontiguous allocation)  
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
**외부조각**
: 이 프로그램을 메모리에 올릴려고 하는데, 올릴려는 공간이 너무 작아 들어갈 수 없는 경우

**내부조각**  
: 프로그램 B를 넣었지만 남는 부분을 내부조각이라고 부른다.

그러나 상황에 따라 조각을 부르는 이름이 달라질 수 있다.  

가변분할 방식은 차곡차곡 쌓아 올린 후, A, B C로 놓은 뒤에 B가 끝나고 D가 수행될 때 , B가 작아서 들어갈 수 없기에 외부 조각  

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn3iyaxw6rj311s0te17h.jpg)



어디에 프로그램을 넣어야 하는가? 가변분할에서 발생하는 이문제에 대해서 

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn3j0tbx5gj313g0um7oc.jpg)

위와 같이 해결한다!



또다른 해결방법으로 compaction이 있는데, 이는 사용 중인 메모리 영역을 한군대로 모으는 것! 위 2번째 그림의 방식과 동일.



![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn3j5h0somj313g0t04by.jpg)

**단편화압축 (Compaction)**
단편화 영역을 한 쪽으로 옮겨 커다란 가용 공간을 만드는 작업
쓰레기 수집(Gabage Collection)이라고 부릅니다.
쓰레기 수집하는 시간에는 시스템은 다른 작업을 할 수 없습니다.


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

 왜?  
1단계 paging의 일부분은 사용하지 않는다.  
그렇기 때문에 2단계 Paing table을 사용할 경우, 사용하지 않는 공간에 대해서는 null을 포인터만 가리키고 사용되는 부분을 더 효율적으로 쓸 수 있다.

사용되지 않는 부분은 NULL로 표현하기때문에, 더 효율적으로 쓸 수 있다.



![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn3l6d1dcfj31kw10r7wh.jpg)

페이지가 많다고 과연 시간이 오래걸린다고 표현할 수 있을까?
위 계산식을 보면, TLB를 쓴다고 해도 결과적으로 28ns만 소요한다. 그러므로 오래걸린다고 표현할 수 없다. (오버헤드가 많이 걸리는 것이 아니다.)

페이지 테이블에서는 보호 기능도 제공하는데, 테이블의 각 항목에는 주소변환정보 뿐만 아니라 메모리 보호를 위한 보호비트와 유효-무효를 두고 있다. 

**보호 비트는 각 페이지에 대한 접근 권한의 내용을 담고 있다. 한 프로세스의 주소 공간은 다른 프로세스에 의해 접근될 수 없으므로 '누구'에 해당하는 접근 권한을 설정할 필요는 없으며, 각 페이지에 대해' 어떠한'접근을 허용하느냐에 대한 정보가 보호 비트에 저장된다.**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn4hetniemj310m0rmgvi.jpg)



V와 I 비트로 사용되지 않는 영역에도 엔트리가 만들어져야 하는데, 페이지 특성상 위에서부터 접근하게 되는데, 6,7번은 없지만, 주소체계에서는 만들어지고 대신 사용이 안된다.



**V I 의 의미는? 0번 페이지가 2번주소에 올라와있다.**   
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn4hjg9xh8j311y0uck8x.jpg)



**Protection의 의미는 어떤 연산에 대한 접근권한을 나타내는 것이다. 프로그램의 코드 부분을 담고있는 코드도 있을테고, 스택부분을 담고있는 코드도 있을 것이다. 연산의 권한을 표시하기 위한 비트이다.**

### Inverted Page Table

기본의 table은 많은 용량을 차지하고 있는 것이 문제다.**(공간 오버헤드가 많아서 생긴 것이 Inverted Page Table)**

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn4hmu0alnj311a0tetoz.jpg)

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn4hnncnhcj314e0umwp6.jpg)



시스템안에 페이지가 딱 하나 존재한다. System wide하게 존재한다.  
주소변환을 하려면 페이지 엔트리를 들어가서 확인.  
그러나 Inverted Page는 문제가 있다.  

**페이지 프레임만큼 엔트리가 있어서, 내용이 반대로 적재되어 있다.**  

페이지테이블에 대한 공간을 줄이고자 Inverted page를 사용하지만, 검색이라는 시간이 걸리기 때문에 오버헤드가 크기 때문에, 효율적이다라고 말할 수 없다.



논리적인 페이지 주소뿐만아니라, 

**그레서** 병렬로 탐색할 수 있도록 associative register를 활용한다.


![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn4hxyjvtlj31240t0nei.jpg)



**일반적으로 p만큼 떨어진 곳의 프레임 번호를 찾았다면 역 페이지 테이블은 전체 테이블을 탐색해서 찾은 테이블까지의 인덱스를 프레임 번호라고 결정하는 것을 말한다.**

**일반 페이지 테이블과 반대**

**이렇게 활용하는 것에 장점은 메모리공간을 작게 사용가능하다. 그러나 주소변환 시간이 더 오래 걸릴 것이다.**



### Shared Page

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn4hzjkv9mj311o0u0dqm.jpg)



공유할 수 있는 코드는 Copy해서 같이 올림(재진입코드)


![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn4i0nfn0ij312q0oy7j0.jpg)

 그러나 Shared Page의 제역으로는 동일한 위치에 logical address space를 가지고 있어야 합니다.  



## Segmentation

- 프로그램은 의미 단위인 여러 개의 segment로 구성  
  \- 작게는 프로그램을 구성하는 함수 하나하나를 세그먼트로 정의  
  \- 크게는 프로그램 전체를 하나의 세그먼트로 정의 가능  
  \- 일반적으로는 code, data, stack 부분이 하나씩의 세그먼트로 정의됨  
- Segment는 다음과 같은 logical unit들임  
  \- Main() / function / global variables / stack / symbole table, arrays



![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn4ipqy6rvj31220ow4hh.jpg)

< Segment-number, offset > 으로 구성됨을 기억하자.

**그리고 STBR와 STLR의 정의를 기억하기.**

세그멘테이션은 의미단위로 자르기 때문에, limit를 가지고 있다.  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn4iuxyhxtj31020sqjzz.jpg)



세그먼테이션이 페이징기법과 유사해보이지만 확실히 다른 것이다.  
페이징은 동일한 크기이지만 세그멘테이션의 경우, 크기가 균일하지 않기 때문에 다르다.   
Segment table의 엔트리 개수가 일정하지 않다.  
물리적인 메모리의 어디에 올라가있는가?  

얼마나 떨어져있는가 d로 찾는다.  
세그먼테이션은 크기가 균일하지 않기 때문에, 길이가 얼마인지 엔트리에 같이 담아둔다. limit 와 base 가 이를 말해준다.  


**STBR과 STLR은 위 두개와 다른 것!!**  
**테이블의 시작 위치 테이블의 엔트리 전체 개수가 몃개인지를 담고 있다.**

32bit라고 하면 offset부분은 미리 결정되어야 하고, 최대 길이는 

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fn4iyluwioj313m0twwx1.jpg)

의미단위로 쪼개기 때문에 업무 효율은 page보다 더 높다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fn4j8g1dnyj30zs0tiqdl.jpg)

Page의 경우 백만개 그럴정도로 많지만, segment는 위와같이 5개 굉장히 의미단위로 처리한다.  

세그먼트의 크기가 균일하지 않기 때문에 중간중간 hole이 생기는데, 더 큰 세크먼드는 못들어가서 page와 동일하게 allocation의 문제가 생긴다.  
**페이지는 개수가 대단히 많다. 그러나 segement는 갯수가 몃개 없다.**  

테이블의 대한 낭비가 심한건 paging

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fn4jdk6xz9j315y12s17a.jpg)





### Segmentaion with Paging

세그먼트 하나가 여러개의 page로 나눠진다.  
각 프로그램이 가진 논리주소는 page 주소와 offset으로 구성된다.  
![](https://ws2.sinaimg.cn/large/006tKfTcgy1fn4jkemiv4j31ay14uavs.jpg)

세그먼트 하나가 여러개의 페이지로 구성되기 때문에  

무엇이 장점인가? Allocation 문제가 해결된다.  그러나 공유나 보안은 세그먼트테이블 레벨에서 한다. 

**segment length는 page table의 길이를 알고 있을것, page-table base는 페이지 테이블의 시작위치를 알려준다.**   
**d => page의 offset을 나타낸다!!!!**  



## 물리적 메모리 관리. 주소변환에서 운영체제의 역할은 무엇일까??

**없다. 모두가 하드웨어가 해줘야한다.**  왜 그래야 될까? 어떤 프로세스 하나가 cpu를 잡고 실행하면서 메모리의 접근을 하는데, 운영체제의 도움을 하나도 받지  않는다. 주소변환은 무조건 하드웨어적으로 이루어지는 일이다!  

**그럼 운영체제가 끼어드는 일은 언제? I/O장치가 실행될 때!**