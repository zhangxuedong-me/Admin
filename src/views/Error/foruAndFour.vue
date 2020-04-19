<template>
    <div class="container">
        <el-button type="primary" @click="$router.replace('/first_page')">返回首页</el-button>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/404.jpg') no-repeat;
        background-size: 100% 100vh;
        text-align: center;
        line-height: 800px;
    }
</style>
