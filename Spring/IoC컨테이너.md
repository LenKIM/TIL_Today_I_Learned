# Ioc(Inversion of Control)

: ***의존 관계 주입*** 

어떤 객체가 사용하는 의존 객체를 직접 만들어 사용하는게 아니라, 주입 받아 사용하는 방법.



## Spring IoC 컨테이너

1. BeanFactory   

```xml
//spring-app.xml
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:util="http://www.springframework.org/schema/util"
  xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util-3.0.xsd">
    <bean id="entitlement" class="com.concretepage.Entitlement">
	    <constructor-arg name="name" value="Hello! My name is Ram"/>
	    <constructor-arg name="time" value="20"/>
    </bean>
</beans> 
```

`3가지 예제가 존재`  

- ClassPathResource   

  ```java
  package com.concretepage;
  import org.springframework.beans.factory.BeanFactory;
  import org.springframework.beans.factory.xml.XmlBeanFactory;
  import org.springframework.core.io.ClassPathResource;
  import org.springframework.core.io.Resource;
  public class BeanFactoryWithClassPathResource {
      public static void main(String... args) {
      	Resource res = new ClassPathResource("spring-app.xml");
          BeanFactory factory = new XmlBeanFactory(res);
      	Entitlement ent = (Entitlement)factory.getBean("entitlement");
          System.out.println(ent.getName());
      } 
  }
  
  ```

- FileSystemResource  

  ```java
  Resource res = new FileSystemResource("src/main/resources/spring-app.xml");
  ```

- ApplicationContext

  ```java
  package com.concretepage;
  import org.springframework.beans.factory.BeanFactory;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;
  public class SpringDemo {
      public static void main(String... args) {
      	ApplicationContext context = new ClassPathXmlApplicationContext("spring-app.xml");
      	BeanFactory factory = (BeanFactory) context;
      	Entitlement ent = (Entitlement)factory.getBean("entitlement");
          System.out.println(ent.getName());
      } 
  } 
  ```

![container magic](https://docs.spring.io/spring/docs/current/spring-framework-reference/images/container-magic.png)



 스프링 컨테이너는 POJO + Configuration Metadata 매직.

- Annotation-based configuration
  - `@Required / @Authwired`
- Java-based configuration
  - `@Configuration / @Bean / @Import / @DependsOn`



2. 애플리케이션 컴포넌트의 중앙 저장소.  

3. 빈 설정 소스로부터 빈 정의를 읽어들이고, 빈을 구성하고 제공  





## Bean ? 

:A Spring IoC container manages one or more beans. These beans are created with the configuration metadata that you supply to the container (for example, in the form of XML`<bean/>` definitions).

- 스프링 IoC 컨테이너가 관리하는 객체
- 장점
  - 의존성 관리
  - 스코프
    - 싱글톤 : 하나
    - 프로토타입: 매번 다른 객체
  - 라이프사이클 인터페이스



**class(필수)**: 정규화된 자바 클래스 이름
**id**: bean의 고유 식별자
**scope**: 객체의 범위 (sigleton, prototype)
**constructor-arg**: 생성 시 생성자에 전달할 인수
**property**: 생성 시 bean setter에 전달할 인수

**init method와 destroy method**

참고 사이트 : https://www.slipp.net/wiki/pages/viewpage.action?pageId=25528177

```java
@Test
public void 싱글톤_빈_확인_테스트() throws Exception {
   Member currentMember1 = applicationContext.getBean(CURRENT_MEMBER, Member.class);
   Member currentMember2 = applicationContext.getBean(CURRENT_MEMBER, Member.class);
   assertNotNull(currentMember1);
   assertNotNull(currentMember2);
 
   System.out.format("bean 1: %s, bean 2: %s\n", currentMember1, currentMember2);
   assertTrue(currentMember1 == currentMember2);
} 
```



### 싱글톤 vs 비싱글톤



### singleton, singleton design pattern

빈의 scope에 대해서 좀 더 알아보기 전에 짚고 넘어가야 할 것이 하나있습니다. 바로, 스프링에서 말하는 singleton은 GoF의 singleton과는 다르다는 점입니다. singleton design pattern은 하드코딩된 객체(classloader)가 singleton 객체를 관리합니다. 따라서, GoF의 singleton pattern은 몇가지 이유로 인해 사용 시 유의해야 하는데요. singleton 객체가 전역변수와 같은 역할 때문에 coupling이 높아 테스트에 어려움이 있고, 애플리케이션의 의존성 측면에서도 singleton 객체를 사용하는 쪽에서 singleton 객체에 대해서 너무 많은 정보를 알아야 한다는 설계상의 문제가 있다는 점 등으로 인해 논쟁이 많기도 합니다.

(참조: [Google Archive: WhySingletonsAreControversial](https://code.google.com/archive/p/google-singleton-detector/wikis/WhySingletonsAreControversial.wiki), [stackoverflow:What-is-so-bad-about-singleton](http://stackoverflow.com/questions/137975/what-is-so-bad-about-singletons))



#### 싱글톤으로 적합한 객체 

1. 상태가 없는 공유 객체: 상태를 가지고 있지 않은 객체는 동기화 비용이 없다. 따라서 매번 이 객체를 참조하는 곳에서 새로운 객체를 생성할 이유가 없다.  
2. 읽기용으로만 상태를 가진 공유 객체: 1번과 유사하게 상태를 가지고 있으나 읽기 전용이므로 여전히 동기화 비용이 들지 않는다. 매 요청마다 새로운 객체 생성할 필요가 없다.   
3. 공유가 필요한 상태를 지닌 공유 객체: 객체 간의 반드시 공유해야 할 상태를 지닌 객체가 하나 있다면,  이 경우에는 해당 상태의 쓰기를 가능한 동기화 할 경우 싱글톤도 적합하다.  
4. 쓰기가 가능한 상태를 지니면서도 사용빈도가 매우 높은 객체: 애플리케이션 안에서 정말로 사용빈도가 높다면, 쓰기 접근에 대한 동기화 비용을 감안하고서라도 싱글톤을 고려할만하다. 이 방법은 `1. 장시간에 걸쳐 매우 많은 객체가 생성될 때`,` 2. 해당 객체가 매우 작은 양의 쓰기상태를 가지고 있을 때`, `3. 객체 생성비용이 매우 클 때`에 유용한 선택이 될 수 있다.  

#### 비싱글톤으로 적합한 객체

1. 쓰기가 가능한 상태를 지닌 객체: 쓰기가 가능한 상태가 많아서 동기화 비용이 객체 생성 비용보다 크다면 싱글톤으로 적합하지 않다.
2. 상태가 노출되지 않은 객체: 일부 제한적인 경우, 내부 상태를 외부에 노출하지 않는 빈을 참조하여 다른 의존객체와는 독립적으로 작업을 수행하는 의존 객체가 있다면 싱글톤보다 비싱글톤 객체를 사용하는 것이 더 나을 수 있다.



request scope  : https://whiteship.tistory.com/1598

각각의 다른 Scope에 대한 설명은 다음 사이트를 참조하기!

https://www.baeldung.com/spring-bean-scopes



### LifeCycle Spring bean

bean에도 라이프사이클이 존재할 것. Bean객체는 Ioc Container안에서 어떻게 생성부터 소멸까지의 단계를 진행할까?

참고 사이트 https://www.slipp.net/wiki/pages/viewpage.action?pageId=25528047



