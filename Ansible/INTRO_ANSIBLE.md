출처 : [https://brunch.co.kr/@jiseon3169ubie/1](https://brunch.co.kr/@jiseon3169ubie/1)

# ANSIBLE

ANSIBLE을 이해하기 위해서는 가장 먼저 Continuous Delivery(CD)를 이해할 필요가 있다.

> 위키
>
> Continuous delivery is an automated process that accelerates the release of software and digital services. It allows you to release a new service, a better web page, a bug fix, or a special offer rapidly, and with minimum manual intervention. As it becomes possible to make more frequent small changes, which are far less risky than a few largeones, you get dramatically faster and more focused feedback about whatworks and what doesn't.



- 소프트웨어가 언제든지 릴리즈 될 수 있는 방식으로 소프트웨어를 구축하는 소프트웨어 개발 분야의미.  
  빠르고 지속적으로 가치 있는 소프트웨어를 인도함으로써 고객을 만족시키는 것이다. **어떤 변화가 일어나는 즉시 릴리즈(배포)될 수 있는 환경을 구성하는 것이다.**
- 이를 위해서는 기본적으로 Continuous Integration 및 automated Delivery Pipeline을 구축해야 한다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fqbdivdwxfj30zk0k1nbz.jpg)



**Continuous Integration** 은 중앙 저장소에 지속적으로 코드가 통합되고 테스트되고 배포할 준비가 된다. 이때 코드는 변경 시마다 통합되고, 테스트는 컴파일 시 자동으로 실행되는 것이다.

**Release Automation**는 개발 조직과 오퍼레이션 조직 사이의 브리지 역할을 한다. 개발 조직은 형상관리 서버에 자동화된 트리거 기반의 배치 유닛을 제공한다. 이는 자동화된 가드나 컨디션에 의해 제어된다. 오퍼레이션 조직은 이를 통해, 표준화된 게이트웨이를 쉽게 사용함으로써, 인스톨과 각 컴포넌트들(서버, 데이터베이스, 서비스, 버스 등)을 구성하는 업무를 줄일 수 있다. 애플리케이션 릴리즈 자동화를 통해 배포는 몃 시간이 아니라 몃 분 만에 진행될 것이다.

**Provisioning**은 서버에 코드의 빌드 블록을 자동으로 설치하고 시스템을 구성하기 위해, 서비스 관리 및 오퍼에리션 조직에 의해 사용된다.

CD의 메커니즘을 운영에 까지 확장시켜 구현한 것이 DevOps이다. DevOps의 구현은 환경 구축에서 시작하여 Deploy, release와 같은 작업들을 자동화하는 것에 있으며 이를 실현하기 위한 툴에는 Chef, Puppet, Ansible 등이 있다.

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fqbdq410cdj30pa0620vg.jpg)

> 멱등성(idempotence) 이란?
>
> 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 멱등성(idempotence)이라 한다. Puppet, chef, ansible 등은 모두 이런 특성을 가지고 있다. 쉽게 말해서 rest api의 경우 get, head, put, delete 메소드는 멱등성을 가지고 있다. 그러나 post는 상태를 변화시키기 때문에 멱등성이 없다고 할 수 있다. 즉, 서버에 변화를 주기 때문이다.

>  yaml?
>
> **YAML**은 XML, C, 파이썬, 펄, RFC2822에서 정의된 e-mail 양식에서 개념을 얻어 만들어진 '사람이 쉽게 읽을 수 있는' 데이터 직렬화 양식이다. 2001년에 클라크 에반스가 고안했고, Ingy dot Net 및 Oren Ben-Kiki와 함께 디자인했다.

## WHAT?

 위에서 설명한 것과 같이 Continuous Delivery 도구 중 하나.

### 기본개념

- Playbook

ansible의 환경설정, 배포를 가능케하는 언어.

Remote 서버에 접속해서 무언가를 시행시키는 정책을 기술한다. yaml 문법으로 정책이 기술되어 있으며 좀 더 고급단계에서는 로드벨런서를 모니터링하는 복잡한 환경에서 사용할 수 있도록 한다.

각 playbook은 하나 또는 하나 이상의 'play'를 둔다. play의 목적은 여러 호스트들에 잘 정의된 'role'과 'task'를 매핑하는 역할을 한다.

task는 ansible 모듈의 호출을 의미한다. role을 좀더 편하게 관리하기 위해서 미리 정의된 yaml 파일을 include을 하는 것이 가능하다.

또한 host inventory 파일에 정의된 서버 그룹별로 각각 나누어 provision 할 수 있도록 할 수 있다. 서버당 디렉토리를 나누어 각각의 설정 정보가 정의된 파일을 읽어 설치하게 한다.

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fqbe4hrjkhj309q07y3zg.jpg)

- inventory

리모트 서버에 대한 meta 데이터를 기술하는 파일이다. ansible에서는 inventory 파일에는 yaml을 적용하지 않았다. 기본 파일은 /etc/ansible/hosts을 읽게 하거나, 따로 inventory 파일을 만들고 옵션을 주어 동작하게 할 수 있다.

