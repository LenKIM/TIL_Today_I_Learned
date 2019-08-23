# BeanScope

- 싱글톤
- 프로토타입

**web-aware**

- Request
- Session
- WebSocket
- application





프로토타입 빈이 싱글톤 빈을 참조하면?

- 아무 문제 없음



싱글톤 빈이 프로토타입 빈을 참조하면?

- 프로토타입 빈이 업데이트가 안되네?
- 업데이트 하려면
  - scoped-proxy
  - Object-Provider
  - Provider(표준)

![image-20190719085215989](http://ww3.sinaimg.cn/large/006tNc79gy1g54tb0ljyfj30bq06qgls.jpg)

**싱글톤 객체 사용시 주의할 점** 

1. - 프로퍼티가 공유. 
   - ApplicationContext 초기 구동시 인스턴스 생성. 



## Singleton

```java
public class Person {
    private String name;
 
    // standard constructor, getters and setters
}
```

```java
@Bean
@Scope("singleton")
public Person personSingleton() {
    return new Person();
}
```

또는 @Scope에 다음과 같은 주석을 달 수 있다.

```@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)```

```java
private static final String NAME = "John Smith";
 
@Test
public void givenSingletonScope_whenSetName_thenEqualNames() {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("scopes.xml");
 
    Person personSingletonA = (Person) applicationContext.getBean("personSingleton");
    Person personSingletonB = (Person) applicationContext.getBean("personSingleton");
 
    personSingletonA.setName(NAME);
    Assert.assertEquals(NAME, personSingletonB.getName());
 
    ((AbstractApplicationContext) applicationContext).close();
}
```

----

```java
@Component
public class Single {
    
    @Autowired
    private Proto proto;
 
    public Proto getProto() {
        return proto;
    }
 
}
```

```java
@Component 
public class Proto {
}
```

```java
public class AppRunner implements ApplicationRunner {
 
    @Autowired
    Single single;
    
    @Autowired
    Proto proto;
 
    @Override
    public void run(ApplicationArguments args) throws Exception{
        System.out.println(proto);
        System.out.println(single.getProto());
    }   
}
```



## Prtotype Scope

```java
@Bean
@Scope("prototype")
public Person personPrototype() {
    return new Person();
}
```

또는

````@Scope``(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)```

Test

```java
private static final String NAME = "John Smith";
private static final String NAME_OTHER = "Anna Jones";
 
@Test
public void givenPrototypeScope_whenSetNames_thenDifferentNames() {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("scopes.xml");
 
    Person personPrototypeA = (Person) applicationContext.getBean("personPrototype");
    Person personPrototypeB = (Person) applicationContext.getBean("personPrototype");
 
    personPrototypeA.setName(NAME);
    personPrototypeB.setName(NAME_OTHER);
 
    Assert.assertEquals(NAME, personPrototypeA.getName());
    Assert.assertEquals(NAME_OTHER, personPrototypeB.getName());
 
    ((AbstractApplicationContext) applicationContext).close();
}
```



---

```java
@Component
@Scope("prototype")
public class Proto {
}
```

```java
@Component
public class AppRunner implements ApplicationRunner {
 
    @Autowired
    ApplicationContext ctx;
 
    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("프로토 스코프");
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));
        System.out.println("싱글톤 스코프");
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
    }
}
```

