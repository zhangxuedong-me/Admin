<template>
  <div class="container">
    <div class="publish_container">
      <div class="publish_title">
        <h4>新建文章</h4>
      </div>
      <div class="publish_item">
        <div class="publish_articles">
          <el-form ref="myForm" :model="article" :rules="articleRules">
            <el-form-item prop="article_title">
              <div class="publish_articles_item">
                <h4>文章标题</h4>
                <el-input v-model="article.article_title" placeholder="请输入标题"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="publish_articles_time">
                <div class="publish_articles_item">
                  <h4>发表时间</h4>
                  <el-date-picker
                    v-model="article.publish_time"
                    align="left"
                    type="date"
                    placeholder="发表时间"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
                <div class="publish_articles_item">
                  <h4>选择分类</h4>
                  <el-select
                    v-model="article.selectVal"
                    placeholder="请选择文章分类"
                    no-data-text="暂无分类"
                    clearable
                  >
                    <el-option
                      clearable
                      v-for="(item, index) in classificationData"
                      :key="index"
                      :value="item.name"
                      :label="item.name"
                    ></el-option>
                  </el-select>
                </div>
                <div class="publish_articles_item">
                  <h4>作者</h4>
                  <el-input v-model="article.article_auther" clearable></el-input>
                </div>
                <div class="publish_articles_item">
                  <h4>关键字</h4>
                  <el-input v-model="article.article_keyword" placeholder="关键字，查找文章的神器哦!" clearable></el-input>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-tooltip effect="dark" content="亲! 新建一个分类把，可以更好的管理您的文章" placement="top-start">
                <el-button
                  class="set_class_name"
                  type="success"
                  round
                  @click="dialogVisible = true"
                >创建分类</el-button>
              </el-tooltip>

              <el-dialog
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="cancel"
              >
                <template slot="title">
                  <i class="el-icon-edit"></i>
                  <span class="text">新建分类</span>
                </template>
                <div class="dialog_item" v-if="dialogVisible">
                  <el-form
                    ref="form"
                    label-width="60px"
                    label-position="left"
                    :model="classification"
                    :rules="classificationRules"
                    :hide-required-asterisk="true"
                  >
                    <el-form-item prop="name" label="名称">
                      <el-input placeholder="请输入名称" v-model="classification.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input
                        placeholder="简单描述吧"
                        v-model="classification.describe"
                        type="textarea"
                        :rows="2"
                        :maxlength="20"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="cancel">取消</el-button>
                  <el-button @click="setSubmit" type="primary">确定</el-button>
                </span>
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-card>
                <template slot="header">
                  <h4>文章内容</h4>
                </template>
                <EditorQuill
                  :isBorderShow="isBorderShow"
                  @textBlur="isBorderShow = !article.content"
                  class="content"
                  v-model.trim="article.content"
                  v-if="isLoadShow"
                />
              </el-card>
            </el-form-item>
            <el-form-item>
              <div class="publish_articles_item">
                <h4>文章描述</h4>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="亲，为您的文章做一个简短的描述把!"
                  v-model="article.article_describe"
                  size="medium"
                  show-word-limit
                  :maxlength="20"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item class="submit_article">
              <el-button @click="publishArticleAndDraft(true)" type="success" plain>发布文章</el-button>
              <el-button @click="publishArticleAndDraft(false)" type="info" plain>存为草稿</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  articlesClassification,
  getClassificationData,
  publishArticle
} from "@/api/articles.js"

