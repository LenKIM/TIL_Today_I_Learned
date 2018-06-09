# 2.값



`자바스크립트에 내장된 값 타입과 작동방식을 살펴보고 정확하게 사용할 수 있도록 완전히 이해하자.`



### 배열

```javascript
var a = [1, "2", [3]]

a.length; //3
a[0] === 1; //true
a[2][0] === 3; //true
```



**주의** 구멍난 배열!

```javascript
var a = [];
a[0] = 1'
// 'a[1]' 슬롯을 건너 띄었다.
a[2] = [3];
a[1]; //undefined
a.length; //3	
```

배열 인덱스는 숫자인데, 배열 자체도 하나의 객체여서 키/프로퍼티 문자열을 추가할 수 있다. (하지만 배열 length가 증가하지는 않는다)는 점이 다소 까다롭다.

```javascript
var a = [ ];
a[0] = 1;
a["foobar"] = 2;

a.length; //1
a["foobar"]; //2
a.footbar; // 2
```



### 유사 배열

`indexOf() / concat() / forEach() ` 사용하여 유사 배열을 일반 배열로

```javascript
function foo(){
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}

foo("bar", "baz"); //
```

ES6에서는 `Array.from()` 활용



### 문자열

자바스크립트 문자열은 실제로 생김새만 비슷할 뿐 문자 배열과 같지 않다.

```javascript
var a = "foo"
var b = ["f", "o", "o"];
```

```javascript
a.length; // 3
b.length; // 3

a.indexOf("o"); // 1
b.indexOf("o"); // 1

var c = a.concat("bar"); // "foobar"
var d = b.concat(["b","a","r"]); // ["f", "o", "o", "b","a","r"];

a === c; //false
b === d; //false
a; // foo
b // f o o 


차이점
a[1] = "0";
b[1] = "0";

a; // "foo"
bl // ["f","o","o"]
```

문자열은 불변 값이지만 배열은 가볍값

한가지 더, 문자열은 불변 값이므로 문자열 메서드는 그 내용을 바로 변경하지 않고 항상 해로운 문자열을 생성한 후 반환한다. 반면에 대부분의 배열 메서드는 그 자리에서 곧바로 원소를 수정한다,.

```javascript
c = a.toUpperCase();
a === c; // false
a; // "foo"
c; // "FOO"

b.push("!");
b; // ["f","O","o", "!"]

a.join; // undefined
a.map; //undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v){
    return v.toUpperCase() + ".";
}).join("");

c; // "f-o-o"
d; //"F.O.O"


var c = a
.split("")
.reverse()
.join("");
c; //"oof"

```



### 숫자

자바스크립트의 숫자 타입은 number가 유일하며 '정수 Integer', 부동 소수점 숫자를 모두 아우른다.

```javascript
var a = 42.59

a.toFixed(0); // "43"
a.toFixed(1); // "42.6"
a.toFixed(2); // "42.59"
a.toFixed(3); // "42.590"
a.toFixed(4); // "42.5900"
```

```javascript
var a = 42.59

a.toPrecision(0); // "4e+1"
a.toPrecision(1); // "43"
a.toPrecision(2); // "42.6"
a.toPrecision(3); // "42.59"
a.toPrecision(5); // "42.590"
a.toPrecision(6); // "42.5900"
a.toPrecision(7); // "42.59000"
```



### 작은 소수 값

```javascript
0.1 + 0.2 === 0.3; // false 
```

다른 언어는 모두 IEEE 754표준을 준수하지만, 많은 이들의 예상과는 달리 자바스크립트는 그렇지 않다.

수식만 보면 true이지만, false이다.

간단히 말해, 이진 부동 소수점으로 나타낸 0.1과 0.2는 원래의 숫자와 일치하지 않는다.

정확히는 0.3000000000000004에 가깝지만, 같은 것은 아니다.



**그럼 어떻게?**

가장 일반적으로는 미세한  '반올림 오차'를 허용 공차(Tolerance)로 처리하는 방법이 있다.

**머신 입실론**이라고 하는데, 자바스크립트 숫자의 머신 입실론은 2^-52 이다.

ES6부터는 이 값이 Number.EPSILON으로 미리 정의되어 있으므로 필요시 사용하면 되고, ES6이전 브라우저는 다음과 같이 폴리필을 대신 사용한다.

```javascript
if(!Number.EPSILON){
    Number.EPSILON = Math.pow(2, -52);
}
```

Number.EPSILON으로 두 숫자의 (반올림 허용 오차 이내의) '동등함'을 비교할 수 있다.

```javascript
function numbersCloseEnoughToEqual(n1, n2){
    return Math.abs(n1 - n2) < Number.EPSILON;
}

var a = 0.1 + 0.2;
var b = 0.3;

numbersCloseEnoughToEqual(a,b); // true
numbersCloseEnoughToEqual(0.00000001,0.00000002); // false
```

부동 소수점숫자의 최댓값은 대략 1.798e+ 308이고 Number.MAX_VALUE로 정의하며, 최솟값은 5e-324로 음수는 아니지만 거의 0에 가까운 숫자고 Number.MIN_VALUE 로 정의한다.



### 안전한 정수 범위

숫자를 표현하는 방식이 이렇다 보니, 정수는 Number.MAX_VALUE 보다 휠씬 작은 수준의 안전 값의 범위가 정해져 있다.

`Number.MAX_SAFE_INTEGER` 최솟값은 `Number.MIN_SAFE_INTEGER = -9007199254740991`

When? 데이터베이스에서 64비트 ID를 처리할 때가 대부분



### 정수인지 확인

```
Number.isInteger(42);
Number.isInteger(42.000);
Number.isInteger(42.3);

Poly.fill
if(!Number.isInteger){
    Number.isInteger = function(num){
        return typeof num == "number" && num % 1 == 0;
    };
}
```

