
서버 개발 전에

클라우드 이해를 위해서 express를 활용한 구현된 Node.js를 heroku에 배포를 시도해보겠습니다.

그리고 Heroku의 특징들을 정리해 놓은 포스팅을 한번 읽고 시작하기를 권장합니다.

http://bcho.tistory.com/1090

현재 제 TIL에 있는 기본 express 어플리케이션을 Heroku에 배포해보겠습니다 ㅎ

Heroku 툴벳 설치

계정이 준비되고 애플리케이션 개발이 끝났으면, Heroku에 접속해서 배포를 진행해야 한다. Heroku는 툴벳이라는 커멘트라인 인터페이스 (CLI : Command line interface)를 이용해서 사용한다.
툴벳은 https://toolbelt.heroku.com/ 에서 다운로드 받을 수 있다.

다운 받아 툴벨트를 실행시켜
다음과 같이 설치한다.(mac에서)

>brew install heroku

```
Lenui-MacBook-Pro:~ len$ node -v  
v6.9.2  
Lenui-MacBook-Pro:~ len$ npm -v  
3.10.9  
Lenui-MacBook-Pro:~ len$ git --version  
git version 2.10.1  
Lenui-MacBook-Pro:~ len$ brew -v  
Homebrew 1.1.10  
Homebrew/homebrew-core (git revision be30; last commit 2017-02-22)  
Lenui-MacBook-Pro:~ len$ brew install heroku  
Updating Homebrew...  
==> Auto-updated Homebrew!  
Updated 1 tap (homebrew/core).  
==> New Formulae  
buildifier                 librealsense               shellshare
docker-credential-helper   libtensorflow              uftp
dvd-vr                     monitoring-plugins         uniutils
gandi.cli                  mysql-utilities
go@1.7                     pqiv
==> Updated Formulae  
abcm2ps                                  lftp
algol68g                                 libcouchbase
amtterm                                  libdvbpsi
android-ndk                              libepoxy
ansible-cmdb                             libfabric
antigen                                  libgosu
arangodb                                 libgxps
artifactory                              libphonenumber
atlassian-cli                            libpointing
aurora-cli                               librdkafka
aws-sdk-cpp                              libre
awscli                                   link-grammar
bagit                                    logstash
basex                                    logtalk
bee                                      lynis
binutils                                 m-cli
bochs                                    mame
cargo-completion                         media-info
carthage                                 mediaconch
cassandra                                memcached
certbot                                  mercurial
ceylon                                   miller
chaiscript                               minizip
charm                                    monetdb
cheat                                    mongo-orchestration
check                                    mono
checkstyle                               mutt
cheops                                   mypy
closure-compiler                         nghttp2
conan                                    nifi
concurrencykit                           node
cromwell                                 node-build
csfml                                    node@0.10
curl                                     node@0.12
datomic                                  node@4
dbt                                      node@6
depqbf                                   notmuch
diff-so-fancy                            nss
direnv                                   osc
docker                                   packer
docker-machine                           pandoc-citeproc
docker-machine-completion                pandoc-crossref
dpkg                                     pango
dscanner                                 pass
eigen                                    peco
elasticsearch                            perl
elixirscript                             pioneer
entr                                     pius
erlang                                   planck
etcd                                     plantuml
feh                                      platypus
file-roller                              pmd
filebeat                                 pngquant
fio                                      poco
flake8                                   pre-commit
flow                                     pyenv
flyway                                   python3
freetds                                  quantlib
fzf                                      rancher-compose
gauge                                    re2
gcore                                    readline
git                                      redis-leveldb
git-annex                                ringojs
git-archive-all                          rocksdb
git-lfs                                  rom-tools
git-secret                               roswell
gitbucket                                saltstack
gitlab-ci-multi-runner                   scala@2.10
gnome-autoar                             scala@2.11
gnupg-pkcs11-scd                         scalaenv
gradle                                   scm-manager
grc                                      scriptcs
gron                                     selenium-server-standalone
gspell                                   shadowsocks-libev
gst-editing-services                     sonarqube
gst-libav                                sops
gst-plugins-bad                          sqlmap
gst-plugins-base                         stern
gst-plugins-good                         stlink
gst-plugins-ugly                         storm
gst-python                               swagger-codegen
gst-rtsp-server                          swiftformat
gst-validate                             sysbench
gstreamer                                terraform
gtk+3                                    terragrunt
hana                                     tesseract
handbrake                                tidy-html5
harfbuzz                                 tippecanoe
hashcat                                  tnef
heroku                                   tor
highlight                                treefrog
homebank                                 unicorn
httpie                                   vagrant-completion
hugo                                     vala
hyperscan                                vdirsyncer
imagemagick@6                            verilator
infer                                    vim
jasper                                   vnu
jemalloc                                 wakatime-cli
jenkins                                  wireguard-tools
juju                                     wireshark
kerl                                     x265
knot-resolver                            xmake
kobalt                                   xonsh
kotlin                                   yarn
kubernetes-helm                          youtube-dl
leveldb                                  zsh-history-substring-search
==> Renamed Formulae
erlang-r18 -> erlang@18                  go15 -> go@1.5
go14 -> go@1.4                           go16 -> go@1.6
==> Deleted Formulae
bit                        node@5                     suomi-malaga-voikko
ee                         silc-client

==> Using the sandbox
==> Downloading https://cli-assets.heroku.com/branches/stable/5.6.28-2643c0a/her
######################################################################## 100.0%
🍺  /usr/local/Cellar/heroku/5.6.28-2643c0a: 7,361 files, 68.3M, built in 23 seconds
Lenui-MacBook-Pro:~ len$
```
 설치도 했고, 이제 toolbelt를 실행 시켜볼까?
