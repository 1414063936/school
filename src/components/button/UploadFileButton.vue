<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="action"
    :auto-upload="autoUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :before-remove="beforeRemove"
    :before-upload="beforeUpload"
    :multiple="multiple"
    :limit="limit"
    :on-exceed="handleExceed"
    :show-file-list="showFileList"
    :list-type="listType"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">{{ tooltip }}</div>
  </el-upload>
</template>
<script>
import methods from '../mixins/methods'
export default {
  name: 'MyUploadFileButton',
  mixins: [methods],
  props: {
    action: {
      type: String,
      default: ''
    },
    autoUpload: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    listType: {
      type: String,
      default: 'text'
    },
    showList: {
      type: Array,
      default: function () {
        return []
      }
    },
    singleReplace: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 1
    },
    tooltip: {
      type: String
    }
  },
  data () {
    return {
      uploadList: {},
      fileList: this.showList
    }
  },
  methods: {
    handleRemove (file, fileList) {
      if (this.limit === 1) {
        this.uploadList = {}
      } else {
        this.uploadList[file.name] = false
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSuccess (response, file, fileList) {

    },
    handleChange (file) {
      this.uploadList[file.raw.name] = file.raw
    },
    handleExceed (files, fileList) {
      if (this.singleReplace && this.limit === 1) {
        this.fileList = [{
          name: files[0].name,
          status: 'ready'
        }]
        this.handleRemove()
        this.handleChange({raw: files[0]})
      } else {
        this.$message.warning('超过文件上传个数限制')
      }
    },
    beforeUpload (file) {

    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    setFileList (fileList) {
      this.fileList = fileList
    },
    async getFileList () {
      // const vm = this
      const base64List = []

      for (let i in this.uploadList) {
        const file = this.uploadList[i]
        if (file !== false) {
          base64List.push(await this.convertFileToBase64(file))
        }
      }

      return base64List
    }
  }
}
</script>

<style>
  .el-upload-list__item {
    transition: none !important;
  }
</style>
