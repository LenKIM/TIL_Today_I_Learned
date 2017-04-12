# StringBuffer와 StringBuilder 분석하기

## 공통점

둘 다 효과적인 문자열 수정을 위한 버퍼를 가지고 있다.
String은 하나의 객체라서 계속해서 객체 생성함

임시버퍼는 문자열의 길이 + 16크기의 버퍼를 생성한다.


## 차이점

StringBuffer 와 StringBuilder에서 StringBuffer는 여러 스레드가 동시에 하나의 객체를 사용할 때 데이터에 손상이 가거나 교착상태에 빠질수 있는것을 방지시키는 기능있고, StringBuilder는 없다.

만약 여러 여러 스레드를 돌릴 프로그램이 아니라면 굳이 StringBuffer를 쓸 필요가 있는가?