```
 Lenui-MacBook-Pro:~ len$ heroku login
Enter your Heroku credentials.
Email: joenggyu0@gmail.com
Password (typing will be hidden):
 ▸    Authentication failed.
 ▸    Email or password is not valid.
 ▸    Check your credentials on https://dashboard.heroku.com
Lenui-MacBook-Pro:~ len$ heroku login
Enter your Heroku credentials.
Email: joenggyu0@gmail.com
Password (typing will be hidden):
Logged in as joenggyu0@gmail.com
Lenui-MacBook-Pro:~ len$
```

 Login도 완료!

> 만약 Heroku를 지우고 싶다면?
![스크린샷 2017-03-06 오후 2.58.39](http://i.imgur.com/kjq6r2W.png)


**이제 Heroku를 배포하기 위한 준비를 해보자.**

로그인이 끝났으면, Heroku내에 앱을 생성한다. Heroku의 앱은 애플리케이션 단위로, 이 앱단위로 배포를 하고 운영을 하게 된다.
앱 생성 방법은 다음과 같다.

$ heroku apps:create {앱이름}

```
Lenui-MacBook-Pro:~ len$ heroku apps:create churchbro
Creating ⬢ churchbro... done
https://churchbro.herokuapp.com/ | https://git.heroku.com/churchbro.git
Lenui-MacBook-Pro:~ len$ heroku apps
=== joenggyu0@gmail.com Apps
churchbro
heroku-postgres-22d84124
rocky-badlands-10697
```

확인 완료!!

만약 삭제하려면
%heroku app:delete {앱이름} :)

