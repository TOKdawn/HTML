 function Subject() {
    this.fns = [];
}
Subject.prototype = Object.assign({
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
    notify: function(message) {
        for (let o in this.fns)
            this.fns[o].update(message);
    }
}, Subject.prototype);


function Observer() {
    this.message = {}
}
Observer.prototype.update = function(message) {
    this.message = message;
    this.show(message);
}
Observer.prototype.show = function() {
    console.log(this.message.code);
    console.log(this.message.text);
}

//测试
let o = new Subject;
let f1 = new Observer;

let f2 = new Observer;
//自定义回调函数
f2.update = function(message) {
    console.log("我收到了消息，但我只显示代码：" + message.code);
}

o.subscribe(f1);
o.subscribe(f2);
o.notify({
    code: 404,
    text: "not found"
});


o.notify({
    code: 200,
    text: "OK"
});

o.unsubscribe(f1);
o.notify({
    code: 304,
    text: "重定向"
});
