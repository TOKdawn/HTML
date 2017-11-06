function Team() {
    this.funs = [];
}
Team.prototype = {
    addMan: function(fn) {
        this.funs.forEach(
            function(el) {
                el.add(fn.name);
            }
        )
        this.funs.push(fn);

    },
    removeMan: function(fn) {
        this.funs = this.funs.filter( //过滤函数
            function(el) { //过滤条件
                if (el !== fn) { //返回所以不是fn的观察者组成的数组
                    return el;
                }
            }
        );
    },
    beat: function(name) {
        this.funs.forEach(
            function(el) {
                if (name == el.name) {
                    el.fight(name);
                } else {
                    el.call(name);
                }
            }
        );
    }
}

function person(data, name) {
    this.name;
    this.name = name;
    this.call = function(data) {
        console.log(this.name + "请注意: " + data + "被攻击了!");

    }
    this.fight = function(data) {
        console.log(data + "请注意:你被攻击了!");
    }
    this.add = function(data) {
        console.log(this.name + "请注意: " + data + "加入了战队!");
    }
}
var T1 = new Team;
var zbt = new person(" ", "zbt");
var zpy = new person(" ", "zpy");
var zxy = new person(" ", "zxy");
console.log("zbt加入战队:");
T1.addMan(zbt);
console.log("zxy加入战队:");
T1.addMan(zxy);
console.log("zpy加入战队:");
T1.addMan(zpy);
console.log("zpy被攻击:");
T1.beat("zpy");
console.log("zpy离队:");
T1.removeMan(zpy);
console.log("zxy被攻击:");
T1.beat("zxy");