

### 커스텀 Account Type을 만드는 것

사실 이걸 본 건 회사 코드에서 처음 발견했다.
그전에 이것 이뭐한른지도 아예 몰랐고 심지어 책에서도 본 적이 없었다.

천천히 한번 살펴보자.

So far we've talked about accessing Google APIs, which use accounts and users defined by Google. If you have your own online service, though, it won't have Google accounts or users, so what do you do? It turns out to be relatively straightforward to install new account types on a user's device. This lesson explains how to create a custom account type that works the same way as the built-in accounts do.


도입 부분인데, 추려서 이야기해보자면, 만약에 소셜로그인 구글같은.. 이 없다면 사용자들은 어떻게 할 것인가?

"해당 서비스의 회원가입을 할 것이다.""라고 Turns out됬다.

이번 강의에서는 어떻게 커스텀 계정타입을 만드는지 설명하고자 한다.

굿굿!
해석이 조금 짫다고 뭐라 하지말자! 나는 내가 중요하다고 생각하는 부분만 읽을테니까.

## Implement Your Custom Account Code
너의 계정 코드를 실행시켜라.

The first thing you'll need is a way to get credentials from the user. This may be as simple as a dialog box that asks for a name and a password. Or it may be a more exotic procedure like a one-time password or a biometric scan. Either way, it's your responsibility to implement the code that:

개요 설명임... 읽던지 말던지.

회원가입과 로그인의 경우 딱 정해져 있다,
1. Collects credentials from the user
유저로부터 정보를 수집하고
2. Authenticates the credentials with the server
서버로 부터 인증을 확인하고
3. Stores the credentials on the device
인증된 신원을 기계에 저장하고 뭐... 자동로그인?

Typically all three of these requirements can be handled by one activity. We'll call this the authenticator activity.

이걸 그냥 authenticator activity라고 합시다아~

Because they need to interact with the AccountManager system, authenticator activities have certain requirements that normal activities don't. To make it easy to get things right, the Android framework supplies a base class, AccountAuthenticatorActivity, which you can extend to create your own custom authenticator.


AccountManager라는 것을 통해 사용자와 상호작용할 수 있고, authenticator activities는 특정 requirements들을 가지고 있다~~

How you address the first two requirements of an authenticator activity, credential collection and authentication, is completely up to you. (If there were only one way to do it, there'd be no need for "custom" account types, after all.) The third requirement has a canonical, and rather simple, implementation:

이것도 그냥 읽으면 될 듯...

이것이 계정을 만드는 방법.

```java
final Account account = new Account(mUsername, your_account_type);
mAccountManager.addAccountExplicitly(account, mPassword, null);
```

## Be Smart About Security!
보안에 좀더 똑똑해져라...

It's important to understand that AccountManager is not an encryption service or a keychain. It stores account credentials just as you pass them, in plain text. On most devices, this isn't a particular concern, because it stores them in a database that is only accessible to root. But on a rooted device, the credentials would be readable by anyone with adb access to the device.

AccountManager를 이해하는 것이 중요한데, 이건 어떤 암호화서비스도 아니고, 키채인도 아니요, 그저 계정 신상을 저장하는 거지! 바로 PlainText!
대부분의 디바이스에서는 큰 특정 걱정거리는 아니지만, 왜냐하면 그것은 디비에 저장할 수 있기 때문이지.
그러나, rooted device에서는 누구나 신상을 readable 할 수 있다.

With this in mind, you shouldn't pass the user's actual password to **AccountManager.addAccountExplicitly().** Instead, you should store a cryptographically secure token that would be of limited use to an attacker. If your user credentials are protecting something valuable, you should carefully consider doing something similar.

이러한 마음으로 너는 절대 비밀번호를 AccountManager.addAccountExplicitly() 요따가 담으면 안되~
대신에 너는 암호학적인 보안토큰으로 저장해야해~ 그러면 공격자에게 제한된 사용을 할 수 있어~

> Remember: When it comes to security code, follow the "Mythbusters" rule: don't try this at home! Consult a security professional before implementing any custom account code.

이런 말이 있음... 전문가랑 상의해서 해라, 집에서 혼장 궁상맞게하지말고,

## Extend AbstractAccountAuthenticator
AbstractAccountAuthenticator 을 상속받아랏!

In order for the AccountManager to work with your custom account code, you need a class that implements the interfaces that AccountManager expects. This class is the authenticator class.

The easiest way to create an authenticator class is to extend AbstractAccountAuthenticator and implement its abstract methods. If you've worked through the previous lessons, the abstract methods of AbstractAccountAuthenticator should look familiar: they're the opposite side of the methods you called in the previous lesson to get account information and authorization tokens.

AccountManager를 활용하고 싶다면~ AbstractAccountAuthenticator 요걸 상속받아서 사용하면 좋다~

Implementing an authenticator class properly requires a number of separate pieces of code. First, AbstractAccountAuthenticator has seven abstract methods that you must override. Second, you need to add an intent filter for "android.accounts.AccountAuthenticator" to your application manifest (shown in the next section). Finally, you must supply two XML resources that define, among other things, the name of your custom account type and the icon that the system will display next to accounts of this type.

AbstractAccountAuthenticator은 적절하게 몃개의 나누어진 코드를 요구할꺼야,

AbstractAccountAuthenticator는 7개의 추상 클래스로 구성되어 있고,
너는 꼭 intent filter를 더해줘야한다~~
like this android.accounts.AccountAuthenticator"


## Create an Authenticator Service

Now that you have an authenticator class, you need a place for it to live. Account authenticators need to be available to multiple applications and work in the background, so naturally they're required to run inside a Service. We'll call this the authenticator service.

이렇게 앞에서 계정을 만들었다면 이제 인증 Service를 만들어야 한다~
```xml
<service ...>
   <intent-filter>
      <action android:name="android.accounts.AccountAuthenticator" />
   </intent-filter>
   <meta-data android:name="android.accounts.AccountAuthenticator"
             android:resource="@xml/authenticator" />
</service>
```

이거 서비스 추가하는거 까먹지말라고 다시한번 상기 시켜줌...
고마움...

## Distribute Your Service
You're done! The system now recognizes your account type, right alongside all the big name account types like "Google" and "Corporate." You can use the Accounts & Sync Settings page to add an account, and apps that ask for accounts of your custom type will be able to enumerate and authenticate just as they would with any other account type.

Of course, all of this assumes that your account service is actually installed on the device. If only one app will ever access the service, then this isn't a big deal—just bundle the service in the app. But if you want your account service to be used by more than one app, things get trickier. You don't want to bundle the service with all of your apps and have multiple copies of it taking up space on your user's device.

One solution is to place the service in one small, special-purpose APK. When an app wishes to use your custom account type, it can check the device to see if your custom account service is available. If not, it can direct the user to Google Play to download the service. This may seem like a great deal of trouble at first, but compared with the alternative of re-entering credentials for every app that uses your custom account, it's refreshingly easy.
