## moment-timezone.js
## MOMENT.js


# Node.js에서 활용가능한 시간 라이브러리.

**설치방법**
>npm install moment
>npm install moment-timezone --save

**활용**
1.
var moment = require('moment'); moment().format();

2.
 `moment.tz(..., String)` : 타임존을 생성할 때 사용한다.

```javascript
let timezone = moment.tz('Asia/Seoul');
        timezone.add(1, 'day');
        timezone.hour(7);
        timezone.minute(0);
        timezone.second(0);
        timezone.millisecond(0);

        console.log(timezone.format('YYYY-MM-DD, HH:mm:ss ha z'));

        // => 2017-06-27, 07:00:00 7am KST
```

 `moment().tz(String)` : 현재 존재하는 시간을 변경할 때 사용한다.

 ```javascript
 let timezone = moment().tz('Asia/Seoul');
    console.log(timezone.format('YYYY-MM-DD, HH:mm:ss h a z'));

    // => 2017-06-26, 19:35:43 7pm KST
 ```

 Tips) `hh` 와 `HH`의 차이는?
 => (오후) 07시, 19시

여기서 Summer Time을 조정할 수 있는 기능이 있다.
```
Due to daylight saving time, there is a possibility that a time either does not exist, or has existed twice.
```

`Spring Forword` 와 `Fall Back` 이 그 주인공이다.

3. Getting Zone Names

`moment.tz.names(); // String[]`

이 정도만 알아도 좋을 듯!
