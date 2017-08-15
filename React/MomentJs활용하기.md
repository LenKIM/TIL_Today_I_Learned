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

 이번에 시간관련 기능을 추가하면서 엄청난 삽질을 했던 부분이 있다.그래서 이렇게 업데이트를 실시!
리액트의 특성상, 단방향으로 흘러가는 특성이 있어서 어떤 특정 함수를 static으로 가져가는 행위 자체를 지양하는거같다.

```javascript

getHandleInfoMessage(ticket) {
        //위 isVehicleAssigning 사용하면 날짜만 가져오고 시간은 가져오지 않는다.
        if (ticket.reservation.standByReservation) {

            let startTime = ticket.reservation.date.format('YYYY-MM-DD, HH:mm:ss')
            startTime = moment(startTime);
            startTime.subtract(1, 'day')
            // console.log(startTime + "")
            startTime.add(15, 'hour')
            console.log('시작' + startTime.format('YYYY-MM-DD, HH:mm:ss'))

            let endTime = ticket.reservation.date.format('YYYY-MM-DD, HH:mm:ss ')
            endTime = moment(endTime);
            endTime.add(1, 'day');
            // console.log(endTime + "")
            console.log(' 마감 ' + endTime.format('YYYY-MM-DD, HH:mm:ss'))
            let now = moment()
            // var m = moment(new Date(2011, 3, 2, 3, 4, 5, 10)), m)
            console.log(now);

            /* 참고자료
             var today = moment().format('YYYY-MM-DD HH:mm:ss');
             var tomorrow = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

             //지난 이벤트
             if(event.start.isBefore(today)) {
             element.addClass('pass-event');
             }
             //오늘 내일 이벤트
             else if(event.start.isBetween(today, tomorrow)){
             element.addClass('today-event');
             }
             //내일 이후 이벤트
             else if(event.start.isAfter(tomorrow)){
             element.addClass('after-event');
             }
             */

            // if ((now.isAfter(startTime)) && (now.isBefore(endTime))) {
            //     return strings.get('standby_desc_05', this.props.toAirport, this.props.fromAirport) + '\n'
            //         + strings.get('standby_desc_06') + '\n'
            //         + strings.get('ticket_info_message_05') + '\n'
            //         + strings.get('ticket_info_message_06')
            // } else {M
            //     return strings.get('ticket_info_message_03', TimeUtil.formatHour(this.props.assignVehicleDeadline)) + '\n'
            //         + strings.get('ticket_info_message_05') + '\n'
            //         + strings.get('ticket_info_message_06')
            // }

            if (now.isBetween(startTime, endTime)) {
                console.log('true')
                return strings.get('standby_desc_05', this.props.toAirport, this.props.fromAirport) + '\n'
                    + strings.get('standby_desc_06') + '\n'
                    + strings.get('ticket_info_message_05') + '\n'
                    + strings.get('ticket_info_message_06')
            } else {
                console.log('false')
                return strings.get('ticket_info_message_03', TimeUtil.formatHour(this.props.assignVehicleDeadline)) + '\n'
                    + strings.get('ticket_info_message_05') + '\n'
                    + strings.get('ticket_info_message_06')
            }
        } else {
            return strings.get('ticket_info_message', TimeUtil.formatHour(this.props.assignVehicleDeadline))
        }
    }

```

위 소스에서 주의해서 봐야될 곳이 몃몃 있다.
 처음 Moment.js에서 활용해야 할 때, 그냥, moment.tz() 또는  moment().tz() 이런식으로 타임존에 접근했으나 여기서 발생하는 문제점이 있다.

 moment가 가진 function을 활용하고 싶은데, 타임존 또는 format('YYYY-MM-DD, HH:mm:ss)을 사용하면 function을 활용할 수 없었다.

 시간을 비교하는 함수를 사용하지 못했을 때, 시간을 비교하기 위해서는 다음과 같은 라이브러리를 활용하지 않은 방식을 써야 한다.

 아래 블로그를 참조하자.
 [여기](https://msdn.microsoft.com/ko-kr/library/ee532932(v=vs.94).aspx)

 하지만 moment와 같은 라이브러리를 활용하면, 위와 같은 복잡도는 사라진다.

 글쓰기를 못해서 아직 서툴지만, 따로 메일을 알려주면 조금더 활용방안에 대해 알려줄수 있도록 노력하겠다.

 해당 라이브러리의 주소는 [여기!](http://momentjs.com/)



## 2017-07-18 추가내용

  > time.format('YYYY-MM-DD HH:mm:ss')

여기서, YYYY MM DD HH:mm:ss 에 따라 시간의 포맷을 설정해주는데,

IE 와 크룸의 차이가 나타났다.

IE의 경우, 'YYYY-MM-DD, HH:MM:SS' 중간에 (꼼마)가 있으면 제대로된 파싱을 하지 못한다.
그러나 크룸의 경우, (꼼마)가 있어도 제대로 시간 파싱을 실행한다!
