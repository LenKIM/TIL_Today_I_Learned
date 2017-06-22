학습목표
1. MongoDB의 집계 함수를 이해
2. 집계 프레임워크와 리모트 명령을 이해
-----

1. MongoDB의 집계 함수를 이해
 - Count
    - 컬랙션 내 문서의 갯수를 조회
    - RDBMS의 count와 같은 기능

사용 예
> db.person.count()

> db.person.find({name:"neo"}).count()

  - distinct
      - 지정된 키에 대한 중복제거(주어진 키의 고유한 값 찾기)
      - 컬렉션과 키를 반드시 지정해야함
      - RDBMS의 distinct와 같은 기능
사용 예
> db.runCommand({"distinct":"person", "key":"age"})

> db.phones.distinct('components.number',{'components.number':{$lt:55500005}})

  - group
      - 지정된 키에 대한 그룹핑
      - RDBMS의 Group by와 같은 기능
      - 샤드 클러스터 환경에서는 동작하지 않음

사용 예
>db.person.group ( {key : {age:1}, inital: {count:1}, $reduce: "function (obj, prev) { prev.count++;}"})

=> [{"age":21, "count":2}]

![스크린샷 2017-04-07 오후 12.03.02](http://i.imgur.com/kSZIoVO.png)

2. MongoDB 집계 프레임워크

![스크린샷 2017-04-07 오후 12.04.17](http://i.imgur.com/sLm5K8H.png)

![스크린샷 2017-04-07 오후 12.05.54](http://i.imgur.com/PotKmSL.png)


1. Pipelines
 - Unix의 pipe와 동일
 - MongoDB Pipelines은 document를 Stream화
 - Pipelines operators는 document의 Stream을 처리
 - map-reducing과 같은 원리

2. Expressions
 - input document를 수행한 계산값을 기반으로 output document를 생성
 - $addToSet, $first, $last, $max, $min, $avg, $push, $sum 등의 명령어 지원

![스크린샷 2017-04-07 오후 12.10.09](http://i.imgur.com/2tEQ4Qk.png)

![스크린샷 2017-04-07 오후 12.10.47](http://i.imgur.com/V8LzN49.png)

![스크린샷 2017-04-07 오후 12.11.41](http://i.imgur.com/dQgkz9C.png)

![스크린샷 2017-04-07 오후 12.13.01](http://i.imgur.com/ohJLLIi.png)

![스크린샷 2017-04-07 오후 12.16.09](http://i.imgur.com/278Bklr.png)

3. MongoDB 리모트 명령
- 로컬 MongoDB콘솔에서 수정명령어를 입력하면 원격 MongoDB에서 데이터를 로컬로 불러와서 처리한뒤 다시 원격지로 저장함
- eval명령어를 사용하면 원격지에서 바로 명령어로 실행한뒤 결과를 받는 것이 가능

맴리듀스 할때도 이런거 쓰면 좋음!

![스크린샷 2017-04-07 오후 12.39.20](http://i.imgur.com/P9nhIEn.png)
