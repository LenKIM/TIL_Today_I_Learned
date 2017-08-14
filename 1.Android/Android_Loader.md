# 안드로이드 Loader

로더.

로더는 Android3.0부터 도입된 것으로, 액티비티 또는 프래그먼트에서 비동기식으로 데이터를 쉽게 로드할 수 있습니다.

로더의 특성은 다음과 같습니다.

- 모든 activity와 Fragment에 사용될 수 있습니다.
- 데이터의 비동기식 로딩을 제공합니다.
- 데이터의 출처를 모니터하여 그 콘텍츠가 변경되면 새 결과를 전달합니다.
- 구성 변경 후에 재생성된 경우, 마지막 로더의 커서로 자동으로 다시 연결됩니다. 따라서 데이터를 다시 쿼리하지 않아도 됩니다.


로더 API 요약

1. LoaderManager
Activity또는 Fragment와 연관된 추상 클래스로, 하나 이상의 Loader인스턴스를 관리하는데 쓰입니다. 이것을 사용하면 애플리케이션이 Activity또는 Fragment 수명 주기와 함께 실행 시간이 긴 작업을 관리하는 데 도움이 됩니다. 이것의 가장 보편적인 용법은 CursorLoader와 함께 사용하는 것이지만, 다른 유형의 데이터를 로드하기 위해 어플리케이션이 자체 로더를 작성하는 것도 어라든지 가능합니다.

액티비티 또는 프래그먼트당 LoaderManager는 하나씩밖에 없습니다. 하지만 LoaderManager에는 여러 로더가 있어도 됩니다.

2. LoaderManager.LoaderCallbacks
클라이언트가 LoaderManager와 상호작용하기 위한 콜백 인터페이스입니다. 예를 들어 onCreateLoader()콜백 메소드를 사용하여 새 로더를 생성할 수 있습니다.

3. Loader
데이터의 비동기식 로딩을 수행하는 추상 클래스입니다. 이것이 로더의 기본 클래스입니다. 보통은 CursorLoader를 사용하기 마련이지만, 자신만의 서브클래스를 구현해도 됩니다. 로더가 활성 상태인 동안에는 소속 데이터의 출처를 모니터링하고 콘텐츠가 변경되면 새 결과를 전달하는 것이 정상입니다.

4. AsyncTaskLoader
작업을 수행할 AsyncTask를 제공하는 추상 로더입니다.

5. CursorLoader
AsyncTaskLoader의 서부 클래스이며, ContentResolver를 쿼리하고 Cursor를 반환합니다. 이 클래스는 쿼서 쿼리에 대한 표준 방식으로 Loader 프로토콜을 구현하며, AsyncTaskLoader에 구축되어 백그라운드 스레드에서 쿼서 쿼리를 수행하므로 애플리케이션 UI를 차단하지 않습니다. 이 로더를 사용하는 것은 프래그먼트나 액티비티의 API를 통해 관리된 쿼리를 수행하는 대신 ContentResolver에서 비동기식으로 데이터를 로드하는 최선의 방법입니다.

위 5가지가 가장 기본적인 구성 요소입니다. 생성하는 로더마다 이 모든 것이 다 필요한 것은 아니지만, 로더를 초기화하려면 항상 LoaderManager에 대한 참조가 필요하고 CursorLoader와 같은 Loader클래스도 구현해야합니다.

## 애플리케이션 안에서 로더 사용

 - Activity 또는 Fragment
 - LoaderManager의 인스턴스
 - ContentProvider에 의해 지원되는 데이터를 로드하는 CursorLoader. 아니면, 개발자 나름의 Loader 또는 AsyncTaskLoader 서브클래스를 구현하여 다른 출처에서 데이터를 로드해도 됩니다.
 - LoaderManager.LoaderCallbacks의 구현. 여기에서 새 로더를 생성하고 기존 로더에 대한 참조를 관리합니다.
 - 로더의 데이터를 표시하는 방법(예: simpleCursorAdapter).
 - ContentProvider와 같은 데이터 소스로, CursorLoader를 사용하는 경우.

## 로더 시작
 LoaderManager는 Activity또는 Fragment 내에서 하나 이상의 Loader인스턴스를 관리합니다. 액티비티 또는 프래그먼트당 LoaderManager는 하나씩밖에 없습니다.

보통의 액티비티의 onCreate()매서드 내에서, 또는 프래그먼트의 onActivityCreated()메서드 내에서 Loader를 초기화합니다. 이렇게 하려면 다음과같은 방법을 따릅니다.

```java
// Prepare the loader.  Either re-connect with an existing one,
// or start a new one.
getLoaderManager().initLoader(0, null, this);
```

initLoader() 메서드는 다음과 같은 인수를 취합니다.

- 로더를 식별하는 고유한 ID. 이 예시에서 ID는 0입니다.
- 생성 시 로더에 제공할 선택적 인수 (이 예시에서는 null).
- LoaderManager.LoaderCallbacks 구현. 로더 이벤트를 보고하기 위해 LoaderManager가 이것을 호출합니다. 이 예시에서는 지역 클래스가 LoaderManager.LoaderCallbacks 인터페이스를 구현하므로, 자신에 대한 참조인 this를 전달합니다.
