<template>
    <div class="container">

        <div class="userInfo">
            <div class="userInfo_top">
                <div></div>
                <img
                    v-lazy="$store.state.userInfo.headImg ? $store.state.userInfo.headImg : defaultImg"
                    alt=""
                />
                <h4>{{ $store.state.userInfo.username }}</h4>
            </div>
            <div class="user_link">
                <div class="user_github" @click="goGitHub">
                    <img v-lazy="require('../../assets/images/github.jpg')" alt="">
                    <span>GitHub</span>
                </div>
                <div class="user_github" @click="goWeiXin">
                    <img v-lazy="require('../../assets/images/weixin.jpg')" alt="">
                    <span>微信</span>
                </div>
                <el-button class="btn" type="primary" round @click="signOut">退出登录</el-button>
            </div>
        </div>

        <el-menu
            mode="vertical"
            text-color="#ffffff"
            active-text-color="#3c99f9"
            :unique-opened="true"
            router
        >
            <happy-scroll :min-length-v="0.2" color="rgba(3,253,244,1)" size="10" hide-horizontal>
                <el-menu-item index="/first_page">
                    <i class="el-icon-s-grid"></i>
                    <span>首页</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                    <span>内容管理</span>
                    </template>
                    <el-menu-item index="/publish_article">发表文章</el-menu-item>
                    <el-menu-item index="/comment_manage">评论管理</el-menu-item>
                    <el-menu-item index="/new_classification">分类管理</el-menu-item>
                    <el-menu-item index="/articles_manage">文章管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-lock"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/publish_article">子菜单</el-menu-item>
                </el-submenu>
                <el-menu-item index="/profile_info">
                    <i class="el-icon-s-custom"></i>
                    <span>个人信息</span>
                </el-menu-item>
            </happy-scroll>
        </el-menu>
    </div>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
export default {
  name: 'LayoutAside',
  props: {

  },
  data () {
    return {
      defaultImg: require('../../assets/images/touxiang.png')
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {

    goGitHub () {
      window.location.href = this.$store.state.userInfo.github
    },

    goWeiXin () {
      window.location.href = this.$store.state.userInfo.weixin
    },

    signOut () {
      
      // 清除用户的个人信息和token   
      window.sessionStorage.removeItem('userInfo')

      // 清除用户的导航数据 
      window.sessionStorage.removeItem('nav_bar')

      // 清除用户的临时数组中的导航 
      this.$store.state.navBars = {
          navBarArr: [{ path: '/first_page', name: '首页' }],
          index: 0
      }

      // 清除用户的权限 
      this.$store.state.roles = []

      // 清除用户的缓存
      this.$store.state.cache = []

      this.$message.success('已退出登录')

      this.$router.replace('/login')
    }
  },
  components: {
    HappyScroll
  }
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100%;
        position: relative;
        background: #353b4e;
        background-size: 100% 100%;
        overflow: hidden;

        .el-menu {
            width: 260px;
            height: 100vh;
            background: none;
            padding-top: 280px;
            box-sizing: border-box;
            border: none;
            /deep/ .el-menu {
                background: none;
            }

            /deep/ .el-submenu {
                .el-submenu__title:hover {
                    background: #fad526;
                    color: #ffffff !important;
                }
                .el-submenu__title {
                    font-size: 16px;
                    i {
                        color: #ffffff;
                    }
                }
            }
            .el-menu-item:hover {
                background: #19b0f6;
                color: #cd53fb !important;;
            }
            .el-menu-item {
                width: 100vmax;
                font-size: 16px;
                i {
                    color: #ffffff;
                }
            }
        }
        .is-active {
            color: #942af6 !important;
        }
        .userInfo {
            position: absolute;
            top: 30px;
            left: 30%;
            z-index: 200;
            .userInfo_top {
                position: relative;
                img {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    border: #f84c1d solid 6px;
                }
                h4 {
                    margin: 10px 15px;
                    color: #ffffff;
                    font-weight: 400;
                }
                div {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    position: absolute;
                    box-shadow: 0px 0px 16px #101010;
                }
            }
            .user_link {
                .user_github {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    position: absolute;
                    left: -36px;
                    top: 130px;
                    width: 100px;
                    img {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                    }
                    span {
                        font-size: 12px;
                        color: #ffffff;
                        margin-left: 4px;
                    }
                }
                .user_github:nth-of-type(2) {
                    left: 60px;
                    span {
                        display: flex;
                    }
                }
                .btn {
                    position: absolute;
                    top: 180px;
                    height: 20px;
                    line-height: 4px;
                    padding: 16px;
                    left: -10px;
                    background: #22fd05;
                }
            }
        }
    }
</style>
