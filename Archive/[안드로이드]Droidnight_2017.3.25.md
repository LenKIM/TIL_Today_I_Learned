## 간략 내용

2. clean android architecture.

Clean-Android를 만드는데, 레이니스트사에서는 4가지의 덩어리로 나눠 좋은 아키텍터를 만드는 생각하는 걸 고민했다.

  1. Presentation
  - UI레벨의 처리
  - Android의 의존성
  - View와 Presenter 모습으로 사용함.
    - 그렇다면 어떻게 조합을 하는가?
  - 더 나은 네이밍을 생각하는 것이 중요함.

  나는 코드에 소설을 쓰는 것이다.

  2. Data
  - Repo의 실제 구현
  - Data Source 의존성이 존재함
  - Android 의존성이 존재함
  : Context를 받는 순간이 있다면, 의존성이 있다고 판단.

  3. Domain
  - 순수한 Java(Kotlin)모듈
  - Use Case
  ex) Get / POST / PUT / DELETE 등의 TransAction등의 의존성이 존재 할 필요가 없음
  - Interface  

  4. Entity
  - 순수한 Java(Kotlin)모듈
  - Android와의 의존성이 없음.
  ex)Todo App에서 각 모델을 parseable로 하는건 의존성을 발생시킨다.(안좋은예)
  - (같은 서비스) Android - iOS - 서버 모두 동일한 형태

아래로 향할수록 의존성이 더욱 더 감소한다.

=> 변화에 좀 더 유동적으로 변화시킬 수 있다.
좋은 코드의 구조가 좋은 제품으로 이어진다고 믿기에 이러한 아키텍처를 적용

: sunghyunzz
BaseFragment => 절대 바뀌지 않을 것만 같은 걸 BaseFragment에 넣었다./

-----

UI자동화 테스트

수동테스트 | 자동테스트
---|---
좁은범위의 테스트|넓은 범위의테스트
많은인력필요|적은 인력으로 수행가능
많은시간소모|빠른테스트
다양한 기기를 확보|클라우드로 테스트, 실제 기기 필요없음(이 부분이 주요!)

=> 어떻게 하면 적은 비용으로 테스트를 효율적으로 하나?

 - 싱글에서 에스프레소.
 - 멀트에서는 UIAUTOMATOR2.
 => 특징 : 멀티테스트는 블랙박스 테스트 / 구글의 지원 / 쉬운API / 가볍다.

 API소개

 - By
 - BySelector
 - UiDevice
 - UiObject2

 위 네가지 사용법만 알아도 대부분의 테스트를 작성가능.
 openApp(){

 }

 1. Ui요소 찾기
 테스트를 위해서 UiObject2를 먼저 찾아야하며, BySelector로 Ui를 찾아 검색.

 2. 선택자 생성
 선택자 생성을 통해서 UI를 테스트할 수 있다.
 여러가지있음/

 3. 헬퍼메소드를 작성하여, UI테스트에 필요한 메서드를 미리 만들어놔 사용하는 것이 Tip

 4. UI동기화

 5. 애니메이션 비활성화.

 6. AWS Device Farm으로 UI테스팅 진행
  - 개정 / 접속 / 생성 / 새로운 테스트 생성.
  - Configure a test에서 설정해서 UIAUTOMATOR2를 설정해서 해야함!!! 그러지 않으면 UIAUTOMATOR1이됨
   // 010 9525 1659
   // RYANZEN@gmail.com

------

이영찬?

tiii.tistory.com

개밥먹기? ->자신이 개발한 라이브러리를 적용하는 것,

keyFrame과 Lottie로 애니메이션 만들기,
AndroidIconAnimator
-> keyFrame Release(Facebook)
-> Lottie Release(AirBnB)
