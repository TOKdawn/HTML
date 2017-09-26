/**
 * Created by dawn on 2017/5/16.
 */
//当前比例为总体1080*720,操作单元18*18,其中外圈3px为墙
var MAPW = 60; //画板宽边中有多少个单元
var MAPH = 40; //画板高边中有多少个单元
var WALLWIDTH = 3; //单元中墙为3px
var ROADWIDTH = 12; //单元中路为12px;
var BORDERUP = 0;
var BORDERLEFT = 1;
var BORDERBOTTEM = 2;
var BORDERRIGHT = 3;
var root1;
var root2;
var friend;
var tree = new Array;
var myArray = new Array();
var NUM = 2399;

var xxx;

function draw(id) {

    function mapUnit(num) {
        this.x = (num % MAPW) * 18;
        this.y = Math.floor(num / MAPW) * 18;
        this.parent = null;
        this.root = num;
        this.up = 0;
        this.left = 0;
        this.bottem = 0;
        this.right = 0; //有墙0,没墙1
        this.show = function() {
            context.fillStyle = "#757575";
            context.fillRect(this.x, this.y, 18, 18); //绘制
            context.clearRect(this.x + 3, this.y + 3, 12, 12); //擦除路径对应的位置
        }
        this.clearwall = function(border) {
            switch (border) {
                case BORDERUP:
                    context.clearRect(this.x + 3, this.y + 0, 12, 3);
                    this.up = 1;
                    break;
                case BORDERLEFT:
                    context.clearRect(this.x + 0, this.y + 3, 3, 12);
                    this.left = 1;
                    break;
                case BORDERBOTTEM:
                    context.clearRect(this.x + 3, this.y + 15, 12, 3);
                    this.bottem = 1;
                    break;
                case BORDERRIGHT:
                    context.clearRect(this.x + 15, this.y + 3, 3, 12);
                    this.right = 1;
                    break;
            }
        }

    };

    // function addchild(father, child) {
    //     console.log(father.root);
    //     child.root = father.root;
    // }

    function findroot(node) {
        console.log(node);
        return node.root;
    }




    var canvase = document.getElementById(id);
    canvase.style = "width: 1080px; height: 720px; background-color: #ffa000;  margin:3px 3px; ";
    var i;
    var rex, rey;
    canvase.width = 1080; //校准canvase单位长度跟页面中一至
    canvase.height = 720;
    var context = canvase.getContext('2d');

    for (i = 0; i < MAPW * MAPH; i++) {
        myArray[i] = new mapUnit(i); //创建操作单元
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
    for (var j = 0; j < 2400; j++) {
        tree[j] = j;
    }
    for (var k = 0; k < 2400; k++) {
        //  while (1) {
        // if((myArray[0].root > 0 )&& (myArray[0].root  = myArray[2399].root)){
        //     break;
        // }
        //
        xxx = (Math.random()) * NUM;
        xxx = (Math.floor(xxx)) + 1; //取随机数0------NUM
        // console.log("zh:" + k);

        rey = (Math.random()) * 10000;
        rey = (Math.floor(rey)) % 4; //再生成一个0123中随机的方向随机数



        rex = tree[xxx];
        if (rex - 60 < 0 || (rex + 60) > 2399 || (rex % MAPW) - 1 < 0 || (rex % MAPW) + 1 > 59) //消除越界项目
            continue;
        switch (rey) {
            case 0:
                if (myArray[rex].up) {
                    k--;
                }
                break;
            case 1:
                if (myArray[rex].right) {
                    k--;
                }
                break;
            case 2:
                if (myArray[rex].bottem) {
                    k--;
                }
                break;
            case 3:
                if (myArray[rex].left) {
                    k--;
                }
                break;
        }




        //root1 = findroot(myArray[rex]) //找当然单元的根

        switch (rey) { //找相邻单元的根
            case 0:
                friend = rex - 60;
                break;
            case 1:
                friend = rex + 1;
                break;
            case 2:
                friend = rex + 60;
                break;
            case 3:
                friend = rex - 1;
                break;
        }

        // root2 = findroot(myArray[friend]);

        // if ((root1 == -1) && (root2 == -1)) { //根据单元和相邻单元的位置拆墙
        //     myArray[friend].root = rex;
        //     myArray[rex].root = rex;
        //     switch (rey) {
        //         case 0:
        //             myArray[rex].clearwall(BORDERUP);
        //             myArray[friend].clearwall(BORDERBOTTEM);
        //             break;
        //         case 1:
        //             myArray[rex].clearwall(BORDERRIGHT);
        //             myArray[friend].clearwall(BORDERLEFT);
        //             break;
        //         case 2:
        //             myArray[rex].clearwall(BORDERBOTTEM);
        //             myArray[friend].clearwall(BORDERUP);
        //             break;
        //         case 3:
        //             myArray[rex].clearwall(BORDERLEFT);
        //             myArray[friend].clearwall(BORDERRIGHT);
        //             break;
        //     }
        //     continue;
        // }
        try {
            myArray[rex].root;
            myArray[friend].root;
        } catch (e) {
            console.log("rex:" + rex + " freend: " + friend);
        }


        if (myArray[friend].root != myArray[rex].root) {
            // console.log(k);
            //if (1) {
            // for (var count = 0; count < 2400; count++) {
            //     if (myArray[count].root == root1 || myArray[count].root == root2) {
            //         myArray[count].root = NUM;
            //     }
            // }

            myArray[rex].root = myArray[friend].root;

            switch (rey) {
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
            tree[xxx] = tree[NUM];
            NUM--;
            if (NUM == 0) {
                break;
            }

            continue;
        } else {
            k--;
        }


    }

}