<template>
     <div class="nav_sub show header_basic">
        <div class="container">
            <div class="sub_logo left"><a href="http://www.neusoft.edu.cn/"><img src="./logo.png" /></a></div>
            <div class="nav right">
                <a href="http://www.neusoft.edu.cn/about/about/"><i class="icon-home"></i> 概况</a><a href="http://news.neusoft.edu.cn/"><i class="icon-sound"></i> 新闻</a>
                <a href="http://www.neusoft.edu.cn/schools&departments/"><i class="icon-shareable"></i> 院系</a><a href="http://www.neusoft.edu.cn/2016/1025/6947.shtml"><i class="icon-network"></i> 部门</a>
                <a href="http://www.neusoft.edu.cn/adademics/"><i class="icon-leaf"></i> 人才培养</a>
                <a href="http://www.neusoft.edu.cn/admissions&employmen/"><i class="icon-briefcase"></i> 招生就业</a><a href="http://www.neusoft.edu.cn/life/"><i class="icon-feather"></i> 校园生活</a>
                <a href="#"><i class="icon-paper-plane"></i> 公共服务</a></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
  @import './icons.css';
.header_basic{
        width: 100%;
    font-family: Helvetica,Tahoma,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei",STXihei,STHeiti,Heiti,SimSun,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #333;
    font-size: 14px;
    line-height: 1.5;
}
a, a:hover, a:link, a:visited {
    text-decoration: none;
    color: inherit;
    transition: .3s all;
}

.container {
    width: 1100px;
    margin: 0 auto;
}
.left{
    float: left;
}
.nav_sub{
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 233;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 5px 0 10px rgba(0,0,0,.125);
  height: 0;
  transition: .3s all;
  overflow: hidden;
}

.nav_sub.show{
  height: 60px;
  overflow: visible;
}

.nav_sub .sub_logo{
  
  opacity: 0;
  transition: .3s all;
  height: 60px;
}

.nav_sub.show .sub_logo{
  opacity: 1;
}

.nav_sub .sub_logo img{
  padding: 5px 5px;
  height: 50px;
}
.nav_sub .right a{
  display: inline-block;
  padding: 0 15px;
  height: 60px;
}
.right{
    float: right;
}
.nav_sub .right a:hover{
background-color: #eee;
    color: #1f8dd6;
}
</style>

