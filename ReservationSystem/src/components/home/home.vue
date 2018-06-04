<template>
 <div class="home">
   <div class="home_content">
      <div class="home_calendar">
        <div>
        <fullcalendar :events="events" locale="zh" lang="zh" @eventClick = 'eventClick'></fullcalendar>
        </div>
        </div>
     <div class="home_info">
       <h1> 校园参观预约系统</h1>
         <p> 学校坐落于美丽的海滨城市大连，地处大连软件园核心区域，占地面积905亩，总建筑面积39.9万平方米 </p>
        <div> 
          <el-button type="danger" @click="P_appointment">个人预约</el-button>
          <el-button type="danger" plain @click="text">团体预约</el-button>
        </div>
     </div>
   </div>
  
   <div class="button_bar">
      <el-row>
        <el-col :span="6" class="home_button">
          <div class="dropdown">
          
            </div>
          <div class="item"><i class="el-icon-date"></i> 预约须知</div>
           
        </el-col>
        <el-col :span="6" class="home_button">
          <div class="dropdown">
       
            </div>
          <div  class="item"><i class="el-icon-tickets"></i> 参观须知</div>
           
        </el-col>
        <el-col :span="6" class="home_button">
          <div class="dropdown">
       
            </div>
        <div  class="item"><i class="el-icon-location-outline"></i> 地理交通</div>
         
        </el-col>
           <el-col :span="6" class="home_button">
             <div class="dropdown">
       
            </div>
        <div  class="item"><i class="el-icon-phone-outline"></i> 联系我们</div>

        </el-col>
      </el-row>
   </div>
 </div>
</template>

<script>
import fullcalendar from '../vue-full/fullCalendar';
export default {
  name: 'HelloWorld',
  data () {
    return {
      events :  [
        {
            "YOUR_DATA": {
                "start_time": "2018-06-10 11:10",
                "bespeak_over_time": "2018-06-09 11:10",
                "over_time": "2018-06-10 13:10",
                "active_time_id": "xonf-h9h9-ukf2-49ps"
            },
            "start": "2018-06-10",
            "title": "企业合作参观"
        },
        {
            "YOUR_DATA": {
                "start_time": "2018-06-15 10:00",
                "bespeak_over_time": "2018-05-10 11:00",
                "over_time": "2018-06-15 11:00",
                "active_time_id": "8rce-xtmd-owdm-hfhz"
            },
            "start": "2018-06-15",
            "title": "新生/家长校园参观"
        },
        {
            "YOUR_DATA": {
                "start_time": "2018-06-20 10:10",
                "bespeak_over_time": "2018-06-15 10:10",
                "over_time": "2018-06-20 11:10",
                "active_time_id": "n7rv-tfp2-hjm1-19ja"
            },
            "start": "2018-06-20",
            "title": "新生/家长校园水水水水少时诵诗书所少时诵诗书所所参观"
        },
           {
            "YOUR_DATA": {
                "start_time": "2018-06-20 10:10",
                "bespeak_over_time": "2018-06-15 10:10",
                "over_time": "2018-06-20 11:10",
                "active_time_id": "n7rv-tfp2-hjmss1-19ja"
            },
            "start": "2018-06-09",
            "title": "新生/家长校园水水水水少时诵诗书所少时诵诗书所所参观"
        }
    ],

         
      
    }
  },
  methods:{
    P_appointment(){
      this.$router.push({
        name: 'form',
        params: {
          date: '2017-9-20'
        }
      })
    },
   dayClick(){
     console.log("dsdsds")
   },
   text(){
     console.log("ssss");
   },
   eventClick(event){
     console.log('home:',event);
   }
   
  },
  components:{
    fullcalendar
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home{
  min-height: 760px;
  min-width: 1200px;

}
.home_content{
    width: 100%;
    height: 85vh;
   background: url('./bg.jpg') 0 0 /100% auto no-repeat;

   min-width: 1150px;
   min-height: 680px;
}

.home_calendar{
  display: inline-block;
  width: 60%;
  height: 100%;
    min-height: 680px;

}
.home_calendar>div{
  width: 750px;
  height: 500px;
  position: relative;
  top: 50%;
  margin: auto;
  transform: translateY(-53%);
}

.home_info{
  display: inline-block;
  width: 39.9%;
  text-align: center;
  position: absolute;
  top: 45%;
  transform: translateY(-60%);
 color: #fff;
text-shadow: 0 0 10px rgb(22, 2, 2);
}
.home_info h1 {
  max-width: 400px;
  margin: auto;
}

.home_info p{
    max-width: 400px;
  margin: 30px auto 80px auto;
  line-height: 1.8;
}
.home_info button{
       padding: 12px 40px;
       margin: 0px 20px;
}
  .button_bar{
    width: 100%;
    height: 15vh;
    background-color: rgba(250, 80, 54, 0.9);
   // rgba(255, 111, 67, 0.9);
    font-size: 16px;
    z-index: 888;
  }
 
  
  .home_button .item{
    top: 50%;
    text-align: center;
    position: relative;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1.1em;
  }
  .home_button i{
    font-size: 1.2em;
  }
  
  .button_bar .home_button::after{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  transition: .5s all;
  z-index: -1;
  height: 0;
}


.button_bar .home_button:nth-child(2)::after{background-color: #448AFF;}
.button_bar .home_button:nth-child(3)::after{background-color: #00BCD4;}
.button_bar .home_button:nth-child(4)::after{background-color: #4CAF50;}
.button_bar .home_button:nth-child(1)::after{background-color: #9C27B0;}
  .button_bar .home_button{
    opacity: .8;
    transition: .3s all;
    height: 15vh;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
  }
  .button_bar .home_button:hover::after{
    height: 100%;
   
  }
  .home_button  .dropdown{
     position: fixed;
  left: 0;
  // top: 0;
  width: 100vw;
  transform: translateY(-100%);
  height: 0;
  z-index: 7777;
  overflow: hidden;
  transition: .5s all .2s;
  color: #fff;
  background-color: rgba(0,0,0,.4);
  opacity: 0;
  }
.button_bar .home_button:hover .dropdown{
  height: 400px;
  opacity: 1;
}
.button_bar .home_button:hover .dropdown:hover{
  background-color: rgba(0,0,0,.7);
}

 </style>
