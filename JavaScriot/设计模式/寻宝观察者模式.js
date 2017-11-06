function Gold() {
    this.gold;
    this.set = function(pic) {
        this.gold = pic;
    }
    this.funs = [];
}

function Diamond() {
    this.diamond;
    this.set = function(pic) {
        this.diamond = pic;
    }
    this.funs = [];
}
Gold.prototype = {
    addEudemon: function(fn) {
        this.funs.push(fn);
    },
    removeEudemon: function(fn) {
        this.funs = this.funs.filter( //过滤函数
            function(el) { //过滤条件
                if (el !== fn) { //返回所以不是fn的观察者组成的数组
                    return el;
                }
            }
        );
    },
    notifAll: function(take) {
        this.funs.forEach(
            function(el) {
                el.showG(take);
                el.att();
            }
        )
    }
}
Diamond.prototype = {
    addEudemon: function(fn) {
        this.funs.push(fn);
    },
    removeEudemon: function(fn) {
        this.funs = this.funs.filter( //过滤函数
            function(el) { //过滤条件
                if (el !== fn) { //返回所以不是fn的观察者组成的数组
                    return el;
                }
            }
        );
    },
    notifAll: function(take) {
        this.funs.forEach(
            function(el) {
                el.showD(take);
                el.att();
            }
        )
    }
}
var G = new Gold;
var D = new Diamond;

function Tiger(name) {
    this.name = name;
    this.att = function() {
            console.log("老虎爪击");
        },
        this.showD = function(take) {
            console.log(name + "发现少了" + take + "颗钻石");
        },
        this.showG = function(take) {
            console.log(name + "发现少了" + take + "颗黄金");
        }
}

function Lion(name) {
    this.name = name;
    this.att = function() {
            console.log("狮子吼");

        },
        this.showD = function(take) {
            console.log(name + "发现少了" + take + "颗钻石");
        },
        this.showG = function(take) {
            console.log(name + "发现少了" + take + "颗黄金");
        }
}

var T1 = new Tiger("大虎");
var T2 = new Tiger("二虎");
var T3 = new Tiger("三虎");
var T4 = new Tiger("四虎");
var T5 = new Tiger("五虎");
var L1 = new Lion("狮王");
var L2 = new Lion("二狮");
var L3 = new Lion("三狮");
var L4 = new Lion("四狮");
var L5 = new Lion("五狮");
var L6 = new Lion("六狮");
var L7 = new Lion("小狮");
G.addEudemon(T1);
G.addEudemon(T2);
G.addEudemon(T3);
G.addEudemon(L1);
G.addEudemon(L2);
G.addEudemon(L3);
G.addEudemon(L4);
D.addEudemon(T4);
D.addEudemon(T5);
D.addEudemon(L5);
D.addEudemon(L6);
D.addEudemon(L7);
var cage = new function(glod, diamond) {
    this.take = function(glod, diamond) {
        console.log(glod + " " + diamond);
        G.notifAll(glod);
        D.notifAll(diamond);
    }
}
cage.take(13, 10);