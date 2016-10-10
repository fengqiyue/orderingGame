var time = 0;

var pause = true;  //值为 true 的时候，说明当前状态为暂停

var set_timer;

var d = Array(10); //用于保存小div的编号

var d_direct = new Array(      //记录当前位置的方块可以移动到哪些位置
        [0], //为了逻辑简明，不使用第一项
        [2,4],  //1号位的方块可以移动到2号位和4号位
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
    );

var d_position = new Array(    //保存方块的位置
        [0],       //为了逻辑简明，不使用第一项
        [0,0],     //第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
        [150,0],  //方块的大小为 150px * 150px
        [300,0],
        [0,150],
        [150,150],
        [300,150],
        [0,300],
        [150,300],
        [300,300]
    );

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;   //默认按照顺序排好，方块只有八块，第九块没有，
                                                                  //所以为0，我们用0表示空白块

function move(id) { //用于移动方块的函数
    var i = 1;
    while(d[i] != id){   // 用于确定当前触发函数的是哪个区域(编号属于大DIV而不是小方块)
        i++;
    } 

    var target_d = 0; //用于保存小方块可以去的区域，0表示不能移动

    target_d = whereCanTo(i);
    //用来找出小DIV可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号

    if(target_d != 0){
        d[i] = 0; //如果当前可以移动，则把当前小方块移走，当前位置设置为无方块
        d[target_d] = id; //把目标大DIV设置为被点击的小DIV的编号
        document.getElementById("d"+id).style.left = d_position[target_d][0]+"px";
        document.getElementById("d"+id).style.top = d_position[target_d][1]+"px";
    }

    var finish_flag = true;

    for(var k=1; k<9; ++k){  //用于判断游戏是否通关
        if( d[k] != k){
            finish_flag=false;
            break;
            //如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环
        }
    }

    if(finish_flag==true){
        if(!pause)
            start();   //此时调用 start() 函数，效果是暂停游戏,
                       //start() 是一个 toggle，暂停时调用会开始游戏，进行游戏的时候调用会暂停游戏
        alert("恭喜通关！");
    }
}

function whereCanTo(cur_div) {  //参数是大div的编号
    var j = 0;
    var move_flag = false; //方块能否移动的标记

    for(j=0; j<d_direct[cur_div].length; j++){
        if (d[ d_direct[cur_div][j] ]== 0) {
            move_flag = true;
            break;
        }
    }
    if(move_flag){
        return d_direct[cur_div][j];
    }
    else{
        return 0;
    }
}

//定时函数，每一秒执行一次
function timer(){
    time+=1;//一秒钟加一，单位是秒
    var min=parseInt(time/60);//把秒转换为分钟
    var sec=time%60;//取余就是秒
    document.getElementById("timer").innerHTML=min+"分"+sec+"秒";//把时间更新显示出来
}

function start(){
    if(pause){
        document.getElementById("start").innerHTML = "暂停"; //当前状态为游戏进行中，把开始按钮切换为暂停 
        pause = false;//暂停标志设置为false
        set_timer = setInterval(timer,1000);//启动定时,每1000毫秒调用一次
    }else{
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);
    }
}

function restart(){
    time=0;//把时间设置为0
    random_d();//把方块随机打乱函数
    if(pause)//如果暂停，则开始计时
        start();
}

function random_d(){
    // for(var i=9; i>1; --i){
    //     var to=parseInt(Math.random()*(i-1)+1);//产生随机数，范围为1到i，不能超出范围，因为没这个id的DIV
    //     if(d[i]!=0){          //把当前的DIV位置设置为随机产生的DIV的位置
    //         document.getElementById("d"+d[i]).style.left=d_position[to][0]+"px";
    //         document.getElementById("d"+d[i]).style.top=d_position[to][1]+"px";
    //     }

    //     if(d[to]!=0){           //把随机产生的DIV的位置设置为当前的DIV的位置
    //         document.getElementById("d"+d[to]).style.left=d_position[i][0]+"px";
    //         document.getElementById("d"+d[to]).style.top=d_position[i][1]+"px";
    //     }

    //     var tem=d[to];         //然后把它们两个的DIV保存的编号对调一下
    //     d[to]=d[i];
    //     d[i]=tem;
    // }
    move(6);
    move(5);
    move(2);
    move(1);
    move(4);
    var i = 30;
    while(i>0){
        move(parseInt(Math.random()*9));
        i--;
    }
}

window.onload=function(){  //初始化函数，页面加载的时候调用重置函数，重新开始
    restart();
}