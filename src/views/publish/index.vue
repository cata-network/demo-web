<template>
    <div class="my-shoping">
        <NotContent v-if="notContent" />
        <div class="shop-item" v-else>
            <user-pic
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
    import { mapGetters } from "vuex";
    import UserPic from "@/components/UserPic";
    import Page from "@/components/common/Page";
    import NotContent from "@/components/common/NotContent";

    export default {
        name: "publish-page",
        computed: {
            ...mapGetters("global", ["uid"]),
        },
        components: {
            UserPic,
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
                    .get('http://rest.cata.show/user_operation/get_user_item_create_list?email='+this.email+'&start='+start+'&limit='+limit )
                    .then((res)=>{
                            //console.log(res.data)
                            this.list = res.data.result;
                            this.total = res.data.num;
                        }
                    )
            },
            handleDetails(item) {
                this.$router.push({
                    path: "/my/sell",
                    query: {
                        create_id: item.id,
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

</style>

