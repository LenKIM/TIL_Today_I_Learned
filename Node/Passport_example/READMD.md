## 패스포트(Passport)
노드에서 사용할 수 있는 사용자 인증 모듈.
이 모듈은 사용 방법이 간단할 뿐만 아니라 사용자 인증 기능을 독립된 모듈 안에서 진행할 수 있도록 도와줍니다. 특히 익스프레드를 사용할 경우에는 미들웨어로 끼워 넣을 수 있어 몃 가지 간단한 설정만으로도 로그인 기능을 만들 수 있습니다.
패트포트 모듈의 유일한 목적은 클라이언트에서 요청한 인증 정보(아이디나비밀번호)로 사용자 인증을 하는 것입니다. 따라서 인증 이외의 기능은 패스포트 모듈이 아닌 다른 코드에서 담당해야 합니다.

다시말해, 패스포트는 순전히 인증 기능만 담당합니다.

패스포트는 수백 가지의 인증 방식을 제공하는데, 어떤 인증 방식을 사용할 것인지 결정하는 것이
**스트래티지(Strategy)**입니다.

각각의 인증 방식은 각각의 스트래티지(Strategy)로 만들어져 있기 때문에 어떤 스트래티지를 사용하느냐에 따라 인증 방식이 달라집니다.

1. 대표적인 인증방식으로는 데이터베이스에 저장된 사용자 정보와 비교하는 로컬 인증 방식(Local Strategy)

2. 페이스북이나 트위터의 계정을 사용하는 OAuth인증 방식등이 있습니다.

다음은 패스포트 미들웨어를 사용해 웹 서버에서 사용자를 인증하는 방식을 보여줍니다.


웹브라우저에서 사용자 인증을 요청할 때는 단순히 웹 서버의 데이터베이스에 저장된 아이디와 비밀번호를 비교하도록 만들 수도 있고, 페이스북이나 구글의 계정을 사용해서 인증하도록 만들 수도 있습니다. 클라이언트가 인증을 요청하면 웹 서버에 있는 패스포트 모듈은 미리 설정해 둔 인증 방식으로 사용자를 인증한 후 성공하면 사용자 정보를 세선에 저장합니다. 이 세션 정보는 정상적으로 사용자 인증이 되었을 때만 사용할 수 있으므로 로그인 이후의 요청 정보를 처리할 때는 세션 정보를 확인함으로써 사용자가 로그인되었는지 아닌지를 구별할 수 있습니다.

#### 기본 사용 방법

```javascript
router.route('/login').post(passport.authenticate('local',
{
  successRedirect:'/',
  failureRedirect:'/login'
}
  ));
```

 가장 기본의 라우터 객체에 라우팅함수를 등록하는 코드.
 클라이언트에서 POST방식으로 요청하는 요청 패스가 /login일 떄 호출될 함수를 설정

 그럼 실습을 진행해봅시다.

 ![스크린샷 2017-04-06 오후 1.10.05](http://i.imgur.com/XS0k3EJ.png)

 클라이언트에서 보낸 인증 정보를 인증하려면 passport.authenticate()메서드를 호출하면서 동시에 어떤 스트래티지(Strategy)를 사용할지 지정해야 합니다.

 다음과같은 코드처럼!

 ```javascript
 route.route('/login').post(passport.authenticate('local'),
 (req,res) => {
   //인증에 성공했을 때 호출
   //'req.user'는 인증된 사용자의 정보임
   res.redirect('/users/' + req.user.username)
   })
 ```

 위에 local이 인증방식을 결정한다.

 예) 데이터베이스에 저장된 사용자 아이디와 비밀먼호로 인증하는 로컬 인증을 사용한다면 로컬 스트래티지(Local Strategy)를 설정할 떄 이름을 부여하고 그 이름은 authenticate()메서드를 호출할 떄 사용합니다.

 만약 인증에 실패하면 **401 Unauthorized상태** 의 응답이온다.

 그리고 다른 라우팅 함수들은 더 이상 호출되지 않습니다. 만약 인증에 성공했다면 다음 라우팅 함수가 호출되며 req.user속성에 인증된 사용자 정보가 들어 갑니다.

 ```javascript
 //패스포트를 쓰는 가장 일반적인 형태
 route.route('/login').post(passport.authenticate('local',
 {
   successRedirect: '/',
   failureRedirect: '/login'
 }
));
 ```
#### 플래시 메시지와 커스텀 콜백 이해
 리다이렉트를 사용하여 응답을 보낼 떄는 보통 플래시 메시지(Flash Message)를 같이 사용합니다. 플래시 메시지는 상태 메시지를 응답하는 웹 문서 쪽으로 전달하는 용도로 사용되며, 플래시 메모리를 사용하려면 `connect-flash` 외장 모듈을 사용해야 하므로 먼저 명령 프롬프트 창에서 모듈을 설치해야 합니다.

 ```
 npm install connect-flash --save
 ```

  **사용방법은?**
