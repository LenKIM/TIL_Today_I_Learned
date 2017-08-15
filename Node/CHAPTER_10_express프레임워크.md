프레임 워크는 제어 역전(Inverse of Control. Ioc)방식으로 개발할수 있게 하는 라이브러리를 의미합니다. 지금까지 살펴본 라이브러리는 모두 '직접 가져와서 내부에 있는 메서드를 호출'하는 방식으로 사용했습니다. 이처럼 '개발자가 호출할 대상을 직접 지정하며 개발하는 것'을 제어라고 부르며 일반적인 라이브러리의 특성입니다.

 그런데 라이브러리가 "일단 기본 구조를 만들어 줄 테니까 개발자님은 제가 요구하는 부분만 작성해주세요"라고 한다면 제어가 역전된 것이며, 이러한 라이브러리를 '프레임워크'라고합니다.

 express 프레임워크 -> express 모듈로 만든 프레임워크입니다. 프로젝트를 손쉽게 만들어주며 기본 뷰 지원 등을 해줍니다.

 development 환경
 production 환경

 # CHAPTER 10 express 프레임워크

 __10.1 설치

손쉽게 설치가능하므로 생략!

sudo npm install -g express-generator@4
[ sudo ] password for USER: 비밀번호 입력

 __10.2 프로젝트 생성 및 설정

실행
```
Lenui-MacBook-Pro:Node len$ express HelloExpress

warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options


   create : HelloExpress
   create : HelloExpress/package.json
   create : HelloExpress/app.js
   create : HelloExpress/public
   create : HelloExpress/public/javascripts
   create : HelloExpress/public/stylesheets
   create : HelloExpress/public/stylesheets/style.css
   create : HelloExpress/public/images
   create : HelloExpress/routes
   create : HelloExpress/routes/index.js
   create : HelloExpress/routes/users.js
   create : HelloExpress/views
   create : HelloExpress/views/index.jade
   create : HelloExpress/views/layout.jade
   create : HelloExpress/views/error.jade
   create : HelloExpress/bin
   create : HelloExpress/bin/www

   install dependencies:
     $ cd HelloExpress && npm install

   run the app:
     $ DEBUG=helloexpress:* npm start
```

 이렇게 하고 위에 install하고 run하면

 Lenui-MacBook-Pro:Node len$ cd HelloExpress && npm install
npm WARN deprecated jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
npm WARN deprecated transformers@2.1.0: Deprecated, use jstransformer
helloexpress@0.0.0 /Users/len/TIL-Today-I-Learned-/Node/HelloExpress
├─┬ body-parser@1.16.1
│ ├── bytes@2.4.0
│ ├── content-type@1.0.2
│ ├── depd@1.1.0
│ ├─┬ http-errors@1.5.1
│ │ ├── inherits@2.0.3
│ │ ├── setprototypeof@1.0.2
│ │ └── statuses@1.3.1
│ ├── iconv-lite@0.4.15
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ ├── qs@6.2.1
│ ├─┬ raw-body@2.2.0
│ │ └── unpipe@1.0.0
│ └─┬ type-is@1.6.14
│   ├── media-typer@0.3.0
│   └─┬ mime-types@2.1.14
│     └── mime-db@1.26.0
├─┬ cookie-parser@1.4.3
│ ├── cookie@0.3.1
│ └── cookie-signature@1.0.6
├─┬ debug@2.6.1
│ └── ms@0.7.2
├─┬ express@4.14.1
│ ├─┬ accepts@1.3.3
│ │ └── negotiator@0.6.1
│ ├── array-flatten@1.1.1
│ ├── content-disposition@0.5.2
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── encodeurl@1.0.1
│ ├── escape-html@1.0.3
│ ├── etag@1.7.0
│ ├─┬ finalhandler@0.5.1
│ │ └─┬ debug@2.2.0
│ │   └── ms@0.7.1
│ ├── fresh@0.3.0
│ ├── merge-descriptors@1.0.1
│ ├── methods@1.1.2
│ ├── parseurl@1.3.1
│ ├── path-to-regexp@0.1.7
│ ├─┬ proxy-addr@1.1.3
│ │ ├── forwarded@0.1.0
│ │ └── ipaddr.js@1.2.0
│ ├── qs@6.2.0
│ ├── range-parser@1.2.0
│ ├─┬ send@0.14.2
│ │ ├─┬ debug@2.2.0
│ │ │ └── ms@0.7.1
│ │ ├── destroy@1.0.4
│ │ └── mime@1.3.4
│ ├── serve-static@1.11.2
│ ├── utils-merge@1.0.0
│ └── vary@1.1.0
├─┬ jade@1.11.0
│ ├── character-parser@1.2.1
│ ├─┬ clean-css@3.4.25
│ │ ├─┬ commander@2.8.1
│ │ │ └── graceful-readlink@1.0.1
│ │ └─┬ source-map@0.4.4
│ │   └── amdefine@1.0.1
│ ├── commander@2.6.0
│ ├─┬ constantinople@3.0.2
│ │ └── acorn@2.7.0
│ ├─┬ jstransformer@0.0.2
│ │ ├── is-promise@2.1.0
│ │ └─┬ promise@6.1.0
│ │   └── asap@1.0.0
│ ├─┬ mkdirp@0.5.1
│ │ └── minimist@0.0.8
│ ├─┬ transformers@2.1.0
│ │ ├─┬ css@1.0.8
│ │ │ ├── css-parse@1.0.4
│ │ │ └── css-stringify@1.0.5
│ │ ├─┬ promise@2.0.0
│ │ │ └── is-promise@1.0.1
│ │ └─┬ uglify-js@2.2.5
│ │   ├─┬ optimist@0.3.7
│ │   │ └── wordwrap@0.0.3
│ │   └── source-map@0.1.43
│ ├─┬ uglify-js@2.8.1
│ │ ├── async@0.2.10
│ │ ├── source-map@0.5.6
│ │ ├── uglify-to-browserify@1.0.2
│ │ └─┬ yargs@3.10.0
│ │   ├── camelcase@1.2.1
│ │   ├─┬ cliui@2.1.0
│ │   │ ├─┬ center-align@0.1.3
│ │   │ │ ├─┬ align-text@0.1.4
│ │   │ │ │ ├─┬ kind-of@3.1.0
│ │   │ │ │ │ └── is-buffer@1.1.4
│ │   │ │ │ ├── longest@1.0.1
│ │   │ │ │ └── repeat-string@1.6.1
│ │   │ │ └── lazy-cache@1.0.4
│ │   │ ├── right-align@0.1.3
│ │   │ └── wordwrap@0.0.2
│ │   ├── decamelize@1.2.0
│ │   └── window-size@0.1.0
│ ├── void-elements@2.0.1
│ └─┬ with@4.0.3
│   ├── acorn@1.2.2
│   └── acorn-globals@1.0.9
├─┬ morgan@1.7.0
│ ├── basic-auth@1.0.4
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ └── on-headers@1.0.1
└── serve-favicon@2.3.2

