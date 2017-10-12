## Java BigDecimal 사칙연산 - 오차없이 실수 표현하기

Float나 Double로 사칙연산을 하는 경우 정확한 값을 얻지 못할 때가 있고,
이는 소수점 이하의 값을 제대로 읽지 못하기 때문이다.

예를 들어 0.2 * 0.4의 결과가 0.08000000000000002 이렇게 나오는 경우가 있다.

이럴 때는 BigDecimal을 이용하자.
java.math.BigDecimal 을 import해야한다.

// 예제에서는 String 타입을 인자로 넣었다.
BigDecimal preNum = new BigDecimal("6");
BigDecimal postNum = new BigDecimal("2");

// 곱하기
mutipleResult = preNum.multiply(postNum);
// 나누기, 반올림해서 소수점 둘째자리까지 보여준다.
divideResult = preNum.divide(postNum, 2, BigDecimal.ROUND_UP);
// 더하기
addResult = preNum.add(postNum);
// 빼기
subtractResult = preNum.subtract(postNum);
