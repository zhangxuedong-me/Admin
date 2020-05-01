<template>
    <div class="profile_container">
        <el-card>
            <template slot="header">
                <i class="el-icon-edit"></i>
                <span class="edit_info">编辑信息</span>
            </template>
            <div class="edit">
                <div class="edit_item">
                    <h4 v-show="isEditShow">
                        <el-tooltip
                            effect="dark"
                            content="编辑信息"
                            placement="right-start"
                        >
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="isEditShow = false"
                            />
                        </el-tooltip>
                    </h4>
                    <div class="info_show">
                        <img :src="$store.getters.getuserInfo.headImg" alt="" />
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="修改用户头像"
                            placement="right-start"
                        >
                            <el-link
                                @click="getUserAndEditUser"
                                type="primary"
                            >
                                修改头像
                            </el-link>
                        </el-tooltip>
                    </div>
                    <transition name="fade">
                        <div class="info_item" v-if="isEditShow">
                            <p>用户名:<span>{{ $store.getters.getuserInfo.username }}</span></p>
                            <p>性别:<span>{{ $store.getters.getuserInfo.gender }}</span></p>
                            <p>邮箱:<span>{{ $store.getters.getuserInfo.Email }}</span></p>
                            <p>ID:<span>{{ $store.getters.getuserInfo.id }}</span></p>
                            <p>个人介绍:
                                <span>
                                    {{ $store.getters.getuserInfo.introduce }}
                                </span>
                            </p>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="edit_show" v-if="!isEditShow">
                            <div class="edit_show_item">
                                <div class="edit_show_left">
                                    <el-form
                                        ref="editForm"
                                        :model="userInfo"
                                        :rules="userInfoRules"
                                        status-icon
                                        :show-message="false"
                                    >
                                        <el-form-item prop="username">
                                            <div class="edit_username">
                                                <h4>
                                                    <span class="el-icon-s-custom">

                                                    </span>
                                                    <span>用户名</span>
                                                </h4>
                                                <el-input
                                                    placeholder="必须2-6个汉子"
                                                    v-model="userInfo.username"
                                                    clearable
                                                />
                                            </div>
                                        </el-form-item>
                                        <el-form-item>
                                            <div class="edit_username two">
                                                <h4>
                                                    <span class="el-icon-s-check">
                                                    </span>
                                                    <span>性别</span>
                                                </h4>
                                                <el-radio-group
                                                    v-model="userInfo.gender"
                                                >
                                                    <el-radio label="男">男</el-radio>
                                                    <el-radio label="女">女</el-radio>
                                                </el-radio-group>
                                            </div>
                                        </el-form-item>
                                        <el-form-item prop="Email">
                                            <div class="edit_username">
                                                <h4>
                                                    <span class="el-icon-message">
                                                    </span>
                                                    <span>邮箱号</span>
                                                </h4>
                                                <el-input
                                                    placeholder="请输入邮箱号"
                                                    v-model="userInfo.Email"
                                                    clearable
                                                />
                                            </div>
                                        </el-form-item>
                                        <el-form-item prop="password">
                                            <div class="edit_username">
                                                <h4>
                                                    <span class="el-icon-view">
                                                    </span>
                                                    <span>密码</span>
                                                </h4>
                                                <el-input
                                                    placeholder="请输入密码"
                                                    v-model="userInfo.password"
                                                    clearable
                                                    show-password
                                                />
                                            </div>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="edit_show_left right">
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-finance"></span>
                                            <span>GitHub</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入您的GitHub地址"
                                            v-model="userInfo.github"
                                            clearable
                                        />
                                    </div>
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-claim"></span>
                                            <span>微信</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入您的微信地址"
                                            v-model="userInfo.weixin"
                                            clearable
                                        />
                                    </div>
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-user-solid"></span>
                                            <span>个人介绍</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入您的自我介绍"
                                            v-model="userInfo.introduce"
                                            clearable
                                            :maxlength="15"
                                            show-word-limit
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="edit_submit">
                                <el-button
                                    type="primary"
                                    @click="keepEdit"
                                >
                                    保存
                                </el-button>
                                <el-button
                                    @click="isEditShow = true"
                                    type="info"
                                >
                                    取消
                                </el-button>
                            </div>
                        </div>
                    </transition>
                    <div v-show="isEditShow" class="edit_back">
                        <img src="../../../assets/images/jieshao.jpg" alt="">
                    </div>
                </div>
            </div>
        </el-card>
        <el-dialog title="用户头像" :visible.sync="dialogTableVisible">
           <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户头像</span>
            </template>
            <set-head-img
                :isTabShow="true"
                :headImgData="headImgData"
                :selectedImg="selectedImg"
                @selectImg="selectedImg = $event"
                @cancel="dialogTableVisible = false"
                @selectDefine="selectDefine"
                @tabClick="tabClick"
                :isIdentity="isIdentity"
            />
            <el-pagination
                background
                layout="prev, pager, next"
                :total="headImgData.total"
                :current-page="pages.currentPage"
                :page-size="pages.pageSize"
                @current-change="pageChange"
            >
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
import { editUserInfo } from '@/api/user'
import { publicLogic } from '@/mixins/index'
export default {
  name: 'profile_info',
  mixins: [publicLogic],
  props: {

  },
  data () {
    return {

      // 用户头像弹框的状态
      dialogTableVisible: false,

      // 修改的用户信息   
      userInfo: {
          id: this.$store.getters.getuserInfo.id,
          username: this.$store.getters.getuserInfo.username,
          Email: this.$store.getters.getuserInfo.Email,
          gender: this.$store.getters.getuserInfo.gender,
          password: this.$store.getters.getuserInfo.password,
          headImg: this.$store.getters.getuserInfo.headImg,
          github: this.$store.getters.getuserInfo.github,
          weixin: this.$store.getters.getuserInfo.weixin,
          token: this.$store.getters.getuserInfo.token,
          introduce: this.$store.getters.getuserInfo.introduce
      },

      // 用户信息修改显示状态   
      isEditShow: true,

      // 根据不同的身份显示不同的信息   
      isIdentity: true,

      // 什么时候发送请求   
      startHttp: true,
      msg: ''
    }
  },
  computed: {

  },
  created () {
     
  },
  mounted () {

  },
  watch: {

      userInfo: {

        handler: function (val) {

            this.startHttp = true
        },
        deep: true
      }
  },
  methods: {

    // 点击保存保存修改资料
    keepEdit () {
      
      // 判断一下当数据内容发生改变再发送请求   
      if (this.startHttp) {

          this.editUserInfo(true)
          return
      }

      this.$message.success(this.msg)

      this.isEditShow = true
      
    },

    // 切换页码
    pageChange (page) {

      this.pages.currentPage = page

      // 获取用户图片   
      this.getUserAndEditUser()
    },

    async editUserInfo (status) {

      try {
          
         if (status) {

             await this.$refs.editForm.validate()
         }

         await this.$confirm.confirm('亲，您确定要修改自己的信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         })

        // 发送请求
        const { data } = await editUserInfo({
          ...this.userInfo,
          headImg: this.selectedImg.imgSrc ? this.selectedImg.imgSrc : this.userInfo.headImg
        })
        
        this.startHttp = false

        this.dialogTableVisible = false

        this.isEditShow = true

        this.$store.commit('SET_USERINFO', data.data)

        this.$message.success(data.message)

        this.msg = data.message

      } catch (error) {

          if (error === 'cancel') {

              this.$message('取消修改')
              this.isEditShow = true

              return
          }

          error === false ? this.$message.warning('请按正规的手续填写信息') : ''
          
      }
    },

    // 点击确定选择图片
    selectDefine () {

      this.editUserInfo()
    },

    tabClick (type) {

      this.selectedImg = {
        id: '',
        imgSrc: '',
        type: ''
      }

      this.pages.currentPage = 1

      this.pages.type = type

      if (type === 'admin') {

        if (this.$store.getters.roles.includes('admin')) {

          this.isIdentity = true

        } else {

          this.isIdentity = false
          this.$message.warning('您还不是管理员，没有操作权限')
        }
        
        // 获取用户图片  
        this.getUserAndEditUser()
        return
      }

      this.isIdentity = true
      
      // 获取用户图片  
      this.getUserAndEditUser()
    }
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
@import url('../../../styles/variables.less');
.profile_container {
  padding: 80px 30px 100px 30px;
  /deep/ .el-card {
    .el-card__header {
      text-align: center;
      .el-icon-edit {
        color: #f5b460;
        font-size: 22px;
      }
      .edit_info:hover {
        color: #f5b460;
      }
      .edit_info {
        color: #46c5fa;
        padding-left: 10px;
        font-family: "楷体";
        font-size: 22px;
      }
    }
    .edit {
      display: flex;
      .edit_item {
        width: 900px;
        height: 360px;
        border: #ccc solid 1px;
        margin: 30px;
        display: flex;
        position: relative;
        > img {
          width: 360px;
          height: 100%;
          margin-left: 50px;
        }
        > h4 {
          position: absolute;
          left: 46%;
          top: 20px;
        }
        .info_show {
          padding-top: 26px;
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
        .edit_show {
          .edit_show_item {
            display: flex;
            .edit_show_left {
              padding-top: 20px;
              padding-left: 30px;
              .el-form {
                .el-form-item {
                  margin: 0;
                  padding: 0;
                  .el-form-item__content {
                    line-height: 0;
                  }
                }
              }
              .edit_username {
                display: flex;
                align-items: center;
                margin-top: 20px;
                h4 {
                  width: 140px;
                  padding-bottom: 10px;
                  color: #afafaf;
                  span:nth-of-type(1) {
                    font-size: 18px;
                    padding-right: 6px;
                    color: #73c7f2;
                  }
                  font-family: "楷体";
                }
              }
            }
            .right {
              padding-top: 20px;
              padding-left: 20px;
            }
            .two {
              h4 {
                width: 86px;
              }
            }
          }
          .edit_submit {
            margin-top: 46px;
            margin-left: 50px;
            .el-button {
              margin: 0 20px;
            }
          }
        }
        .info_item {
          position: relative;
          margin: 66px 0 0 80px;
          p {
            line-height: 40px;
            font-size: 14px;
            color: #8d8e8e;
            span {
              font-size: 16px;
              margin-left: 16px;
              color: #46c5fa;
              font-family: @family;
            }
          }
          p:nth-of-type(5) {
            position: absolute;
            left: -220px;
            top: 220px;
            color: #f8b359;
            font-size: 20px;
            font-family: @family;
            span {
              color: #aeafaf;
              font-size: 18px;
            }
          }
        }
        .edit_back {
          width: 100%;
          height: 100%;
          position: absolute;
          right: -480px;
          img {
            width: 420px;
            height: 100%;
          }
        }
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      .el-dialog__header {
        .el-icon-s-custom {
          font-size: 20px;
          color: #69b0f8;
        }
        span {
          color: #898a8a;
          font-size: 16px;
          margin-left: 10px;
        }
      }
      .el-dialog__body {
        .el-pagination {
          text-align: center;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
