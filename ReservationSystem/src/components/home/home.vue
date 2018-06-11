<template>
 <div class="home">
   <div class="home_content">
      <div class="home_calendar">
        <div>
        <fullcalendar :events="events" locale="zh" lang="zh" @eventClick = 'eventClick' @changeMonth = 'changeMonth'></fullcalendar>
        </div>
        </div>
     <div class="home_info">
       <h1> 校园参观预约系统</h1>
         <p> 学校坐落于美丽的海滨城市大连，地处大连软件园核心区域，占地面积905亩，总建筑面积39.9万平方米 </p>
        <div> 
          <el-button type="danger" @click="P_appointment">个人预约</el-button>
          <el-button type="danger" plain @click="P_appointment">团体预约</el-button>
        </div>
     </div>
   </div>
  
   <div class="button_bar">
      <el-row>
        <el-col :span="8" class="home_button">
          <div class="dropdown">
                <div class="title"><i class="el-icon-date"></i> 预约须知</div>


    <p class="school_info">
                    学校坐落于美丽的海滨城市大连，地处大连软件园核心区域，占地面积905亩，总建筑面积39.9万平方米，现有在校生14000余人，正式教职工近800人。学校现设有15个教学机构，学科专业涵盖工学、管理学、艺术学、文学4个学科门类，共设置了28个本科专业，面向29个省市招生，同时还有3个高职专科专业面向15个省市招生。
                    </p>




            </div>
          <div class="item"><i class="el-icon-date"></i> 预约须知</div>
           
        </el-col>
      
        <el-col :span="8" class="home_button">
          <div class="dropdown ">
        <div  class="title"><i class="el-icon-location-outline"></i> 地理交通</div>
       

    
          <el-row>
                <el-col :span="12" >

                              <div class="map" id="baiduMap"></div>
                </el-col>
                <el-col :span="12" >
                    <p class="traffic">
                      辽宁省大连市甘井子区软件园路8号</br>
乘坐3路、901路到东软信息学院站下车步行至东软信息学院东门；</br>乘坐10
路、26路、931路到软件园站下车，步行约900米至东软信息学院东门。
                    </p>
                </el-col>
          </el-row>




            </div>
        <div  class="item"><i class="el-icon-location-outline"></i> 地理交通</div>
        </el-col>




           <el-col :span="8" class="home_button">
             <div class="dropdown">
                <div  class="title"><i class="el-icon-phone-outline"></i> 联系我们</div>



<el-row>
  <el-col :span="12" >
    <div class="block">
                        <p>地址：辽宁省大连市甘井子区软件园路8号</p>
                        <p>电话：+86-0411-84835000</p>
                              
                          <p>传真：+86-0411-84769999</p></div>
        </el-col>
        <el-col :span="12" >
        
              <div class="block">
                        <p>网站策划：品牌发展部</p>
                        <p>设计及技术支持：<a class="jump" href="http://shimmer.neusoft.edu.cn/">微光网络工作室</a></p>
                        <p>意见反馈：<a href="mailto:laiwanyun@neusoft.edu.cn">laiwanyun@neusoft.edu.cn</a></p>
                    </div>
        </el-col>
</el-row>

            </div>
              <div  class="item"><i class="el-icon-phone-outline"></i> 联系我们</div>
        </el-col>



      </el-row>
   </div>
 </div>
</template>

