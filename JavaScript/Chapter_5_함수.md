# Chapter 5 함수
  자바 스크립트에서 함수는 prompt(), confirm(), alert() 등등등
## 5.1 익명 함수
 var 함수 = function(){ };

    <script>
     //변수를 생성합니다.
      var 함수 = function () {
        var output = prompt('숫자를 입력해주세요.', '숫자');
        alert(output);
      };

      //출력합니다.
      alert(함수);
    </script>
 이렇게 하면 경고창으로 함수에 해당하는 내용이 경고창으로 발생하는데, 왜 여기서 익명함수라고 부르는거지? 아, function 뒤에 어떠한 이름도 없어서!

  그리고 alert, prompt와 같은 함수들의 내부는 볼수 없게 막음.
 이러한 함수를 선언적 함수라고 함

     <script>
      //변수를 생성합니다.
       var 함수 = function () {
         var output = prompt('숫자를 입력해주세요.', '숫자');
         alert(output);
       };

       //함수를 호출합니다.
       함수();
     </script>
  **여기서 함수를 호출하는 방법을 나타내는데, 호출할 때는 저렇게저렇게!**

## 5.2 선언적 함수
이 방식이 일반적인 함수 선언 방식임.

    function 함수(){ }
      선언적 함수의 재정의
      <script>
        function 함수() {alert('함수 A'); }
        함수();
      </script>

이렇게하면 경고창으로 함수 a가 뜸!!
선언적 함수와 익명 함수의 순서 주의하기!!

## 5.3 매개 변수와 리턴값
     function 함수이름(매개변수, 매개변수, 매개변수){
       //함수코드
       return 리턴값;
     }

 **자바와는 다르게, 리턴값의 타입을 지정해줄 필요가 없다...**

## 5.4 매개 변수
  자바스크립트는 함수를 생성할 떄 지정한 매개변수보다 많거나 적은 매개변수를 사용하는 것을 허용한다. 그러나 필요한 매개변수들보다 많게 입력하면, 추가된 매개변수를 무시 그 반대도 무시

  alert("하하하", "하하2");
  출력은 하하하만 나옴.

 Array() / Array(number) / Array(any, any, any,...)
 any는 어떠한 자료형이든 상관없다는 뜻.

## 5.5 가변 인자 함수
 가변인자함수란? 바로 위에서 Array()같은 함수를 말한다!!!!!

    <script>
    function sunAll(){
      alert(typeof(arguments) + ' : ' + arguments.length);
    }

    //함수호출
    sumAll(1,2,3,4,5,6,7,8,9);
    </script>

한번 더 해보면

    <script>
    function sunAll(){
      var output = 0;
      for(var i = 0; i < arguments.length; i++){
        output += arguments[i];
      }
      return output;
    }

    //함수호출
    alert(sumAll(1,2,3,4,5,6,7,8,9));
    </script>

    이렇게 하면 45가 나옴,

## 5.6 리턴값
  return키워드는 함수가 실행되는 도중에 함수를 호출한 곳으로 돌아가라는 의미.

    <script>
      //함수를 생성
      function returnFunction(){
        return;
        alert('문장 A');
        alert('문장 B');
      }

      //함수 호출
      var output = returnFunction();
      alert(typeof(output) + ' : ' + output);
    </script>

**이렇게하면 리턴되는것이 하나도없어서 undefined : undefined이런식으로 나온다!**
## 5.7 내부 함수

  프로그램 개발은 혼자하는 일이 아니라서 프로그램의 규모가 커지면 커질수록 다른 사람과 함께 프로그램을 개발하며 여러가지 충돌이 발생함, 이러한 충돌을 막는것이 내부 함수

    function 외부함수(){
      function 내부함수1(){
      //내부함수
      }

      function 내부함수2(){
      //내부함수
      }

      //함수 코드
    }

ex) 피타고라스 공식을 한다면??

    <script>
      function pythagoras(width, height) {
        return Math.sqrt(width * width + height + height);
      }
    </script>

    여기서 숫자를 제곱하는 부분을 별도의 함수 square()로 만들어보쟈

    <script>

      //제곱을 구하는 함수
      function square(X){
        return x * x;
      }
      //피타고라스 함수
      function pythagoras(width, height) {
        return Math.sqrt(square(width) + square(height));
      }
    </script>


