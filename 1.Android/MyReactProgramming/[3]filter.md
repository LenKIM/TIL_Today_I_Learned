## 옵저버블 필터링

옵저버블 시퀀스의 핵심인 필터링.

발행된 옵저버블에서 원하는 값만 선택하는 방법과 유한한 값을 얻는 방법, 오버플로 시나리오에 대처하는 방법을 비롯한 여러 유용한 트릭을 배워보자.

### 시퀀스 필터링
Rx자바는 관찰 중인 시퀀스에서 불필요한 특정 값을 필터링하는 데 filter()를 사용.

filter()함수에 적절한 서술자를 전달해 리스트를 필터링해보자.

```java
private void loadList(List<AppInfo> apps) {
  mRecyclerView.setVisibility(View.VISIABLE);

  Observable.from(apps)
  .filter((appInfo) -> appInfo.getName().startsWith("C"))
  .subscribe(new Observable<AppInfo>() {
    @Override
    public void onCompleted(){

    }

    @Override
    public void onError(Throwable e){

    }

    @Override
    public void onNext(AppInfo appInfo){
      mAddedApps.add(appInfo);
      mAdapter.addApplication(mAddedApps.size() - 1, appInfo);
    }
  })
}
```

filter()에 하나의 인자를 갖는 새로운 Func1객체를 전달하고 있다. Func1은 인자 타입으로 AppInfo 객체를 갖고, Boolean 객체를 반환한다. filter()함수는 조건이 유효할 때만 true를 반환할 것이다. 이때 값이 발행되고 모든 옵저버에게 전달될 것이다.

예상대로 filter()는 옵저버블 시퀀스에서 개발자가 필요로 하는 값을 지닌 완벽한 시퀀스를 생성하는 데 매우 유용하다 개발자는 옵저버블 시퀀스의 소스를 알 필요가 없고, 왜 수많은 요소가 발행되는지도 알 필요가 없다. 개발자는 단지 앱에서 사용할 수 있는 새로운 시퀀스를 생성하기 위해 이러한 요소들의 유용한 부분집을 원한다. 이러한 사고방식은 코딩에서 분리와 추상화 스킬을 강조한다.

filter()의 가장 일반적인 사용법 중 하나는 null객체를 필터링하는것

```java
.filter(new Func1<AppInfo, Boolean>() {
  @Override
  public Boolean call(AppInfo appInfo) {
    return appInfo != null;
  }
})
```

위 코드는 간단하고 이 예제를 위해 수많은 보일러 플레이트 코드가 사용된 것처럼 보이지만, 이는 onNext()호출에서 null값을 체크하는 수고를 덜어주며 개발자가 실제 앱로직에만 집중할 수 있게 한다.

### 필요한 것만 얻기

전체 시퀀스는 필요하지 않지만 맨 처음이나 끝의 몇몇 요소가 필요한 경우, take()나 takeLast()를 사용할 수 있다.

**take()**
 만약 옵저버블 시퀀스의 첫 3개 요소만이 필요해 이들만 발행한 다음 옵저버블을 완료하고 싶을 떄 활용.

**taskLast()**

마지막 N개의 요소만 필요한 경우에는 taskLast() 활용

### 단 한 번만 발행
 옵저버블 시퀀스를 발행하다 보면, 에너라 설계에 의해 중복된 값을 발행할 수 있다. distinct()와 distinctUntilChanged()함수는 중복된 값을 원할하게 처리해준다.

 **distinct()**

 특정 값을 단 한번만 처리함을 완벽하게 보장하고 싶을 때

옵저버블 시쿠너스에 distinct()함수를 적용함으로써 중복을 제거.

**distinctUntilChanged()**

옵저버블 시퀀스가 전에 발행했던 값과 다른 새로운 값을 발행할 경우에만 알림을 받고 싶다면 어떻게 해야 할까? 방의 온도를 매초 발행하는 온도 센서를 관찰중이라고 가정해보자.

반복되는 값이 중복되면 변화를 주지 않고, 실제로 변경되면 알림을 받아 변경을 실시한다. 즉, 이 함수는 단순하게 모든 중복 값은 무시하고 새로운 값만 발행한다.


**first()와 last()**

첫 번째 요소만 발행하는 시퀀스

마지막 요소만 발행하는 시퀀스

그러나 다른건?

이 두 메소드 모두 인자로 프레디케이트인 func1을 전달받는다. 프레디케이트는 개발자가 관심있어 하는 첫번째나 마지막 요소를 결정하는데 사용할 수 있다.

**skip()와 skipLast()**

![스크린샷 2017-08-09 오전 12.40.35](http://i.imgur.com/mKUDHym.png)

![스크린샷 2017-08-09 오전 12.40.51](http://i.imgur.com/2hNbs44.png)

**elementAt()**

옵저버블 시퀀스가 발행한 요소 중 다섯 번째 요소만 필요하다면 어떨까?

![스크린샷 2017-08-09 오전 12.43.17](http://i.imgur.com/Oa1HRQt.png)

**debounce()**

옵저버블에서 아이템이 발행된 다음 바로 뒤따라서 발행된 아이템을 필터링하고, 옵저버블에서 일정 시간 동안 다른 아이템이 발행되지 않으면 아이템을 발행한다.

내부 타이머를 사용하기 때문에, TimeUnit객체 사용하고, 내부 타이머가 실행하고 이 기간 동안 새로운 아이템을 발행하지 않으면 새로운 옵저버블은 마지막 아이템을 발행한다. 
