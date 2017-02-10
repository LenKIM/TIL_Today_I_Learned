
## stetho 사용법

![스크린샷 2017-02-10 오후 4.58.08](</assets/스크린샷 2017-02-10 오후 4.58.08.png>)




1. Network
유틸성앱이 아닌이상 Retrofit이나 URLConnection을 사용해서 API서버와 네트워크 통신을 하고 계실겁니다.
이러한 통신에서의 Response값이나 Header값등등 네트워크의 진행상황에 대해서 궁금한 경우가 많습니다.

Stetho는 해당앱의 각각의 네트워크 통신의 정보를 상세하게 살펴볼 수 있습니다.


2. DB / SharedPreference / 기타 저장된 값
네 맞습니다. SQLite를 이용해서 DB에 저장하는경우 에뮬레이터는 DDMS로 해당 DB내용을 볼수 있지만 실기기는 그럴수 없었습니다.
SharedPreference나 쿠키,기타 값들은 아예 알수있는 방법이 없기때문에 항상 로그로 해당 값들을 찍어볼 수 밖에 없었습니다.

Stetho를 이용하면 해당 값들을 조회할수 있을뿐만 아니라 DB에 쿼리를 날려볼 수도 있고 값을 수정할 수도 있습니다.

3. Element
xml이 실제 앱에서 화면으로 보여질때 어떠한 값들과 세팅들이 되어서 보여지는지 볼 수 있습니다.
또한 특정 View를 선택하면 해당 View가 휴대폰 화면에서 어디에 위치되어있는지 표시해서 보여주기도 합니다.

4. Console
콘솔창에서 명령어 입력이 가능합니다.
앱안에서의 Resource값들을 가져오거나 앱에서 Toast창을 띄울수도 있습니다.


5. Dumpapp
UI방식이 아닌 커맨드라인 입력방식으로 동작을 수행할수 있으며 값들을 조회하고 수정할수도 있고 미리 정의해둔 커스텀값들을 활용할 수도 있습니다.


출처: http://gun0912.tistory.com/69 [박상권의 삽질블로그]


 일단 쓰기위해서는 앱 내에서의 Build.gradle

 ![스크린샷 2017-02-10 오후 4.59.36](</assets/스크린샷 2017-02-10 오후 4.59.36.png>)

    // Gradle dependency on Stetho
    dependencies {
      compile 'com.facebook.stetho:stetho:1.4.2'
    }

 위에 코드를 추가한다.

![스크린샷 2017-02-10 오후 5.01.10](</assets/스크린샷 2017-02-10 오후 5.01.10.png>)

Java => new File 후,
MyApplication.java 만든 후,

아래와 같이 코드 작성

![스크린샷 2017-02-10 오후 5.03.48](</assets/스크린샷 2017-02-10 오후 5.03.48.png>)

public class MyApplication extends Application {
        public void onCreate() {
            super.onCreate();
            Stetho.initializeWithDefaults(this);
        }
    }


chrome://inspect/#devices

접속한 뒤에,

![스크린샷 2017-02-10 오후 5.07.31](</assets/스크린샷 2017-02-10 오후 5.07.31.png>)

inspect를 클릭하면, 아래와 같이 디바이스내에서 저장된 LocalDB를 브라우저 할 수 있다.

![스크린샷 2017-02-10 오후 5.08.34](</assets/스크린샷 2017-02-10 오후 5.08.34.png>)



참고 : http://facebook.github.io/stetho/
