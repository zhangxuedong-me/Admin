<template>
    <div class="container">
        <div class="tabs">
            <div
                class="tabs_item"
                v-for="(item, index) in navBarsData.navBarArr"
                :key="index"
                :class="index === navBarsData.index ? 'tabs_nav' : ''"
            >
                <span @click="navClick(item, index)">{{ item.name }}</span>
                <i @click="close(index)" class="el-icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
       
    },
    data() {
        return {
            navBarsData: {},
            defaultNav: {
                path: '/first_page',
                name: '首页'
            }
        }
    },
    computed: {
       
    },
    created() {
        
    },
    mounted() {
        
    },
    watch: {

       $route: {
            handler: function(val) {

                val.name === 'edit_article' ? 

                this.$store.commit('SET_USERNAVBAR',{
                    path: `/${val.name}`,
                    name: val.meta.name,
                    id: val.params.id
                }) 
                :
                // 存储用户的导航数据
                this.$store.commit('SET_USERNAVBAR',{
                    path: val.path,
                    name: val.meta.name
                })

                this.navBarsData = this.$store.state.navBars
            },

            deep: true,
            immediate: true
        }
    },
    methods: {
        navClick (item, i) {

            // 判断一下如果要去的那一项是当前项的的话就return，编辑页面需要特殊处理

            if (item.path === this.$route.path || `${item.path}/${item.id}` === this.$route.path) return

            this.navBarsData.index = i

            // 判断一下对象中是否有id有id说明是编辑页面，跳转的过程中需要加上id
            item.id ?
            this.$router.replace(`${item.path}/${item.id}`)
            :this.$router.replace(item.path)
        },
        
        close (i) {

            const name = this.navBarsData.navBarArr[i].path.split('/')[1]

            // 既然删除导航标签，那缓存就没有必须要了
            this.navBarsData.navBarArr.splice(i, 1)

            this.$store.commit('REMOVE_CACHE', name)   
 
            if (i <= this.navBarsData.index) {
                 
                this.navBarsData.index -= 1

                // 判断一下如果导航栏数组中有数据才执行
                 
                if (this.navBarsData.navBarArr[i - 1] !== undefined) {

                    // 判断当前要去的路径不是当前的路径才去执行跳转路径
                    if (this.navBarsData.navBarArr[i - 1].path !== this.$route.path) {

                        // 判断一下点击的是不是当前的那一项，如果是的话，就去当前项的下一项的路由
                        if (i - 1 === this.navBarsData.index) {

                            if (this.navBarsData.navBarArr[i - 1].id) {

                                const { id, path } = this.navBarsData.navBarArr[i - 1]

                                this.$router.replace(`${path}/${id}`)

                            } else {

                                this.$router.replace(this.navBarsData.navBarArr[i - 1].path)
                            }

                        } 
                    }
                } else {

                    // 判断一下如果导航栏数组的长度大于等于1的话，说明还有导航栏数据，重新改变他的高亮坐标，就等于当前点击
                    // 的坐标，重新高亮

                    if (this.navBarsData.navBarArr.length >= 1) {

                        // 判断一下如果点击关闭第一项的话，判断一下跟我当前高亮显示的项是否相等，不相等return
                        if (this.navBarsData.index !== i - 1)  return

                        this.navBarsData.index = i

                        // 如果当前要去的路由和当前路由一样的话就终止
                        if (this.navBarsData.navBarArr[i].path === this.$route.path) return
                        this.$router.replace(this.navBarsData.navBarArr[i].path)

                    } else {

                        // 显示默认的首页
                        this.navBarsData.navBarArr.push(this.defaultNav)
                        this.navBarsData.index = 0

                        // 判断一下如果当前的路径和默认项的首页路径相同的话就终止，否则就跳转的默认首页
                        if (this.navBarsData.navBarArr[i].path === this.$route.path) return
                        this.$router.replace(this.navBarsData.navBarArr[i].path)

                    }

                }
            }
        }

    },
    components: {

    },
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100%;
        .tabs {
            position: fixed;
            z-index: 20;
            top: 100px;
            width: 100%;
            height: 40px;
            background: #ffffff;
            box-shadow: 6px 6px 8px 2px #cccccc;
            display: flex;
            .tabs_item {
                height: 24px;
                border: #cccccc solid 1px;
                padding: 0px 10px;
                font-size: 16px;
                line-height: 24px;
                margin-right: 10px;
                color: #666666;
                font-family: "楷体";
                box-shadow: 0 0 6px 2px #cccccc;
                margin-top: 6px;
                cursor: pointer;
                i {
                    margin-left: 8px;
                }
                i:hover {
                    color: #07f9e5;
                }
            }
            .tabs_item:hover {
                box-shadow: 2px 2px 10px 6px #cccccc;
            }
            .tabs_nav {
                background: #0f8efa;
                color: #ffffff
            }
            .tabs_nav i:hover {
                color: #f79305;
            }       
        }
        .tabs {
            .tabs_item:nth-of-type(1) {
                margin-left: 10px;
            }
        }
    }
</style>
