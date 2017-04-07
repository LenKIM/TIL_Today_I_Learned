
1. Inverted Search Index 개념
 - value의 내용을 key로 하고, key의 내용을 반대로 value로 하는 패턴
 - 검색엔진에서 많이 사용하는 방법
 - 검색엔진은 사이트의 모든 페이지를 검색 로봇이 검색해서 문서내의 단어들을 색인하여 URL에 맵핑해서 저장해놓음

 - 검색은 단어를 Key로 검색하기 때문에, Value에 검색 키워드들이 들어가 있을 경우에는 효과적인 검색이 불가함
 - 검색 키워드를 키로 해서URL을 Value로 하는 테이블을 다시 만든 다음, 검색 키워드로 검색을 하면 신속하게 검색 키워드를 가지고 있는 URL을 찾아낼 수 있음.

 ![스크린샷 2017-04-07 오전 11.29.10](http://i.imgur.com/llEiN1j.png)

- Inverted Mapper
  - 데이터셋을 Key, Value의 리스트로 변경하는 Map()함수
  - let map(k,v) =
  foreach element e in v : emit(e,k)

- Conbine Reducer
```
 let reduce(k, vals) =
  array = []
  foreach int v in vals :
  array.push(v.actor)
  emit(k.array)

  ('movie',[('actor':'actor1'),('actor':'actor2')('actor':'actor3')]) -> ('movie', ['actor1','actor2','actor3'])
```

![스크린샷 2017-04-07 오전 11.38.46](http://i.imgur.com/1OpdwMU.png)

![스크린샷 2017-04-07 오전 11.40.16](http://i.imgur.com/3XbQPqp.png)

**맵 리듀스 실행**
