<template>
<div class="form">
    <div>
        <div class="left">
          <h1>参观须知:</h1>
          <p>1、参观当天请携带有效身份证件（身份证、户口本或护照原件）按照规定时间到工作人员处登记，过时不候；
            </br>

2、由于校园内部禁止外部车辆通行且周围停车位置有限，无法容纳所有车辆。请尽量乘坐公共交通到校或及早抵达自行寻找车辆停放位置；
</br>
3、请遵守学校秩序，听从工作人员指引，按照预定的参观线路依次前行，以免干扰校内正常教学秩序；
</br>
4、请自行保管好私人财物，我们不对来访人员私人财物的损坏或损失负责；
</br>
5、参观过程中请勿有以下行为：处于销售或交换目的的展示任何物品或服务；散发传单、集会或演讲；分发、展示任何形式的印刷品、录制品、旗帜、横幅或标牌等； 
</br>
6、为了保持学校环境卫生以及在校学生及来访人员人身安全，不可携带宠物及法律规定的危险物品（包括但不限于任何种类的火器、弹药或攻击性武器及其他易燃、易爆、有害、有毒物品等）；
</br>
7、请来访人员在指定区域吸烟，因非吸烟区域内吸烟导致的本校或者第三方的人身、财产损害，由吸烟的来访人员承担赔偿责任；
</br>
8、不乱丢杂物、纸屑；不随地吐痰；垃圾和废弃物品请及时放入垃圾桶内，切勿随地抛弃。请爱护学校内花、草、树木。请勿攀折、采、摘及践踏、损坏草坪、绿地、雕塑等；
</br>
9、如学校进行重要接待、大型活动或出现暴雨、雷电、台风等恶劣天气、停电，以及其他不可抗拒因素，学校可能会临时改变参观时间或封闭部分区域，具体行程变化以当日公告为准；

以上参观须知敬请来访人员在入园前认真阅读并遵守，来访人员入校后视为认同以上管理要求，所有内容最终解释权归大连东软信息学院所有。

</p>

