'use strict';

function foo() {
    var _this = this;
    
    setTimeout(function () {
        console.log('id:', _this.id);
    }, 100);
}

var id = 21;

foo.call({ id: 42 });
// id: 42[""])
//# sourceMappingURL=text.js.map