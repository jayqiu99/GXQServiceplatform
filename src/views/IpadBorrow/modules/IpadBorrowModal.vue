<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="招聘会名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="[ 'jobFairId', validatorRules.jobFairId]"
            @change="getEntryenterpriseList"
          >
            <a-select-option
              v-for="d in jobfairdata"
              :key="parseInt(d.id)"
              :value="parseInt(d.id)"
            >{{d.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'enterpriseInfoId', validatorRules.enterpriseInfoId]">
            <a-select-option
              v-for="d in entryenterprise"
              :key="d.enterpriseid"
              :value="d.enterpriseid"
            >{{d.enterpriseName}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="平板编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ipadCode', validatorRules.ipadCode]"></a-input>
        </a-form-item>
        <a-form-item label="借用状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="[ 'borrowState', validatorRules.borrowState]">
            <a-select-option :value="0">无</a-select-option>
            <a-select-option :value="-1">归还</a-select-option>
            <a-select-option :value="1">借用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="借用时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            style="width:100%"
            v-decorator="['borrowingTime']"
            :disabled-date="disabledStartDate"
            :format="dateFormat"
            show-time
            @openChange="handleStartOpenChange"
          />
        </a-form-item>
        <a-form-item label="归还时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-date-picker
            style="width:100%"
            :format="dateFormat"
            show-time
            v-decorator="['returnTime']"
            :disabled-date="disabledEndDate"
            :open="endOpen"
            @openChange="handleEndOpenChange"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
import store from '@/store'
export default {
  name: 'IpadBorrowMoadl',
  components: {},
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      model: {},
      jobfairdata: [],
      entryenterprise: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      confirmLoading: false,
      validatorRules: {
        jobFairId: { rules: [{ required: true, message: '请选择招聘会' }] },
        enterpriseInfoId: { rules: [{ required: true, message: '请选择企业' }] },
        ipadCode: { rules: [{ required: true, message: '请输入平板编号' }] },
        borrowState: { rules: [{ required: true, message: '请选择借用状态' }] },
      },
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      url: {
        add: '/hall/tabletpc/add',
        edit: '/hall/tabletpc/editById',
        jobfairdata: '/hall/jobfair/list',
        entryenterprise: '/hall/entryenterprise/list',
      },
      expandedRowKeys: [],
      pidField: '',
      subExpandedKeys: [],
    }
  },
  created() {},
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.form.getFieldValue('returnTime')
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.form.getFieldValue('borrowingTime')
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    add() {
      this.edit({})
    },
    edit(record) {
      console.log(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'borrowState',
            'borrowingTime',
            'createBy',
            'createTime',
            'enterpriseInfoId',
            'id',
            'ipadCode',
            'jobFairId',
            'returnTime',
            'updateBy',
            'updateTime'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        that.jobfairdata = res.result.records
        that.getEntryenterpriseList(res.result.records[0].id)
      })
    },
    getEntryenterpriseList(value) {
      let that = this
      getAction(that.url.entryenterprise, { jobfairId: value }).then((res) => {
        that.entryenterprise = res.result.records
      })
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'post'
            values.updateBy = (store.getters.userInfo.id || '').trim()
          }
          values.createBy = (store.getters.userInfo.id || '').trim()
          let formData = Object.assign(this.model, values)
          let returntime = formData.returnTime
          if (typeof returntime == 'string') {
          } else {
            returntime = returntime == null || '' ? '' : returntime.format('YYYY-MM-DD HH:mm:ss')
          }
          let borrowtime = formData.borrowingTime
          if (typeof borrowtime == 'string') {
          } else {
            borrowtime = borrowtime == null || '' ? '' : borrowtime.format('YYYY-MM-DD HH:mm:ss')
          }

          formData.returnTime = returntime
          formData.borrowingTime = borrowtime
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
    onChangeBorrowingTime(date, dateString) {},
    onChangeReturnTime(date, dateString) {},
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'borrowState',
          'borrowingTime',
          'createBy',
          'createTime',
          'enterpriseInfoId',
          'id',
          'ipadCode',
          'jobFairId',
          'returnTime',
          'updateBy',
          'updateTime'
        )
      )
    },
  },
  created() {
    this.getJobfairList()
  },
}
</script>