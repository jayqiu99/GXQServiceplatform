<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="23" :pull="3">
            <a-form-item label="招聘会名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入招聘会名称' }] }]"
                placeholder="请输入招聘会名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="招聘会主题" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['theme', { rules: [{ required: true, message: '请输入招聘会主题' }] }]"
                placeholder="请输入招聘会主题"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="主办单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['organizer', { rules: [{ required: true, message: '请输入主办单位' }] }]"
                placeholder="请输入主办单位"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="协办单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['coorganizer', { rules: [{ required: true, message: '请输入协办单位' }] }]"
                placeholder="请输入协办单位"></a-input>

            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="举办规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['holdingscale', { rules: [{ required: true, message: '请输入举办规模' }] }]"
                placeholder="请输入举办规模"></a-input>

            </a-form-item>
          </a-col>

          <a-col :span="9">
            <a-form-item label="报名费用" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input prefix="￥" v-decorator="['entryFee', { rules: [{ required: true, message: '请输入报名费用' }] }]"
                placeholder="请输入报名费用" suffix="RMB" />
              <!-- <a-input
                v-decorator="['entryFee', { rules: [{ required: true, message: '请输入报名费用' }] }]"
                placeholder="请输入报名费用"
              ></a-input> -->

            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="展位数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input type='number' v-decorator="['boothAmount', { rules: [{ required: true, message: '请输入展位数量' }] }]"
                placeholder="请输入展位数量"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="费用明细" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea placeholder="请输入费用明细"
                v-decorator="['feeDetails', { rules: [{ required: true, message: '请输入费用明细' }] }]"
                :auto-size="{ minRows: 2, maxRows: 6 }" />
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="报名要求" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea placeholder="请输入报名要求"
                v-decorator="['requirement', { rules: [{ required: true, message: '请输入报名要求' }] }]"
                :auto-size="{ minRows: 2, maxRows: 6 }" />


            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="报名时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker v-model="holdingtime" format="YYYY-MM-DD"
                style="width: 100%" :placeholder="['报名开始时间', '报名结束时间']" @change="timeonChange" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="23" :pull="3">
            <a-form-item label="报名开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择报名开始时间"
                v-decorator="['entrytimeStart', { rules: [{ required: true, message: '请选择报名开始时间' }] }]"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="报名结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择报名结束时间"
                v-decorator="['entrytimeEnd', { rules: [{ required: true, message: '请选择报名结束时间' }] }]"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="9">
            <a-form-item label="举办时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-range-picker v-model="jbboothtime"  :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm"
                style="width: 100%" :placeholder="['举办开始时间', '举办结束时间']" @change="jbboothonChange" />
            </a-form-item>
          </a-col>

          <!-- <a-col :span="23" :pull="3">
            <a-form-item label="举办开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择举办开始时间"
                v-decorator="['holdingtimeStart', { rules: [{ required: true, message: '请选择举办开始时间' }] }]"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="举办结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择举办结束时间"
                v-decorator="['holdingtimeEnd', { rules: [{ required: true, message: '请选择举办结束时间' }] }]"
                :trigger-change="true"
                :show-time="true"
                date-format="YYYY-MM-DD HH:mm:ss"
                style="width: 100%"
              />
            </a-form-item>
          </a-col> -->
          <a-col :span="23" :pull="3">
            <a-form-item label="招聘会地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['address', { rules: [{ required: true, message: '请输入招聘会地址' }] }]"
                placeholder="请输入招聘会地址"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="23" :pull="3">
            <a-form-item label="报名必选展位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['isselectionbooth', { rules: [{ required: true, message: '请选择是否必选' }] }]">
                <a-radio :value='1'>是</a-radio>
                <a-radio :value='0'>否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="23" :pull="3">
            <a-form-item label="启用状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group name="tenantStatus" v-decorator="[ 'status', {initialValue:1}]">
                <a-radio :value="1">启用</a-radio>
                <a-radio :value="0">冻结</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>-->
          <a-col :span="24" :pull="0" style="text-align: center">
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
  import { addbooth } from '@/api/api'
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
        default: () => { },
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
        jbboothtime: [],
        holdingtimeStart: '',
        holdingtimeEnd: '',
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
          add: '/hall/jobfair/add',
          edit: '/hall/jobfair/editById',
          queryById: '/sys/tenant/queryById',
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
        if (this.holdingtimeStart != '' && this.holdingtimeStart < dateString[0]) {
          this.holdingtime = ''
          this.entrytimeStart = ''
          this.$notification['warning']({
            message: '报名时间不能晚于举办时间！',
            description:
              '请注意！招聘会的报名时间不能晚于招聘会的举办时间',
          });

        }
      },
      jbboothonChange(value, jbdateString) {
        console.log('举办时间: ', jbdateString)
        this.holdingtimeStart = jbdateString[0]
        this.holdingtimeEnd = jbdateString[1]
        if (this.entrytimeStart == '' || jbdateString[0] < this.entrytimeStart) {
          this.holdingtime = ''
          this.entrytimeStart = ''
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
        // debugger
        if (record.entrytimeStart != null && record.entrytimeStart != "待定") {
          let entrytime = record.entrytimeStart
          entrytime = entrytime.substr(0, 10)
          console.log('截取时间', entrytime)
          this.entrytimeStart=entrytime
          this.entrytimeEnd=record.entrytimeEnd.substr(0, 10)
          this.holdingtime[0] = entrytime
          this.holdingtime[1] = record.entrytimeEnd.substr(0, 10)
        } else {
          this.holdingtime[0] = "";
          this.holdingtime[1] = "";
        }

        if (record.holdingtimeStart != null && record.holdingtimeStart != "待定") {

          let holdingtimest = record.holdingtimeStart
          holdingtimest = holdingtimest.substr(0, 16)
          this.jbboothtime[0] = holdingtimest
          this.jbboothtime[1] = record.holdingtimeEnd
          this.holdingtimeStart= holdingtimest
           this.holdingtimeEnd=record.holdingtimeEnd

        } else {
          this.jbboothtime[0] = "";
          this.jbboothtime[1] = "";
        }


        // console.log("修改对象2",this.holdingtime);
        this.form.resetFields()
        this.model = Object.assign({}, record)

        this.$nextTick(() => {
          this.form.setFieldsValue(
            pick(
              this.model,
              'id',
              'name',
              'organizer',
              'theme',
              'coorganizer',
              'boothAmount',
              'entryFee',
              'feeDetails',
              'holdingscale',
              'requirement',
              'entrytimeStart',
              'entrytimeEnd',
              'holdingtimeStart',
              'holdingtimeEnd',
              'createBy',
              'createTime',
              'updateBy',
              'updateTime',
              'address',
              'isselectionbooth'
            )
          )
        })

        this.visible = true
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
          // debugger
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
            // debugger
            values.createBy = (store.getters.userInfo.id || '').trim()
            let formData = Object.assign(this.model, values)
            var data=formData
            console.log('获取的表单数据', data)
            formData.entrytimeStart = this.entrytimeStart+' 00:00'
            formData.entrytimeEnd = this.entrytimeEnd+' 00:00'

            formData.holdingtimeStart = this.holdingtimeStart
            formData.holdingtimeEnd = this.holdingtimeEnd
            console.log('修改后的表单数据', formData)
            // if(formData.holdingtimeStart == "待定"){
            //   formData.holdingtimeStart=""
            // }
            // if(formData.holdingtimeEnd == "待定"){
            //   formData.holdingtimeEnd=""
            // }
            console.log('时间1', this.jbboothtime[0])
            console.log('时间2', this.holdingtime[0])
            if (this.jbboothtime[0] == undefined) {
              // debugger
              console.log("空时间");
              formData.holdingtimeStart = '';
              formData.holdingtimeEnd = '';
            }
            if (this.holdingtime[0] == undefined) {
              formData.entrytimeStart = '';
              formData.entrytimeEnd = '';
            }
           
            if (formData.enable == '已启用') {
              formData.enable = 1
            } else {
              formData.enable = -1
            }
            console.log('表单提交数据', formData)
            httpAction(httpurl, formData, method)
              .then((res) => {
                if (res.success) {

                  // console.log("进入添加2",httpurl);
                  // console.log("进入添加3",formData);
                  // console.log("返回展位id",res.result);
                  let jobid = res.result
                  if (httpurl != '/hall/jobfair/editById') {
                    for (var i = 1; i <= 33; ++i) {
                      let bnumber = '0'
                      if (i >= 10) {
                        bnumber = ''
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
            'coorganizer',
            'boothAmount',
            'entryFee',
            'feeDetails',
            'holdingscale',
            'requirement',
            'entrytimeStart',
            'entrytimeEnd',
            'holdingtimeStart',
            'holdingtimeEnd',
            'createBy',
            'createTime',
            'updateBy',
            'updateTime',
            'address',
            'isselectionbooth'
          )
        )
      },
    },
  }
</script>
<style scoped>
  .avatar-uploader>.ant-upload {
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