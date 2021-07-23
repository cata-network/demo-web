<template>
  <div class="my-shoping">
    <NotContent v-if="notContent" />

    <div class="shop-item" v-else>

      <!--<shop-item-->
        <!--class="item"-->
        <!--v-for="item in list"-->
        <!--:key="item.id"-->
        <!--:shop="item"-->
        <!--@info="handleDetails"-->
      <!--/>-->

      <div class="shop-item-page item"
           v-for="item in list"
           :key="item.id"
      >
        <div class="box-container"  @click="handleDetails(item)">
          <div class="shop-img">
            <img :src="item.img_url" />
          </div>
          <div class="shop-info">
            <div class="title">{{ item.title }}</div>
            <div class="tag_warp">
              <div class="sdby">
                {{ item.tag }}
              </div>
            </div>
            <div class="price">
              <span>${{ item.price }}</span>

              <span class="browse-num" v-if="item.status=='0'">
                Stock
              </span>

              <span class="browse-num" v-else-if="item.status=='1'">
                On sale
              </span>

              <span class="browse-num" v-else>
                Selled
              </span>

            </div>
          </div>
        </div>
      </div>

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
import { mapGetters } from "vuex";
import { getByIdShopList } from "@/api/shop";
import ShopItem from "@/components/ShopItem";
import Page from "@/components/common/Page";
import NotContent from "@/components/common/NotContent";

export default {
  name: "my-shoping",
  computed: {
    ...mapGetters("global", ["uid"]),
  },
  components: {
    ShopItem,
    Page,
    NotContent,
  },
  data() {
    return {
      pageSize: 10,
      curPage: 1,
      list: [],
      total: 0,
      notContent: false,
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token'),
    };
  },
  methods: {
    getList() {
      var start = this.pageSize*(this.curPage-1);
      var limit = this.pageSize;
      axios
              .get('http://rest.cata.show/user_operation/get_user_item_list?email='+this.email+'&start='+start+'&limit='+limit)
              .then((res)=>{
                        //console.log(res.data)
                        this.list = res.data.result;
                        this.total = res.data.num;
                      }
              )
    },
    handleDetails(item) {
      console.log("handleDetails", item);
      this.$router.push({
        path: "/my/release",
        query: {
          id: item.id,
        },
      });
    },
    handlePage(page) {
      this.curPage = page;
      this.getList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
  },
  mounted() {
    this.getList();
    console.log("my shop");
  },
};
</script>

<style lang="less" scoped>
.my-shoping {
  .shop-item {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20px 20px 0 0;
    }
  }
}
.shop-item-page {
  .box-container {
    width: 200px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      .shop-img {
        img {
          transform: scale(1.2);
        }
      }
    }
    .shop-img {
      height: 220px;
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.5s ease;
        border: none;
      }
    }
    .shop-info {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #c9c9c9;
      border-top: none;
      .title {
        line-height: 18px;
        padding: 8px 10px 0;
        white-space: nowrap;
        height: 18px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #666;
      }
      .tag_warp {
        display: flex;
        margin: 8px 10px 0;
        height: 20px;
        .sdby {
          color: #fe7725;
          border: 1px solid #ff6000;
          display: inline;
          margin-right: 2px;
          padding: 0 2px;
        }
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin: 8px 10px 4px;
        font-size: 20px;
        font-family: arial;
        line-height: 20px;
        color: #ff7300;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        .browse-num {
          font-size: 12px;
          color: #c9c9c9;
        }
      }
    }
  }
}
</style>
