## 맵 리듀스 실행하기
학습목표
1. Word Count의 개념
2. MapReduce를 이용하여 Word count를 구현하는 방법을 알아보자
----

1. word count란?
 - 입력 파일의 텍스트 내용에 포함된 단어를 수를 세는 프로그램
    입문용 MapReduce프로그래밍 예제
 - 입력 파일의 사이즈가 작을 경우에는 일반 프로그램이 더 빠를 수 있지만, 입력파일의 크기가 크면 클수록 MapReduce로 구동시키는 프로그램이 더 빠른 결과를 얻을 수 있음.

 **함수형 프로그래밍**
  - 2가지 함수의 사용자 인터페이스 구현
  - Map(in_key, in_value) -> (inter_key, inter_value) list
  - reduce(inter_key, inter_value list) -> (out_key, out_value) list

- Split Mapper
  - 데이터셋을 Key, Value의 리스트로 변경하는 Map()함수
```
  let map(k,v) =
  foreach word w in b : emit(w,1)

  ('text','read a book') -> ('read',1),('a',1),('book',1)
```
- Sum Reducer

  ```
  let reduce(k vals) =
  sum = 0
  foreach int v in vals
  sum += v
  emit(k, sum)
 ('A', [42,100,312]) -> ('A', 454)
 ('B', [12,6,-2]) -> ('B',16)
  ```

- Word Count 프로그램 로직
![스크린샷 2017-04-07 오전 10.54.39](http://i.imgur.com/Lmf9RHx.png)

![스크린샷 2017-04-07 오전 10.54.53](http://i.imgur.com/BGtZ01p.png)


2. Word Count 구현
- 맵 리듀스 실행
> db.words.save({text:"read a book"})
> db.words.save({text:"write a book"})

- map()함수 구현
 ```javascript
  map = function(){
 var res = this.text.split(" ");
 for(var i in res)
 key = {word:res[i]};
 value = {count:1};
 emit(key, value);
}
```

- reduce()함수 구현
```javascript
reduce = function(key, value){
  var totalcount = 0,
  for(var i in values) {
    totalcount = value[i].count + totalcount;
  }
  return{count:totalcount};
}
```

- MapReduce 명령 실행
`>db.words.MapReduce(map, reduce, "wordcount");`

- MapReduce 시행결과 확인

```
> db.words.save({text:'read a book'});
WriteResult({ "nInserted" : 1 })
> db.words.save({text:'write a book'});
WriteResult({ "nInserted" : 1 })

> map = function(){
... var res = this.text.split(' ');
... for(var i in res) {
... key = {word:res[i]};
... value = {count:1};
... emit(key, value);}
... }


> reduce = function(key, values) {
... var totalcount = 0;
... for(var i in values){
... totalcount = values[i].count + totalcount;
... }
... return {count: totalcount};
... }

function (key, value) {
var totalcount = 0;
for(var i in values){
totalcount = values[i].count + totalcount;
}
return {count: totalcount};
}

> db.words.mapReduce(map, reduce, "wordcount");
{
	"result" : "wordcount",
	"timeMillis" : 157,
	"counts" : {
		"input" : 2,
		"emit" : 6,
		"reduce" : 2,
		"output" : 4
	},
	"ok" : 1
}
> db.wordcount.find();
{ "_id" : { "word" : "a" }, "value" : { "count" : 2 } }
{ "_id" : { "word" : "book" }, "value" : { "count" : 2 } }
{ "_id" : { "word" : "read" }, "value" : { "count" : 1 } }
{ "_id" : { "word" : "write" }, "value" : { "count" : 1 } }
>
```