```
Lenui-MacBook-Pro:~ len$ cd TIL-Today-I-Learned-/Node/socket
socket/                    socket_chatting/
socket.io.server_basic.js  socket_room/
Lenui-MacBook-Pro:~ len$ cd TIL-Today-I-Learned-/Node/socket_chatting/
Lenui-MacBook-Pro:socket_chatting len$ git init
Initialized empty Git repository in /Users/len/TIL-Today-I-Learned-/Node/socket_chatting/.git/
Lenui-MacBook-Pro:socket_chatting len$ git add *
Lenui-MacBook-Pro:socket_chatting len$ git commit
Aborting commit due to empty commit message.
Lenui-MacBook-Pro:socket_chatting len$ git commit initalization
error: pathspec 'initalization' did not match any file(s) known to git.
Lenui-MacBook-Pro:socket_chatting len$ git commit
Aborting commit due to empty commit message.
Lenui-MacBook-Pro:socket_chatting len$ heroku git:remote -a churchbro
set git remote heroku to https://git.heroku.com/churchbro.git
Lenui-MacBook-Pro:socket_chatting len$
```

앱이 생성되었으면, 작성한 애플리케이션을 배포해야 하는데, Heroku의 코드 배포는 git 소스코드 관리 시스템을 사용한다.
앱 디렉토리에서 git 리포지토리를 생성한다.
%git init .
다음, 작성한 애플리케이션들을 git에 추가한다.
%git add *
추가된 애플리케이션 코드들을 commit 한다.
%git commit

이제 로컬 git 리파지토리에 애플리케이션 코드들이 저장되었다. 이 코드들을 Heroku에 전송하자.
git에 Heroku 클라우드 상의 git 저장소를 리모트 저장소로 지정해야 한다.
Heroku의 git 저장소를 리모트 저장소로 지정하는 방법은 다음과 같다.

%heroku git:remote -a {앱이름}

여기서는 애플리케이션의 이름이 churchbro이기 때문에 다음과 같이 리모트 저장소를 추가하겠다.
% heroku git:remote –a churchbro

heroku의 git 리파지토리가 리모트 저장소로 지정되었다.
아래 명령어를 이용해서 로컬에 저장된 코드를 heroku로 올려보자

%git push heroku master

명령어를 실행하면 소스코드를 Heroku에 배포 하는 것을 확인할 수 있다.

