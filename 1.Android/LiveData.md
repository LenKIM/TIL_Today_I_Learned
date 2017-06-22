
#LiveData

Object를 상속받은 추상 클래스 LiveData.

이 아이는 누구인가?

![스크린샷 2017-05-28 오후 12.39.21](http://i.imgur.com/mx6HPtA.png)

LiveData is a data holder class that can be observed within a given lifecycle. This means that an Observer can be added in a pair with a LifecycleOwner, and this observer will be notified about modifications of the wrapped data only if the paired LifecycleOwner is in active state. LifecycleOwner is considered as active, if its state is STARTED or RESUMED. An observer added via observeForever(Observer) is considered as always active and thus will be always notified about modifications. For those observers, you should manually call removeObserver(Observer).

 주어진 라이프사이클 안에서 observe가능한 데이터 홀딩 클래스이다.
이 뜻은, Observer가 LifecycleOwner와 함께 하나의 pair로 더해진다는 말이다. 음.. 덧붙이면 lifecycleFragment를 사용할때, 라이브데이터를 활용하면 LifecycleOwner 이놈과 Observer와 함께 앱에 붙여진다? 뭐 요런말?

이 Observer는 wrapped data가 수정되어졌을때 알려줄 수 이다. 그러나 여기에는 제약조건이 걸리는데, LifecycleOwner가 꼭 활성화되어 있는 상태를 말한다. 활성화되어 있는 상태란, STARTED와 RESUMED 말합니다.

다시말해, observers는 observeForever를 통해 더해지는데, 이는 항상 활성화상태여야하고, 어떤 데이터 수정에 대해 항상 Notigownsek. 이러한 Observer를 위해 너는 꼭, removeObserver(Observer)를 콜해야한다!


An observer added with a Lifecycle will be automatically removed if the corresponding Lifecycle moves to DESTROYED state. This is especially useful for activities and fragments where they can safely observe LiveData and not worry about leaks: they will be instantly unsubscribed when they are destroyed.

observer가 라이프사이클과 함께 더해질 때, 만약 응답하고 있는 라이프사이클이 DESTROYED상태로 이동하고 있다면 자동적으로 지워질 것이다. 이건 액티비티나 프래그먼트를 한테 꽤 유용하다. 메모리 누수를 걱정할 필요없고, 안전하게 LiveData를 활용할 수 있기 때문이다.


In addition, LiveData has onActive() and onInactive() methods to get notified when number of active Observers change between 0 and 1. This allows LiveData to release any heavy resources when it does not have any Observers that are actively observing.

추가적으로, 라이브데이터는 onActive와 onInactive 함수를 가지고 있는데, 많은 활성 Observers들이 0과1이 변경 될 때 변화됨을 알려준다! 이것들은 어떤 무거운 리소스가 릴리스되는것을 허락해준다.

This class is designed to hold individual data fields of ViewModel, but can also be used for sharing data between different modules in your application in a decoupled fashion.

 이 클래스는 MVVM의 각각의 데이터필드를 hold하기 위해 디자인되었으며, 또 이는 다른 모듈들같의 데이터를 공유하기위해서도 사용되어질수 있다.

개발 번역이였지만, 사실 영어가 어려운 말이 없어 이해가능할거라 믿는다. 덧붙여
앞에서 MVC_MVP_MVVM의 개념을 설명한 바 있다. 이 클래스는 MVVM개념과 함께 사용하면 더할나위 좋은 클래스이다.
