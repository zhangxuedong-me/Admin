<template>
  <div class="container">
    <quill-editor
      class="text"
      :value="value"
      :options="editorOption"
      @blur="$emit('textBlur')"
      @focus="$emit('textFocus')"
      :class="isBorderShow ? 'text_border' : ''"
      @input="$emit('input', $event)"
    >
      <div id="toolbar" slot="toolbar">
        <button class="ql-bold" title="加粗"></button>
        <button class="ql-italic" title="斜体"></button>
        <button class="ql-underline" title="下划线"></button>
        <button class="ql-strike" title="删除线"></button>
        <button class="ql-blockquote" title="引用"></button>
        <button class="ql-code-block" title="代码"></button>
        <button class="ql-header" value="1" title="标题1"></button>
        <button class="ql-header" value="2" title="标题2"></button>
        <button class="ql-list" value="ordered" title="有序列表"></button>
        <button class="ql-list" value="bullet" title="无序列表"></button>
        <select class="ql-header" title="段落格式">
          <option selected>段落</option>
          <option v-for="(item, index) in title" :value="index + 1" :key="index">标题{{ index + 1 }}</option>
        </select>
        <select class="ql-size" title="字体大小">
          <option v-for="item in fontSize" :value="item" :key="item">{{ item }}</option>
        </select>
        <select class="ql-font" title="字体">
          <option value="SimSun">宋体</option>
          <option value="SimHei">黑体</option>
          <option value="Microsoft-YaHei">微软雅黑</option>
          <option value="KaiTi">楷体</option>
          <option value="FangSong">仿宋</option>
          <option value="Arial">Arial</option>
        </select>
        <button class="ql-link" title="超链接"></button>
        <select class="ql-color" value="color" title="字体颜色"></select>
        <select class="ql-background" value="background" title="背景颜色"></select>
        <select class="ql-align" value="align" title="文本对齐"></select>
        <button class="ql-clean" title="还原"></button>
        <button class="ql-image" title="上传图片"></button>
      </div>
    </quill-editor>
    <div v-if="isBorderShow" class="error">
        <span>文章内容不能为空</span>
    </div>
  </div>
</template>

<script>
// 富文本框的样式文件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor, Quill } from "vue-quill-editor"

// 自定义字体大小
let Size = Quill.import("attributors/style/size")
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "50px"
]
Quill.register(Size, true)

// 自定义字体类型
let fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
]

let Font = Quill.import("formats/font")
Font.whitelist = fonts
Quill.register(Font, true)

export default {
  name: "EditorQuill",
  props: {
      isBorderShow: {
          type: Boolean,
          required: true
      },
      value: {
          type: String
      }
  },
  data() {
    return {
      // 富文本编辑器的配置
      editorOption: {
        placeholder: "请输入文章内容",
        theme: "snow",
        modules: {
          toolbar: {
            container: "#toolbar"
          }
        }
      },

      fontSize: [
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "22px",
        "24px",
        "50px"
      ],
      title: ["h1", "h2", "h3", "h4", "h5", "h6"]
    }
    
  },
  computed: {
     
  },
  created() {
      
  },
  methods: {

  },
  watch: {},
  mounted() {

  },
  components: {
      quillEditor
  }
};
</script>

<style scoped lang="less">
.container {
    .error {
        position: absolute;
        top: 40px;
        left: 40%;
        span {
            color: red;
        }
    }

    /deep/ .text_border {
        border: #f95208 solid 1px;
        padding-bottom: 40px;
    }
    .text {
        height: 500px;
        width: 100%;
        margin-bottom: 70px;
    }
}
</style>
