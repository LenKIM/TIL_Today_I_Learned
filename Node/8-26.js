
//모듈 추출
const fs = require('fs');
const express = require('express');
const multipart = require('connect-multiparty');

//서버 생성
const app = express();

//미들웨어를 설정
app.use(multipart({uploadDir:__dirname + '/multipart'}));

//라우터를 설정
app.get('/', (request, response) => {
  fs.readFile('HTMLPage.html', (error,data) => {
    response.send(data.toString());
  });
});

app.post('/', (request,response) => {
  //변수를 선언
  const comment = request.body.comment;
  const imageFile = request.files.image;

  if (imageFile) {
    //변수를 선언
    const name = imageFile.name;
    const path = imageFile.path;
    const type = imageFile.type;

    //이미지 파일 확인
    if(type.indexOf('image') != -1){
      //이미지 파일의 경우: 파일 이름을 변경합니다.
      const outputPath = __dirname + '/multipart/'+ Date.now() + '_'+name;
      fs.rename(path, outputPath, (error) => {
        response.redirect('/');
      });

    }else {
      //이미지가 아닌경우 삭제
      fs.unlink(path, (error) => {
        response.sendStatus(400);
      });
    }
  } else {
    response.sendStatus(404);
  }

  // console.log(request.body);
  // console.log(request.files);
})

//서버스를 실행
app.listen(53147, () => {
  console.log('Server running at http://127.0.0.1:53147');
})
