var cc;

function func(num1, num2) {
    if (num1 == 0) {
        return num2;
    } else {
        cc = num1 % num2;
        num2 = num1;
        num1 = cc;
        return arguments.callee(num1, num2);
    }
}
console.log(func(12, 10));



function zpy(m, n) {
    var r;
    while (1) {
        if (n == 0) {
            console.log(m);
            break;
        }
        r = m % n;
        m = n;
        n = r;
    }
}
zpy(120, 10);