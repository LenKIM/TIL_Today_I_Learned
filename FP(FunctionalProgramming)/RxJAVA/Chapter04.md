목표.
- 각 연산자의 분류를 이해하고 분류된 연산자의 함수들의 활용에 집중하자.
- 활용에 집중하여 함수형 프로그래밍의 기초체력을 다지자.

생성연산자
 - Just(), fromXXX, create(), interval(), range(), timer(), intervalRange(), defer(), repeat()
변환연산자
- map(), flapMap(), concatMap(), switchMap(), groupBy(), scan(), buffer(), window().
필터 연산자
- filter(), take(), skip(), distinct()
결합 연산자
- zip(), combineLatest(), merge(), concat()
조건 연산자
- amb(), takeUntil(), SkipUntil(), all()
에러 처리 연산자
- onErrorReturn(), onErrorResumeNext(), retry(), retryUntil
기타 연산자
- subscribe(), subscribeOn(), observeOn(), reduce(), count().


### 1.생성연산자
#### interval()
 일정 시간 간격으로 데이터 흐름 생성.  
 ```java

 @CheckReturnValue
    @SchedulerSupport(SchedulerSupport.COMPUTATION)
    public static Observable<Long> interval(long initialDelay, long period, TimeUnit unit) {
        return interval(initialDelay, period, unit, Schedulers.computation());
    }

@CheckReturnValue
    @SchedulerSupport(SchedulerSupport.CUSTOM)
    public static Observable<Long> interval(long initialDelay, long period, TimeUnit unit, Scheduler scheduler) {
        ObjectHelper.requireNonNull(unit, "unit is null");
        ObjectHelper.requireNonNull(scheduler, "scheduler is null");

```

주의!.
스케쥴러가 계산 스켸쥴러이다. 현재 스레드가 아니라 계산을 위한 별도의 스레드에서 동작한다.
기본적으로 영원히 지속되는 때문에 폴링 용도로 활용됨.

```Java

public void printNumbers() {
		CommonUtils.exampleStart();
		Observable<Long> source = Observable.interval(100L, TimeUnit.MILLISECONDS)
				.map(data -> (data + 1) * 100)
				.take(5);
		source.subscribe(Log::it);
		CommonUtils.sleep(1000);
		CommonUtils.exampleComplete();
	}

```

#### timer()

timer함수는 interval함수와 유사하지만 한 번만 실행하는 함수입니다.  
일정 시간이 지난 후에 한 개의 데이터를 발행하고 onComplete()이벤트를 발생합니다.  

```java
@CheckReturnValue
    @SchedulerSupport(SchedulerSupport.COMPUTATION)
    public static Observable<Long> timer(long delay, TimeUnit unit) {
        return timer(delay, unit, Schedulers.computation());
    }

public void showTime() {
		CommonUtils.exampleStart();
		Observable<String> source = Observable.timer(500L, TimeUnit.MILLISECONDS)
				.map(notUsed -> {
					return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss")
							.format(new Date());
				});
		source.subscribe(Log::it);
		CommonUtils.sleep(1000);
		CommonUtils.exampleComplete();
	}
```

#### range()
주어진 값(n)부터 m개의 Integer객체를 발행합니다. 앞서 interval()와 timer()함수는 Long()객체를 발행했지만 range() 함수는 Integer객체를 발행하는 것이 다르다.
 for루프 대신 활용.

```Java
public void forLoop() {
		Observable<Integer> source = Observable.range(1, 10)
			.filter(number -> number % 2 == 0);
		source.subscribe(Log::i);
	}

@CheckReturnValue
  @SchedulerSupport(SchedulerSupport.NONE)
  public static Observable<Integer> range(final int start, final int count) {
      if (count < 0) {
          throw new IllegalArgumentException("count >= 0 required but it was " + count);
      }
      if (count == 0) {
          return empty();
      }
      if (count == 1) {
          return just(start);
      }
      if ((long)start + (count - 1) > Integer.MAX_VALUE) {
          throw new IllegalArgumentException("Integer overflow");
      }
      return RxJavaPlugins.onAssembly(new ObservableRange(start, count));
  }
```

현재 스레드에서 실행되기 때문에 sleep메서드 호출안됨.

