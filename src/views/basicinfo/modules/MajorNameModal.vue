<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="专业类型">
          <a-select v-decorator.trim="['parentid', validatorRules.parentid]" show-search :filter-option="filterOption">
            <a-select-option v-for="d in marjortypelist" :key="parseInt(d.id)" :value="parseInt(d.id)">{{
              d.dataName
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="专业名称">
          <a-input placeholder="请输入专业名称" v-decorator.trim="['dataName', validatorRules.dataName]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { httpAction, getAction } from '@/api/manage'
import store from '@/store'
export default {
  name: 'MajorNameModal',
  data() {
    return {
      value: 1,
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        dataName: { rules: [{ required: true, message: '请输入专业类型名称!' }] },
        parentid: { rules: [{ required: true, message: '请选择专业类型!' }] },
      },
      marjortypelist: [],
      url: {
        marjortypelist: '/base/list?type=majortype&pageNo=1&pageSize=1000',
        add: '/base/add',
        edit: '/base/editById',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'parentid', 'dataName'))
      })
    },
    // 确定
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          let params = new Object()
          values.userid = (store.getters.userInfo.id || '').trim()
          values.dataType = 'majorname'
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'get'
          }
          let formData = Object.assign(this.model, values)
          if (method == 'get') {
            formData = {}
            httpurl += `?dataName=${this.model.dataName}&id=${this.model.id}&userid=${this.model.userid}&parentid=${this.model.parentid}`
          }
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    getMarjorTypeList() {
      getAction(this.url.marjortypelist).then((res) => {
        this.marjortypelist = res.result.records
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
  },
  created() {
    this.getMarjorTypeList()
  },
}
</script>