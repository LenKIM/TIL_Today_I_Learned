## 어떻게 디컴파일러하는가? ( MAC 기준 )

1. adb path 설정
2. adb를 통해 설치된 패키지를 찾는다.
3. 쉘을 빠져나온 뒤 설치된 패키지를 .apk로 추출한다.

```
$ adb shell
  # adb shell을 활용하여 기기에 접속

$ pm list package -f
  # 접속한 기기에서 설치된 패키지 이름 검색
  # 이떄 원하는 패키지 이름을 확인 하여 패키지 이름을 복사해 둔다.

$ exit
  # 쉘을 빠져 나온 후 원하는 apk 파일 을 다운로드

# adb pull /data/[페키지 경로상의 이름 apk 까지만]
```

이렇게 하면 APK를 추출 할 수 있다.

! 만약 PATH설정이 안되 있어서 ADB를 찾을 수 없다고 나온다고, sdk가 설치된 폴더의 경로를 찾은 뒤,
`platform-tools` 에 있는 adb를 찾는다.

조금더 자세한 방법은 아래 블로그 주소를 참조하였다.

 http://namsieon.com/454

 자자, apk가 만들어 졌다면 남은 과제는 2가지

 1. apk => jar파일
 2. jar를 jd-GUI라는 App으로 디 컴파일러를 해주면 된다.

 1. 먼저 살펴 보면 [여기 다운](https://github.com/pxb1988/dex2jar)     
https://github.com/pxb1988/dex2jar dex2jar를 다운받은 후,

이 같은 명령어를 통해 jar로 변환한다.
>$>./dex2jar.sh <apk압축을 푼 위치>/classes.de

여기서 **주의할점!!!** APK파일의 권한을 부여해야 한다.
`sudo chmod +xr /Users/xxx classes-dex2jar.jar`
이런식으로~~~

이제 2. 로 넘어가서, [JD-GUI](https://github.com/java-decompiler/jd-gui/releases)
를 클릭하여 다운 받습니다!

![스크린샷 2017-03-09 오후 3.21.17](http://i.imgur.com/zesLOpx.png)

이런 화면에서 폴더 열기해서 변환한`.jar`를 확인하면 된다!

끝! 위에서 말했지만 MAC에서는 권한이 없으면 열리지도 않고, 변화도 안된다. 꼭 권한을 부여해주자!