#### intervalRange()

interval()과 range()를 혼합해 놓은 함수.
interval() 함수처럼 일정한 시간 간격으로 값을 출력하지만 range()함수처럼 시작 숫자(n)로부터 m개만큼의 값만 생성하고 onComplete 이벤트가 발생. 즉 interval()함수처럼 무한히 데이터 흐름을 발생하지 않는다.

```java
Observable<Long> source = Observable.intervalRange(1,  //start
				5,              //count
				100L ,          //initialDelay
				100L,           // period
				TimeUnit.MILLISECONDS); //unit
		source.subscribe(Log::i);
		CommonUtils.sleep(1000);
		CommonUtils.exampleComplete();

@CheckReturnValue
    @SchedulerSupport(SchedulerSupport.COMPUTATION)
    public static Observable<Long> intervalRange(long start, long count, long initialDelay, long period, TimeUnit unit) {
        return intervalRange(start, count, initialDelay, period, unit, Schedulers.computation());
    }
```

take를 활용해서 intervalRange를 만들었다.

#### defer()
 defer 는 timer 함수와 비슷하지만 데이터 흐름 생성을 구독자가 subscribe 함수를 호출할 때까지 미룰 수 있다. 이때 새로운 Observable이 생성된다.

```java
public void marbleDiagram() {
		Callable<Observable<String>> supplier = () -> getObservable();		
		Observable<String> source = Observable.defer(supplier);

		source.subscribe(val -> Log.i("Subscriber #1:" + val));
		source.subscribe(val -> Log.i("Subscriber #2:" + val));
//		source.subscribe(val -> Log.i("Subscriber #3r:" + val));
//		source.subscribe(val -> Log.i("Subscriber #4r:" + val));
		CommonUtils.exampleComplete();
	}

	//번호가 적인 도형을 발행하는 Observable을 생성합니다.
	private Observable<String> getObservable() {
		if (colors.hasNext()) {
			String color = colors.next();
			return Observable.just(
				Shape.getString(color, Shape.BALL),
				Shape.getString(color, Shape.RECTANGLE),
				Shape.getString(color, Shape.PENTAGON)); 			
		}

		return Observable.empty();		
	}

	public void notDeferred() {
		Observable<String> source = getObservable();

		source.subscribe(val -> Log.i("Subscriber #1:" + val));
		source.subscribe(val -> Log.i("Subscriber #2:" + val));
		CommonUtils.exampleComplete();		
	}

main | value = Subscriber #1:1
main | value = Subscriber #1:1-R
main | value = Subscriber #1:1-P
main | value = Subscriber #2:3
main | value = Subscriber #2:3-R
main | value = Subscriber #2:3-P
-----------------------
main | value = Subscriber #1:5
main | value = Subscriber #1:5-R
main | value = Subscriber #1:5-P
main | value = Subscriber #2:5
main | value = Subscriber #2:5-R
main | value = Subscriber #2:5-P
-----------------------
```

이해가 될듯 말듯하나 정확히 정의내리지 못하겠다.
 확실한건 defer는 supplier의 한 단계가 끝나면 새로운 Observable을 만들어 다음 Observable에 supplier를 적용시킨다는 것이다. 없을 땐 하나의 숫자가 Observable 한개에서 논다.


#### repeat()

단순 반복 실행을 한다. 해당 함수는 서버와 통신을 하면 해당 서버가 잘 살아있는지 확인하는 코드로 주로 활용한다.

```java
String[] balls = {RED, GREEN, BLUE};
		Observable<String> source = Observable.fromArray(balls)
				.repeat(3);

		source.doOnComplete(() -> Log.d("onComplete"))
		.subscribe(Log::i);
		CommonUtils.exampleComplete();
```

1,2,3,1,2,3,1,2,3 하고나서 complete 소환된다.

