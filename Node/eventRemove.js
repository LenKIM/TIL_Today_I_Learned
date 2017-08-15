// // EventEmitter()
//
// const onUncaughtException = (error) => {
//   console.log('예외가 발생했군 이번에만 봐주겠다.');
//   // 중요부분
//   process.removeListener('uncaughtException', onUncaughtException);
// };
//
// // process.on('uncaughtException', onUncaughtException);
// // 이벤트를 한번만 동작시키고 싶다면 once를 넣는다.
// process.once('uncaughtException', onUncaughtException);
//
// const test = () => {
//   setTimeout(test, 2000);
//   error.error.error();
// };
// setTimeout(test, 2000);
// ------------------------------
// 이벤트 강제 발생시키는 방법

// process.on('exit', () => {
//   console.log('안녕');
// })

// emit를 쓴다는 건 이벤트핸들러만 호출한다는 말이다.
// EventEmitter 클래스 가져오기
const EventEmitter = require('events');

//이미터를 생성
const customEmitter = new EventEmitter();

customEmitter.on('tick', () => {
  console.log('tick 이벤트가 발생했습니다.');
});

customEmitter.emit('tick');
customEmitter.emit('tiasfk');
customEmitter.emit('ddsk');
customEmitter.emit('t');

//이벤트 리스너는 어디서 사용하는가?
