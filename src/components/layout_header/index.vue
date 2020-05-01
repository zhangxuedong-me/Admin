<template>
    <div class="container">
        <div class="header">
            <h4>欢迎来到冬哥博客后台管理系统</h4>
            <span @click="point">更多提示 ></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'LayoutHeader',
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

  },
  watch: {

  },
  methods: {
    point () {
      this.$notify({
        title: '重要提示',
        message: '尊敬的用户您好，请文明用语，文章中不能有辱骂他人的语法，否则将禁止您的登陆。谢谢您的配合!',
        duration: 5000
      })
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
@import url('../../styles/variables.less');
.container {
  width: 100%;
  height: 100px;
  background: @sideBack;
  background-size: 100% 80px;
  position: fixed;
  z-index: 1000;
  overflow: hidden;
  padding: 0;
  margin: 0;
  .header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    h4 {
      font-size: 26px;
      color: #c14df7;
      font-family: @family;
    }
    span {
      font-size: 14px;
      font-family: "黑体";
      color: #05f5f8;
      cursor: pointer;
      margin-right: 300px;
    }
    span:hover {
      color: #ffffff;
    }
  }
}
</style>
