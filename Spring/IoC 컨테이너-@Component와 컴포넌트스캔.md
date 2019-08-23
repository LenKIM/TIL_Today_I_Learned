# @Component와 컴포넌트 스캔

컨포넌트 스캔 주요 기능
-  스캔위치설정
- 필터:어떤애노테이션을스캔할지또는하지않을지 



참고 : https://moonscode.tistory.com/60


스프링 2.5 부터는 **<context:component-scan>** 태그를 추가하면 스프링은 지정한 패키지에

**@Component** 어노테이션이 적용되어 있을경우 클래스를 자동으로 빈으로 등록

**<context:component-scan>** 는 다음과 같이 BeanPostPRocessor를  등록해 줍니다



\- RequiredAnnotaionBeanPostProcessor

\- AutowiredAnnotaionBeanPostProcessor

\- CommonAnnotaionBeanPostProcessor

\- ConfigurationClassPostProcessor



@Component 
- @Repository 
- @Service 
- @Controller 
- @Configuration 

  동작 원리 
- @ComponentScan은 스캔할 패키지와 애노테이션에 대한 정보 
- 실제 스캐닝은 ConfigurationClassPostProcessor라는 BeanFactoryPostProcessor에 의해 처리 됨. 

**펑션을 사용한 빈 등록** 

```java
public static void main(String[] args) {
        new SpringApplicationBuilder()
            .sources(Demospring51Application.class)
            .initializers((ApplicationContextInitializer<GenericApplicationContext>)
applicationContext -> {
} 
```

