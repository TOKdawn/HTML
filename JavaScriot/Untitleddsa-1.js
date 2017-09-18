var num = 0;
var max = 10;
var id = null;

function incrementnumber() {
    num++;
    console.log(num);
    if (num == max) {
        clearInterval(id);
        console.log("Done");
    }
}
id = setInterval(incrementnumber, 500);