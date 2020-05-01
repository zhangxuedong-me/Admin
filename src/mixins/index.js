// 抽离公共的js部分
import {
  getClassificationData,
  prohibitAndRecovery as articleProhibit
} from '../api/articles'

import {
  getUserImg
} from '@/api/user'

import {
  prohibitAndRecovery as  classProhibit
} from '@/api/admin_class'

export const publicLogic = {

  data () {
    return {

      // 获取到的文章分类数据
      classificationData: {},

      // 获取到的用户图片数据
      headImgData: {},

      // 选中点击的每一张的图片  
      selectedImg: {
        id: '',
        imgSrc: '',
        type: ''
      },

      // 获取用户图片   
      pages: {
        currentPage: 1,
        pageSize: 10,
        type: 'user'
      },

      // 注册登陆和修改用户资料的验证
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
            message: '密码格式最少5位包括字母，最多不超过16位',
            trigger: 'blur'
          }
        ],
        Email: [
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

      // 发表文章像后端提交的数据
      article: {
        article_title: '',
        publish_time: '',
        selectVal: '',
        article_auther: this.$store.getters.getuserInfo.username,
        article_keyword: '',
        article_describe: '',
        content: '',
        status: 0,
        id: this.$store.getters.getuserInfo.id,
        isProhibit: true
      },

      // 下拉日期的配置
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },

      // 文章提交的验证
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

      // 定时器的变量
      timeId: null
    }
  },
  methods: {

    // 获取分类
    async getClassification () {
      
      let pages = {}

      if (this.$route.path === '/new_classification') {

        pages = this.pages
      }

      const { data } = await getClassificationData({

        id: this.$store.getters.getuserInfo.id,
        ...pages
      })

      this.classificationData = data
    },  

    // 获取用户头像
    async getUserAndEditUser () {

      this.dialogTableVisible = true

      const { data } = await getUserImg(this.pages)
      this.headImgData = data
    },

    // 禁止分类使用或者恢复和禁止文章使用和恢复的共同方法
    async prohibitAndRecovery (obj, status) {

      try {

        await this.$confirm.confirm('亲，您确定要操作此分类码!', '提示', {
          type: 'warning',
          cancelButtonText: '思考一下',
          confirmButtonText: '确定'
        })

        const { data } = status === 'article' ?
        await articleProhibit({ detailId: obj.detailId })
        :await classProhibit(obj)

        this.$message.success(data.message)

        obj.isProhibit = !obj.isProhibit

      } catch (error) {

        error === 'cancel' ? this.$message('已取消删除') : ''

      }
    },
  },

  created () {
    
  },
  
  destroyed () {

    // 清除页面使用的定时器
    clearTimeout(this.timeId)
    this.timeId = null
  }
}