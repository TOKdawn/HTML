'use strict';

function Timer() {
    var _this = this;

    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(function () {
        return _this.s1++;
    }, 1000);
    // 普通函数
    setInterval(function () {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(function () {
    return console.log('s1: ', timer.s1);
}, 3100);
setTimeout(function () {
    return console.log('s2: ', timer.s2);
}, 3100);
//# sourceMappingURL=ex6text.js.map