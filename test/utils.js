var test = require('tape'),
    Utils, obj;

test('load Utils.', function(t) {
  Utils = require('../src/drawing-utils-lib');
  t.ok(Utils, 'object loaded');
  t.end();
});

test('Extends the properties and methods of a superClass onto a subClass.', function(t) {
  function Ball() {
    this.name = 'ball';
  }
  Ball.prototype.hello = function() {
    return 'hi';
  };
  function Box() {
    Ball.call(this);
  }
  Utils.extend(Box, Ball)
  var box = new Box();
  t.equal(box.hello(), 'hi', 'subClass inherits methods of superClass');
  t.equal(box.name, 'ball', 'subClass inherits properties of superClass');
  t.end();
});

test('getRandomNumber() generates a psuedo-random number within an inclusive range.', function(t) {

  var num, flag;

  // INTEGER
  num = Utils.getRandomNumber(0, 0);
  t.assert(num == 0, 'if low and high == 0, returns 0.');

  flag = false;
  for (var i = 0; i < 1000; i++) {
    if (Utils.getRandomNumber(i, i) !== i) {
      flag = true;
    }
  }
  t.notOk(flag, 'if low == high, returns their value.');

  flag = false;
  for (var i = 0; i < 1000; i++) {
    num = Utils.getRandomNumber(i, i + 3);
    if (num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed positive numbers; returned number is within passed range.');

  flag = false;
  for (var i = -1000; i < 0; i++) {
    num = Utils.getRandomNumber(i, -i);
    if (num < i || num > -i) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed mixed postive and negative numbers; returned number is within passed range.');

  flag = false;
  for (var i = -1000; i < 0; i++) {
    num = Utils.getRandomNumber(i, i + 3);
    if (num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed negative numbers; returned number is within passed range.');

  // FLOAT
  num = Utils.getRandomNumber(0, 0, true);
  t.assert(num == 0, 'floating; if low and high == 0, returns 0.');

  flag = false;
  for (var i = 0; i < 1000; i++) {
    if (Utils.getRandomNumber(i, i, true) !== i) {
      flag = true;
    }
  }
  t.notOk(flag, 'floating; if low == high, returns their value.');

  flag = false;
  for (var i = 0; i < 1000; i++) {
    num = Utils.getRandomNumber(i, i + 3, true);
    if (num % 1 === 0 || num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed floating positive numbers; returned number is within passed range.');

  flag = false;
  for (var i = -1000; i < 0; i++) {
    num = Utils.getRandomNumber(i, -i, true);
    if (num % 1 === 0 || num < i || num > -i) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed mixed floating postive and negative numbers; returned number is within passed range.');

  flag = false;
  for (var i = -1000; i < 0; i++) {
    num = Utils.getRandomNumber(i, i + 3, true);
    if (num % 1 === 0 || num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed floating negative numbers; returned number is within passed range.');

  // PASSED FRACTIONS
  flag = false;
  for (var i = 0; i < 1; i += 0.001) {
    if (Utils.getRandomNumber(i, i, true) !== i) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed fractions; floating; if low == high, returns their value.');

  flag = false;
  for (var i = 0; i < 1; i += 0.001) {
    num = Utils.getRandomNumber(i, i + 3, true);
    if (num % 1 === 0 || num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed floating positive fractions; returned number is within passed range.');

  flag = false;
  for (var i = -1; i < 0; i += 0.001) {
    num = Utils.getRandomNumber(i, -i, true);
    if (num % 1 === 0 || num < i || num > -i) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed mixed floating postive and negative fractions; returned number is within passed range.');

  flag = false;
  for (var i = -1; i < 0; i += 0.001) {
    num = Utils.getRandomNumber(i, i + 3, true);
    if (num % 1 === 0 || num < i || num > i + 3) {
      flag = true;
    }
  }
  t.notOk(flag, 'passed floating negative fractions; returned number is within passed range.');

  t.end();
});

test('map() re-maps a number from one range to another.', function(t) {
  var num = Utils.map(5, 0, 10, 0, 100);
  t.assert(num = 50, 'returned number is mapped to range.');
  t.end();
});

test('addEvent() adds an event listener to a DOM element.', function(t) {
  var val;
  var event = document.createEvent('Event');
  event.initEvent('build', true, true);
  Utils.addEvent(document, 'build', function() {val = 100;});
  document.dispatchEvent(event);
  t.equal(val, 100, 'addEventListener handler called when event fires.');


  var eventHello = document.createEvent('Event');
  eventHello.initEvent('hello', true, true);
  var obj = {
    el: document.createElement('div')
  };
  obj.el.addEventListener = null;
  obj.el.attachEvent = function(eventType, handler) {
    obj[eventType] = handler;
    console.log(obj);
  };
  Utils.addEvent(obj.el, 'hello', function() {val = 200;});
  obj.onhello();
  t.equal(val, 200, 'attachEvent handler called when event fires.');

  t.end();
});

test('degreesToRadians() converts degrees to radians.', function(t) {
  var num = parseFloat(Utils.degreesToRadians(45).toPrecision(2));
  t.equal(num, 0.79, 'converts degrees to radians.');
  t.throws(function () {
    Utils.degreesToRadians()
  }, 'should throw exception when not passed radians.');
  t.end();
});

test('radiansToDegrees() converts radians to degrees.', function(t) {
  var num = parseFloat(Utils.radiansToDegrees(0.79).toPrecision(2));
  t.equal(num, 45, 'converts radians to degrees.');
  t.throws(function () {
    Utils.radiansToDegrees()
  }, 'should throw exception when not passed degrees.');
  t.end();
});

test('constrain() constrains a value within a range.', function(t) {
  var num = Utils.constrain(50, 40, 100);
  t.equal(num, 50, 'mid-range.');
  var num = Utils.constrain(30, 40, 100);
  t.equal(num, 40, 'low-range.');
  var num = Utils.constrain(150, 40, 100);
  t.equal(num, 100, 'high-range.');
  t.end();
});

test('isInside() determines if one object is inside another.', function(t) {

  var obj = {
    width: 10,
    height: 10,
    location: {
      x: 50,
      y: 50
    }
  };

  var container = {
    width: 100,
    height: 100,
    location: {
      x: 50,
      y: 50
    }
  };

  t.equal(Utils.isInside(obj, container), true, 'obj is inside container.');

  obj.width = null;
  obj.height = null;
  t.equal(Utils.isInside(obj, container), true, 'obj with no width/height is inside container.');

  obj.location.x = 1000;
  t.equal(Utils.isInside(obj, container), false, 'obj is outside container.');

  t.throws(function () {
    Utils.isInside(obj)
  }, 'should throw exception when not passed container.');

  t.throws(function () {
    Utils.isInside(null, container)
  }, 'should throw exception when not passed obj.');

  t.end();
});

test('capitalizeFirstLetter() capitalizes the first character in a string.', function(t) {
  var hello = Utils.capitalizeFirstLetter('hello');
  t.equal(hello, 'Hello', 'capitalizeFirstLetter.');
  t.end();
});
