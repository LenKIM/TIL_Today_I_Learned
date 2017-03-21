NOSQL 등장배경

기존 컴퓨팅 시스템 특징
 - 기업 업무가 자동화하고 효율화하는 목적

NoSQL = Not Only SQL

##### 특징
 - NoSQL은 분산형 구조를 띠고 있기 떄문에 분산 시스템의 특징을 그래도 반영하여 대부분 CAP이론을 따름
 - CAP이론이란, 분산 컴퓨팅 환경은 Consistency(일관성), Availability(가용성), Partitioning(부분결함 용인)  
 3가지 특징을 가지고 있으며, 이중 2가지만 만족할 수 있다는 이론


##### 종류
- Key/Value Store
  - 대부분의 NoSQL은 Key/Value 개념을 지원
  - Unique Key에 하나의 Value를 가지고 있는 형태
  - put(key, value), value := get(key) 형태 API사용

- Ordered Key/Value Store
  - 데이터가 내부적으로 Key를 순서로 Sorting되어 저장됨
  - Key아네(column:value)조합으로 된 여러개의 필드를 가지는 구조
  - 대표 제품 : Hbase, Cassandra

- Document Key/Value Store
  - Key/Value Store의 확장된 형태
  - 저장되는 Value의 데이터 타입으로 "Document"라는 구조화된 데이터 타입(JSON, XML, YAML등)을 사용
  - 복잡한 계층구조 표현 가능
  - 제품에 따라 추가 기능(Sorting,Join,grouping)지원

- NoSQL System List
   - Key Value Store : Redis
   - BigTable-style Databases : HBase, Apache Cassandra
   - Document Object : MongoDB
   - Full Text Search Engines : Apache Lucene,
   - Graph Databases: neo4j, FlockDB


##### NoSQL 장점/단점
  **Relational modeling**
  - 전형적으로 가용한 데이터 구조를 기반
  - "내가 가지고 있는 답이 무엇인가?(What answers do I have?)"
  - 데이터 모델 정의 후, 어플리케이션에 맞는 쿼리 개발
  - RDBMS 모델링 기법
    1. 저장하고자 하는 도메인 모델 분석
    2. 개체 간의 관계 식별
    3. 테이블 추출
    4. 테이블을 이용한 쿼리 구현

  **NoSQL data modeling**
  - 어플리케이션 특징적인 데이터 접근 패턴에 따라 모델링
  - "내가 가지고 있는 질문은 무엇인가?(What questions do I have)"
  - 어플리케이션의 필요한 쿼리와 성능을 정의한 이후, 요구 사항에 부합하도록 데이터 모델을 구성
  - NoSQL 데이터 모델링 기법
    1. 도메인 모델 분석
    2. 쿼리 결과 도출
    3. 테이블(데이터 저장 모델)설계

  **NoSQL 모델링 특징**
  - 관계형 데이터베이스 모델링 보다 더 깊은 데이터 구조 및 접근 알고리즘에 대한 이해가 필요함
  - NoSQL쿼리가 실제 몃개의 물리 노드에 걸쳐서 수행되는지에 대한 이해가 있어야 제대로된 쿼리 디자인이 가능함
  - NoSQL 디자인은 DB와 어플리케이션 뿐만 아니라 인프라(네트웤,디스크)에 대한 디자인을 함께 해야함
  - 대부분의 NoSQL DB는 인증이나 인가 체계가 없어서 보안에 매우 취약하기 때문에 별도의 보안 체계를 마련해야 함(방어벽이나 Reverse Proxy등)

  **RDBMS 장점**
  - 범용적이고 고성능
  - 대부분의 경우에 관계형 데이터베이스를 사용하는 것이 안정적
  - 데이터의 일관성을 보증할수 있다(트랜잭션)
  - 한번에 이뤄져야 하는 작업의 경우 데이터불일치 상황을 방지
  - 정규화를 전제로 하고 있기 때문에 업데이트시 비용이 적다(동일 컬럼은 동일 장소에 존재)
  - 데이터베이스 설계시 이미 불필요한 중복이 삭제됨
  - 복잡한 형태의 쿼리도 가능(Join)
  - 이미 성숙한 기술

  **RDBMS 단점**
  - 대량의 데이터 입력처러
  - 테이블의 인덱스 생성이나 스키마 변경시
  - 개발/운영시 컬럼을 확정 짓기 어려운 경우

  **NOSQL 장점**
  - NoSQL은 특정용도로 특화되어있음
  - 그래서 각 NoSQL의 솔루션의 특징을 알 필요가 있음
  - 데이터 분산에 용이
  - 기본적으로 NoSQL의 join연산은 대부분 불가능함
  - 즉 데이터모델 자체가 독립적으로 설계되어 있고 데이터를 여러서버에 분산시키는 것이 용이함
  - 데이터에 대한 캐시가 필요한 경우
  - 배열 형식의 데이터를 고속으로 처리할 필요가 있는 경우
  - 어쨌든 모든 데이터를 저장하고 싶은 경우.
