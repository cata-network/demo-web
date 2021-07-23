<template>
  <div class="shop-page">
    <div class="content-card">
      <div class="content">
        <div class="shop-img">
          <img :src="shopping.img_url" alt="" />
        </div>
        <ul>
          <li><span>Product：</span> {{ shopping.title }}</li>
          <li><span>NFT ID：</span> {{  shopping.create_id }}</li>
          <li class="price">
            <span>Price：</span> ${{ shopping.price ? shopping.price : "0" }}
          </li>
          <li><span>CID：</span> {{ shopping.cid }}</li>
          <li><span>Views：</span> {{ shopping.browse_num }}</li>

          <li><span>Brief：</span> {{ shopping.brief }}</li>
          <li>
            <span>Tag：</span> <i class="el-icon-price-tag"></i>
            {{shopping.tag }}
          </li>
          <li>
            <span>Release time： </span> <i class="el-icon-date"></i>
            {{ shopping.fetch_time }}
          </li>
          <li>
            <span>Owned by： </span> <i class="el-icon-user"></i>
            {{ shopping.email }}
          </li>

          <li class="price">
            <span>Your balance： </span>
            ${{ balance }}
          </li>

        </ul>
      </div>

      <div class="add-shop">
        <el-button type="primary" @click="addCart" :disabled="no_enough_balance"><i class="el-icon-shopping-cart-2"></i> BUY</el-button>

        <!--<div>-->
          <!--<div @click="addCart" class="btn" :disabled="1">-->
            <!--<i class="el-icon-shopping-cart-2"></i> BUY-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-else>-->
          <!--<el-button type="primary" @click="handleEdit" class="el-icon-edit">{{-->
            <!--shopping.display == 2 ? "卖完啦重新上架" : "修改"-->
          <!--}}</el-button>-->
          <!--<el-button @click="removeShop" class="el-icon-delete"-->
            <!--&gt;删除商品-->
          <!--</el-button>-->
        <!--</div>-->
      </div>
    </div>

    <!-- 留言 -->
    <!--<div class="shop-message">-->
      <!--<div class="title">Message:</div>-->
      <!--<ul>-->
        <!--<li v-for="item of mesgList" :key="item.id">-->
          <!--<div class="user-name">-->
            <!--<div>-->
              <!--用户名：{{ item.username }}-->
              <!--<el-link-->
                <!--:type="item.uid == shopping.uid ? 'primary' : 'success'"-->
                <!--:underline="false"-->
              <!--&gt;-->
                <!--{{ item.uid == shopping.uid ? "卖家" : "买家" }}</el-link-->
              <!--&gt;-->
            <!--</div>-->
            <!--<div>-->
              <!--{{ item.create_time | formatTime-->
              <!--}}<span v-if="item.uid == uid" @click="handleDelete(item)"-->
                <!--&gt;删除</span-->
              <!--&gt;-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="text">{{ item.content }}</div>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="message-text">-->
        <!--<el-input-->
          <!--type="textarea"-->
          <!--:rows="4"-->
          <!--placeholder="请输入内容"-->
          <!--v-model="content"-->
        <!--&gt;-->
        <!--</el-input>-->
      <!--</div>-->
      <!--<div class="add-message">-->
        <!--<el-button type="primary" @click="handleAddMesg">发布留言</el-button>-->
      <!--</div>-->
    <!--</div>-->

    <!-- 编辑商品 -->
    <!--<ShopEdit-->
      <!--@submit="onEditSumbit"-->
      <!--:dialogVisible="dialogVisible"-->
      <!--@close="onEditClose"-->
      <!--:form="shopping"-->
    <!--/>-->

    <!--<el-dialog-->
      <!--title="选择数量购物车"-->
      <!--:visible.sync="cartState"-->
      <!--width="30%"-->
      <!--:before-close="handleCartClose"-->
    <!--&gt;-->
      <!--<span>购买数量</span>-->
      <!--<el-input-number-->
        <!--v-model="shop_count"-->
        <!--:min="1"-->
        <!--:max="shopping.count"-->
      <!--&gt;</el-input-number>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="handleCartClose">取 消</el-button>-->
        <!--<el-button type="primary" @click="onAddShopCart">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
import {
  getShopItem,
  getShopMesgList,
  addShopMesg,
  deleteShopMesg,
  removeShop,
  editShop,
} from "@/api/shop"
import { mapGetters } from "vuex"
import ShopEdit from "./shopEdit"
import { addShopCart } from "@/api/shop/shopCart"

export default {
  name: "shop-page",
  data() {
    return {
      shopping: {},
      content: "",
      mesgList: [],
      dialogVisible: false,
      cartState: false, // 购物车状态
      shop_count: 1,
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token'),
      create_id:"",
      balance:0,
      no_enough_balance:0,
    }
  },
  filters: {
    getUsername(uid, map) {
      let username = ""
      Object.keys(map).length &&
        map.some((user) => {
          if (user.uid === uid) {
            username = user.username
            return true
          }
        })
      return username
    },
  },
  components: {
    ShopEdit,
  },
  computed: {
    ...mapGetters("global", ["sort_map", "uid", "username_map", "level_map"]),
  },
  created() {
    this.getInit()
  },
  methods: {
    async getInit() {
      const id = this.$route.query.id
      this.get_market_goods_info(id)
      //this.get_balance(this.email) //获得余额
    },

    get_market_goods_info(id) {
      axios.get('http://rest.cata.show/Market_goods/get_market_goods_info?id='+id).then((res)=>{
                  //console.log(res.data.results);
                  this.shopping = res.data.result[0];
                  this.create_id = this.shopping.create_id;

                  //获得余额
                  this.get_balance();
              }
      )
    },

    get_balance() {
      axios.get('http://rest.cata.show/Market_goods/get_balance?email='+this.email).then((res)=>{
                this.balance = res.data.result[0].balance;
                console.log("check balance", this.balance, this.shopping.price, this.balance<this.shopping.price,Number(this.balance)<Number(this.shopping.price))
                if (Number(this.balance)<Number(this.shopping.price)) {
                  this.no_enough_balance = 1;
                }
              }
      )
    },
    //购买
    addCart() {
      this.cartState = true
      //当前在售卖的只有一个
      axios.get('http://rest.cata.show/user_operation/buy_pic?create_id='+ this.create_id  +'&email='+this.email).then((res)=>{
                console.log(res.data.result);
                //跳转到我的商品页
                this.$router.push(
                        "/my/shoping",
                )
              }
      )
    },


  },

}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
