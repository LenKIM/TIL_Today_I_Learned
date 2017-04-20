
Java Array
- 동일한 Type의 데이터를 여러 개 가질 때 사용하는 자료구조.
- String[] stringArray; 와 같이 정의
- Array의 생성은 new String[size]와 같이 생성
- Array가 생성되었다고 Array에 들어가는 객체가 생성된 것은 아님.
- Array의 크기는 stringArray.length로 획득
- Array에 대한 연산은 java.util.Arrays class 사용

 ```java
 //첫번째 방법
 String [] dataArray1;
 int size = 3;
 dataArray1 = new String[size];
 //두번째 방법
 String [] dataArray2 = {"a", "b", "c"};
 //세번쨰 방법
 String [] dataArray3;
 dataArray3 = new String[] {"a","b","c"}

 MyData[] myDataArray = {new MyData("a",1),new MyData("b",2),new MyData("c",3)}
```

**이러한 배열을 활용한 연산은 무엇이 있을까?**

```java
List<String> list = Arrays.asList(dataArray);
// 여기서 말하는 ...은 해당 객체가 1개,2개 여러개가 들어 갈수 있다라는 뜻이다. 가변적으로 들어간다는 말이다.
abstract void setStrings(String ...strings);
이렇게하면 strings는 배열로 저장가능하다.
```

```java
Arrays.sort(dataArray, new Comparator<String>() {
  @override
  public int compare(String str1, String str2){
    return str1.compareTo(str2);
  }
});
//String의 경우에는 위의 같이 해서 소팅 할 수 있다.
// Array에서 검색, 정렬할 수 있음.
```

----

**Java Collection Framework**

 - 자료의 집합 형태에 대한 표준적인 Framework을 정의한 인터페이스/유틸리티 들의 목록
 - Java SE API
 - 자바를 이용한 자료구조/알고리즘을 정의하고, 동작시키는 클래스 라이브러리를 의미 함
 - 자바에서 객체를 저장하는 방법을 의미함
 - 배열도 일종의 Collection이라고 할 수 있음.

 - 큐
 - 스택
 - 연결리스트
 - 구조(Hash 알고리즘)
    - Heap memory가 이 구조.

 **Java.util.Collection**
 - 객체의 모임을 저장하기 위한 클래스의 최상위 자료형으로 List 인터페이스와 Set 인터페이스로부터 유도
 - 컬랙션 내의 Adding, clearing, comparing, retaining와 같은 동작을 모든 컬렉션들이 포함
 - 컬렉션은 각각의 요소에 접근할 수 있도록 Iterator(반복자)라고 불리우는 인터페이스와 객체를 얻을 수 있는 메소드 제공
 - 컬렉션 인터페이스는 이외에도 컬렉션에 사이즈, 컬렉션의 해쉬코드, 컬렉션이 비었는지 검사하는 동작들을 제공
 - 용량이 부족할 시에는 자동으로 증가함.

 
