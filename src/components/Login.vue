<template>
  <div class="bg">
  <div class="login_box">
    <!-- 头部区域 -->
    <div class="login_top">
      <img src="../assets/images/login-header.png" style="float:left;width:400px;height: 150px;margin: 0 auto;">
    </div>
    <div>
      <img src="../assets/images/avatar.png"  class="avatar_box">
    </div>
    <!-- 登录表单区域 -->
    <el-form :rules="rules" :model="formLogin" ref="loginFormRef" label-width="1px" class="login_form">
      <!-- 用户名 -->
      <el-form-item label="" prop="username" >
        <el-input  prefix-icon="iconfont icon-zhanghu" v-model="formLogin.username" clearable></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="" prop="password" >
        <el-input  prefix-icon="iconfont icon-icon_password" v-model="formLogin.password" type="password" clearable show-password></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <div>
        <el-form-item label="" prop="code" style="width: 200px;float: left;">
        <el-input  prefix-icon="el-icon-more" v-model="formLogin.code" auto-complete="off" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <div class="login-code" width="100%" @click="refreshCode">
          <Identify :identifyCode="identifyCode"></Identify>
        </div>
      </div>
      <!-- 记住 -->
      <el-form-item><el-checkbox v-model="formLogin.checked">记住账号</el-checkbox></el-form-item>
       <!-- 尾部区域 -->
      <el-form-item>
        <el-button type="primary" round class="login_button" @click="login_button">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round class="register_button" @click="register_button">还没有账户？点击注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>

import Identify from '../components/Identify.vue'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      // 表单提交内容
      formLogin: {
        username: "",
        password: "",
        code: "",
        checked: false
      },
      loginForm:{
        username: "",
        password: ""
      },
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',//随机串内容
      identifyCode: '',
      // 校验
      rules: {
        username: [
        { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    }
  },
  mounted () {
  // 初始化验证码
  this.identifyCode = ''
  this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 登录事件
    login_button () {
      this.loginForm.username = this.formLogin.username
      this.loginForm.password = this.formLogin.password
      if (this.formLogin.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
        this.$message.error('请填写正确验证码')
        this.refreshCode()
        this.formLogin.code=''
        return
      }
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        Cookies.set('username',this.loginForm.username)
        const { data: res } = await this.$http.post('http://127.0.0.1:5000/login', {'user':this.loginForm.username,'pwd':this.loginForm.password})
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败!')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/last')
      })
    },
    // 注册事件
    register_button () {
      this.$router.push('register')
    },
    // 重置验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
    }
    },
    randomNum (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
    },
  },
  components: { Identify }	//写在export default{}中与data同级表示使用组件
}
</script>

<style lang="less" scoped>
  .bg {
    width: 100%;
    height: 100%;
    background: url(../assets/images/bg.jpg) repeat;
  }
  .login_box {
    width: 400px;
    height: 600px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .login_top {
      width: 430px
    }
    .avatar_box {
      position: absolute;
      width: 100px;
      height: 100px;
      left: 50%;
      transform: translate(-50%,100%);
      border-radius: 100px;
      border:  4px solid #fff;
    }
    .login_form{
    position: absolute;
    width: 100%;
    padding: 0 40px;
    bottom: 0px;
    box-sizing: border-box;
      .el-checkbox {
      float: left;
      padding-top: 6px;
      left: -199px;
      }
      .login_button {
          width: 100%;
        }
      .register_button{
          width: 100%;
        }
  }
  }
</style>