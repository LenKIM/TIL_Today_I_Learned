
키보드 숨기는 방법
1. Manifest.xml에서 숨기는 방법

`android:windowSoftInputMode="stateAlwaysHidden`

2. 메소드
```java
private void hideSoftKeyboard() {
        InputMethodManager imm = (InputMethodManager)getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(edit_Search.getWindowToken(), 0);
    }
```

