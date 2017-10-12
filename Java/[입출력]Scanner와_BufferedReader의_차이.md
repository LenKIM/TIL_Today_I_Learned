## Scanner와 BufferedReader의 차이.

Scanner가 최신 기술
BufferedReader가 고전 기술
하지만, BufferedReader가 휠씬 빠르다.

그 전에 이 둘의 차이와 목적을 확실히 기억하자.

```
Scanner sc = new Scanner(System.in);
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
```

위 방식이 사용방법이다.
일단 차이점을 살펴보면 (타 블로그 내용 참조)

>1. Scanner의 버퍼 크기는 1024 chars, 반면 BufferedReader의 버퍼 크기는 8192 chars이다.
>2. BufferedReader는 문자열을 단순히 읽고 저장, Scanner는 문자열을 구분하여 분석할 수 있다.
>3. BufferedReader는 동기화 된다. 반면 Scanner는 동기화가 되지 않는다.
>4. BufferedReader는 즉시 IOException 처리를 던지지만,Scanner는 숨긴다.

1번의 경우, 큰 파일을 읽을 때는 BufferedReader이 좋다.  
2번의 경우에는 Scanner는 지원하는 메소드를 이용할 수 있다.  
```java
public static void main(String[] args) {

    // Initialize Scanner object
    Scanner scan = new Scanner("Anna Mills/Female/18");
    // initialize the string delimiter
    scan.useDelimiter("/");
    // Printing the tokenized Strings
    while(scan.hasNext()){
        System.out.println(scan.next());
    }
    // closing the scanner stream
    scan.close();
}

Anna Mills
Female
18
```
위 처럼 Scanner는 구문 기호를 이용가능.

3번의 경우에는 BufferedReader는 멀티 쓰레드에 안전하고,
Scanner는 안전하지 않다.  

>BufferedReader 활용법

```java
import java.io.BufferedReader;
import java.io.InputStreamReader; //이 2개 import필수(java.io.*; 로 전부 받을수도 있다.)

public class Main {
    public static void main(String []args) throws Exception { //예외처리 필수
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String s = br.readLine(); //입력받을값이 String일때
        int a = br.read(); //입력받을값이 int일때
        int b = Integer.parseInt(br.readLine()); //int값+엔터 까지 입력받을때
    }
}
```
