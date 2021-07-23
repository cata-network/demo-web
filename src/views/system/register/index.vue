<template>
  <div class="register-page">
    <div class="content">
      <div class="img">
        <img :src="imgLogin" alt="login" />
      </div>
      <div class="info">
        <h4 class="title">
          <span class="left"></span>
          <div class="text">Register</div>
          <span class="right"></span>
        </h4>

        <!-- 登陆 -->
        <div class="user">
          <!-- 用户名 -->
          <div class="user-warp">
            <span>Email</span>
            <input
              type="text"
              v-model="form.username"
              placeholder="Please input Email"
            />
          </div>
          <!-- 密码 -->
          <div class="user-warp">
            <span>Password</span>
            <input
              v-model="form.password"
              placeholder="Set your password"
              type="password"
            />
          </div>
          <div class="user-warp">
            <span>Confirm password</span>
            <input
              @keypress.enter="handleRegister"
              placeholder="re input password"
              type="password"
              v-model="passwords"
            />
          </div>

          <div class="user-login">
            <div class="btn" @click="handleRegister">Register</div>
          </div>
        </div>

        <!-- 跳转注册 -->
        <div class="rigister">
          Have account，Goto<el-link type="primary" @click="handleLogin"
            >Login</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, userEdit } from "@/api/user"
import format from "../mixins"

export default {
  name: "register-page",
  mixins: [format],
  data() {
    return {
      imgLogin:
        "https://daes-1251985304.cos.ap-shanghai.myqcloud.com/shop/home/register.png",
      form: {
        username: "",
        password: "",
      },
      passwords: "",
    }
  },
  methods: {
    handleRegister() {
      // if (!this.formValid(this.form)) return
      if (!this.passwords.trim() || this.passwords !== this.form.password) {
        this.$message.warning("两次密码不一致")
        return
      }

      //注册
      axios
          .get('http://rest.cata.show/user/reg_user?email='+ this.form.username +'&password=' + this.form.password)
          .then((res)=>{
                    //console.log(res.data)
                    this.$message.success("注册成功")
                    // 跳转到登陆界面
                    this.handleLogin()
                  }
          )

    },
    handleLogin() {
      window.location.replace("/#/login")
    },
  },
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
