<template>
    <div>
        评论管理
    </div>
</template>

<script>
export default {
    name: 'comment_manage',
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
    beforeRouteEnter (to, from, next) {
        next(vm => {
            
           vm.$store.commit('ADD_CACHE', to.name)
        })
    }
}
</script>

<style scoped lang="less">

</style>
