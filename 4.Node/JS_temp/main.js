const tick = require('./tick');

tick.tick.on('tick', () => {
  console.log('test');
})
