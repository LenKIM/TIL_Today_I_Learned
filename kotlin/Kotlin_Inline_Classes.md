참고 사이트 - <https://kotlinexpertise.com/kotlin-inline-classes/>

## Kotlin Inline Classes

inline class는 런타임에 발생하는 오버 헤드를 추가하지 않고, 다른 유형으로 wrapping하는데, 사용할 수 있는 간단한 도구를 추가.

`inline class WrappedInt(val value:Int)`

- 1.3 이상에서만 동작함.
- inline class는 다소 제한이 존재하는데, 기본 생성자에서 value와 같이 정확하게 하나의 속성을 지정.
- 하나의 인라인 클래스에서 여러 값을 래핑할 수 없다. 또한, init 블록을 포함하는 것이 금지되어 있음.

- 런타임시 래핑된 유형의 인라인 클래스는 가능할 때마다 래퍼없이 사용되며, 이는 Integer또는 Boolean과 같은 Java의 박스형과 유사하며, 컴파일러가 이를 수행할 때마다 해당 기본 유형으로 나타낸다. 그러나 class를 inline할 때 절대적으로 필요하지 않으면 클래스 자체는 바이트 코드로 사용되지 않습니다. 클래스를 인라인하면 런타임시 공간 오버 헤드가 크게 줄어 듭니다.
- When you inline a class, the class itself won’t be used in the byte code unless it’s absolutely necessary. Inlining classes drastically reduces space overhead at runtime.



```java
public final class WrappedInt {
   private final int value;

   public final int getValue() { return this.value; }

   // $FF: synthetic method
   private WrappedInt(int value) { this.value = value; }

   public static int constructor_impl(int value) { return value; }

   // $FF: synthetic method
   @NotNull
   public static final WrappedInt box_impl(int v) { return new WrappedInt(v); }

   // $FF: synthetic method
   public final int unbox_impl() { return this.value; }

   //more Object related implementations
}
```

ByteCode로 변환하면, 다음과 같이 나오고 여기서 box_impl과 unbox_impl이 나옴.



We saw earlier that `box_impl` and `unbox_impl` functions are created for inline classes, so when do we need them? The Kotlin docs cite a rule of thumb which says:



`Inline classes are boxed whenever they are used as another type.`



즉, Boxing될 수 있으면, 되고 안되면 안된다. 특히, generic type이나, nullable type일 경우 boxing됨.

코드로 보면,

```java
inline class WrappedInt(val value: Int)

fun take(w: WrappedInt?) {
    if (w != null) println(w.value)
}

fun main() {
    take(WrappedInt(5))
}
```

이를 바이트 코드로 보면

```java
public static final void take_G1XIRLQ(@Nullable WrappedInt w) {
    if (Intrinsics.areEqual(w, (Object)null) ^ true) {
        int var1 = w.unbox_impl();
        System.out.println(var1);
    }
}

public static final void main() {
    take_G1XIRLQ(WrappedInt.box_impl(WrappedInt.constructor_impl(5)));
}
```



## UseCase

#### 1. Better typing with inline classes

`fun auth(userName: String, password: String) { println("authenticating $userName.") }`

`auth("12345", "user1")`

이 부분을

```java
inline class Password(val value: String)
inline class UserName(val value: String)

fun auth(userName: UserName, password: Password) { println("authenticating $userName.")}

fun main() {
    auth(UserName("user1"), Password("12345"))
    //does not compile due to type mismatch
    auth(Password("12345"), UserName("user1"))
}
```

와 같이 명확하게 쓸 수 있다.

이것의 장점은, 일단 매개 변수 목록의 혼동이 적어지고, 호출자 사이트에서 컴파일러가 불일치를 허용하지 않는다. 더하여, 추가적으로 Heap Allocation을 사용하지 않고도 간단한 형식의 안전한 래퍼를 제공한다.



### Handling state without additional space

먼저 코드를 보자.

```java
/**
 * parses string number into BigDecimal with a scale of 2
 */
fun parseNumber(number: String): BigDecimal {
    return number.toBigDecimal().setScale(2, RoundingMode.HALF_UP)
}

fun main() {
    println(parseNumber("100.12212"))
}
```

이 코드의 문제점은, 매우 간단하고 잘 작동하지만, 요구 사항은 숫자를 구문 분석하는 데 사용된 원래 문자열을 어떻게 든 추적해야 할 수 있다는 것이다. 이를 해결하기 위해 아마도 래퍼 유형을 만들거나 기존 Pair 클래스를 사용하여 해당 함수에서 값 쌍을 반환 할 수 있습니다. 이러한 접근법은 분명히 추가적인 공간을 할당할 뿐만 아니라, 특정 상황에서는 피해야 한다.

```java
inline class ParsableNumber(val original: String) {
    val parsed: BigDecimal
        get() = original.toBigDecimal().setScale(2, RoundingMode.HALF_UP)
}

fun getParsableNumber(number: String): ParsableNumber {
    return ParsableNumber(number)
}

fun main() {
    val parsableNumber = getParsableNumber("100.12212")
    println(parsableNumber.parsed)
    println(parsableNumber.original)
}
```

inline 을 사용할 경우, 최상의 경우 추가적인 공간을 할당하지 않고, 필요에 따라 갑을 파싱하는 메서드나 속성을 제공할 수 있다. 



### Reducing the scope of extension functions

A common issue with extension functions is that they may pollute your namespace if defined on general types like `String`. As an example, you may want to have an extension function that converts a JSON string into a corresponding type:

`inline fun <reified T> String.asJson() = jacksonObjectMapper().readValue<T>(this)`





만약 없다면?

```java
val jsonString = """{ "x":200, "y":300 }"""
val data: JsonData = jsonString.asJson()
```

그러나 확장 함수를 쓰면,

```kotlin
"whatever".asJson<JsonData> //will fail
```

이렇게 되면 JSON이 아니라면 실패할테니, 이럴 때는 inline class를 만들어서 한다.

#### Narrow down extension scope with inline class

```kotlin
inline class JsonString(val value: String)
inline fun <reified T> JsonString.asJson() = jacksonObjectMapper().readValue<T>(this.value)
```

JSON 데이터를 보유하는 문자열에 대한 래퍼 (wrapper)를 소개하고 이에 따라 JsonString 수신기를 사용하여 확장을 변경하면 위에서 설명한 문제가 해결되었습니다. 확장은 더 이상 임의의 String에는 표시되지 않지만 의식적으로 JsonString에 래핑 된 문자열에만 표시됩니다.



### Unsigned Types

```kotlin
public inline class UInt @PublishedApi internal constructor(@PublishedApi internal val data: Int) : Comparable<UInt>
```

<https://github.com/Kotlin/KEEP/blob/master/proposals/unsigned-types.md>

