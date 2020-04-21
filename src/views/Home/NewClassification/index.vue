<template>
    <div class="container">
       <div class="user_info">
           <h4>基本信息</h4>
           <div class="user_info-top">
               <span>ID: {{ $store.getters.getuserInfo.id }}</span>
               <span>用户名: {{ $store.getters.getuserInfo.username }}</span>
               <span>邮箱账号: {{ $store.getters.getuserInfo.Email }}</span>
           </div>
           <div class="user_info-bottom">
               <span>性别: {{ $store.getters.getuserInfo.gender }}</span>
               <span>身份: {{ this.roles }}</span>
           </div>
       </div>
       <div class="user_class">
           <h4>分类管理</h4>
            <el-table
                :data="classificationData.data"
                style="width: 100%"
                empty-text="暂无分类"
                highlight-current-row
                cell-class-name="red"
            >
                <el-table-column
                    prop="username"
                    label="用户名"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="dateTime"
                    label="创建日期"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="分类描述"
                    width="300"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="分类名"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="210"
                >
                    <template slot-scope="scope">
                        <el-button
                            :type="scope.row.isProhibit ? 'warning' : 'primary'"
                            size="small"
                            @click="prohibitAndRecovery(scope.row)"
                        >
                            {{ scope.row.isProhibit ? '禁用' : '恢复' }}
                        </el-button>
                        <el-button
                            type="info"
                            size="small"
                            @click="getEditClass(scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            @click="deleteClass(scope.row)"
                            type="danger" size="small"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="classificationData.total"
                :page-size="classificationData.pageSize"
                :current-page="classificationData.currentPage"
                @current-change="pageChange"
            >
            </el-pagination>
       </div>
        <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="50%"
        >
            <template slot="title">
                <i class="el-icon-edit"></i>
                <span class="text">编辑分类</span>
            </template>
            <div class="edit_item">
                <el-form ref="myForm" label-width="15%">
                    <el-form-item label="分类名">
                         <el-input
                            clearable
                            v-model="editClassData.name"
                            placeholder="修改分类名"
                         >
                         </el-input>
                    </el-form-item>
                    <el-form-item label="分类描述">
                         <el-input
                            clearable
                            v-model="editClassData.describe"
                            placeholder="修改分类描述"
                         >
                         </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">放 弃</el-button>
                <el-button
                    type="primary"
                    @click="keepClass"
                >
                    保 存
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { publicLogic } from '@/mixins/index'
import {
  deleteClass,
  getEditClass,
  keepClass,
  prohibitAndRecovery
} from '@/api/admin_class'
export default {
  mixins: [publicLogic],
  name: 'new_classification',
  props: {

  },
  data () {
    return {

      pages: {
        currentPage: 1,
        pageSize: 6
      },
      dialogVisible: false,
      editClassData: {
        username: this.$store.getters.getuserInfo.username,
        name: '',
        describe: '',
        id: this.$store.getters.getuserInfo.id,
        detailId: null,
        isProhibit: null
      }
    }
  },
  beforeCreate () {
    this.$notify({

      title: '尊敬的用户您好',
      message: '请谨慎操作，以免造成不必要的损失!',
      type: 'warning'
    })
  },
  methods: {

    // 切换页面
    pageChange (page) {

      this.pages.currentPage = page
      this.getClassification()
    },

    // 删除分类
    async deleteClass (obj) {
      try {
        await this.$confirm.confirm('真的要删除该分类吗？，删除之后文章也会丢失', '提示', {
          type: 'warning',
          center: true,
          cancelButtonText: '再想想',
          confirmButtonText: '删除'
        })

        const { data } = await deleteClass({

          detailId: obj.detailId,
          name: obj.name
        })

        this.$message.success(data.message)

        this.classificationData.data.forEach((item, index) => {
          if (item.detailId === obj.detailId) {
            this.classificationData.data.splice(index, 1)
          }
        })

        // 判断一下如果当前页数据删除完毕的话，就去请求上一页的数据
        if (!this.classificationData.data.length) {
          // 判断一下上一页的如果大于1的话，再执行
          if (!(this.pages.currentPage - 1 < 1)) {
            this.pages.currentPage -= 1

            this.getClassification()
          }
        }

        // 删除掉文章管理页面的缓存
        this.$event.$emit('removeArticle')
      } catch (error) {
        error === 'cancel' ? this.$message.info('已取消删除') : ''
      }
    },

    // 获取要修改的文章
    async getEditClass (obj) {

      this.dialogVisible = true

      const { data } = await getEditClass(obj)

      this.editClassData = data.data
    },

    // 点击保存条修改后的数据
    async keepClass () {

      const loading = this.$loading(this.$store.state.loading)

      try {

        const { data } = await keepClass(this.editClassData)

        this.$message.success(data.message)

        this.classificationData.data.forEach((item, index) => {
          if (item.detailId === this.editClassData.detailId) {
            this.classificationData.data[index] = this.editClassData
          }
        })

        this.dialogVisible = false
      } finally {
        loading.close()
      }
    },

    // 禁止或者恢复分类
    async prohibitAndRecovery (obj) {

      try {

        await this.$confirm.confirm('亲，您确定要操作此分类码!', '提示', {
          type: 'warning',
          cancelButtonText: '思考一下',
          confirmButtonText: '确定'
        })

        const { data } = await prohibitAndRecovery(obj)

        this.$message.success(data.message)

        obj.isProhibit = !obj.isProhibit

      } catch (error) {
        error === 'cancel' ? this.$message.info('已取消删除') : ''
      }
    }

  },
  created () {

    // 删除当前页面的缓存
    this.$event.$on('removeClassAdmin', () => {
      this.$store.commit('REMOVE_CACHE', 'new_classification')
    })
  },
  mounted () {

  },
  computed: {

    roles () {

      if (this.$store.getters.roles.includes('admin')) {
        return '管理员'
      }

      return '用户'
    }
  },
  watch: {

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
        margin-top: 80px;
        padding: 0 30px;
        margin-bottom: 100px;
        .user_info {
            width: 100%;
            height: 150px;
            background: #ffffff;
            box-shadow: 0 0 10px 4px #cccccc;
            margin-bottom: 50px;
            overflow: hidden;
            h4 {
                margin: 12px 16px;
                color: #575756;
                font-family: "楷体";
                font-size: 20px;
            }
            .user_info-top {
                margin-top: 20px;
                display: flex;
                span {
                    margin-left: 60px;
                    margin-top: 10px;
                    font-family: "楷体";
                    color: #555554;
                }
                span:nth-of-type(1) {
                    margin-left: 30px;

                }
            }
            .user_info-bottom {

                display: flex;
                span {
                    margin-left: 30px;
                    margin-top: 30px;
                    font-family: "楷体";
                    color: #555554;
                }
                span:nth-of-type(2) {
                    margin-left: 34px;

                }
            }
        }
        .user_class {
            box-shadow: 0 0 10px 4px #cccccc;
            padding: 20px;
            background: #f9b462;
            h4 {
                font-family: "楷体";
                font-size: 24px;
                text-align: center;
                color: #ffffff;
                width: 100%;
                height: 70px;
                line-height: 70px;
                background: rgba(97, 193, 248, .5);
            }
             .el-table {
                border: #e8eaea solid 1px;
                border-radius: 0 0 6px 6px;
                box-shadow: 0 0 6px 2px #cccccc;
                padding-bottom: 20px;
                /deep/ .el-table__header-wrapper {
                    .el-table__header {
                        .has-gutter {
                            tr {
                                .is-leaf {
                                    text-align: center;
                                }
                            }
                        }
                    }
                }

                /deep/ .el-table__body-wrapper {
                    .el-table__body {
                        .el-table__row {
                            .red {
                                color: #3d91f8;
                                text-align: center;
                            }
                        }
                    }
                }

            }
            .el-pagination {
                margin-top: 30px;
                text-align: center;
            }
        }
        .el-dialog__wrapper {
            .el-dialog {
                .el-dialog__header {
                    .el-icon-edit {
                        color: #64c1f7;
                        font-size: 18px;
                    }
                    .text {
                        font-size: 18px;
                        font-family: "楷体";
                        margin-left: 10px;
                        color: #828384;
                    }
                }
                .el-dialog__body {
                    .edit_item {
                        .el-form-item {
                            margin-top: 20px;
                        }
                        .el-form-item:last-of-type {
                            margin-top: 40px;
                        }
                    }
                }
            }
        }
    }
</style>
