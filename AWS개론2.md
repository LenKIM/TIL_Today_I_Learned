EBS
(Elastic Block Store) 일종의 하드디스트.

EBS 와 EC2는 독립적인 존재임!!!

IOPS 초당 인/아웃풋의 속도를 가늠하는 것.

배운다
외운다
써먹는다.

EBS를 생성하고 EC2에 붙여야함.
df /df -h를 통해서 용량 확인가능

sudo mkfs.ext4 /dev/sdf <-명령어를 통해 포맷.

마운트한 볼륨을 추가할 디렉토리를 생성한다. files라는 이름을 사용하고 싶다면 아래와 같이 한다.

sudo mkdir /files;
/files 디렉토리에 볼륨을 마운트하자.

sudo mount /dev/xvdf /files;
df 명령을 입력해서 아래와 같이 디바이스가 추가된 것을 확인한다.

아마존 AMIs란???

Amazon Machine Images EC2인스턴스를 그대로 저장해서 재사용할수있도록 만든것.

private / public / Marketplace로 나눔.


AMIs란?? 인스턴스를 만들고 특히 이는 키를 잃어버렸을때 사용가능

ELB -> Elastic Load Balancing
Elastic Load Balancing의 약자로 시스템에 가해지는 부하를
여러대의 시스템으로 분산해서 규모있는 시스템을 만들 수 있도록 해주는 단일 진입점

성능개선 (Scale up) 이라 불리며 수직확장이라고한다.
부하분산(Scale out) 장애를 해소하기 위한 방법.

하나의 단일 진입점이 받아서 각각의 여러컴퓨터들에게 분산하는 것
이를 Load Balancning이라고 한다.

 ELB의 특징으로는
  - 트래픽 분산
  - 자동 확장
  - 인스턴스의 상태를 자동 감지해서 오류가 있는 시스템은 배제
  - 사용자 세션을 특정 인스터스에 고정
  - SSL 암호화 지원
  - IPv4, IPv6 지원
  - CloudWatch를 통해서 모니터링

 Auto Scaling
 EC2인스턴스의 큐모를 자동으로 확대/축소
 인스턴스의 구모를 변화시키는 다양한 조건
 처리량 증가에 빠르게 대응할 수 있다.
 CLI(Command Line Interface)를 통해서만 제어가능
 이미 만들어진 이미지를 이용해서 인스턴스를 자동으로 생성

 Auto SCaling의 타입
 - 부하에 따라 자동으로 규모 변경
 - 현재의 규모 유지
 - 시간에 따라 변경

 Auto Scaling의 절차

 1. launch configuration설정
  - AMI
  - instance type
 2. Auto Scaling Group 생성
  - ELB
  - 최소/최대 인스턴스의 수량
  - 가용성 존
 3. 정책(Policy) 생성
  - 인스턴스의 추가/제거의 방법과 수량
  - cooldown
 4. Cloud Wath에서 Alarm을 생성하고 정책과 연결


S3 (Simple Storage Service)
파일 서버의 역할을 하는 서비스.

많은 사용자가 접속을 해도 이를 감당하기 위해서 시스템적인 작업을 하지않아도 된다.
저장할 수 있는 파일 수의 제한이 없다,
최소 1바이트엣 최대 5TB의 데이터를 저장하고 서비스 할 수 있다.
파일에 인증을 붙여서 무단으로 엑세스 하지 못하도록 할 수 있다.
HTTP와 BitTorrent프로토콜을 지원한다.
REST,SOAP인터페이스를 제공한다.
데이터를 여러시설에서 중복으로 저장해 데이터의 손실이 발생할 경우 자동으로 복원한다.
버전관리 기능을 통해서 사용자에 의한 실수로 복원이 가능하다.
정보의 중요도에 따라서 보호 수준을 차등 할 수 있고, 이에 따라서 비용을 절감 할 수 있다.

##객체
 Object AWS는 S3에 저장된 데이터 하나하나를 객체라고 명명.

##버킷
 객체가 파일이라면 버킷은 연관된 객체들을 그룹핑한 최상위 디렉토리라고 할 수 있다.

S3 콘솔 사용법


RDS란?
Relational Database Service의 약자로 아마존 웹서비스에서 제공하는 데이터베이스 전용서비스

MySQL, Oracle, SQL Server 전용서비스
설치, 운영, 백업, 모두 인프라에 위임.

특징
1. 다중 AZ복제 (가용성 존)
2. 읽기 복제.
3. 백업자동화
4. DB스냅샷 지원
5. 프로비저닝된IOPS
6. 미리 구성된 매개변수
7. CloudWatch를 이용한 모니터링(무료)
