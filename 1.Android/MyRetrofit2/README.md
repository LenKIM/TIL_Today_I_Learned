Retrofit2


1. Retrofit
1.1. What is Retrofit
Retrofit is a REST Client for Android and Java by Square. It makes it relatively easy to retrieve and upload JSON (or other structured data) via a REST based webservice. In Retrofit you configure which converter is used for the data serialization. Typically for JSON you use GSon, but you can add custom converters to process XML or other protocols. Retrofit uses the OkHttp library for HTTP requests.

### 1.1 Retrofit이란?

안드로이드와 자바를위한 REST Client 이다.
이건 상대적으로 retrieve하고 JSON을 업로드하기 위하여 REST베이스로 쉽게 만들어졌다.

당신은 Retrofit2안에서 데이터를 직렬하기위한 컨벌터를 설정할 수 있고, 전형적으로 JSON위해서, 만약 네가 GSON을 쓴다면, 그것 또한 가능하다. 그러나 너는 커스텀 컨버터를 XML또는 다른 프로토콜에 추가해야한다. 레트로핏은 OKhttp라이브러리를 사용한다. HTTP requests를 할 때.

 1.2. Using Retrofit
To work with Retrofit you need basically three classes.

 - Model class which is used to map the JSON data to

 - Interfaces which defines the possible HTTP operations

 - Retrofit.Builder class - Instance which uses the interface and the Builder API which allows defining the URL end point for the HTTP operation.

Every method of an interface represents one possible API call. It must have a HTTP annotation (GET, POST, etc.) to specify the request type and the relative URL. The return value wraps the response in a Call object with the type of the expected result.

### 1.2 Retrofit 사용하기.
이를 사용하기 위해서는 기본적으로 3가지 클래스가 필요합니다.

1. Model클래스, 이는 JSON data와 맵핑되기 위해 사용됩니다.
2. Interfaces 이는 가능한 HTTP operation을 정의합니다.
3. Retrofit.Builder 클래스, 이 인터페이스와 어떤 URL의 end point를 할지 결정하는 the Builder API를 사용합니다.

인터페이스의 모든 메소드들은 한 가지 가능한 API call를 대표합니다. 이는 반드시 HTTP annotation을 가져야 하며, annotation은 request의 타입과, URL를 명시합니다. 그리고 반환값은 Call object안에서 응답된 response를 wrap하여 보여줍니다.

```java
@GET("users")
Call<List<User>> getUsers()
```

 또한 당신은 대체블럭 또는 쿼리 매개변수를 URL에 적용시킬수 있습니다. A replacement block은 {} 이런식으로 relative URL에 더해지며 메서드 파라미터에 @Path annotation과 함께 도움을 줍니다.

**the value of that parameter is bound to the specific replacement block.**
 이러한 매개변수의 value는 어떤 replacement block인지 확실히 해주어야할 의무가 있습니다.

 ```java
 @GET("users/{name}/commits")
Call<List<Commit>> getCommitsByName(@Path("name") String name)
 ```

Query parameters are added with the @Query annotation on a method parameter. They are automatically added at the end of the URL.

```java
 @GET("users")
Call<User> getUserById(@Query("id") Integer id)
```

The @Body annotation on a method parameter tells Retrofit to use the object as the request body for the call.

```java
@POST("users")
Call<User> postUser(@Body User user)
```

2. Retrofit converters 그리고 adapters

Retrofit은 특정 컨버터들을 사용할 수 있게 설정 가능한데, 이러한 컨버터들은 데이터를 serialization또는 deserialization할수 있게 핸들링해줍니다. 아래와 같은 컨버터

- To convert to and from JSON:

    - Gson: com.squareup.retrofit:converter-gson

    - Jackson: com.squareup.retrofit:converter-jackson

    - Moshi: com.squareup.retrofit:converter-moshi

 - To convert to and from Protocol Buffers:

    - Protobuf: com.squareup.retrofit:converter-protobuf

    - Wire: com.squareup.retrofit:converter-wire

 - To convert to and from XML:

    - Simple XML: com.squareup.retrofit:converter-simplexml

이것들 뿐만아리나, Custom converters를 만들수 있다. 이러한 subclass를 사용해서, converter.Factory class

2.2 Retrofit Adapters

Retrofit can also be extended by adapters to get involved with other libraries like RxJava 2.x, Java 8 and Guava.

레트로핏은 또한 어탭터에 의해서 확장이 가능한데, 이는 RxJava와같은 다른 라이브러리와 깊은 관계가 있다.

