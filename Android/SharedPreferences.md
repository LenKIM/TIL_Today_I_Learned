#SharedPreference란?
 안드로이드에서 코딩을 하다보면 앱이 종료되도 값을 저장해 유지해야 할때가 많다.
만약 앞으로 설명해야 할 SharedPreference가 없다면, 파일입출력을 통해서 데이터를 저장을 해야하는 번거로움이 있습니다.
 *파일 입출력 없이 간단한 데이터를 Key,Value로 저장할 수 있다면 쓰기/읽기/가 수월할 것입니다.*
 사용 예로는 안드로이드에서 Setting값을 항상 내가 설정한 값으로 유지해야하는 경우가 있는데, 이때 SharedPreference를 사용하면 문제를 쉽게 해결 할 수 있습니다. 하지만 앱을 제거 후 새로 설치하면 SharedPreference의 값은 초기화 됩니다.

 ##사용법
 SharedPreference는 안드로이드에서만 제공하고 있으며, Context를 통해서 값을 가져올 수 있습니다.
만약에 Activity에서 한다면 바로 getSharedPreferences를 통해서 가져올 수 있습니다. 첫번째 파라미터는 SharedPreference의 이름을 정해줍니다. 여기서 이름은 파일 입출력에서는 파일 이름이라고 생각하면 쉽습니다.
두번째는 Mode 설정

 Mode는 총 3가지

 - MODE_PRIVATE
    해당 앱에서만 접근을 가능하게 해준다.
 - MODE_WORLD_READABLE
 - MODE_WORLD_WRITEABLE
    다른 앱에서 접근이 가능하다.

HOW TO USE

 기록하기 위해서는 SharedPreferences.editor 인스턴스를 얻어야 한다.
 *저장 가능한 데이터 타입*
 - Boolean
 - Integer
 - Float
 - Long
 - String

### 쓰기

  SharedPreferences prefs = Context.getSharedPreferences("PrefName", context.MODE_PRIVATE);
  SharedPreferences.Editor editor = prefs.edit();
  editor.putString(token, text);
  editor.commit();

### 읽기

   SharedPreferences prefs = context.getSharedPreferences("Prefname", context.MODE_PRIVATE);
    String text = prefs.getString(token, "");

### 데이터 삭제하기

 SharedPreferences prefs = context.getSharedPreferences("prefName", Context.MODE_PRIVATE);
 SharedPreferences.Editor editor = prefs.edit();
 editor.remove("prefName");
 editor.commit();


 추가 - 객체 저장하기

### Gson 사용하기.

Gson은 자바객체를 JSON으로 그리고 JSON을 자바 객체로 변환해주는 라이브러리이다.
Gson을 사용하면 한번의 파싱을 통해 JSON에서 곧바로 자바 객체로 또는 그 반대로 간단히 변환할 수 있다.

  //Creating a shared preference
SharedPreferences mPrefs = getSharedPreferences(MODE_PRIVATE);

TO SAVE
 Editor prefsEditor = mPrefs.edit();
 Gson gson = new Gson();
 String json = gson.toJson(Myobject);
 prefsEditor.putString("Myobject", json);
 prefsEditor.commit();

TO RETREIVE
 Gson gson = new Gson();
 String json = mPrefs.getString("MyObject", "");
MyObject obj = gson.fromJson(json, MyObject.class);
