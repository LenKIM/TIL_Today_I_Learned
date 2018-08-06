참조 사이트 : [https://medium.com/upday-devs/rxjava-subscribeon-vs-observeon-9af518ded53a](https://medium.com/upday-devs/rxjava-subscribeon-vs-observeon-9af518ded53a)



![](https://cdn-images-1.medium.com/max/1600/1*bCWxHKDkrI4QlBtZMOfpzA.png)

RxJava에서 가장 강락한 측면은 schedule 일 것이다. 특히,  subscribeOn 또는 observeOn 하나에서 사용된 Thread일 것이다.

 이 두개는 흘끗봐도 충분히 단순해보이지만, 이 두개가 어떻게 동작하는지 이해하는 것은 내가 원하는 스레드를 할당하는데 중요한 역할을 할 것이다.



### observeOn

이 메소드는 심플하게 앞으로의 모든 연산자의 Thread(downstread - in the call that come after)를 변화시킨다. 다음 코드를 예측해보자.

![](https://cdn-images-1.medium.com/max/1600/0*8GhaR2CbbJW0Tmlz.gif)



가장 빈번하게 잘못이해하는 것중에 하나가 바로 observeOn 또한 upstream 이 된다는 것이다. 그러나 사실 이는 오직 downstream-thing 으로 행동한다. downstream-thing 의미는 `observeOn` 이 호출된 뒤에 발생한다는 의미다.

### subscribeOn



이건 오직 Observable이 구독되어질 때 사용되는 쓰레드에만 영향을 미친다. 그리고 이것은 downstream에 머물 것입니다.

```java
just("Some String") // Computation
  .map(str -> str.length()) // Computation
  .map(length -> 2 * length) // Computation
  .subscribeOn(Schedulers.computation()) // -- changing the thread
  .subscribe(number -> Log.d("", "Number " + number));// Computation
```

**Position does not matter(위치는 상관없다.)**

`subscribeOn` 는 어느 스트림에 놓아질 수 있다. 왜냐하면 `subscribeOn` 은 오직 subscription 할 때만 영향을 미치기 때문이다.

```java
just("Some String") // Computation
  .subscribeOn(Schedulers.computation()) // note the different order
  .map(str -> str.length()) // Computation
  .map(length -> 2 * length) // Computation
  .subscribe(number -> Log.d("", "Number " + number));// Computation
```

**Methods that obey the contact with** `subscribeOn` (`subscribeOn` 과 접촉을 따른 함수들)

대부분의 예제는 `Observable.create` 모든 create안에 특정 일에 대한 일은 `subscribeOn`  이 지정한 쓰레드에서 동작하게 될 것입니다.

또다른 예제로 `Observable.just`, `Observable.from` or `Observable.range` 또 포함됩니다

이러한 메서드는 모두 값을 받아들이는 것이 중요하므로 subscribeOn에 영향을 미치지 않는 blocking 메서드를 사용하여 해당 값을 만들지 마십시오!

만약 너가 blocking function을 쓰기 원한다면, `Observable.defer` 를 사용해주세요. 이것은 지연평가가 가능하게 해주기 때문입니다.

`Observable.defer(() -> Observable.just(blockingMethod()));`

중요한 사실 하나는 `subscribeOn`  는 `Subject`s 에서는 동작하지 않는다는 것입니다.

**Multiple subscribeOn(다수의 SubscribeOn)**

만약 다수의 `subscribeOn` 이 stream 에 있다면, 오직 첫번째꺼가 실용적인 효과를 갖습니다.

```java
just("Some String")
  .map(str -> str.length())
  .subscribeOn(Schedulers.computation()) // changing to computation
  .subscribeOn(Schedulers.io()) // won’t change the thread to IO
  .subscribe(number -> Log.d("", "Number " + number));
```

**Subscribe and subscribeOn**

사람들은 `subscribeOn`  가  `Observable.subscribe` 와 함께 무엇가를 가진다라고 생각합니다. 그러나, 실제로  `subscribeOn`과,  `Observable.subscribe` 는 아무런 연관성이 없습니다.

기억하십시오! `subscribeOn` 은 오직 `the subscription phase` 단계에서 영향을 미칩니다.