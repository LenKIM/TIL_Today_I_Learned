# Chapter 20 XMLHttpRequest
XMLHttpRequest는 자바스크립트가 Ajax를 사용할 때 사용하는 객체.
간단하게 xhr이라고 부릅니다.

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>XMLHttpRequest</title>
      </head>
      <body>
        <script>
          var request = new XMLHttpRequest();

        </script>
      </body>
    </html>

## 20.1 XMLHttpRequest 객체
XMLHttpRequest()객체는 빈 편지지와 같습니다. 이 빈 편지지에는 수취인과 배송방식, 내용물을 넣을 수 있습니다. XMLHttpRequest객체의 open()메서드는 편지지의 전송 위치와 방식을 지정합니다. open()메서드 형태는 다음과 같습니다.

>request.open(전송 방식, 경로, 비동기 사용 여부)

open() 첫번째 매개변수는 GET이나 POST 같은 전송 방식을 입력하고,
두 번째 매개변수에는 요청을 수행할 위치를 지정합니다.
세 번쨰 매개변수는 비동기 사용여부.

    <script>
      var request = new XMLHttpRequest();
      request.open('GET', '/data.html', false);

      //Ajax를 수행
      request.send();

      //출력
      alert(request.responseText);
    </script>

>동적요소생성

    <script>
      var request = new XMLHttpRequest();
      request.open('GET', '/data.html', false);

      //Ajax를 수행
      request.send();

      //출력
      // alert(request.responseText);
      document.body.innerHTML += request.responseText;
    </script>
## 20.2 생성

 XMLHttpRequest 객체의 표준이 정의되기전에 만들어진 브라우저

    <script>
        //XMLHttpRequest 객체를 생성하는 함수
        function createRequest() {

        }

        //XMLHttpRequest 객체를 생성합니다.
        var request = new XMLHttpRequest();
        request.open('GET', '/data.html', false);

        //Ajax를 수행합니다.
        request.send();

        //출력합니다.
        document.body.innerHTML += request.responseText;
    </script>

