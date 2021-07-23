<template>
        <div class="form-shop">
                <el-form ref="form" :rules="rules" :model="formData" label-width="80px">
                        <el-form-item label="Title">
                                <el-input v-model="formData.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Price">
                                <el-input-number
                                        v-model="formData.price"
                                        :precision="2"
                                        :min="0.01"
                                        :max="9999"
                                ></el-input-number>
                        </el-form-item>

                        <el-form-item label="Tag">
                                <el-input v-model="formData.tag"></el-input>
                        </el-form-item>


                        <el-form-item label="Brief">
                                <el-input type="textarea" v-model="formData.brief"></el-input>
                        </el-form-item>

                        <el-form-item label="Pic">
                                <img :src="goods_info.img_url" alt="" style="width: 200px; height: 200px"/>


                                <!--<el-image-->
                                        <!--style="width: 100px; height: 100px"-->
                                        <!--:src="goods_info.img_url"-->
                                        <!--fit="fill"></el-image>-->

                        </el-form-item>

                        <el-form-item>
                                <el-button type="primary" @click="onSubmit" :disabled="status!='0'">Pubish</el-button>
                                <!--<el-button v-if="!formData.id" @click="onClear">Clear</el-button>-->
                                <!--<el-button v-else @click="onClose">关闭</el-button>-->
                        </el-form-item>
                </el-form>
        </div>
</template>

<script>
    import ShopForm from "@/components/ShopForm";

    export default {
        name: "sell",
        components: {
            ShopForm,
        },
        props: {
            //dialogVisible: false,
        },
        data() {
            return {
                    rules: {
                            title: [{ required: true, message: "请输入商品标题", trigger: "blur" }],
                            price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
                            count: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
                            information: [
                                    { required: true, message: "请输入商品详情", trigger: "blur" },
                            ],
                            level: [
                                    { required: true, message: "请选择商品成色", trigger: "change" },
                            ],
                            sort: [
                                    { required: true, message: "请选择商品分类", trigger: "change" },
                            ],
                    },
                    formData:{},
                    create_id:"",
                    goods_info:{},
                    status:"0",
                    email:localStorage.getItem('email'),
                    token:localStorage.getItem('token'),
            };
        },
            mounted() {
            console.log("get sell page");
            this.create_id = this.$route.query.create_id;
            this.get_goods_info(this.create_id); //获得商品信息
        },
        methods: {
                //获得一个库存商品信息
                get_goods_info(create_id) {
                        axios
                                .get('http://rest.cata.show/user_operation/get_user_item_create_info?email='+this.email+'&create_id='+create_id)
                                .then((res)=>{
                                                //console.log(res.data)
                                                this.goods_info = res.data.result[0];
                                                this.formData.url = this.goods_info.img_url;
                                                this.formData.title = this.goods_info.title;
                                                this.formData.tag = this.goods_info.tag;
                                                this.formData.price = 1;
                                                this.status = this.goods_info.is_stock;

                                        //console.log("img url", this.formData.url )

                                        }
                                )
                },

                //提交市场,同时插入市场表和个人入库表
                onSubmit() {
                        console.log(this.formData);
                        axios
                                .get('http://rest.cata.show/user_operation/stock_pic?email='+this.email+'&create_id='+this.create_id+'&title='+ this.formData.title+'&brief='+ this.formData.brief +'&price='+this.formData.price + '&tag='+this.formData.tag)
                                .then((res)=>{
                                                console.log(res.data)
                                                //插入market表
                                                axios
                                                .get('http://rest.cata.show/user_operation/publish_pic?email='+this.email+'&create_id='+this.create_id+'&title='+ this.formData.title+'&brief='+ this.formData.brief +'&price='+this.formData.price + '&tag='+this.formData.tag)
                                                .then((res)=>{
                                                                console.log("market", res.data)
                                                                //跳转到商品页
                                                                this.$router.push(
                                                                        "/my/shoping",
                                                                        )
                                                        }
                                                )

                                        }
                                )

                }
        },
    };
</script>
<style lang="less" scoped>
        .form-shop {
                margin-top: 40px;
                position: relative;
                left: 50%;
                transform: translate(-50%, 0%);
                width: 50%;
        }
</style>

