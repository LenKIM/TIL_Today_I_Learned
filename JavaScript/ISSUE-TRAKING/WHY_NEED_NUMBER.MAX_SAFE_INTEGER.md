왜 NUMBER.MAX_SAFE_INTERGER가 필요한가?



만약 Number.MAX_VALUE를 할 경우에는 아래와 같이 나타난다.

```javascript
Number.MAX_VALUE
1.7976931348623157e+308
```

그렇기 때문에 ES6에는 

`MIN_SAFE_INTEGER` / `MAX_SAFE_INTEGER`

그리고 `EPSILON` 이 생겼다.

여기서 SAFE의 의미는 표현한 값과 실제 값이 정확하게 일치한다고 장담할 수 있는 정수를 뜻합니다.

만약 큰 숫자에 대한 연산이 필요할 경우에는 큰 수 유틸리티를 사용하면 된다!

