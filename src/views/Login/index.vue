<template>
    <div class="container">
        <div class="user_img">
            <img
                :src="headImgData.headImg ? headImgData.headImg : defaultImg"
                alt=""
            />
        </div>
        <Checking
            titleText="博 客 登 陆 后 台 管 理 系 统 "
            buttonText="登陆"
            :isRememberPwd="false"
            agreement="记住密码"
            btnText="去注册"
            path="/register"
            @loginMaypeRegister="userLogin"
            :loadding="loadding"
            remember="remember"
            @usernameBlur="userBlur"
        />
    </div>
</template>

<script>
import { getLoginImg } from '@/api/user'
export default {
  name: 'Login',
  props: {

  },
  data () {
    return {
      loadding: false,
      headImgData: {},
      defaultImg: require('../../assets/images/jiazai.gif')
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
    async userLogin (userInfo, form, loadding) {
      // 开启按钮加载
      this.loadding = true
      // 开启页面加载
      const loading = this.$loading(this.$store.state.loading)

      try {
        // 表单验证通过
        const isOk = await form.validate()
        // 发送登陆请求
        const res = await this.$store.dispatch('userLogin', userInfo)

        // 根据登陆成功与否做出相应的处理
        if (res.code === 200) {
          this.$message.success(res.message)
          this.$router.replace('/first_page')
          return
        }

        this.$message.warning(res.message)
      } catch (error) {
        this.$message.warning('请填写用户名或者密码')
      } finally {
        // 无论登陆成功与否，加载状态必须关闭
        this.loadding = false
        loading.close()
      }
    },

    // 获取用户头像
    async userBlur (username) {
      const { data } = await getLoginImg({ username })
      this.headImgData = data.data
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/login_url.jpg') no-repeat;
        background-size: 100% 100vh;
        .user_img {
            position: absolute;
            left: 47%;
            top: 10%;
            box-shadow: 0 0 10px 10px #75c6f9;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;

            }
        }
    }
</style>
