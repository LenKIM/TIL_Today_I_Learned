# ApplicationEventPublisher

이벤트 프로그래밍에 필요한 인터페이스 제공. [옵저버 패턴 구현체](https://en.wikipedia.org/wiki/Observer_pattern). 



```java
ApplicationContext extends ApplicationEventPublisher    publishEvent(ApplicationEvent event)
```



![image-20190719131527754](http://ww1.sinaimg.cn/large/006tNc79gy1g550yr6eblj30ks06gq3u.jpg)





이벤트는 프레임 워크에서 간과 된 기능 중 하나이지만보다 유용한 기능 중 하나입니다. 그리고 Spring의 많은 다른 것들과 마찬가지로, 이벤트 발행은 ApplicationContext가 제공하는 기능 중 하나입니다.



간단한 가이드라인은 다음과 같습니다.

- event는 ApplicationEvent를 상속받습니다.(extend)
- publisher는 *ApplicationEventPublisher* object를 주입 받습니다.
- listener은 the *ApplicationListener* interface 을 구현해야 합니다.



이제부터 Custom Event를 만들어 실행시켜보겠습니다.

스프링은 커스텀 이벤트를 create하고 custom event를 디폴트로 할 수 있게 해줍니다. 이는 synchronous로 동작합니다. 이는 몃몃의 장점을 가지고 있습니다. 예를 들면, listener는 publiser의 transaction context에 참여할 수 있습니다.



간단한 Custom Event 코드.

### Event

```java
import org.springframework.context.ApplicationEvent;

public class CustomSpringEvent extends ApplicationEvent {
    private String message;

    public CustomSpringEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
}
```



### Publisher

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class CustomSpringEventPublisher {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void doStuffAndPublishAnEvent(final String message) {
        System.out.println("Publishing custom event. ");
        CustomSpringEvent customSpringEvent = new CustomSpringEvent(this, message);
        applicationEventPublisher.publishEvent(customSpringEvent);
    }
}
```

`Publisher` 에서 Event를 발행하는데, 이때 `@Component` 가 빈에 등록되면서 `ApplicationEventPublisher` 가 publisher되어 동작한다.



### Listener

```java
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class CustomSpringEventListener implements ApplicationListener<CustomSpringEvent> {
    @Override
    public void onApplicationEvent(CustomSpringEvent event) {
        System.out.println("Received spring custom event - " + event.getMessage());
    }
}
```



이렇게 되는데, `doStuffAndPublishAnEvent` 를 실행시키면 이벤트가 발생된다.

그렇다면, 비동기로 실행시키기 위해서는 어떻게 해야될 까???

`@Asnyc`



### Framework Events

스프링 자체에서도 여러 이벤트를 publish할 수 있는데, ApplicationContext는 다양한 프레임 워크 이벤트를 발생시킵니다.

스프링이 제공하는 기본 이벤트 

- ContextRefreshedEvent: ApplicationContext를 초기화 했거나 리프래시 했을 때 발생. 
- ContextStartedEvent: ApplicationContext를 start()하여 라이프사이클 빈들이 시작 신호를 받은 시점에 발생. 
- ContextStoppedEvent: ApplicationContext를 stop()하여 라이프사이클 빈들이 정지 신호를 받은 시점에 발생. 
- ContextClosedEvent: ApplicationContext를 close()하여 싱글톤 빈 소멸되는 시점에 발생. 
- RequestHandledEvent: HTTP 요청을 처리했을 때 발생. 



```java
public class ContextRefreshedListener 
  implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent cse) {
        System.out.println("Handling context re-freshed event. ");
    }
}
```





----

## Generics Support

Generics 하게 이벤트를 발생시킬 수 있는데,

```java
public class GenericSpringEvent<T> {

    private T what;
    protected boolean success;

    public GenericSpringEvent(T what, boolean success){
        this.what = what;
        this.success = success;
    }

    public T getWhat() {
        return what;
    }

    public void setWhat(T what) {
        this.what = what;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
```

와 같이 작성하고,



Publisher도 위와 비슷하게 만든다.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class GenericSpringEventPublisher {

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void doStuffAndPublishAnEvent(final String message) {
        System.out.println("Publishing custom event.");
        GenericStringSpringEvent customSpringEvent = new GenericStringSpringEvent(message, true);
        applicationEventPublisher.publishEvent(customSpringEvent);
    }
}
```



