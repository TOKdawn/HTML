var getElementsByClass = function(searchClass,node,tag) {
    var classElements = [];
    if ( node == null )
        node = document;
    if ( tag == null )
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if ( pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
};

function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
    window.onload = func;
    }else{
    window.onload = function(){
    oldonload();
    func();
    };
    }
}

var a = 0, b = 0,c = 0;
a = $("#cart_text_box1").val();
b = $("#cart_text_box2").val();
c = $("#cart_text_box3").val();

$(document).ready(function(){

    //数量增加操作
        $('.cart_add').click(function(){
            var cart_text_box = $(this).siblings(".cart_text_box");
            cart_text_box.val(parseInt(cart_text_box.val())+1);
            if (parseInt(cart_text_box.val())!=1){
                $(this).siblings(".cart_min").attr('disabled',false);
            }
            if( a != $('#cart_text_box1').val() ){
                a++;
            }else if( b != $('#cart_text_box2').val() ){
                b++;
            }else if( c != $('#cart_text_box3').val() ){
                c++;
            }

            setNumAll(a,b,c);
            setTotal();
            setTotalAll();
        });

    //数量减少操作

        $(".cart_min").on("click",function(){
         var cart_text_box = $(this).siblings(".cart_text_box");
            cart_text_box.val(parseInt(cart_text_box.val())-1);
            if (parseInt(cart_text_box.val())===0){
                $(this).attr('disabled',true);
            }
            if( a != $('#cart_text_box1').val() ){
                a--;
            }else if( b != $('#cart_text_box2').val() ){
                b--;
            }else if( c != $('#cart_text_box3').val() ){
                c--;
            }
            setNumAll(a,b,c);
            setTotal();
            setTotalAll();
        });
        //初始化
    setTotal();
    setTotalAll();
    setNumAll(1,1,1);

});


//checkbox全选及反选
$(function(){
    $("input[name='cb'],#cartBox_check").prop("checked",false);
    $("input[name='cc'],#cartBox_checkAll").prop("checked",false);

    $("#cartBox_check").click(function() {
        $("input[name='cb']").prop("checked", this.checked);
    });
    $("input[name='cb']").click(function() {
        var $subs = $("input[name='cb']");
        $("#cartBox_check").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
        var $subc = $("input[name='cc']");
        $("#cartBox_checkAll").prop("checked" , $subc.length == $subc.filter(":checked").length ? true :false);
        setNumAll(a,b,c);
        setTotalAll();
    });

    $("#cartBox_checkAll").click(function() {
        $("input[name='cc']").prop("checked", this.checked);
        $("input[name='cb']").prop("checked", this.checked);
        setNumAll(a,b,c);
        setTotalAll();
    });
    $("input[name='cc']").click(function() {
        var $subs = $("input[name='cc']");
        $("#cartBox_checkAll").prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
        var $subc = $("input[name='cb']");
        $("#cartBox_check").prop("checked" , $subc.length == $subc.filter(":checked").length ? true :false);
        setNumAll(a,b,c);
        setTotalAll();
    });

});

//商品数量
function setNumAll(a,b,c) {
    var sum = 0;
    // var $subc = $("input[name='cb']");
  // while(a != $subc.filter(":checked").length){
  //   a++;
  // }
    if( $('#checkbox1').filter(":checked").length == true ){
        sum += parseInt(a);
    }
    if ($('#checkbox2').filter(":checked").length == true) {
        sum += parseInt(b);
    }
    if ($('#checkbox3').filter(":checked").length == true) {
        sum += parseInt(c);
    }

    $("#cart_all").html(sum);
}
//计算操作
function setTotal(){
    $(".shopInfo .selectShopInfo").each(function(){
        var totalprice = parseFloat( $(".cart_text_box",$(this)).val() ) * parseFloat( $(".cart_price",$(this)).text() );
        $(".cart_total",$(this)).html(totalprice.toFixed(1));
     });
}
//总价格
function setTotalAll() {
    var sum = 0.0;
    var a = 0;
    if( $('#checkbox1').filter(":checked").length == true ){
        sum += parseFloat( $("#cart_total1")[0].innerHTML );
    }
    if ($('#checkbox2').filter(":checked").length == true) {
        sum += parseFloat( $("#cart_total2")[0].innerHTML );
    }
    if ($('#checkbox3').filter(":checked").length == true) {
        sum += parseFloat( $("#cart_total3")[0].innerHTML );
    }
    // $(".shopInfo .selectShopInfo").each(function(){
    //
    //      // if($("input:first",$(this)).checked){
    //
    //      // }
    // });

    $("#cart_allPrice").html(sum);
}
