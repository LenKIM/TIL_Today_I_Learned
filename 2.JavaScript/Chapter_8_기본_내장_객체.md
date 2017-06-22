# Chapter 8 기본 내장 객체

  자바와 마찬가지로 많은 기본 객체들이 내장되있는데,
  w3schools사이트와 함께 활용해보자꾸나.

  또한 devdocs.io 도 참고해보자. 각각의 속성, 메소드와 관련된 정보를 찾을수 있을거야.
## 8.1 기본 자료형과 객체의 차이점
 기본 자료형은 자바스크립트의 여섯가지 자료형 중
 숫자, 문자열, 불 세가지 자료형을 의미합니다.
 기본 자료형과 객체의 특성이 다르므로 차이를 둡니다.

 그러나, 기본자료형 과 객체의 출력값이 같아
 각자의 속성과 메서드를 살펴보면. 같은 속성과 메소드를 가지고있어.

 왜 그럴까?
 속성과 메서드는 객체가 가질 수 있는 것인데, 기본 자료형에도 속성과 메서드가 있습니다. 기본 자료형의 속성이나 메소드를 사용하면 기본 자료형이 자동으로 객체로 변환됩니다.

 굳이 차이점을 찾는다면, 기본 자료형은 객체가 아니므로 속성과 메서드를 추가할 수 없습니다.

 예를 들어 - 기본자료형에 메소드를 추가하면?

    <script>
      //변수를 만듭니다.
      var primitiveNumber = 273;

      //메소드 추가
      primitiveNumber.method = function() {
        return 'Primitive Method'
      };

      //메서도 실행
      var output = primitiveNumber.method() + '\n';
      alert(output)
    </script>  

이렇게 되면 기본자료형이 메소드를 가지려고했기 때문에 오류가 발생합니다.

 마치 이렇게 생각해보기.

*기본 자료형이 객체로 변환할 때 일회용 옷을 입는다는 개념으로 생각하면 쉽습니다. 기본 자료형의 메서드를 사용하는 것은 기본 자료형에게 일회용 옷을 입힌 다음 메서드를 사용하는 것입니다. 한 번 사용하면 곧바로 일회용 옷을 버립니다. 기본 자료형에 메서드를 추가했지만, 이는 기본 자료형에게 직접 메서드를 추가한 것이 아니라 일회용 옷을 추가한 것이므로 추가하자마자 버려집니다.*

 그럼 아예 못입는걸까요? **아니요** 프로토타입으로 일회용 옷 자체를 바꾸면 됩니다.

     <script>
       //변수를 만듭니다.
       var primitiveNumber = 273;
       //기본자료형에서 객체로 변환
       var objectNumber = new Number(273);

       //메소드 추가
       Number.prototype.method = function() {
         return 'Method on prototype'
       };

       //메서도 실행
       var output = '';
       output += primitiveNumber.method() + '\n';
       output += objectNumber.method();

       //출력
       alert(output)
     </script>  

프로토타입에 메서드를 추가하면 기본 자료형에게도 새로운 메서드가 생성됩니다. 위에 코드를 해석하면 273을 가진 숫자형 기본 자료형이 있는데, 숫자형기본자료형프로토타입에다가 새로운 메소드를 추가해줘서 나중에 내가 그것을 쓸수 있게 되는것!

## 8.2 Object 객체
자바처럼 최상위 객체
**8.2.1 생성**
 가장 기본적인 내장 객체는 바로 Object, 정확히는 Object생성자 함수로 만든 인스턴스지만 간단하게 Object객체라고 표현할수 있다.
 다음 두가지 방법으로 생성합니다.
 var object = {};
 var object = new Object();

