// 템플릿엔진

 const ejs = require('ejs');
 const http = require('http');
 const fs = require('fs');

 http.createServer((request, response) => {
   fs.readFile('ejspage.ejs','utf8', (erorror, file) => {
     //출력
     //EJS모듈을 활용해보자.
      const output = ejs.render(file, {
        name : '김정규 테스트'
      });


     response.writeHead(200, {'Content-type' : 'text/html'});
     response.end(output);
   });
}).listen(52223);
