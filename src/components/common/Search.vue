<template>
  <div class="search-comp-page">
    <input
      class="input"
      placeholder="input and search..."
      type="search"
      v-model="value"
      autofocus="autofocus"
      @keyup.enter="onSearch"
    />
    <div class="btn" @click="onSearch"><i class="el-icon-search"></i></div>
    <!-- 搜索出来的列表 -->
    <!--<ul v-if="isUl">-->
      <!--<template v-if="list.length == 0">-->
        <!--<div class="not">无数据</div>-->
      <!--</template>-->
      <!--<template v-else>-->
        <!--<li v-for="item in list" :key="item.id" @click="handleDetails(item)">-->
          <!--{{ item.title }}-->
        <!--</li>-->
      <!--</template>-->
    <!--</ul>-->
  </div>
</template>

<script>
import { searchShop } from "@/api/shop"

export default {
  name: "search-comp-page",
  data() {
    return {
      value: "",
    }
  },
  // watch: {
  //   // value(newVal) {
  //   //   this.value = newVal.trim()
  //   // },
  // },
  methods: {
    onSearch() {
    console.log("input word", this.value);
    this.$router.push({
      path: "/index/",
      query: {
        word: this.value,
      },
    })

      // this.$router.push({
      //   name: 'Search', // 路径
      //   params:{
      //     word: this.value, // 参数1
      //   }
      // })

      // if (!this.value) {
      //   this.$message.warning("请输入搜索内容")
      //   return
      // }
      // const res = await searchShop({
      //   title: this.value,
      // })
      // const { list = [] } = res || {}
      // this.list = list
      // this.isUl = true
    },

  },
}
</script>
<style lang="less" scoped>
.search-comp-page {
  height: 32px;
  line-height: 32px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .input {
    font-size: 12px;
    display: inline-block;
    width: calc(100% - 40px);
    height: 100%;
    line-height: inherit;
    border: 0 none;
    outline: 0;
    background: #fff;
    vertical-align: top;
    text-indent: 16px;
    border: 1px solid #e8e8ed;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px 0 0 4px;
    color: #555;
    &:focus {
      border-color: #589ef8;
    }
  }
  .btn {
    height: 100%;
    width: 40px;
    background: #589ef8;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 4px 4px 0;
  }
  ul {
    position: absolute;
    left: 0;
    top: 40px;
    z-index: 8888;
    width: 400px;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px 0;
    li {
      padding: 0 14px;
      line-height: 36px;
      cursor: pointer;
      &:hover {
        background: #f5f7fa;
      }
    }
    .not {
      text-align: center;
      color: #ccc;
    }
  }
}
</style>
