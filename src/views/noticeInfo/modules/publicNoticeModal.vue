<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="通知公告标题">
          <a-input
            style="width: 1150px"
            placeholder="请输入通知公告标题"
            v-decorator.trim="['noticeTitle', validatorRules.noticeTitle]"
          />
        </a-form-item>
        <a-form-item label="通知公告内容"> </a-form-item>
        <a-form-item label="">
          <quill-editor
            v-decorator.trim="['noticeContent', validatorRules.noticeContent]"
            style="width: 1150px; height: 500px"
            ref="myQuillEditor"
          >
          </quill-editor>
        </a-form-item>
        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="基础数据类型">
          <a-input placeholder="请输入基础数据类型" v-decorator.trim="[ 'dataType', validatorRules.dataType]"/>
        </a-form-item> -->

        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input v-decorator="[ 'description']"/>
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { quillEditor } from 'vue-quill-editor'


import store from '@/store'
import { getAction, deleteAction, postAction } from '@/api/manage'
export default {
  name: 'DictModal',
  components: { quillEditor },
  data() {
    return {
      value: 1,
      title: '修改编辑通知公告',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        noticeTitle: { rules: [{ required: true, message: '请输入通知公告标题!' }] },
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      console.log(record)
      if (record.id) {
        this.visiblekey = true
      } else {
        this.visiblekey = false
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'noticeContent', 'noticeTitle'))
      })
    },
    // 确定
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          values.noticeContent = (values.noticeContent.html || '').trim()
          values.noticeTitle = (values.noticeTitle || '').trim()
          values.noticeType='notice'
          values.createBy=(store.getters.userInfo.id || '').trim()
          values.updateBy = (store.getters.userInfo.id || '').trim()
          let formData = Object.assign(this.model, values)
          let url
          console.log(formData)
          if (!this.model.id) {
           
            url = '/app/publicnotice/add'
          } else {
             
            url = '/app/publicnotice/editById'
          }
          postAction(url, formData)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
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
    // 关闭
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
  },
}
</script>