1. 요청 객체의 flash()메소드를 사용할 때 파라미터가 두 개면 플래시 메시지를 설정하는 것
2. 파라미더가 하나면 플래시 메시지를 조회하는 것

```
//플래시 메시지 설정
req.flash('loginMessage', '등록된 계정이 없습니다.');
//플래시 메시지 확인
req.flash('loginMessage')
```

passport.authenticate() 메서드를 호출 할 때 다음처럼 **failureFlash** 옵션을 줄 수있다. 그럼 당연히 인증 실패할때 메세지  전달 받음

```javascript
//패스포트를 쓰는 가장 일반적인 형태
route.route('/login').post(passport.authenticate('local',
{
  successRedirect: '/',
  failureRedirect: '/login'
  failureFlash:true
}
));
```
 이 오류 메시지는 스트래티지를 설정할 때 **검증 콜백(Verify callback)** 이 설정되어 있다면 자동으로 설정됩니다.

 여기서 검증 콜백이란? 인증을 처리하는 함수를 말하는데, 어떤 문제로 인증이 실패했는지 정확하게 알려줍니다.

 만약 플래시 메시지를 직접 응답 웹 문서 쪽으로 전달하고 싶다면 다음과 같이 구체적으로 메시지를 지정할 수 있다.
 ```
passport.authenticate('local', {failureFlash:'유효하지 않는 정보입니다.'});
passport.authenticate('local', {successFlash:'Welcome'});
```

커스텀 콜백

```javascript
route.route('/login').get((req, res, next) {
  passport.authenticate('local', (err,user,info) => {
    if(err) {return next(err);}
    if(!user) {return res.redirect('/login');}
    //패스포트 인증 결과에 따라 로그인 진행
    req.login(user, (err) => {
      if (error) { return next(err);}
      return res.redirect('/users' + user.username);
    });
  })(req,res,next);
});
```
인증이 성공하면 패스포트는 일반적으로 로그인 세션을 만듭니다. 이 세션은 유용하지만 어떤 경우에는 필요하지 않습니다. 예를 들어, API기능을 제공하는 서버의 경우 세션을 유지하지 않고 매 요청마다 인증 정보를 요구하고 매 요청마다 인증을 진행하게 됩니다. 이때는 session옵션을 false로 합니다.

**스트레티지 설정과 검증 콜백**

스트레티지가 어떤 인증방식을 설정할 것인가를 말한다.
위에서 말한 것처럼
1. 로컬인증방식
2. OAuth나 OpenID와 같은 인증방식이있다.

1. 로컬인증방식을 사용해봅시다.
로컬인증을 위해서는 `passport-local`을 설치해야한다.

다음 코드는 로컬 인증 방식인 LocalStrategy 객체를 사용하는 전형적인 코드
```javascript
 const passport = require('passport')
 const LocalStrategy = require('passport-local').Strategy;

 passport.use(new LocalStrategy(
   function(username, password, done) {
     UserModel.findOne({username: username}, (err, user) => {
       if (err) { return done(err);}
       if(!user){
         return done(null, false, {message:'Incorrect username'});
       }
       if(!user.vaildPassword(password)){
         return done(null, false, {message:'Incorrect username'});
       }
       return done(null, user);
     });
   }
 ));
```

위와같이 use()메소드를 사용하면 스트래티지를 설정할 수 있다. 여기에서는 로컬 인증 방식으로으로 설정하기 위해 LocalStrategy를 사용했으며 콜백 함수로 전달되는 username과 password파라미터는 클라이언트로부터 전달받은 요청 파라미터입니다.

스트래티지를 설정할 때는 검증 콜백(verify callback)에서 인증 결과를 처리,
 이 검증 콜백의 목적은 인증 정보(Credential)들을 가지고 있는 사용자를 찾아내느 것이며 클라이언트가 보내 온 요청 파라미터들을 사용해 찾아내는 과정.

 그 결과를 **done** 메서드를 호출하여 알려줍니다. 그래야 authenticate()메소드를 호출하는 쪽에서 성공인지 실패인지 결과를 받아볼 수 있습니다.

 ![KakaoTalk_Photo_2017-04-06-14-01-28_15](http://i.imgur.com/Miee4gz.jpg)
done 메서드 호출방식

찾아낸 사용자 정보가 유효하다면 검증 콜백은 done메소드를 호출하여 패스포트에게 인증된 사용자 정보를 제공합니다.
 `return done(null, user);`

인증 정보가 유효하지 않다면 done메소드를 호출할때 user객체 대신 false를 파라미터로 전달합니다.
 `return done(null, false);`

인증에 실패했을 때 실패 원인을 알려주는 info메시지를 추가로 전달 할 수 있습니다. 이 정보는 사용자가 재시도하도록 플래시 메시지를 보여주는데 사용
 `return done(null, false, {message:'비밀번호가 맞지 않습니다.'});`

인증 정보를 검증하는 과정에서 예외가 발생하면 done메소드는 error객체를 파라미터로 전달하면서 호출되어야 합니다.
 `return done(err);`