**8.2.2 속성과 메서드**
 Constructor() : 객체의 생성자 함수를 나타냅니다.
 hasOwnProperty(name) : 객체가 name 속성이 있는지 확인합니다.
 isPrototypeof(object) : 객체가 object의 프로토타입인지 검사합니다.
 propertyIsEnumerable(name) : 반복문으로 열거할 수 있는지 확인합니다.
 toLocaleString() : 객체를 호스트 환경에 맞는 언어의 문자열로 바꿉니다.
 toString() : 객체의 문자열로 바꿉니다.
 valueOf() : 객체의 값을 나타냅니다.

 이 중에서 hasOwnProperty()메서드와 propertyIsEnumerable()메서드를 사용해보쟈

     <script>
      //변수만들고
      var object = {property: 273};

      //출력
      var output = '';
      output += "HOP('property'): " + object.hasOwnProperty('property') + '\n';
      output += "HOP('Constructor'): " + object.hasOwnProperty('constructor') + '\n';
      output += "PIE('property'): " + object.propertyIsEnumerable('property') + '\n';
      output += "PIE('constructor'): " + object.propertyIsEnumerable('constructor') + '\n';
      alert(output);

      //for in 반복문을 사용
      for(var key in object) {
        alert(object[key]);
      }
    <script>

    결과는 true false true false

 toString의 자바식으로 표현하면 오버라이드

 **8.2.3 자료형 구분**

 Object객체에 있는 constructor()메서드는 객체의 생성자함수를 의미
 constructor()메서드는 자료형을 검사할 때 유용하게 사용할수 있다.

 근데...? 자료형 검사는 typeof가 있는데 뮁?

 typeof를 활용해서 Object와 숫자형의 구분을 확실하게 할 수 있다. 그러나 두 대상을 같은 자료형으로 취급하고 싶을 떄는 constructor() 메서드를 사용해야 합니다.
  무슨말인지 이해가 안된다면?

   var numberFromLiteral = 273;
   var numberFromObject = new Number(273);

   이 둘의 차이는 정확히 판단하면 전자는 숫자 기본형, 후자는 객체를 생성한거이기 때문에 객체, 엄밀히 따지만 다르지만 이것이 문제를 일으킬수 있다. 그래서 필요한 것이 constructor()함수!

    <script>
      //변수를 선언
      var numberFromLiteral = 273;
      var numberFromObject = new Number(273);

      //자료형을 확인합니다.
      if(numberFromLiteral.constructor == Number) {
        alert('numberFromLiteral은 숫자입니다.');
      }
      if(numberFromObject.constructor == Number) {
        alert('numberFromObject은 숫자입니다.');
      }
      </script>

**8.2.4 모든 객체에 메서드 추가**

 Object 객체는 모든 자바스크립트 객체의 최상위 객체이다.
 이건 이전에 이미 한번 작성해보았지만 다시한번 살펴봅시다.

    <script>
      //Object 객체의 프로토타입에 메서드를 추가합니다.
      Object.prototype.test = function() {
        alert(this);
      };

      //number 객체의 test()메서드를 호출
      var number = 273;
      number.test();
    </script>

  이렇게 하면 object의 모든 객체에 test라는 메서드가 추가된것이다.

## 8.3 Number 객체

 Number객체는 자바스크립트에서 가장 단순한 객체로 숫자로 표현할 때 사용합니다.

 Number객체는 아래와 같이 생성함

 <script>
  //변수를 선언
  var numberFromLiteral = 273;
  var numberFromConstructor = new Number(273);
</script>

  **8.3.1 메서드**

  Number객체는 Object객체의 7가지 메소드와 더불어 3가지 메소드를 추가로 갖습니다.
  toExponential() -> 숫자를 지수 표시로 나타낸 문자열을 리턴합니다.
  toFixed() -> 숫자를 고정 소수점 표시로 나타낸 문자열을 리턴합니다.
  toPrecision() -> 숫자를 길이에 따라 지수 표시 또는 고정 소수점 표시로 나타낸 문자열로 리턴합니다.

      <script>
        //변수를 선언합니다.
        var number = 273.2124;

        var output = '';
        output += number.toFixed(1) + '\n';
        output += number.toFixed(4) + '\n';
        alert(output);
      </script>

      결과물이 273.2 / 273.2124

      또다른 방법

      var fixedNumber = (273.2124).toFixed(2);

**8.3.2 생성자 함수의 속성**

생성자 함수의 속성??

    <script>

    //생성자 함수를 만들고
    function Constructor() {}
    Constructor.property = 273;
    Constructor.method = function() { };

    //출력합니다.
    alert(Constructor.property);
    </script>

    이렇게하면 273이 출력됨.
    이게 무슨 말이냐면 **모든함수는 속성과 메서드를 가질수 있다**

**Number**생성자 함수에더 속성과 메서드를 당연히 가지는데,
속성에서
MAX_VALUE 자바스크립트의 숫자가 나타낼수 있는 최대의숫자
MIN_VALUE 자바스크립트의 숫자가 나타낼수 있는 최소의숫자
NaN 자바스크립트의 숫자로 나타낼 수 없는 숫자
POSITIVE_INFINITY 양의 무한대
NEGATIVE_INFINITY 음의 무한대

## 8.4 String 객체

