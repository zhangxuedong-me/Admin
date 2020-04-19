<template>
  <div class="container">
    <el-tabs
      v-model="activeName"
      v-if="isTabShow"
      @tab-click="$emit('tabClick', activeName)"
    >
        <el-tab-pane name="user">
          <template slot="label">
            <el-button plain type="primary">用户头像</el-button>
          </template>
          aa
        </el-tab-pane>
        <el-tab-pane name="admin">
          <template slot="label">
            <el-button plain type="success">管理员专用</el-button>
          </template>
          asas
        </el-tab-pane>
    </el-tabs>  
    <div class="head_img">
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
    <div class="define">
      <el-button @click="$emit('cancel')" type="info">取消</el-button>
      <el-button type="primary" @click="$emit('selectDefine')">确定</el-button>
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
      }
  },
  data() {
    return {
        activeName: 'user'
    }
  },
  computed: {},
  created() {},
  methods: {
  },
  watch: {},
  mounted() {},
  components: {}
}
</script>

<style scoped lang="less">
.container {
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
}
</style>
