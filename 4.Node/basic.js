process.on('exit', (code) => {
  console.log('안녕히 가셔요...');
  console.log(code);
});

console.log('실행중입니다.');
process.exit(273);

// 0 일떄 안정적 1일때 비정상으로 종료.


process.on('uncaughtException', (error) => {
  console.log('예외가 발생했군!');
});

error.error.error();
