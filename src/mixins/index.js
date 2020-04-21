// 抽离公共的js部分
import {
  getClassificationData 
} from '../api/articles'

export const publicLogic = {

  data () {
    return {
      classificationData: {}
    }
  },
  methods: {

    // 获取分类
    async getClassification () {
      
      let pages = {}

      if (this.$route.path === '/new_classification') {

        pages = this.pages
      }
      console.log(pages)
      const { data } = await getClassificationData({

        id: this.$store.getters.getuserInfo.id,
        ...pages
      })

      this.classificationData = data
    },  
  },

  created () {
    this.getClassification()
  }
}