# git-rebase

*cf) 생활코딩의 git interactive 작업을 수행하는 동영상을 시청후 정리한 내용입니다.*

https://youtu.be/ZMoB1SZ4Ceg



![image-20190908175325198](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7lrcwdmj312i07u776.jpg)



지금 이런 커밋을 가지고 있다고 가정합니다.



과거에 만들었던 버전이 마음에 들지 않았다.

- 1, 2 두 개의 순서를 바꾸고 싶을 때
- 또는 1, 2 의 버전을 하나로 만들고 싶을 때
- 또는 2번을 제거해서 3, 4 에서 제거된 내역이 보여지지 않도록 하기 위해서는 어떻게 해야 될까?



## Interactive rebase 를 활용해 조작해보자.



버전의 커밋 ID를 알고 있어야 한다.

![image-20190908175714379](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7pol8nkj311c0lyacu.jpg)





 이전에 알았던 commit ID를 `git reabse -i 0cd8a80' 을 하면

다음과 같은 화면에서 2,3 위치를 변경한다.

![image-20190908175844181](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7r8rj95j311k0m0nbl.jpg)



변경 된 뒤에 모든 commit의 ID가 달라진다.



이후, *만약에* 다시 원복하고 싶다면 어떻게?

HEAD가 이전 상태를 바라볼 수있게 해주면 해결 할 수 있다.

`git reset --hard d7318f` 이전 HEAD commmit id 을 입력해준다.



이번에는 만약 2,3 의 commit을 합치고 싶다면?

pick a7f1368

pick aa3c3f4



을 3번 커밋에 `squash a7f1368 ` 입력하면 commit 이 합쳐진다.



이후 새로운 커밋을 작성한다.

![image-20190908180411133](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7wwt908j31180lk77m.jpg)



 그럼 다음과 같이 2,3 이 합쳐진다.



이번에는 1 commit을 제거하는 행위를 해보자.

다시 `git rebase -i 7cd8a80`

![image-20190908180519362](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7y6cjdzj31400bq0zv.jpg)



을 하게 되면

![image-람ㅣ0190908180615793](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7z21usxj30qo0k8diw.jpg)



![image-20190908180626601](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s7z8ioflj30qo0k8diw.jpg)



1번이 사라짐을 확인 할 수 있다.



### 이번에는 3 commit을 변경하는 작업을 수행해보자.

![image-20190908180732053](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s80dsq0nj313i0fedpg.jpg)





이렇게 저장하게 되면 3번 작업에서 일시적으로 멈춥니다.

![image-20190908180828093](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s81d8to2j313w0auwhg.jpg)



그러면 이 때  `vim work.txt` 을 입력 후 작업을 처리합니다. 3을 Three 로

![image-20190908180907569](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s820y47bj312w0biwgi.jpg)



다음에 `git add work.txt` 합니다.



그리고 `git commit  --amend` 합니다.

그 다음 커밋 메시지를 입력해줍니다.

![image-20190908181005362](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s831sm46j314i0fcn2q.jpg)



![image-20190908181050880](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s83tvi9gj31460hsajc.jpg)



그리고 나서 `git rebase --continue` 을 입력합니다.



최종적으로 commit log 가 

![image-20190908181148180](https://tva1.sinaimg.cn/large/006y8mN6gy1g6s84tw5fpj31620bejuk.jpg)



다음과 같이 바뀐 것을 확인 할 수 있습니다.