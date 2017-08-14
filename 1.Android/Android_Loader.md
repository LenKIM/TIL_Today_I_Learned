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

initLoader()호출로 로더가 초기화되었고 활성 상태이도록 확실히 합니다. 이로써 발생할 수 있는 결과가 두 가지 있습니다.
 - ID가 지정한 로더가 이미 존재하는 경우, 마지막으로 생성된 로더를 재사용합니다.
 - ID가 지정한 로더가 존재하지 않는 경우, initLoader()가 LoaderManager.LoaderCallbacks 메서드 onCreateLoader()를 발생시킵니다. 여기에서 인스턴스화할 코드를 구현하고 새 로더를 반환합니다.

 자세한 건. onCreateLoader() 세션을 살펴보자.

 어떤 경우에든 주어진 LoaderManager.LoaderCallbacks 구현은 해당 로더와 연관되어 있으며, 로더 상태가 변경되면 이것이 호출됩니다. 이 호출의 시점에서 호출자가 시작된 상태에 있으며 요청한 로더가 이미 존재하고 자신의 데이터를 생성해 놓은 경우, 시스템은 initLoader()중에 즉시 onLoaderFinished()를 호출하므로, 이런 일이 발생할 것에 대비해야만 합니다. 이 콜백에 대한 자세한 논의는 onLoaderFinished를 참고.

 initLoader() 메서드는 생성된 Loader를 반환하지만, 이에 대한 참조를 캡처하지 않아도 된다는 점을 유의하세요. LoaderManager는 로더의 수명을 자동으로 관리합니다. LoaderManager는 필요에 따라 로딩을 시작하고 중단하며, 로더와 그에 연관된 콘텐츠의 상태를 유지관리합니다. 이것이 시사하는 바와 같이, 로더와 직접적으로 상호작용하는 경우는 극히 드뭅니다. (다만, 로더의 동작을 미세하게 조정하기 위해 로더 메서드를 사용하는 사례를 알아보려면 LoaderThrottle 샘플을 참조하세요.) 특정한 이벤트가 일어났을 때 로딩 프로세스에 개입하기 위해 가장 일반적으로 LoaderManager.LoaderCallbacks 메서드를 사용합니다. 이 주제에 대한 자세한 논의는 LoaderManager 콜백 사용을 참조하세요.

## 로더 다시 시작
위에 나오는 것처럼 initLoader()를 사용하는 경우, 지정된 ID를 가진 기존 로더가 있으면 해당 로더를 사용하고 없으면 새로 생성합니다. 하지만 때로는 오래된 데이터를 폐기하고 새로 시작하고 싶을 때가 있습니다.

오래된 데이터를 폐기하려면 restartLoader()를 사용합니다. 예를 들어 다음의 SearchView.OnQueryTextListener 구현은 사용자의 쿼리게 변경되면 로더를 다시 시작합니다. 로더를 다시 시작해야 수정된 검색필터를 사용하여 새 쿼리를 수행할 수 있습니다

```java
public boolean onQueryTextChanged(String newText) {
    // Called when the action bar search text has changed.  Update
    // the search filter, and restart the loader to do a new query
    // with this filter.
    mCurFilter = !TextUtils.isEmpty(newText) ? newText : null;
    getLoaderManager().restartLoader(0, null, this);
    return true;
}
```

## LoaderManager 콜백 사용

LoaderManager.LoaderCallbacks 는 클라이언트가 LoaderManager와 상호작용할 수 있게 해주는 콜백 인터페이스입니다.

로더, 특히 CursorLoader는 중단된 후에도 자신의 데이터를 유지할 것으로 기대됩니다. 이 때문에 애플리케이션이 액티비티 또는 프래그먼트의 onStop() 및 onStart()를 가로질러 데이터를 유지할 수 있고, 따라서 사용자가 애플리케이션에 되돌아오면 데이터가 다시 로딩되기를 기다리지 않아도 됩니다. 새 로더를 언제 생성해야 할지 알아보려면 LoaderManager.LoaderCallbacks 메서드를 사용합니다. 또한 로더의 데이터 사용을 중단할 때가 되면 이를 애플리케이션에 알리는 데에도 이것을 사용할 수 있습니다.

LoaderManager.LoaderCallbacks에는 다음과 같은 메서드가 포함
- onCreateLoader() : 주어진 ID에 대하여 인스턴스화하고 새 Loader를 반환합니다.
- onLoadFinished() : 이전에 생성된 로더가 로딩을 완료하면 호출됩니다.
- onLoaderReset() : 이전에 생성된 로더가 리셋 중이어서 해당 데이터를 사용할 수 없을 경우 호출됩니다.

이러한 메서드들의 구체적인 내용을 봅시다.

