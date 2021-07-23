<template>
  <div class="login-page">
    <div class="content">
      <div class="img">
        <img
          src="https://daes-1251985304.cos.ap-shanghai.myqcloud.com/shop/home/login.png"
          alt="login"
        />
      </div>
      <div class="info">
        <h4 class="title">
          <span class="left"></span>
          <div class="text">Welcome Login</div>
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
              placeholder="Please input email"
            />
          </div>
          <!-- 密码 -->
          <div class="user-warp">
            <span>Password</span>
            <input
              @keypress.enter="onLogin"
              placeholder="Please input password"
              v-model="form.password"
              type="password"
            />
          </div>

          <div class="user-login">
            <div class="btn" @click.stop="onLogin">Login</div>
          </div>
        </div>

        <!-- 跳转注册 -->
        <div class="rigister">
          No account，Goto <el-link type="primary" @click="handleRegister"
            >Register</el-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user"
import { pro_token } from "@/constant"
import format from "../mixins"

export default {
  name: "login-page",
  mixins: [format],
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    }
  },
  methods: {
    handleRegister() {
      window.location.replace("/#/register")
    },
    // 登陆
    onLogin() {
      // if (!this.formValid(this.form)) return

      //登陆
      axios
          .get('http://rest.cata.show/user/check_user_login_input?email='+ this.form.username +'&password=' + this.form.password)
          .then((res)=>{
            console.log(res.data);
            console.log(res.data.token);

            this.$message.success("登陆成功")

            // 存入本地
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('email', this.form.username);

            this.$router.replace("/")
          }
          )



    },
  },
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
