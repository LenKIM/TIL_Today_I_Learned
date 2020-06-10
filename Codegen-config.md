

# Codegen-config



`docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli config-help -l spring`



CONFIG OPTIONS

**sortParamsByRequiredFlag**
Sort method arguments to place required parameters before optional parameters. (Default: true)

\>  선택적 매개 변수 앞에 필요한 매개 변수를 배치하려면 메소드 인수를 정렬하십시오.


**ensureUniqueParams**
Whether to ensure parameter names are unique in an operation (rename parameters that are not). (Default: true)

\> operation에서 매개 변수 이름이 고유한지 여부 (매개 변수 이름 바꾸기)

**allowUnicodeIdentifiers**
boolean, toggles whether unicode identifiers are allowed in names or not, default is false (Default: false)

\> boolean, 유니 코드 식별자의 이름 허용 여부를 토글합니다. 기본값은 false입니다.

**modelPackage**
package for generated models



**apiPackage**
package for generated api classes



**invokerPackage**
root package for generated code



**groupId**
groupId in generated pom.xml



**artifactId**
artifactId in generated pom.xml



**artifactVersion**
artifact version in generated pom.xml

**artifactUrl**
artifact URL in generated pom.xml

**artifactDescription**
artifact description in generated pom.xml

**scmConnection**
SCM connection in generated pom.xml

**scmDeveloperConnection**
SCM developer connection in generated pom.xml

**scmUrl**
SCM URL in generated pom.xml

**developerName**
developer name in generated pom.xml

**developerEmail**
developer email in generated pom.xml

**developerOrganization**
developer organization in generated pom.xml

**developerOrganizationUrl**
developer organization URL in generated pom.xml

**licenseName**
The name of the license

**licenseUrl**
The URL of the license

**sourceFolder**
source folder for generated code


**localVariablePrefix**
prefix for generated code members and local variables

**serializableModel**
boolean - toggle "implements Serializable" for generated models (Default: false)

**bigDecimalAsString**
Treat BigDecimal values as Strings to avoid precision loss. (Default: false)

**fullJavaUtil**
whether to use fully qualified name for classes under java.util. This option only works for Java API client (Default: false)



**hideGenerationTimestamp**
hides the timestamp when files were generated

**withXml**
whether to include support for application/xml content type and include XML annotations in the model (works with libraries that provide support for JSON and XML) (Default: false)



**dateLibrary**
Option. Date library to use

​	java8-instant - Java 8 using Instant
​	joda - Joda (for legacy app only)
​	legacy - Legacy java.util.Date (if you really have a good reason not to use threetenbp
​	java8-localdatetime - Java 8 using LocalDateTime (for legacy app only)
​	java8 - Java 8 native JSR310 (preferred for jdk 1.8+) - note: this also sets "java8" to true
​	threetenbp - Backport of JSR310 (preferred for jdk < 1.8)

**java8**
	Option. Use Java8 classes instead of third party equivalents
		true - Use Java 8 classes such as Base64
		false - Various third party libraries as needed


**disableHtmlEscaping**
Disable HTML escaping of JSON strings when using gson (needed to avoid problems with byte[] fields) (Default: false)

**title**
server title name or client service name



**configPackage**
configuration package for generated code

**basePackage**
base package (invokerPackage) for generated code

**interfaceOnly**
Whether to generate only API interface stubs without the server files. (Default: false)

**delegatePattern**
Whether to generate the server files using the delegate pattern (Default: false)

**singleContentTypes**
Whether to select only one produces/consumes content-type by operation. (Default: false)

**java8**
use java8 features like the new date library (Default: false)

**async**
use async Callable controllers (Default: false)

**responseWrapper**
wrap the responses in given type (Future,Callable,CompletableFuture,ListenableFuture,DeferredResult,HystrixCommand,RxObservable,RxSingle or fully qualified type)

**useTags**
use tags for creating interface and controller classnames (Default: false)

**useBeanValidation**
Use BeanValidation API annotations (Default: false)

**implicitHeaders**
Use of @ApiImplicitParams for headers. (Default: false)

**swaggerDocketConfig**
Generate Spring Swagger Docket configuration class. (Default: false)

**useOptional**
Use Optional container for optional parameters (Default: false)

**generateForOpenFeign**
Generate for usage with OpenFeign (instead of feign) (Default: false)



**defaultInterfaces**
Generate default implementations for interfaces (Default: true)

**library**
	library template (sub-template) to use (Default: spring-boot)
		spring-boot - Spring-boot Server application using the SpringFox integration.
		spring-mvc - Spring-MVC Server application using the SpringFox integration.
		spring-cloud - Spring-Cloud-Feign client with Spring-Boot auto-configured settings.







2가지.

serviceloader imf

defaultgenerator

머지터치- 디폴트코드젠을 통해서 하나의 언어에 따른 템플릿 생성.



main/ 아래 generated



//

meta 를 통해 만드는 것 / tempalate 를 통해 만들어지는 것 의 차이와 과정

서브 모듈 만들어서 하는 부분이 맞는지? 시메트릭한 부분으로 맞는지?

lang을 하나 넣었음- 그럼 어떻게 mustache에 값을 넘겨주는가? 그 과정을.

lang이 가지고 있는 confighelper는 어떻게 나오는건가?



run하기전에 config가 어떻게 만들어 지는가?



새로운 량을 만들고싶다면- 어떻게 해야되는가?



너무 tasks가 많으면 쪼개서 어디서부터 어디까지 해야되는지 말해주기.





generator