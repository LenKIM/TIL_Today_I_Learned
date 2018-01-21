

open() 동작.



첫번째로 c의 메타 데이터가 메모리를 올라올 것이다.

그럼 c의 데이터를 찾아야 될 것이다.



![](https://ws3.sinaimg.cn/large/006tNc79gy1fniew8k1xmj313a0ssk0w.jpg)



커널 영역과 사용자 메모리 영역으로 나눠서, 사용자가 fd = open("/a/b")를 하겠다 라고 시스템 콜을 날린다. 

![](https://ws2.sinaimg.cn/large/006tNc79gy1fniexrbapuj312i0sydrd.jpg)

그럼 디스크에서 root의 메타데이타를 살펴보면서 오픈 파일테이블을 참조한다.
![](https://ws1.sinaimg.cn/large/006tNc79gy1fnif0wnaenj31180twtro.jpg)



이렇게되면 fd는 시스템 콜을 했기 때문에 반환값이 받아질텐데, 이는 그것이 b를 가리키는 배열 어딘가가를 가리키는 인덱스가 반환될 것이다.

그럼 그 인덱스를 활용해서 디스크의 위치를 알기 때문에 이를 활용해 b의 content를 읽어온다.
![](https://ws2.sinaimg.cn/large/006tNc79gy1fnif33nxpxj312w0twqmn.jpg)

read()명령어를 통해 디스크의 내용을 읽어서 사용자 프로그램에게 직접주는게 아니라, 일단 자신의 메모리 공간에 일단 읽어 놓습니다. 그 다음에, 사용자 프로그램에게 copy해서 전달해 줍니다.

이렇게 되면 read라는 역할이 끝납니다.

**일단 읽어 놓는 행위를 => 버퍼캐시라고 할 수 있다.**

![](https://ws1.sinaimg.cn/large/006tNc79gy1fnif5wr77vj31280sittd.jpg)

운영체제가 판단해서 버퍼캐시에 데이터가 들어있는가 없는가를 판단합니다.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fnif8ckbjhj313c0tu4n1.jpg)



**운영체제의 구현의 따라 테이블이 다를 수 있지만,  구현하기 나름이지만, 메타 데이터가 메모리에 올라오면 각프로세스에 필요한 정보가 PCB에 올라온다.**