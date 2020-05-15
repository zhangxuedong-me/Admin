<template>
    <div class="container">
        <Checking
            titleText="博 客 注 册 后 台 管 理 系 统 "
            buttonText="注册"
            :isRememberPwd="true"
            agreement="勾选用户协议"
            btnText="去登陆"
            path="/login"
            @loginMaypeRegister="userRegister"
            remember=""
            :loadding="loadding"
            :dialogVisible="dialogVisible"
            @userAgree="isAgree = true"
        />
        <el-dialog
            title="注册成功"
            :visible.sync="dialogVisible"
            width="40%"
        >
            <span>亲恭喜您注册成功了，是否马上去登陆</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
          title="用户协议"
          :visible.sync="isAgree"
          width="30%"
        >
          <div class="agree_item">
            <p>管理员微信：18532620986</p>
            <p>管理员qq：1849310432</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="isAgree = false">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>

<script>
import {
  userRegister
} from '@/api/user'
export default {
  name: 'Register',
  props: {

  },
  data () {
    return {
      dialogVisible: false,
      loadding: false,
      isAgree: false
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
    
    async userRegister (userInfo, form) {

      // 按钮的加载状态
      this.loadding = true

      try {
        // 注册信息是否通过验证
        await form.validate()

        // 发送请求
        const { data } = await userRegister(userInfo)

        if (data.code === 200) {
          
          this.dialogVisible = true
          this.$message.success(data.message)
          this.isAgree = false
          return
        }

        this.$message.warning(data.message)
      } catch (error) {
        this.$message.warning('请填写用户名、密码、账号')
      } finally {
        // 关闭加载状态
        this.loadding = false
      }
    },

    confirm () {
      this.dialogVisible = false
      this.$router.replace('/login')
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
  background: url("../../assets/images/register_url2.jpg") no-repeat;
  background-size: 100% 100vh;
  .agree_item {
    p {
      margin: 20px 0;
      font-family: "楷体";
      font-size: 20px;
    }
  }
}
</style>
