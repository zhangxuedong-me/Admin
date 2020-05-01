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
                    <nav-bar
                      class="tabs"
                    />
                    <Fn />
                    <transition name="main">
                        <keep-alive :include="$store.getters.cache">
                            <router-view />
                        </keep-alive>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        
    </div>
</template>

<script>
import NavBar from '@/components/nav_bar'
export default {
  name: 'Index',
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

    friendly () {

        if (this.$store.getters.roles.includes('admin')) {

            this.$notify({
                title: '尊敬的管理员，您好',
                message: '送上一天最真诚的祝福，祝您每一天生活愉快，万事如意',
                type: 'success',
                duration: 5000
            })
            return
         }

        this.$notify({
            title: '尊敬的用户，您好',
            message: '请友好发言，尊重你，我，他!',
            type: 'warning',
            duration: 5000
        })
    }
  },
  created () {
      
    this.friendly()
  },
  mounted () {

  },
  watch: {

  },

  components: {
    NavBar
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
