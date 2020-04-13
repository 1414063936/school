<template>
  <span>
    <my-click-button
      :type="type"
      :size="size"
      :label="label"
      @click="click">
    </my-click-button>
    <el-dialog
      width="60%"
      :visible.sync="visible"
      v-if="visible"
      title="编辑"
      append-to-body>
      <el-form ref="form" size="mini" :model="model" :rules="rules" label-width="200px" status-icon>
        <el-form-item label="学号" prop="cno">
          <el-col :span="10">
              <el-input v-model="model.cno" disabled></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-col :span="10">
              <el-input v-model="model.name"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-col :span="10">
              <el-input v-model="model.sex"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-col :span="10">
              <el-input v-model="model.birth"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-col :span="10">
              <el-input v-model="model.phone"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-col :span="10">
              <el-input v-model="model.address"></el-input>
            </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
    </el-dialog>
  </span>
</template>

<script>
import MyClickButton from './ClickButton.vue'
import MyComponentDialog from '@/components/dialog/ComponentDialog.vue'

export default {
  name: 'MyFormDialogButton',
  components: {
    [MyClickButton.name]: MyClickButton,
    [MyComponentDialog.name]: MyComponentDialog
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'mini'
    },
    icon: {
      type: String,
      default: ''
    },
    formDetail: {
      type: Object
    },
    rowData: {
      type: Object
    }
  },
  data () {
    return {
      visible: false,
      model: this.formDetail.model,
      rules: this.formDetail.rules
    }
  },
  mounted () {
    console.log(this.rules)
  },
  methods: {
    emitEventHandler (event) {
      this.$emit(event, ...Array.from(arguments).slice(1))
    },
    submit () {
      const vm = this
      vm.$refs['form'].validate((valid) => {
        if (!valid) {
          return
        }

        console.log(this.model)
        this.visible = false
      })
      this.emitEventHandler('submit')
    },
    initModel () {
      Object.assign(this.model, this.rowData)
    },
    click () {
      this.initModel()
      this.visible = true
    }
  }
}
</script>
