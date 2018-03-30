## 파일 시스템(File System)

- File
  - "A named collection of related information"
  - 일반적으로 비휘발성의 보조기억장치에 저장
  - 운영체제는 다양한 저장 장치를 file이라는 동일한 논리적 단위로 볼 수 있게 해줌
  - Operation
    - Create, read, write, reposition, lseek, delete, open, close.
- File attribute(혹은 파일의 metadata)
  - 파일 자체의 내용이 아니라 파일을 관리하기 위한 각종 정보들
    - 파일 이름, 유형, 저장된 위치, 파일 사이즈
    - 접근 권한(읽기/쓰기/실행), 시간(생성/변경/사용),소유자 등
- File system
  - 운영체제에서 파일을 관리하는 부분
  - 파일 및 파일의 메타데이터, 디렉토리 정보 등을 관리
  - 파일의 저장 방법 결정
  - 파일 보호 등



### Directory and logical Disk

- **Directory**
  - 파일의 메타데이터 중 일부를 보관하고 있는 일종의 특별한 파일
  - 그 디렉토리에 속한 이름 및 파일 attribute들
  - operation
    - Search for a file, create a file, delete a file  
    - list a directory, rename a file, traverse the file system
- **Partition(=Logical Disk)**
  - 하나의(물리적)디스크 안에 여러 파티션을 두는 게 일반적
  - 여러 개의 물리적인 디스크를 하나의 파티션으로 구성하기도 함
  - (물리적)디스크를 파티션으로 구성한 뒤 각각의 파티션에 **file system**을 깔거나 **swapping**등 다른 용도로 사용할 수 있음.



### Open()

파일의 메타데이터를 메모리에 올려놓는 것을 말합니다.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fna8pder48j31000u2tm8.jpg)

![](https://ws2.sinaimg.cn/large/006tNc79gy1fna8pqsidxj312o0pmh6x.jpg)

root의 metadata가 open file table에 들어간다.

![](https://ws3.sinaimg.cn/large/006tNc79gy1fna8tw43wvj31320ruk93.jpg)

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna8ungfzsj313u0setr4.jpg)



![](https://ws2.sinaimg.cn/large/006tNc79gy1fna8vv7n65j31320t4atf.jpg)

read(fb...) 는 PCB에 저장된 배열을 확인해서 open file table에서 주소를 찾아 물리적인 공간으로 이동.
자신의 일부메모리에 카피한다음에 전달한다.  

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna8y92qe5j31360t2x01.jpg)

카피한 부분(=Buffer Cash) 라고 한다. 시스템 콜을 통해 운영체제가 넘어온다.

![](https://ws4.sinaimg.cn/large/006tNc79gy1fna90oug7mj311m0u07s9.jpg)



### File Protection

![](https://ws1.sinaimg.cn/large/006tNc79gy1fna94b5kajj312s0uawzy.jpg)

**ACL**은 각각의 파일의 읽기권한을 링크드 리스트로 만들어서 활용한다.  
반대로 **사용자를 주체**로 링크드리스트를 만들 수 있는데 이를 Capability이라고 한다. 

이렇게 하더라도 오버헤드가 커서, **Grouping이라는 방법**을 활용해서 오버헤드를 줄인다. 전체 user를 owner, group, public의 세 그룹으로 구분해서 각 파일에 대해 세 그룹의 접근 권한(rwx)을 3비트씩으로 표시한다.

접근권한을 나타내기 위해서 총 9비트만 있으면 된다.



**Password**이라는 방법도 활용한다. 파일마다 password를 두는 방법(디렉토리 파일에 두는 방법도 가능)  
모든 접근 권한에 대해 하나의 password: all-or-nothing  
접근 권한별 password: 암기 문제, 관리 문제  

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fnbla0v4v2j31kw15wqu0.jpg)

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fnblauqojzj31kw1a41kx.jpg)

파일시스템에서 disk1,2 이 연결되는게 위와같이 Mount라고 표현한다.



### Access Methods

- 시스템이 제공하는 파일 정보의 접근 방식
  - 순차 접근(sequential access)
    \- 카세트 테이프를 사용하는 방식처럼 접근  
    \- 읽거나 쓰면 offset은 자동적으로 증가  
  - 직접 접근(direct access, random access)  
    \- LP 레코드 판과 같이 접근하도록 함  
    \- 파일을 구성하는 레코드를 임의의 순서로 접근할 수 있음  

## File System Implemation

### Allocation of File Data in Disk

#### 디스크에다가 파일을 저장하는 방법은 다음과 같이 3가지가 있다.

- Contiguous Allocation
- Linked Allocation
- Indexed Allocation

### Contiguous Allocation(연속할당방식)

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fnblwmpqbej30uo0teqdt.jpg)

어떤 임의의 크기에 블록단위로 나누어서 저장한다.  
메모리관리에서 페이징과 유사하다.

