window.mingzi = 0;

function save(){
    var phone_num = document.getElementById("mobilephone");
    var user_name = document.getElementById("user_name");
    console.log(phone_num.value);
    var data = user_name.value+" : "+phone_num.value+"\n";
    localStorage.setItem(window.mingzi,data);
    user_name.value ="";
    phone_num.value="";
    window.mingzi++;

}
function show(){
    var text="";
    var i=0;
    for(;i<window.mingzi;i++){
        text =text+localStorage.getItem(i);
    }
    var find_result = document.getElementById("find_result");
    find_result.innerHTML = text;
}