Lenui-MacBook-Pro:HelloExpress len$ DEBUG=HelloExpress:* npm start

> helloexpress@0.0.0 start /Users/len/TIL-Today-I-Learned-/Node/HelloExpress
> node ./bin/www



이런식으로 나옵니다!!

 결과 화면은

 ![스크린샷 2017-03-01 오전 11.46.22](http://i.imgur.com/A22JVxe.png)

 GET / 200 450.610 ms - 170
GET /stylesheets/style.css 200 6.290 ms - 111
GET /favicon.ico 404 45.539 ms - 1305

```
Lenui-MacBook-Pro:HelloExpress len$ express -e --git Helloexpress

  warning: option `--ejs' has been renamed to `--view=ejs'


   create : Helloexpress
   create : Helloexpress/package.json
   create : Helloexpress/app.js
   create : Helloexpress/.gitignore
   create : Helloexpress/public
   create : Helloexpress/public/javascripts
   create : Helloexpress/public/images
   create : Helloexpress/public/stylesheets
   create : Helloexpress/public/stylesheets/style.css
   create : Helloexpress/routes
   create : Helloexpress/routes/index.js
   create : Helloexpress/routes/users.js
   create : Helloexpress/views
   create : Helloexpress/views/index.ejs
   create : Helloexpress/views/error.ejs
   create : Helloexpress/bin
   create : Helloexpress/bin/www

   install dependencies:
     $ cd Helloexpress && npm install

   run the app:
     $ DEBUG=helloexpress:* npm start
```

 위의 명령은 템플릿 엔진으로 ejs모듈을 사용하는 express 프로젝트를 생성하고, .gitignore파일을 제공한다.

 파일을 뜯어보면,

 - bin폴더는 프로그램의 실행과 관려된 파일이 들어이는 폴더입니다. 이 폴더 내부에 있는 www파일을 실행해서 프레임워크를 실행합니다.
 - public 폴더는 express모듈의 static미들웨어를 사용해 웹 서버에 올라가는 폴더입니다. 이 폴더에 자바스크립트 파일, CSS파일, 그림 파일 등 리소스 파일을 생성합니다.
 - routes 폴더는 페이지 라우트와 관련된 모듈/ index.js와 routes파일이 있음
 - views폴더는 ejs파일 또는 jade파일과 같은 템플릿 파일을 저장하는 공간입니다.
 - 마지막으로 app.js파일은 프로젝트에서 중심이 되는 파일이며 package.json파일은 현재 프로젝트와 관련된 정보와 모듈을 설치하는 데 필요한 내용을 담고 있습니다.

 __10.3 기본 프로젝트

 __10.4 페이지 렌더링

 __10.5 레이아웃 페이지

 __10.6 실행 환경 설정
