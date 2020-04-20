<template>
    <div class="container">
        <el-card :class="isRememberPwd ? 'box-card' : ''">
            <div slot="header" class="clearfix">
                <span>{{ titleText }}</span>
            </div>
            <el-form ref="myForm" :model="userInfo" :rules="userInfoRules">
                <el-form-item prop="username">
                    <el-input
                        v-model="userInfo.username"
                        clearable
                        type="text"
                        @blur="$emit('usernameBlur', userInfo.username)"
                    >
                    <p class="user_title" slot="prepend">用户名</p>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" class="spacing">
                    <el-input
                        v-model="userInfo.password"
                        clearable
                        type="password"
                    >
                        <p class="user_title" slot="prepend">密码</p>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mailbox" v-if="isRememberPwd">
                    <el-input
                        v-model="userInfo.mailbox"
                        clearable
                        type="text"
                    >
                    <p class="user_title" slot="prepend">邮箱号</p>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checked">
                    <el-checkbox v-model="userInfo.checked">{{ agreement }}</el-checkbox>
                    <span v-show="isRememberPwd" class="user_agree">必读用户协议</span>
                    <el-button
                        class="user_register"
                        :class="isRememberPwd ? 'btn_agree' : ''"
                        @click="$router.replace(path)"
                        type="primary"
                    >
                        {{ btnText }}
                    </el-button>
                </el-form-item>
                <el-form-item label="性别" v-if="isRememberPwd">
                    <el-radio-group v-model="userInfo.gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                    <el-button
                        @click="dialogTableVisible = true"
                        type="info"
                        class="select_img"
                    >
                        选择头像
                    </el-button>
                </el-form-item>
                <el-button
                    @click="loginMaypeRegister"
                    type="primary"
                    plain
                    :loading="loadding"
                >
                    {{ buttonText }}
                </el-button>
            </el-form>
        </el-card>
        <el-dialog :visible.sync="dialogTableVisible">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户头像</span>
            </template>
            <set-head-img
                @cancel="dialogTableVisible = false"
                @selectDefine="selectDefine"
                :headImgData="headImgData"
                :selectedImg="selectedImg"
                @selectImg="selectedImg = $event"
                :isTabShow="false"
                :isIdentity="true"
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
import { getUserImg } from '@/api/user'
export default {
  name: 'Checking',
  props: {
    titleText: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    isRememberPwd: {
      type: Boolean,
      required: true
    },
    agreement: {
      type: String,
      required: true
    },
    btnText: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    loadding: {
      type: Boolean
    },
    remember: {
      type: String,
      required: true
    },
    dialogVisible: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      // 考虑到去注册页面就不需要再获取值了，所以做了以下处理
      userInfo: JSON.parse(window.localStorage.getItem(this.remember)) || {
        username: '',
        password: '',
        mailbox: '',
        checked: false,
        gender: '男',
        headImg: ''
      },
      that: this,
      userInfoRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            pattern: /^[\u4e00-\u9fa5]{2,6}$/,
            message: '用户名格式有误',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            pattern: /^(?=.*[a-z])(?=.*\d)[^]{5,16}$/,
            message: '密码格式最少5位包括字母，最多不超过11位',
            trigger: 'blur'
          }
        ],
        mailbox: [
          {
            required: true,
            message: '请输入邮箱号',
            trigger: 'blur'
          },
          {
            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: '邮箱格式有误',
            trigger: 'blur'
          }
        ],
        checked: this.$route.path === '/login' ? [] : [
          {
            validator (rule, value, callback) {
              value ? callback() : callback(new Error('请勾选用户协议'))
            },
            trigger: 'blur'
          }
        ]
      },
      dialogTableVisible: false,
      headImgData: {},
      selectedImg: {
        id: '',
        imgSrc: ''
      },
      pages: {
        currentPage: 1,
        pageSize: 10,
        type: 'user'
      }
    }
  },
  computed: {

  },
  created () {
    this.getUserHeadImg()
    this.$emit('usernameBlur', this.userInfo.username)
  },
  mounted () {

  },
  watch: {
    dialogVisible (newVal) {
      if (newVal) return

      this.userInfo = {
        username: '',
        password: '',
        mailbox: '',
        checked: false,
        gender: '男',
        headImg: ''
      }
    }
  },
  methods: {
    loginMaypeRegister () {
      // 如果是登陆页面的话，就要查看记住密码的状态是否为true，为true的话，再检查，如果密码或者用户名都
      // 为空的话不存储，如果记住密码的状态为false的话，则删除存储的用户内容
      if (this.$route.path === '/login') {
        if (this.userInfo.checked) {
          if (this.userInfo.username !== '' || this.userInfo.password !== '') {
            window.localStorage.setItem('remember', JSON.stringify(this.userInfo))
          }
        } else {
          if (window.localStorage.getItem('remember')) {
            window.localStorage.removeItem('remember')
          }
        }
      }
      this.$emit('loginMaypeRegister', this.userInfo, this.$refs.myForm)
    },

    // 获取用户头像
    async getUserHeadImg () {
      
      const { data } = await getUserImg(this.pages)
      this.headImgData = data
    },
    pageChange (page) {

      this.pages.currentPage = page
      this.getUserHeadImg()
    },
    selectDefine () {

      if (!this.selectedImg.imgSrc) {
        this.$message.warning('请先选择一张图片把')
        return
      }

      this.$confirm.confirm('亲，您确定要选择此图片作为您的头像吗?', '提示', {

        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userInfo.headImg = this.selectedImg.imgSrc
        this.dialogTableVisible = false

        this.$message({
          type: 'success',
          message: '选择成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }

  },
  components: {

  }
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .el-card {
            width: 30%;
            height: 54%;
            margin: 150px auto;
            background: rgba(53,113,249,.3);
            border: none;
            .el-card__header {
                div {
                    text-align: center;
                    font-size: 20px;
                    color: #6dddf5;
                    font-weight: 700;
                }
            }
            .el-form-item {
                .el-input--suffix {
                    /deep/ .el-input-group__prepend {
                        background: #1689f4;
                        border: none;
                        font-size: 12px;
                        vertical-align:none;
                        color: #ffffff;
                        padding: 0 16px;
                    }
                    /deep/.el-input__inner {
                        background: rgba(207,208,208,.3);
                        border: none;
                        color: #ffffff;
                    }

                }
                /deep/ .el-checkbox {
                    .el-checkbox__label {
                        color: #ffffff;
                    }
                }
            }
            /deep/ .el-form-item:last-of-type {
                .el-form-item__label {
                    color: #2b90f6;
                }
                .el-form-item__content {
                    .el-radio-group {
                        .el-radio {
                            color: #ffffff;

                        }
                    }
                }
                .select_img {
                    width: 100px;
                    margin-left: 120px;
                    padding: 10px 0;
                }
            }
            .spacing {
                .el-input--suffix {
                    /deep/ .el-input-group__prepend {
                        padding: 0 22px;
                    }
                }
            }
            .el-button {
                width: 100%;
                border-radius: 6px;
            }
            .user_register {
                width: 100px;
                padding: 10px 10px;
                margin-left: 186px;
            }
            .btn_agree {
                margin-left: 66px !important;
            }
        }
        .box-card {
            height: 72%;
            margin: 100px auto;
        }
        .user_agree {
            color: #58d7f7;
            cursor: pointer;
            margin-left: 10px;
        }
        .user_agree:hover {
            border-bottom: #58d7f7 solid 1px;
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
                        width: 100%;
                        height: 100%;
                        margin-top: 40px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
