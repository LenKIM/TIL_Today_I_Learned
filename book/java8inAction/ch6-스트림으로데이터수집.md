# 스트림으로 데이터 수집

- Collectors 클래스로 컬렉션을 만들고 사용하기
- 하나의 값으로 데이터 스트림 리튜스하기
- 특별한 리듀싱 요약 연산
- 데이터 그룹화의 분할
- 자신만의 커스텀 컬렉션 개발



다양한 요소 누적 방식 Collector 인터페이스에 정의



![image-20190815144132155](http://ww3.sinaimg.cn/large/006tNc79gy1g60b6qkqmnj310u0nghdt.jpg)



## 미리 정의된 컬렉션

Collectors에서 제공하는 메서드의 기능은 크게 세 가지로 구분 할 수 있다.

- 스트림 요소를 하나의 값으로 **리듀스하고 요약**
- **요소 그룹화**
- **요소 분할**





### 리듀스과 요약

- counting()  
  `long howManyDishs = menu.stream().collect(Collectors.counting());`  

  `long howManyDishs = menu.stream().count();`

- Collectors.maxBy , Collectors.minBy  
  `Comparator<Dish> dishCaloriesComparator = Comparator.comparingInt(Dish::getCalories)`

  `Comparator<Dish> dishCaloriesComparator = menu.stream().collect(maxBy(dishCaloreisComparator)) `

- 그 외 합계 평균등을 반환하는 연산에도 리듀싱 기능이 자중 사용되고 이걸 요약 연산이라 한다.
- `averagingInt(Dish::getCalories)`
- `summarizingInt`



### 문자열 연결

`String shortMenu = menu.stream().map(Dish::getName).collect(joining());`



`joining` 메서드는 내부적으로 StringBuilder를 이용해서 문자열을 하나로 만든다. 



### 범용 리듀싱 요약 연산

reducing 팩토리 메서드로도 정의 할 수 있음. 즉, 범용 Collectors.reducing으로 구혀낳 룻 있다.

`int totalCalories = menu.stream().collect(reducing(0, Dish::getCalories, (i, j) -> i + j));`





> *Notes*
>
> Collect와 reduce는 무엇이 다를까?
>
> collect 메서드는 도출하려는 결과를 누적하는 컨테이너를 바꾸도록 설계된 메서드인 반면 reduce는 두 값을 하나로 도출하는 불변형 연산이라는 점에서 의미론적인 문제가 일어난다.



> *Notes*
>
> 제네릭 와일드 카드 '?' 사용법 
>
> public static <T> Collector<T, ?, Long> counting() {
>
> ​	return reducing(0L, e -> 1L, Long::sum);
>
> }
>
> ?는 컬렉션의 누적자 형식이 알려지지 않았음을, 즉 누적자의 형식이 자유로움을 의미한다. 위 예제에서는 Collectors 클래스에서 원래 정의된 메서드 시그너처를 그대로 사용했을 뿐이다. 



## 그룹화

데이터 집합을 하나 이상의 특성으로 분류해서 그룹화하는 연산도 데이터베이스에서 많이 수행되는 작업.

트랜잭션 통화 그룹화 예제에서 확인했듯이 명령형으로 그룹화를 구현하려면 까다롭고, 할일이 많으며, 에러도 많이 발생한다. 하지만 자바 8의 함수형을 이용하면 가독성 있는 한 줄의 코드로 그룹화를 구현할 수 있다.

```java
Map<Dish.Type, List<Dish>> dishesByType = menu.stream().collect(groupingBy(Dish::getType));
```



`groupingBy` 가 바로 분류함수.



```java
public enum CaloricLevel {DIET, NORNAL, FAT}

Map<CaloricLevel, List<Dish>> dishesByCaloricLevel = menu.stream().collect(
  groupingBy(dish -> {
    if(dish.getCalories() <= 400) {
      return CaloricLevel.DIET;
    } else if(dish.getCalories() <= 700){
      return CaloricLevel.NORMAL;
    } else {
            return CaloricLevel.FAT;
		}
  }));
```



이런식으로도 활용할 수 있다.



더욱 진화시켜서 2번쨰 수준까지의 분류를 시도해보자.

```java
public enum CaloricLevel {DIET, NORNAL, FAT}

Map<Dish.Type, Map<CaloricLevel, List<Dish>>> dishesByTypeCaloricLevel = menu.stream().collect(
  groupingBy(Dish::getType,  groupingBy(dish -> {
      if(dish.getCalories() <= 400) {
		        	return CaloricLevel.DIET;
      } else if(dish.getCalories() <= 700){
       	 			return CaloricLevel.NORMAL;
      } else {
              return CaloricLevel.FAT;
      }
    )
  }));
  
//결과
{MEAT={DIET=[chiken], NORMAL=[beef], FAT=[pork]}, FISH={DIET=[prawbs], NORMAL=[salmon]}, OTHER={DIET=[rice, seasomal fruit], NORMAL=[pizze]}}
```



### 서브그룹으로 데이터 수집.



데이터를 서브그룹으로 나눈뒤 요약함수를 활용해서 데이터를 수집할 수 있다.

```java
Map<Dish.type, Long> typesCount = menu.stream()
  .collect(groupingBy(Dish::getType, counting()));
```

\> groupingBy(f) 는 사실 groupingBy(f, toList())  이다.



![image-20190815151912962](http://ww1.sinaimg.cn/large/006tNc79gy1g60c9x6p2gj30u00xlu15.jpg)





## 분할(partitioning function)



앞에서 살펴본 GroupingBy와 다른 점은 그룹화를 시키는 것이 아니라. True, False로 구분짓게 만들어 준다는 점에서 다르다.



```java
Map<Boolean, List<Dish>> partitionedMenu =
  menu.stream().collect(partitioningBy(Dish::isVegetarian)); // 분할 함수
```

위 코드를 실행하면 다음과 같은 맵이 나온다.

```
{false = [port, beef, ....], true=[french fries, rice, ...]}
```

이제 이 결과를

```java
List<Dish> vegetarianDishes = partitionedMenu.get(true);
으로 결과를 가져올 수 있다.
```



이렇듯, 분할 함수의 장점은 참, 거짓 두 가지 요소의 스트림 리스트를 모두 유지한다는 것이다.



분할 함수 또한 n 수준으로 서브그룹을 그룹화할 수 있다.



### 숫자를 소수와 비소수로 분할하기.

정수 n을 인수로 받아서 2에서 n까지의 자연수를 소수(prime)와 비소수(nonprome)로 나누는 프로그램 구현하기.



```java
public boolean isPrime(int candidate){
  return IntStream.range(2, candidate) // 2부터 candidate 미만 사이의 자연수를 생성
    						.noneMatch(i -> candidate % 1 == 0); // 스트림의 모든 정수로 candidate를 나눌 수 없으면 참을 반환한다.
}
```

조금 더 심화시키면 소수의 대상을 주어진 수의 제곱근 이하의 수로 제한할 수 있다,

```java
public boolean isPrime(int candidate){
  int candidateRoot = (int) Math.sqrt((double)candidate);
  return IntStream.rangeClosed(2, candidateRoot)
    						.noneMatch(i -> candidate % 1 == 0);
}
```



이제 n개의 숫자를 포함하는 스트림을 만든 다음에 우리가 구현한 isPrime 메서드를 프레디케이트로 이용하고 partitioningBy 컬렉터로 리듀싱해서 소수 분류

```java
public Map<Boolean, List<Integer>> partitionPrimes(int n){
  return IntStream.rangeClosed(2, n).boxed()
    							.collect(
  											partitioningBy(candidate -> isPrime(candidate)));
}
```



그 외 다양한 Collectors 를 살펴보면

![image-20190815153624208](http://ww2.sinaimg.cn/large/006tNc79gy1g60crr0vdrj310i0cm1ik.jpg)

![image-20190815153614197](http://ww2.sinaimg.cn/large/006tNc79gy1g60crkp61wj30u014lb2b.jpg)





## Collector 인터페이스

Collector 인터페이스는 리듀싱 연산(즉, 컬렉터)을 어떻게 구현할지 제공하는 메서드 집합으로 구성된다.

이번에는 Collector 인터페이스를 직접 구현해서 더 효율적으로 문제를 해결하는 컬렉터를 만드는 방법을 보자.



먼저 Collector 인터페이스 를 살펴보면

```java
public interface Collector<T, A, R> {
			   Supplier<A> supplier;
         BiConsumer<A, T> accumulator;
         BinaryOperator<A> combiner;
         Function<A, R> finisher;
         Set<Characteristics> characteristics;
}
```



- T는 수집될 스트림 항목의 제네릭 형식이다.
- A는 누적자, 즉 수집 과정에서 중간 결과를 누적하는 객체의 형식이다.
- R은 수집 연산 결과 객체의 형식(항상 그런 것은 아니지만 대개 컬렉션 형식)이다.



예를 들어 Stream\<T> 의 모든 요소를 List\<T>로 수집하는 ToListCollector\<T>라는클래스로 구현할 수 있다.

> public class ToListCollector<T> implements Collector<T, LIST\<T>, LIST\<T>



이제 각 인터페이스의 메서드를 살펴보면,

`Supplier<A> supplier;` 

**새로운 결과 컨테이너 만들기**  
: supplier 메서드는 빈 결과로 이루어진 Supplier 를 반환. 즉, Supplier 는 수집 과정에서 빈 누적자 인스턴스를 만드는 파라미터가 없는 함수.

```java
public Supplier<List<T>> supplier(){
  return () -> new ArrayList<T>();
}

/// 생성자 레퍼런스를 쓰면
public Supplier<List<T>> supplier(){
  return ArrayList::new;
}
```

`BiConsumer<A, T> accumulator;`

**accumulator 메서드 : 결과 컨테이너에 요소 추가하기.**

: accumulator 메서드는 리듀싱 연산을 수행하는 함수를 반환한다. 스트림에서 n번째 요소를 탐색할 때 두 인수, 즉 누적자(스트림의 첫 n-1개 항목을 수집한 상태)와 n번째 요소를 함수에 적용한다. 함수의 반환값은 void, 즉 요소를 탐색하면서 적용하는 함수에 의해 누적자 내부 상태가 바뀌므로 누적자가 어떤 값인지 단정할 수 없다.

```java
public BiConsumer<List<T>, T> accumlator(){
  return (list, item) -> list.add(item);
}

// 생성자 래퍼런스
public BiConsumer<List<T> supplier(){
  return List::new;
}
```

`Function<A, R> finisher;`

**최종 변환값을 결과 컨테이너로 적용하기.**

: 스트림 탐색을 끝내고 누적자 객체를 최종결과로 변환하면서 누적 과정을 끝낼 때 호출할 함수를 반환해야 한다.  때로는 ToListCollector에서 볼 수 있는 것처럼 누적자객체가 이미 최종 결과인 상황도 있다. 이럴 때는 변환 과정이 필요하지 않으므로 finisher 메서드는 항등 함수를 반환.

```java
public Function<List<T>, List<T>> finisher() {
  return Function.identity();
}
```

`BinaryOperator<A> combiner;`

**: 두 결과 컨테이너 병합**

마지막으로 리듀싱 연산에서 사용할 함수를 반환하는 네 번째 메서드 combiner

combiner는 두 스트림의 서로 다른 서브 파트를 병렬로 처리할 때 누적자가 이 결과를 어떻게 처리할지 정의.

```java
public BinaryOperator<List<T>> combiner() {
  return (list1, list2) -> {
    list1.addAll(list2);
    return list1;
  }
}
```

![image-20190815172328523](http://ww1.sinaimg.cn/large/006tNc79gy1g60fv79vk9j31060sknpd.jpg)



combiner를 이용하면 스트림의 리듀싱을 병렬로 수행할 수 있다. 스트림의 리듀싱을 병렬로 수행할 때 자바 7의 포크/조인 프레임워크와 Spliterator를 사용한다.

다음은 병렬 리듀싱 수행과정을 보여준다.

- 스트림을 분할해야 하는지 정의하는 조건이 거짓으로 바뀌기 전까지 원래 스트림을 재귀적으로 분할 한다.(보통 분산된 작업의 크기가 너무 작아지면 병렬 수행의 속도는 순차 수행의 속도보다 느려진다. 즉, 병렬 수행의 효과가 상쇄된다. 일반적으로 프로세싱 코어의 개수를 초과하는 병렬 작업은 효율적이지 않다.)
- 이제 위 그림에서 보여주는 것처럼 모든 **서브스트림** 의 각요소에 리듀싱 연산을 순차적으로 적용해서 서브스트림을 병렬로 처리할 수 있다.
- 마지막에는 컬렉터의 Combiner 메서드가 반환하는 함수로 모든 부분결과를 쌍으로 합친다. 즉, 분할된 모든 서브스트림의 결과를 합치면서 연산이 완료된다.

![image-20190815173112018](http://ww1.sinaimg.cn/large/006tNc79gy1g60g39dk87j30uu0u0x6p.jpg)





**마지막으로 Characteristics 메서드**

컬렉터의 연산을 정의하는 Characteristics 형식의 불변 집합을 반한한다. Characteristic는 스트림을 병렬로 리듀스할 것인지 그리고 병렬로 리듀스한다면 어떤 최적화를 선택해야 할지 힌트를 제공.

Characteristics는 다음 세 항목을 포함하는 열거형이다.

`UNORDERED`

리듀싱 결과는 스트림 요소의 방문 순서나 누적 순서에 영향을 받지 않는다.

`CONCURRENT`

다중 스레드에서 accumulator 함수를 동시에 호출할 수 있으며 이 컬렉터는 스트림의 병렬 리듀싱을 수행할 수 있다. 컬렉터의 플래그에 UNORDERED를 함께 설정하지 않았다면 데이터 소스가 정렬되어 있지 않은(즉, 집합처럼 요소의 순서가 무의미한) 상황에서만 병렬 리듀싱을 수행

`IDENTITY_FINISH`

finisher 메서드가 반환하는 함수는 단순히 identity를 적용할 뿐이므로 이를 생략할 수 있다. 따라서 리듀싱 과정의 최종 결과로 누적자 객체를 바로 사용할 수 있다. 또한 누적자 A를 결과 R로 안전하게 형변환할 수 있다.



```java
import java.util.*;
import java.util.function.*;
import java.util.stream.Collector;
import static java.util.stream.Collector.Characteristics.*;

public class ToListCollector<T> implements Collector<T, List<T>, List<T>> {

    @Override
    public Supplier<List<T>> supplier() {
        return () -> new ArrayList<T>();
    }

    @Override
    public BiConsumer<List<T>, T> accumulator() {
        return (list, item) -> list.add(item);
    }

    @Override
    public Function<List<T>, List<T>> finisher() {
        return i -> i;
    }

    @Override
    public BinaryOperator<List<T>> combiner() {
        return (list1, list2) -> {
            list1.addAll(list2);
            return list1;
        };
    }

    @Override
    public Set<Characteristics> characteristics() {
        return Collections.unmodifiableSet(EnumSet.of(IDENTITY_FINISH, CONCURRENT));
    }
}
```



### 컬렉션 구현을 만들지 않고도 커스텀 수집 수행하기.



IDENTITY_FINISH 수집 연산에서는 Collector 인터페이스를 완전히 새로 구현하지 않고도 같은 결과를 얻을 수 있다. Stream은 세 함수(supplier, accumulator, combiner)를 인수로 받아 collect메서드를 오버로드하며 각각의 메서드는 Collector 인터페이스의 메서드가 반환하는 함수와 같은 기능을 수행한다. 예를 들어 다음처럼 스트림의 모든 항목을 리스트에 수집하는 방법도 있다.

```java
List<Dish> dishes = menuStream.collect(
											ArrayList::new, //supplier
											List::add, // accumlator
											List::addAll); //combiner
```



좀더 축약이지만 가독성 떨어짐.

// 일부 내용 정리 필요.













































