```
Lenui-MacBook-Pro:Node len$ cd HelloExpress/
Lenui-MacBook-Pro:HelloExpress len$ git init
Initialized empty Git repository in /Users/len/TIL-Today-I-Learned-/Node/HelloExpress/.git/
Lenui-MacBook-Pro:HelloExpress len$ git add*
git: 'add*' is not a git command. See 'git --help'.

Did you mean this?
	add
Lenui-MacBook-Pro:HelloExpress len$ git add *
The following paths are ignored by one of your .gitignore files:
bin
node_modules
Use -f if you really want to add them.
Lenui-MacBook-Pro:HelloExpress len$ git -f
Unknown option: -f
usage: git [--version] [--help] [-C <path>] [-c name=value]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]
Lenui-MacBook-Pro:HelloExpress len$ git commit aa
error: pathspec 'aa' did not match any file(s) known to git.
Lenui-MacBook-Pro:HelloExpress len$ git commit
[master (root-commit) ce0c681] qwer
 10 files changed, 121 insertions(+)
 create mode 100644 app.js
 create mode 100644 package.json
 create mode 100644 public/stylesheets/style.css
 create mode 100644 routes/index.js
 create mode 100644 routes/users.js
 create mode 100644 views/error.ejs
 create mode 100644 views/error.jade
 create mode 100644 views/index.ejs
 create mode 100644 views/index.jade
 create mode 100644 views/layout.jade
Lenui-MacBook-Pro:HelloExpress len$ heroku git:remote -a churchbro
set git remote heroku to https://git.heroku.com/churchbro.git
Lenui-MacBook-Pro:HelloExpress len$ git push heroku master
Counting objects: 16, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (14/14), done.
Writing objects: 100% (16/16), 2.16 KiB | 0 bytes/s, done.
Total 16 (delta 1), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NPM_CONFIG_PRODUCTION=true
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version 6.x via semver.io...
remote:        Downloading and installing node 6.10.0...
remote:        Using default npm version: 3.10.10
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (new runtime signature)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json)
remote:        helloexpress@0.0.0 /tmp/build_0ff4d0b8224baafc31e1150aeb19d3e5
remote:        ├─┬ body-parser@1.16.1
remote:        │ ├── bytes@2.4.0
remote:        │ ├── content-type@1.0.2
remote:        │ ├── depd@1.1.0
remote:        │ ├─┬ http-errors@1.5.1
remote:        │ │ ├── inherits@2.0.3
remote:        │ │ ├── setprototypeof@1.0.2
remote:        │ │ └── statuses@1.3.1
remote:        │ ├── iconv-lite@0.4.15
remote:        │ ├─┬ on-finished@2.3.0
remote:        │ │ └── ee-first@1.1.1
remote:        │ ├── qs@6.2.1
remote:        │ ├─┬ raw-body@2.2.0
remote:        │ │ └── unpipe@1.0.0
remote:        │ └─┬ type-is@1.6.14
remote:        │   ├── media-typer@0.3.0
remote:        │   └─┬ mime-types@2.1.14
remote:        │     └── mime-db@1.26.0
remote:        ├─┬ cookie-parser@1.4.3
remote:        │ ├── cookie@0.3.1
remote:        │ └── cookie-signature@1.0.6
remote:        ├─┬ debug@2.6.1
remote:        │ └── ms@0.7.2
remote:        ├── ejs@2.5.6
remote:        ├─┬ express@4.14.1
remote:        │ ├─┬ accepts@1.3.3
remote:        │ │ └── negotiator@0.6.1
remote:        │ ├── array-flatten@1.1.1
remote:        │ ├── content-disposition@0.5.2
remote:        │ ├─┬ debug@2.2.0
remote:        │ │ └── ms@0.7.1
remote:        │ ├── encodeurl@1.0.1
remote:        │ ├── escape-html@1.0.3
remote:        │ ├── etag@1.7.0
remote:        │ ├─┬ finalhandler@0.5.1
remote:        │ │ └─┬ debug@2.2.0
remote:        │ │   └── ms@0.7.1
remote:        │ ├── fresh@0.3.0
remote:        │ ├── merge-descriptors@1.0.1
remote:        │ ├── methods@1.1.2
remote:        │ ├── parseurl@1.3.1
remote:        │ ├── path-to-regexp@0.1.7
remote:        │ ├─┬ proxy-addr@1.1.3
remote:        │ │ ├── forwarded@0.1.0
remote:        │ │ └── ipaddr.js@1.2.0
remote:        │ ├── qs@6.2.0
remote:        │ ├── range-parser@1.2.0
remote:        │ ├─┬ send@0.14.2
remote:        │ │ ├─┬ debug@2.2.0
remote:        │ │ │ └── ms@0.7.1
remote:        │ │ ├── destroy@1.0.4
remote:        │ │ └── mime@1.3.4
remote:        │ ├── serve-static@1.11.2
remote:        │ ├── utils-merge@1.0.0
remote:        │ └── vary@1.1.0
remote:        ├─┬ morgan@1.7.0
remote:        │ ├── basic-auth@1.0.4
remote:        │ ├─┬ debug@2.2.0
remote:        │ │ └── ms@0.7.1
remote:        │ └── on-headers@1.0.1
remote:        └── serve-favicon@2.3.2
remote:        
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 14M
remote: -----> Launching...
remote:        Released v3
remote:        https://churchbro.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy.... done.
To https://git.heroku.com/churchbro.git
 * [new branch]      master -> master
Lenui-MacBook-Pro:HelloExpress len$
```

**서비스 가동 및 모니터링**

서비스를 가동시켜봅시다!!

서버의 가동은 Heroku에서 web dyno수를 0에서 1로 늘려주면 된다.

%heroku ps:scale web=1

