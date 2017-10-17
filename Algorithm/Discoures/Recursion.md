# Recursion Thinking

## 문자열의 길이 계산
```
 if the string is empty
    return 0
 else
    return 1 plus the length of the string that excludes the first character;
```
유심있게 이 자료를 봐야한다.
  n  =  ( n -1 ) + 1

순환적인 알고리즘
```java
public static int length(String str){
  if(str.equals("")){
    return 0;
  } else{
    //맨 앞의 문자열을 제외하고 나타낸다..?  beginIndex 이므로.
    return 1+ length(str.subString(1))
  }
}
```

```java
public static void printChars(String str){
  if(str.length() == 0)
    return;
  else{
    System.out.print(str.charAt(0));
    printChars(str.subString(1)); <- 첫글자를 제외한 나머지 무자를 말한다..
  }
}
```

문자열을 뒤집어 프린트.
```java
public static void printCharsReverse(String str){
  if(str.length() == 0)
    return;
  else{
    printCharsReverse(str.subString(1));
    System.out.print(str.charAt(0));
  }
}
```

문장의 순서가 바뀐것만으로도 리버스되어 출력된다.
 이제 위의 코드를 고찰할 필요가 있다.

 2진수로 변환하여 출력
```java
public void printInBinary(int n){
  if(n<2)
    System.out.print(n)
  else{
    printInBinary(n/2)
    System.out.print(n%2)
  }
}
```

 ```java
 Scanner in 이 참조하는 파일로 부터 n개의 정수를 입력받아 배열 data의 data[0]... data[n-1]에 저장한다.

public void readFrom(int n, intp[] data, Scanner in){
  if(n = 0)return;
  else
   {
     readFrom(n-1, data, in);
     data[n-1] = in.nextInt();
  }

}
 ```

## Recursion vs Iteration
 - 모든 순환홤수는 반복문으로 변경 가능
 - 그 역도 성립함. 즉 **모든 반복문은 Recursion으로 표현 가능함**
 - 순환홤수는 복잡한 알고리즘을 단순하고 알기쉽게 표현하는 것도 가능하게 함
 - 하지만 함수 호출에 따른 오버헤드가 있음(매개변수, 액티베이션 프레임생성)

# Designing Recursion - 순환 알고리즘의 설계
- 적어도 하나의 base case, 즉 순환되지 않고 종료되는 case가 있어야 함
- 모든 case는 결국 base case로 수렴해야 함.

### 암시적매개변수를 명시적 매개변수로 바꾸어라.

순차 탐색
```java
 int search(int []data, int n, int target){
   for (int i = 0; i< n ;i++ ) {
     if(data[i] == target)
        return i;
     return -1
   }
 }
```
 이 함수의 미션은 data[0]에서 data[n-1]사이에서 target을 검색
 하지만 검색 구간의 시작 인덱스 0은 보통 생략한다. 즉 암시적 매개변수이다.
 왜? 0이라는 값은 암시적으로 적용된거다.. 암묵적으로 동의한것..

 ----
 ```java
 int search(int [] items, int begin, int end, int target){
   if(begin>end){
     return -1;;
     else if(target == items[begin])
        return begin;
      else
        return search(data, begin+1, end, target)
   }
 }
```
이 함수의 미션은  data[begin]에서 data[end]사이에 target을 검색한다.
즉, 검색구간의 시작점을 명시적(explicit)으로 지정한다.

이 함수를 search(data, 0, n-1, target)으로 호출한다면 앞 페이지의 함수와 완전히 동일한 일을 한다.

```java
 int search(int [] data, int begin, int end,int target){
   if(begin > end)
      return -1;
  else if(target == items[end])
      return end;
  else
      return search(data, begin, end-1, target);
 }
```

 위 함수는 검색구간의 시작점을 명시적으로 지정한다..

 ```java
 int search(int[] items, int begin, int end, int target) {
        if (begin > end)
            return -1;
        else {
            int middle = (begin + end) / 2;

            if (target == items[middle])
                return middle;

            int index = search(items, begin, middle - 1, target);

            if (index != -1)
                return index;
            else
                return search(items, middle + 1, end, target);
        }
    }
 ```

 최대 값 찾기??
 ```java
 int findMax(int [] data, int begin, int end){
   if(begin == end)
      return data[begin];
  else
      return Math.max(data[begin], findMax(data, begin+1, end));
 }
 ```

 이진검색
```java
// public static int
```

https://www.acmicpc.net/workbook/view/429 /BSF/DFS/floyd
http://new93helloworld.tistory.com/102
