<template>
<div class="form">
    <div>
        <div class="left">
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
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
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
      subflag: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$axios
          //   .get("/api/index/getPhoneEncode", {
          //     aim: this.ruleForm.aim,
          //     phone: this.ruleForm.phone,
          //     mail: this.ruleForm.mail,
          //     name: this.ruleForm.name,
          //     phone_encode: this.ruleForm.phone_encode,
          //     id: this.ruleForm.id,
          //     amount: this.ruleForm.amount
          //   })

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
          })
          .then((res) => {
            console.log("sub:", res);
            if (res.data.success) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success"
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "正确填写表单",
            type: "warning"
          });
          return false;
        }
      });
    },
    timedown() {
    

 this.$axios({
            method: "post",
            url: "/api/index/getPhoneEncode",
            params: {
             phone: this.ruleForm.phone
            }
          })
        .then((res) => {
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
        .catch((err) => {
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
      .then((res) => {
        console.log("choose: ", res);
        for ( var item  in res.data.data) {
          let oneObj = {
            value: res.data.data[item],
            label: res.data.data[item]
          };
          this.options.push(oneObj);
        }
      })
      .catch((err)=> {
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
  background: rgb(103, 212, 196);
  box-shadow: 0px 0px 330px 60px #53c5b9 inset;
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
  background: linear-gradient(top, #53c5b9 0%, #6f97c5 100%);
  border: none;
  color: #446388;
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
  background: #53c5b9;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(#53c5b9, 0),
    color-stop(#6f97c5, 1)
  );
  background: -webkit-linear-gradient(top, #53c5b9 0%, #6f97c5 100%);
  background: -moz-linear-gradient(top, #53c5b9 0%, #6f97c5 100%);
  background: -o-linear-gradient(top, #53c5b9 0%, #6f97c5 100%);
  background: linear-gradient(top, #53c5b9 0%, #6f97c5 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#53C5B9', endColorstr='#6f97c5',GradientType=0 );
  padding-left: 20px;
  padding-right: 65px;
  height: 28px;
  display: inline-block;
  position: relative;
  border: 1px solid #5d81ab;
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
  color: #446388;
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
  border-left: 1px solid #5d81ab;
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
  text-shadow: 0px 1px 1px #5d81ab;
  color: #fff;
}

.a-btn:hover .a-btn-icon-right span {
  opacity: 1;
}
.a-btn:active {
  position: relative;
  top: 1px;
  background: #5d81ab;
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
  border-color: #53c5b9;
}
</style>