서버가 기동된것을 확인하였으면 웹으로 접속해서 애플리케이션이 제대로 동작하고 있음을 확인하자.
Heroku app의 URL은 http://{heroku app 이름}.herokuapp.com 이다.
우리가 만든 예제는 churchbro 앱 이름을 사용했기 때문에, https://churchbro.herokuapp.com/ 가 접속 URL이 된다
또는 간단하게 명령 프롬프트 창 내에서 heroku open 이라는 명령어를 사용하면 해당 URL을 브라우져를 열어서 자동으로 열어준다.

```
Lenui-MacBook-Pro:HelloExpress len$ heroku ps:scale web=1
Scaling dynos... done, now running web at 1:Free
Lenui-MacBook-Pro:HelloExpress len$ heroku ps
Free dyno hours quota remaining this month: 550h 0m (100%)
For more information on dyno sleeping and how to upgrade, see:
https://devcenter.heroku.com/articles/dyno-sleeping

=== web (Free): npm start (1)
web.1: crashed 2017/03/06 15:20:25 +0900 (~ 5m ago)

Lenui-MacBook-Pro:HelloExpress len$ heroku open
Lenui-MacBook-Pro:HelloExpress len$ heroku logs -tail
 ▸    -t, --tail does not take a value
Lenui-MacBook-Pro:HelloExpress len$ heroku logs
2017-03-06T06:20:16.241653+00:00 heroku[web.1]: Starting process with command `npm start`
2017-03-06T06:20:20.003015+00:00 app[web.1]:
2017-03-06T06:20:20.003035+00:00 app[web.1]: > helloexpress@0.0.0 start /app
2017-03-06T06:20:20.003036+00:00 app[web.1]: > node ./bin/www
2017-03-06T06:20:20.003037+00:00 app[web.1]:
2017-03-06T06:20:20.088803+00:00 app[web.1]: module.js:471
2017-03-06T06:20:20.088807+00:00 app[web.1]:     throw err;
2017-03-06T06:20:20.088812+00:00 app[web.1]:     ^
2017-03-06T06:20:20.088813+00:00 app[web.1]:
2017-03-06T06:20:20.088814+00:00 app[web.1]: Error: Cannot find module '/app/bin/www'
2017-03-06T06:20:20.088815+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:469:15)
2017-03-06T06:20:20.088816+00:00 app[web.1]:     at Function.Module._load (module.js:417:25)
2017-03-06T06:20:20.088816+00:00 app[web.1]:     at Module.runMain (module.js:604:10)
2017-03-06T06:20:20.088817+00:00 app[web.1]:     at run (bootstrap_node.js:394:7)
2017-03-06T06:20:20.088817+00:00 app[web.1]:     at startup (bootstrap_node.js:149:9)
2017-03-06T06:20:20.088819+00:00 app[web.1]:     at bootstrap_node.js:509:3
2017-03-06T06:20:20.098360+00:00 app[web.1]:
2017-03-06T06:20:20.110182+00:00 app[web.1]: npm ERR! Linux 3.13.0-110-generic
2017-03-06T06:20:20.110491+00:00 app[web.1]: npm ERR! argv "/app/.heroku/node/bin/node" "/app/.heroku/node/bin/npm" "start"
2017-03-06T06:20:20.110732+00:00 app[web.1]: npm ERR! node v6.10.0
2017-03-06T06:20:20.110951+00:00 app[web.1]: npm ERR! npm  v3.10.10
2017-03-06T06:20:20.111178+00:00 app[web.1]: npm ERR! code ELIFECYCLE
2017-03-06T06:20:20.111389+00:00 app[web.1]: npm ERR! helloexpress@0.0.0 start: `node ./bin/www`
2017-03-06T06:20:20.111543+00:00 app[web.1]: npm ERR! Exit status 1
2017-03-06T06:20:20.111881+00:00 app[web.1]: npm ERR!
2017-03-06T06:20:20.112040+00:00 app[web.1]: npm ERR! Failed at the helloexpress@0.0.0 start script 'node ./bin/www'.
2017-03-06T06:20:20.112186+00:00 app[web.1]: npm ERR! Make sure you have the latest version of node.js and npm installed.
2017-03-06T06:20:20.112344+00:00 app[web.1]: npm ERR! If you do, this is most likely a problem with the helloexpress package,
2017-03-06T06:20:20.112486+00:00 app[web.1]: npm ERR! not with npm itself.
2017-03-06T06:20:20.112631+00:00 app[web.1]: npm ERR! Tell the author that this fails on your system:
2017-03-06T06:20:20.112785+00:00 app[web.1]: npm ERR!     node ./bin/www
2017-03-06T06:20:20.112948+00:00 app[web.1]: npm ERR! You can get information on how to open an issue for this project with:
2017-03-06T06:20:20.113133+00:00 app[web.1]: npm ERR!     npm bugs helloexpress
2017-03-06T06:20:20.113320+00:00 app[web.1]: npm ERR! Or if that isn't available, you can get their info via:
2017-03-06T06:20:20.113505+00:00 app[web.1]: npm ERR!     npm owner ls helloexpress
2017-03-06T06:20:20.113697+00:00 app[web.1]: npm ERR! There is likely additional logging output above.
2017-03-06T06:20:20.118989+00:00 app[web.1]:
2017-03-06T06:20:20.119221+00:00 app[web.1]: npm ERR! Please include the following file with any support request:
2017-03-06T06:20:20.119362+00:00 app[web.1]: npm ERR!     /app/npm-debug.log
2017-03-06T06:20:20.225930+00:00 heroku[web.1]: Process exited with status 1
2017-03-06T06:20:20.237560+00:00 heroku[web.1]: State changed from starting to crashed
2017-03-06T06:20:20.238991+00:00 heroku[web.1]: State changed from crashed to starting
2017-03-06T06:20:21.713042+00:00 heroku[web.1]: Starting process with command `npm start`
2017-03-06T06:20:24.894272+00:00 app[web.1]:
2017-03-06T06:20:24.894284+00:00 app[web.1]: > helloexpress@0.0.0 start /app
2017-03-06T06:20:24.894285+00:00 app[web.1]: > node ./bin/www
2017-03-06T06:20:24.894285+00:00 app[web.1]:
2017-03-06T06:20:25.007499+00:00 app[web.1]: module.js:471
2017-03-06T06:20:25.007501+00:00 app[web.1]:     throw err;
2017-03-06T06:20:25.007501+00:00 app[web.1]:     ^
2017-03-06T06:20:25.007502+00:00 app[web.1]:
2017-03-06T06:20:25.007503+00:00 app[web.1]: Error: Cannot find module '/app/bin/www'
2017-03-06T06:20:25.007504+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:469:15)
2017-03-06T06:20:25.007504+00:00 app[web.1]:     at Function.Module._load (module.js:417:25)
2017-03-06T06:20:25.007506+00:00 app[web.1]:     at run (bootstrap_node.js:394:7)
2017-03-06T06:20:25.007505+00:00 app[web.1]:     at Module.runMain (module.js:604:10)
2017-03-06T06:20:25.027488+00:00 app[web.1]: npm ERR! argv "/app/.heroku/node/bin/node" "/app/.heroku/node/bin/npm" "start"
2017-03-06T06:20:25.007506+00:00 app[web.1]:     at startup (bootstrap_node.js:149:9)
2017-03-06T06:20:25.027177+00:00 app[web.1]: npm ERR! Linux 3.13.0-110-generic
2017-03-06T06:20:25.007507+00:00 app[web.1]:     at bootstrap_node.js:509:3
2017-03-06T06:20:25.027689+00:00 app[web.1]: npm ERR! node v6.10.0
2017-03-06T06:20:25.017575+00:00 app[web.1]:
2017-03-06T06:20:25.027865+00:00 app[web.1]: npm ERR! npm  v3.10.10
2017-03-06T06:20:25.027992+00:00 app[web.1]: npm ERR! code ELIFECYCLE
2017-03-06T06:20:25.028189+00:00 app[web.1]: npm ERR! Exit status 1
2017-03-06T06:20:25.028101+00:00 app[web.1]: npm ERR! helloexpress@0.0.0 start: `node ./bin/www`
2017-03-06T06:20:25.028458+00:00 app[web.1]: npm ERR!
2017-03-06T06:20:25.028555+00:00 app[web.1]: npm ERR! Failed at the helloexpress@0.0.0 start script 'node ./bin/www'.
2017-03-06T06:20:25.028637+00:00 app[web.1]: npm ERR! Make sure you have the latest version of node.js and npm installed.
2017-03-06T06:20:25.028766+00:00 app[web.1]: npm ERR! If you do, this is most likely a problem with the helloexpress package,
2017-03-06T06:20:25.028908+00:00 app[web.1]: npm ERR! not with npm itself.
2017-03-06T06:20:25.029050+00:00 app[web.1]: npm ERR! Tell the author that this fails on your system:
2017-03-06T06:20:25.029180+00:00 app[web.1]: npm ERR!     node ./bin/www
2017-03-06T06:20:25.029318+00:00 app[web.1]: npm ERR! You can get information on how to open an issue for this project with:
2017-03-06T06:20:25.029452+00:00 app[web.1]: npm ERR!     npm bugs helloexpress
2017-03-06T06:20:25.029577+00:00 app[web.1]: npm ERR! Or if that isn't available, you can get their info via:
2017-03-06T06:20:25.029709+00:00 app[web.1]: npm ERR!     npm owner ls helloexpress
2017-03-06T06:20:25.029835+00:00 app[web.1]: npm ERR! There is likely additional logging output above.
2017-03-06T06:20:25.033828+00:00 app[web.1]:
2017-03-06T06:20:25.034036+00:00 app[web.1]: npm ERR! Please include the following file with any support request:
2017-03-06T06:20:25.034150+00:00 app[web.1]: npm ERR!     /app/npm-debug.log
2017-03-06T06:20:25.142457+00:00 heroku[web.1]: State changed from starting to crashed
2017-03-06T06:20:25.127801+00:00 heroku[web.1]: Process exited with status 1
2017-03-06T06:25:10.190236+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=churchbro.herokuapp.com request_id=1327d450-8b74-4df1-a020-0b07e1c7f6ee fwd="175.211.219.211" dyno= connect= service= status=503 bytes=
2017-03-06T06:25:11.195404+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=churchbro.herokuapp.com request_id=e560da02-12ea-4b6f-8dee-bcaad54eaabf fwd="175.211.219.211" dyno= connect= service= status=503 bytes=
2017-03-06T06:26:09.083300+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=churchbro.herokuapp.com request_id=f48a4976-7516-460f-beb2-0b3512552431 fwd="175.211.219.211" dyno= connect= service= status=503 bytes=
2017-03-06T06:26:09.953322+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=churchbro.herokuapp.com request_id=f73711ec-3bfa-47fc-a3e5-ed02de31eeb7 fwd="175.211.219.211" dyno= connect= service= status=503 bytes=
Lenui-MacBook-Pro:HelloExpress len$
```

서버를 내릴 때는 1을  0으로 변경
heroku ps:scale web=0

```
Lenui-MacBook-Pro:HelloExpress len$ heroku ps:scale web=0
Scaling dynos... done, now running web at 0:Free
Lenui-MacBook-Pro:HelloExpress len$
```

끝!

바보같이 gitignore를 추가해서 모듈이 git에 올라가지않았다. 그러므로 위와같이 Module을 찾을 수 없다고 나온다. 그러나 저게 없었다면 기본 Express가 실행 되었을 것이다.


참고 : http://bcho.tistory.com/1089

그럼 이제부터, 진짜 서버를 구축해볼까아!!!
