// 템플릿엔진

 const pug = require('pug');
 const http = require('http');
 const fs = require('fs');

 http.createServer((request, response) => {
   fs.readFile('jadePage.jade','utf8', (erorror, file) => {
     //출력
     //EJS모듈을 활용해보자.
      const fn = pug.compile(file);
      const output = fn({
          name : '윤인성 테스트',
          datas: [{
            i:10,
            name:'테스트A'
          },{
            i:11,
            name:'테스트B'
          }]
      });

     response.writeHead(200, {'Content-type' : 'text/html'});
     response.end(output);
   });
}).listen(52223);
