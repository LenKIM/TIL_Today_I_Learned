스칼라에서 Tuple은 고정 된 수의 요소를 포함하는 값으로 각 요소는 고유 한 형식을가집니다. 튜플은 변경 불가능(immutable)합니다.

튜풀은 특정 함수의 여러개의 리턴을 받아올 때 유용합니다.

2개의 요소를 가진 튜플은 다음과 같이 만들 수 있습니다.

```scala
val ingredient = ("Sugar" , 25)
```

위 식은 String과 Int값을 가진 튜플을 생성했습니다.

그러므로 추론된 유형의 성분은 (String, Int)이며 Tuple2 [String, Int]의 줄임말입니다.

튜플을 나타내기 위해 Scala는 Tuple2, Tuple3 ... Tuple22 등을 통해 일관된 클래스를 사용합니다. 각 클래스에는 요소가있는만큼 많은 유형 매개 변수가 있습니다.



# element에 접근하는 방법

튜플 요소에 접근하는 한 가지 방법은 요소가 위치한 순서에 의한 것입니다. 개별 요소의 이름은 _1, _2 등입니다.

```scala
println(ingredient._1) // Sugar
println(ingredient._2) // 25
```

# 튜플에서의 패턴 매칭

튜플은 패턴 일치를 사용하여 분리 될 수 있습니다.

```scala
val (name, quantity) = ingredient
println(name) // Sugar
println(quantity) // 25
```

여기서 `name` 의 추론된 타입은 `String` 이고, `quantity` 의 추론된 타입은 `Int` 입니다.

여기 또 다른 튜플에서의 또다른 패턴매칭의 예시를 살펴보겠습니다.

```scala
val planets =
  List(("Mercury", 57.9), ("Venus", 108.2), ("Earth", 149.6),
       ("Mars", 227.9), ("Jupiter", 778.3))
planets.foreach{
  case ("Earth", distance) =>
    println(s"Our planet is $distance million kilometers from the sun")
  case _ =>
}
```

또는. `for` 의 comprehension 방법도 있습니다.

```scala
val numPairs = List((2, 5), (3, -7), (20, 56))
for ((a, b) <- numPairs) {
  println(a * b)
}
```

# Tuples 그리고 case classes

사용자들은 때때로 Tuple과 case classes사이에서 무엇을 선택할지 힘들어합니다. Case Classes는 이름이 주어진 요소입니다. 그 이름은 코드를 읽을 때 가독성을 높여줍니다. 위의 행성 예제에서 튜플을 사용하는 대신 사례 클래스 Planet (name : String, distance : Double)을 정의 할 수 있습니다.