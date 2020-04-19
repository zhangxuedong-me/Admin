<template>
    <div class="container">
        <el-card>
            <template slot="header">
                <i class="el-icon-edit"></i>
                <span class="edit_info">编辑信息</span>
            </template>
            <div class="edit">
                <div class="edit_item">
                    <div class="info_show">
                        <img :src="$store.state.userInfo.headImg" alt="" />
                        <el-link type="primary">修改头像</el-link>
                    </div>
                    <div class="info_item">
                        <p>用户名:<span>{{ $store.state.userInfo.username }}</span></p>
                        <p>性别:<span>{{ $store.state.userInfo.gender }}</span></p>
                        <p>邮箱:<span>{{ $store.state.userInfo.Email }}</span></p>
                        <p>ID:<span>{{ $store.state.userInfo.id }}</span></p>
                        <p>描述：<span>尊敬的张雪冬国民帅哥您好</span></p>
                    </div>
                </div>
                <div class="edit_item"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'profile_info',
    props: {

    },
    data() {
        return {
            
        }
    },
    computed: {

    },
    created() {
        console.log(this.$store.state.userInfo)
    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
    beforeRouteEnter (to, from, next) {

        next(vm => {
            
            vm.$store.commit('ADD_CACHE', to.name)
        })
    }
}
</script>

<style scoped lang="less">
.container {
    padding: 80px 30px 0px 30px;
    box-sizing: border-box;
    /deep/ .el-card {
        .el-card__header {
            text-align: center;
            .el-icon-edit {
                color: #f5b460;
                font-size: 22px;
            }
            .edit_info {
                color: #46c5fa;
                padding-left: 10px;
                font-family: "楷体";
                font-size: 22px;
            }
        }
        .edit{
            display: flex;
            .edit_item {
                width: 500px;
                height: 240px;
                border: #ccc solid 1px;
                margin: 20px;
                display: flex;
                .info_show {
                    img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin: 50px 20px 20px 40px;
                    }
                    .el-link {
                        width: 60px;
                        display: block;
                        margin-top: 10px;
                        margin-left: 60px;
                    }
                }
                .info_item {
                    margin: 40px 0 0 40px;
                    p {
                        line-height: 34px;
                        font-size: 14px;
                        color: #8d8e8e;
                        span {
                            font-size: 16px;
                            margin-left: 16px;
                            color: #46c5fa;
                            font-family: "楷体";
                        }
                    }
                }
            }
        }
    }
}
</style>
