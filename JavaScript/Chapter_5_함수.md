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
  
## 5.8 콜백 함수
## 5.9 함수를 리턴 하는 함수
## 5.10 클로저
## 5.11 자바스크립트 내장 함수
