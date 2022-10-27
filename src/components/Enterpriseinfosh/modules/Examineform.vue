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
          <a-col :span="23" :pull="0">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input
            :disabled="distur"
            placeholder="请输入企业名称"
            v-decorator.trim="['enterpriseName', validatorRules.enterpriseName]"
          />-->
              <h3>
                <span style="color: #000">企业名称：</span>
                {{ enObj.enterpriseName }}
              </h3>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="23" :pull="0">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">企业简介：</span>
                {{ enObj.synopsis }}
              </h3>
              <!-- <a-textarea
            placeholder="请输入企业简介"
            :disabled="distur"
            v-decorator.trim="['synopsis']"
            :auto-size="{ minRows: 2, maxRows: 6 }"
          />-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">联系人：</span>
                {{ enObj.companyPrincipal }}
              </h3>
              <!-- <a-input placeholder="请输入负责人" :disabled="distur" v-decorator.trim="['companyPrincipal']" /> -->
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">联系电话：</span>
                {{ enObj.phone }}
              </h3>
              <!-- <a-input placeholder="请输入手机号码" :disabled="distur" v-decorator="['phone', validatorRules.phone]" /> -->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input :disabled="distur" placeholder="请输入企业信用代码" v-decorator.trim="['creditCode']" /> -->
              <h3>
                <span style="color: #000">企业信用代码：</span>
                {{ enObj.creditCode }}
              </h3>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">企业性质：</span>
                {{ enObj.nature }}
              </h3>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">所属行业：</span>
                {{ enObj.trade }}
              </h3>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">企业规模：</span>
                {{ enObj.scale }}
              </h3>
              <!-- <a-select
            show-search
            v-decorator.trim="['scale']"
            :disabled="distur"
            option-filter-prop="children"
            :filter-option="filterOption"
          >
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in scaleoption" :key="d.id" :value="d.dataName">{{ d.dataName }}</a-select-option>
          </a-select>-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">工作区域：</span>
                {{ enObj.area }}
              </h3>
              <!-- <a-select
            show-search
            v-decorator.trim="['area']"
            :disabled="distur"
            option-filter-prop="children"
            :filter-option="filterOption"
          >
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in areaoption" :key="d.id" :value="d.dataName">{{ d.dataName }}</a-select-option>
          </a-select>-->
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">所在地址：</span>
                {{ enObj.address }}
              </h3>
              <!-- <a-input placeholder="请输入所在地址" :disabled="distur" v-decorator.trim="['address']" /> -->
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="12">
          <a-col :span="23" :pull="0">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h3>
                <span style="color: #000">邮箱：</span>
                {{ enObj.email }}
              </h3>
              <!-- <a-input placeholder="请输入邮箱" :disabled="distur" v-decorator.trim="['email']" /> -->
            </a-form-item>
          </a-col>
        </a-row>

        <!-- <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h3>
            <span style="color: #000">负责人身份证：</span>
            {{ enObj.idcard }}
          </h3>
          
        </a-form-item> -->

        <!-- <a-form-item
          label="角色分配"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-show="!roleDisabled"
        >
          <a-select
            mode="multiple"
            style="width: 100%"
            placeholder="请选择用户角色"
            optionFilterProp="children"
            v-model="selectedRole"
            :getPopupContainer="(target) => target.parentNode"
          >
            <a-select-option
              v-for="(role,roleindex) in roleList"
              :key="roleindex.toString()"
              :value="role.id"
            >{{ role.roleName }}</a-select-option>
          </a-select>
        </a-form-item>-->

        <!-- update--end--autor:wangshuai-----date:20200108------for：新增身份和负责部门------ -->
        <a-row :gutter="12">
          <a-col :span="6"
            ><a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-row style="width: 100%" :gutter="[0, 32]">
                <a-col :span="24 / 2">
                  <h3>
                    <span style="color: #000">企业LOGO：</span>
                  </h3>
                </a-col>
                <a-col :span="24 / 2" :pull="5">
                  <j-image-upload
                    class="avatar-uploader"
                    @eChange="eChange"
                    text="上传"
                    :disabled="distur"
                    v-model="fileList.url"
                  ></j-image-upload>
                  <a-modal :visible="previewVisible" :footer="null" @cancel="imghandleCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h5 style="margin-left: 0">注：图片格式为png，不能超过1M</h5>
            </a-form-item>
            <div style="margin-top: -50%; margin-right:10%; float: right">
              <a-button type="primary" shape="circle" icon="search" @click="handlePreview(fileList)" />
            </div>
          </a-col>
          <a-col :span="6"
            ><a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-row style="width: 100%" :gutter="[0, 32]">
                <a-col :span="24 / 2">
                  <h3>
                    <span style="color: #000">营业执照：</span>
                  </h3>
                </a-col>
                <a-col :span="24 / 2" :pull="5">
                  <u-image-upload
                    class="avatar-uploader"
                    text="上传"
                    :disabled="distur"
                    @eChange="eimgChange"
                    v-model="businessList.url"
                  ></u-image-upload>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h5 style="margin-left: 0">注：图片格式为png，不能超过1M</h5>
            </a-form-item>
            <div style="margin-top: -50%; margin-right:10%; float: right">
              <a-button type="primary" shape="circle" icon="search" @click="handlePreview(businessList)" /></div
          ></a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-row style="width: 100%" :gutter="[0, 32]">
                <a-col :span="24 / 2">
                  <h3>
                    <span style="color: #000">委托书：</span>
                  </h3>
                </a-col>
                <a-col :span="24 / 2" :pull="5">
                  <u-image-upload
                    class="avatar-uploader"
                    text="上传"
                    :disabled="distur"
                    @eChange="eimgChange"
                    v-model="wtsimg"
                  ></u-image-upload>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h5 style="margin-left: 0">注：图片格式为png，不能超过1M</h5>
            </a-form-item>
            <div style="margin-top: -50%; margin-right:10%; float: right">
              <a-button type="primary" shape="circle" icon="search" @click="handlePreview(wtsimglist)" /></div
          ></a-col>
          <a-col :span="6">
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-row style="width: 100%" :gutter="[0, 32]">
                <a-col :span="24 / 2">
                  <h3>
                    <span style="color: #000">用工备案表：</span>
                  </h3>
                </a-col>
                <a-col :span="24 / 2" :pull="5">
                  <u-image-upload
                    class="avatar-uploader"
                    text="上传"
                    :disabled="distur"
                    @eChange="eimgChange"
                    v-model="babimg"
                  ></u-image-upload>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
              <h5 style="margin-left: 0">注：图片格式为png，不能超过1M</h5>
            </a-form-item>
            <div style="margin-top: -50%; margin-right:10%; float: right">
              <a-button type="primary" shape="circle" icon="search" @click="handlePreview(babimglist)" /></div
          ></a-col>
        </a-row>

        <!-- <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h3>
            <span style="color: #000">上传多媒体：</span>
            <a-checkbox v-model="checkedpictures" @change="picturesonChange">允许上传图片</a-checkbox>
            <a-checkbox v-model="checkedvideo" @change="videoonChange">允许上传视频</a-checkbox>
          </h3>

          <a-checkbox-group @change="onChange" style="padding-top:2%">
            <a-row>
              <a-col :span="12">
                <a-checkbox v-decorator="['isuploadpictures']">允许上传图片</a-checkbox>
              </a-col>
              <a-col :span="12">
                <a-checkbox v-decorator="['isuploadvideo']">允许上传视频</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item> -->
      </a-form>
    </a-spin>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <!-- <a-button style="margin-right: 0.8rem" @click="touplist()">上一页</a-button> -->
      
      <a-button style="margin-right: .8rem" @click="handleCancel">关闭</a-button>
      <a-button @click="handleEdit()" type="primary">确认信息并下一页</a-button>
      <!-- </a-popconfirm> -->
    </div>
    <determine ref="determineinfo" @ok="modalFormOk"></determine>
    <ent-multimdedia ref="entmulitFormOk" @ok="modalFormOk"></ent-multimdedia>
    <!-- <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-button style="margin-right: 0.8rem" @click="handleCancel">关闭</a-button>
      <a-button style="margin-right: 0.8rem" @click="handleSubmit" type="primary" :loading="confirmLoading"
        >审核通过
      </a-button>
      <a-button @click="noexamineclick" type="primary" :loading="confirmLoading">审核不通过</a-button>
    </div> -->
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
import { addUser, editenterprise, queryUserRole, queryall, editexamine } from '@/api/api'
import { disabledAuthFilter } from '@/utils/authFilter'
import { duplicateCheck } from '@/api/api'
import JImageUpload from '../../../components/jeecg/JImageUpload'
import UImageUpload from '../../../components/jeecg/upimagestwo'
import Determine from './Determine'
import EntMultimdedia from './ExamineMultimdedia.vue'

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
    Determine,
    EntMultimdedia
  },
  data() {
    return {
      enObj: {},
      distur: true,
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
      wtsimglist: {},
      babimglist: {},
      areaoption: [], //区域
      departDisabled: false, //是否是我的部门调用该页面
      roleDisabled: false, //是否是角色维护调用该页面
      modalWidth: 800,
      drawerWidth: 600,
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
        enterpriseName: { rules: [{ required: true, message: '请输入用户名称!' }] },
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
      examineparams: {
        id: '',
        examinestate: '',
      },
      examineId: '',
      roleList: [],
      selectedRole: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 23 },
      },
      cascaderit: '',
      uploadLoading: false,
      confirmLoading: false,
      headers: {},
      form: this.$form.createForm(this),
      picUrl: '',
      url: {
        fileUpload: '/base/upload',
        userWithDepart: '/sys/user/userDepartList', // 引入为指定用户查看部门信息需要的url
        userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
        syncUserByUserName: '/process/extActProcess/doSyncUserByUserName', //同步用户到工作流
        queryTenantList: '/sys/tenant/queryList',
        industrylist: '/base/list?type=industrytype',
        industrychildren: '/base/list?type=industryname',
        scalelist: '/base/list?type=scale',
        arealist: '/base/list?type=area',
      },
      identity: '1',
      // fileList: [],
      businessList: {},
      wtsimg: '',
      babimg: '',
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
    this.getareaList()
    this.getindustryList()
    this.getscaleList()
  },
  methods: {
    babimgChange(logimageurl) {
      console.log('文件上传2', logimageurl)
      setTimeout(() => {
        this.babimglist = {}
        var httpurla = 'http://123.57.236.82:8080/zqhr'
        this.babimglist.url = httpurla + logimageurl
        this.babimgurl = logimageurl
        console.log('图2', this.babimglist)
      }, 5)
    },
    wtsimgChange(logimageurl) {
      console.log('文件上传2', logimageurl)
      setTimeout(() => {
        this.wtsimglist = {}
        var httpurla = 'http://123.57.236.82:8080/zqhr'
        this.wtsimglist.url = httpurla + logimageurl
        this.wtsimgyrl = logimageurl
        console.log('图2', this.wtsimglist)
      }, 5)
    },
    handleEdit() {
      this.$refs.determineinfo.edit(this.enObj)
      this.visible = false
    },
    cascaderonChangeadd(addva) {
      console.log('行业', addva[1])
      this.tradeobj = addva[1]
      console.log('行业22', this.tradeobj)
    },
    eChange(logimageurl) {
      console.log('文件上传', logimageurl)
      setTimeout(() => {
        this.fileList = {}
        var httpurla = 'http://123.57.236.82:8080/zqhr'
        this.fileList.url = httpurla + logimageurl
        this.upimgstrurl = logimageurl
        // this.fileList.thumbUrl = record.logoAddress
        // this.businessList.url = httpurla + record.businessLicenseAddress
        console.log('图1', this.fileList)
        // console.log('图2', this.businessList)
      }, 5)
    },
    eimgChange(logimageurl) {
      console.log('文件上传2', logimageurl)
      setTimeout(() => {
        this.businessList = {}
        var httpurla = 'http://123.57.236.82:8080/zqhr'
        this.businessList.url = httpurla + logimageurl
        this.updataimgstrurl = logimageurl
        console.log('图2', this.businessList)
        // console.log('图2', this.businessList)
      }, 5)
    },
    //行业下拉
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    cascaderonChange(value) {
      console.log('行业', value)
      this.cascaderit = value[1]
    },
    getindustryList() {
      let that = this

      getAction(that.url.industrylist).then((res) => {
        // let items = []
        for (var i = 0; i < res.result.records.length; ++i) {
          res.result.records[i].items = ''
          let aaa = i
          getAction(that.url.industrychildren, { parentid: res.result.records[i].id }).then((rest) => {
            res.result.records[aaa].items = rest.result.records
          })
        }
        console.log('父级：', res.result.records)
        this.industryoption = res.result.records
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
    handleChange({ fileList }) {
      this.fileList = fileList
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
      console.log('对象审核：', record)
      console.log('logo对象：', record.logoAddress.slice(0, 6))
      if (record.logoAddress.slice(0, 6) == 'https:') {
        record.logoAddress = record.logoAddress.replace('http://123.57.236.82:8080/zqhr', '')
        // record.logoAddress = record.logoAddress.slice(34)
      }
      console.log('logo截取对象：', record.logoAddress)
      this.enObj = record
      this.examineId = record.id
      if (record.isuploadpictures == 1) {
        this.checkedpictures = true
      } else {
        this.checkedpictures = false
      }
      if (record.isuploadvideo == 1) {
        this.checkedvideo = true
      } else {
        this.checkedvideo = false
      }
      this.tradeobj = record.trade
      let retrade = []
      record.trade
      getAction(this.url.industrychildren, { name: record.trade }).then((res) => {
        if (res.success) {
          let hyid = res.result.records[0].parentid
          getAction(this.url.industrylist, { id: hyid }).then((rest) => {
            if (res.success) {
              this.childrenit[0] = rest.result.records[0].dataName
              console.log('行业222', this.childrenit)
            }
          })
          this.childrenit[1] = res.result.records[0].dataName
          console.log('行业111', this.childrenit)
        }
      })
      this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
      let that = this

      that.initialRoleList()
      that.checkedDepartNameString = ''
      that.form.resetFields()

      that.loadUserRoles(record.id)
      setTimeout(() => {
        this.fileList = {}
        this.businessList = {}
        this.imgstrurl = record.logoAddress
        // this.imgstrurl = this.imgstrurl.slice(34)
        // console.log('截取后路径2', this.imgstrurl)
        this.updataimgstrurl = record.businessLicenseAddress
        var httpurla = 'http://123.57.236.82:8080/zqhr'
        this.fileList.url = httpurla + record.logoAddress
        this.fileList.thumbUrl = record.logoAddress
        this.businessList.url = httpurla + record.businessLicenseAddress
        this.wtsimg = httpurla + record.poweraTtorneyAddress
        this.babimg = httpurla + record.employmentFilingAddress
        this.babimglist.url = httpurla + record.employmentFilingAddress
        this.wtsimglist.url = httpurla + record.poweraTtorneyAddress
        console.log('图1', this.fileList)
        console.log('图2', this.businessList)
      }, 5)

      that.userId = record.id
      that.visible = true
      that.model = Object.assign({}, record)
      that.$nextTick(() => {
        that.form.setFieldsValue(
          pick(
            this.model,
            'enterpriseName',
            'trade',
            'scale',
            'address',
            'area',
            'synopsis',
            'companyPrincipal',
            'idcard',
            'phone',
            'creditCode',
            'email',
            'isuploadpictures',
            'isuploadvideo'
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

      setTimeout(()=>{
          this.$refs.entmulitFormOk.ttedit(record)
        },1000)
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

    noexamineclick() {
      let that = this
      if (this.checkedvideo == true || this.checkedpictures == true) {
        this.$notification['warning']({
          message: '审核提示',
          description: '审核不通过时不允许上传多媒体状态，请取消勾选的多媒体类型！！！',
        })
      } else {
        this.$confirm({
          title: '审核不通过',
          content: `您确定对该企业审核不通过吗？`,
          centered: true,
          onOk: () => {
            if (this.enObj.examinestate == 0) {
              //待审核执行
              console.log('待审核执行', this.enObj)
              this.enObj.examinestate = -1
              this.enObj.updateBy = store.getters.userInfo.username
              // console.log('待审核跳转', this.enObj)
              this.axios({
                method: 'post',
                url: '/hall/enterprise/EnterpriseTemporaryexamine',
                headers: {},
                params: { isimport: this.enObj.isimport },
                data: this.enObj,
              })
                .then((response) => {
                  if (response.code == 500) {
                    this.$message.warning(response.message)
                  } else if (response.code == 300) {
                    // console.log("");
                    this.$confirm({
                      title: '该企业已存在',
                      content: `企业已存在 是否替换该企业`,
                      centered: true,
                      onOk: () => {
                        //待审核执行
                        console.log('替换执行', this.enObj)
                        this.enObj.examinestate = -1
                        this.enObj.updateBy = store.getters.userInfo.username
                        // console.log('待审核跳转', this.enObj)
                        this.axios({
                          method: 'post',
                          url: '/hall/enterprise/EnterpriseTemporaryexamineReplace',
                          headers: {},
                          params: { isimport: this.enObj.isimport },
                          data: this.enObj,
                        })
                          .then((response) => {
                            if (response.code == 500) {
                              this.$message.warning(response.message)
                            } else {
                              this.$message.success(response.message)
                            }

                            that.confirmLoading = false

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
                  }

                  that.confirmLoading = false
                  that.checkedDepartNames = []
                  that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                  that.close()

                  console.log(response)
                })
                .catch(function (error) {
                  this.$message.warning(response.message)

                  console.log(error)
                })
            } else {
              //其他审核不通过执行
              console.log('其他审核不通过执行')
              this.examineparams.id = this.examineId
              this.examineparams.examinestate = -1
              let obj
              if (this.examineId > 0) {
                editexamine(this.examineparams).then((res) => {
                  if (res.success) {
                    this.$message.success(res.message)
                    that.$emit('ok')
                  } else {
                    this.$message.warning(res.message)
                    that.$emit('ok')
                  }
                })
              } else {
                console.log('审核为空！')
                that.$emit('ok')
              }
              that.confirmLoading = false
              that.checkedDepartNames = []
              that.userDepartModel.departIdList = { userId: '', departIdList: [] }
              that.close()
            }
          },
        })
      }
    },
    handleSubmit() {
      var that = this
      // 触发表单验证

      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          if (!values.birthday) {
            values.birthday = ''
          } else {
            values.birthday = values.birthday.format(this.dateFormat)
          }
          let formData = Object.assign(this.model, values)
          // formData.trade = this.tradeobj
          if (that.fileList != '') {
            formData.avatar = that.fileList
          } else {
            formData.avatar = null
          }
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
          // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
          if (this.enObj.examinestate == 0) {
            this.enObj.examinestate = 1
            this.enObj.updateBy = store.getters.userInfo.username
            console.log('审核对象', this.enObj)
            this.axios({
              method: 'post',
              url: '/hall/enterprise/EnterpriseTemporaryexamine',
              headers: {},
              params: { isimport: this.enObj.isimport },
              data: this.enObj,
            })
              .then((response) => {
                if (response.code == 500) {
                  this.$message.warning(response.message)
                  that.$emit('ok')
                } else if (response.code == 300) {
                  //新增企业账号
                  if (response.result != '' || response.result != null) {
                    this.axios({
                      method: 'get',
                      url: '/hall/enterprise/addaccount',
                      headers: {},
                      params: { enterpriseinfoid: response.result },
                    })
                      .then((res) => {
                        if (res.code == 500) {
                          this.$message.warning(res.message)
                        } else {
                          // this.$message.success(res.message)
                        }

                        that.confirmLoading = false

                        that.close()
                        that.$emit('ok')
                        console.log(response)
                      })
                      .catch(function (error) {
                        this.$message.warning(res.message)

                        console.log(error)
                      })
                  }
                  //替换
                  console.log('审核response', response)
                  this.$confirm({
                    title: '该企业已存在',
                    content: `企业已存在 是否替换该企业`,
                    centered: true,
                    onOk: () => {
                      //待审核执行
                      console.log('替换执行', this.enObj)
                      this.enObj.examinestate = 1
                      this.enObj.updateBy = store.getters.userInfo.username
                      // console.log('待审核跳转', this.enObj)
                      this.axios({
                        method: 'post',
                        url: '/hall/enterprise/EnterpriseTemporaryexamineReplace',
                        headers: {},
                        params: { isimport: this.enObj.isimport },
                        data: this.enObj,
                      })
                        .then((response) => {
                          if (response.code == 500) {
                            this.$message.warning(response.message)
                          } else {
                            this.$message.success(response.message)
                          }

                          that.confirmLoading = false

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
                  console.log('审核response', response.result)
                  if (response.result != '' || response.result != null) {
                    this.axios({
                      method: 'get',
                      url: '/hall/enterprise/addaccount',
                      headers: {},
                      params: { enterpriseinfoid: response.result },
                    })
                      .then((res) => {
                        if (res.code == 500) {
                          this.$message.warning(res.message)
                        } else {
                          // this.$message.success(res.message)
                        }

                        that.confirmLoading = false

                        that.close()
                        that.$emit('ok')
                        console.log(response)
                      })
                      .catch(function (error) {
                        this.$message.warning(res.message)

                        console.log(error)
                      })
                  }

                  this.$message.success(response.message)
                  that.$emit('ok')
                }

                that.confirmLoading = false
                that.checkedDepartNames = []
                that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                that.close()

                console.log(response)
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            let obj
            console.log('其他审核跳转')
            if (!this.model.id) {
              formData.id = this.userId

              if (formData.enable == '未启用') {
                formData.enable = -1
              } else if (formData.enable == '已启用') {
                formData.enable = 1
              }
              // obj = addUser(formData)
            } else {
              if (formData.enable == '未启用') {
                formData.enable = -1
              } else if (formData.enable == '已启用') {
                formData.enable = 1
              }

              // console.log('修改上传多媒体状态', this.ckisuploadpictures)
              // console.log('修改上传多媒体状态', this.checkedpictures)
              if (this.checkedpictures == true) {
                // console.log("允许");
                this.ckisuploadpictures = 1
              } else {
                // console.log("不允许");
                this.ckisuploadpictures = -1
              }
              if (this.checkedvideo == true) {
                this.ckisuploadvideo = 1
              } else {
                this.ckisuploadvideo = -1
              }
              // console.log('修改图片状态', this.ckisuploadpictures)
              formData.isuploadpictures = this.ckisuploadpictures
              formData.isuploadvideo = this.ckisuploadvideo
              console.log('审核修改', formData)
              formData.logoAddress = this.upimgstrurl
              formData.businessLicenseAddress = this.updataimgstrurl
              formData.updateBy = store.getters.userInfo.username
              obj = editenterprise(formData)
            }
            obj
              .then((res) => {
                if (res.success) {
                  // console.log('审核', exid)
                  this.examineparams.id = this.examineId
                  this.examineparams.examinestate = 1
                  let obj
                  if (this.examineId > 0) {
                    editexamine(this.examineparams).then((res) => {
                      if (res.success) {
                        this.$message.success(res.message)
                      } else {
                        this.$message.warning(res.message)
                      }
                    })
                  } else {
                    console.log('审核为空！')
                  }
                } else {
                  that.$message.warning(res.message)
                }
                that.$emit('ok')
              })
              .finally(() => {
                that.confirmLoading = false
                that.checkedDepartNames = []
                that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                that.close()
              })
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
    handleChange(info) {
      this.picUrl = ''
      if (info.file.status === 'uploading') {
        this.uploadLoading = true
        return
      }
      if (info.file.status === 'done') {
        var response = info.file.response
        this.uploadLoading = false
        console.log(response)
        if (response.success) {
          this.model.avatar = response.message
          this.picUrl = 'Has no pic url yet'
        } else {
          this.$message.warning(response.message)
        }
      }
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
  color: #000;
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