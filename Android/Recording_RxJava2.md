```java
public class HelloWorld {
    public static void main(String ... args){
        Flowable.just("Hello world").subscribe(System.out::println);
    }
}

// if it is not supported Java8 
Flowable.just("Hello world")
  .subscribe(new Consumer<String>() {
      @Override public void accept(String s) {
          System.out.println(s);
      }
  });
```

- [`io.reactivex.Flowable`](http://reactivex.io/RxJava/2.x/javadoc/io/reactivex/Flowable.html): 0..N flows, supporting Reactive-Streams and backpressure
- [`io.reactivex.Observable`](http://reactivex.io/RxJava/2.x/javadoc/io/reactivex/Observable.html): 0..N flows, no backpressure,
- [`io.reactivex.Single`](http://reactivex.io/RxJava/2.x/javadoc/io/reactivex/Single.html): a flow of exactly 1 item or an error,
- [`io.reactivex.Completable`](http://reactivex.io/RxJava/2.x/javadoc/io/reactivex/Completable.html): a flow without items but only a completion or error signal,
- [`io.reactivex.Maybe`](http://reactivex.io/RxJava/2.x/javadoc/io/reactivex/Maybe.html): a flow with no items, exactly one item or an error.



참조 : [https://01010011.blog/2017/03/29/rxjava-flowable-과-observable-의-차이/](https://01010011.blog/2017/03/29/rxjava-flowable-과-observable-의-차이/)

`backpressure`  
: 등 뒤에서 떠밀리는 압박

콘서트장을 사람들이 가득 메웠다. 콘서트장에 들어오려는 사람들은 저글링 개떼처럼 밀려드는데 나가는 사람은 별로 없다. 콘서트장 출입구를 통제하는 요원이 없다면? 콘서트장이 터지던지 안에 있던 사람들이 짜부러지던지 아무튼 대형 사고가 발생할거다.

publish / subscribe 모델에서도 이런 비극적인 시나리오가 발생할 수 있다. 생산자는 미친듯이 element 를 생산해 내는데 소비자가 처리하는 속도가 이를 따라가지 못한다면

1. busy waiting 또는
2. out of memory exception 이 발생할 것이다.

‘등 뒤에서 떠밀리는 압박’ 에 대한 흐름제어를 위한 버퍼가 바로 backpressure buffer 다. 버퍼가 가득 차면 어차피 소비자는 element 를 처리할 여유가 없는 상태이므로 더 이상 publish 를 하지 않는다.