만약 고정 IP를 가지고 있고, hosts 파일 안에 들어가 있지 않는 서버가 있다면 아래와 같이 설정 파일을 만들수 있다. 이는 테스트 환경을 만들 때 유용하다.

> 192.168.1.50 ansible_ssh_user=vagrant ansible_ssh_port=22

- 명령어 소개 

\- ansible-playbook playbook yaml 파일을 실행한다. 리모트 호스트에 접근하여 특정 명령어를 실행 할 수 있다. Ansible에서는 ad-hoc task 실행이라 한다. Ansible-playbook이 아닌 ansible 명령어를 이용해야 한다.  
만약 에러가 발생하면 verbose 옵션을 주어 자세한 내용을 얻을 수 있다.  

> $ ansible boston ‐i production ‐m command ‐a '/sbin/reboot'

## WHY?

1. SSH로 통신, 빠른 Provision이 가능하다.
2. 추후 상용 환경에서 사용할 때 agent 기반이며 방화멱 이슈, agent 데몬 관리라는 불편한 점이 존재(agent 방식의 장점도 물론 존재한다. 확장서, 대규모 provision을 할 경우 매우 효과적이다. 대신 서버와 통신하는 부분이 고도화되기 때문에 빠르고 간단한 provision을 할 수 없다.)
3. 자동 배포 환경이 쉬워야 한다.
4. 개발 가능성이 높은 오픈소스
5. 멱등성 제공

## HOW?

```
$ brew update
$ brew install ansible

output :=
See: https://docs.brew.sh/Homebrew-and-Python
==> Summary
🍺  /usr/local/Cellar/python@2/2.7.14_3: 4,602 files, 81.8MB
==> Installing ansible
==> Downloading https://homebrew.bintray.com/bottles/ansible-2.5.0.high_sierra.bottle.tar.gz
######################################################################## 100.0%
==> Pouring ansible-2.5.0.high_sierra.bottle.tar.gz
🍺  /usr/local/Cellar/ansible/2.5.0: 11,738 files, 142.8MB
```



## References

[103호_공학_트랜드_Vagreant와 Ansible](http://t1.daumcdn.net/brunch/service/user/17od/file/2f38mqgIEmhkl43nJ4GLBc8c92Q.pdf)

참고 : [ANSIBLE 사이트](https://docs.ansible.com/ansible/devel/scenario_guides/guide_docker.html)



---

![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd84g1eecj31kw0vo1ky.jpg)  
![](https://ws4.sinaimg.cn/large/006tNc79gy1fqd846kksrj31kw0vc1ky.jpg)  

![](https://ws4.sinaimg.cn/large/006tNc79gy1fqd852otdvj31kw0umx6p.jpg)

 



## 어떻게 Ansible 동작되는가?



**MODULES**  
MODULES ARE "TOOLS IN THE TOOLKIT"  
Python, Powershell, or any language Extend Ansible simplicity to entire stack  

**INVENTORY**  

Inventory is a collection of hosts(nodes) against which Ansible can work with  

- Hosts
- Inventory-specific data
- Groups sources
- Static or dynamic

![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd8cdbke4j31bk0wok66.jpg)



## AD-HOC COMMANDS ?

```sh
# Check all my inventroy hosts are ready to be 
# managed by Ansible
$ ansible all -m ping

# run the uptime command on all hosts in the web group
$ ansible web -m command -a "uptime"
# collect and display the discovered for the localhost
$ ansible localhost -m setup
```

처음 연결이 되어 있는지 확인하기 위해서 사용한다.



## HANDLER TASKS

Handlers are special tasks that run at the end of a play if notified by another task.

If a configuration file gets changed notify a service restart task it needs to run

## PLAYS & PLAYBOOKS

Plays are ordered sets of tasks to execute against host selections from your inventory.

A playbook is a file containing one or more plays



![](https://ws1.sinaimg.cn/large/006tNc79gy1fqd99r579oj31g60uenh5.jpg)



name 으로 시작한다. 무슨일이 일어나는지 작성하는 것이 중요

하위레벨의 tasks에도 이름을 선언한다.

Hosts 타켓팅하는 그룹을 작성

vars : 

remote_user: root



인벤토리가 그룹이라고 생각하고, 

Role이라는것은?  특정 동작들을 수행하는 모듈

Playbook?



변수들에 대해서는 학습이 필요함.

apt= 앤시블 자체적으로 있는 변수. => documentary 보고 찾아야 함.



언제나 재사용 가능하게 만드는 것이 Key Point

플레이북안에 tasks와 template

Role이 큰 개념이라면 Task 작은 범위?



Template 

파이썬 JInja? 

인벤토리의 모든 범위에서 실행된다? Hosts: all

Become: true <= sudo 실행.



Role과 Task 차이?
순서대로.



설정을 먼저? 작성을 먼저?

Playbook이 먼저.



VM Control도 가능할 듯.

Swap  물리메모리의 1.5배 정도