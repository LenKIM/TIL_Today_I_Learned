
## 반응형 프로그래밍과 RxJS 이해하기

큰 규모의 비동기 어플리케이션을 작성하는 것은 쉬운 일이 아니다. 모두 콜백 헬 이슈를 한 번 쯤은 겪어보았을 것이다. 이런 걱정이 점점 커지면서, 사람들은 스스로 비동기적 JavaScript 세계를 개선했다. 모두 Promise, Generator나 async/await에 대해서 들어보았을 것이다. 또 다른 솔루션이 있다. 바로 RxJS다.

RxJS의 GitHub README에는, RxJS는 “Observable 시퀀스와 표현력있는 쿼리 연산자를 사용하는 비동기적, 이벤트 기반의 프로그램을 구성하기 위한 라이브러리의 집합”이라고 정의되어있다. 이것은 이벤트나 데이터로부터 스트림을 만들 수 있다는 것을 뜻한다. 이 데이터를 가지고 병합(Merge)하거나, 으깨(Mash)거나, 쪼개(Split)는 등의 작업을 할 수 있다. 원하는 데이터가 있으면, 데이터를 순회하면서 무언가를 할 수 있다.


"Observable" 이나 "스트림"의 개념은 처음에 이해하기가 어려울 수도 있다. 나는 그것들을 한 번에 한 가지만 사용하는 단일 이벤트 혹은 데이터라고 생각하기 보다는, 어떤 기간동안 다루게 되는 이벤트나 데이터의 컬렉션이라고 생각한다.

RxJS가 어떻게 동작하는지 보기 위해서, 간단한 날씨 어플리케이션을 작성하게 될 것이다. 우편번호를 입력하기 위한 텍스트 input이 있을 것이고, 버튼을 클릭해서 Submit하면 우편번호 위치와 현재 온도 데이터를 얻기 위한 요청이 전송 될것이다. 온도를 얻고나면, 우편번호와 온도를 함께 페이지를 표시할 것이다. 또한 페이지에 많은 온도를 넣어 계속 Watch하도록 만들 것이다. 그리고 지정한 시간 후에 온도를 새로고침하는 타이머를 만들게 될 것이다.

 ```html

 <html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Weather Monitoring in RxJS</title>
  <style>
  #form {
    margin-bottom: 20px;
  }
  .location {
    float: left;
    padding: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .location p {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
  .zip { font-size: 2em; }
  .temp { font-size: 4em; }
  </style>
</head>
<body>
  <div id="app-container">
    <div id="form">
      <label>Zip Code:</label>
      <input type="text" id="zipcode-input">
      <button id="add-location">Add Location</button>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/4.1.0/rx.all.min.js"></script>
  <script>
  // our code will go here
  console.log('RxJS included?', !!Rx);
  </script>
</body>
</html>

 ```

 이 파일을 선호하는 브라우저에서 열고, 개발자 콘솔창을 열고 확인해보자.

 `RxJS included? true`

 그렇다면 이제 반응형 JavaScript를 작성할 준비가 끝난 것이다! 우편번호를 넣는   <input>과 <button>을 포함하는 간단한 "form"이 있다는 것을 확인하라. 첫 번째 JavaScript코드는 이 element들의 이벤트로부터 스트림을 만드는 게 될 것이다. 또한 나중에 element들을 추가할 수 있도록 app-container의 참조도 얻을 것이다.


 ```JavaScript
 const btnClickStream =
       Rx.Observable
           .fromEvent(addLocationBtn, 'click')
           .map(() => true)
           .forEach(val => console.log('btnClickStream val', val))
 ```

 `Rx.Observable`객체의 `fromEvent`메소드를 사용하여 `addLocationBtn`으로부터 발생하는 클릭 이벤트로부터 스트림을 만들었다. 이것은 언제든 버튼이 클릭될 때마다, 이벤트 객체가  `btnClickStream`으로 전송된다는 것을 의미한다. 반환된 스트림의 각 값을 `true`로 매핑하기 위해서 `map`메소드를 사용했다. 나는 내 머릿속에 있는 로직을 단순화하는 것을 좋아한다. 이벤트가 일어났는지만 확인되면 되기 때문에 값을 간단한 boolean값으로 매핑했다. 이것은 그냥 내가 좋아하는 방식이다. 만약 당신의 취향과 맞지 않는다면 지워져도 상관없는 코드이다. 마지막으로, 이벤트가 동작하는지 확인하기 위해서 스트림의 구독자(subscriber)를 추가하는 `forEach`를 사용한다. 이것이 간단하게 값을 (logging)하는 코드다.

페이지를 새로고침하고, 버튼을 몃번 클릭해보면 개발자 콘솔에 출력결과가 보일 것이다. 정상적으로 동작한다!
이제 버튼 스트림에서 forEach를 제거하자. 필요하지 않은 코드다. 이제 우편번호를 얻을 차례다. 우편번호 input에 입력된 문자열의 길이가 5일 때만 이벤트를 수신하고 싶다.

```javascript
//Get stream of zip codes
const zipInputStream =
  Rx.Observable
  .fromEvent(zipcodeInput, 'input')
  .map(e => e.tartget.value)
  .filter(zip => zip.length === 5)
  .forEach(val => console.log('zipInputStream val', val))
```

input요소로부터 발생한 이벤트로 스트림을 만들었다. input이벤트로부터 값을 추출하기 위해서 map을 사용한다. 그리고 문자열의 길이가 5가 아닌 값들을 제거하기 위해서 filter를 사용한다. filter는 지정된 조건식이 true를 반환하는 경우 해당 값을 반환되는 스트림에 포함시킨다. 마지막으로, 다시 각 값을 순회하면서 콘솔에 로그를 남긴다.

 `btnClickStream`의 `withLatestFrom`을 호출하여 `zipInputStream`을 넘겼다. 이것은 `btnClickStream`의 가장 최근 
