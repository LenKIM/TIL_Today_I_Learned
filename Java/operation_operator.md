자바에서 주의할점

자바는 항상 자바 가상 기계가 기본적으로 32비트 단위로 정수 계산을 한다!

이말은 즉 int보다 좁은 범위의 타입이 무조건 int타입으로 변환되는 이유이다!

byte, short, char타입은 모두 32비트 미만이기 때문에 32비트인 int타입으로 크기를 늘려야만 계산이 가능!

아니면........
```java
public static void main(String[] args) {
       short num1 = 100;
       short num2 = (short) -num1;
       System.out.println(num2);
 ```
 이런식으로 꼭 캐스팅을 해주면 됨! JVM이 위의 이유로 int로 변환 시켜버린다.
끝!
