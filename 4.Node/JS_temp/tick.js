// EventEmitter 클래스 가져오기
const EventEmitter = require('events');

//이미터를 생성
const customEmitter = new EventEmitter();

setInterval(() => {
customEmitter.emit('tick');
customEmitter.emit('tick');
customEmitter.emit('tick');
customEmitter.emit('tick');
}, 500);

exports.tick = customEmitter;
