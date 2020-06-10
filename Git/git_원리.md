# git 원리

git add  를 하는 순간 2가지가 변경됨.

![image-20200103160907967](https://tva1.sinaimg.cn/large/006tNbRwgy1gaje38hjzkj30n6053jrq.jpg)

`f70f10e4db19068f79bc43844b49f3eece45c4e8`



![image-20200103161036019](https://tva1.sinaimg.cn/large/006tNbRwgy1gaje4r60asj30m609paax.jpg)



여기에 `git add f2.txt` 를 하게 되면,

![image-20200103161411574](https://tva1.sinaimg.cn/large/006tNbRwgy1gaje8hltxjj30py07swfh.jpg)



Objects 에 한 개가 더 생김



`cp f1.txt f3.txt` 를 하고 나니, `index` 을 살펴보니 `f1`,`f3`이 같은 오브젝트 파일을 가리킨다.

![image-20200103161600004](https://tva1.sinaimg.cn/large/006tNbRwgy1gajeadikhsj30mw071gmg.jpg)



이렇게 되니, git은 어마어마한 중복을 제거한다.

그리고, txt안에 들어있는 내용이 동일할 경우 동일한 ./objectx/xxx 를 가진다.



## 이번에는 objects 파일명의 원리를 이해하자.

***SHA1 로 어떤 Value를 hash하면 동일한 파일의 이름을 도출해낸다.***

![image-20200103162143651](https://tva1.sinaimg.cn/large/006tNbRwgy1gajegbp3rwj30fn06tweu.jpg)

## Commit의 원리

![image-20200103162541290](https://tva1.sinaimg.cn/large/006tNbRwgy1gajekggrxxj30dm03naac.jpg)



![image-20200103162653035](https://tva1.sinaimg.cn/large/006tNbRwgy1gajelot0yqj30q409r75g.jpg)





 위 글에서 `ead17xxx` 을 따라가면,

![image-20200103162750074](https://tva1.sinaimg.cn/large/006tNbRwgy1gajemocqcpj30ps0cjabp.jpg)



이번에는 

f2.txt의 내용을 수정한 뒤,

`git add f2.txt` 를 하고 커밋을 하게되면

![image-20200103163120742](https://tva1.sinaimg.cn/large/006tNbRwgy1gajeqc7toej30py0d3jti.jpg)



자신의 커밋 id 가 변경되면서 `parent` 가 생기고 `tree` 에는 변경된 내용이 저장된다.



이번에는 디렉토리를 만들고 그안에 `f1`과 같은 내용의 파일을 커밋했을 때 변경사항을 이해해보자.

![image-20200103163611824](https://tva1.sinaimg.cn/large/006tNbRwgy1gajevdwb6zj30q90fggon.jpg)



tree안에 같은 이름의 commit id를 확인할 수 있다.



## git status 의 원리



![image-20200103163810774](https://tva1.sinaimg.cn/large/006tNbRwgy1gajexg9x5gj30ci03l74c.jpg)



![image-20200103164252693](https://tva1.sinaimg.cn/large/006tNbRwgy1gajf2bqggdj30fa09hgml.jpg)



어떻게 `git status` 는 변경된 내역을 알 수 있었을까?



![image-20200103164323845](https://tva1.sinaimg.cn/large/006tNbRwgy1gajf2vdj95j30qb06r3zj.jpg)



`./index` 와 최종 커밋을 비교해서 변경된 사항을 파악한다.



![img](https://t1.daumcdn.net/cfile/tistory/257E534353142A7D27)



> [용어 이해] 
>
> working directory - index, staging area, cache - repository 

