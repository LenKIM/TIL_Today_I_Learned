
 Fragment 라이프사이클 제대로 이해하기.

참고 -  http://i5on9i.blogspot.kr/2013/08/fragment-life-cycle.html

 일단 Fragment는 절대 혼자 호출 될수 없다.
 즉슨, 액티비티가 필요하다라는 말!

  그러므로,
  1. 처음에 Activity를 만들기 시작하고.
  2. fragment inflate를 하고
  3. fragment를 activity에 Attach 하고
  4. fragment 를 만들기 시작한다.
  5. fragment 가 가지고 잇는 view를 만들기 시작
  6. view state 복원

  1. activity가 create하기 시작하면서 (Activity.onCreate)
  2. activity안의 fragment를 inflate(Fragment.onInflater())
  3. 이 inflate한 녀석이 activity에 붙여지고 나서,(Fragment.onAttach())
  4. 부모가 없는 Fragment(최상위 fragment)가 Activity에 attach됐다고 알린다.(Activity.onAttach)
  5. fragment가 create가 시작되고(Fragment.onCreate)
  6. fragment안의 view를 만들기 시작한다.(Fragment.onCreateView())
  7. 이 과정이 끝나면 activity의 create가 끝(Fragment.onActivityCreate())
  8. 그리고 나면, 이제 View가 가지고 있던 State를 복원하기 시작한다.(Fragment.onViewStateRestored())

  코드 상으로는.

  1. Activity.onCreate()
handleLaunchActivity() > performLaunchActivity() > callActivityOnCreate() > performCreate() > onCreate()
 2. Fragment.onInflate()
Activity.onCreate() > setContentView > inflate() > onCreateView()  > onInflate()
 3. Fragment.onAttach()
Activity.onCreate() > setContentView > inflate() > onCreateView() > addFragment() > moveToState() > Fragment.INITIALIZING > onAttach()
 4. Activity onAttachFragment()
Activity.onCreate() > setContentView > inflate() > onCreateView() > onCreateView() > addFragment() > moveToState() > Fragment.INITIALIZING > onAttachFragment()
 5. Fragment.onCreate()
onCreate() > setContentView > inflate() > onCreateView() > addFragment() > moveToState() > Fragment.INITIALIZING > performCreate() > onCreate()
 6. Fragment.onCreateView()
onCreate() > setContentView > inflate() > onCreateView()  > addFragment() > moveToState() > Fragment.INITIALIZING > performCreateView() > onCreateView()
 7. Fragment.onActivityCreated()
handleLaunchActivity() > performLaunchActivity() > callActivityOnCreate() > performCreate() > dispatchActivityCreated() > moveToState() > Fragment.CREATED > performActivityCreated() > onActivityCreated()
 8. Fragment.onViewStateRestored()
handleLaunchActivity() > performLaunchActivity() > callActivityOnCreate() > performCreate() > dispatchActivityCreated() > moveToState() > Fragment.CREATED > restoreViewState > onViewStateRestored()


> Fragment lifecycle

![enter image description here](http://1.bp.blogspot.com/-alsEGBPKozk/UhNF6m84yMI/AAAAAAAAGkA/G2QBfmXV3dQ/s1600/fragment_lifecycle.png)

> Activity lifecycle

![enter image description here](http://4.bp.blogspot.com/--QW80VNeKxY/UsNzLPNXxDI/AAAAAAAAHLg/_ghAoAZ_4_0/s1600/activity_lifecycle2.png)


![enter image description here](http://4.bp.blogspot.com/-9r-QF8YtH_w/VPq9x71A3XI/AAAAAAAAIJ8/tT8DD29nNPo/s1600/11.png)
