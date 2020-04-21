<template>
  <div class="container">
    <el-tabs
      v-model="activeName"
      v-if="isTabShow"
      @tab-click="$emit('tabClick', activeName)"
    >
        <el-tab-pane name="user">
          <template slot="label">
            <el-button
              plain
              type="primary"
              :class="activeName === 'user' ? 'user_back' : ''"
            >
              用户头像
            </el-button>
          </template>

        </el-tab-pane>
        <el-tab-pane name="admin">
          <template slot="label">
            <el-button
              plain
              type="success"
              :class="activeName === 'admin' ? 'admin_back' : ''"
            >
              管理员专用
            </el-button>
          </template>
        </el-tab-pane>
    </el-tabs>
    <div class="head_img" v-if="isIdentity">
      <div
        class="head_img_item"
        :class="selectedImg.id === item.id ? 'select_img' : ''"
        v-for="item in headImgData.data"
        :key="item.id"
        @click="$emit('selectImg', item)"
      >
        <img :src="item.imgSrc" alt />
      </div>
    </div>
    <div class="define" v-if="isIdentity">
      <el-button @click="$emit('cancel')" type="info">取消</el-button>
      <el-button type="primary" @click="$emit('selectDefine')">确定</el-button>
    </div>
    <div v-else class="no_quanxian">
        <h4>哈哈哈，你不是我们最帅的冬哥管理</h4>
        <h4>不让你看气不气</h4>
        <img src="../../assets/images/quanxian.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SetHeadImg',
  props: {

    // 需要展示的用户图片，接受一个对象，对象中包含数组
    headImgData: {
      type: Object,
      required: true
    },

    // 将点击后的图片赋值给selectedImg
    selectedImg: {
      type: Object,
      required: true
    },

    // 是否显示tab标签栏
    isTabShow: {
      type: Boolean,
      required: true
    },

    // 验证是否是管理员
    isIdentity: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      activeName: 'user'
    }
  },
  computed: {},
  created () {},
  methods: {
  },
  watch: {

  },
  mounted () {},
  components: {}
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  padding: 0;
  .head_img {
    display: flex;
    flex-wrap: wrap;
    .head_img_item:not(:last-of-type) {
      margin-right: 26px;
    }
    .head_img_item {
      width: 100px;
      height: 100px;
      margin-top: 20px;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .select_img {
      box-shadow: 0 0 10px 6px #74d5f5;
    }
  }
  .define {
    margin: 50px 0 0 200px;
    .el-button {
      margin: 0 20px;
    }
  }
  /deep/ .el-tabs {
    .el-tabs__header {
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .el-tabs__active-bar {
        display: none;
      }
    }
  }
  .user_back {
    background: #3a9bf5;
    color: #ffffff;
  }
  .admin_back {
    background: #4cd453;
    color: #ffffff;
  }
  .no_quanxian {
    position: relative;
    h4 {
      font-size: 22px;
      text-align: center;
      font-family: "楷体";
      position: absolute;
      top: 30%;
      left: 30%;
    }
    h4:nth-of-type(2) {
      top: 50%;
      left: 40%;
    }
  }
}
</style>
