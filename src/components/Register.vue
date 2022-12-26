<template>
  <div class="bg">
    <div class="register_box">
      <!-- 头部区域 -->
      <div class="register_top">
        <!-- 选择方式 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="邮箱注册" name="first">
            <!-- 邮箱注册页面 -->
            <el-form :rules="rules" :model="emailRegisterFrom" ref="emailRegisterRef">
              <!-- 用户名 -->
              <el-form-item label="" prop="username" >
                <el-input  prefix-icon="iconfont icon-zhanghu" v-model="emailRegisterFrom.username" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="" prop="password" >
                <el-input  prefix-icon="iconfont icon-icon_password" v-model="emailRegisterFrom.password" type="password" placeholder="请输入密码" clearable show-password></el-input>
              </el-form-item>
              <!-- 邮箱 -->
              <el-form-item label="" prop="email" >
                <el-input  prefix-icon="el-icon-message" v-model="emailRegisterFrom.email" placeholder="请输入邮箱" clearable></el-input>
              </el-form-item>
              <div>
                <el-form-item label="" prop="code" style="width: 200px;float: left;">
                  <el-input  prefix-icon="el-icon-more" v-model="emailRegisterFrom.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-button v-if="showCode" type="primary" @click="email_submit">发送</el-button>
                <el-button v-if="!showCode" type="info" disabled>{{count}}s后获取</el-button>
              </div>
              <el-form-item>
                <el-button type="primary" round class="register_button" @click="register_button">注册</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info" round class="back_button" @click="back_button">回到登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号注册" name="second">
               <!-- 手机注册页面 -->
               <el-form :rules="phone_rules" :model="phoneRegisterFrom" ref="phoneRegisterRef">
              <!-- 用户名 -->
              <el-form-item label="" prop="username" >
                <el-input  prefix-icon="iconfont icon-zhanghu" v-model="phoneRegisterFrom.username" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="" prop="password" >
                <el-input  prefix-icon="iconfont icon-icon_password" v-model="phoneRegisterFrom.password" type="password" placeholder="请输入密码" clearable show-password></el-input>
              </el-form-item>
              <!-- 手机号 -->
              <el-form-item label="" prop="phonenumber" >
                <el-input  prefix-icon="el-icon-message" v-model="phoneRegisterFrom.phonenumber" placeholder="请输入手机号" clearable></el-input>
              </el-form-item>
              <div>
                <el-form-item label="" prop="code" style="width: 200px;float: left;">
                  <el-input  prefix-icon="el-icon-more" v-model="phoneRegisterFrom.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-button type="primary" v-if="showCode_phone" @click="phone_submit">发送</el-button>
                <el-button v-if="!showCode_phone" type="info" disabled>{{count_phone}}s后获取</el-button>
              </div>
              <el-form-item>
                <el-button type="primary" round class="register_button" @click="register_phone_button">注册</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info" round class="back_button" @click="back_phone_button">回到登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      emailRegisterFrom:{
        username: "",
        password: "",
        email: "",
        code: ""
      },
      phoneRegisterFrom:{
        username: "",
        password: "",
        phonenumber: "",
        code: ""
      },
      // 校验
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        emial: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      phone_rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        phonenumber: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      // 60s获取显示标志位
      showCode: true,
      count: 60,
      showCode_phone:true,
      count_phone: 60,
    }
  },
  methods: {
    register_button () {
      // 注册事件函数
      this.$message.success('注册成功')
      this.$router.push('login')
    },
    back_button () {
      this.$router.push('login')
    },
    register_phone_button () {
      // 注册事件函数
      this.$message.success('注册成功')
      this.$router.push('login')
    },
    back_phone_button () {
      this.$router.push('login')
    },
    email_submit () {
      this.showCode=!this.showCode
      let TIME_COUNT = 60
      if (!this.timer) {
          this.count = TIME_COUNT
          this.timer = setInterval(()=>{
            if(this.count>0 && this.count<=TIME_COUNT){
              this.count--
            }else {
              this.showCode=!this.showCode
              clearInterval(this.timer)
              this.timer = null
            }
          },1000)
        }
    },
    phone_submit() {
      this.showCode_phone=!this.showCode_phone
      let TIME_COUNT = 60
      if (!this.timer_phone) {
          this.count_phone = TIME_COUNT
          this.timer_phone = setInterval(()=>{
            if(this.count_phone>0 && this.count_phone<=TIME_COUNT){
              this.count_phone--
            }else {
              this.showCode_phone=!this.showCode_phone
              clearInterval(this.timer_phone)
              this.timer_phone = null
            }
          },1000)
        }
    }
  }
}
</script>

<style lang="less" scoped>
 .bg {
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) repeat;
    .register_box {
      width: 400px;
      height: 500px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .register_top {
        width: 80%;
        margin: 40px auto;
        height: 50px;
      }
      .el-form {
        padding-top: 20px;
      }
      .register_button {
          width: 100%;
        }
      .back_button{
          width: 100%;
        }
    } 
  }
</style>