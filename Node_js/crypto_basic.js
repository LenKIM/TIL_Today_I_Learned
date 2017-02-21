
 //모듈 추출
 const crypto = require('crypto');

 //변수 선언
 const key = '김정규';
 const input = 'PASSWORD'

 //암호화
 const cipher = crypto.createCipher('aes192', key);
 cipher.update(input, 'utf8', 'base64');
 const cipheredOutput = cipher.final('base64');

 //암호화 해제
 const decipher = crypto.createDecipher('aes192', key);
 decipher.update(cipheredOutput, 'base64', 'utf8');
 const decipheredOutput = decipher.final('utf8');

 //출력
 console.log('원래 문자열 ' + input);
 console.log('암호화' + cipheredOutput);
 console.log('암호화 해제' + decipheredOutput);
