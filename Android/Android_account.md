## Android Account System

안드로이드 계정에 대해 번역을 통해 정리한 적 있지만 실무에서 사용되는 Account에 대해서 정리할 필요를 느꼈다.

일단 Android의 Account를 사용하는 목적은 프라이빗하게 각 계정을 관리 할 수 있다는 것에 있다.

 - 계정을 생성하는 과정
 - 계정을 삭제하는 방법
 - 계정을 업데이트 하는 방법

 +추가 Facebook과 Kakao 소셜 연동까지 합쳐서 한번에 알아보자.


 ### 계정을 생성하는 방법

 관련된 권한들
 ```java
 <!--Account-->
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.MANAGE_ACCOUNTS" />
    <uses-permission android:name="android.permission.AUTHENTICATE_ACCOUNTS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 ```

타 파일에 AUTHENTICATE_ACCOUNTS이와 관련된 내용이 있다.
참고해보면 좋을 듯!

번역에서 커스텀 Account를 만드는 글과 관련해서 번역한 부분이 있는데, 여기서 중요한건
**AbstractAccountAuthenticator** 이다.

보다시피 추상클래스, 꼭 구현해야되는 Class다.
아래의 8개의 함수들을 구현해야 한다.
 - addAccount : Account를 추가할 때 호출해야되는 함수로써, 소셜로그인 이메일로긴등에 활용된다.

 - confirmCredentials : Checks that the user knows the credentials of an account.
 => 유저가 그 계정의 신원을 알고 있는지 체크한다.

 - getAuthToken :  Gets an authtoken for an account.
 => 계정의 AuthToken을 가져옵니다.
 - getAuthTokenLabel : Ask the authenticator for a localized label for the given authTokenType.
 => authenticator에게 로컬에 가지고있는 인증된 토큰을 가진 라벨이 있는가를 묻습니다.
 - updateCredentials : Update the locally stored credentials for an account.
 =>로컬으로 가진 계정의 credentials을 업데이트 합니다.
 - hasFeatures : Checks if the account supports all the specified authenticator specific features.
 => 만약 계정이 모든 특별한 authenticator의 특정 features를 지원가능 한지 체크합니다.
 - getAccountRemovalAllowed : Checks if the removal of this account is allowed.
 => 이 계정을 지울 수 있는지 체크합니다.
 - editProperties :  Returns a Bundle that contains the Intent of the activity that can be used to edit the properties. In order to indicate success the activity should call response.setResult() with a non-null Bundle.
 => 번들을 리턴하는데, 어떤 번들?? 특정 액티비티의 Intent를 포함하는 번들, 그 특정 액티비티는  속성값을 변경하는데 사용될 수 있다. 그 액티비티가 response.setResult()를 call을 성공하는지에 대한 여부를 판단한다.

 위와 같이 8개의 추상클래스에 대한 구현을 실행하고( 사실 더있다... 함수가... )
-------

이게 사실 정확히 용도에 맞게 쓰이는지에 대해서는 의문스럽다. 확실히 알아볼 필요는 있다고 생각든다.

#### 일단 Guest Account를 생성한다면?

```java
public static void createGuest(Context context) {
        AccountManager am = AccountManager.get(context);
        Account guest = new Account(GUEST_USERNAME, context.getString(R.string.account_type));
        am.addAccountExplicitly(guest, null, null);
        BuxiAccount.setUserId(am, guest, GUEST_USERID);
    }

public static void setUserId(AccountManager am, Account account, String userId) {
    am.setUserData(account, BuxiAccount.DATA_USER_ID, userId);
}

public static void setAuthToken(Context context, Account account, String authToken) {
        AccountManager am = AccountManager.get(context);
        am.setUserData(account, DATA_AUTH_TOKEN, authToken);
    }
```

Account를 하나 생성하고, 생성된 Account에 UserId와 authToken을 위와 같이 Key-Value값으로 저장 가능하다. 사실 UserId와 authToken의 값 빼고는 Account에 뭘 더 넣을 수 있을까?? 만약 프라이빗한 거라면 setUserData에 잘 맞쳐서 넣어주면 된다!

조금 더 나아가서 생각해보면... 만약 Facebook 로그인이라고 가정해보자!

```java
public static void facebookLogin(Activity activity, boolean isRestartActivity, String guestId, AccountManagerCallback<Bundle> callback) {
        String accountType = activity.getString(R.string.account_type);
        AccountManager accountManager = AccountManager.get(activity);
        accountManager.addAccount(accountType,
                BuxiAccount.AUTH_TOKEN_TYPE, null,
                new BundleBuilder().put(BuxiAccount.ADD_ACCOUNT_BUNDLE_LOGIN_TYPE, LOGIN_FACEBOOK)
                        .put(IS_RESTART_ACTIVITY, isRestartActivity)
                        .put(ADD_GUEST_ID, guestId).build(), activity, callback, null);
    }
```
저렇게 선언하고 동작시키면, 위에 8가지 함수를 구현한 것중 addAccount부분이 호출되고, Bundle을 통해 전해준 값을 통해 어떤 로그인 타입인지 판별합니다.

이 함수의 끝은 물론 위에 Guest Account만든 것처럼
```java
BuxiAccount.setUserId(am, account, userId);
BuxiAccount.setAuthToken(getContext(), account, authToken);
```

위와같이 끝난다.

 지금 까지 보면 계정을 생성하고 활용하는 방법에 대해서 알아보았습니다.
 많이 복잡하다고 느낄 수 있지만, 계속해서 보면 친숙해지죠 ;)

#### 제거와 업데이트는 한번에.

일단 제거를 하고 업데이트를 해야되는 상황이 발생했습니다.
그리고 저는 아무 생각 없이 AccountManager의 removeAccount 와                                     am.removeAccountExplicitly(account);

활용해 구현을 시도했습니다.

그러나 여기서 문제점이 발생했습니다. SDK 21 이상에서는 Account가 Update가 되었다라는 문구와 함께 한번에 업데이트 되는 반면에 SDK21 미만에서는 Update가 되었음을 보장할 수 없었습니다.

왜냐하면...

```
Many AccountManager methods take AccountManagerCallback and Handler as parameters. These methods return immediately and run asynchronously. If a callback is provided then run(AccountManagerFuture) will be invoked on the Handler's thread when the request completes, successfully or not. The result is retrieved by calling getResult() on the AccountManagerFuture returned by the method (and also passed to the callback). This method waits for the operation to complete (if necessary) and either returns the result or throws an exception if an error occurred during the operation. To make the request synchronously, call getResult() immediately on receiving the future from the method; no callback need be supplied.
```
 이 문구를 정확하게 하나하나하나하나하나 꾹꾹 읽을 필요가 있다
`콜백을 통해 동기적으로 받을 수 있다.` 라는 말이다.

이게 아니면... 비동기적으로 동작한다~~ 이런말, 사실 우리 앱에서는 무조건 동기적이여야 했다. 왜냐하면 계속해서 싱크를 맞쳐주는 부분이 있기 때문이다. 체감상 조금 계정이 변경되는게 보일지라도 그렇게 하는게 맞다.

다시 말해, SDK21이상에서는 제거하고 바로 Account를 만들어주면 Ok
그러나 SDK21미만에서는 업데이트라는 개념보다는 제거하고 생성이라는 개념이다.

끝!

```java
public static Account getFirstAccount(Context context) {
        AccountManager accountManager = (AccountManager) context.getSystemService(Context.ACCOUNT_SERVICE);
        ...생략
        return myAccounts[0];
    }
```
이 함수는 참고 사항!! AccountManager을 활용하려면 처음에 getSystemService을 활용해야 한다!
