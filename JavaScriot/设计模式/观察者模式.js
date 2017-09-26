function Observer() {
    this.fns = [];
}
Observer.prototype = {
    subscribe: function(fn) {
        this.fns.push(fn);
    },
    unsubscribe: function(fn) {
        this.fns = this.fns.filter(
            function(el) {
                if (el !== fn) {
                    return el;
                }
            }
        );
    },
    update: function(o, thisObj) {
        var scope = thisObj;
        console.log(o);
        this.fns.forEach(
            function(el) {
                el.call(scope, o);
            }
        );
    }
};

//测试
var o = new Observer;
var f1 = function(data) {
    console.log('Robbin: ' + data + ', 赶紧干活了！');
};

var f2 = function(data) {
    console.log('Randall: ' + data + ', 找他加点工资去！');
};

o.subscribe(f1);
o.subscribe(f2);

o.update("Tom回来了！", 10)

//退订f1
o.unsubscribe(f1);
//再来验证
o.update("Tom回来了！");