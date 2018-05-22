Teminal에서 java -version 명령어를 사용하였을 때 출력되는 자바 버전을 바꿀려면 여러가지 방법이 있지만 한줄로 바로 바꿔주는 명령어을 찾았다.

**export JAVA_HOME="\`/usr/libexec/java_home -v '1.8\*'`"**

위 명령어를 터미널에 입력하면 mac에서 실행되는 자바 버전이 1.8버전으로 바뀐다.

단 자바 JDK 버전이 설치가 되어 있어야 한다.

1.7로 바꾸고 싶다면

**export JAVA_HOME="\`/usr/libexec/java_home -v '1.7\*'`"**

로 명령어를 사용하면 된다.

java -version 명령어로 확인해보면 바뀐 자바 버전이 보일 것이다. 