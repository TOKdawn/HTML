<template>
<div class="form">
    <div>
        <div class="left">

        </div>
                    <div class="right">
                        <div class="button_bar">
                            <a href="#" class="a-btn">
						<span class="a-btn-text">返回</span>
					
						<span class="a-btn-icon-right"><span></span></span>
					</a>
                        </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="form-ruleForm" label-position="top">
                <el-form-item label="联系人姓名:" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入联系人名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人邮箱:" prop="mail" >
                        <el-input v-model="ruleForm.mail" placeholder="请输入联系人邮箱"></el-input>
                </el-form-item>
               <el-form-item label="参观人数:" prop="amount " >
                        <el-input v-model="ruleForm.amount" placeholder="请输入参观人数"></el-input>
                </el-form-item>
                  <el-form-item label="填写手机号:" prop="phone" >
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                    <el-input placeholder="请输入验证码" v-model="input4">
                        <template slot="append">
                            <el-button type="primary" class="">{{info}}</el-button>
                        </template>
                    </el-input>
            </el-form-item>
            <el-button round class="submit">提 交</el-button>
            
</el-form>
        </div>
    </div>
</div>
</template>
<script>
export default {
   data() {
      return {
          info: '获取',
        ruleForm: {
          name: '',
          mail: '',
         amount: '',
         phone: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入联系人名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
         mail: [
             { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {  message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
         ],
         amount:[
               { required: true, message: '请输入参观人数', trigger: 'blur' } 
         ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    created(){
        this.date = this.$route.params.date;
        console.log(this.date)
    }
    }
}
</script>
<style>
    .form{
        /* background: url('../home/a.jpg') 0 60px /100% 100% no-repeat; */
         /* background-color: rgb(170, 90, 110); */
         background-color: #eee;
           box-shadow: 0 2px 18px rgba(37, 37, 37, 0.5) inset;
        padding-top: 60px;
        min-height: 860px;
        min-width: 1200px;
        height: 100vh;
        overflow: hidden;
        box-sizing: border-box;
    }
    .form >div{
        width: 90%;
        height: 85%; 
        margin: 50px auto;
        overflow: hidden;
        /* box-shadow: 0 2px 18px rgba(37, 37, 37, 0.5); */
        position: relative;
        border-radius: 5px;
    }
    .form .left{
        width: 50%;
        float: left;
        background: rgb(103, 212, 196);
        box-shadow:0px 0px 330px 60px #53C5B9 inset;
        height: 100%;
    }
       .form .right{
        width: 50%;
        float: left;
        background: #3C3E52;
        height: 100%;
        padding-right: 50px;
        box-sizing: border-box;
    }
    .form .button_bar{
        height: 50px;
        position: absolute;
        top:30px;
        right: 30px;
    }
    .form .right .form-ruleForm{
        color: #fff;
        font-size: 16px;
        position: relative;
        top: 80px;
        width: 70%;
        margin: auto;
    }
    .form .el-input__inner{
        font-weight: 300;
        background:transparent;
        border: none;
        border-radius: 0px;
        color: #fff;
        border-bottom: rgba(255,255,255,.3) 2px solid;
        padding-left: 0px;
    }
    .form .el-form-item__label{
        margin-top: 10px;
        line-height: 30px;
              font-weight: 300;
            padding: 0px;
        font-size: 16px;
        color: rgba(255,255,255,.9) ;
    }
    .form .submit{
        line-height: 10px;
        padding: 11px 44px;
        font-size: 16px;
        margin-top: 20px;
         background:linear-gradient(top, #53C5B9 0%, #6f97c5 100%);
         border: none;
           color:#446388;
            text-shadow:0px 1px 1px rgba(255,255,255,0.3);
            
    }
    .form .submit:hover{
        color: #fff;
    }


    /*  */

    .a-btn{
    background:#53C5B9;
    background:-webkit-gradient(linear,left top,left bottom,color-stop(#53C5B9,0),color-stop(#6f97c5,1));
    background:-webkit-linear-gradient(top, #53C5B9 0%, #6f97c5 100%);
    background:-moz-linear-gradient(top, #53C5B9 0%, #6f97c5 100%);
    background:-o-linear-gradient(top, #53C5B9 0%, #6f97c5 100%);
    background:linear-gradient(top, #53C5B9 0%, #6f97c5 100%);
    filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#53C5B9', endColorstr='#6f97c5',GradientType=0 );
    padding-left:20px;
    padding-right:65px;
    height:28px;
    display:inline-block;
    position:relative;
    border:1px solid #5d81ab;
    -webkit-box-shadow:0px 1px 1px rgba(255,255,255,0.8) inset, 1px 1px 3px rgba(0,0,0,0.2), 0px 0px 0px 4px rgba(188,188,188,0.5);
    -moz-box-shadow:0px 1px 1px rgba(255,255,255,0.8) inset, 1px 1px 3px rgba(0,0,0,0.2), 0px 0px 0px 4px rgba(188,188,188,0.5);
    box-shadow:0px 1px 1px rgba(255,255,255,0.8) inset, 1px 1px 3px rgba(0,0,0,0.2), 0px 0px 0px 4px rgba(188,188,188,0.5);
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    float:left;
    clear:both;
    
    overflow:hidden;
    -webkit-transition:all 0.3s linear;
    -moz-transition:all 0.3s linear;
    -o-transition:all 0.3s linear;
    transition:all 0.3s linear;
}
.a-btn-text{
    padding-top:3px;
    display:block;
    font-size:16px;
    white-space:nowrap;
    text-shadow:0px 1px 1px rgba(255,255,255,0.3);
    color:#446388;
    -webkit-transition:all 0.2s linear;
    -moz-transition:all 0.2s linear;
    -o-transition:all 0.2s linear;
    transition:all 0.2s linear;
}
.a-btn-slide-text{
    position:absolute;
    height:100%;
    top:0px;
    right:52px;
    width:0px;
    background:#63707e;
    text-shadow:0px -1px 1px #363f49;
    color:#fff;
    font-size:16px;
    white-space:nowrap;
    text-transform:uppercase;
    text-align:left;
    text-indent:10px;
    overflow:hidden;
    line-height:28px;
    -webkit-box-shadow:-1px 0px 1px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.2) inset;
    -moz-box-shadow:-1px 0px 1px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.2) inset;
    box-shadow:-1px 0px 1px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.2) inset;
    -webkit-transition:width 0.3s linear;
    -moz-transition:width 0.3s linear;
    -o-transition:width 0.3s linear;
    transition:width 0.3s linear;
}
.a-btn-icon-right{
    position:absolute;
    right:0px;
    top:0px;
    height:100%;
    width:52px;
    border-left:1px solid #5d81ab;
    -webkit-box-shadow:1px 0px 1px rgba(255,255,255,0.4) inset;
    -moz-box-shadow:1px 0px 1px rgba(255,255,255,0.4) inset;
    box-shadow:1px 0px 1px rgba(255,255,255,0.4) inset;
}
.a-btn-icon-right span{
    width:25px;
    height:25px;
    opacity:0.7;
    position:absolute;
    left:50%;
    top:50%;
    margin:-14px 0px 0px -13px;
    background:transparent url(./arrow_right.png) no-repeat 50% 55%;
    -webkit-transition:all 0.3s linear;
    -moz-transition:all 0.3s linear;
    -o-transition:all 0.3s linear;
    transition:all 0.3s linear;
}

.a-btn:hover .a-btn-text{
    text-shadow:0px 1px 1px #5d81ab;
    color:#fff;
}

.a-btn:hover .a-btn-icon-right span{
    opacity:1;
}
.a-btn:active{
    position:relative;
    top:1px;
    background:#5d81ab;
    -webkit-box-shadow:1px 1px 2px rgba(0,0,0,0.4) inset;
    -moz-box-shadow:1px 1px 2px rgba(0,0,0,0.4) inset;
    box-shadow:1px 1px 2px rgba(0,0,0,0.4) inset;
    border-color:#53C5B9;
}
</style>

