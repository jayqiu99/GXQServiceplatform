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
          <a-form-item label="审核" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group
            v-model="identity">
            <a-radio value="1">通过</a-radio>
            <a-radio value="-1">不通过</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import { addBasic, editexamine, duplicateCheck } from '@/api/api'
  import store from '@/store'
  export default {
    name: 'DictModal',
    data() {
      return {
        value: 1,
        title: '审核',
        visible: false,
        model: {},
        examineparams:{
          id:"",
          examinestate:"",
        }, 
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        identity:"1",
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules: {
          dataName: { rules: [{ required: true, message: '请输入字典名称!' }] },
          dataType: {
            rules: [{ required: true, message: '请输入字典编码!' },
              { validator: this.validateDictCode }]
          }
        }
      }
    },
    created() {
    },
    methods: {
      validateDictCode(rule, value, callback) {
        // 重复校验
        var params = {
          tableName: 'sys_dict',
          fieldName: 'dict_code',
          fieldVal: value,
          dataId: this.model.id
        }
        duplicateCheck(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback(res.message)
          }
        })
      },
      handleChange(value) {
        this.model.status = value
      },
      add() {
        this.edit({})
      },
      edit(record) {
        if (record.id) {
          this.visiblekey = true
        } else {
          this.visiblekey = false
        }
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'dataName', 'dataType',))
        })
      },
      // 确定
      handleOk() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            values.examinestate = (this.identity || '').trim()
            // this.identity
            let formData = Object.assign(this.model, values)
            let obj
            console.log(formData)
            this.examineparams.id=formData.id;
            this.examineparams.examinestate=this.identity;
            if (!this.model.id) {
                console.log("新增");
              obj = addBasic(formData)
            } else {
                 console.log("修改");
              obj = editexamine(this.examineparams)
            }
            obj.then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
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
      }
    }
  }
</script>