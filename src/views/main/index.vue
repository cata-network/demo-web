<template>
  <div class="main-shop-page">

    <NotContent v-if="NotContent" />
    <div class="shop-item" v-else>
      <shop-item
        class="item"
        v-for="item in list"
        :key="item.id"
        :shop="item"
        @info="handleDetails"
      />
    </div>

    <Page
      :total="total"
      :pageSize="pageSize"
      :curPage="curPage"
      @handleChange="handlePage"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import ShopItem from "@/components/ShopItem"
import Page from "@/components/common/Page"
import NotContent from "@/components/common/NotContent"

export default {
  name: "main-shop-page",
  data() {
    return {
      list: [],
      total: 0,
      pageSize: 10,
      curPage: 1,
      NotContent: false,
    }
  },
  components: {
    ShopItem,
    Page,
    NotContent,
  },


  created() {
    this.word = this.$route.query.word;
    console.log("main page created, word:", this.word, typeof(this.word), this.word == undefined);


    if (this.word == undefined) {
        console.log("go img list")
        this.getInit();
    }
    else {
        console.log("go search list")
        this.search_market_goods(this.word);
    }

  },
  //
  watch: { $route (to, from) {
      //搜索功能
      this.word = this.$route.query.word;
      console.log("main page watch, word:", this.word);
      if (this.word == undefined) {
          console.log("go img list")
          this.getInit();
      }
      else {
          console.log("go search list")
          this.search_market_goods(this.word);
      }
    }
  },
  methods: {
    getInit() {
      //this.getList()
      this.get_market_goods_list();
    },

    //获得商品列表
    get_market_goods_list() {
      var start = this.pageSize*(this.curPage-1);
      var limit = this.pageSize;
      axios
          .get('http://rest.cata.show/market_goods/get_market_goods_list?start='+start+'&limit='+limit)
          .then((res)=>{
              //console.log(res.data)
              this.list = res.data.result
              this.total = res.data.num
             }
          )
      },

    //搜索商品列表
    search_market_goods(word) {
      this.list = [];
      axios
              .get('http://rest.cata.show/Market_goods/search_like_market_goods?word='+ word)
              .then((res)=>{
                        //console.log(res.data)
                        this.list = res.data.result
                      }
              )
    },

    handleDetails(item) {

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
        this.$router.push({
          path: "/shop/details",
          query: {
            id: item.id,
          },
        })
      }


    },

    handlePage(page) {
      // this.curPage = page
      // this.getList()
    },

    handleSizeChange(size) {
      // this.pageSize = size
      // this.getList()
    },
  },

}
</script>
<style lang="less">
@import url("./index.less");
</style>
