
## 학습 목표

1. 도커란 무엇인가?
2. 도커를 왜 사용하는가?
3. 맥에서 도커설치하기
4. 도커 사용해 가상화 이용해보기!
5. 각종 DB의 설치 및 실행.(docker run -it ubuntu bash)
---
1. 도커란?
>Docker is a container based virtualization framework. Unlike traditional virtualization Docker is fast, lightweight and easy to use. Docker allows you to create containers holding all the dependencies for an application. Each container is kept isolated from any other, and nothing gets shared.

Docker는 가상화 프레임워크인데, 컨테이너 기반 가상화를 사용한다. 일반적인 가상화 방식은 호스트 OS와 게스트 OS가 따로 있고, 게스트 OS부터 분리해 독립된 운영환경을 제공하지만, Docker는 이와 달리, 컨테이너 기반 가상화는 호스트 OS를 그대로 공유하고, 유저 스페이스에서 가상화를 제공한다.

주요 개념은 이 곳 사이트를 참조하자! [Documents](http://documents.docker.co.kr/)

2. 도커를 왜 사용하는가?

뭐가 좋을까? 일반적인 가상화에서 그렇듯, 각각의 애플리케이션이 완전히 독립된(dedicated) 영역에서 CPU, 네트워크, 디스크 자원을 활용할 수 있지만, 그보다 훨씬 가볍다. 마치, 그냥 리눅스 서버에 프로세스 여러 개를 띄운 것 같이 가벼운데, 그 애플리케이션 간의 간섭이 없는 것이다. 다른 점은, 호스트 OS와 같은 OS 환경만을 제공한다는 것이다. 이 때문에 가볍다는 장점이 되는 것이기도 하다.

또 하나 언급할 만한 점은, 이미 (일반적인) 가상화 장비를 받은 상황에서, 다시 Docker를 이용해서 또 자원을 격리 배분할 수 있다. AWS EC2나 Google Compute Engine에서 리눅스 VM 한 개 받아서, 그 안에 다시 Docker를 이용, 또다시 여러 개의 가상환경을 쪼개서 만들 수 있다. 그 컨테이너들을 내 애플리케이션들이 다 사용하든, 아니면 내 서비스를 사용하는 사용자에게 하나씩 나눠서 제공하든 그것은 자유다.

>Docker containers can encapsulate any payload, and will run consistently on and between virtually any server. The same container that a developer builds and tests on a laptop will run at scale, in production, on VMs, bare-metal servers, OpenStack clusters, public instances, or combinations of the above.

또 다른 Docker의 특징 중 하나는, 클라우드 환경이든 내 로컬환경이든, 준비해둔 그 가벼운 컨테이너를 어디서나 실행할 수 있다는 점이다. 개발할 때 쓰는 맥북 프로에 Docker 컨테이너를 준비해두고, 그 컨테이너를 그대로 퍼블릭 클라우드에 올려서 서비스할 수도 있다는 얘기다.

3. 맥에서 도커 설치하기
 ![공식 사이트에서 알려주는 도커 설치법!](https://docs.docker.com/docker-for-mac/install/)

  여러 블로거에서 어떤 특정 명령어를 사용하면서 하는데... 글쎄 사이트에서 그냥 꼼꼼히 읽어보고 하면 끝.
  하루가 빠르게 업그레이드 되서 그런가보다...

  아이콘이 귀엽다!
  ![스크린샷 2017-04-07 오전 12.23.40](http://i.imgur.com/ewO2aKS.png)

다 설치하고 나면 이런 화면을 볼 수 있다!

  ![스크린샷 2017-04-07 오전 12.24.23](http://i.imgur.com/vJXrtL4.png)


4. 도커 사용해 가상화 이용해보기!

![스크린샷 2017-04-07 오전 12.28.14](http://i.imgur.com/pswTOvs.png)

**일단 버전부터 체크하고...**

![스크린샷 2017-04-07 오전 12.30.58](http://i.imgur.com/0ItCIZ2.png)

``docker run hello-world``
 : 요건 도커가 잘 진행되는지 증명하는 것이란다.
 ![스크린샷 2017-04-07 오전 12.37.41](http://i.imgur.com/ZM4hn1g.png)
![스크린샷 2017-04-07 오전 12.32.00](http://i.imgur.com/AhYS9Mx.png)

hello-world로 run 시키고 나서

``docker -ps -a``하면 해당 Run 한 상태를 볼 수 있다.

![스크린샷 2017-04-07 오전 12.36.13](http://i.imgur.com/IOeYyd4.png)

![스크린샷 2017-04-07 오전 12.38.48](http://i.imgur.com/hozJIly.png)

영어 해석은 알아서... 도움 필요하면 직접 물어보세요 저한테.

**도커에서 이미지를 찾고 실행시키기( Find and run the whalesay image)**

![스크린샷 2017-04-07 오전 12.43.22](http://i.imgur.com/eZqdxKg.png)
절대 해석이 귀찮아서 이러는거 아니예요...

![스크린샷 2017-04-07 오전 12.45.08](http://i.imgur.com/5ecAg6t.png)

여기서 내가 ``docker images``하면 지금까지 설치한 이미지들이 나온다!

![스크린샷 2017-04-07 오전 12.46.24](http://i.imgur.com/LCtcUPl.png)

여기서 한번 whalesay를 실행시켜보쟈!
`docker run docker/whalesay cowsay boo-boo`

귀엽네.... 허허

**내 소유의 이미지 만들기(Build your own image)**
1. dockerFile 쓰기!
`$ mkdir mydockerbuild`
일단 디렉토리 만들고,
`$ nano Dockerfile`
다음 `FROM docker/whalesay:latest`
여기서 FROM은 참조되어지는 이미지를 뜻한다.

![스크린샷 2017-04-07 오전 12.59.42](http://i.imgur.com/INqX0Aw.png)
나노에디터안에서 어떻게 할것인가를 명시한다.

이렇게 명시한 뒤, 해당 디렉토리에서 `docker build`를 사용하자.
```
$ docker build -t docker-whale .

Sending build context to Docker daemon 2.048 kB
...snip...
Removing intermediate container cb53c9d09f3b
Successfully built c2c3152907b5
```

여기서 -t는 태그를 말하는데, 나중에 쉽게 쓰기위한 작업이다.
그리고 끝에 .을 사용하는 것을 잊지말자.

![스크린샷 2017-04-07 오전 1.04.48](http://i.imgur.com/fp2zpn7.png)

![스크린샷 2017-04-07 오전 1.05.20](http://i.imgur.com/4Smq2d3.png)

`docker run docker-whale`
이렇게 하면 내가 만든 이미지가 올라간 것!

이렇게 한 걸 도커사이트에서 git처럼 commit할 수 있다!
그건.. 사이트 찾아보길...

 나는 우분투 컨테이너를 사용하고 싶다! 하면
 `docker run -it ubuntu bash` 요렇게하면 끝...

 이건 신세계다..
 ![스크린샷 2017-04-07 오전 1.12.18](http://i.imgur.com/sNia8nS.png)

 여럿 기능들은 [여기](https://docs.docker.com/docker-for-mac/) 참고하면 좋겠다!

삭제하고 싶다면!!
![스크린샷 2017-04-07 오전 1.14.32](http://i.imgur.com/S6qyGda.png)

![스크린샷 2017-04-07 오전 1.21.18](http://i.imgur.com/pv3rUdn.png)

5. 각종 DB의 설치 및 실행.(docker run -it ubuntu bash)

허허.. 쉽지 않구만,
