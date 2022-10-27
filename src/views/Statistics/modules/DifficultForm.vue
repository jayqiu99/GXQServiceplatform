<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['name', { rules: [{ required: true, message: '请输入姓名' }] }]"
                placeholder="请输入姓名"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="身份证号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['organizer', { rules: [{ required: true, message: '请输入身份证号码' }] }]"
                placeholder="请输入身份证号码"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group name="tenantStatus" v-decorator="[ 'status', {initialValue:1}]">
                <a-radio :value="1">男</a-radio>
                <a-radio :value="0">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
           <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="最高学历" :labelCol="{ span: 10}" :wrapperCol="{ span: 70, offset: 10 }">
              <a-select v-model="test" style='width:393%' placeholder="请选择最高学历">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">小学</a-select-option>
                <a-select-option value="2">初中</a-select-option>
                <a-select-option value="3">技工学校</a-select-option>
                <a-select-option value="4">普通高中</a-select-option>
                <a-select-option value="5">职业高中</a-select-option>
                <a-select-option value="6">中等专业学校</a-select-option>
                 <a-select-option value="7">大学专科</a-select-option>
                 <a-select-option value="8">大学本科</a-select-option>
                <a-select-option value="9">硕士研究生</a-select-option>
                <a-select-option value="10">博士研究生</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="24">
            <a-form-item label="失业天数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['name1', { rules: [{ required: true, message: '请输入失业天数' }] }]"
                placeholder="请输入失业天数"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="所属区县" :labelCol="{ span: 10}" :wrapperCol="{ span: 70, offset: 10 }">
              <a-select v-model="test" style='width:393%' placeholder="请选择所属区县">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">端州区</a-select-option>
                <a-select-option value="2">鼎湖区</a-select-option>
                <a-select-option value="3">高要区</a-select-option>
                <a-select-option value="4">广宁县</a-select-option>
                <a-select-option value="5">怀集县</a-select-option>
                <a-select-option value="6">封开县</a-select-option>
                 <a-select-option value="7">德庆县</a-select-option>
                <a-select-option value="5">四会市</a-select-option>
                <a-select-option value="6">肇庆高新区</a-select-option>
                 <a-select-option value="7">肇庆新区</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
           <a-col :md="7" :sm="8" :push="2" style="margin:10% 0 0 -29% ;">
            <a-form-item  label="家庭情况" :labelCol="{ span: 10}" :wrapperCol="{ span: 70, offset: 10 }">
              <a-select v-model="test" style='width:393%' placeholder="请选择家庭情况">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="1">残缺家庭</a-select-option>
                <a-select-option value="2">单身家庭</a-select-option>
                <a-select-option value="3">贫困家庭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="text-align: center">
            <!-- <div class="drawer-bootom-button" v-show="!disableSubmit">
              <a-button @click="submitForm" type="primary">提 交</a-button>
            </div>-->
            <div class="drawer-bootom-button" v-show="!disableSubmit">
              <a-button style="margin-right: 0.8rem" @click="handleCancel">关闭</a-button>
              <a-button @click="submitForm" type="primary" :loading="confirmLoading">保存</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import pick from 'lodash.pick'
// import { addbooth } from '@/api/api'
import { validateDuplicateValue } from '@/utils/util'
import JFormContainer from '@/components/jeecg/JFormContainer'
import JDate from '@/components/jeecg/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import store from '@/store'

