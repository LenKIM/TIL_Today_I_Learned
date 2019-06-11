*참고*

[Alternatives 설명 페이지](https://linux.die.net/man/8/alternatives) 

[한글로 된 설명](https://skyoo2003.github.io/post/2017/03/17/what-is-alternatives-command)

`alternatives` (cf, `update-alternatives`)는 심볼릭 링크를 생성, 제거, 관리, 조회할 수 있는 기능을 제공하는 GNU 라이센스의 커맨드라인 툴. 즉, 심볼릭 링크를 통해서 특정 커맨드에 대해 디폴트 버전 혹은 경로를 정의할 수 있다. 다만, Debian 계열의 리눅스에는 `update-alternatives` 명령어만 제공 (perl 언어에 대한 의존성을 제거하기 위해 기존의 `alternatives` 스크립트가 재구현이 되었다고 함)



Cent OS에서 다음 alternatives 테스트.



문제는 클라우데라 매니저가 5.15 Ver. 이 설치되었던 서버에 Uninstall을 하고 나서

6.20 Ver.을 설치하는 과정에서 Uninstall에서 제거되지 않은 심볼링 링크 때문에 alternatives 를 활용하게 됨.



우리가 흔히 사용하는 ls, pwd, cd 은  `root/bin` 에 저장되어 있다.

그리고 그 bin은 `/usr/bin`으로 심볼릭링크가 되어 있다. 그리고 그곳에 들어가면 내가 말한 `alternatives` 가 `/etc/alternatives/...`  를 발견할 수 있을 것이다.

위에서 설명한대로, 리눅스에서 실행파일에 대한 디폴트 버전 혹은 경로를 정의되어 있음을 발견할 수 있다.

```shell
lrwxrwxrwx    1 root root         46 Apr 22 17:08 zookeeper-security-migration -> /etc/alternatives/zookeeper-security-migration
```

그리고, `/etc/alternatives/` 들어가보면 다음과 같은 내용을 볼 수 있다.

```shell
lrwxrwxrwx  1 root root 85 Apr 22 17:08 zookeeper-security-migration -> /opt/cloudera/parcels/CDH-6.2.0-1.cdh6.2.0.p0.967373/bin/zookeeper-security-migration
```

즉, 리눅스에서 어떻게 각 실행파일에 대한 버전관리하는 방법에 대해서 이해할 수 있었다.



이제, 본격적으로 Alternatives에 대한 설명을 해보자.

## 위에 참조된 `한글로 된 설명` 사이트에서 펌왔음을 밝힌다.(env : Cent OS)

## 심볼릭 링크 생성하기 (–install)

`--install` 액션을 통해 심볼릭 링크를 생성할 수 있다. Redhat 기준으로 `alternatives` 는 기본적으로 `/etc/alternatives/<name>` 의 경로에 심볼릭 링크가 생성되고, mode, priority, link, path 에 대한 정보를 `/var/lib/alternatives/<name>` 의 경로에 저장 한다. 심볼릭 링크가 처음 생성되는 경우에는 `<link>`의 경로에 `/etc/alternatives/<name>`에 대한 심볼릭 링크가 생성된다. (`<link>`->`/etc/alternatives/<name>`->`<path>`)

`--slave` 옵션은 위의 마스터 심볼릭 링크에 부수적인 명령어들도 같이 관리할 때 사용한다. 예를 들어, `java` 에 명령에 대한 심볼릭 링크를 생성할 때, `javac`, `javadoc` 등의 부가적인 명령에 대해서도 같이 관리할 수 있다. 때문에 `--slave` 옵션은 여러번 정의할 수 있다.



```
$ alternatives --install <link> <name> <path> <priority> [--slave <link> <name> <path>]*
<link> : 심볼릭 링크의 경로를 입력.
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
<path> : 패키지의 절대 경로를 입력.
<priority> : 링크 그룹 내에서 우선순위 지정. 정수로 입력하며 클 수록 높음.
```

```
# /usr/local/bin/mvn 경로에 메이븐 3.3.3에 대한 심볼릭 링크 생성
$ alternatives --install /usr/local/bin/mvn mvn /usr/lib/apache-maven-3.3.3/bin/mvn 30303
# /usr/local/bin/mvn 경로에 메이븐 3.3.9에 대한 심볼릭 링크 생성
$ alternatives --install /usr/local/bin/mvn mvn /usr/lib/apache-maven-3.3.9/bin/mvn 30309

# 아래의 경로에 심볼릭 링크가 생성된 것을 볼 수 있다.
$ ll /etc/alternatives/mvn
lrwxrwxrwx 1 root root 35 Mar 18 00:34 /etc/alternatives/mvn -> /usr/lib/apache-maven-3.3.9/bin/mvn
$ ll /usr/local/bin/mvn
lrwxrwxrwx 1 root root 21 Mar 18 00:34 /usr/local/bin/mvn -> /etc/alternatives/mvn

# 아래의 경로에 메타 데이터가 저장되는 것을 볼 수 있다.
$ ll /var/lib/alternatives/mvn
-rw-r--r-- 1 root root 109 Mar 18 00:34 /var/lib/alternatives/mvn
$ cat /var/lib/alternatives/mvn
auto
/usr/local/bin/mvn

/usr/lib/apache-maven-3.3.3/bin/mvn
30303
/usr/lib/apache-maven-3.3.9/bin/mvn
30309
```

PS. alternatives에서 관리하는 심볼릭 링크와 메타 데이터의 경로를 변경하고자 하는 경우, `--altdir <directory>`, `--admindir <directory>` 명령 옵션을 활용하면 된다.

```
$ alternatives --altdir /home/user/alternatives --admindir /home/user/alternatives/meta --install /home/user/bin/mvn mvn /usr/lib/maven-3.3.9/bin/mvn 1
```

## 심볼릭 링크 제거하기 (–remove)

`--remove` 액션을 통해 생성한 심볼릭 링크를 제거할 수 있다. 자세히는 `alternatives` 의 메타 데이터에서 제거하게 되며, `<name>`에 해당하는 링크 그룹 내에 연결 가능한 심볼릭 링크가 없다면, `/etc/alternatives/<name>`의 심볼릭 링크와 `/var/lib/alternatives/<name>` 도 같이 소멸. 만약에 다른 대안이 있다면, `alternatives` 는 자동으로 해당 링크로 업데이트 한다.

```
$ alternatives --remove <name> <path>
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
<path> : 삭제할 패키지의 절대 경로를 입력다.
```

```
# mvn 심볼릭 링크 그룹에서 /usr/lib/apache-maven-3.3.9/bin/mvn 에 해당하는 심볼릭 링크 메타 정보 제거
$ alternatives --remove mvn /usr/lib/apache-maven-3.3.9/bin/mvn

# case1) apache-maven-3.3.3/bin/mvn 이 같은 그룹명으로 연결되어 있다면, 해당 경로로 업데이트 된다.
$ ll /etc/alternatives/mvn
lrwxrwxrwx 1 root root 35 Mar 18 00:49 /etc/alternatives/mvn -> /usr/lib/apache-maven-3.3.3/bin/mvn
$ ll /var/lib/alternatives/mvn
-rw-r--r-- 1 root root 67 Mar 18 00:49 /var/lib/alternatives/mvn
$ cat /var/lib/alternatives/mvn
auto
/usr/local/bin/mvn

/usr/lib/apache-maven-3.3.3/bin/mvn
30303

# case2) mvn 심볼릭 링크 그룹 내에서 다른 대안이 없다면, /etc/alternatives/mvn, /var/lib/alternatives/mvn, /usr/local/bin/mvn의 경로의 파일과 링크가 제거된다.
$ ll /etc/alternatives/mvn
ls: cannot access /etc/alternatives/mvn: No such file or directory
$ ll /var/lib/alternatives/mvn
ls: cannot access /var/lib/alternatives/mvn: No such file or directory
$ ll /usr/local/bin/mvn
ls: cannot access /usr/local/bin/mvn: No such file or directory
```

## 자동 모드 설정하기 (–auto)

`--auto` 액션은 `alternatives` 에 등록된 심볼릭 링크를 링크 그룹 내에서 자동으로 선택하도록 설정. `<priority>`가 가장 높은 값으로 설정된 링크를 우선적으로 선택하며, 자동으로 선택된 링크를 제거한 경우 다른 대안의 링크로 연결해주도록 되어 있다.

```
$ alternatives --auto <name>
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
```

```
# mvn 으로 등록된 심볼릭 링크 그룹을 자동 모드로 관리하도록 설정.
$ alternatives --auto mvn

# 메타 데이터에 첫 번째 라인에 'auto' 라고 되어있는 부분을 볼 수 있다.
$ cat /var/lib/alternatives/mvn
auto
/usr/local/bin/mvn

/usr/lib/apache-maven-3.3.3/bin/mvn
30303
/usr/lib/apache-maven-3.3.9/bin/mvn
30309
```

## 수동 모드 설정하기 (–config)

`--config` 액션은 `alternatives` 에 등록된 심볼릭 링크를 링크 그룹 내에서 사용자가 임의로 선택할 수 있는 기능.

```
$ alternatives --config <name>
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
```

```
# 사용자로부터 어떤 명령을 기본적으로 사용할 것인지 입력받는다.
$ alternatives --config mvn

There are 2 programs which provide 'mvn'.

  Selection    Command
-----------------------------------------------
   1           /usr/lib/apache-maven-3.3.3/bin/mvn
*+ 2           /usr/lib/apache-maven-3.3.9/bin/mvn

Enter to keep the current selection[+], or type selection number: 1

# 심볼릭 링크가 변경되는 것을 볼 수 있고, 메타 데이터의 첫 번째 라인에 'manual' 으로 정의된 부분을 볼 수 있다.
$ ll /etc/alternatives/mvn
lrwxrwxrwx 1 root root 35 Mar 18 00:58 /etc/alternatives/mvn -> /usr/lib/apache-maven-3.3.3/bin/mvn
$ cat /var/lib/alternatives/mvn
manual
/usr/local/bin/mvn

/usr/lib/apache-maven-3.3.3/bin/mvn
30303
/usr/lib/apache-maven-3.3.9/bin/mvn
30309
```

## 심볼릭 링크 그룹 확인하기 (–display)

`--display` 액션은 `alternatives` 에 등록된 심볼릭 링크 그룹에 대한 상세 정보를 확인할 수 있다. 마스터/슬레이브 심볼릭 링크에 연결된 명령어 경로, 현재 사용 중인 모드, 현재 선택된 링크와 가능한 다른 링크에 대한 정보 및 심볼릭 링크의 우선순위 값도 확인할 수 있다.

```
$ alternatives --display <name>
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
```

```
# mvn 링크에 대한 패키지 정보 확인
$ alternatives --display mvn
mvn - status is manual.
 link currently points to /usr/lib/apache-maven-3.3.3/bin/mvn
/usr/lib/apache-maven-3.3.9/bin/mvn - priority 30309
/usr/lib/apache-maven-3.3.3/bin/mvn - priority 30303
Current 'best' version is /usr/lib/apache-maven-3.3.9/bin/mvn.

# --auto 설정 후 변경된 mvn 에 대한 mode 확인
$ alternatives --auto mvn
$ alternatives --display mvn
mvn - status is auto.
 link currently points to /usr/lib/apache-maven-3.3.9/bin/mvn
/usr/lib/apache-maven-3.3.9/bin/mvn - priority 30309
/usr/lib/apache-maven-3.3.3/bin/mvn - priority 30303
Current 'best' version is /usr/lib/apache-maven-3.3.9/bin/mvn.
```

## 전체 심볼릭 링크 그룹 확인하기 (–list)

`--list` 는 `alternatives` 에 등록된 모든 심볼릭 링크에 대한 정보를 확인할 수 있다.

```
$ alternatives --list
<name> : alternatives 에서 관리할 심볼릭 링크 그룹명을 입력.
```

```
# 로컬 머신에 등록된 모든 심볼릭 링크 그룹 리스트.
$ alternatives --list
java_sdk_1.8.0	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64
jre_openjdk	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64/jre
jre_1.7.0_openjdk	auto	/usr/lib/jvm/jre-1.7.0-openjdk-1.7.0.131-2.6.9.0.el7_3.x86_64
java_sdk_1.8.0_openjdk	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64
java_sdk_1.7.0	auto	/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.131-2.6.9.0.el7_3.x86_64
mvn	auto	/usr/lib/maven-3.3.9/bin/mvn
java_sdk_openjdk	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64
jre_1.7.0	auto	/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.131-2.6.9.0.el7_3.x86_64/jre
jre_1.8.0	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64/jre
ld	auto	/usr/bin/ld.bfd
javac	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64/bin/javac
java	auto	/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64/jre/bin/java
libnssckbi.so.x86_64	auto	/usr/lib64/pkcs11/p11-kit-trust.so
jre_1.8.0_openjdk	auto	/usr/lib/jvm/jre-1.8.0-openjdk-1.8.0.121-0.b13.el7_3.x86_64
java_sdk_1.7.0_openjdk	auto	/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.131-2.6.9.0.el7_3.x86_64
```