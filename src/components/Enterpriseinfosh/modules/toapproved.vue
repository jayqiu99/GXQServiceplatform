<template>
  <a-drawer :title="title" :maskClosable="true" :width="drawerWidth" placement="right" :closable="true"
    @close="handleCancel" :visible="visible" style="height: 100%; overflow: auto; padding-bottom: 53px">
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
        <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入企业名称" v-decorator.trim="['enterpriseName', validatorRules.enterpriseName]" />
        </a-form-item>
        <a-form-item label="企业简介" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea placeholder="请输入企业简介" v-decorator.trim="['synopsis', validatorRules.synopsis]"
            :auto-size="{ minRows: 2, maxRows: 6 }" />
        </a-form-item>
        
        <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系人" v-decorator.trim="['companyPrincipal', validatorRules.companyPrincipal]" />
        </a-form-item>
        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系电话" v-decorator="['phone', validatorRules.phone]" />
        </a-form-item>
        <a-form-item label="企业信用代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入企业信用代码" v-decorator.trim="['creditCode']" />
        </a-form-item>
        <a-form-item label="企业性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select show-search v-decorator.trim="['nature']" option-filter-prop="children"
            :filter-option="filterOption">
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in natureoption" :key="d.id" :value="d.dataName">{{ d.dataName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item label="企业性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入企业性质" v-decorator.trim="['nature']" />
        </a-form-item>-->
        <a-form-item label="所属行业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-input placeholder="请输入所属行业" v-decorator.trim="[ 'trade', validatorRules.trade]" /> -->
          <a-select show-search v-decorator.trim="['trade', validatorRules.trade]" option-filter-prop="children"
            :filter-option="filterOption">
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in industryoption" :key="d.id" :value="d.dataName">
              {{
              d.dataName
              }}
            </a-select-option>
          </a-select>
          <!-- <a-cascader
            :field-names="{ label: 'dataName', value: 'dataName', children: 'items' }"
            v-decorator.trim="['trade', validatorRules.trade]"
            :options="industryoption"
            placeholder="Please select"
            @change="cascaderonChangeadd"
          />-->
        </a-form-item>
        <a-form-item label="企业规模" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select show-search v-decorator.trim="['scale']" option-filter-prop="children"
            :filter-option="filterOption">
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in scaleoption" :key="d.id" :value="d.dataName">{{ d.dataName }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="工作区域" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader :options="areaoption" v-model="areassq" @change="areaonChange" placeholder="请选择区域" />
          <!-- <a-select show-search v-decorator.trim="['area']" option-filter-prop="children" :filter-option="filterOption">
            <a-select-option value>请选择</a-select-option>
            <a-select-option v-for="d in areaoption" :key="d.id" :value="d.dataName">{{ d.dataName }}</a-select-option>
          </a-select> -->
        </a-form-item>
        <a-form-item label="所在地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入所在地址" v-decorator.trim="['address', validatorRules.address]" />
        </a-form-item>
        <!-- <a-form-item label="联系人身份证" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入联系人身份证" v-decorator.trim="['idcard']" />
        </a-form-item> -->
        <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入邮箱" v-decorator.trim="['email',validatorRules.email]" />
        </a-form-item>
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
        <a-form-item label="企业logo" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-image-upload class="avatar-uploader" @eChange="eChange" text="上传" v-model="fileList.url"></j-image-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="imghandleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>

          <!-- <a-button  type="zoom-in">查看</a-button> -->
        </a-form-item>
        <div style="margin-top: -20%">
          <a-button type="primary" shape="circle" icon="search" @click="handlePreview(fileList)" />
        </div>
        <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h5 style="margin-left: 15%">注：图片格式为png，不能超过1M</h5>
        </a-form-item>
        <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <u-image-upload class="avatar-uploader" text="上传" @eChange="eimgChange" v-model="businessList.url">
          </u-image-upload>
        </a-form-item>

        <div style="margin-top: -20%">
          <a-button type="primary" shape="circle" icon="search" @click="handlePreview(businessList)" />
        </div>
        <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h5 style="margin-left: 15%;width: 100%;">注：图片格式为png，不能超过1M<span style="color:red">，请上传带公章的营业执照</span></h5>
        </a-form-item>
        
        <a-form-item label="委托书" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <u-image-upload class="avatar-uploader" text="上传" @eChange="wtsimgChange" v-model="wtsimglist.url">
          </u-image-upload>
        </a-form-item>

        <div style="margin-top: -20%">
          <a-button type="primary" shape="circle" icon="search" @click="handlePreview(wtsimglist)" />
        </div>
        <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h5 style="margin-left: 15%;width: 100%;">
            注：图片格式为png，不能超过1M
            <span style="color:red">，请上传带公章的委托书</span>
          </h5>
        </a-form-item>

        <a-form-item label="用工备案表" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <u-image-upload class="avatar-uploader" text="上传" @eChange="babimgChange" v-model="babimglist.url">
          </u-image-upload>
        </a-form-item>

        <div style="margin-top: -20%">
          <a-button type="primary" shape="circle" icon="search" @click="handlePreview(babimglist)" />
        </div>
        <a-form-item label :labelCol="labelCol" :wrapperCol="wrapperCol">
          <h5 style="margin-left: 15%;width: 100%;">
            注：图片格式为png，不能超过1M
            <!-- <span style="color:red">，请上传带公章的委托书</span> -->
          </h5>
        </a-form-item>
      </a-form>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        
      </a-popconfirm>-->
      <a-button style="margin-right: 0.8rem" @click="handleCancel">关闭</a-button>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">保存</a-button>
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
  import { addUser, editenterprise, queryUserRole, queryall, addenterprise, dbaddenterprise } from '@/api/api'
  import { disabledAuthFilter } from '@/utils/authFilter'
  import { duplicateCheck } from '@/api/api'
  import JImageUpload from '../../../components/jeecg/JImageUpload'
  import UImageUpload from '../../../components/jeecg/upimagestwo'

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  export default {
    name: 'UserModal',
    components: {
      JImageUpload,
      JSelectPosition,
      UImageUpload
    },
    data() {
      return {
        biaz: '',
        checkedpictures: '',
        checkedvideo: '',
        ckisuploadpictures: '',
        ckisuploadvideo: '',
        tradeobj: '',
        imgstrurl: '',
        wtsimgyrl: '',
        ExcelfileList:{name:'',url:''},
        Baexcelfile:'',
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
          thumbUrl: ''
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
                message: '请输入!'
              },
              {
                validator: this.validateUsername
              }
            ]
          },
          password: {
            rules: [
              {
                required: true,
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
                message: '密码由8位数字、大小写字母和特殊符号组成!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          },
          confirmpassword: {
            rules: [
              {
                required: true,
                message: '请重新输入登陆密码!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          },
          enterpriseName: { rules: [{ required: true, message: '请输入用户名称!' }] },
          synopsis: { rules: [{ required: true, message: '请输入公司简介!' }] },
          address: { rules: [{ required: true, message: '请输入公司地址!' }] },
          companyPrincipal: { rules: [{ required: true, message: '请输入公司联系人!' }] },
          email: { rules: [{ required: true, message: '邮箱不能为空!' }] },
          phone: { rules: [{ required: true, message: '联系电话不能为空!' }, { validator: this.validatePhone }] },
          email: { rules: [{ required: true, message: '邮箱不能为空!' }] },
          // email: {
          //   rules: [
          //     {
          //       validator: this.validateEmail
          //     }
          //   ]
          // },
          roles: {},
          //  sex:{initialValue:((!this.model.sex)?"": (this.model.sex+""))}
          trade: {
            rules: [{ required: true, message: '请输入所属行业' }]
          },
          telephone: {
            rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }]
          }
        },
        departIdShow: false,
        departIds: [], //负责部门id
        title: '操作',
        visible: false,
        model: {},
        roleList: [],
        selectedRole: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
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
          arealist: '/base/getcityjsoninfo',
          naturelist: '/base/list?type=nature'
        },
        identity: '1',
        // fileList: [],
        businessList: {},
        wtsimglist: {},
        babimglist:{},
        babimgurl:{},
        tenantList: [],
        currentTenant: [],
        areaId: '', //区域
        areaname: '',//区域
        areassq: [],//区域
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
      }
    },
    mounted() {
      this.getnatureList()
      this.getareaList()
      this.getindustryList()
      this.getscaleList()
    },
    methods: {
      areaonChange(res, op) {
        console.log('区域级联', op)
        console.log('区域级联长度', op.length)
        var areaobj = ''
        var areaidstr = ''
        for (var a = 0; a < op.length; ++a) {

          console.log('循环', areaobj)
          areaobj += op[a].label + '/'
          areaidstr += op[a].value + ','
        }
        if (areaobj.length > 0) {
          areaobj = areaobj.substr(0, areaobj.length - 1)
          areaidstr = areaidstr.substr(0, areaidstr.length - 1)
        }
        console.log('区域字段2', areaobj)
        console.log('区域id', areaidstr)

        this.areaId = areaidstr;
        this.areaname = areaobj;
        // this.areaId=op[op.length].value
        // op[op.length].value
      },
      handleExcelError(res, file){
        console.log('备案表上传失败！！！', res)
      },
      handleExcelSuccess(res, file){
        if (res.code == 200) {
          console.log('备案表上传成功！！！', res)
          this.Baexcelfile=res.result;
        }
      },
      cascaderonChangeadd(addva) {
        console.log('行业', addva[1])
        this.tradeobj = addva[1]
        console.log('行业22', this.tradeobj)
      },
      babimgChange(logimageurl){
        console.log('文件上传2', logimageurl)
        setTimeout(() => {
          this.babimglist = {}
          var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
          this.babimglist.url = httpurla + logimageurl
          this.babimgurl = logimageurl
          console.log('图2', this.babimglist)
        }, 5)
      },
      eChange(logimageurl) {
        console.log('文件上传', logimageurl)
        setTimeout(() => {
          this.fileList = {}
          var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
          this.fileList.url = httpurla + logimageurl
          this.upimgstrurl = logimageurl
          // this.fileList.thumbUrl = record.logoAddress
          // this.businessList.url = httpurla + record.businessLicenseAddress
          console.log('图1', this.fileList)
          // console.log('图2', this.businessList)
        }, 5)
      },
      wtsimgChange(logimageurl) {
        console.log('文件上传2', logimageurl)
        setTimeout(() => {
          this.wtsimglist = {}
          var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
          this.wtsimglist.url = httpurla + logimageurl
          this.wtsimgyrl = logimageurl
          console.log('图2', this.wtsimglist)
        }, 5)
      },
      eimgChange(logimageurl) {
        console.log('文件上传2', logimageurl)
        setTimeout(() => {
          this.businessList = {}
          var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
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

        getAction(that.url.industrylist).then(res => {
          // let items = []
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].items = ''
            let aaa = i
            getAction(that.url.industrychildren, { parentid: res.result.records[i].id }).then(rest => {
              res.result.records[aaa].items = rest.result.records
            })
          }
          console.log('父级：', res.result.records)
          this.industryoption = res.result.records
        })
      },
      //企业性质
      getnatureList() {
        let that = this
        getAction(that.url.naturelist).then(res => {
          that.natureoption = res.result.records
          // that.loadData()
        })
      },
      //区域下拉框
      getareaList() {
        let that = this
        getAction(that.url.arealist).then(res => {
          that.areaoption = res.result
          // that.loadData()
        })
      },
      //规模下拉框
      getscaleList() {
        let that = this
        getAction(that.url.scalelist).then(res => {
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
        getAction(this.url.queryTenantList).then(res => {
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
        queryall().then(res => {
          if (res.success) {
            this.roleList = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      loadUserRoles(userid) {
        queryUserRole({ userid: userid }).then(res => {
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
        this.biaz = 'sysEnterprise'
        console.log('企业新增对象：', record)
        this.exaupdata = record

        if (record.bdmAreaInfoId != null) {
          var areastr = record.bdmAreaInfoId
          this.areassq = areastr.split(',')
        }
        // if(record.isuploadpictures==1){
        //   this.checkedpictures =true
        // }else{
        //   this.checkedpictures =false
        // }
        // if(record.isuploadvideo==1){
        //   this.checkedvideo =true
        // }else{
        //   this.checkedvideo =false
        // }
        this.tradeobj = record.trade
        let retrade = []
        record.trade
        getAction(this.url.industrychildren, { name: record.trade }).then(res => {
          if (res.success) {
            let hyid = res.result.records[0].parentid
            getAction(this.url.industrylist, { id: hyid }).then(rest => {
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
          this.wtsimglist = {}
          this.wtsimglist.url = ''
          this.babimglist = {}
          this.babimglist.url = ''
          this.imgstrurl = record.logoAddress
          this.imgstrurl = this.imgstrurl.slice(34)
          console.log('截取后路径', this.imgstrurl)
          this.updataimgstrurl = record.businessLicenseAddress
          this.wtsimgyrl = record.poweraTtorneyAddress
          this.babimgurl = record.employmentFilingAddress
          // this.ExcelfileList.name=record.enterpriseName+"备案表"
          var httpurla = 'https://dwrlzy.jiahangit.com.cn/zqhr'
          this.fileList.url = record.logoAddress
          this.fileList.thumbUrl = record.logoAddress
          this.businessList.url = httpurla + record.businessLicenseAddress
          this.babimglist.url = httpurla + record.employmentFilingAddress
          this.wtsimglist.url = httpurla + record.poweraTtorneyAddress
          console.log('图1', this.fileList)
          console.log('图2', this.businessList)
          console.log('图3', this.wtsimglist)
          console.log('图4', this.babimglist)
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
              'nature',
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
        //update-end-author:taoyan date:2020710 for:多租户配置
      },
      //
      loadCheckedDeparts() {
        let that = this
        if (!that.userId) {
          return
        }
        getAction(that.url.userWithDepart, { userId: that.userId }).then(res => {
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
                title: res.result[i].title
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
      handleSubmit() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let httpurl = ''
            let method = ''
            if (!this.model.id) {
              httpurl += this.url.add
              method = 'post'

              let formData = Object.assign(this.model, values)
              console.log("新增企业", formData);
              // console.log('新增委托书', this.wtsimgyrl)
              formData.poweraTtorneyAddress = this.wtsimgyrl
              formData.employmentFilingAddress=this.babimgurl
              formData.logoAddress = this.upimgstrurl
              formData.businessLicenseAddress = this.updataimgstrurl
              formData.examinestate = 1
              formData.account = formData.phone;
              formData.createBy = store.getters.userInfo.username
              formData.area = this.areaname;
              formData.bdmAreaInfoId = this.areaId;
              console.log("新增企业2", formData);
              // console.log("新增企业地址",httpurl);
              let addobj
              // console.log('新增企业', formData)
              addobj = dbaddenterprise(formData)
              addobj
                .then(res => {
                  if (res.success) {
                    that.$message.success(res.message)
                    this.upimgstrurl = ''
                    this.wtsimgyrl = ''
                    this.babimgurl=''
                    this.updataimgstrurl = ''
                    that.$emit('ok')
                  } else {
                    that.$message.warning(res.message)
                  }
                })
                .finally(() => {
                  that.confirmLoading = false
                  that.checkedDepartNames = []
                  that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                  that.close()
                })
            } else {
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
              // this.tradeobj

              if (this.exaupdata.examinestate == 0) {
                // console.log('待审核的编辑', formData)
                let obj
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

                  formData.logoAddress = this.upimgstrurl
                  formData.businessLicenseAddress = this.updataimgstrurl
                  formData.poweraTtorneyAddress = this.wtsimgyrl
                  formData.employmentFilingAddress=this.babimgurl
                  formData.updateBy = store.getters.userInfo.username
                }
                if (this.areaname != "") {
                  formData.area = this.areaname;
                  formData.bdmAreaInfoId = this.areaId;
                }
                console.log("委托书", this.wtsimgyrl);
                console.log("修改结果对象", formData);
                this.axios({
                  method: 'post',
                  url: '/hall/enterprise/EnterpriseTemporaryUpdate',
                  headers: {},
                  params: { isimport: formData.isimport },
                  data: formData
                })
                  .then(response => {
                    if (response.code == 500) {
                      this.$message.warning(response.message)
                      this.upimgstrurl = ''
                      this.updataimgstrurl = ''
                      this.wtsimgyrl = ''
                      this.babimgurl=''
                      that.$emit('ok')
                    } else {
                      this.$message.success(response.message)
                      this.upimgstrurl = ''
                      this.updataimgstrurl = ''
                      this.wtsimgyrl = ''
                      this.babimgurl=''
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
              } else {
                // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
                // console.log('其他审核的编辑', formData)
                let obj
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

                  formData.logoAddress = this.upimgstrurl
                  formData.businessLicenseAddress = this.updataimgstrurl
                  formData.updateBy = store.getters.userInfo.username
                  obj = editenterprise(formData)
                }
                obj
                  .then(res => {
                    if (res.success) {
                      that.$message.success(res.message)
                      this.upimgstrurl = ''
                      this.updataimgstrurl = ''
                      this.wtsimgyrl = ''
                      this.babimgurl=''
                      that.$emit('ok')
                    } else {
                      that.$message.warning(res.message)
                    }
                  })
                  .finally(() => {
                    that.confirmLoading = false
                    that.checkedDepartNames = []
                    that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                    that.close()
                  })
              }
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
              dataId: this.userId
            }
            duplicateCheck(params).then(res => {
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
              dataId: this.userId
            }
            duplicateCheck(params).then(res => {
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
          dataId: this.userId
        }
        duplicateCheck(params).then(res => {
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
          dataId: this.userId
        }
        duplicateCheck(params).then(res => {
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
            title: formData.departIdList[i].title
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
      }
    }
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