export default {
  name: 'TenantForm',
  components: {
    JFormContainer,
    JDate,
    JDictSelectTag,
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
      required: false,
    },
    normal: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      holdingtime: [],
      jbboothtime:[],
      holdingtimeStart:'',
      holdingtimeEnd:'',
      entrytimeStart: '',
      entrytimeEnd: '',
      form: this.$form.createForm(this),
      model: {},
      disableSubmit: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {},
      url: {
        // add: '/hall/jobfair/add',
        // edit: '/hall/jobfair/editById',
        // queryById: '/sys/tenant/queryById',
      },
    }
  },
  computed: {
    formDisabled() {
      if (this.normal === false) {
        if (this.formData.disabled === false) {
          return false
        } else {
          return true
        }
      }
      return this.disabled
    },
    showFlowSubmitButton() {
      if (this.normal === false) {
        if (this.formData.disabled === false) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  created() {
    this.showFlowData()
  },
  methods: {
    timeonChange(value, dateString) {
      console.log('Formatted Selected Time: ', dateString)
      this.entrytimeStart = dateString[0]
      this.entrytimeEnd = dateString[1]
      if(this.holdingtimeStart!=''&&this.holdingtimeStart<dateString[0]){
        this.holdingtime=''
        this.entrytimeStart=''
        this.$notification['warning']({
        message: '报名时间不能晚于举办时间！',
        description:
          '请注意！招聘会的报名时间不能晚于招聘会的举办时间',
      });

      }
    },
    jbboothonChange(value, jbdateString){
      console.log('举办时间: ', jbdateString)
      this.holdingtimeStart = jbdateString[0]
      this.holdingtimeEnd = jbdateString[1]
      if(this.entrytimeStart==''||jbdateString[0]<this.entrytimeStart){
        this.holdingtime=''
        this.entrytimeStart=''
        this.$notification['warning']({
        message: '报名时间不能晚于举办时间！',
        description:
          '请注意！招聘会的报名时间不能晚于招聘会的举办时间',
      });
      }
      // console.log("报名1",this.entrytimeStart);
      // console.log("报名2",this.entrytimeEnd);
    },
    add() {
      this.edit({})
    },
    handleCancel() {
      this.$emit('eChange')
    },
    edit(record) {
      console.log('修改对象', record)
      let entrytime = record.entrytimeStart
          entrytime = entrytime.substr(0, 16)
          console.log('截取时间', entrytime)
      this.holdingtime[0]=entrytime
      this.holdingtime[1]=record.entrytimeEnd

      let holdingtimest = record.holdingtimeStart
          holdingtimest = holdingtimest.substr(0, 16)
      this.jbboothtime[0]=holdingtimest
      this.jbboothtime[1]=record.holdingtimeEnd
      // console.log("修改对象2",this.holdingtime);
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'id',
            'name',
            'organizer',
            'theme',
            'entrytimeStart',
            'entrytimeEnd',
            'holdingtimeStart',
            'holdingtimeEnd',
            'createBy',
            'createTime',
            'updateBy',
            'updateTime',
            'address'
          )
        )
      })
    },
    showFlowData() {
      if (this.normal === false) {
        let params = { id: this.formData.dataId }
        getAction(this.url.queryById, params).then((res) => {
          if (res.success) {
            this.edit(res.result)
          }
        })
      }
    },
    submitForm() {
      const that = this
      console.log("进入添加");
      // 触发表单验证
      this.form.validateFields((err, values) => {
        console.log("进入添加111");
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
          formData.entrytimeStart = this.entrytimeStart
          formData.entrytimeEnd = this.entrytimeEnd

          formData.holdingtimeStart = this.holdingtimeStart
          formData.holdingtimeEnd = this.holdingtimeEnd
          console.log('表单提交数据', formData)
          if (formData.enable == '已启用') {
            formData.enable = 1
          } else {
            formData.enable = -1
          }

          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                console.log("进入添加2",httpurl);
                console.log("进入添加3",formData);
                // console.log("返回展位id",res.result);
                let jobid = res.result
                if (httpurl != '/hall/jobfair/editById') {
                  for (var i = 1; i <= 56; ++i) {
                    let bnumber = 'Z00'
                    if (i >= 10) {
                      bnumber = 'Z0'
                    }
                    let boothformData = {}
                    boothformData.boothInsidenumber = i
                    boothformData.boothNumber = bnumber + i
                    boothformData.createBy = store.getters.userInfo.username
                    boothformData.createTime = this.getNowFormatDate()
                    boothformData.jobFairId = jobid
                    boothformData.validStartdate = this.holdingtimeStart
                    boothformData.validEnddate = this.holdingtimeEnd
                    let obj
                    console.log('新增展位', boothformData)
                    obj = addbooth(boothformData)
                    obj.then((res) => {
                      if (res.success) {
                      } else {
                        that.$message.warning(res.message)
                      }
                    })
                  }
                }

                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
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
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'id',
          'name',
          'organizer',
          'theme',
          'entrytimeStart',
          'entrytimeEnd',
          'holdingtimeStart',
          'holdingtimeEnd',
          'createBy',
          'createTime',
          'updateBy',
          'updateTime',
          'address'
        )
      )
    },
  },
}
</script>
<style scoped>
.avatar-uploader > .ant-upload {
  width: 104px;
  height: 104px;
}
.ant-upload-select-picture-card i {
  font-size: 49px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-table-tbody .ant-table-row td {
  padding-top: 10px;
  padding-bottom: 10px;
}
.drawer-bootom-button {
  position: absolute;
  bottom: -200px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>