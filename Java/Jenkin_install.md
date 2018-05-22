젠킨스에서 .war 파일을 다운 받아 해당 디렉토리에서

아래와 같은 명령어를 실행한다.

> \>java -jar jenkims.war



```bash
➜  Downloads java -jar jenkins.war
Running from: /Users/len/Downloads/jenkins.war
webroot: $user.home/.jenkins
May 22, 2018 3:21:24 PM Main deleteWinstoneTempContents
WARNING: Failed to delete the temporary Winstone file /var/folders/n0/st9gxlvs75q4jzx2y0dm9bcw0000gn/T/winstone/jenkins.war
May 22, 2018 3:21:24 PM org.eclipse.jetty.util.log.Log initialized
INFO: Logging initialized @586ms to org.eclipse.jetty.util.log.JavaUtilLog
May 22, 2018 3:21:24 PM winstone.Logger logInternal
INFO: Beginning extraction from war file
May 22, 2018 3:21:26 PM org.eclipse.jetty.server.handler.ContextHandler setContextPath
WARNING: Empty contextPath
May 22, 2018 3:21:26 PM org.eclipse.jetty.server.Server doStart
INFO: jetty-9.4.z-SNAPSHOT
May 22, 2018 3:21:26 PM org.eclipse.jetty.webapp.StandardDescriptorProcessor visitServlet
INFO: NO JSP Support for /, did not find org.eclipse.jetty.jsp.JettyJspServlet
May 22, 2018 3:21:26 PM org.eclipse.jetty.server.session.DefaultSessionIdManager doStart
INFO: DefaultSessionIdManager workerName=node0
May 22, 2018 3:21:26 PM org.eclipse.jetty.server.session.DefaultSessionIdManager doStart
INFO: No SessionScavenger set, using defaults
May 22, 2018 3:21:26 PM org.eclipse.jetty.server.session.HouseKeeper startScavenging
INFO: Scavenging every 660000ms
Jenkins home directory: /Users/len/.jenkins found at: $user.home/.jenkins
May 22, 2018 3:21:29 PM org.eclipse.jetty.server.handler.ContextHandler doStart
INFO: Started w.@18e7143f{/,file:///Users/len/.jenkins/war/,AVAILABLE}{/Users/len/.jenkins/war}
May 22, 2018 3:21:29 PM org.eclipse.jetty.server.AbstractConnector doStart
INFO: Started ServerConnector@110506d{HTTP/1.1,[http/1.1]}{0.0.0.0:8080}
May 22, 2018 3:21:29 PM org.eclipse.jetty.server.Server doStart
INFO: Started @6131ms
May 22, 2018 3:21:29 PM winstone.Logger logInternal
INFO: Winstone Servlet Engine v4.0 running: controlPort=disabled
May 22, 2018 3:21:31 PM jenkins.InitReactorRunner$1 onAttained
INFO: Started initialization
May 22, 2018 3:21:31 PM jenkins.InitReactorRunner$1 onAttained
INFO: Listed all plugins
May 22, 2018 3:21:33 PM jenkins.InitReactorRunner$1 onAttained
INFO: Prepared all plugins
May 22, 2018 3:21:33 PM jenkins.InitReactorRunner$1 onAttained
INFO: Started all plugins
May 22, 2018 3:21:33 PM jenkins.InitReactorRunner$1 onAttained
INFO: Augmented all extensions
May 22, 2018 3:21:35 PM jenkins.InitReactorRunner$1 onAttained
INFO: Loaded all jobs
May 22, 2018 3:21:35 PM hudson.model.AsyncPeriodicWork$1 run
INFO: Started Download metadata
May 22, 2018 3:21:36 PM org.springframework.context.support.AbstractApplicationContext prepareRefresh
INFO: Refreshing org.springframework.web.context.support.StaticWebApplicationContext@4180f5d3: display name [Root WebApplicationContext]; startup date [Tue May 22 15:21:36 KST 2018]; root of context hierarchy
May 22, 2018 3:21:36 PM org.springframework.context.support.AbstractApplicationContext obtainFreshBeanFactory
INFO: Bean factory for application context [org.springframework.web.context.support.StaticWebApplicationContext@4180f5d3]: org.springframework.beans.factory.support.DefaultListableBeanFactory@714f3daa
May 22, 2018 3:21:36 PM org.springframework.beans.factory.support.DefaultListableBeanFactory preInstantiateSingletons
INFO: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@714f3daa: defining beans [authenticationManager]; root of factory hierarchy
May 22, 2018 3:21:37 PM org.springframework.context.support.AbstractApplicationContext prepareRefresh
INFO: Refreshing org.springframework.web.context.support.StaticWebApplicationContext@51db8668: display name [Root WebApplicationContext]; startup date [Tue May 22 15:21:37 KST 2018]; root of context hierarchy
May 22, 2018 3:21:37 PM org.springframework.context.support.AbstractApplicationContext obtainFreshBeanFactory
INFO: Bean factory for application context [org.springframework.web.context.support.StaticWebApplicationContext@51db8668]: org.springframework.beans.factory.support.DefaultListableBeanFactory@a272942
May 22, 2018 3:21:37 PM org.springframework.beans.factory.support.DefaultListableBeanFactory preInstantiateSingletons
INFO: Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@a272942: defining beans [filter,legacy]; root of factory hierarchy
May 22, 2018 3:21:37 PM jenkins.install.SetupWizard init
INFO:

*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

-

This may also be found at: /Users/len/.jenkins/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************

May 22, 2018 3:21:44 PM hudson.model.UpdateSite updateData
INFO: Obtained the latest update center data file for UpdateSource default
May 22, 2018 3:21:45 PM hudson.model.UpdateSite updateData
INFO: Obtained the latest update center data file for UpdateSource default
May 22, 2018 3:21:45 PM jenkins.InitReactorRunner$1 onAttained
INFO: Completed initialization
May 22, 2018 3:21:45 PM hudson.UDPBroadcastThread run
INFO: Cannot listen to UDP port 33,848, skipping: java.net.SocketException: Can't assign requested address
May 22, 2018 3:21:45 PM hudson.model.DownloadService$Downloadable load
INFO: Obtained the updated data file for hudson.tasks.Maven.MavenInstaller
May 22, 2018 3:21:45 PM hudson.WebAppMain$3 run
INFO: Jenkins is fully up and running
May 22, 2018 3:21:47 PM hudson.model.DownloadService$Downloadable load
INFO: Obtained the updated data file for hudson.tools.JDKInstaller
May 22, 2018 3:21:47 PM hudson.model.AsyncPeriodicWork$1 run
INFO: Finished Download metadata. 11,659 ms

```



비밀번호는 기억해 놓을 것!! 만약 까먹으면 "{{사용자 계정명/홈}}/.jenkins\secrets\initalAdminPassword" 파일에서 확인할 수 있다.

그 다음 플래그인 설치

![](https://ws3.sinaimg.cn/large/006tNc79gy1frk3n7cgnyj31ke1gab29.jpg)



앗.. 무엇무엇이 설치되는지 놓쳤다.

이후, 이름과 비밀번호 입력



젠킨스 주요기능

\- 형상관리 도구와의 연동

\- 소스 코드 체크아웃

\- 웹 인터페이스

\- 테스트 보고서 생성

\- 빌드 및 테스트 자동화

\- 실행 결과 통보

\- 코드 품질 감시

\- 다양한 인증 기반과 결합한 인증 및 권한 관리

\- 배포 관리 자동화

\- 분산 빌드(마스터 슬레이브)

\- 그루비 스크립트를 이용한 자유로운 잡 스케줄링