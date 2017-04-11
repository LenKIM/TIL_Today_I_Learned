**<비트연산자>**
&,|,^,~는 데이터가 표현하는 값이 아니라 데이터를 구성하는 비트 자체를 가지고 AND, OR, XOR, NOT연산을 수행하는 연산자.

피연산자1 & 피연산자2
AND
피연산자1 \ 피연산자2
OR
피연산자1 ^ 피연산자2
XOR
~피연산자
NOT연산

```java
public static void main(String[] args) {
        int num1 = 0xFFFF0000;
        int num2 = 0xFF00FF00;
        int result1 = num1 & num2;
        int result2 = num1 | num2;
        int result3 = num1 ^ num2;
        int result4 = ~num1;

        System.out.printf("%08X %n", result1);
        System.out.printf("%08X %n", result2);
        System.out.printf("%08X %n", result3);
        System.out.printf("%08X %n", result4);
    }
```

```
FF000000
FFFFFF00
00FFFF00
0000FFFF
```
결과가 이렇게 나옴.

**<쉬프트연산자>**

데이터를 표현하는 값이 아니라 데이터를 구성하는 비트를 가지고 연산하는 연산자이다. 이 연산자들은 데이터 구성비트를 오른쪽이나 왼쪽으로 밀어서 이동시키는 기능을 가지고 있음

정수 << 비트수
: 정수를 구성하는 주어진 비트수만큼 왼쪽으로 이동하고 빈 공간은 0으로 채운다.

정수 >> 비트수
: 정수를 구성하는 비트를 주어진 비트수만큼 오른쪽으로 이동하고 빈 공간은 MSB와 똑같은 비트로 채운다.

정수 >>> 비트수
: 정수를 구성하는 비트를 주어진 비트수만큼 오른쪽으로 이동하고 빈 공간은 0으로 채웁니다.

```java
public static void main(String[] args) {
        int num = 0xFF00FF01;
        int result1 = num << 3;
        int result2 = num >> 3;
        int result3 = num >>>3;
        System.out.printf("%08X %n", result1);
        System.out.printf("%08X %n", result2);
        System.out.printf("%08X %n", result3);
    }
```
```
F807F808
FFE01FE0
1FE01FE0
```
