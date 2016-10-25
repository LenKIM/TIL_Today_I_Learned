 아래 글은 조대협님의 블로그에서 발췌하였습니다.

##REST(Representational_safe_transfer)

#Rest의 기본

 *REST*의 기본 요소로 크게 **리소스, 메서도, 메서지** 3가지 요소로 구성
 예를 들어서 "이름이 Terry인 사용자를 생성한다." 라는 호출이 있을때
"사용자"는 생성되는 리소스, "생성한다."라는 행위는 메소드
그리고 '이름이 Terry인 사용자'는 메세지가 된다.

HTTP POST , http://myweb/users/
{
  "users": {
    "name" : "terry"
  }
}
#HTTP 메서드
 POST -> 의미 : Create - Idempotent : No
 GET  -> 의미 : Select - Idempotent : Yes
 PUT  -> 의미 : Update - Idempotent : Yes
 DELETE -> 의미 : Delete - Idempotent : Yes

각각의 메소드는 CRUD메서드와 대응되고,
Idempotent란? 여러번 수행 해도 같은 결과가 나온다는 의미한다.

REST의 리소스는 *명사* 형으로 함을 원칙으로 하자.
그래야 보기 편하다.

 #REST의 특성
1. 유니폼 인터페이스(Uniform Interface)
REST는 HTTP 표준에만 따른 다면, 어떠한 기술이라던지 사용이 가능한 인터페이스 스타일이다. 예를 들어 HTTP + JSON으로 REST API를 정의했다면, 안드로이드 플랫폼이건, iOS 플랫폼이건, 또는 C나 Java/Python이건 특정 언어나 기술에 종속 받지 않고 HTTP와 JSON을 사용할 수 있는 모든 플랫폼에 사용이 가능한 느슨한 결함(Loosely coupling) 형태의 구조이다.

2. 무상태성/스테이트리스(Stateless)
REST는 REpresentational State Transfer 의 약어로 Stateless (상태 유지하지 않음)이 특징 중의 하나이다.
상태가 있다 없다는 의미는 사용자나 클라이언트의 컨택스트를 서버쪽에 유지 하지 않는다는 의미로,쉽게 표현하면 HTTP Session과 같은 컨텍스트 저장소에 상태 정보를 저장하지 않는 형태를 의미한다.
상태 정보를 저장하지 않으면 각 API 서버는 들어오는 요청만을 들어오는 메시지로만 처리하면 되며, 세션과 같은 컨텍스트 정보를 신경쓸 필요가 없기 때문에 구현이 단순해진다.

3. 캐슁 가능(Cacheable)

4. 자체 표현 구조(Self-descriptiveness)

5. 클라이언트 서버 구조 (Client-Server 구조)
