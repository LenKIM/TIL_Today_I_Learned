/**
 * 패스포트 기본 설정 파일
 * 
 * 패스포트 설정을 위한 기본 파일로 passport 폴더에 있는 설정 파일들을 사용함
 * serializeUser, deserializeUser 메소드 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');
var facebook = require('./passport/facebook');
var twitter = require('./passport/twitter');
var google = require('./passport/google');

module.exports = function (app, passport) {
	console.log('config/passport 호출됨.');

    // 사용자 인증 성공 시 호출
    // 사용자 정보를 이용해 세션을 만듦
    // 로그인 이후에 들어오는 요청은 deserializeUser 메소드 안에서 이 세션을 확인할 수 있음
    passport.serializeUser(function(user, done) {
        console.log('serializeUser() 호출됨.');
        console.dir(user);

        done(null, user);  // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
    });

    // 사용자 인증 이후 사용자 요청 시마다 호출
    // user -> 사용자 인증 성공 시 serializeUser 메소드를 이용해 만들었던 세션 정보가 파라미터로 넘어온 것임
    passport.deserializeUser(function(user, done) {
        console.log('deserializeUser() 호출됨.');
        console.dir(user);

        // 사용자 정보 중 id나 email만 있는 경우 사용자 정보 조회 필요 - 여기에서는 user 객체 전체를 패스포트에서 관리
        // 두 번째 파라미터로 지정한 사용자 정보는 req.user 객체로 복원됨
        // 여기에서는 파라미터로 받은 user를 별도로 처리하지 않고 그대로 넘겨줌
        done(null, user);  
    });

	// 인증방식 설정
	passport.use('local-login', local_login);
	passport.use('local-signup', local_signup);
	passport.use('facebook', facebook(app, passport));
	passport.use('twitter', twitter(app, passport));
	passport.use('google', google(app, passport));
	console.log('5가지 passport 인증방식 설정됨.');
	
};