정리하면, 자바스크립트에서는 함수명의 충돌을 내부함수로 다뤄주는것인가?
자바에서는 인터페이스를 작성해놓고 작업하는데 반해서?

 NOTE. 자기호출함수.

    <script>
      (function() {
        //코드
        //코드
        //코드
        })();
    </script>
    이런 방식으로는 부르자마자 바로 호출하는데, 이는 왜그러냐?
    다른 개발자에게 영향을 주지 않게 하기 위해서.

## 5.8 콜백 함수
자바스크립트에서는 함수도 하나의 자료형으므로 매개변수로 전달할 수 있습니다.
이렇게 매개변수로 전달하는 함수를 콜백 함수라고 부릅니다.

    <script>
      //함수를 선언합니다.
      function callTenTimes(callback) {
        //10회 반복합니다.
        for(var i = 0; i < 10; i++){
          //매개변수로 전달된 함수를 호출합니다.
          callback();
        }
      }

      //변수를 선언합니다.
      var callback = function(){
        alert('함수 호출');
      };

      //함수를 호출합니다.
      callTenTimes(callback);
      </script>

    콜백함수는 익명함수로 사용되는 경우가 많다.
    <script>
      //함수를 선언합니다.
      function callTenTimes(callback) {
        //10회 반복합니다.
        for(var i = 0; i < 10; i++){
          //매개변수로 전달된 함수를 호출합니다.
          callback();
        }
      }

      //함수를 호출합니다.
      callTenTimes(function() {
        alert('함수 호출')
        });
      </script>

## 5.9 함수를 리턴 하는 함수
 제목 그대로 함수를 리턴해주는 함수!
 예제를 살펴보면

     <script>
     //함수를 생성합니다.
     function returnFunction() {
       return function () {
         alert('Hello Function .. !');
       };
     }

     //함수를 호출합니다.
     returnFunction()();
    </script>

자바와는 완전 다르게, 괄호를 두번을 써서 함수에 함수라니..
이건 신세계야!!!!

왜 이런 리턴되는 함수를 쓰는가에 대한 답은 바로 클로저(closure)때문에!

## 5.10 클로저
     <script>
      //함수를 선언합니다.
      function test(name) {
        var output = 'Hello ' + name + " .. !";
      }

      //출력합니다.
      alert(output);
    </script>

코드에 오류가 있음! 그건 함수를 사용한게 아님.
그러한 규칙을 클로저를 사용하여 위반할 수 있습니다.

    <script>
     //함수를 선언합니다.
     function test(name) {
       var output = 'Hello ' + name + " .. !";
       return function() {
         alert(output);
       };
     }

     //출력합니다.
     test('JavaScript');
    </script>

  딱 클로저의 정의를 표현하기에는 많은 내용이 있다.

이렇게 지역변수를 남겨두는 현상을 클로저라 부르기도하고,
함수 test()내부의 변수들이 살아있는 것이므로 test()함수로 생성된 곤강을 클로저라고 부르기도 하고, 살아 남은 지역변수 output을 클로저라고도 하고.

    <script>
      //함수를 선언
      function test(name) {
        var output = 'Hello ' + name + ' .. !';
        return function(){
          alert(output);
        };
      }
    </script>
  //변수를 선언
  var test_1 = test('Web');
  var test_2 = test('JavaScript');

  //함수를 호출합니다.
  test_1();
  test_2();

## 5.11 자바스크립트 내장 함수
  자바스크립트에는 자체적으로 제공하는 함수 제공.
  이렇게 기본적으로 내장된 함수를 내장함수.

  *5.11.1 타이머 함수.*
  :특정한 시간에 특정한 함수를 실행하게 만들어 주는 함수.

  **setTimeout(function, millisecond)**
  일정 시간 후 함수를 한 번 실행합니다.

  **setInterval(function, millisecond)**
  일정 시간마다 함수를 반복해서 실행합니다.

  **clearTimeOut(id)**
  일정 시간 후 함수를 한 번 실행하는 것을 중지합니다.

  **clearInterval(id)**
  일정 시간마다 함수를 반복하는 것을 중단합니다.

     <script>
      //1초마다 함수를 실행합니다.
      var intervalID = setInterval(function() {
          alert('<p>' + new Date() + '</p>')
        }, 1000);

        //10초 후 함수를 실행합니다.
        setTimeout(function () {
          //타이머를 종료합니다.
          clearInterval(intervalID);
          }, 10000);
    </script>

  Ex)

    <Script>
      setTimeout(function() {
        alert('Set Timeout');
        }, 0);

        while(true) {}
    </Script>

  이걸 실행하면, 경고창이 발생하지않음, 이유는 아래 while문의 일 끝나지 않기 때문에 경고창을 보여주지않음.


