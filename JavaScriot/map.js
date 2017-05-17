/**
 * Created by dawn on 2017/5/16.
 */
//当前比例为总体1080*720,操作单元18*18,其中外圈3px为墙
var MAPW=60;//画板宽边中有多少个单元
var MAPH=40;//画板高边中有多少个单元
var WALLWIDTH=3;//单元中墙为3px
var ROADWIDTH=12;//单元中路为12px;
var BORDERUP=0;
var BORDERLEFT=1;
var BORDERBOTTEM=2;
var BORDERRIGHT=3;
var root1;
var root2;
var friend;
var tree=new Array;
var NUM=2399;
var xxx;
// function zpy() {
//  var x;
//  var y;
//  var borderup;
//  var borderbottem;
//  var borderleft;
//  var borderright;
//  var road;
//  function delborder(  border) {
//
//  }
// function show() {
//     context.fillStyle="#757575";
//     context.fillRect(x,y,18,18);
//     context.clearRect(x+3,y+3,12,12);
// }
//
// }
function draw(id) {

    var canvase=document.getElementById(id);
    canvase.style="width: 1080px; height: 720px; background-color: #ffa000;  margin:3px 3px; ";
    var i;
    var rex,rey;
    canvase.width=1080;//校准canvase单位长度跟页面中一至
    canvase.height=720;
    var context = canvase.getContext('2d');
    var myArray=new Array();
    for(i=0;i<MAPW*MAPH;i++){
        myArray[i]=new Object();//创建操作单元
        myArray[i].x=(i%MAPW)*18;//操作单元的对应x坐标
        myArray[i].y=Math.floor(i/MAPW)*18;//操作单元的对应y坐标
        myArray[i].root=-1;
        myArray[i].show=function () {
            context.fillStyle="#757575";
            context.fillRect(this.x,this.y,18,18);//绘制
            context.clearRect(this.x+3,this.y+3,12,12);//擦除路径对应的位置
        }

        myArray[i].clearwall=function (border) {//拆除墙壁,参数border为要拆除的方向
            switch (border){
                case BORDERUP:
                    context.clearRect(this.x+3,this.y+0,12,3);
                    break;
                case BORDERLEFT:
                    context.clearRect(this.x+0,this.y+3,3,12);
                    break;
                case BORDERBOTTEM:
                    context.clearRect(this.x+3,this.y+15,12,3);
                    break;
                case BORDERRIGHT:
                    context.clearRect(this.x+15,this.y+3,3,12);
                    break;
            }
        }
        myArray[i].show();
    }
    // function shoaw(zzp) {
    //     return myArray[zzp].root;
    // }

    // function find(father) {
    //     if(myArray[father].root<0)
    //         return father;
    //     else
    //         return myArray[father].root;
    // }

    for(var j=0;j<2400;j++){
        tree[j]=j;
    }


    for(var k=0;k<2400;k++){

        // if((myArray[0].root > 0 )&& (myArray[0].root  = myArray[2399].root)){
        //     break;
        // }
        //
        xxx = (Math.random()) * NUM;
        xxx = (Math.floor(xxx)) +1;//取随机数


        rey = (Math.random()) * 10000;
        rey = (Math.floor(rey))%4;//再生成一个0123中随机的方向随机数

        rex=tree[xxx];
        tree[xxx]=tree[NUM];




        if(rex-60<0||rex+60>2399||(rex/MAPW)-1<0||(rex/MAPW)+1>59)//消除越界项目
            continue;
        NUM--;
        root1=myArray[rex].root;//找当然单元的根

        switch (rey){//找相邻单元的根
            case 0:
                friend=rex-60;
                break;
            case 1:
                friend=rex+1;
                break;
            case 2:
                friend=rex+60;
                break;
            case 3:
                friend=rex-1;
                break;
        }
        root2=myArray[friend].root;
        if((root1==-1)&& (root2==-1)){//根据单元和相邻单元的位置拆墙
                myArray[friend].root=NUM;
                myArray[rex].root=NUM;
            switch (rey){
                case 0:
                    myArray[rex].clearwall(BORDERUP);
                    myArray[friend].clearwall(BORDERBOTTEM);
                    break;
                case 1:
                    myArray[rex].clearwall(BORDERRIGHT);
                    myArray[friend].clearwall(BORDERLEFT);
                    break;
                case 2:
                    myArray[rex].clearwall(BORDERBOTTEM);
                    myArray[friend].clearwall(BORDERUP);
                    break;
                case 3:
                    myArray[rex].clearwall(BORDERLEFT);
                    myArray[friend].clearwall(BORDERRIGHT);
                    break;
            }
            continue;
        }
        if(root2!=root1){
            for(var count=0;count<2400;count++){
                if(myArray[count].root==root1||myArray[count].root==root2) {
                    myArray[count].root = NUM;
                }
            }

            switch (rex){
                case 0:
                    myArray[rex].clearwall(BORDERUP);
                    myArray[friend].clearwall(BORDERBOTTEM);
                    break;
                case 1:
                    myArray[rex].clearwall(BORDERRIGHT);
                    myArray[friend].clearwall(BORDERLEFT);
                    break;
                case 2:
                    myArray[rex].clearwall(BORDERBOTTEM);
                    myArray[friend].clearwall(BORDERUP);
                    break;
                case 3:
                    myArray[rex].clearwall(BORDERLEFT);
                    myArray[friend].clearwall(BORDERRIGHT);
                    break;
            }
            continue;
        }
        continue;

    }

}