**8.4.1**생성

    <script>
      //변수를 선언합니다.
      var stringFromLiteral = 'Hello World..!';
      var stringFromConstructor = new String('Hello World..!');

      //변수의 자료형을 출력
      var output = '';
      output += typeof (stringFromLiteral) + '\n';
      output += typeof (stringFromConstructor);
      alert(output);
    </script>

 **8.4.2 기본 속성과 메서드**
 문자열의 기본속성에는
 length : 문자열의 길이를 나타냄

     문자열의 String 객체의 메소드
     chatAt(position)
     charCodeAt(position) 유니코드 번호 리턴
     concat(args) 매개변수로 입력한 문자열 리턴
     indexOf(searchString.position) 앞에서부터 일치하는 문자열의 위치 리턴
     lastIndexOf(searchString.position) 뒤에서부터 일치하는 문자열 위치 리턴
     match(regExp)
     replace(regExp, replacement)
     search(regExp)
     slice(start, end)
     split(separator, limit)
     substr(start, count)
     subString(string, end)
     toLowerCase()
     toUpperCase()

 **8.4.3 HTML 관련 메서드**
 생략

## 8.5 Array 객체

**8.5.1 생성**

    Array() 빈 배열
    Array(number) 매개변수만큼의 크기를 가지는 배열을 만듬
    Array(mixed..., mixed) 매개변수를 배열로 만듭니다.

    <script>
     var array1 = [52,273,103,57,32];
     var array2 = new Array();
     var array3 = new Array(19);
     var array4 = new Array(52, 273, 103, 57, 32);
    </script>

**8.5.2 속성과 메서드**

length -> 배열 요소의 개수

메서드 종류
concat() : 매개변수로 입력한 배열의 요소를 모두 합쳐 배열리턴
join() : 배열 안에 모든 요소를 문자열로 만들어 리턴
pop()* : 배열의 마지막 요소를 제거하고 리턴
push()* : 배열의 마지막 부분을 새로운 요소를 추가
reverse()* : 배열의 요소 순서를 뒤집
slice() : 배열 요소의 지정한 부분을 리턴
sort()* : 배열의 요소를 정렬
 => 문자열 오름차순으로 정렬됨을 주의!!
splice()* : 배열 요소의 지정한 부분을 삭제하고 삭제한 요소를 리턴

*표시된 메서드는 자기 자신이 변화는 것.

**8.5.3 정렬**
 sort()의 정렬방법에 변화를 주고싶다면?
 sort()메서드의 매개변수로 함수를 넣어줍니다.
 array.sort(function (left, right) {

   });

  정리하면 그냥 sort()하면 문자열 오름차순으로 되고
  매개변수안에 function(left, right)를 넣으면
  숫자 오름차순 정렬

  function(left, right){
    return right - left;
    }를 넣으면 숫자 내림차순 정렬

**8.5.4 요소 제거**

Array 객체의 메서드에는 특정 요소를 제거하는 메서드가 따로 없습니다. splice()메서드를 사용하면 특정 요소를 제거하는 기능을 쉽게 만들 수 있으며 프로토타입에 remove()메서드를 추가하면 배열의 요소를 쉽게 제거할 수있습니다.

//Array 생성자 함수의 프로토타입에 remove()메서드를 추가합니다.
Array.prototype.remove = function (index) {
  this.splice(index, 1);
}

올바른 Array 객체의 요소 제거
 왜 이게 있다면 앞에서부터하면 삭제되고 난뒤 요소가 앞으로 당겨져 오류가 발생합니다.

    <script>
      //Array 생성자 함수의 프로토타입에 remove()메서드를 추가
      Array.prototype.remove = function(index) {this, splice(index, 1);}

      var array = [52, 273, 103, 32, 274, 129];

      //반복문과 조건문으로 100보다 큰 요소를 제거
      for(var i = array.length - 1; i >= 0; i--) {
       if(array[i] > 100) {
         array.remove(i);
       }
      }
    </script>
## 8.6 Date 객체
 Date는 날짜

 **8.6.1** 생성은 var date = new Date();

 new Date('December 9');
 new Date('December 9', 1991);
 new Date('December 9', 1991, 02:24:23);

 또는 매개변수에 숫자를 연, 월-1, 일, 시, 분, 초 순서로 입력
 var date = new Date(1992, 11, 9);

 **8.6.2** 메서드?
 정말 많다...

 **8.6.3 시간간격계산**
 자바와 동일. 프로토타입에 메서드 추가하는 것도 방법


## 8.7 Math 객체
 Math객체는 자바스크립트에서 유일하게 생성자 함수를 사용하지 않음.

 메서드의 함수화

    <script>
    //변수를 선언
    var max = Math.max;
    alert(max(52, 273, 103, 57, 32));
    </script>
