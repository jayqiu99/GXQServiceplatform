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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="展位编号">
          <a-input
            placeholder="请输入展位编号"
            v-decorator.trim="[ 'boothNumber', validatorRules.dataName]"
          />
        </a-form-item>

        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="展位类型">
          <a-input
            placeholder="请输入展位类型"
            v-decorator.trim="[ 'boothType', validatorRules.dataType]"
          />
        </a-form-item> -->
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="展位位置">
          <a-input
            placeholder="请输入展位位置"
            v-decorator.trim="[ 'boothPosition', validatorRules.dataType]"
          /> -->
        </a-form-item>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="展位开始时间">
          <a-date-picker style="width:100%" placeholder="请选择展位开始期限" v-decorator.trim="[ 'validStartdate', validatorRules.dataType]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="展位终止时间">
          <a-date-picker style="width:100%" placeholder="请选择展位终止期限" v-decorator.trim="[ 'validEnddate', validatorRules.dataType]" />
        </a-form-item> -->
        <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input v-decorator="[ 'description']"/>
        </a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { addBasic, editBasic, duplicateCheck,getEditById,addbooth } from '@/api/api'
import store from '@/store'
export default {
  name: 'DictModal',
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
        dataName: { rules: [{ required: true, message: '请输入字典名称!' }] },
        dataType: {
          rules: [{ required: true, message: '请输入字典编码!' }, { validator: this.validateDictCode }],
        },
      },
    }
  },
  created() {},
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var seperator2 = ':'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds()
      return currentdate
    },
    validateDictCode(rule, value, callback) {
      // 重复校验
      var params = {
        tableName: 'sys_dict',
        fieldName: 'dict_code',
        fieldVal: value,
        dataId: this.model.id,
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
      console.log("展位信息",record);
      if (record.check==undefined) {
        this.$message.warning('请选择需要编辑的展位！！')
      }else if(record.check==true&&(record.boothNumber == undefined|| record.boothInsidenumber==undefined))
      {
        //打开模态框 新增
        if (record.id) {
          this.visiblekey = true
        } else {
          this.visiblekey = false
        }
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'boothNumber', 'boothType', 'boothPosition','updateBy','updateTime','createBy','createTime'))
        })

      }  else {
        if (record.id) {
          this.visiblekey = true
        } else {
          this.visiblekey = false
        }
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'boothNumber', 'boothType', 'boothPosition','updateBy','updateTime','createBy','createTime'))
        })
      }
    },
    // 确定
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          console.log("values值",formData)
          values.updateTime = this.getNowFormatDate()
          values.updateBy = (store.getters.userInfo.id || '').trim()
          let formData = Object.assign(this.model, values)
          let obj
          console.log(formData)
          if (!this.model.id) {
            formData.createBy=store.getters.userInfo.id;
            formData.createTime=this.getNowFormatDate();
            obj = addbooth(formData)
          } else {
            obj = getEditById(formData)
          }
          obj
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.$emit('eChange', formData)
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