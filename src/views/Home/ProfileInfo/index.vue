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
                        <img :src="$store.state.userInfo.headImg" alt="" />
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="修改用户头像"
                            placement="right-start"
                        >
                            <el-link @click="editImg" type="primary">修改头像</el-link>
                        </el-tooltip>
                    </div>
                    <transition name="fade">
                        <div class="info_item" v-if="isEditShow">
                            <p>用户名:<span>{{ $store.state.userInfo.username }}</span></p>
                            <p>性别:<span>{{ $store.state.userInfo.gender }}</span></p>
                            <p>邮箱:<span>{{ $store.state.userInfo.Email }}</span></p>
                            <p>ID:<span>{{ $store.state.userInfo.id }}</span></p>
                            <p>描述：<span>{{ userDescribe }}</span></p>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="edit_show" v-if="!isEditShow">
                            <div class="edit_show_item">
                                <div class="edit_show_left">
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-custom"></span>
                                            <span>用户名</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入用户名"
                                            v-model="userInfo.username"
                                            clearable
                                        />
                                    </div>
                                    <div class="edit_username two">
                                        <h4>
                                            <span class="el-icon-s-custom"></span>
                                            <span>性别</span>
                                        </h4>
                                        <el-radio-group v-model="userInfo.gender">
                                            <el-radio label="男">男</el-radio>
                                            <el-radio label="女">女</el-radio>
                                        </el-radio-group>
                                    </div>
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-custom"></span>
                                            <span>邮箱号</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入邮箱号"
                                            v-model="userInfo.Email"
                                            clearable
                                        />
                                    </div>
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-custom"></span>
                                            <span>密码</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入密码"
                                            v-model="userInfo.password"
                                            clearable
                                            show-password
                                        />
                                    </div>
                                </div>
                                <div class="edit_show_left right">
                                    <div class="edit_username">
                                        <h4>
                                            <span class="el-icon-s-custom"></span>
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
                                            <span class="el-icon-s-custom"></span>
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
                                            <span class="el-icon-s-custom"></span>
                                            <span>个人介绍</span>
                                        </h4>
                                        <el-input
                                            placeholder="请输入您的自我介绍"
                                            v-model="userInfo.introduce"
                                            clearable
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
import { getUserImg, editUserInfo } from '@/api/user'
export default {
  name: 'profile_info',
  props: {

  },
  data () {
    return {
        dialogTableVisible: false,
        pages: {
            currentPage: 1,
            pageSize: 10,
            type: 'user'
        },
        userInfo: this.$store.state.userInfo,
        isEditShow: true,
        headImgData: {},
        selectedImg: {
            id: '',
            imgSrc: ''
        },
        isIdentity: true
    }
  },
  computed: {
      userDescribe () {

          return this.$store.state.userInfo.gender === "女"
          ? '美丽漂亮的小仙女，欢迎你' : '帅气阳光的大帅哥，欢迎你'
      }
  },
  created () {
    
  },
  mounted () {

  },
  watch: {

  },
  methods: {

      // 获取用户图片   
      async editImg () {

          this.dialogTableVisible = true

          const { data } = await getUserImg(this.pages)
          this.headImgData = data
      },
      
      // 点击保存保存修改资料  
      keepEdit () {
          alert('修改成功')
      },

      pageChange (page) {
          
          this.pages.currentPage = page
          this.editImg()
      },

      // 点击确定选择图片   
      async selectDefine () {

        const loading = this.$loading(this.$store.state.loading)
        
        try {

            // 发送请求
            const { data } = await editUserInfo({
                ...this.userInfo,
                headImg: this.selectedImg.imgSrc 
            })

            this.dialogTableVisible = false

            this.$store.commit('SET_USERINFO', data.data)

            this.$message.success(data.message)

        } finally {

            loading.close()
        }
        
        

      },

      tabClick (type) {

          this.pages.currentPage = 1

          this.pages.type = type

          if (type === 'admin') {

              if (this.$store.getters.roles.includes('admin')) {

                  this.isIdentity = true

              } else {

                  this.isIdentity = false
                  this.$message.warning('您还不是管理员，没有操作权限')
              }

              this.editImg()
              return
          }

          this.isIdentity = true

          this.editImg()
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
        .edit{
            display: flex;
            .edit_item {
                width: 900px;
                height: 360px;
                border: #ccc solid 1px;
                margin: 30px;
                display: flex;
                position: relative;
                >img {

                    width: 360px;
                    height: 100%;
                    margin-left: 50px;
                }
                >h4 {
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
                            padding-left: 36px;
                            .edit_username {
                                display: flex;
                                align-items: center;
                                margin-top: 20px;
                                h4 {
                                    width: 130px;
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
                            margin: 0;
                            padding: 0;
                            padding-top: 20px;
                            padding-left: 30px;
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
                            font-family: "楷体";
                        }
                    }
                    P:nth-of-type(5) {
                        position: absolute;
                        left: -180px;
                        top: 220px;
                        color: #f8b359;
                        font-size: 20px;
                        font-family: "楷体";
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
