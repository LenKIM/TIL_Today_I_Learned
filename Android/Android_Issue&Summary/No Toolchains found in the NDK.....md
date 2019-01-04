![](https://ws3.sinaimg.cn/large/006tNc79gy1fyug7iat5oj32ju09idhb.jpg)



오래된 프로젝트를 코틀린으로 연습겸 convert하려는데, 시작하자마자 이런 문제에 맞닥뜨렸다.

이전에도 경험했던 부분인데, 문제는 gradle의 버전이 너무 낮을 경우 발생하는 것으로 보인다.

https://github.com/google/filament/issues/15

이미 몇가지 이슈가 있다고 나오지만, 해결해본 경험으로는 옛날 gradle 버전이 문제로 보인다.



버전을

Gradle Version 4.1 => 4.6

Android Plugin Version 3.0.1 => 3.2.1

으로 변환 후 sync gradle을 하면 잘 됨!