## 8.8 ECMAScript 5 Array 객체
HTML5와 함께 출현한 자바스크립트 표준안을  ECMAScript 5라고 부름

**8.8.1 확인 메서드**
Array.isArray() -> 배열인지 확인.

**8.8.2 탐색 메서드**
indexOf() -> 특정요소를 앞쪽부터 검색
lastIndexOf -> 특정요소를 뒷쪽부터 검색

**8.8.3 반복 메서드**
forEach() -> 배열의 각각의 요소를 사용해 특정 함수를 for in반복문처럼 실행
map() 기존의 배열에 특정 규칙을 적용해 새로운 배열을 만듬

 forEach() 메서드

    <script>
    //변수를 선언
    var array = [1,2,3,4,5,6,7,8,9,10];

    var sum = 0;
    var output = '';
    array.forEach(function (element, index, array) {
    sum += element;
    output += index + ': ' + element + ' -> ' + sum + '\n';
    });
    </script>

매개변수로 입력 함수에 배열의 요소와 관련된 정보를 넣어 반복합니다. element는 현재 반복에서 배열의 요소를 뜻하고, index는 현재 반복에서 배열 요소의 인덱스, Array의 경우는 현재 반복을 수행하는 배열 자체.

    <script>
    var array = [1,2,3,4,5,6,7,8,9,10];

    var output = array.map(function (element) {
      return element * element;
      });

      alert(output);
  **8.8.4 조건 메서드**

forEach() 메서드의 매개변수로 입력되는 함수의 형태는 filter()메서드를 비롯해 every(), some()메서드에서도 사용된다.

filter() -> 특정 조건을 만족하는 요소를 추출해 새로운 배열을 만든다.
every() -> 배열의 요소가 특정 조건을 모두 만족하는지 확인합니다.
some() -> 배열의 요소가 특정 조건을 적어도 하나 만족하는지 확인

    <script>
      var array = [1,2,3,4,5,6,7,8,9,10]

      array= array.filter(function (element, index, array) {
        return element <= 5;
        })
    </script>

filter()메서드는 매개변수로 입력한 함수는 불 리턴해야합니다. 이때 리턴하는 값이 true인 배열의 요소만을 골라 새로운 배열을 만듭니다.

    <script>
      var array = [1,2,3,4,5,6,7,8,9,10]

      function lessThanFive(element, index, array) {
        return element < 5;
      }


      function lessThanTwenty(element, index, array) {
        return element < 20;
      }

      var output1 = array.every(lessThanFive);
      var output2 = array.every(lessThanTwenty);
      var output3 = array.some(lessThanFive);
      var output4 = array.some(lessThanTwenty);
    </script>

    false : true
    true : true

이렇게 나오는데, 이유는 every는 모든 조건에 만족해야 true
반면 some()은 배열의 요소중 적어도 하나 이상의 함수에서 true를 리턴할 경우에 true를 리턴

**8.8.5 연산 메서드**

reduce() -> 배열의 요소가 하나가 될 때까지 요소를 왼쪽부터 두 개씩 묶는 함수를 실행합니다.
reduceRight() -> 배열의 요소가 하나가 될 떄까지 요소를 오른쪽부터 두 개씩 묶는 함수를 실행합니다.

 reduce()

    <script>
      //변수를 선언
      var reduce = [1,2,3,4,5];

      //출력
      var output = '';
      array.reduce(function(previousValue, currentValue, index, array) {
      output += previousValue + ' : ' currentValue + ' : ' + index + '\n';
      } );
      alert(output);

      var result = array.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
        });
      //결과는 15가 나옴.
      reduce-> 하나가 될때까지 계속 줄여나가는 함수.
    </script>

## 8.9 ECMAScript 5 JSON 객체
JSON 객의 메서드.
JSON.stringify() -> 자바스크립트 객체를 JSON 문자열로 반환
JSON.parse() -> JSON문자열을 자바 스크립트 객체로 변환

    <script>
      var object = {
        name : '윤인성',
        region: '서울 특별시'
      }

      //출력
      alert(JSON.stringify(object));
    </script>

     결과는 {"name":'윤인성', "region":'서울특별시'}

     <script>
     var object = {
       name : '윤인성',
       region: '서울 특별시'
     }

     var copy = JSON.parse(JSON.stringify(object));

     alert(copy.name + ' : ' + copy.region);
     </script>


## 8.10 ECMAScript 5 String 객체

  trim -> 문자열 양쪽 끝의 공백을 제거.

## 8.11 ECMAScript 5 Object 객체

(생략)