```java
public void heartbeatV1() {
		CommonUtils.exampleStart();
		String serverUrl = "https://api.github.com/zen";

		Observable.timer(2, TimeUnit.SECONDS) 		//2초 간격으로 서버에 ping 날리기
			.map(val -> serverUrl)
			.map(OkHttpHelper::get)
			.repeat()
			.subscribe(res -> Log.it("Ping Result : " + res));
		CommonUtils.sleep(10000);
		CommonUtils.exampleComplete();
	}
```
 sleep을 하면 현재 스레드가 아닌 다른 스레드에서 task가 완료되기를 기다리기 위해 호출한다.
 repeat, timer 대산 intervel로 할 수 있는데, 이때는 sleep으로 메인스레드의 sleep시간을 조절하여 interval을 제어한다.

### 2.변화 연산자

 flatMap(), concatMap(), switchMap() 함수에 대해서 학습한다. 그리고 reduce() 함수와 유사한 scan() 함수, 그리고 조금은 색다른 groupBy() 함수도 알자.

#### concatMap()함수
 flatMap 함수와 유사하면서 조금 다룬. flatMap은 먼저 들어온 데이터를 처리하는 도중에 새로운 데이터가 들어오면 나중에 들어온 데이터의 처리 결과를 먼저 출력 이를 인터리빙
 그러나 concatMap의 경우 먼저 들어온 데이터 순서대로 처리해서 결과를 낼 수 있도록 보장한다.
