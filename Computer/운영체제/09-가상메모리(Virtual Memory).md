## 가상메모리(Virtual Memory)

전적으로 운영체제가 관여한다.

 ### Demand Paging

- 실제로 필요할 때 page를 메모리에 올리는 것

  \- I/O 양의 감소  
  \- Memory 사용량 감소  
  \- 빠른 응답 시간  
  \- 더 많은 사용자 수용  

- Valid / Invalid bit 사용

  \- Invalid의 의미는?  
  ​	\- 사용되지 않는 주소 영역인 경우  
  ​	\- 페이지가 물리적 메모리에 없는 경우  
  \- 처음에는 모든 page entry가 invalid로 초기화  
  \- address translation 시에 invalid bit이 set되어 있으면  
  => **"page fault"**

![](http://ws2.sinaimg.cn/large/006tNc79gy1fn9jbowqfwj30zm0uck2p.jpg)

### Page Fault

- invalud page를 접근하면 MMU가 trap을 발생시킴(page fault trap)
- Kernel mode로 들어가서 page fault habdler가 invoke 됨
- 다음과 같은 순서로 page fault를 처리한다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fna2r20kknj31gk0jutxc.jpg)



![](https://ws1.sinaimg.cn/large/006tNc79gy1fna2rs8rn3j31go15enhk.jpg)

### 페이지 Fault 성능 측정

얼마나 나느냐에 따라 시간이 크게 좌우된다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fna2syn2ttj31j60wwh82.jpg)

 

 ![](https://ws4.sinaimg.cn/large/006tNc79gy1fna3mz4il3j317w0zch5y.jpg)



**페이지 교체는 OS에서 수행**

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna3piqyooj30xu0oagu9.jpg)



**그럼 어떤 알고리즘이 가장 좋은 알고리즘 일까?**

바로 **Optimal Algorithm**

미래에 참조될 페이지를 다 안다고 가정한다.

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna3r28ya7j30zc0qy7jk.jpg)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fna41nc4ulj31200sm7pm.jpg)



FIFO = 먼저 들어온걸 쫒아내면 됨.

3페이제에서 4페이지로 늘리면 성능일 좋아질것이라 생각하지만, 아니다!  
이런 기이한 현상을 FIFO Anomaly(=**Belay's Anomaly**) => more frames=> less page faults



![](https://ws4.sinaimg.cn/large/006tNc79gy1fna43hcp2hj311m0l47g3.jpg)

 ![](https://ws4.sinaimg.cn/large/006tNc79gy1fna5gvvbfyj313a0pg4ds.jpg)

### LRU, LFU의 차이점

![](https://ws2.sinaimg.cn/large/006tNc79gy1fna5jmyzngj314g0u6wss.jpg)

LFU의 단점이 도드라진다. page4가 가장 최근에 참조되었지만, 삭제되었다.  

이 둘의 단점을 극복하기 위해 다양한 알고리즘이 연구되고 있다.  



LFU는 한 줄로 세울 수 없다. LFU는 참조횟수가 1 늘어났다고 해서 가장 밑으로 내려오는 것이 아니라, 하나하나 다 확인해야 한다.  
"내가 널 이길 수 있다. 라고 생각."



![](https://ws3.sinaimg.cn/large/006tNc79gy1fna5qk6wl8j31cm10y7i6.jpg)

 LFU에서 참조가 하나 생길 경우, 하나씩 다 비교해야 한다! 극단적인 경우 O(n)이 나타난다. **그래서 LFU는 heap이라는 자료구조를 활용해서, 트리 형태로 구현한다.**
![](https://ws4.sinaimg.cn/large/006tNc79gy1fna5r0ltxtj31d4106asi.jpg)



![](https://ws3.sinaimg.cn/large/006tNc79gy1fna5twxbb0j31400t0ngq.jpg)



**위와 같은 교체 알고리즘을 캐슁기법이라고 부른다. 한정된 빠른 공간!!** 

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna6774hnuj31g015utvz.jpg)

위 과정에서는 하드웨어가 하는 것이다. 참조 시각, 참조횟수를 운영체제가 알 수 있는가? **알 수 없다.** 

그러나 buffer caching, Web caching에서는 사용될 수 있다.

페이지 시스템에서는 clock Algirithm이 사용된다.  

![](https://ws1.sinaimg.cn/large/006tNc79gy1fna6e2q0q2j31gw12qb29.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna6mpgsj0j31hg0wkk6k.jpg)



### Page Frame의 Allocation

- Allocation problem : 각 process에 얼마만큼의 page frame을 할당할 것인가?
- Allocation의 필요성
  - 메모리 참조 명령어 수행시 명령어, 데이터 등 여러 페이지 동시 참조
    - 명령어 수행을 위해 최소한 할당되어야 하는 frame의 수가 있음
  - Loop를 구성하는 page들은 한꺼번에 allocate되는 것이 유리함
    - 최소한의 allocation이 없으면 매 loop마다 page fault
- Allocation Scheme(**페이지 갯수를 얼마나 할당할 것인가?**)
  - Equal allocation : 모든 프로세스에 똑같은 갯수 할당
  - Proportional allocation : 프로세스 크기에 비례해서 할당
  - Priority allocation : 프로세스의 prioirty에 따라 다르게 할당



사실 할당하지 않더라도, replacement를 하다보면 알아서 할당되는 경우도 있을 것!

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna6uevw7xj31gm0rke1o.jpg)



### Thrashing

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna6x0rtnij31cc0uqkc0.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna6yivchfj31dc0zedr7.jpg)



멀티프로그래밍 degree를 조절해야 한다. 그렇게 함으로써 어느정도 메모리를 확보할 수 있도록 해주어야 한다.

이를 위해 Working-Set Model

![](https://ws2.sinaimg.cn/large/006tNc79gy1fna73obeifj311s0r8h2v.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna7786dq2j313y0r2apj.jpg)

**과거를 통해 다음을 추측한다.** 



그 다음이 PFF Scheme(Page- Fault Frequency)

워킹셋을 추징하는 것이 아니라, 

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna7lv7dr2j311y0qq13u.jpg)



페이지 디폴트를 많이 내는 프로그램은 더욱 프레임을 할당하고,  
적게 내는 프로그램은 프레임을 감소시킨다.

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna7o8sdsxj310g0retja.jpg)



페이지 사이즈 32비트에서 64비트로 변화하는 추세.  
**최근에는 4kb가 아니라 더 큰 사이즈를 활용한다.**