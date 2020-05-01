<template>
    <div class="container">
        <div class="user_item">
            <div class="articles_number">
                文章总数 230
            </div>
            <div class="articles_number">
                文章评论总数 1230
            </div>
            <div class="articles_number">
                客户反馈 539
            </div>
        </div>
        <div class="echarts">
            <div
              class="articles"
              ref="articles"
              style="width: 260px;height: 260px;"
            >
            </div>
            <div
              class="articles"
              ref="comment"
              style="width: 260px;height: 260px;"
            >
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'first_page',
  props: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.articles()

    this.comment()
  },
  watch: {

  },
  methods: {
    articles () {
      const myChart = this.$echarts.init(this.$refs.articles)
      myChart.setOption({
        title: {
          text: '分类热门文章统计',
          subtext: '总数',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['html', 'css', 'javascript', 'jquery', 'ajax', 'node', 'vue']
        },
        series: [
          {
            name: '热门推荐',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Html热门文章' },
              { value: 310, name: 'css热门文章' },
              { value: 234, name: 'javascript热门文章' },
              { value: 135, name: 'jquery热门文章' },
              { value: 1548, name: 'ajax热门文章' },
              { value: 200, name: 'node热门文章' },
              { value: 189, name: 'vue热门文章' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    comment () {
      const myChart2 = this.$echarts.init(this.$refs.comment)
      myChart2.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: '评论数量',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: '完成率' }]
          }
        ]
      })
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
    .container {
        width: 100%;
        padding-bottom: 100px;
        .articles {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .articles:nth-of-type(2) {

        }
        .user_item {
            position: relative;
            .articles_number {
                width: 200px;
                height: 100px;
                position: absolute;
                background: #5dccfb;
                left: 120px;
                top: 100px;
                line-height: 100px;
                text-align: center;
                font-size: 20px;
                font-family: "黑体";
                color: #f94304;
                box-shadow: 0px 0px 0px 6px;
            }
            .articles_number:nth-of-type(2) {
                background: #64f46f;
                left: 480px;
                color: #e006fa;
            }
            .articles_number:nth-of-type(3) {
                background: #fcf303;
                left: 830px;
                color: #ffffff;
            }
        }
        .echarts {
            display: flex;
            justify-content: space-between;
            padding: 360px 80px 0 80px;
        }
    }
    h1:last-of-type {

    }
</style>
