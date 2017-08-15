## Dagger2 Tutorial.

http://antonioleiva.com/dependency-injection-android-dagger-part-1/


DI라 불리는 의존성 주입 왜 필요한가? 튜트리얼을 들어가기 앞서 왜 사용해야 하는가에 대해서 넘겨 집고 갈 필요가 있다.

 의존성 주입에 대해 가장 중요한 건
 `Inversion of Control`의 원리를 사용하는 것.

 `Inversion of Control`은 앱의 흐름을 프로그램이 실행하는 동안 생성된 객체 그래프에 의존하게 합니다. 추상화를 통해 정의된 객체들의 상호작용에 의해 동적인 흐름이 가능해집니다. 의존성 주입 혹은 Service locator 같은 방식으로 런타임 바인딩이 됩니다.

 의존성 주입에는 다음과 같은 장점이 있습니다.

 - 의존성은 외부에서 주입되고 환경설정되고 재사용할 수 있습니다.
 - 추상화된 것을 주입할때, 많은 코드를 바꿀 필요없고 해당 객체의 구현만 변경하면 됩니다. 주입되는 객체는 고립되있고(isolated)분리되어 있습니다.(decoupled)

 - 의존성은 컴포넌트에 주입될 수 있습니다. 테스트를 쉽게하기 위해 의존성에 맞게 Mock을 구현해서 주입할 수 있습니다.

 우리는 생성된 인스턴스의 스코프를 다룰 수 있습니다. 그리고 개발자 관점에서 볼 때 앱의 객체들은 인스턴스의 생성과 생명주기에 대해 전혀 알 필요가 없습니다. 그것들은 DI프레임워크에서 알아서 해주기 때문입니다.

