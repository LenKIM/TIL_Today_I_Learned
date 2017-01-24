# Chapter 9 브라우저 객체 모델

  브라우저 객체 모델은 웹 브라우저와 관련된 객체의 집합을 의미합니다.
  대표적인 브라우저 객체 모델은

  window 객체 안에
  location / navigator / history / screen / document객체가 있음

  이를 통합해서 문서 객체 모델(DOM)이라 통합해서 부르기도 함

## 9.1 window 객체
너무많은 속성과 메서드가 있다.

  ![enter image description here](http://appletree.or.kr/blog/images/html_elements_coordinates.png)

## 9.2 새로운 window 객체 생성
  open(URL, name, feature, replace)
  새로운 window 객체를 생성합니다.

  매개변수는 모두 옵션
  window.open하면 그냥 원도가 새로 만들어지는 것.

  이렇게 쓰인다.

    <script>
      window.open('http://hanb.co.kr', 'child', 'width=600, height = 300', true);
    </script>

var child = window.open('', '', 'width=600, height = 300');

child.document.write('\<h1>FROM Parent Window</h1>')

## 9.3 window 객체의 기본 메서드

moveBy(x,y)
moveTy(x,y)
resizeBy(x,y)
resizeTo(x,y)
scrollBy(x,y)
scrollTo(x,y)
focus()
blur()
close()

## 9.4 screen 객체

 웹 브라우저의 화면이 아니라 운영체제의 화면의 속성을 가지는 객체.

 <script>
  var output = '';
  for(var key in screen) {
    output += '0' + key + ': ' + screen[key] + '\n';
  }
  alert(output);
</script>

width 화면 너비
height 화면높이
availWidth 실제 화면에서 사용 가능한 너비
availHeight 실제 화면에서 사용 가능한 높이
colorDepth 사용 가능한 색상 수
pixelDepth 한 픽셀당 비트 수

## 9.5 location 객체
 location 객체는 브라우저의 주소 표시줄과 관련된 객체.

 **location객체의 속성으로**
 href 문서의 URL주소
 host 호스트 이름과 포트 번호 > localhost:30703
 hostname 호스트 이름  > localhost
 port 포트 번호 > 30703
 pathname 디렉토리 경로 > Projects/Location.htm
 hash 앵커 이름? > #beta
 search 요청 매개변수 > ?param = 10
 protocol 프로토콜 종류 > http:

 **location객체의 메서드**
 assign(link) 현재 위치를 이동합니다.
 reload() 새로고침합니다.
 replace(link) 현재 위치를 이동합니다.

 location = 'http://hanb.co.kr';
 location.href = 'http://hanb.co.kr';

 location.assign = 'http://hanb.co.kr';
 location.replace = 'http://hanb.co.kr';

## 9.6 navigator 객체
navigator객체는 웹 페이지를 실행하고 있는 브라우저에 대한 정보

appCodeName -> 브라우저의 코드명
appName -> 브라우저의 이름
appVersion -> 브라우저의 버전
platform -> 사용중인 운영체제의 시스템 환경
userAgent -> 브라우저의 전체적인 정보

## 9.7 window 객체의 onload 이벤트 속성

 window객츼 onload속성을 사용하는 것, on으로 시작하는 속성을 이벤트 속성이라고 부르며 함수를 할당해야합니다.

 그러면 언제 객체로드가 완료되는 때가 언제일까?
 HTML페이지에 존재하는 모든 태그가 화면에 올라가는 순간!