- 단점

  이러한 방식의 단점은 외부조각이 생길 수 있다. 또한 File grow가 어려움  
  \- file 생성시 얼마나 큰 hole을 배당할 것인가?  
  \- grow 가능 vs 낭비(internal fragmentation)

- 장점  

  \- Fast I/O  
   	\- 한번의 seek/rotation으로 많은 바이트 transfer  
  ​	\- Realtime file용으로, 또는 이미 run중이던 process의 swapping용 

  \- Direct access(=random access) 가능

### Linked Allocation

하드디스크임에도 불구하고 직접전근이 불가능하다. 빈 위치면 아무데나 저장될 수 있도록 하는 것이 Linked Allocation이다. 

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fnbmalg4jfj310q0tu7g9.jpg)

즉, 시작위치만 파일 디렉토리가 가져있고, 다음의 모든 것은 주소만 알고 있음.

- 장점
  \- 외부 조각이 발생하지 않는다.

- 단점
  \- 직접접근이 안된다.(중간위치를 보려면 처음의 위치를 확인해야만 한다.)  
  \- Reliability 문제  => 한 Sector가 고장나 pointer가 유실되면 많은 부분을 잃음  
  \- Pointer를 위한 공간이 block의 일부가 되어 공간 효율성을 떨어뜨림  
  \- 512 bytes/sector, 4bytes/pointer  
  512Bytes의 배수로 되어 있음 그리고 4bytes가 포인트로 배정되어 효율성이 떨어진다.  

- 변형

  \- File-allocation table(FAT) 파일 시스템  
  => 포인터를 별도의 위치에 보관하여 reliability와 공간효율성 문제 해결  

### Indexed Allocation

직접접근을 가능하게 하기 위해서 디렉토리에 파일의 위치정보를 가르키도록 설정한다.  

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fnbmiyb9dhj310g0sk7hp.jpg)

인덱스 블록만 확인하면 중간위치를 확인할 수 있어 직접접근이 가능해진다. 이것이 Indexed Allocation의 장점이다.

- 장점
  \- External fragmentation이 발생하지 않음  
  \- Direct access 가능
- 단점  
  \- Small file의 경우 공간 낭비(실제로 많은 file들이 small)  
  : **인덱스 블록 실제 파일이 저장될 블록 두개가 필요하므로 공간이 낭비된다.**
  \- Too Large file의 경우 하나의 block으로 index를 저장하기에 부족  
  이를 해결하기 위해 1. Linked Scheme , 2.multi-level index



**위 3가지 방법이 파일데이터를 디스크에 할당하는 기본적인 방법이다.**

### 유닉스 File System

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fnbmq6h4plj314u0tq7np.jpg)

**위 기본 구조를 활용해 더욱 발전된 파일시스템이 나오게 된다.**

하나의 논리적 디스크가 있다. 여기에 파일 시스템을 설치한 것이다. 

유닉스에는 크게 4가지로 나눠서 저장된다.

1. Boot Block
   \- 부팅에 필요한 정보(bootstrap loader)
   \- 언제나 0번은 부트 블록이다.
2. Super Block  
   \- 파일 시스템에 관한 총체적인 정보를 담고 있다.
   어디부터 어디까지 뭐가 들어있는지, 그러한 것을 확인하는 것이 super block이 담당한다.
3. Inode list  
   \- 파일 이름을 제외한 파일의 모든 메타 데이터를 저장  
   \- 빨간색으로 표시된 것들이 아이노드 하나가 파일 하나당 할당된다.  
   \- 아이노드는 그 파일의 메타데이터를 가지고 있다.  
   \- 파일의 이름은 디렉토리 파일이 직접가지고있다.  
4. Data Block  
   \- 파일의 실제 내용을 보관

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fnbmvrvakqj314e0tak9v.jpg)

***아이노드라는 것이 있다. 그것이 UNIX 파일 시스템에서 중요한 점!!***
인덱스 allocation을 활용하는데, 그 중에서도 다이렉트 인덱스가 싱글 인다리엑트, 더블 인다이렉트, 트리플 인다이렉트를 활용해서 표시한다.



### FAT File System

