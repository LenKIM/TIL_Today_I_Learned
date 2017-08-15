# Chapter 4 반복문

    <script>
      for(var i = 0; i < 100; i++) {
        alert('출력');
      }

## 4.1 배열
  배열선언?

    <script>
     //변수를 선언합니다.
     var array = [273, 32, 103, 57, 52];
    </script>
배열안에 입력된 값을 배열요소라 부름
와우.. 자바스크립트는 어떠한 종류의 자료형도 배열요소가 될수있음!!

    <script>
     //변수를 선언합니다.
     var array = [273, 'String', true, function(){},{},[273, 103], 52];

       //출력
       alert(array);
    </script>

    결과는 그대로나옴!!!
    273, 'String', true, function(){},{},273, 103, 52

length는 자바와 동일

push함수는 배열에 추가하는 함수.
push(2);
push(3);

꺼낼때는 a[0], a[1], a[2] 이런식으로...

## 4.2 while 반복문
    while(불 표현식) {
      문장
    }


## 4.3 do while 반복문
    do {
      문장
    } while(불 표현식)
 일단 한번 실행해보고 조건 판단.
## 4.4 for 반복문
    for(초기식; 조건식; 종결실) {
      문장
    }

**1초 동안 반복문이 몃 회 반복되는지 표시하는 프로그램.**
for문의 특이한 사용!

     <script>
      //변수를 선언
      var startTime = new Date().getTime();

      //반복문
      for(var CPS = 0;
        new Date().getTime() < startTime + 1000; CPS++){}
        alert('초 당 연산 횟수: ' + CPS);
      </script>


## 4.5 for in 반복문

 자바에서 강화된 For문이랑 같은 기능.

    for(타입 별명 : 배열){

     }

    for(var i in array){

    }

## 4.6 중첩 반복문
패스.

## 4.7 break 키워드
 switch조건문이나 반복문을 벗어날 때 사용하는 키워드
 자바와 동일
## 4.8 continue 키워드
 반복문내에서 현재 반복을 멈추고 다음 반복을 진행시키는 키워드

**break랑 continue의 다른 점은(자바동일) 브레이크를 만나면 그 안에서 아예 나오는반면, continue는 밖으로 나오는것이 아니라, 다음 반복으로 넘어가는 것으로, continue아래의 코드는 실행되지 않는다.**
