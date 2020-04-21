<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>修改文章</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="edit_item">
                <el-form
                    :model="article"
                    ref="myForm"
                    label-width="80px"
                    :rules="articleRules"
                >
                    <el-form-item prop="article_title" label="文章标题">
                        <el-input
                            placeholder="请输入文章标题"
                            v-model="article.article_title"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="修改时间">
                        <el-date-picker
                            v-model="article.publish_time"
                            align="left"
                            type="date"
                            placeholder="修改时间"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="选择分类">
                        <el-select
                            v-model="article.selectVal"
                            placeholder="请选择文章分类"
                            no-data-text="暂无分类"
                            clearable
                        >
                            <el-option
                                clearable
                                v-for="(item, index) in classificationData.data"
                                :key="index"
                                :value="item.name"
                                :label="item.name"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input
                            v-model="article.article_auther"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input
                            v-model="article.article_keyword"
                            placeholder="关键字，查找文章的神器哦!"
                            clearable
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="文章内容">
                         <EditorQuill
                            :isBorderShow="isBorderShow"
                            @textBlur="isBorderShow = !article.content"
                            class="content"
                            v-model.trim="article.content"
                            v-if="isLoadShow"
                        />
                    </el-form-item>
                    <el-form-item label="文章描述">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="亲，为您的文章做一个简短的描述把!"
                            v-model="article.article_describe"
                            size="medium"
                            show-word-limit
                            :maxlength="20"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="keepAndCancel(true)"
                            type="success"
                        >
                            保存
                        </el-button>
                        <el-button
                            type="info"
                            @click="keepAndCancel(false)"
                        >
                            取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import {
  getClassificationData,
  editArticleDetail,
  editArticle
} from '@/api/articles'

import { publicLogic } from '@/mixins/index'

export default {
  mixins: [publicLogic],
  name: 'edit_article',
  props: {

  },
  data () {
    return {

      // 文章数据
      article: {
        article_title: '',
        publish_time: '',
        selectVal: '',
        article_auther: this.$store.getters.getuserInfo.username,
        article_keyword: '',
        content: '',
        article_describe: '',
        status: 0,
        id: this.$store.getters.getuserInfo.id,
        isProhibit: true
      },

      // 文章修改提交的验证
      articleRules: {
        article_title: [
          {
            required: true,
            message: '文章标题不能为空',
            trigger: 'blur'
          },
          {
            max: 10,
            message: '文章标题不能超过10个字符',
            trigger: 'blur'
          }
        ]
      },

      // 日期的配置
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },

      // 错误边框的显示状态
      isBorderShow: false,

      // 富文本框的显示状态
      isLoadShow: false,

      // 定时器的变量
      timeId: null
    }
  },
  computed: {

  },
  created () {
    this.getEditArticleDetail()
  },
  methods: {

    // 跳转到文章管理页面
    toArticlePage () {
      // 修改成功之后应该跳转到文章管理页面
      const { navBarArr } = this.$store.state.navBars

      navBarArr.forEach((item, index) => {
        // 判断找出编辑文章的导航栏数据，然后删除掉，重新存储
        if (item.path === `/${this.$route.name}`) {
          navBarArr.splice(index, 1)

          this.$store.commit('SET_USERNAVBAR', ...navBarArr)

          this.$router.replace('/articles_manage')
        }
      })
    },

    // 保存或者取消
    async keepAndCancel (flag) {
      // 如果点击的是取消的话，跳转到文章管理页面
      if (!flag) {
        this.toArticlePage()
        return
      }

      const loading = this.$loading(this.$store.state.loading)

      try {
        const isOk = await this.$refs.myForm.validate()

        // 文本框的验证
        this.isBorderShow = !this.article.content

        // 全部验证通过发送请求
        if (!this.isBorderShow) {
          const { data } = await editArticle(this.article)

          if (data.code === 200) {
            this.$message.success(data.message)

            this.toArticlePage()

            /*
                            告诉文章管理页面，删除文章管理页面的缓存，不然无法看到最新
                            发表的文章数据
                        */
            this.$event.$emit('removeArticle')
          }

          return
        }

        // 验证都不通过提示去填写用户信息
        this.$message.warning('请填写文章信息')
      } catch (error) {
        if (error === false) {
          this.isBorderShow = !this.article.content

          this.isBorderShow ? this.$message.warning('请填写文章信息') : ''

          return
        }
      } finally {
        loading.close()
      }
    },

    // 获取要修改的文章
    async getEditArticleDetail () {
      const { data } = await editArticleDetail({

        detailId: this.$route.params.id
      })

      if (data.code !== 200) return

      this.article = data.data
    }
  },
  watch: {

  },
  mounted () {
    this.$event.$on('removePage', () => {
      this.$store.commit('REMOVE_CACHE', 'edit_article')
    })

    this.timeId = setTimeout(() => {
      this.isLoadShow = true
    }, 330)
  },
  components: {

  },
  destroyed () {
    clearTimeout(this.timeId)
    this.timeId = null
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
    padding: 80px 20px 0 20px;
    background: #f94a14;
    padding-bottom: 6px;
    /deep/ .el-card {
        margin-bottom: 100px;
        .el-card__body {
            .el-form{
                .el-form-item {
                    margin-top: 40px;
                    /deep/ .content {
                        padding: 0;
                        background: #ffffff;
                    }
                }
                .el-form-item:last-of-type {

                    margin-left: 30%;
                    margin-top: 60px;
                    .el-button {
                        margin: 0 20px;
                    }
                }
            }

        }
    }
}

</style>