#### onCreateLoader

로더에 액세스하려고 시도하는 경우(예를 들어 initLoader()를 통해), 로더는 해당 ID로 지정된 로더가 존재하는지 여부를 확인합니다. 그렇지 않으면, LoaderManager.LoaderCallbacks 메서드 onCreateLoader()를 트리거 합니다. 여기에서 새 로더를 생성합니다. 이것은 일반적으로 CursorLoader이지만, 자신만의 Loader 서브클래스를 구현할 수 있습니다.

이 예시에서, onCreateLoader()콜백 메서드는 CursorLoader를 생성합니다. 자체 생성자 메서드를 사용하여 CursorLoader를 빌드해야 합니다. 이 서브클래스는 ContentProvider로 쿼리를 수행하기 위해 필요한 모든 정보 집합을 필요로 합니다. 구체적으로 필요한 것은 다음과 같습니다.

 - uri - 검색할 콘텐츠의 URI입니다.
 - 예측 - 반환할 열 목록입니다. null을 전달하면 모든 열을 반환하며, 이는 비효율적입니다.
 - 선택 - 반환할 행을 선언하는 필터로,SQL WHERE절로 형식이 설정됩니다. null을 반환하면 주어진 URI에 대한 모든 행을 반환합니다.
 - selectionArgs - 선택에 ?를 포함해도 됩니다. 이렇게 하면 selectionArgs에서 가져온 값으로 교체되며, 이때 선택에 표시되는 순서를 따릅니다. 값은 문자열로 바인드됩니다.
 - sortOrder - SQL ORDER BY 절 형식으로 설정된 행의 순서 지정 방법입니다. (ORDER BY 자체는 제외). null 을 전달하면 기본 정렬 순서를 사용하는데, 이는 순서가 없습니다.

 ```java
 // If non-null, this is the current filter the user has provided.
String mCurFilter;
...
public Loader<Cursor> onCreateLoader(int id, Bundle args) {
   // This is called when a new Loader needs to be created.  This
   // sample only has one Loader, so we don't care about the ID.
   // First, pick the base URI to use depending on whether we are
   // currently filtering.
   Uri baseUri;
   if (mCurFilter != null) {
       baseUri = Uri.withAppendedPath(Contacts.CONTENT_FILTER_URI,
                 Uri.encode(mCurFilter));
   } else {
       baseUri = Contacts.CONTENT_URI;
   }

   // Now create and return a CursorLoader that will take care of
   // creating a Cursor for the data being displayed.
   String select = "((" + Contacts.DISPLAY_NAME + " NOTNULL) AND ("
           + Contacts.HAS_PHONE_NUMBER + "=1) AND ("
           + Contacts.DISPLAY_NAME + " != '' ))";
   return new CursorLoader(getActivity(), baseUri,
           CONTACTS_SUMMARY_PROJECTION, select, null,
           Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC");
}
 ```
#### onLoadFinished

이 메서드는 이전에 생성된 로더가 로딩을 완료하면 호출됩니다. 이 로더에 대해 제공된 마지막 데이터가 해제되기 전에 틀림없이 이 메서드가 호출도비니다. 이 시점에서 오래된 데이터의 사용 내용을 모두 제거해야 하지만( 곧 해제될 것으므로), 데이터 해체를 직접 수행해서는 안 됩니다. 해당 데이터는 로더의 소유이며, 로더가 알아서 처리할 것이기 때문입니다.

로더는 애플리케이션이 데이터를 더 이상 사용하지 않는다는 사실을 알게 되면 곧바로 해당 해제할 것입니다. 예를 들어 데이터가 CursorLoader의 커서인 경우, 거기에서 직접 close()를 호출하면 안됩니다. 커서가 CursorAdapter에 배치 중인 경우, swapCursor()메서드를 사용해야 합니다. 그래야만 오래된 Cursor가 종료되지 않습니다.

```java
// This is the Adapter being used to display the list's data.
SimpleCursorAdapter mAdapter;
...

public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
    // Swap the new cursor in.  (The framework will take care of closing the
    // old cursor once we return.)
    mAdapter.swapCursor(data);
}
```

#### onLoaderReset

이 메서드는 이전에 생성된 로더가 리셋 중이어서 해당 데이터를 사용할 수 없는 경우 호출됩니다. 이 콜백을 사용하면 데이터가 언제 해제될지 알아낼 수 있어 이에 대한 참조를 직접 제거할 수 있습니다.

이 구현은 swapCursor()를 호출하며, 이때 값은 null입니다.