export default {

  name: "publish_article",
  props: {},
  data() {
    return {
      // 发表文章像后端提交的数据
      article: {
        article_title: "",
        publish_time: "",
        selectVal: "",
        article_auther: this.$store.getters.getuserInfo.username,
        article_keyword: "",
        article_describe: "",
        content: "",
        status: 0,
        id: this.$store.getters.getuserInfo.id,
        isProhibit: true
      },

      // 新建分类提交的数据
      classification: {
        username: this.$store.getters.getuserInfo.username,
        name: "",
        describe: "",
        id: this.$store.getters.getuserInfo.id
      },

      // 弹框的显示状态
      dialogVisible: false,

      // 下拉日期的配置
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date())
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit("pick", date)
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", date)
            }
          }
        ]
      },

      // 新建分类的验证
      classificationRules: {
        name: [
          {
            required: true,
            message: "请输入分类名",
            trigger: "blur"
          },
          {
            max: 10,
            message: "最长不能超过10个",
            trigger: "blur"
          }
        ]
      },

      // 文章提交的验证
      articleRules: {
        article_title: [
          {
            required: true,
            message: "文章标题不能为空",
            trigger: "blur"
          },
          {
            max: 10,
            message: "文章标题不能超过10个字符",
            trigger: "blur"
          }
        ]
      },

      // 分类数据
      classificationData: [],

      // 错误边框的显示和隐藏
      isBorderShow: false,

      // 富文本框的显示状态
      isLoadShow: false,

      // 定时器的变量
      timeId: null
    }
  },
  computed: {},

  created() {

    this.getClassification()
  },
  mounted() {

    this.timeId = setTimeout(() => {

      this.isLoadShow = true

    }, 330);
  },
  watch: {},
  methods: {

    // 点击确定创建分类
    async setSubmit() {

      const loading = this.$loading(this.$store.state.loading)

      try {

        // 验证通过发送请求
        const isOk = await this.$refs.form.validate()
        const { data } = await articlesClassification(this.classification)

        // 200就是创建成功，否则就是有重复的项
        if (data.code === 200) {

          this.$message.success(data.message)

          this.dialogVisible = false

          // 将成功成功的那一项添加到分类数据中
          this.classificationData.push(this.classification)

          this.$event.$emit('removeClassAdmin')

          this.$event.$emit('removeArticle')

          this.$event.$emit('removePage')

        } else {
          
          this.$message.warning(data.message)

        }
      } catch (error) {

        if (error === false) {

          this.$message.warning('分类名称不能为空哦!')
        }
        
      } finally {

        // 必须执行的代码
        this.classification = {
          username: this.$store.getters.getuserInfo.username,
          name: "",
          describe: "",
          id: this.$store.getters.getuserInfo.id
        }

        loading.close()
      }

    },

    // 获取创建的分类
    async getClassification() {

        const { data } = await getClassificationData({
          id: this.classification.id
        })

        if (data.code !== 200) return

        this.classificationData = data.data
    },

    // 取消的处理
    cancel(status) {
      
      this.dialogVisible = false
      this.classification = {
        name: "",
        describe: "",
        id: this.$store.getters.getuserInfo.id
      }
    },

    // 点击之后发表文章或者保存文章
    async publishArticleAndDraft(status) {

      /*
        status 如果是true的话就是发表文章，false就是存为草稿
        this.article.status为0是全部文章，为1是草稿
      */

      status ? (this.article.status = 0) : (this.article.status = 1)

      const loading = this.$loading(this.$store.state.loading)

      try {

        const isOk = await this.$refs.myForm.validate()

        this.isBorderShow = !this.article.content

        // 验证通过发表文章
        if (!this.isBorderShow) {
          
          const { data } = await publishArticle(this.article)

          this.$message.success(data.message)

          this.$router.replace("/articles_manage")

          // 发布事件通知文章管理页面删除自己的缓存，否则看不到当前发表的文章
          this.$event.$emit("removeArticle")

          // 并且删除当前页面的缓存，否则下次进来还是缓存上一次的内容
          this.$store.commit("REMOVE_CACHE", "publish_article")

        } else {

          this.$message.warning('请填写文章的信息')
        }

      } catch (error) {

        this.isBorderShow = !this.article.content

        error === false ?  this.$message.warning('请填写文章的信息') : ''

      } finally {

        loading.close()
      }
    }
  },
  components: {},

  destroyed() {
    clearTimeout(this.timeId)
    this.timeId = null
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {

      // 需要换成的页面
      vm.$store.commit("ADD_CACHE", to.name)
    })
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  margin-top: 60px;
  background: #b6b4b4;
  padding-right: 60px;
  box-sizing: border-box;
  padding-bottom: 1500px;
  .publish_container {
    width: 100%;
    height: 100%;
    margin: 0px 20px;
    margin-top: 10px;
    padding-top: 20px;
    .publish_title {
      h4 {
        font-weight: 700;
        font-size: 20px;
        color: #757677;
      }
      padding-bottom: 16px;
      border-bottom: #bfbfbf solid 1px;
    }
    .publish_item {
      margin-top: 20px;
      padding-bottom: 100px;
      .publish_articles {
        .publish_articles_item {
          h4 {
            font-weight: 400;
            font-size: 16px;
            color: #3f4040;
          }
          /deep/ .el-input__inner {
            background: rgba(250, 252, 254, 0.8);
          }
          /deep/ .el-textarea__inner {
            resize: none;
          }
        }
        .publish_articles_time {
          display: flex;
          .publish_articles_item {
            margin-right: 50px;
          }
          .publish_articles_item:nth-of-type(3) {
            /deep/ .el-input__inner {
              color: #5b5ff4;
            }
          }
          .publish_articles_item:nth-of-type(4) {
            /deep/ .el-input__inner {
              width: 200px;
            }
          }
        }
        .set_class_name {
          padding: 10px 50px;
          margin-left: 350px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
        .el-card {
          height: 700px;
          .el-card__header {
            h4 {
              color: #8a8888;
              font-size: 18px;
            }
          }
        }
        .content {
          background: #ffffff;
          padding: 0;
        }
        .submit_article {
          text-align: center;
          margin-top: 100px;
          .el-button {
            margin-left: 30px;
          }
        }
        /deep/ .el-dialog__header {
            .el-icon-edit {
              color: #57d1f9;
              font-size: 18px;
            }
            .text {
              margin-left: 10px;
              font-family: "楷体";
              font-size: 18px;
              color: #757676;
            }
        }
        .dialog_item {
          .el-form-item:nth-of-type(2) {
            margin-top: 30px;
            /deep/ .el-textarea__inner {
              resize: none;
            }
          }
         
        }
      }
    }
  }
}
</style>
