<template>
     <div class="nav_sub show header_basic">
        <div class="container">
            <div class="sub_logo left"><img src="./logo.png" /></div>
            <div class="nav right">
                <a href="#"><i class="icon-home"></i> 概况</a><a href="#"><i class="icon-sound"></i> 新闻</a>
                <a href="#"><i class="icon-shareable"></i> 院系</a><a href="#"><i class="icon-network"></i> 部门</a>
                <a href="#"><i class="icon-leaf"></i> 人才培养</a>
                <a href="#"><i class="icon-briefcase"></i> 招生就业</a><a href="#"><i class="icon-feather"></i> 校园生活</a>
                <a href="#"><i class="icon-paper-plane"></i> 快速导航</a></div>
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
  z-index: 2333;
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
  padding: 10px 10px;
  height: 60px;
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

