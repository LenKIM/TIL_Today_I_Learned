# Chapter 3 조건문

## 3.1 if 조건문
    if(불 표현식){
      문장
    }

시간을 사용한 조건분기

    <script>
      //변수를 선언합니다.
      var date = new Date();
      var hour = date.getHours();

      //조건문
      if(hour < 12) {
        //"hour < 12"가 참일때 실행됩니다.
        alert('오전입니다.');
      }

      if(hour >= 12) {
        //"hour >= 12 "가 참일때 실행됩니다.
        alert('오후입니다.');
      }
    </script>

아.... 자바스크립트에서 date는 저렇게 선언해서 필요한 클래스의 메소드를 가져오는구나.

자바에 비해서 굉장히 단순하네!

## 3.2 if else 조건문

if(불 표현식){
문장 A
} else {
문장 B
}

    <script>
      //변수를 선언합니다.
      var date = new Date();
      var hour = date.getHours();

      //조건문
      if(hour < 12) {
        //"hour < 12"가 참일때 실행됩니다.
        alert('오전입니다.');
      } else {
        //"hour >= 12 "가 참일때 실행됩니다.
        alert('오후입니다.');
      }
    </script>

## 3.3 중첩 조건문
    if(불 표현식) {
      if(불 표현식){
        문장 A
      } else {
        문장 B
      }
    } else {
      if(불 표현식){
      문장 A
      } else {
      문장 B
      }
    }

## 3.4 if else if 조건문
   자바와 동일하여 생략 : )
## 3.5 switch 조건문
  자바와 동일하여 생략 : )
## 3.6 삼항 연산자
  (불 표현식)?(참일 떄 실행하는 문장):(거짓일 때 실행하는 문장)

    <script>
    //변수를 선언
    var input = prompt('숫자를 입력해주세요.',"");
    var number = Number(input);

    //조건문
    (number > 0) ? alert('자연수입니다.') : alert('자연수가 아닙니다.');
    </script>

## 3.7 짧은 조건문
  논리 연산자의 특성을 조건문으로 사용합니다.
  다음 논리합 연산자를 사용한 표현식은 뒤에 어떠한 값이 들어가도 항상 참
  **true || ooo**

  이렇게 되면 뒤에 ooo부분을 실행하지않음!!
  신기하네... true면 추가연산을 안한다니..

      <script>
      true || alert('실행될까요..A');
      false || alert('실행될까요..B');
      </script>

      결과는 2번째꺼만 실행됨!
  이걸 어디에 쓰는거지?

    (불 표현식) || (불 표현식이 **거짓**일 때 실행할 문장)

  이번에는 논리곱 연산자를 이용한 짧은 조건문

  **false && ooo**
  (불 표현식) && (불 표현식이 **참**일 때 실행할 문장)

    <script>
      //변수를 선언
      var input = Number(prompt('숫자를 입력해주세요.', '숫자'));

      //조건문
      input % 2 == 0 || alert('홀수임');
      input % 2 == 0 && alert('짝수임');
    </script>    
