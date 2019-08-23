참고 - https://www.baeldung.com/spring-profiles / 백기선의 스프링 프레임웤 핵심기술

#  Profile

: 프로파일과 프로터피를 다루는 인터페이스.

```java
ApplicationContext extends EnvironmentCapable
- getEnvironment()
```

프로파일

- 빈들의 그룹
- Environment​의 역할은 활성화할 프로파일 확인 및 설정 

프로파일 유즈케이스 

- 테스트 환경에서는 A라는 빈을 사용하고, 배포 환경에서는 B라는 빈을 쓰고 싶다. 

- 이빈은 모니터링용도니까 테스트할 때는필요가 없고 배포 할 때만 등록이 되면 

  좋겠다. 

프로파일 정의하기.

- 클래스에 정의
  - @Configuration @Profile("test")
  - @Component @Profile("test")
- 메소드에 정의
  - @Bean @Profile("test")

프로파일 설정하기

- -Dspring.profiles.active="test,A,B"
- @ActiveProfile(테스트용)

프로파일 표현식 

- ! (not) 
- & (and) 
- |(or) 



---

시나리오

오직 개발하는 동안해만 활성화된 빈들을 가지는 것.

```java
@Component
@Profile("dev")
public class DevDatasourceConfig
```

```java
@Component
@Profile("!dev")
public class DevDatasourceConfig
```

