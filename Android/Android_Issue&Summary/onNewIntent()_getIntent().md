# onNewIntent vs getIntent()

 옛날에 공부할 때는 없었던거 같은데...아니면 내가 놓친 부분일거라 생각한다.
 아니면 쓸모 없거나!

 ![스크린샷 2017-11-08 오전 11.19.00](https://i.imgur.com/BYZeEdi.png)

 Flag을 SINGLE_TOP 설정하고 startActivity를 불렀을 때

 실행한 Activity 가 foreground 상태에서 Intent 에 Extra 값을 추가하고 StartActivity 를 호출하면 onCraete() 대신에 onNewIntent(Intent intent) 가 호출이 되고 그 다음 onResume() 이 호출이 됨

```java
Intent intent = new Intent(context, SomeActivity.class);

intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

 intent.putExtra(PARAM_1, value1);
 intent.putExtra(PARAM_2, value1);
 intent.putExtra(PARAM_3, value1);

 context.startActivity(intent);



@Override
protected void onNewIntent(Intent intent) {

       super.onNewIntent(intent);

       if (null != intent) {
             int defaultValue = 0;
              index = intent.getIntExtra(PARAM_1, defaultValue);
              setIntent(intent);  

       }

}

출처: http://diyall.tistory.com/786 [모든 것을 DIY 하자]
```
onNewIntent는 액티비티안에서 오버라이드해서 선언하여 사용한다. 물론 여기서 intent는 메인액티비티가 아니라 전달을 해주고자 하는 액티비티에서 선언해서 사용하는 것이다. 그러나 이를 활용하려면 FLAG가 싱글탑이여야 한다는 사실!!

getIntent는 말그래도 인텐트 가져올때 사용.
![스크린샷 2017-11-08 오전 11.22.55](https://i.imgur.com/RhXAoaJ.png)