자바스크릅트의 실행 순서와 관련.

    <Script>
      for(var i = 0; i < 3; i++){
        setTimeout(function () {
          alert(i);
          }, 0);
      }
    </Script>

이렇게 하면 1,2,3이 나올거라 예상했지만 3,3,3이 나온다.
이유는 setTimeout()함수를 호출하는 시점이 반복문이 모두 끝난 이후이므로 발생하는 문제이다. 그러면 이러한 문제점을 클로저를 활용해서 해결해보자.

     <script>
      for(var i = 0; i < 3; i++) {
        (function (closed_i) {
          setTimeout(function () {
            alert(closed_i);
            }, 0);
          })(i);
      }
      </script>

  이렇게 하면 반복문을 도는 동안 클로저가 생성되어 변수 closed_i에 값을 저장.

  또는 forEach()메소드

    <script>
      [0, 1, 2].forEach(function (i){
        setTimeout(function () {
          alert(i);
          }, 0);
        });
    </script>

*5.11.2 인코딩과 디코드 함수..*

인코딩은 문자를 컴퓨터에 저장하거나 통신에 사용할 목적으로 부호화하는 방법.
웹에서는 통신할때 한글같은 유니코드문자가 오작동을 일으킬수있으므로 인코딩.

 **escape()**
 적절한 정도로 인코딩합니다.
 - 영문알파벳과 숫자, 일부 특수 문자를 제외하고 모두 인코딩
 - 1바이트문자는 %XX형태로, 2바이트 문자는 %uXXXX형태로

 **unescape()**
 적절한 정도로 디코딩합니다.

 **encodeURI(url)**
 최소한의 문자만 인코딩합니다.
 escape()함수에서 인터넷 주소에 사용되는 일부 특수 문자는 변환 x
(:, ;, /, =, ?, &)
 **decodeURI(encodeURI)**
 최소한의 문자만 디코딩합니다.

 **encodeURIComponent(uriComponent)**
 대부분의 문자를 모두 인코딩합니다.
 알바벳과 숫자를 제외한 모든 문자를 인코딩함.
 UTF-8 인코딩과 같습니다.

 **decodeURIComponent(encodeURIComponent)**
 대부분의 문자를 모두 디코딩합니다.

    <script>
      //인코딩할 URL을 만듭니다.
      var URI = 'http://hanb.co.kr?test=한글입니다.';

      //출력할 문자열을 만듭니다.
      var output = "";
      output += '*escape()\n'
      output += escape(URI) + '\n\n';
      output += '*encodeURI()\n'
      output += '*encodeURI(URI)\n'
      output += '*encodeURIComponent()\n'
      output += '*encodeURIComponent(URI)\n'
    </script>

그러나 여기서 가장 많이 사용되는건 encodeURIComponent!

*5.11.3 코드 실행 함수..*
문자열을 코드로 실행할 수 있는 특별한 함수.

eval(string) -> string을 자바스크립트 코드로 실행
문자열을 자바스크립트 코드로 실행하는 함수.

    <script>
      //문자열을 생성합니다.
      var willEval = '';
      willEval += 'var number = 10;';
      willEval += 'alert(number);';

      //eval()함수를 호출합니다.
      eval(willEval);

      //eval() 함수로 호출한 코드의 변수를 사용하빈다.
      alert(number);
    </script>

*5.11.4 숫자 확인 함수..*

isFinite() number가 무한한 값인지 확인합니다.
isNaN() number가 NaN인지 확인합니다.

뿐만 아니라 Infinity 변수도 존재함.

위 두개가 불 자료형을 반환함.

*5.11.5 숫자 변환 함수..*
parseInt(String) string을 정수로 변환
parseFloat(string) string을 유리수

 사용예제,
 var won = '1000원'; var dollar = '1.5$';
 alert(Number(won) + ' : ' + Number(dollar));
 이렇게하면 NaN : NaN으로 나타남

 그러나 위 paresInt를 사용하면 1000 / 1.5만 나타나게 할수있다.
 그러므로 정리하면... 숫자만 쓰윽?

 parseInt('FF', 16) 255
 parseInt('52', 10) 52
 parseInt('11', 8) 9

 parseFloat('52.273e5') -> 5227300
이런식으로 보여줌.
