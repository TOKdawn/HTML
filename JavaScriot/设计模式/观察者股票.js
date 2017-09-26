function Stock() {
    this.pic;
    this.set = function(pic) {
        this.pic = pic;
    }
    this.funs = []; //储存订阅者信息
}
Stock.prototype = { //通过原型链实现
    registerObserver: function(fn) { //函数及对象
        this.funs.push(fn); //添加订阅者
    },
    removeObserver: function(fn) {
        this.funs = this.funs.filter( //过滤函数
            function(el) { //过滤条件
                if (el !== fn) { //返回所以不是fn的观察者组成的数组
                    return el;
                }
            }
        );
    },
    notifyObserver: function(newpic, thisObj) {
        var scope = newpic;

        this.funs.forEach(
            function(el) {
                // console.log(scope);
                //console.log(el.sorc);
                // var re = 
                // (el.sorc <= scope) ? el.show("我赚了:"+scope - el.sorc): el.show("我赔了:"el.sorc - scope)
                if (scope >= el.sorc) {

                    var data = scope - el.sorc;
                    var str = "我赚了" + data;
                    el.show(str);
                } else {
                    var data = el.sorc - scope;
                    var str = "我赔了" + data;
                    el.show(str);
                }

            }
        );

    }

}
var S = new Stock;


function Ponson(data, name) {
    this.sorc;
    this.name = name;
    this.buy = function(obj) {
        this.sorc = obj.pic;
    }
    this.show = function(data) {
        console.log("I am " + name + ": " + data);
    }
}
var f1 = new Ponson("0元", "zpy");
//console.log(f1);
var f2 = new Ponson("0元", "zbt");

S.set(110);
f1.buy(S);
S.registerObserver(f1);

S.set(90);
f2.buy(S);
S.registerObserver(f2);

S.notifyObserver(100);

S.notifyObserver(150);
S.removeObserver(f2);

S.notifyObserver(98);