<script>
import fullcalendar from "../vue-full/fullCalendar";
export default {
  name: "HelloWorld",
  data() {
    return {
      events: [],

      eventID: ""
    };
  },
  methods: {
    P_appointment() {
      if (!this.eventID) {
        this.$notify({
          title: "警告",
          message: "请选择一天进行预约",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        name: "form",
        params: {
          date: this.eventID
        }
      });
    },
    eventClick(event) {
      this.eventID = event;
      //  console.log(this.eventID)
    },
    getevent(year, month) {
      console.log("year:", year, "month:", month);
      this.$axios({
        method: "post",
        url: "/api/index",
        params: {
          year,
          month
        }
      })
        .then(res => {
          let newdata = JSON.stringify(res.data).replace(
            /"data":/g,
            '"YOUR_DATA":'
          );
          let enddata = JSON.parse(newdata).YOUR_DATA;
          this.events.splice(0, 1000);
          this.events = this.events.concat(enddata);
        })
        .catch(err => {
          console.log("未知错误");
        });

      // this.$axios.post('/api/index',{

      //   }).then((res)=>{
      // let newdata = res.data.replace(/"data":/g, '"YOU_DATA":');
      // this.events = JSON.parse(newdata).YOU_DATA

      //   }).catch((err)=>{
      //     console.log('未知错误')
      //   })
    },
    changeMonth(date) {
      // let year = date.slice(11,4);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      this.getevent(year, month);
    }
  },
  components: {
    fullcalendar
  },
  created() {
    var myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    this.getevent(year, month);
  },
  mounted() {
    var map = new BMap.Map("baiduMap");
    map.centerAndZoom(new BMap.Point(121.542016, 38.895438), 17);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    var opts = {
      width: 180, // 信息窗口宽度
      height: 10, // 信息窗口高度
      // title: "大连东软信息学院" // 信息窗口标题
    };
    var infoWindow = new BMap.InfoWindow(
      "大连东软信息学院 ",
      opts
    ); // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  min-height: 760px;
  min-width: 1200px;
}
.home_content {
  width: 100%;
  height: 85vh;

  background: url("./bg.jpg") 0 0 /100% auto no-repeat;
  min-width: 1150px;
  min-height: 680px;
}
@media screen and (max-aspect-ratio: 12/9) {
  .home_content {
    width: 100%;
    height: 85vh;
    // background-color: #4CAF50;
    background: url("./bg.jpg") 0 0 /100% 100% no-repeat;
    min-width: 1150px;
    min-height: 680px;
  }
}
.home_calendar {
  display: inline-block;
  width: 60%;
  height: 100%;
  min-height: 680px;
}
.home_calendar > div {
  width: 750px;
  height: 500px;
  position: relative;
  top: 50%;
  margin: auto;
  transform: translateY(-53%);
}

.home_info {
  display: inline-block;
  width: 400px;
  text-align: left;
  position: absolute;
  top: 45%;
  transform: translateY(-60%);
  color: #fff;
  padding-left: 40px;
}
.home_info h1 {
  max-width: 400px;
  margin: auto;
}

.home_info p {
  max-width: 400px;
  margin: 30px auto 80px auto;
  line-height: 1.8;
}
.home_info button {
  padding: 12px 40px;
}
.button_bar {
  width: 100%;
  height: 15vh;
  background-color: rgba(250, 80, 54, 0.9);
  // rgba(255, 111, 67, 0.9);
  font-size: 16px;
  z-index: 888;
}

.home_button .item {
  top: 50%;
  text-align: center;
  position: relative;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1.1em;
}
.home_button i {
  font-size: 1.2em;
}

.button_bar .home_button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  transition: 0.5s all;
  z-index: -1;
  height: 0;
}

.button_bar .home_button:nth-child(2)::after {
  background-color: #448aff;
}
.button_bar .home_button:nth-child(3)::after {
  background-color: #00bcd4;
}
.button_bar .home_button:nth-child(1)::after {
  background-color: #4caf50;
}
.button_bar .home_button:nth-child(4)::after {
  background-color: #9c27b0;
}
.button_bar .home_button {
  opacity: 1;
  transition: 0.3s all;
  height: 15vh;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
}
.button_bar .home_button:hover::after {
  height: 100%;
}
.home_button .dropdown {
  position: fixed;
  left: 0;
  // top: 0;
  width: 100vw;
  transform: translateY(-100%);
  height: 0;
  z-index: 7777;
  overflow: hidden;
  transition: 0.5s all 0.2s;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.9);
  opacity: 0;
}
.button_bar .home_button:hover .dropdown {
  height: 450px;
  opacity: 1;
}
.button_bar .home_button:hover .dropdown:hover {
  background-color: #fff;
}
.home .dropdown .title {
  color: rgba(250, 80, 54, 1);
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0px 0px 80px;
}
.home .map {
  width: 600px;
  height: 300px;
  margin: auto;
  display: block;
}
.home .traffic{
  color: #000;
margin-top: 20px;
line-height: 1.9;
font-size: 18px;
}
.home .school_info{
    color: #000;

margin: 20px  auto 0px auto;
line-height: 1.9;
font-size: 18px;
width: 80%;
display: block;
}
.home .block{
    color: #000;

margin: 40px  auto 0px auto;
line-height: 1.9;
font-size: 18px;
width: 80%;
display: block;
}
</style>
