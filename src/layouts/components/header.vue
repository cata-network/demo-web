<template>
  <div class="header-comp">
    <div class="hearder-log">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        text-color="#9fc4f9"
        active-text-color="#689df1"
      >
        <el-menu-item :index="key" v-for="(item, key) in menuMap" :key="key">{{
          item
        }}</el-menu-item>
      </el-menu>
    </div>
    <div class="hearder-search">
      <Search />
    </div>
    <div class="hearder-login">

      <div class="login-nav" v-if="show_user">
        <div class="title" @click="onShow">
          {{ user.email }} <i class="el-icon-arrow-down"></i>
        </div>
        <ul v-show="show" class="login-nav-ul">
          <li @click="getUserInfo">Wallet</li>
          <li @click="out">Logout</li>
        </ul>

        <Dialog :dialogVisible="dialogVisible" @close="dialogVisible = false" />
        <SellShop :sellState="sellState" @close="sellState = false" />
      </div>

      <div v-else>
        <el-link @click="onSkip('/#/login')">Login</el-link>
        <el-link @click="onSkip('/#/register')">Register</el-link>
      </div>

    </div>
  </div>
</template>

<script>
import User from "./userNav"
import { getToken } from "@/utils"
import { mapActions } from "vuex"
import { getMap, getUserMap } from "@/api/init"
import Search from "@/components/common/Search"

const menuConfig = {
  1: "/index",
  2: "/my/shoping",
  3: "/publish/shop",
  4: "/shop/cart",
}
export default {
  name: "header-comp",
  data() {
    return {
      show_user:false,
      show:false,
      user: {},
      token:"",
      email:"",
      menuMap: {
        1: "Marketplace",
        2: "My Goods",
        3: "My Work",
        4: "Flood Fill",
      },
      menuConfig,
      activeIndex: this.getMenuIndex(),
      show: false,
      dialogVisible: false,
      sellState: false,
    }
  },
  watch: {
    $route: function(newVal) {
      const { path } = newVal
      Object.keys(menuConfig).forEach((key) => {
        const item = menuConfig[key]
        if (item === path) {
          this.activeIndex = key
        }
      })
    },
  },
  components: {
    User,
    Search,
  },
  methods: {
  //  ...mapActions("global", ["setUserInfo", "setMapData"]),
   getInit() {
      const token = localStorage.getItem('token')
      const email= localStorage.getItem('email')

     this.token = token;
     this.email = email;


     //this.setUserInfo(data) // 个人信息
      this.user.email = email;
      this.user.token = token;

      console.log("user info", this.user);

     if (token!=undefined) {
       console.log("show user info")
       this.show_user = true;
     }

     // const initMap = await getMap()
      // const userMap = await getUserMap()
      // this.setMapData({
      //   ...initMap,
      //   ...userMap,
      // }) // 映射map
    },
    getMenuIndex() {
      let i = "1"
      for (let key in menuConfig) {
        const curPath = menuConfig[key]
        if (curPath == this.$route.path) {
          i = key
        }
      }
      return i
    },
    onSkip(url) {
      window.location.replace(url)
    },
    handleSelect(index) {
      const path = menuConfig[index]
      this.activeIndex = index

      //如果不是市场，则需要登陆，没有登陆则跳转到登陆页
      if (1!=index) {
        console.log("token", localStorage.getItem('token'));
        if ( null==localStorage.getItem('token') ) {
          console.log("need login");
          //线上提示符
          this.$message({
            'message': 'Need login to access',
            type: 'warning'
          });
          this.$router.push("/login");//到login登陆
        }
        else {
          this.$router.push(path);
        }
      }
      else {
        this.$router.push(path);
      }

    },
    onShow() {
      this.show = !this.show;
    },
    out() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      window.location.replace("/#/login");
    },

    navShow(e) {
      const map = ["title", "el-icon-arrow-down"];
      if (!this.show || map.indexOf(e.target.className) > -1) return;
      this.show = false;
    },


    getUserInfo() {
      this.$router.push("/user/info");
    },
  },
  mounted() {
    this.getInit()
    document.addEventListener("click", this.navShow);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.navShow);
  },
}
</script>
<style lang="less" scoped>
.header-comp {
  padding: 0 100px;
  width: calc(100% - 200px);
  background: #fff;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hearder-log {
    cursor: pointer;
  }
  .hearder-login {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .admin-btn {
    a {
      color: #ccc;
      &:hover {
        text-decoration: underline;
        color: #689df1;
      }
    }
  }
}

.login-nav {
  height: 100%;
  display: flex;
  position: relative;
  width: 140px;
  align-items: center;
  justify-content: center;
  .title {
    &:hover {
      color: #589ef8;
    }
  }
  .login-nav-ul {
    width: 100%;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 99999;
    font-size: 14px;
    padding: 10px 0;
    margin: 5px 0;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    li {
      text-align: center;
      line-height: 36px;
      &:hover {
        background: #eef5fe;
        color: #589ef8;
      }
    }
  }
}
</style>
