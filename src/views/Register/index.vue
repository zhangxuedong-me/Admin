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
    data() {
        return {
            dialogVisible: false,
            loadding: false,
            msg: '请填写用户名、密码、账号'
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        async userRegister (userInfo, form) {

            // 按钮的加载状态
            this.loadding = true
            // 屏幕的加载状态
            const loading = this.$loading(this.$store.state.loading)

            try {

                // 注册信息是否通过验证
                const isOk = await form.validate()
                // 发送请求
                const { data } = await userRegister(userInfo)

                if (data.code === 200) {

                    this.dialogVisible = true
                    this.$message.success(data.message)
                    return
                }

                this.$message.warning(data.message)

            } catch (error) {

                this.$message.warning(this.msg)

            } finally {

                // 关闭加载状态
                this.loadding = false
                loading.close()
            }
        },

        confirm () {
            this.dialogVisible = false
            this.$router.replace('/login')
        }
    },
    components: {

    },
}
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100vh;
        background: url('../../assets/images/register_url2.jpg') no-repeat;
        background-size: 100% 100vh;
    }
</style>