![ ](http://reactivex.io/documentation/operators/images/concatMap.png)

```java
public void marbleDiagram() {
		CommonUtils.exampleStart(); //시간을 측정하기 위해 호출

		String[] balls = {RED, GREEN, BLUE}; //1, 3, 5
		Observable<String> source = Observable.interval(100L, TimeUnit.MILLISECONDS)
				.map(Long::intValue)
				.map(idx -> balls[idx])
				.take(balls.length)
				.concatMap(
					ball -> Observable.interval(200L, TimeUnit.MILLISECONDS)
									.map(notUsed -> ball + "<>")
									.take(2)); //2개의 다이아몬드
		source.subscribe(Log::it);
		CommonUtils.sleep(2000);
		CommonUtils.exampleComplete();
	}

  public void interleaving() {
		CommonUtils.exampleStart(); //시간을 측정하기 위해 호출

		String[] balls = {RED, GREEN, BLUE};
		Observable<String> source = Observable.interval(100L, TimeUnit.MILLISECONDS)
				.map(Long::intValue)
				.map(idx -> balls[idx])
				.take(3)
				.flatMap(
					ball -> Observable.interval(200L, TimeUnit.MILLISECONDS)
									.map(notUsed -> ball + "<>")
									.take(2));
		source.subscribe(Log::it);
		CommonUtils.sleep(2000);
		CommonUtils.exampleComplete();
	}

  RxComputationThreadPool-2 | 669 | value = 1<>
  RxComputationThreadPool-2 | 864 | value = 1<>
  RxComputationThreadPool-3 | 1068 | value = 3<>
  RxComputationThreadPool-3 | 1266 | value = 3<>
  RxComputationThreadPool-4 | 1466 | value = 5<>
  RxComputationThreadPool-4 | 1669 | value = 5<>

// 거의 1000ms
  -----------------------
  RxComputationThreadPool-2 | 374 | value = 1<>
  RxComputationThreadPool-3 | 476 | value = 3<>
  RxComputationThreadPool-2 | 575 | value = 1<>
  RxComputationThreadPool-2 | 575 | value = 5<>
  RxComputationThreadPool-3 | 675 | value = 3<>
  RxComputationThreadPool-4 | 779 | value = 5<>

// 거의 400ms

```

인터리빙의 차이가 크다. Observable.interval을 통해 100L 간격으로 발행하다가 flatMap을 만나 새로운 Observable에 다이아몬드가 2개씩 발행하는거로 변경되어 200ms 간격으로 발생.

concatMap을 활용하면 순서를 보장하지만 그만큼 시간이 더 오래 걸림.

#### switchMap()함수

concatMap함수와는 또다르다. concatMap함수가 인터리빙이 발생할 수 있는 상황에서 동작의 순서를 보장해준다면 switchMap함수는 순서를 보장하기 위해 기존에 진행 중이던 작업을 바로 중단합니다. 그리고 여러 개의 값을 발행되었을때 마지막에 들어온 값만 처리하고 싶을 때 사용합니다.

 해당 함수는 마블다이어그램을 확인하는게 좋을 듯!

![ ](http://reactivex.io/documentation/operators/images/switchMap.png)

초록색 정삼각형과 파란색 마름모가 중복될 때, 마지막에 들어온 파란색 마름모로 발행된다.

```Java
public void marbleDiagram() {
		CommonUtils.exampleStart(); //시간을 측정하기 위해 호출

		String[] balls = {RED, GREEN, BLUE};
		Observable<String> source = Observable.interval(100L, TimeUnit.MILLISECONDS)
				.map(Long::intValue)
				.map(idx -> balls[idx])
				.take(balls.length)
				.switchMap(
					ball -> Observable.interval(200L, TimeUnit.MILLISECONDS)
									.map(notUsed -> ball + "<>")
									.take(2));
		source.subscribe(Log::it);
		CommonUtils.sleep(2000);
		CommonUtils.exampleComplete();
	}
```

```java
public void usingDoOnNext() {
		CommonUtils.exampleStart(); //시간을 측정하기 위해 호출

		String[] balls = {RED, GREEN, BLUE};
		Observable<String> source = Observable.interval(100L, TimeUnit.MILLISECONDS)
				.map(Long::intValue)
				.map(idx -> balls[idx])
				.take(balls.length)
				.doOnNext(Log::dt)  //중간결과 확인용
				.switchMap(
					ball -> Observable.interval(200L, TimeUnit.MILLISECONDS)
									.map(noValue -> ball + "<>")
									.take(2));
		source.subscribe(Log::it);
		CommonUtils.sleep(2000);
		CommonUtils.exampleComplete();
	}
```

일단 위의 결과는
```java
RxComputationThreadPool-1 | 106 | debug = 1
RxComputationThreadPool-1 | 206 | debug = 3
RxComputationThreadPool-1 | 307 | debug = 5
RxComputationThreadPool-4 | 510 | value = 5<>
RxComputationThreadPool-4 | 712 | value = 5<>
```

와 같다.

일단 첫번째, 계산 스레드에서 RxComputationThreadPool-1은 발행하는 것으로만 사용.
두번째, 100L 간격으로 첫번째 스레드에서 발행되고 있는데,  
RxComputationThreadPool-1 의 1에서 2개의 다이아몬드 1을 200L간격으로 발행하려 했으나, 300에 5가있어 취소 700에 5<> 무시
RxComputationThreadPool-1 의 3에서 2개의 다이아몬드가 3을 200L 간격으로 발행하려 했으나, 400ms에 다이아몬드 3이 발행되려고했으나 5라는 값이 있어 취소 600ms에도 5의 Observable이 있어서 취소
5가 마지막으로 발행되어 5<> 두 개가 최종적으로 남은 것을 발행.

#### groupBy()함수
어떤 기준(KeySelector인수)으로 단일 Observable을 여러 개로 이루어진 Observable그룹(GroupedObserable)을 만듭니다.

![](http://reactivex.io/documentation/operators/images/groupBy.c.png)

어떤 기준으로 Observable 각각을 여러 개 Observable의 그룹으로 구분한다고 생각하면 편하다.

```java
@Override
	public void marbleDiagram() {
		String[] objs = {PUPPLE, SKY, triangle(YELLOW), YELLOW, triangle(PUPPLE), triangle(SKY)};
		Observable<GroupedObservable<String, String>> source =
				Observable.fromArray(objs)
				.groupBy(Shape::getShape);

		source.subscribe(obj -> {
			obj.subscribe(val ->
			System.out.println("GROUP:" + obj.getKey() + "\t Value:" + val));
		});
		CommonUtils.exampleComplete();
	}

GROUP:BALL	 Value:6
GROUP:BALL	 Value:4
GROUP:TRIANGLE	 Value:2-T
GROUP:BALL	 Value:2
GROUP:TRIANGLE	 Value:6-T
GROUP:TRIANGLE	 Value:4-T
```

```java
public void filterBallGroup() {
		String[] objs = {PUPPLE, SKY, triangle(YELLOW), YELLOW, triangle(PUPPLE), triangle(SKY)};
		Observable<GroupedObservable<String, String>> source =
				Observable.fromArray(objs)
				.groupBy(Shape::getShape);

		source.subscribe(obj -> {
			obj.filter(val -> obj.getKey().equals(Shape.BALL))
			.subscribe(val ->
			System.out.println("GROUP:" + obj.getKey() + "\t Value:" + val));
		});
		CommonUtils.exampleComplete();
	}

GROUP:BALL	 Value:6
GROUP:BALL	 Value:4
GROUP:BALL	 Value:2
```

groupBy함수를 활용해 GroupedObservable을 형성한다. groupBy 안에는 Function 객체의 keySelector가 들어가면 위의 경우

```java
public static String getShape(String obj) {
		if (obj == null || obj.equals("")) return NO_SHAPE;		
		if (obj.endsWith("-H")) return HEXAGON;
		if (obj.endsWith("-O")) return OCTAGON;
		if (obj.endsWith("-R")) return RECTANGLE;
		if (obj.endsWith("-T")) return TRIANGLE;
		if (obj.endsWith("<>")) return DIAMOND;
		if (obj.endsWith("-P")) return PENTAGON;
		if (obj.endsWith("-S")) return STAR;
		return "BALL";
	}
```

다음과 같은 메소드가 분류자로 들어갔다.
다음 필터를 활용해 필요 내용만 출력한다.

#### scan()함수

 reduce()의 경우 Observable에서 모든 데이터가 입력된 후 그것을 종합하여 마지막 1개의 데이터만을 구독자에게 발행하는 반면, scan() 함수는 실행 할 때 **마다** 입력값에 맞는 중간 결과 및 최종 결과를 구독자에게 발행합니다.

 ```java
 public void marbleDiagram() {
		String[] balls = {RED, GREEN, BLUE}; //1,3,5
		Observable<String> source = Observable.fromArray(balls)
				.scan((ball1, ball2) -> ball2 + "(" + ball1 + ")");
		source.subscribe(Log::i);
		CommonUtils.exampleComplete();
	}

main | value = 1
main | value = 3(1)
main | value = 5(3(1))

 ```


### 3.결합 연산자
 여러 개의 Observable을 조합하여 활용하는 결합 연산자를 알아보겠습니다. 결합 연산자는 다수의 Observable을 조합하여 활용하는 결합 연산자이며, 앞서 flatMap()함수나 groupBy() 함수 등은 1개의 Observable을 확장해 주는 반면 결합 연산자들은 여러 개 Observable을 내가 원하는 Observable로 결합해줍니다.

#### zip() 함수

 결합 연산자에서 가장 먼저 알아야 할 함수는 zip() 각각의  Observable을 모두 활용해 2개 혹은 그 이상의 Observable을 결합하는데 있습니다. 예를 들어 A,B 두 개의 Observable을 결합한다면 2개의 Observable에서 모두 데이터를 발행해야 결합할 수 있습니다.

![ ](http://reactivex.io/documentation/operators/images/zip.png)

```java
@SuppressWarnings("unchecked")
    @CheckReturnValue
    @SchedulerSupport(SchedulerSupport.NONE)
    public static <T1, T2, R> Observable<R> zip(
            ObservableSource<? extends T1> source1, ObservableSource<? extends T2> source2,
            BiFunction<? super T1, ? super T2, ? extends R> zipper) {
        ObjectHelper.requireNonNull(source1, "source1 is null");
        ObjectHelper.requireNonNull(source2, "source2 is null");
        return zipArray(Functions.toFunction(zipper), false, bufferSize(), source1, source2);
    }
```

첫 번째 Observable은 source1에 넣고 두 번째 Observable은 source2에 넣은 후 그것을 결합해줄 zipper 변수에 원하는 함수를 넣으면 된다는 뜻.

```java
@Override
	public void marbleDiagram(){
		String[] shapes = {BALL, PENTAGON, STAR};
		String[] coloredTriangles = {triangle(YELLOW), triangle(PUPPLE), triangle(SKY)};

		Observable<String> source = Observable.zip(
			Observable.fromArray(shapes)
					.map(Shape::getSuffix), // 모양을 가져옵니다.
			Observable.fromArray(coloredTriangles)
					.map(Shape::getColor), // 색상을 가져옵니다.
			(suffix, color) -> color + suffix);

		source.subscribe(Log::i);
		CommonUtils.exampleComplete();
	}
```
