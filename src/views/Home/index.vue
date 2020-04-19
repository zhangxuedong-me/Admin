<template>
    <div class="container">
        <el-container>
            <el-aside>
                <layout-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <layout-header />
                </el-header>
                <el-main>
                    <Navbar
                        class="tabs"
                    />
                    <transition name="main">
                        <keep-alive :include="$store.state.cache">
                            <router-view />
                        </keep-alive>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Index',
    props: {

    },
    data() {
        return {
           
        }
    },
    computed: {

    },
    created() {

        this.$notify({
            title: '尊敬的用户',
            message: '文明用语，尊重你 我 他!',
            type: 'warning',
            duration: 5000
        })
    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
    },
    components: {
    }
}
</script>

<style scoped lang="less">
    .container {
        .el-aside {
            width: 260px !important;
            margin: 0;
            padding: 0;
            // 去掉浏览器滚动条的方法
            overflow-y: hidden;
            overflow-x: hidden;
        }
        .el-header {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        .el-main {
            width: 100%;
            height: 100vh;
            padding: 0;
            margin: 0;
            margin-top: 20px;
            overflow-x: hidden;
        }
    }
</style>