createRequest()함수는 요청 객체를 만들어서 리턴하는 역할을 하게 됩니다. 하지만, 인터넷 익스플로러6이하에서는 XMLHttpRequest객체가 없으므로 예외가 발생하겠죠?

    //XMLHttpRequest 객체를 생성하는 함수
    function createRequest() {
      var request;

      try {
        request = new XMLHttpRequest();
      } catch(exception) {
        try{
          request = new ActiveXObject('Msxm12.XMLHTTP');
        }catch(innerException) {
          request = new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
      return request;
    }

## 20.3 동기 방식과 비동기 방식

 동기 방식은 데이터를 서버와 클라이언트가 같은 속도로 연계하여 동작하는 방식을 의미합니다.
 반대로 비동기는 같은 소도로 연계하는게 아님.

 >동기 방식일 때 send()메서드에 소비되는 시간 측정

     //XMLHttpRequest() 객체를 생성
     var request = createRequest();
     request.open('GET', '/data.html', false);

     //send()메서드에 소비되는 시간 측정
     var prevDate = new Date();
     request.send();
     var nowDate = new Date();

     //출력
     alert(nowDate = prevDate);

3밀리초에서 10밀리초 안팎으로 아주 적은 시간이 걸림,

그러나
>request.open('GET', '/data.html', false);
이부분을 true로 변경하고 실행하면 0밀리 초에서 1밀리 초이상 걸리지 않습니다.

자바스크립트는 데이터를 배달된 것을 onreadystatechange 이벤트로 알수 있습니다. 이벤트에 이벤트 리스너를 연결합니다.

    //XMLHttpRequest 객체를 생성
    var request = createRequest();
    request.onreadystatechange = function(event) {
      //출력
      alert(request.readyState);
    };
    request.open('GET', '/data.html', true);
    request.send();



## 20.4 데이터 요청과 조작

데이터를 요청하고 조작하는 방법!
 **20.4.1 JSON 요청과 조작**
  Ajax로 JSON을 가져와 다루는 방법은 지금까지 배운 XMLHttpRequest객체로 Ajax 요청을 수행하고 응답받은 JSON을 자바 스크립트 객체로 변환하면 됩니다.

    request.onreadystatechange = function(event) {
      if(request.readyState == 4) {
        if(request.status == 200) {
          var json = eval('(' + request.responseText + ')');
        };
      };
    };

  XMLHttpRequest객체의 responseText속성을 eval()함수의 매개변수에 직접 넣지 않고, 괄호로 감싸 넣음. 배열형태의 JSON을 eval()함수의 매개변수로 넣을 떄 가끔 발생하는 문제를 막기 위함.

      request.onreadystatechange = function(event) {
        if(request.readyState == 4) {
          if(request.status == 200) {
            //데이터를 가공합니다.
            var json = eval('(' + request.responseText + ')');
            var output = '';

            for(var i = 0; i < json.length; i++) {
              for(var key in json[i]) {
                output += '<h1>' + i + ':' + json[i][key] + '</h1>';
              }
            }

            //출력합니다.
            document.body.innerHTML += output;
          };
        };
      };
      request.open('GET', '/data.json', true);
      request.send();
  **20.4.2 XML 요청과 조작**
문서 객체 모델 부분을 기억하면서 XML을 조작하기.
>DOM속성

속성 | 설명
--- | ----
nodeValue | 문서 객체의 내부 글자
attributes | 문서 객체의 속성

>DOM 메서드

메서드 | 설명
--- | ----
getElementById | id 속성이 일치하는 문서 객체를 선택합니다.
getElementByTagName(name) | 태그 이름이 일치하는 문서 객체를 선택합니다.

>getElementByTagName() 메서드로 XML문서에서 person태그를 가져옵니다. Elements를 가져오는 메서드이므로 문서 객체를 배열 형태로 가져옵니다.

if(request.status == 200) {
  //declear var
  var xml = request.responseXML;

  //데이터를 가공
  var names = xml.getElementByTagName('name');
  var prices = xml.getElementByTagName('price');
  for(var i = 0; i < names.length; i++){

    var name = names[i].childNodes[0].nodeValue;
    var price = prices[i].childNodes[0].nodeValue;

    document.body.innerHTML += '<h1>' + name + '<h1>';
    document.body.innerHTML += '<h2>' + price + '<h2>';
  }
}

## 20.5 데이터 요청 방식

<!-- 이번에는 GET, POST, PUT, DELETE 요청 방식으로 요청하는 방법 -->
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>XMLHttpRequest</title>
        <script>
        //Xㅢ
        function createRequest() {
            try {
              return new XMLHttpRequest();
            } catch (exception) {
              var versions = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP.5.0',
                'Msxml2.XMLHTTP.4.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHttp'
              ];
              for (var i = 0; i < versions.length; i++) {
                try{
                return new ActiveXObject(versions[i]);
              }catch (e) { }
            }
          }
        }
      </script>
      <script>
            window.onload = function() {
              document.getElementById('get').onclick = function() {
               //Ajax를 수행합니다.
             var request = createRequest();
           request.open('GET', '/products', false);
           request.send();

            document.getElementById('output').value = request.responseText;
          };
          // GET 요청 매개변수 request.open('GET', '/parameter?name=name&region=seoul', false)
          // GET 캐싱 해결 방법
          // var request = createRequest;
          // request.open('GET','/products?dummy='+ new Date().getTime(), false);
          // request.send();
              document.getElementById('post').onclick = function() {
              //변수 선언
              var name = document.getElementById('name').value;
              var price = document.getElementById('price').value;

              //Ajax를 수행합니다.
              var request = createRequest();
              request.open('POST', '/products', false);
              request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              request.send('name=' + name + '&price=' + price);
              //출력
              document.getElementById('output').value = request.responseText;
             };
              document.getElementById('put').onclick = function() {
              //변수 선언
              var name = document.getElementById('name').value;
              var price = document.getElementById('price').value;

              //Ajax 수행
              var request = createRequest();
              request.open('PUT', '/products/0', false);
              request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              request.send('name=' + name + '&price=' + price);
              document.getElementById('output').value = request.responseText;

             };
              document.getElementById('delete').onclick = function() {
                //Ajax를 수행합니다.
                var request = createRequest();
                request.open('DELETE', '/products/0', false);
                request.send();

                document.getElementById('output').value = request.responseText;
              };
            };
      </script>
      </head>
      <body>
          <button id="get">GET</button>
          <button id="post">POST</button>
          <button id="put">PUT</button>
          <button id="delete">DELETE</button>
          <h1>input</h1>
          <input id = "name" />
          <input id = 'price' />
          <h1>output</h1>
          <textarea id = "output" disabled="disabled" cols= "40" rows = "5"></textarea>
      </body>
    </html>
