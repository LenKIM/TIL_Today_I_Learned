
## 옵저버 패턴

옵저버 패턴은 최근 들어 현업에서 사용하는 가장 일반적인 소프트웨어 디자인.

주제(subject)라는 개념에 기반을 두고, 주제는 특별한 객체로, 주제가 변경됐을 때 알림을 받기를 원하는 객체의 리스트를 갖고 있다. 이러한 객체는 옵저버(Observer)라고 불리며, 주제가 자신의 상태가 변경되면 호출하는 알림 메소드를 드러내고 있다.

아래 그림은 1개의 주제가 3개의 옵저버를 다룰 수 있음을 보여준다.

![854px-Observer.svg](http://i.imgur.com/TqFHigs.png)

### 옵저버 패턴은 언제 사용되는가?

- 하나가 다른 하나에 의존적인 2개의 개체를 가진 구조에서, 이를 변경하기 위해 분리해 유지하고 싶거나 독립적으로 재사용하고 싶을 경우.
- 변경사항이 있는 객체가 자신의 변경사항을 다수의 연관된 객체에게 알려야 하는 경우
- 변경사항이 있는 객체가 전달받은 객체가 누구인지에 대한 추정 없이 알려야 하는 겅우

### Rx자바 옵저버 패턴 툴킷

- Observable
- Observer
- Subscriber
- Subject

- Observable / Subject 의 경우 '생산'
- Observer / Subscriber 의 경우 '소비'

**Observable**
복잡도가 낮은 비동기 작업을 수행하는 경우, 자바는 이러한 문제에 접근하기 위해 Thread, Future, FutureTask, CompletableFuture 같은 고전적인 클래스를 제공한다. 이러한 솔루션은 복잡도가 증가할 수록 지저분해지고 유지하기 어려워지는 경향이 있다. 무엇보다도 이러한 클래스는 메소드 체이닝을 지원하지 않는다.

------
이벤트 | 이터러블(풀) | 옵저버블(푸시) |
----
데이터 가져오기 | T next() | onNext(T) |
----
오류발견 | throws Execption | onError(Throwable) |
----
완료 | !hasNext() | onCompleted() |
------

이터러블에서 소비자는 생산자에게서 동기 상태로 값을 풀링하고 값이 도착하기 전까지 스레드를 차단된다. 반면 옵저버블에서 생산자는 값이 이용 가능해지면 옵저버에게 비동기적으로 푸시한다. 옵저버블의 접근법이 좀 더 유연한데, 비동기적으로 아니면 동기적으로 값을 전달 받더라도 소비자는 모든 시나리오에서 예상했던 대로 동작할 수 있기 때문이다.

- onCompleted()는 옵저버블로부터 더는 전달할 데이터가 없음을 옵저버에게 알리는 기능
- onError()는 옵저버에게 에러가 발생했음을 알리기는 기능

**핫 옵저버블과 콜드 옵저버블**
발행하는 방식에 따라 옵저버블은 핫 콜드 라는 두 가지 타입으로 나눌 수 있다.
**일반적으로**
핫 옵저버블은 아이템이 생성되자마자 발행이 시작, 그러므로 이 옵저버블을 구독하는 옵저버는 중간 어디쯤에서부터 시퀀스를 관찰할 때까지 대기한다.

콜드 옵저버블은 아이템을 발행하기 전에 옵저버가 구독할 때까지 대기. 그러므로 옵저버는 처음부터 모든 시퀀스를 볼 수 있음을 보장받는다.

**Observable.create()**
create()메소드는 개발자가 새로운 옵저버블을 생성할 수 있게 기능을 제공한다.

Observable은 Subscriber 변수를 통해 옵저버와 통신하며, 상황에 따라 Subscriber 변수의 메소드를 호출.

**Observable.from()**

리스트나 배열로부터 안에 있는 모든 객체를 차례차례 발행하는 옵저버블을 생성하거나, 자바의 Future클래스로부터 Future객체의 .get()메소드 결과 값을 발행하는 옵저버블을 생성할 수 있다. Future을 인자로 전달하면서 타임아웃 값을 명시할 수 있다.

**Observable.just()**

 이미 갖고 있는 자바 함수를 옵저버블로 변환하고 싶다면 어떻게 해야 할까? 앞에서 본 것 처럼 create()를 사용할 수도 있지만, 다음과 같이 사용한다면 많은 보일러 플레이트 코드를 줄일 수 있다.
just안에 function을 넣어 실행하고 옵저버블을 구독할 때 전달받은 값을 발행한다.
just()는 from()처럼 리스트나 배열을 갖기도 하지만, 리스트를 순회하면서 모든 값을 발행하지는 않으며 단지 리스트 전체를 발행. just()는 일반적으로 정의된 값을 발행할 때 사용되는데, 시간에 불변한 함수의 경우에는 just()를 사용함으로써 조직적이면서 테스트 가능한 코드를 얻을 수 있다.

**Observable.empty(), Observable.never(), Observable.throw()**

어떠한 이유로 아무것도 발행하지 않으면서 정상적으로 종료되는 옵저버블이 필요한 경우에는 empty()를 사용할 수 있다. 아무것도 발행하지 않으면서 종료도 안되는 옵저버블을 만들려면 never()를 사용할 수 있으며, 아무것도 발행하지 않으면서 에러와 함께 종료되는 옵저버블을 만들려면 throw()를 사용 할 수 있다.

#### Subject = Observable + Observer

Subject는 마술 같은 객체로, 옵저버블이면서 동시에 옵저버가 될 수 있다. 두 세계를 연결하는 다리와 같은 역할을 한다. Subject는 옵저버처럼 옵저버블을 구독할 수 있고, 옵저버블처럼 새로운 아이템을 발행하거나 전달받은 아이템을 바이패스할 수도 있다. 확실한 건, 옵저버블이 된다는 것은 옵저버나 여타 Subject가 자신을 구독할 수 있다는 점이다.

Subject는 옵저버블을 구독하는 순간 옵저버블이 발행을 시작하도록 작동시킬것이다. 원래 옵저버블이 콜드라면, 이러한 동작은 결과로 나온 Subject를 콜드옵저버블의 변종인 핫옵저버블로 만드는 효과를 낼 수 있다.

Rx자바는 네 가지 타입의 Subject를 제공한다.

- PublishSubject
- BehaviorSubject
- ReplaySubject
- AsyncSubject

**PublishSubject**

기본적인 Subject객체다. 기존의 옵저버블 헬로 월드에 PublishSubject를 적용하면?

```java
PublishSubject<String> stringPublishSubject = PublishSubject.create();

Subscription subscription =
  stringPublishSubject.subscriber(new Observer<String>() {
    @Override
    public void onCompleted(){

    }

    @Override
    public void onError(){

    }

    @Override
    public void onNext(){

    }
  })

```

**BehaviorSubject**

기본적으로 BehaviorSubject는 가장 최근에 관찰된 아이템과 그 후에 관찰된 나머지 아이템을 구독하는 옵저버에게 발행하는 Subject

**ReplaySubject**

ReplaySubject는 관찰한 모든 아이템을 버퍼에 저장하고 구독하는 옵저버에게 재생한다.

**AsyncSubject**

AsyncSubject는 옵저버블이 완료됐을 때 구독하고 있는 각 옵저버에게 관찰한 마지막 아이템만을 발행하낟.