![](https://ws1.sinaimg.cn/large/006tNbRwgy1fnbn09at1ej31460u84dx.jpg)

FAT시스템에서 메다테이터의 일부를 FAT에 저장한다. 위치정보만 FAT에 저장한다. 나머지는 그냥 Data block의 디렉토리 file에 저장한다.  
첫번째 블록이 217이다. 하면 그 다음 링크드 Allcation의 정보를 FAT에 저장한다.  
무슨 의미인지는 모르겠지만 오직 주소들만 저장한다. 이를 FAT에서 저장한다.

**Linked Allocation을 활용했으며 단점인 배드섹터를 없애기 위해서 FAT에 주소를 저장하여 Direact Access가 가능하게 했다. 포인트하나가 유실되더라도, FAT에 정보가 저장되어 있기 때문에,(이를 두개의 카피로 저장한다)  단점을 모두 극복한다.**



### Free-Space Management

중간중간 남아있는 블록들을 어떻게 관리하겠는가?
관리하는 것도 여러 방법이 있다.

1. bit
   ![](https://ws2.sinaimg.cn/large/006tNbRwgy1fnbne8ikcgj310u0oyqfm.jpg)

   **첫번째 블록이 사용중이냐, 아니냐를 활용해서 판단한다.** 

2. Linked list

   ![](https://ws1.sinaimg.cn/large/006tNbRwgy1fnbngrokabj314w0twh2h.jpg)

3. Counting

   ![](https://ws3.sinaimg.cn/large/006tNbRwgy1fnbnh8hrtuj30ze0uidsz.jpg)



### Directory Implementation

- Linear list
  - <file name, file의 metadata>의 list
  - 구현이 간단
  - 디렉토리 내에 파일이 있는지 찾기 위해서는 linear search 필요(time-consuming)
- Hash Table
  - linear list + hashing
  - Hash table은 file name을 이 파일의 linear list의 위치로 바꾸어줌
  - search time을 없앰
  - Collision 발생 가능

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fnbnne04u3j311y0bidnk.jpg)



- File의 metadata의 보관 위치
  - 디렉토리 내에 직접 보관
  - 디렉토리에는 포인터를 두고 다른 곳에 보관
    \- inode, FAT 등
- Long file name의 지원
  - <file name, file의 metadata>의 list에서 각 entry는 일반적으로 고정 크기
  - File name이 고정 크기의 entry길이보다 길어지는 경우 entry의 마지막 부분에 이름의 뒷부분이 위치한 곳의 포인터를 두는 방법
  - 이름의 나머지 부분은 동일한 directory file의 일부에 존재

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fnbnuz4biqj312o08ugr0.jpg)



### VFS and NFS

![](https://ws3.sinaimg.cn/large/006tNbRwgy1fnbnxhuxnpj31120jk482.jpg)

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fnbnx04l04j310y0taws5.jpg)

### Page Cache and Buffer Cache

![](https://ws4.sinaimg.cn/large/006tNbRwgy1fnbo5d8fqlj31320sq4lq.jpg)

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fnbobckejnj31440vikbq.jpg)

페이지 캐시란 메모리 관리할 때, 페이지 프레임할 때 올려놓고 쫒아내는 것(Swaping).

파일데이터가 파일 스토리지에 저장되었는가? 운영체제에 버퍼캐시에 올라와 있는가를 판단하는게 버퍼 캐시

페이지 캐시와 버퍼 캐시의 차이를 알아두자!  
버퍼캐시는 섹터 단위로 불러왔다.

**그러나 최근에는 버퍼캐시가 페이지캐시와 통합되면서, 버퍼캐시에서 쓰는 단위도 페이지 단위로 쓸 수 있다.**

똑같은 범위 단위로 버퍼캐시 용도로 활용한다.

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fndqkf321fj31380ten98.jpg)

파일입출력하는 또 다른 메모리-멤드I/O를 쓰겠다는 시스템 콜을 하면, 자신의 주소공간 일부를 파일에다가 맵핑합니다. 버퍼캐시에서 받은다음에, 페이지 캐시에 카피합니다. 그 다음부터는 사용자 프로그램이 맵맵된 데이터에 메모리 요청하듯이 read write를 하게 됩니다.

 **인터페이스 차이가 있고, 맵맵을 쓰는 특별한 이유는 이미 메모리에 올라온것은 커널을 호출하지 않고, 바로 쓸 수 있다는 것이 장점.**

 이전에는 무조건 버퍼캐시를 활용해서 페이지캐시에 카피해야되는 오버헤드가 있었다. 그러나 Unified Buffer Cache의 경우 read() write()하는 경우에는 무조건 시스템 콜을 한다. CPU제어권이 넘어가서 사용자 메모리에 그냥 카피하면된다. 맵맵의 경우에는 주소에 퍼버캐시의 주소가 맵핑된다. 마치 Share되서 사용되는 것처럼 된다.



![](https://ws4.sinaimg.cn/large/006tKfTcgy1fndqt26rlaj312y0tcwt3.jpg)



Code부분은 스웹에어리어로 절대 내려가지 않는다. 왜냐하면 이미 File System에 존재하기 때문에.

실행파일 뿐만아니라 데이터 파일도 File system에 저장되어 있다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndqx00fe9j31380t2wqp.jpg)

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fndqxlc26uj31320t8aol.jpg)

CPU가 OS로 넘어간다.

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fndqy4nle1j312e0t4tmq.jpg)



Memory-Mapped File은 

read()을 호출할 경우.

자신의 버퍼캐시에 일부 데이터 파일을 시스템 콜하면, 맵맵 I/O를 활용해 ![](https://ws3.sinaimg.cn/large/006tKfTcgy1fndr26x0ddj312o0tg168.jpg)

물리적 메모리의 일부가 프로세스 A에 카피해서 저장된다.

**Physical 과 Virtual 메모리의 주소값이 맵핑 된다. 메모리 카피의 코스트가 감소**
