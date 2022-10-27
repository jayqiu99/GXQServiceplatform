<template>
  <a-modal
    :title="title"
    :width="800"
    :ok="false"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :okButtonProps="{ props: {disabled: disableSubmit} }"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="机构名称"
          :hidden="false"
          hasFeedback
        >
          <a-input v-if="isture" id="departName" placeholder="请输入机构/部门名称" v-decorator="['departName', validatorRules.departName ]"/>
          <a-select
            v-if="!isture"
            show-search
            v-decorator.trim="['enterpriseInfoId', validatorRules.enterpriseInfoId]"
            placeholder="输入企业名称"
            option-filter-prop="children"
            :options="listforlebel"
            :filter-option="filterOptiont"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :hidden="seen"
          label="上级部门"
          hasFeedback
        >
          <a-tree-select
            style="width:100%"
            :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
            :treeData="departTree"
            v-model="model.parentId"
            placeholder="请选择上级部门"
            :disabled="condition"
          ></a-tree-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构类型">
          <template v-if="seen">
            <a-radio-group
              v-decorator="['orgCategory',validatorRules.orgCategory]"
              placeholder="请选择机构类型"
            >
              <a-radio value="1">公司</a-radio>
            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group
              v-decorator="['orgCategory',validatorRules.orgCategory]"
              placeholder="请选择机构类型"
            >
              <a-radio value="2">部门</a-radio>
              <a-radio value="3">岗位</a-radio>
            </a-radio-group>
          </template>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="电话">
          <a-input placeholder="请输入电话" v-decorator="['mobile',validatorRules.mobile]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="传真">
          <a-input placeholder="请输入传真" v-decorator="['fax', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地址">
          <a-input placeholder="请输入地址" v-decorator="['address', {}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
          <a-input-number v-decorator="[ 'departOrder',{'initialValue':0}]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea placeholder="请输入备注" v-decorator="['memo', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import { queryIdTree } from '@/api/api'
import store from '@/store'
import pick from 'lodash.pick'
import ATextarea from 'ant-design-vue/es/input/TextArea'
export default {
  name: 'SysDepartModal',
  components: { ATextarea },
  data() {
    return {
      departTree: [],
      orgTypeData: [],
      isture:false,
      phoneWarning: '',
      departName: '',
      title: '操作',
      seen: false,
      visible: false,
      listforlebel: [], //企业
      condition: true,
      disableSubmit: false,
      model: {},
      menuhidden: false,
      menuusing: true,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        departName: { rules: [{ required: true, message: '请输入机构/部门名称!' }] },
        orgCode: { rules: [{ required: true, message: '请输入机构编码!' }] },
        mobile: { rules: [{ validator: this.validateMobile }] }
      },
      url: {
        add: '/sys/sysDepart/add',
        listforlebellist: '/hall/enterprise/listforlebel'
      },
      dictDisabled: true
    }
  },
  created() {},
  methods: {
    getlistforlebel() {
      let that = this
      getAction(that.url.listforlebellist).then(res => {
        // console.log("企业名称",res.result);
        that.listforlebel = res.result
      })
    },
    filterOptiont(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    handleChange(value, res) {
      console.log("企业名称",res.componentOptions.children[0].text);
      this.model.departName=res.componentOptions.children[0].text;
      console.log("企业名称12",this.model);
      // this.qyId = value
      // this.qyName = res.componentOptions.children[0].text
      // // console.log(`selected ${value}`);
      // this.isqy = 1
      //  console.log("企业名称",res.componentOptions.children[0].text);
      //  console.log("企业id",this.qyId);
    },
    loadTreeData() {
      var that = this
      queryIdTree().then(res => {
        if (res.success) {
          that.departTree = []
          for (let i = 0; i < res.result.length; i++) {
            let temp = res.result[i]
            that.departTree.push(temp)
          }
        }
      })
    },
    add(depart,addnum) {
      console.log("添加下级",addnum);
      if(addnum==2){
        this.isture=true;
      }else{
        this.isture=false;
      }
      if (depart) {
        this.seen = false
        this.dictDisabled = false
      } else {
        this.seen = true
        this.dictDisabled = true
      }
      this.edit(depart)
    },
    edit(record) {
      console.log("用户信息",store.getters.userInfo)
      this.getlistforlebel()
      this.form.resetFields()
      this.model = Object.assign({}, {})
      this.visible = true
      this.loadTreeData()
      this.model.parentId = record != null ? record.toString() : null
      if (this.seen) {
        this.model.orgCategory = '1'
      } else {
        this.model.orgCategory = '2'
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'orgCategory',
            'departName',
            'enterpriseInfoId',
            'departNameEn',
            'departNameAbbr',
            'departOrder',
            'description',
            'orgType',
            'orgCode',
            'mobile',
            'fax',
            'address',
            'memo',
            'status',
            'delFlag'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.disableSubmit = false
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let formData = Object.assign(this.model, values)
          //时间格式化
          console.log("新增对象",formData)
          httpAction(this.url.add, formData, 'post')
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadTreeData()
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
    handleCancel() {
      this.close()
    },
    validateMobile(rule, value, callback) {
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)) {
        callback()
      } else {
        callback('您的手机号码格式不正确!')
      }
    }
  }
}
</script>

<style scoped>
</style>