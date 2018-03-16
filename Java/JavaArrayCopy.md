# 배열 복사

자바에서 배열을  '=' 로 넣는다 라는 개념은 무엇일까?

나는 복사를 하고 싶어서 '=' 표현을 했는데, 이렇게 되면 자바는 

```java
//3중
        for (int i = 0; i < blankList.size()-2; i++) {
            for (int j = i+1; j < blankList.size()-1; j++) {
                for (int k = j+1; k < blankList.size(); k++) {


                    Point a =  blankList.get(i);
                    Point b =  blankList.get(j);
                    Point d =  blankList.get(k);

                    int [][] temp = new int[7][7];
                    Point !!  temp = map; 
                    //for (int l = 0; l < 7; l++) {
                    //   for (int m = 0; m < 7; m++) {
                    //        temp[l][m] =  map[l][m];
                    //    }
                    //}
                    
                    

                    temp[a.x][a.y] = 1;
                    temp[b.x][b.y] = 1;
                    temp[d.x][d.y] = 1;
//                    System.out.println("----------------------------");
//                    for (int q = 0; q < N; q++) {
//                        System.out.println(Arrays.toString(map[q]));
//                    }
                    System.out.println();
                    for (int q = 0; q < N; q++) {
                        System.out.println(Arrays.toString(temp[q]));
                    }
                    System.out.println("----------------------------");

                    System.out.println();
                }
            }
        }
```

​                    Point !!  temp = map; 

이렇게 한다는 것에 의미는 **주소값을 참조**하기 때문에 map이 변화되도 똑같이 temp가 변화된다.

처음에는 temp를  new로 객체를 생성했기 때문에 문제가 없을거라 생각했는데, 오산이였다. new로 생성하고 temp를 초기화 시켜도 temp = map으로 하면 주소를 참조하기 때문에 값이 계속해서 중복되서 나온다.

그래서 값을 하나하나씩 가져와서 넣어주는 방법과 Arrays.copy의 방식을 쓰는 방법이 있다. **(값에 의한 참조)**

```java
for (int l = 0; l < 7; l++) {
   for (int m = 0; m < 7; m++) {
        temp[l][m] =  map[l][m];
    }
}
```

> Arrays.copy 

이런 방식이 존재한다.

```java
for (int l = 0; l < N; l++) {
temp[l] = Arrays.copyOf(map[l], map[l].length);
}
```



**즉, copy 사용에 주의하자!!**



아래 내용은 블로그를 복사 붙여 넣기했다.

http://tip.daum.net/openknow/59160181

[Java] Arrays를 이용한 Array 복사

 Arryas에 copyOf 메소드를 사용해서 Array의 값들중 지정 위치 이전까지의 값들을 복사해 옵니다.
Arryas에 copyOfRange 메소드를 사용해서 Array의 값들중 지정 범위의 값들을 복사해 옵니다.
아래는 1 2 3 4 5 Array를 만들어서 copyOf, copyOfRange 메소드를 이용해서 복사해온 값을 출력하는 샘플 입니다.

```java
public static void main(String[] args) {
    int[] array1 = { 1,2,3,4,5 };
    System.out.println("array");
    for (int i : array1) {
        System.out.print(i);
    }
    System.out.println("\narray copyOf");
    int[] array2 = Arrays.copyOf(array1, 4);
    for (int i : array2) {
        System.out.print(i);
    }
    System.out.println("\narray copyOfRange");
    int[] array3 = Arrays.copyOfRange(array1, 3, 7);
    for (int i : array3) {
        System.out.print(i);
    }
}
```

출력 결과는 아래와 같습니다.    
array
12345
array copyOf
1234
array copyOfRange
4500    