```java
// This is the Adapter being used to display the list's data.
SimpleCursorAdapter mAdapter;
...

public void onLoaderReset(Loader<Cursor> loader) {
    // This is called when the last Cursor provided to onLoadFinished()
    // above is about to be closed.  We need to make sure we are no
    // longer using it.
    mAdapter.swapCursor(null);
}
```
## 예
예를 들어, 다음은 ListView를 표시하는 Fragment의 전체 구현을 나타냅니다. 여기에는 연락처 콘텐츠 제공자에 대한 쿼리 결과가 들어 있습니다. 이것은 CursorLoader를 사용하여 제공자에 대한 쿼리를 관리합니다.

이 예시에서 나타낸 바와 같이 애플리케이션이 사용자의 연락처에 액세스하려면 애플리케이션의 매니페스트에 READ_CONTACTS 권한이 포함되어 있어야 합니다.

```java
public static class CursorLoaderListFragment extends ListFragment
        implements OnQueryTextListener, LoaderManager.LoaderCallbacks<Cursor> {

    // This is the Adapter being used to display the list's data.
    SimpleCursorAdapter mAdapter;

    // If non-null, this is the current filter the user has provided.
    String mCurFilter;

    @Override public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

        // Give some text to display if there is no data.  In a real
        // application this would come from a resource.
        setEmptyText("No phone numbers");

        // We have a menu item to show in action bar.
        setHasOptionsMenu(true);

        // Create an empty adapter we will use to display the loaded data.
        mAdapter = new SimpleCursorAdapter(getActivity(),
                android.R.layout.simple_list_item_2, null,
                new String[] { Contacts.DISPLAY_NAME, Contacts.CONTACT_STATUS },
                new int[] { android.R.id.text1, android.R.id.text2 }, 0);
        setListAdapter(mAdapter);

        // Prepare the loader.  Either re-connect with an existing one,
        // or start a new one.
        getLoaderManager().initLoader(0, null, this);
    }

    @Override public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        // Place an action bar item for searching.
        MenuItem item = menu.add("Search");
        item.setIcon(android.R.drawable.ic_menu_search);
        item.setShowAsAction(MenuItem.SHOW_AS_ACTION_IF_ROOM);
        SearchView sv = new SearchView(getActivity());
        sv.setOnQueryTextListener(this);
        item.setActionView(sv);
    }

    public boolean onQueryTextChange(String newText) {
        // Called when the action bar search text has changed.  Update
        // the search filter, and restart the loader to do a new query
        // with this filter.
        mCurFilter = !TextUtils.isEmpty(newText) ? newText : null;
        getLoaderManager().restartLoader(0, null, this);
        return true;
    }

    @Override public boolean onQueryTextSubmit(String query) {
        // Don't care about this.
        return true;
    }

    @Override public void onListItemClick(ListView l, View v, int position, long id) {
        // Insert desired behavior here.
        Log.i("FragmentComplexList", "Item clicked: " + id);
    }

    // These are the Contacts rows that we will retrieve.
    static final String[] CONTACTS_SUMMARY_PROJECTION = new String[] {
        Contacts._ID,
        Contacts.DISPLAY_NAME,
        Contacts.CONTACT_STATUS,
        Contacts.CONTACT_PRESENCE,
        Contacts.PHOTO_ID,
        Contacts.LOOKUP_KEY,
    };
    public Loader<Cursor> onCreateLoader(int id, Bundle args) {
        // This is called when a new Loader needs to be created.  This
        // sample only has one Loader, so we don't care about the ID.
        // First, pick the base URI to use depending on whether we are
        // currently filtering.
        Uri baseUri;
        if (mCurFilter != null) {
            baseUri = Uri.withAppendedPath(Contacts.CONTENT_FILTER_URI,
                    Uri.encode(mCurFilter));
        } else {
            baseUri = Contacts.CONTENT_URI;
        }

        // Now create and return a CursorLoader that will take care of
        // creating a Cursor for the data being displayed.
        String select = "((" + Contacts.DISPLAY_NAME + " NOTNULL) AND ("
                + Contacts.HAS_PHONE_NUMBER + "=1) AND ("
                + Contacts.DISPLAY_NAME + " != '' ))";
        return new CursorLoader(getActivity(), baseUri,
                CONTACTS_SUMMARY_PROJECTION, select, null,
                Contacts.DISPLAY_NAME + " COLLATE LOCALIZED ASC");
    }

    public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
        // Swap the new cursor in.  (The framework will take care of closing the
        // old cursor once we return.)
        mAdapter.swapCursor(data);
    }

    public void onLoaderReset(Loader<Cursor> loader) {
        // This is called when the last Cursor provided to onLoadFinished()
        // above is about to be closed.  We need to make sure we are no
        // longer using it.
        mAdapter.swapCursor(null);
    }
}

```
