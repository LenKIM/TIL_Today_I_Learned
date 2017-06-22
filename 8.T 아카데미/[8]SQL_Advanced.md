학습목표
1. 대형 데이터베이스 구축기술

## 대형 데이터베이스 구축기술

- 데이터는 계속 늘어남
=> 한 대의 DBMS서버로는 처리능력의 한계
- 성능 업그레이드
-> HDD => SSD => 인 메모리 머신

#### VLDB(Very Large DBMS)

- 샤딩(Sharding)
    - DBMS 내용 분할(DB/테이블)
    - 쓰기(Write)성능 향상
- 복제(Replication)
    - 동일한 DBMS를 여러 개 유지(마스터/슬레이브)
    - 읽기(Read)성능 향상

----
**스케일업(Scale-up)**
- 보통 말하는 업그레이드를 말함
- CPU 클럭속도 증가, 코어 수 증가, 메모리 증가
- 보통 성능증가에 비해 가격증가가 더 빠름 => 비용부담
- 병렬컴퓨팅(Parallel computing)/전용 네트워크
- Tiglely-Coupled System

**스케일아웃(Scale-out)**
- 동일한 서버/DBMS를 병렬로 구축
- 분산컴퓨팅(Distributed Computing)
- Loosely Coupled System -> 상대적으로 저렴
- 노드 수 추가하여 계속 성능 향상 가능/효율은 상대적으로 떨어짐