![스크린샷 2017-05-05 오후 2.18.42](http://i.imgur.com/1DP3V7O.png)


###JSR-330이란?
[Dependency Injection for java](https://jcp.org/en/jsr/detail?id=330)는 재사용 확대, 자바 코드의 테스트 가능성과 유지 가능성을 위해 표준 어노테이션들을 정의했습니다. Dagger1과 2 모두 이 표준을 사용해서 일관성을 유지하고, 의존성 주입의 표준 방법을 제공합니다.

### Dagger1

이는 많은 기능을 제공하고 안드로이드에서 가장 인기있는 의존성 주입 프레임워크입니다. Dagger1은 Guice에 영감을 받아 Square에서 만들었습니다.

리플렉션 기능을 사용하는데,

 `Dagger2`부터 이 기능을 전혀 사용하지 않고, 컴파일 타임에 검사합니다. 쉽게 디버깅 할 수 있고 추적 가능합니다.


## Dagger2
의존성 주입의 기본 원리와 아래의 어노테이션 각각의 컨셉을 아는 것이 매우 중요합니다.

- @Inject
이 어노테이션은 의존성을 요청합니다. 의존성 주입을 통해서 해당 어노테이션이 달린 클래스나 필드에게 값을 주입해 달라고 Dagger에게 요청합니다. Dagger는 어노테이션이 달린 클래스의 인스턴스를 생성하고 그것들의 의존성을 만족시킵니다.

- @Module
모듈들은 의존성을 제공하는 메서드들을 가진 클래스입니다.
의존성을 제공하는 클래스를 정의하고 @Module 어노테이션을 달아줍니다. 그러면 Dagger는 클래스 인스턴스를 만들 때 의존성을 만족시키기 위한 정보를 찾을 수 있습니다.

- @Provide
모듈 안에서 해당 어노테이션이 달린 메서드를 정의합니다.
해당 어노테이션이 달린 메서드가 Dagger가 어떻게 의존성에 맞게 객체를 만들고 제공하는지 알려줍니다.

- @Component
컴포넌트는 @Inject와 @Module사이 다리이며 의존성을 주입하는 역할을 합니다. 컴포넌트는 미리 정의한 모든 타입의 인스턴스를 줍니다. @Component 어노테이션은 **인터페이스에다만 달아야합니다.** 그리고 컴포넌트를 구성하는 모든 @Module이 달린 클래스목록을 적어야합니다. 컴포넌트에서 사용하는 모듈들 중 하나라도 없다면 컴타일 에러를 만듭니다. 모든 컴포넌트들은 컴포넌드에 포함된 모듈들을 통해 의존성의 범위를 알 수 있습니다.

- @Scope
스코프는 매우 유용하고 Dagger2에서 사용자 정의 어노테이션을 통해 범위를 나누는 명확한 방법입니다. 모든 객체는 자기 자신의 인스턴스를 관리하는 방법에 대해 알 필요가 없습니다. 예를 들어 사용자가 지정한 @PerActivity어노테이션이 달려있는 클래스는 액티비티가 살아 있는 동안 존재합니다. 다시말하자면 객체 범위의 단위를 정의할 수 있습니다.

- @Qualifier
클래스의 유형이 종속성을 식별하기 불충분할 때 사용하는 어노테이션?예를 들어 안드로이드의 경우, 많은 경우 컨텍스트의 다양한 타입이 필요합니다, 그래서 `@ForApplication`, `@ForActivity` 같은 식별자 어노테이션을 정의합니다. 컨텍스트를 주입할 때 이 식별자 어노테이션을 이용해서 Dagger 가 어떤 타입을 제공할지 정해줍니다.

---
 ***의존성 주입을 통해 가독성이 떨어지고 이해할 수 없는 보일러 플레이트 코드를 제거할 수 있습니다***

이를 한번 읽어보기를 권장.
 [Clean_ Architecting_android](https://fernandocejas.com/2014/09/03/architecting-android-the-clean-way/)

```
// All this dependency initialization could have been avoided by using a
// dependency injection framework. But in this case this is used this way for
// LEARNING EXAMPLE PURPOSE.
```

![12](http://i.imgur.com/tAWPA5m.png)

**Application Component**
어플리케이션의 수명이 컴포넌트의 수명입니다. 이것은 AndroidApplciation와 BaseActivity모두에게 주입됨.

```java
@Singleton // Constraints this component to one-per-application or unscoped bindings.
@Component(modules = ApplicationModule.class)
public interface ApplicationComponent {
  void inject(BaseActivity baseActivity);

  //Exposed to sub-graphs.
  Context context();
  ThreadExecutor threadExecutor();
  PostExecutionThread postExecutionThread();
  UserRepository userRepository();
}
```

보다시피 이 컴포넌트에 어플리케이션당 하나의 인스턴스로 제약을 거는 @Singleton 어노테이션을 사용했습니다. Context 클래스와 나머지 클래스들을 공개한 이유가 궁금할 수 있습니다. 이 부분은 Dagger 의 컴포넌트가 어떻게 동작하는지에 대한 중요한 property(클래스 멤버) 입니다: 명시적으로 클래스를 이용하지 않을거라면 모듈로 부터 해당 타입을 공개하지 마시기 바랍니다. 이 경우에는 특별히 하위 그래프에 위의 클래스들을 공개했습니다. 그중 하나를 지우면 컴파일 에러가 발생합니다.

Application Module: 이 모듈은 어플리케이션 생명주기동안 살아있는 객체들을 제공합니다. 즉, @Provide 가 달린 모든 메서드에 @Singleton 스코프를 사용하는 이유입니다.

Activity Component: 액티비티의 생명주기동안 살아있는 컴포넌트입니다.

@PerActivity 는 객체의 수명이 액티비티의 수명을 따를 경우 사용하는 사용자 정의 스코프 어노테이션입니다. 이걸 사용하는 것은 매우 좋은 방법입니다. 다음과 같은 장점들을 가지고 있습니다

---
이론 참조 : https://medium.com/@jason_kim/tasting-dagger-2-on-android-%EB%B2%88%EC%97%AD-632e727a7998

코드 참조 :
https://www.raywenderlich.com/146804/dependency-injection-dagger-2
