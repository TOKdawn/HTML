
$("#i1").mouseenter(function(){
  $("#chengqilai").css("display","block");
  $("#tooltip1").css("display","block");
});

$("#tooltip1").mouseleave(function(){
$("#chengqilai").css("display","none");
  $("#tooltip1").css("display","none");
  $("#tooltip2").css("display","none");
  $("#tooltip3").css("display","none");
});


$("#i2").mouseenter(function(){
  $("#chengqilai").css("display","block");
  $("#tooltip2").css("display","block");
});

$("#tooltip2").mouseleave(function(){
$("#chengqilai").css("display","none");
$("#tooltip1").css("display","none");
$("#tooltip2").css("display","none");
$("#tooltip3").css("display","none");
});


$("#i3").mouseenter(function(){
  $("#chengqilai").css("display","block");
  $("#tooltip3").css("display","block");
});

$("#tooltip3").mouseleave(function(){
$("#chengqilai").css("display","none");
$("#tooltip1").css("display","none");
$("#tooltip2").css("display","none");
$("#tooltip3").css("display","none");
});
