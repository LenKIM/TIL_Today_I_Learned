# @Autowire

필요한 의존 객체의 "타입"에 해당하는 빈을 찾아 주입.

https://www.baeldung.com/spring-autowire



- required: 기본값은 true (따라서 못 찾으면 애플리케이션 구동 실패) 

**사용할 수 있는 위치**

- 생성자 (스프링 4.3 부터는 생략 가능) 
- 세터 
- 필드 

# 0. 동작원리

빈 라이프 사이클에서

- BeanPostProcessor
  - 새로 만든 빈 인스턴스를 수정할 수 있는 라이프 사이클 인터페이스
- AutowiredAnnotationBeanPostProcessor extends BeanPostProcessor 
  - 스프링이 제공하는 @Autowired와 @Value 애노테이션 그리고 JSR-330의
    @Inject 애노테이션을 지원하는 애노테이션 처리기



목표

Autowiring을 가능하게 하는 방법

- Bean을 연결하는 다양한 방법
- Bean을 선택적으로 만드는 것
- 잠재적인 예외 시나리오와 함께 @Qualifier주석 사용하여 Bean 충돌을 해결하는 방법



만약 사용하고 싶다면,  annotation-driven injection 방법을 사용하며, *AnnotationConfigApplicationContext* 에 Bean을 저장한다.

```java
@Configuration
@ComponentScan("com.baeldung.autowire.sample")
public class AppConfig {}
```



어노테이션이 발생하기 이전에는 Spring XML을 만들어, `*<context:annotation-config/>*` 이런 식으로 작성합니다.



**사용 위치**

1. **Properties**  

   ```java
   @Component("fooFormatter")
   public class FooFormatter {
    
       public String format() {
           return "foo";
       }
   }
   
   @Component
   public class FooService {
        
       @Autowired
       private FooFormatter fooFormatter;
    
   }
   ```

   이렇게 작성하게 되면 Getter&Setters 가 필요 없어집니다.

   

2. **Setters**  
   the setter method is called with the instance of *FooFormatter* when *FooService* is created:

   ```java
   public class FooService {
    
       private FooFormatter fooFormatter;
    
       @Autowired
       public void setFooFormatter(FooFormatter fooFormatter) {
               this.fooFormatter = fooFormatter;
       }
   }
   ```

   FooFormatter가 의존성 주입이 Setter역할 처럼 알아서 된다.
   
3. **Constructors**

   annotation is used on a constructor, an instance of *FooFormatter* is injected as an argument to the constructor when *FooService* is created:
   
   ```java
   public class FooService {
    
       private FooFormatter fooFormatter;
    
       @Autowired
       public FooService(FooFormatter fooFormatter) {
           this.fooFormatter = fooFormatter;
       }
   }
   ```
   
4. **@Authwired and Optional Dependencies**  

   > Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: 
   > No qualifying bean of type [com.autowire.sample.FooDAO] found ``for` `dependency: 
   > expected at least ``1` `bean which qualifies as autowire candidate ``for` `this` `dependency. 
   > Dependency annotations: 
   > {``@org``.springframework.beans.factory.annotation.Autowired(required=``true``)}

   Bean을 차지 못할 때 나오는 에러로그

   ```java
   public class FooService {
    
       @Autowired(required = false)
       private FooDAO dataAccessor; 
        
   }
   ```

5. Name
   기본적으로 디폴트 Qualifier Value를 사용한다., 그러므로 만약 fooFormatter라는 이름으로 빈 이름을 정의할 경우, 스프링을 알아서 FooFormatter를 매칭하여 주입시킨다.

   ```java
   public class FooService {
        
       @Autowired
       private Formatter fooFormatter;
        
   }
   ```

   

## Autowire Disambiguation

Autowire는 Type에 의해 결정되는데, 만약 2개 이상의 같은 이름의 빈이 존재한다면??

```java
@Component("fooFormatter")
public class FooFormatter implements Formatter {
 
    public String format() {
        return "foo";
    }
}

@Component("barFormatter")
public class BarFormatter implements Formatter {
 
    public String format() {
        return "bar";
    }
}

public class FooService {
     
    @Autowired
    private Formatter formatter;
 
}
```

이럴 경우, FooService class에서 두 개의 Bean이 동일한 것으로 바라보고 다음과 같은 에러를 낸다.  

> Caused by: org.springframework.beans.factory.NoUniqueBeanDefinitionException: ``No qualifying bean of type [com.autowire.sample.Formatter] is defined: ``expected single matching bean but found ``2``: barFormatter,fooFormatter

아래와 같이 처리한다.

```java
public class FooService {
     
    @Autowired
    @Qualifier("fooFormatter")
    private Formatter formatter;
 
}
```



또는 `Custom Qualifier` 를 활용할 수 있는데,

예제를 살펴보면,

```java
@Qualifier
@Target({
  ElementType.FIELD, ElementType.METHOD, ElementType.TYPE, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface FormatterType {
     
    String value();
 
}
```

일단 이렇게 정의하면, FormatterType이 다양한 엘리먼트의 특정한 값으로 구현될 수 있다.

```java
@FormatterType("Foo")
@Component
public class FooFormatter implements Formatter {
 
    public String format() {
        return "foo";
    }
}
```

```java
@FormatterType("Bar")
@Component
public class BarFormatter implements Formatter {
 
    public String format() {
        return "bar";
    }
}
```

일단 어노테이션이 구현되었다면 `Qualifier` annotation은 다음과 같이 활용할 수 있다.

```java
@Component
public class FooService {
     
    @Autowired
    @FormatterType("Foo")
    private Formatter formatter;
  
}
```
