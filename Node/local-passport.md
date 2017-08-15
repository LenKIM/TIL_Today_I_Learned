## REST API에서 Local-Passport 사용하기!

참고하면 좋은 사이트 : http://bcho.tistory.com/920

```javascript
//config/passport.js
/**
 * 로컬 인증 방식의 패스포트 사용
 */
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./mysql');

module.exports = function(passport) {

    /**
     * 세션 저장 용도
     */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //used to
    passport.deserializeUser(function (id, done) {
        pool.getConnection().then(conn => {
            const sql = 'SELECT * FROM agent AS as WHERE agent_id =?';
            conn.query(sql, [id]).then( results => {
                console.log(results);
            }).catch(err => {
                done(err);
            })
        })
    });

    /**
     * Local Sign-up 정의
      */
    passport.use('local-signUp', new LocalStrategy({
        usernameField : 'agent_id',
        passwordField : 'password',
        passReqToCallback : true
    },
    function (req, email, password, done) {
        //Find a agent user If email is existed
        pool.getConnection().then(conn => {
            const verifySql = 'SELECT * FROM agent WHERE agent_id =?';
            conn.query(verifySql, [email]).then( results => {
                console.log(results);

                if(results.length){
                    return done({msg : "아이디가 이미 존재합니다."});
                } else {

                    const object = {};
                    object.email = email;
                    object.password = password;

                    const insertSql = 'INSERT INTO agent (agent_id, password, name, register_number, fcm_token) values(?,?,?,?,?)';
                    conn.query(insertSql, [email, password, req.body.name, req.body.register_number, req.body.fcm_token]).then( registrationResults => {
                        console.log(registrationResults);
                        object.id = registrationResults.insertId;
                        console.log("데이터베이스에 회원정보 등록완료");
                        return done(null, object);
                    });
                }
            });
        });
    }));

    /**
     * 로컬 로깅 verify 정의
     */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'agent_id',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
         pool.getConnection().then(conn => {
             const findSql = 'SELECT * FROM agent WHERE agent_id =?';
             conn.query(findSql, [email]).then(oneId => {
                 if(!oneId.length){
                     return done(null, false);
                 }
                 if(!(oneId.password === password)){
                     return done(null,false);
                 }
                 return done(null, oneId);
             });
         }).catch(err => {
             console.log(err);
         });
    }));
};
```
 위의 코드는 Passport 모듈을 사용하기 위해 정의한 Verify Way이다. 이를 활용해 Router에서 인증절차를 밣는다.

```javascript
//router

module.exports = function (app, passport) {

    /**
     * passport 설정
     */
    app.post('/agent/login',
        passport.authenticate('local-login',
        {
            failureFlash: true
        }),
        function (req, res) {
        // TODO 세션 저장 설정
            res.status(202).send({msg:"Success Log-in"})
    });

    app.post('/agent/signup',
        passport.authenticate('local-signUp',
        {
            failureFlash: true
        }), function (req, res) {
            res.status(202).send({msg : "Success Sign-up"})
        });

    app.get('/agent/logout', function (req, res) {
        req.logout();
        res.send({msg : "Logout."})
    })
};

```
 App.js에 작성하는 거보다, 따로 라우터를 빼서 작성하는 것이 좋다고 판단, 이렇게 만들어봤다.


```javascript
var passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

[생략]

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./config/passport')(passport);
require('./routes/Agent/login')(app, passport);

```

passport를 다음과 같이 Express app.js에 활용한다.