예를 들어 Rxjava 2.x adapter를 사용하기 위해서는

```java
compile 'com.squareup.retrofit2:adapter-rxjava2:latest.version'
```

In order to add an adapter the **retrofit2.Retrofit.Builder.addCallAdapterFactory(Factory)** method has to be used.

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.example.com")
    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
    .build();
```

With this adapter being applied the Retrofit interfaces are able to return RxJava 2.x types, e.g., Observable, Flowable or Single and so on.

```java
@GET("users")
Observable<List<User>> getUsers();
```

 3. Retrofit Authentication

 Retrofit은 API call과 함께 인증을 필요로하는 것을 서포트팝니다. 인증은 username과 password를 사용 또는 API TOKEN을 활용하여 끝낼수 있습니다.

 인증에는 2가지 방법이 있는데,

첫번째는 request의 도움 annotation을 활용하여 header를 잘 다루는 것이입니다.
두번째 방법은  OkHttp interceptor를 활용하는 것,

3.1 Authentication with annotations

Assume, that you want to request your user details, which requires you to authenticate. You can do this by adding a new parameter to your API definition, like the following:

```java
@GET("user")
Call<UserDetails> getUserDetails(@Header("Authorization") String credentials)
```

With the help of the @Header("Authorization") annotation you tell Retrofit to add the Authorization field to the request header with the value you provide for credentials.


 이번에는 MyRetrofit에 저장한 내용을 정리한 내용입니다.

 일단 위에서와 같이 레트로핏은 인터페이스를 통해서 서버API와 통신하게 됩니다.

![스크린샷 2017-02-28 오후 7.23.25](http://i.imgur.com/6NUNRJE.png)

 위와 같이 Interfaces를 설정하게 됩니다.

 ```java
public interface GitHubService {

    @GET("repos/{owner}/{repo}/contributors")
    Call<List<Contributor>> repoContributors(
            @Path("owner") String owner,
            @Path("repo") String repo);

    public static final Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://api.github.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
}
```

 여기서 @GET을 주의 깊게 볼 필요가 있습니다.
 '{owner}','{repo}'등을 표현하여 서버에서 부터 가져올 data를 입력할 수 있습니다.
그리고 @Path를 통해 내용을 지정합니다. 어떤 데이터가 올지 말이죠.
@Path("owner") String owner,
@Path("repo") String repo

이런식으로 @Path뒤에 String xxx 이런식으로 매개변수를 지정합니다.

```java
button.setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               GitHubService gitHubService = GitHubService.retrofit.create(GitHubService.class);
               final Call<List<Contributor>> call = gitHubService.repoContributors("square", "retrofit");
               new NetworkCall().execute(call);
           }
       });
```

 서비스를 활용해서 UI업데이트를 할 수 없기때문에(메인스레드에서 UI업데이트가 블로킹되어 있다.)
 그러므로 아래 처럼 어싱크테스크를 타고 UI업데이트를 실시한다.

```java
public class NetworkCall extends AsyncTask<Call, Void, String> {

       @Override
       protected String doInBackground(Call... params) {
           try {
               Call<List<Contributor>> call = params[0];
               Response<List<Contributor>> response = call.execute();

               Log.d("TAG", response.body() + "");
               Log.d("TAG", response.code() + "");
               Log.d("TAG", response.raw() + "");

               return response.body().toString();
           } catch (IOException e) {
               e.printStackTrace();
           }
           return null;
       }

       @Override
        protected void onPostExecute(String result) {
            final TextView textView = (TextView)findViewById(R.id.textView);
            textView.setText(result);
        }
```

```javascript
D/TAG: [JakeWharton (836), swankjesse (192), pforhan (48), eburke (36), dnkoutso (26), edenman (24), loganj (17), rcdickerson (14), rjrjr (13), kryali (9), holmes (8), adriancole (8), NightlyNexus (7), swanson (7), JayNewstrom (6), crazybob (6), Jawnnypoo (6), danrice-square (5), Turbo87 (5), ransombriggs (4), artem-zinnatullin (3), codebutler (3), icastell (3), jjNford (3), f2prateek (3), koalahamlet (3), vanniktech (3), alexgyori (2), benoitdion (2), xian (2)]
D/TAG: 200
D/TAG: Response{protocol=http/1.1, code=200, message=OK, url=https://api.github.com/repos/square/retrofit/contributors}
```

 더욱더 심화된 retrofit를 사용하기 위해 지도맵을 이용한 앱개발해보기(예정)
