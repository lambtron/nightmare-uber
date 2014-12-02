var Nightmare = require('nightmare');
var LinkedIn = require('../index.js');

var nightmare = new Nightmare();
var email = 'andyjiang@gmail.com';
var password = 'mengfei8*';

var a = './test/a.png';
var b = './test/b.png';
var c = './test/c.png';

nightmare
  .viewport(800, 1600)
  .goto('https://m.uber.com/')
  .wait('a.done')
  .screenshot(a)
  .wait(1000)
  .type('#email', email)
  .type('#password', password)
  .screenshot(b)
  .wait(1000)
  .click('a.done')
  .wait('.show-eta')
  .wait(10000)
  .screenshot(c)
  .run(function(err, nightmare) {
    console.log('done');
  });