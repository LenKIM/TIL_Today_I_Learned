##Bundle

#문자열로 된 키와 여러가지의 타입의 값을 저장 하는 일종의 **Map 클래스** 이다.
Android에서 Activity간에 데이터를 주고 받을 때 Bundle 클래스를 사용하여 여러 가지의 데이터를 전송한다.
기본타입인 int, double, long, String 부터 FloatArray, StringArrayList Serializable, Parcelable 구현한 객체를 전송한다.

  1. Bundle 객체가 상태 정보를 저장한다.
  따라서 Bundle icicle에 상태정보들이 저장되고, Application을 실행할때에 혹은 종료했다가 다시 불러올 때 이 Bundle icicle의 상태정보를 불러오게 된다.


  2. savedInstanceState
  "savedInstanceState"란, 이전에 셧다운 된 후에 액티비티가 다시 초기화하는 경우, Bundle은 "onSavedInstanceState(Bundle)" 메스드에 의해 가장 최근에 공급된 데이터(인스턴스)를 포함합니다.

  3. 참고 : http://developer.android.com/reference/android/os/Bundle.html
   참고를 보면 string 값으로 다양하게 묶을 수 있는 값들을 매핑하여 가지고 있다. Parcelable과 Cloneable 인터페이스를 implement 하고 있다.
   이전의 액티비티에서 새로운 액티비티로 전환되었을때 이전 액티비티의 상태에 대한 정보를 Bundle이 가지고 있다고 한다.
   안드로이드는 Bundle을 통해  액티비티간의 데이터 전송 중 int, byte 같은 java의 primitive 자료형을 가지는 객체들을 별도의 작업없이 전송을 할 수 있다.

  4. 액티비티 전환간에 보면 아래와 같은 코드를 볼수 있다.
  Bundle b = getIntent().getExtras();


  5. Intent를 생성하고 그를 통해 액티비티간에 객체를 전달하고 전달받음.
  이때 자료형이 정해져있으면 bundle을 통해 넘기고 받고 할수 있지만, 그외 자료형의 경우 Parcel이나 Parcelable를 통해 넘기고 받아야함.

  - Bundle은 상태/값 등을 저장하기 위한 객체이고
  - Intent는 저장이 아닌 전달하는 수단으로의 객체
   *즉, 포장이사를 하면 박스(Bundle)에 물건을 담고, 트럭(Intent)에 싣고 옮기는 것이라 생각하면된다.*

   ###Intent, Bundle, Parcelable 이 3가지는 모두 Parcelable 을 inherited 한 것이므로 근본적으로는 3가지 모두 공통된 기능을 수행할 수 있습니다.###
