<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: 100%; overflow: auto; padding-bottom: 53px"
  >
    <template slot="title">
      <div style="width: 100%">
        <span>{{ title }}</span>
        <span style="display: inline-block; width: calc(100% - 51px); padding-right: 10px; text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height: 20px; width: 20px; border: 0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['enterpriseName', validatorRules.enterpriseName]"
                placeholder="输入企业名称"
                option-filter-prop="children"
                :options="listforlebel"
                :filter-option="filterOptiont"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
              <!-- <a-input
            v-decorator.trim="['enterpriseName', validatorRules.enterpriseName]"
            placeholder="请输入企业名称"
          ></a-input>-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="岗位名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input :disabled="isAble" v-decorator.trim="['postName']" placeholder="请输入岗位名称"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="职位描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea :disabled="isAble" placeholder="请输入职位描述" v-decorator.trim="['jobDescription']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="9">
            <a-form-item label="岗位类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                :disabled="isAble"
                show-search
                v-decorator.trim="['jobType']"
                option-filter-prop="children"
                @change="jobTypehandleChange"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in natureoption" :key="d.id" :value="d.id">{{ d.dataName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="工作经验" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['workExperience']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="无经验">无经验</a-select-option>
                <a-select-option value="一年以上">一年以上</a-select-option>
                <a-select-option value="1-3年">1-3年</a-select-option>
                <a-select-option value="3-5年">3-5年</a-select-option>
                <a-select-option value="5-10年">5-10年</a-select-option>
                <a-select-option value="10年以上">10年以上</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="9">
            <a-form-item label="学历要求" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                :disabled="isAble"
                show-search
                v-decorator.trim="['educationRequirements']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in educationRequirementsoption" :key="d.id" :value="d.dataName">
                  {{ d.dataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="薪资待遇" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                :disabled="isAble"
                show-search
                v-decorator.trim="['salary']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in salaryoption" :key="d.id" :value="d.dataName">
                  {{ d.dataName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="9">
            <a-form-item label="招聘人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input placeholder="请输入需求人数" :disabled="isAble" v-decorator.trim="['recruitment']" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="工作性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['jobNature']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="全职">全职</a-select-option>
                <a-select-option value="兼职">兼职</a-select-option>
                <a-select-option value="实习">实习</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="9">
            <a-form-item label="年龄要求" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['ageRequirement']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in ageoption" :key="d.id" :value="d.dataName">{{
                  d.dataName
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="工作区域" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['area']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in areaoption" :key="d.id" :value="d.dataName">{{
                  d.dataName
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="9">
            <a-form-item label="工作详址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input :disabled="isAble" v-decorator.trim="['jobAddress']" placeholder="请输入工作详址"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="性别要求" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                show-search
                :disabled="isAble"
                v-decorator.trim="['genderRequirement']"
                option-filter-prop="children"
                :filter-option="filterOption"
              >
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="0">不限</a-select-option>
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="特色服务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-checkbox-group :disabled="isAble" @change="groupChange" v-model="trya" :options="tttoptions" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="自定义特色服务" v-if="istrue" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <el-select
                style="width: 100%"
                v-model="tsfwvalue"
                :disabled="isAble"
                @remove-tag="removetagchange"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder=""
              >
                <el-option v-for="item in tsfwoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="23" :pull="3">
            <a-form-item label="审核不通过原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-model="errradio" @change="errradioonChange" name="radioGroup" :default-value="1">
                <a-radio :value="1">
                  审核通过
                </a-radio>
                <a-radio :value="2">
                  审核不通过
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        
        <a-row :gutter="12" v-if="iserrorr">
          <a-col :span="23" :pull="3">
            <a-form-item label="审核不通过原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea  placeholder="请输入审核不通过原因" v-decorator.trim="['errorreason', validatorRules.errorreason]" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-form-item label="批次号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input :disabled="isAble" placeholder="请输入批次号" v-decorator.trim="['batch']" />
        </a-form-item>
        <a-form-item label="错误信息" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input :disabled="isAble" placeholder="请输入错误信息" v-decorator.trim="['errorReason']" />
        </a-form-item> -->
      </a-form>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        
      </a-popconfirm>-->
      <a-button style="margin-right: 0.8rem" @click="handleCancel">关闭</a-button>
      <a-button v-if="!iserrorr" style="margin-right: 0.8rem" @click="handleSubmit" type="primary" :loading="confirmLoading">确定审核通过</a-button>
      <a-button v-if="iserrorr"  @click="errorreasonhandleSubmit" type="primary" :loading="confirmLoading">审核不通过</a-button>
    </div>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
import Vue from 'vue'
// 引入搜索部门弹出框的组件
import JSelectPosition from '@/components/jeecgbiz/JSelectPosition'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { getAction } from '@/api/manage'
import { addUser, editenterprise, queryUserRole, queryall, addenterprise, addPostapprovedList } from '@/api/api'
import { disabledAuthFilter } from '@/utils/authFilter'
import { duplicateCheck } from '@/api/api'
import JImageUpload from '../../../components/jeecg/JImageUpload'
import UImageUpload from '../../../components/jeecg/upimagestwo'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  name: 'UserModal',
  components: {
    JImageUpload,
    JSelectPosition,
    UImageUpload,
  },
  data() {
    return {
      trya: [],
      iserrorr:false,
      errradio:1,
      istrue: false,
      tsfwoptions: [],
      tsfwvalue: [],
      tttoptions: [
        { label: '五险', value: '五险' },
        { label: '五险一金', value: '五险一金' },
        { label: '补充医疗保险', value: '补充医疗保险' },
        { label: '员工旅游', value: '员工旅游' },
        { label: '交通补贴', value: '交通补贴' },
        { label: '餐饮补贴', value: '餐饮补贴' },
        { label: '出国机会', value: '出国机会' },
        { label: '年终奖金', value: '年终奖金' },
        { label: '定期体检', value: '定期体检' },
        { label: '节日福利', value: '节日福利' },
        { label: '双休', value: '双休' },
        { label: '年假', value: '年假' },
        { label: '加班补贴', value: '加班补贴' },
        { label: '职位晋升', value: '职位晋升' },
        { label: '包食宿', value: '包食宿' },
        { label: '单休', value: '单休' },
        { label: '其它', value: '其它' },
      ],
      Boptions: [
        '五险',
        '五险一金',
        '补充医疗保险',
        '员工旅游',
        '交通补贴',
        '餐饮补贴',
        '出国机会',
        '年终奖金',
        '定期体检',
        '节日福利',
        '双休',
        '年假',
        '加班补贴',
        '职位晋升',
        '包食宿',
        '单休',
        '其它',
      ],
      jobfairdata: [],
      jobid: 0,
      isAble: true,
      qyName: '',
      qyId: 0,
      jobtypename: '',
      isjob: 0,
      isqy: 0,
      listforlebel: [], //区域
      ageoption: [], //年龄
      educationRequirementsoption: [], //学历
      salaryoption: [], //薪资
      checkedpictures: '',
      checkedvideo: '',
      ckisuploadpictures: '',
      ckisuploadvideo: '',
      tradeobj: '',
      imgstrurl: '',
      updataimgstrurl: '',
      childrenit: [],
      industryoption: [], //行业
      scaleoption: [], //规模
      previewVisible: false,
      previewImage: '',
      fileList: {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: '',
        thumbUrl: '',
      },
      areaoption: [], //区域
      natureoption: [], //企业性质下拉
      departDisabled: false, //是否是我的部门调用该页面
      roleDisabled: false, //是否是角色维护调用该页面
      modalWidth: 800,
      drawerWidth: '90%',
      modaltoggleFlag: true,
      confirmDirty: false,
      selectedDepartKeys: [], //保存用户选择部门id
      checkedDepartKeys: [],
      checkedDepartNames: [], // 保存部门的名称 =>title
      checkedDepartNameString: '', // 保存部门的名称 =>title
      resultDepartOptions: [],
      userId: '', //保存用户id
      disableSubmit: false,
      userDepartModel: { userId: '', departIdList: [] }, // 保存SysUserDepart的用户部门中间表数据需要的对象
      dateFormat: 'YYYY-MM-DD',
      validatorRules: {
        username: {
          rules: [
            {
              required: true,
              message: '请输入!',
            },
            {
              validator: this.validateUsername,
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
              message: '密码由8位数字、大小写字母和特殊符号组成!',
            },
            {
              validator: this.validateToNextPassword,
            },
          ],
        },
        confirmpassword: {
          rules: [
            {
              required: true,
              message: '请重新输入登陆密码!',
            },
            {
              validator: this.compareToFirstPassword,
            },
          ],
        },
        errorreason: { rules: [{ required: true, message: '审核不通过原因不能为空!' }] },
        enterpriseName: { rules: [{ required: true, message: '请选择企业名称!' }] },
        // jobFairId: { rules: [{ required: true, message: '请选择招聘会!' }] },
        phone: { rules: [{ validator: this.validatePhone }] },
        email: {
          rules: [
            {
              validator: this.validateEmail,
            },
          ],
        },
        roles: {},
        //  sex:{initialValue:((!this.model.sex)?"": (this.model.sex+""))}
        trade: {
          rules: [{ required: true, message: '请输入所属行业' }],
        },
        telephone: {
          rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }],
        },
      },
      departIdShow: false,
      departIds: [], //负责部门id
      title: '审核',
      visible: false,
      model: {},
      roleList: [],
      selectedRole: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      cascaderit: '',
      uploadLoading: false,
      confirmLoading: false,
      headers: {},
      form: this.$form.createForm(this),
      picUrl: '',
      exaupdata: [],
      url: {
        add: '/zqhr/hall/enterprise/add',
        fileUpload: '/base/upload',
        userWithDepart: '/sys/user/userDepartList', // 引入为指定用户查看部门信息需要的url
        userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
        syncUserByUserName: '/process/extActProcess/doSyncUserByUserName', //同步用户到工作流
        queryTenantList: '/sys/tenant/queryList',
        industrylist: '/base/list?type=industrytype',
        industrychildren: '/base/list?type=industryname',
        scalelist: '/base/list?type=scale',
        arealist: '/base/list?type=area',
        naturelist: '/base/list?type=nature',
        salarylist: '/base/list?type=salaryrange&pageNo=1&pageSize=100',
        educationRequirementslist: '/base/list?type=education&pageNo=1&pageSize=100',
        agelist: '/base/list?type=Age&pageNo=1&pageSize=100',
        listforlebellist: '/hall/enterprise/listforlebel',
        jobfairdata: '/hall/jobfair/list?isexisting=1',
      },
      identity: '1',
      // fileList: [],
      businessList: {},
      tenantList: [],
      currentTenant: [],
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    this.headers = { 'X-Access-Token': token }
    this.initTenantList()
  },
  computed: {
    uploadAction: function () {
      console.log('上传图片')
      // return this.url.fileUpload
    },
  },
  mounted() {
    this.getnatureList()
    this.getareaList()
    this.getscaleList()
  },
  methods: {
    errradioonChange(e){
      console.log('是否通过', e.target.value);
      if(e.target.value==1){
        this.iserrorr=false;
      }else if(e.target.value==2){
        this.iserrorr=true;
      }
    },
    removetagchange(v, p) {
      console.log('移除1', v)
      console.log('移除2', p)
    },
    groupChange(value) {
      console.log('多选特色服务', value)
      for (var i = 0; i < value.length; ++i) {
        if (value[i] == '其它') {
          console.log('选中其他了', value[i])
          this.istrue = true
          return
        } else {
          this.istrue = false
        }
      }
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        that.jobfairdata = res.result.records
        console.log('招聘会名称', that.jobfairdata)
        // that.queryParam.jobfairId = res.result.records[0].id
        // that.getEntryenterpriseList(that.queryParam.jobfairId)
      })
    },
    getlistforlebel() {
      let that = this
      getAction(that.url.listforlebellist).then((res) => {
        // console.log("企业名称",res.result);
        that.listforlebel = res.result
      })
    },
    //岗位类型
    jobTypehandleChange(value, res) {
      // console.log("岗位类型",res.componentOptions.children[0].text);
      this.jobtypename = res.componentOptions.children[0].text
      this.isjob = 1
      // console.log(`selected ${value}`);
    },
    //企业名称下拉
    handleChange(value, res) {
      // console.log("企业名称",res.componentOptions.children[0].text);
      this.qyId = value
      this.qyName = res.componentOptions.children[0].text
      // console.log(`selected ${value}`);
      this.isqy = 1
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    filterOptiont(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    //年龄下拉
    getageList() {
      let that = this
      getAction(that.url.agelist).then((res) => {
        // console.log("薪资下拉",res);
        that.ageoption = res.result.records
      })
    },
    //学历下拉
    geteducationList() {
      let that = this
      getAction(that.url.educationRequirementslist).then((res) => {
        // console.log("薪资下拉",res);
        that.educationRequirementsoption = res.result.records
      })
    },
    //薪资下拉
    getsalaryList() {
      let that = this
      getAction(that.url.salarylist).then((res) => {
        console.log('薪资下拉', res)
        that.salaryoption = res.result.records
      })
    },

    //行业下拉
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    //企业性质
    getnatureList() {
      let that = this
      getAction(that.url.naturelist).then((res) => {
        that.natureoption = res.result.records
        // that.loadData()
      })
    },
    //区域下拉框
    getareaList() {
      let that = this
      getAction(that.url.arealist).then((res) => {
        that.areaoption = res.result.records
        // that.loadData()
      })
    },
    //规模下拉框
    getscaleList() {
      let that = this
      getAction(that.url.scalelist).then((res) => {
        that.scaleoption = res.result.records
        // that.loadData()
      })
    },
    imghandleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },

    isDisabledAuth(code) {
      return disabledAuthFilter(code)
    },
    initTenantList() {
      getAction(this.url.queryTenantList).then((res) => {
        if (res.success) {
          this.tenantList = res.result
        }
      })
    },
    //窗口最大化切换
    toggleScreen() {
      if (this.modaltoggleFlag) {
        this.modalWidth = window.innerWidth
      } else {
        this.modalWidth = 800
      }
      this.modaltoggleFlag = !this.modaltoggleFlag
    },
    initialRoleList() {
      queryall().then((res) => {
        if (res.success) {
          this.roleList = res.result
        } else {
          console.log(res.message)
        }
      })
    },
    loadUserRoles(userid) {
      queryUserRole({ userid: userid }).then((res) => {
        if (res.success) {
          this.selectedRole = res.result
        } else {
          console.log(res.message)
        }
      })
    },
    refresh() {
      this.selectedDepartKeys = []
      this.checkedDepartKeys = []
      this.checkedDepartNames = []
      this.checkedDepartNameString = ''
      this.userId = ''
      this.resultDepartOptions = []
      this.departId = []
      this.departIdShow = false
      this.currentTenant = []
    },
    add() {
      this.picUrl = ''
      this.refresh()
      this.edit({ activitiSync: '1' })
    },
    edit(record) {
      this.iserrorr=false;
      this.errradio=1;
      console.log('修改对象：', record)
      this.jobid = record.id
      this.exaupdata = record
      this.getsalaryList()
      this.geteducationList()
      this.getageList()
      this.getareaList()
      this.getlistforlebel()
      this.getJobfairList()
      this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      this.tsfwvalue = []
      this.trya = []
      let that = this

      that.initialRoleList()
      // that.checkedDepartNameString = ''
      that.form.resetFields() // 调用此方法,新增清除修改框中数据
      var str = record.special
      if (str != null) {
        var arrayList = str.split(',')
        this.trya = arrayList
      }
      that.userId = record.id
      that.visible = true
      that.model = Object.assign({}, record)
      that.$nextTick(() => {
        that.form.setFieldsValue(
          pick(
            this.model,
            'enterpriseName',
            'enterpriseInfoId',
            'jobFairId',
            'postName',
            'area',
            'jobAddress',
            'errorReason',
            'jobTypeId',
            'jobType',
            'educationRequirements',
            'workExperience',
            'jobNature',
            'ageRequirement',
            'genderRequirement',
            'salary',
            'recruitment',
            'batch',
            'jobDescription',
            'errorreason'
          )
        )
      })
      // this.model.trade = this.childrenit
      console.log('数据最后验证', this.model)
      //身份为上级显示负责部门，否则不显示
      if (this.model.userIdentity == '2') {
        this.identity = '2'
        this.departIdShow = true
      } else {
        this.identity = '1'
        this.departIdShow = false
      }
      // 调用查询用户对应的部门信息的方法
      that.checkedDepartKeys = []
      that.loadCheckedDeparts()

      //update-begin-author:taoyan date:2020710 for:多租户配置
      if (!record.relTenantIds || record.relTenantIds.length == 0) {
        this.currentTenant = []
      } else {
        this.currentTenant = record.relTenantIds.split(',').map(Number)
      }
      //update-end-author:taoyan date:2020710 for:多租户配置
    },
    //
    loadCheckedDeparts() {
      let that = this
      if (!that.userId) {
        return
      }
      getAction(that.url.userWithDepart, { userId: that.userId }).then((res) => {
        that.checkedDepartNames = []
        if (res.success) {
          var depart = []
          var departId = []
          for (let i = 0; i < res.result.length; i++) {
            that.checkedDepartNames.push(res.result[i].title)
            this.checkedDepartNameString = this.checkedDepartNames.join(',')
            that.checkedDepartKeys.push(res.result[i].key)
            //新增负责部门选择下拉框
            depart.push({
              key: res.result[i].key,
              title: res.result[i].title,
            })
            departId.push(res.result[i].key)
          }
          that.resultDepartOptions = depart
          //判断部门id是否存在，不存在择直接默认当前所在部门
          if (this.model.departIds) {
            this.departIds = this.model.departIds.split(',')
          } else {
            this.departIds = departId
          }
          that.userDepartModel.departIdList = that.checkedDepartKeys
        } else {
          console.log(res.message)
        }
      })
    },
    picturesonChange(e) {
      console.log('checked ', e)
      console.log(`checked = ${e.target.checked}`)
      if (e.target.checked == true) {
        this.ckisuploadpictures = 1
      } else {
        this.ckisuploadpictures = -1
      }
    },
    videoonChange(e) {
      console.log('checked2 ', e)
      console.log(`checked = ${e.target.checked}`)
      if (e.target.checked == true) {
        this.ckisuploadvideo = 1
      } else {
        this.ckisuploadvideo = -1
      }
    },
    close() {
      this.$emit('close')
      this.visible = false
      this.disableSubmit = false
      this.selectedRole = []
      this.userDepartModel = { userId: '', departIdList: [] }
      this.checkedDepartNames = []
      this.checkedDepartNameString = ''
      this.checkedDepartKeys = []
      this.selectedDepartKeys = []
      this.resultDepartOptions = []
      this.departIds = []
      this.departIdShow = false
      this.identity = '1'
      this.fileList = []
    },
    moment,
    errorreasonhandleSubmit(){
      const that = this
      // this.iserrorr=true;
      //let formData = Object.assign(this.model, values)
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("formData",formData)
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
          } else {
            //console.log('审核')
            // this.jobid
            // that.confirmLoading = true

            let formData = Object.assign(this.model, values)
            console.log('formData', formData)
            // formData.jobFairId=41;
            // if (formData.jobFairId == undefined || formData.jobFairId == null) {
            //   this.$message.warn('请选择招聘会')
            //   that.confirmLoading = false
            // } else {
            //console.log(123333);
            // formData.trade = this.tradeobj

            //update-begin-author:taoyan date:2020710 for:多租户配置
            formData.relTenantIds = this.currentTenant.length > 0 ? this.currentTenant.join(',') : ''
            //update-end-author:taoyan date:2020710 for:多租户配置
            formData.selectedroles = this.selectedRole.length > 0 ? this.selectedRole.join(',') : ''
            formData.selecteddeparts =
              this.userDepartModel.departIdList.length > 0 ? this.userDepartModel.departIdList.join(',') : ''
            formData.userIdentity = this.identity
            //如果是上级择传入departIds,否则为空
            if (this.identity === '2') {
              formData.departIds = this.departIds.join(',')
            } else {
              formData.departIds = ''
            }
            // this.tradeobj

            // console.log('待审核的编辑', formData)
            let obj

            formData.updateBy = store.getters.userInfo.username

            console.log('审核对象', formData)
            this.axios({
              method: 'get',
              url: '/hall/position/examineallPostReleaseTemporary',
              headers: {},
              params: {
                jobid: formData.id,
                examinestate: -1,
                UpdateBy: formData.updateBy,
                errorreason:formData.errorreason
              },
            })
              .then((response) => {
                if (response.code == 500) {
                  this.$message.warning(response.message)
                  that.$emit('ok')
                } else {
                  this.$message.success(response.message)
                  that.$emit('ok')
                }
              })
              .finally(() => {
                that.confirmLoading = false
                that.checkedDepartNames = []
                that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                that.close()
              })
              .catch(function (error) {
                this.$message.warning(response.message)

                console.log(error)
              })
            
          }
        }
      })
    },
    handleSubmit() {
      const that = this
      //let formData = Object.assign(this.model, values)
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log("formData",formData)
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
          } else {
            //console.log('审核')
            // this.jobid
            that.confirmLoading = true

            let formData = Object.assign(this.model, values)
            console.log('formData', formData)
            // formData.jobFairId=41;
            // if (formData.jobFairId == undefined || formData.jobFairId == null) {
            //   this.$message.warn('请选择招聘会')
            //   that.confirmLoading = false
            // } else {
            //console.log(123333);
            // formData.trade = this.tradeobj

            //update-begin-author:taoyan date:2020710 for:多租户配置
            formData.relTenantIds = this.currentTenant.length > 0 ? this.currentTenant.join(',') : ''
            //update-end-author:taoyan date:2020710 for:多租户配置
            formData.selectedroles = this.selectedRole.length > 0 ? this.selectedRole.join(',') : ''
            formData.selecteddeparts =
              this.userDepartModel.departIdList.length > 0 ? this.userDepartModel.departIdList.join(',') : ''
            formData.userIdentity = this.identity
            //如果是上级择传入departIds,否则为空
            if (this.identity === '2') {
              formData.departIds = this.departIds.join(',')
            } else {
              formData.departIds = ''
            }
            // this.tradeobj

            // console.log('待审核的编辑', formData)
            let obj

            formData.updateBy = store.getters.userInfo.username

            console.log('审核对象1111111', formData)
            this.axios({
              method: 'get',
              url: '/hall/position/examineallPostReleaseTemporary',
              headers: {},
              params: {
                jobid: formData.id,
                examinestate: 1,
                UpdateBy: formData.updateBy,
              },
            })
              .then((response) => {
                if (response.code == 500) {
                  this.$message.warning(response.message)
                  that.$emit('ok')
                } else if (response.code == 300) {
                  // console.log("");
                  this.$confirm({
                    title: '该岗位已存在',
                    content: `岗位已存在 是否替换该岗位`,
                    centered: true,
                    onOk: () => {
                      //待审核执行

                      // console.log('待审核跳转', this.enObj)
                      this.axios({
                        method: 'get',
                        url: '/hall/position/examineallPostReleaseTemporaryReplace',
                        headers: {},
                        params: {
                          jobid: formData.id,
                          jobFairId: formData.jobFairId,//等待改动--现在没有招聘会id可以获取
                          examinestate: 1,
                          UpdateBy: formData.updateBy,
                        },
                      })
                        .then((response) => {
                          if (response.code == 500) {
                            this.$message.warning(response.message)
                          } else {
                            this.$message.success(response.message)
                          }

                          that.close()
                          that.$emit('ok')
                          console.log(response)
                        })
                        .catch(function (error) {
                          this.$message.warning(response.message)

                          console.log(error)
                        })
                    },
                  })
                } else {
                  this.$message.success(response.message)
                  that.$emit('ok')
                }
              })
              .finally(() => {
                that.confirmLoading = false
                that.checkedDepartNames = []
                that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                that.close()
              })
              .catch(function (error) {
                this.$message.warning(response.message)

                console.log(error)
              })
            // }
          }
        }
      })
    },
    handleCancel() {
      this.close()
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      const confirmpassword = form.getFieldValue('confirmpassword')

      if (value && confirmpassword && value !== confirmpassword) {
        callback('两次输入的密码不一样！')
      }
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不一样！')
      } else {
        callback()
      }
    },
    validatePhone(rule, value, callback) {
      if (!value) {
        callback()
      } else {
        //update-begin--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------
        if (new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/).test(value)) {
          //update-end--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------

          var params = {
            tableName: 'sys_user',
            fieldName: 'phone',
            fieldVal: value,
            dataId: this.userId,
          }
          duplicateCheck(params).then((res) => {
            if (res.success) {
              callback()
            } else {
              callback('手机号已存在!')
            }
          })
        } else {
          callback('请输入正确格式的手机号码!')
        }
      }
    },
    validateEmail(rule, value, callback) {
      if (!value) {
        callback()
      } else {
        if (
          new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          var params = {
            tableName: 'sys_user',
            fieldName: 'email',
            fieldVal: value,
            dataId: this.userId,
          }
          duplicateCheck(params).then((res) => {
            console.log(res)
            if (res.success) {
              callback()
            } else {
              callback('邮箱已存在!')
            }
          })
        } else {
          callback('请输入正确格式的邮箱!')
        }
      }
    },
    validateUsername(rule, value, callback) {
      var params = {
        tableName: 'sys_user',
        fieldName: 'username',
        fieldVal: value,
        dataId: this.userId,
      }
      duplicateCheck(params).then((res) => {
        if (res.success) {
          callback()
        } else {
          callback('用户名已存在!')
        }
      })
    },
    validateWorkNo(rule, value, callback) {
      var params = {
        tableName: 'sys_user',
        fieldName: 'work_no',
        fieldVal: value,
        dataId: this.userId,
      }
      duplicateCheck(params).then((res) => {
        if (res.success) {
          callback()
        } else {
          callback('工号已存在!')
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },

    normFile(e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    beforeUpload: function (file) {
      var fileType = file.type
      if (fileType.indexOf('image') < 0) {
        this.$message.warning('请上传图片')
        return false
      }
      //TODO 验证文件大小
    },

    // 获取用户对应部门弹出框提交给返回的数据
    modalFormOk(formData) {
      this.checkedDepartNames = []
      this.selectedDepartKeys = []
      this.checkedDepartNameString = ''
      this.userId = formData.userId
      this.userDepartModel.userId = formData.userId
      this.departIds = []
      this.resultDepartOptions = []
      var depart = []
      for (let i = 0; i < formData.departIdList.length; i++) {
        this.selectedDepartKeys.push(formData.departIdList[i].key)
        this.checkedDepartNames.push(formData.departIdList[i].title)
        this.checkedDepartNameString = this.checkedDepartNames.join(',')
        //新增部门选择，如果上面部门选择后不为空直接付给负责部门
        depart.push({
          key: formData.departIdList[i].key,
          title: formData.departIdList[i].title,
        })
        this.departIds.push(formData.departIdList[i].key)
      }
      this.resultDepartOptions = depart
      this.userDepartModel.departIdList = this.selectedDepartKeys
      this.checkedDepartKeys = this.selectedDepartKeys //更新当前的选择keys
    },
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
        this.drawerWidth = '90%'
      }
    },
    identityChange(e) {
      if (e.target.value === '1') {
        this.departIdShow = false
      } else {
        this.departIdShow = true
      }
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
  bottom: -8px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>
        
        