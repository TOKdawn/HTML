(function text() {
    var num = 100;
    for (var i = 0; i < 100; i++) {
        x = (Math.random()) * num;
        x = (Math.floor(x)) + 1;
        console.log("now:" + num + "    " + x + " ");
        num--;
    }


})();