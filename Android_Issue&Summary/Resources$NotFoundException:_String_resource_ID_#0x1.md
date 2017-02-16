> ## android.content.res.Resources$NotFoundException: String resource ID #0x25

![스크린샷 2017-02-16 오후 4.07.40](http://i.imgur.com/UJg52N9.png)

이러한 에러가 발생하는 이유는......
**TextView나 EdtiText 같은 String 데이터를 추구하는 setText 함수 같은 곳에
int형 데이터를 넣으면 위와 같은 에러가 발생 한다.**

=> 형 변환 시켜주자!