<el-checkbox v-model="checked" class="cheakbox">我已阅读须知</el-checkbox>
        </div>
                    <div class="right">
                        <div class="button_bar" @click="gohome">
                            <a href="#" class="a-btn">
						<span class="a-btn-text" >返回</span>
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
         
                        <el-form-item label="参观目的:"    class="select">
                              <el-select
                                v-model="ruleForm.aim"
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                </el-form-item>
                
                 <el-form-item label="参观人数:" prop="amount" style="margin-left:180px; margin-bottom:0px;">
                        <el-input v-model="ruleForm.amount" placeholder="请输入参观人数"></el-input>
                </el-form-item>
        
                  <el-form-item label="填写手机号:" prop="phone" >
                        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                    <el-input placeholder="请输入验证码" v-model="ruleForm.phone_encode">
                        <template slot="append">
                            <el-button  :disabled="subflag" @click="timedown">{{count}}</el-button>
                        </template>
                    </el-input>
            </el-form-item>
            <el-button round class="submit" @click=" submitForm('ruleForm')" > 提 交</el-button>

            </el-form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      count: "获取",
      timer: "",
      ruleForm: {
        name: "",
        mail: "",
        amount: "",
        phone: "",
        aim: "",
        id: "",
        phone_encode: ""
      },
      options: [],
      rules: {
        name: [
          { required: true, message: "请输入联系人名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
        ],
        amount: [
          { required: true, message: "请输入参观人数", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号码", trigger: "blur" }
        ]
      },
      subflag: false,
      checked: false
    };
  },
  methods: {
    submitForm(formName) {
      if (!this.checked) {
        this.$notify({
          title: "警告",
          message: "请阅读并勾选参观须知",
          type: "warning"
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios({
              method: "post",
              url: "/api/index/join",
              params: {
                aim: this.ruleForm.aim,
                phone: this.ruleForm.phone,
                mail: this.ruleForm.mail,
                name: this.ruleForm.name,
                phone_encode: this.ruleForm.phone_encode,
                id: this.ruleForm.id,
                amount: this.ruleForm.amount
              }
            }).then(res => {
              console.log("sub:", res);
              if (res.data.success) {
                this.$alert("您已成功预约,请留意查看邮箱信息", "成功预约", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$router.push("/home");
                  }
                });
              }
            });
          } else {
            this.$notify({
              title: "警告",
              message: "正确填写表单",
              type: "warning"
            });
            return false;
          }
        });
      }
    },
    timedown() {
      this.$axios({
        method: "post",
        url: "/api/index/getPhoneEncode",
        params: {
          phone: this.ruleForm.phone
        }
      })
        .then(res => {
          console.log("phone:", res);
          const TIME_COUNT = 60;
          this.subflag = true;
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                clearInterval(this.timer);
                this.subflag = false;
                this.count = "获取";
              }
            }, 1000);
          }
        })
        .catch(err => {
          console.log("未知错误");
        });
    },
    gohome() {
      this.$router.push("/home");
    }
  },
  created() {
    this.ruleForm.id = this.$route.params.date;
    console.log(this.ruleForm.id);
    this.options = [];
    this.$axios
      .get("/api/index/choose")
      .then(res => {
        console.log("choose: ", res);
        for (var item in res.data.data) {
          let oneObj = {
            value: res.data.data[item],
            label: res.data.data[item]
          };
          this.options.push(oneObj);
        }
      })
      .catch(err => {
        console.log("错误", err);
      });
  }
};
</script>
<style>
.form {
  background: url("../home/bg.jpg") 0 0 /100% auto no-repeat;
}
@media screen and (max-aspect-ratio: 14/9) {
  .form {
    background: url("../home/bg.jpg") 0 0 /100% 100% no-repeat;
  }
}
.form {
  /* background: url('../home/a.jpg') 0 60px /100% 100% no-repeat; */
  /* background-color: rgb(170, 90, 110); */
  background-color: #eee;
  box-shadow: 0 2px 18px rgba(37, 37, 37, 0.5) inset;
  padding-top: 40px;
  min-height: 900px;
  min-width: 1200px;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.form > div {
  width: 90%;
  height: 85%;
  margin: 50px auto;
  overflow: hidden;
  /* box-shadow: 0 2px 18px rgba(37, 37, 37, 0.5); */
  position: relative;
  border-radius: 5px;
}
.form .left {
  width: 50%;
  float: left;
  background: rgba(250, 80, 54,1);
  box-shadow: 0px 0px 330px 60px #f97040 inset;
  height: 100%;
}
.form .right {
  width: 50%;
  float: left;
  background: #3c3e52;
  height: 100%;
  padding-right: 50px;
  box-sizing: border-box;
}
.form .button_bar {
  height: 50px;
  position: absolute;
  top: 30px;
  right: 30px;
}
.form .right .form-ruleForm {
  color: #fff;
  font-size: 16px;
  position: relative;
  top: 80px;
  width: 70%;
  margin: auto;
}
.form .el-input__inner {
  font-weight: 300;
  background: transparent;
  border: none;
  border-radius: 0px;
  color: #fff;
  border-bottom: rgba(255, 255, 255, 0.3) 2px solid;
  padding-left: 0px;
}
.form .el-form-item__label {
  margin-top: 5px;
  line-height: 30px;
  font-weight: 300;
  padding: 0px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}
.form .submit {
  line-height: 10px;
  padding: 11px 44px;
  font-size: 16px;
  margin-top: 20px;
  background: #f6493b ;
  border: none;
  color: #eee;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.3);
}
.form .submit:hover {
  color: #fff;
}
.form .select {
  width: 177px;
  float: left;
}

/*  */

.a-btn {
  background: #f6493b;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(#f6493b, 0),
    color-stop(#ff603b, 1)
  );
  background: -webkit-linear-gradient(top, #f6493b 0%, #ff603b 100%);
  background: -moz-linear-gradient(top, #f6493b 0%, #ff603b 100%);
  background: -o-linear-gradient(top, #f6493b 0%, #ff603b 100%);
  background: linear-gradient(top, #f6493b 0%, #ff603b 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f6493b', endColorstr='#ff603b',GradientType=0 );
  padding-left: 20px;
  padding-right: 65px;
  height: 28px;
  display: inline-block;
  position: relative;
  border: 1px solid #f6493b;
  -webkit-box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8) inset,
    1px 1px 3px rgba(0, 0, 0, 0.2), 0px 0px 0px 4px rgba(188, 188, 188, 0.5);
  -moz-box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8) inset,
    1px 1px 3px rgba(0, 0, 0, 0.2), 0px 0px 0px 4px rgba(188, 188, 188, 0.5);
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.8) inset,
    1px 1px 3px rgba(0, 0, 0, 0.2), 0px 0px 0px 4px rgba(188, 188, 188, 0.5);
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  float: left;
  clear: both;

  overflow: hidden;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}
.a-btn-text {
  padding-top: 3px;
  display: block;
  font-size: 16px;
  white-space: nowrap;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.3);
  color: #eee;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.a-btn-slide-text {
  position: absolute;
  height: 100%;
  top: 0px;
  right: 52px;
  width: 0px;
  background: #63707e;
  text-shadow: 0px -1px 1px #363f49;
  color: #fff;
  font-size: 16px;
  white-space: nowrap;
  text-transform: uppercase;
  text-align: left;
  text-indent: 10px;
  overflow: hidden;
  line-height: 28px;
  -webkit-box-shadow: -1px 0px 1px rgba(255, 255, 255, 0.4),
    1px 1px 2px rgba(0, 0, 0, 0.2) inset;
  -moz-box-shadow: -1px 0px 1px rgba(255, 255, 255, 0.4),
    1px 1px 2px rgba(0, 0, 0, 0.2) inset;
  box-shadow: -1px 0px 1px rgba(255, 255, 255, 0.4),
    1px 1px 2px rgba(0, 0, 0, 0.2) inset;
  -webkit-transition: width 0.3s linear;
  -moz-transition: width 0.3s linear;
  -o-transition: width 0.3s linear;
  transition: width 0.3s linear;
}
.a-btn-icon-right {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 52px;
  border-left: 1px solid #f6493b;
  -webkit-box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;
  -moz-box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;
  box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;
}
.a-btn-icon-right span {
  width: 25px;
  height: 25px;
  opacity: 0.7;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -14px 0px 0px -13px;
  background: transparent url(./arrow_right.png) no-repeat 50% 55%;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
}

.a-btn:hover .a-btn-text {
  text-shadow: 0px 1px 1px #f6493b;
  color: #fff;
}

.a-btn:hover .a-btn-icon-right span {
  opacity: 1;
}
.a-btn:active {
  position: relative;
  top: 1px;
  background: #f6493b;
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  border-color: #ff603b;
}
.form .left {
  padding: 20px 50px;
  text-align: left;
  color: #fff;
  box-sizing: border-box;
 
}
.form .left h1 {
  text-align: left;
}
.form .left p {
  font-size: 14px;
  line-height: 1.7;
}

.form .cheakbox {
  color: #fff;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eee;
}
.form .el-checkbox__label {
  font-size: 16px;
}
</style>

