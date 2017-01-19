# Chapter 2 기본 문법
## 2.1 기본 용어

1. 표현식과 문장은?
  표현식?
  var rintiantta = 'Rint' + 'Ian' + 'Tta'
  alert('Hello JavScript..!!');
  273;

2. 키워드?
3. 식별자?
    - 숫자로 시작x
    - 특수 문자는 _과 $만 허용
    - 공백문자는 포함할수 없음

 주요!코딩큐칙
*1. 생성자 함수의 이름은 항상 대문자로 시작합니다.*
*2. 변수와 인스턴스, 함수, 메소드의 이름은 항상 소문자로 시작합니다.*
*3.여러 단어로 이루어진 식별자는 각 단어의 첫 글자를 대문자로 합니다.*

4. 주석은  HTML주석  "<!-- --'>"


## 2.2 출력
    기본 HTML 페이지 구성

     <!DOCTYPE html>
     <html>
     <head>
          <script>

          </script>
      </head>
      <body>
      </body>
      </html>



 ## 2.3 문자열

 **기본적인 출력은 alert()함수 사용**
 오호...

  문자열은 + 로 연결함.
  ex) '가나다'+'라'+'마바' = '가나다라마바'

## 2.4 숫자
 자바와는 다르게 정수와 유리수의 구분이 없음..
 그냥 넣으면됨.
 연산자 우선순위는 역시나 자바와 동일.

## 2.5 불
 자바의 불리언을 말하는거였음.. 참과 거짓을 갖는 것
 alert(조건식) 이렇게 쓰면
 결과로 true or false를 경고창으로 알려줌.

## 2.6 변수
변수의 값을 저장할 때 사용하는 식별자 : )
How to use?
1. 변수를 선언하고
2. 변수에 값을 할당

  **var 식별자**

    <script>
      //변수 선언
      var pi;
      pi = 3.14159265;

      alert(pi);

      var pi, radius
      radius = 10;
      pi = 3.1415;

      var pi = 10, var radius = 10;
    </script>

**자바스크립트의 자료형**

    <script>
      var stringVar = 'String';
      var numberVar = 273;
      var booleanVar = true;
      var functionVar = function (){};
      var objectVar = {};
        그리고 마지막으로는 undefined자료형
    </script>

 복합대입연산자
 증감연산자
 자바와동일.

## 2.7 자료형 검사
  **typeof 연산자**

    <script>
      alert(typeof ('String'));
      alert(typeof (273));
    </script>

    결과는 경고창에 String 과 number나옴.

## 2.8 undefined 자료형
 자바스크립트는 '존재하지 않는 것'은 undefined자료형으로 표현한다.

     <script>
      //undefined 자료형
      alert(typeof (variable));
     </script>


## 2.9 입력
 입력은 prompt()

    <script>
    //변수를 선언합니다.
    var input = prompt('Message', 'DefStr');

    //출력
    alert(input);
    </script>

    사용자에게 입력을 요구하는 입력의 창
    ![prompt](https://mdn.mozillademos.org/files/11303/prompt.png)


확인 창 띄울땐, confirm();

    <script>
    //변수를 선언합니다.
    var input = confirm('수락하시겠습니까?');

    //출력
    alert(input);
    </script>

확인버튼 누르면 true반환함.

## 2.10 숫자와 문자열 자료형 변환

    <script>
    //1번
    alert('52 + 273');

    //2번
    alert(52 + 273);

    //3번
    alert('52' + 273);

    //4번
    alert(52 + '273');

    //5번
    alert('52' + '273');

    1번 빼고 다 문자열로 출력함
    </script>

**자동으로 변환되는 것 말고 강제로 자료형을 변환하는 방법은?**
Number() 함수 이용

<script>
 //변수 선언
 var input = prompt('숫자를 입력해주세요', '숫자');
 var numberInput = Number(input);

 //출력합니다.
 alert(typeof (numberInput) + ': ' + numberInput);
</script>

 결과는 numbers:52273

 NaN -> 숫자로 표현 불가능

## 2.11 불 자료형 변환
 숫자와 문자열 자료형이 변환되는 것과 마찬가지로 다른 자료형을 불 자료형으로 변환
 Number(), String() 와같이 불자료형은 Boolean()함수 이용

 boolean()는 조금 특별한듯,
 문자열 '0', 'false'는 alert하면 true로 반환

     !! 이런식으로 불 자료형 변환가능...?
    <script>
     alert(!!0); -> true
     alert(!!NaN); -> true
     alert(!!''); -> true
     alert(!!null); -> true
     alert(!!undefined); -> true
    </script>
## 2.12 일치 연산자

  비교연산자의 사용

    <script>
       alert('' == false); -> true
       alert('' == 0); -> true
       alert(0 == false); -> true
       alert('273' == 273); -> true
    </script>
    왜 다 true일까? 이유는 자동으로 자료형 변환이 되어 일어나는 현상
   이상함, 유연성이 떨어짐 그러므로 ===, !== 사용함
   양변의 자료형과 값이 일치하는가 일치 하지않는가?

    <script>
       alert('' === false); -> false
       alert('' === 0); -> false
       alert(0 === false); -> false
       alert('273' === 273); -> false
    </script>
    왜 다 true일까? 이유는 자동으로 자료형 변환이 되어 일어나는 현상
