<template>
  <a-drawer
    title="查看岗位"
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
        <span
          style="display: inline-block; width: calc(100% - 51px); padding-right: 10px; text-align: right"
        >
          <a-button
            @click="toggleScreen"
            icon="appstore"
            style="height: 20px; width: 20px; border: 0px"
          ></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <div
        style="margin: auto; width: 100%; display: flex; border: 1px solid #e9e9e9; height: 100%"
      >
        <div class="Jobtab" style="width: 45%; flaot: left">
          <a-table
            :columns="operationColumns"
            bordered
            :customRow="handleClickRow"
            :dataSource="dataSource"
            :pagination="ipagination"
            @change="handleTableChange"
          >
            <span slot="tags" slot-scope="text, record">
              <a-tag v-if="record.releasestate == '未发布'" color="red">未发布</a-tag>
              <a-tag v-if="record.releasestate == '已发布'" color="green">已发布</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <a-menu-item v-if="record.releasestate == '未发布'" style="display: inline-block">
                <a-popconfirm title="确定要启用该岗位吗?" @confirm="() => handleEnable(record.id)">
                  <a>启用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.releasestate == '已发布'" style="display: inline-block">
                <a-popconfirm title="确定要禁用该岗位吗?" @confirm="() => falsehandleEnable(record.id)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.releasestate == '已过期'" style="display: inline-block">
                <span style="color:red">过期不得操作</span>
              </a-menu-item>

              <a-menu-item v-if="record.releasestate == '删除'" style="display: inline-block">
                <span style="color:red">岗位已删除不得操作</span>
              </a-menu-item>
            </span>
          </a-table>
        </div>
        <div style="width: 60%; flaot: left; border: 1px solid #e9e9e9">
          <div style="margin-left: 3%">
            <detail-list>
              <detail-list-item term="工作职位" style="width: 100%; margin-top: 2%">
                {{
                boothtext.postName
                }}
              </detail-list-item>
              <detail-list-item term="工作类型" style="width: 100%; margin-top: 2%">
                {{
                boothtext.jobType
                }}
              </detail-list-item>
              <detail-list-item term="薪资待遇" style="width: 100%; margin-top: 2%">
                {{
                boothtext.salary
                }}
              </detail-list-item>
              <detail-list-item term="招聘人数" style="width: 100%; margin-top: 2%">
                {{
                boothtext.recruitment
                }}
              </detail-list-item>
              <detail-list-item term="学历要求" style="width: 100%; margin-top: 2%">
                {{
                boothtext.educationRequirements
                }}
              </detail-list-item>
              <detail-list-item term="工作经验" style="width: 100%; margin-top: 2%">
                {{
                boothtext.workExperience
                }}
              </detail-list-item>
              <detail-list-item term="工作性质" style="width: 100%; margin-top: 2%">
                {{
                boothtext.jobNature
                }}
              </detail-list-item>
              <detail-list-item term="年龄要求" style="width: 100%; margin-top: 2%">
                {{
                boothtext.ageRequirement
                }}
              </detail-list-item>
              <detail-list-item term="性别要求" style="width: 100%; margin-top: 2%">
                {{
                boothtext.genderRequirement
                }}
              </detail-list-item>
              <detail-list-item term="特色服务" style="width: 100%; margin-top: 2%">
                {{
                boothtext.special
                }}
              </detail-list-item>
              <detail-list-item term="职位描述" style="width: 100%; margin-top: 2%">
                <div class="ql-editor" id="imgurlid" v-html="boothtext.jobDescription"></div>
              </detail-list-item>
            </detail-list>
          </div>
        </div>
      </div>
    </a-spin>

    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <!-- <a-button style="margin-right: 0.8rem" @click="touplist()">上一页</a-button> -->
      <a-radio-group v-model="edradio" @change="radioChange">
        <a-radio :value="1">岗位信息</a-radio>
        <a-radio :value="2">企业信息</a-radio>
      </a-radio-group>
      <!-- <a-button @click="handleEdit()" type="primary">确认信息并下一页</a-button> -->
      <a-button style="margin-right: .8rem" @click="handleCancel">关 闭</a-button>
      <!-- </a-popconfirm> -->
    </div>
    <determine ref="determineinfo" @ok="modalFormOk"></determine>
    <entinfo ref="entinfo" @ok="modalFormOk"></entinfo>
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
import {
  addUser,
  editUser,
  queryUserRole,
  queryall,
  getPositionList,
  getfabuPostList,
  getPositionexamine,
  enablepostapi
} from '@/api/api'
import { disabledAuthFilter } from '@/utils/authFilter'
import { duplicateCheck } from '@/api/api'
import JImageUpload from '../../../components/jeecg/JImageUpload'
import { mixinDevice } from '@/utils/mixin.js'
import PageLayout from '@/components/page/PageLayout'
import Entinfo from './Enterinfo.vue'
import DetailList from '@/components/tools/DetailList'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import Determine from './Determine'
const DetailListItem = DetailList.Item

export default {
  name: 'UserModal',
  mixins: [JeecgListMixin],
  components: {
    Determine,
    JImageUpload,
    JSelectPosition,
    DetailList,
    DetailListItem,
    Entinfo
  },

  data() {
    return {
      edradio: 1,
      datafileView: '',
      enterpriseinfoobj: '',
      exobj: {},
      boothtext: {},
      rowselectjob: {},
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
              message: '请输入用户账号!'
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

        realname: { rules: [{ required: true, message: '请输入用户名称!' }] },
        phone: { rules: [{ validator: this.validatePhone }] },
        email: {
          rules: [
            {
              validator: this.validateEmail
            }
          ]
        },
        roles: {},
        //  sex:{initialValue:((!this.model.sex)?"": (this.model.sex+""))}
        workNo: {
          rules: [{ required: true, message: '请输入工号' }, { validator: this.validateWorkNo }]
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
      uploadLoading: false,
      confirmLoading: false,
      headers: {},
      form: this.$form.createForm(this),
      picUrl: '',
      url: {
        fileUpload: window._CONFIG['domianURL'] + '/sys/common/upload',
        userWithDepart: '/sys/user/userDepartList', // 引入为指定用户查看部门信息需要的url
        userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
        syncUserByUserName: '/process/extActProcess/doSyncUserByUserName', //同步用户到工作流
        queryTenantList: '/sys/tenant/queryList'
      },
      identity: '1',
      fileList: [],
      tenantList: [],
      currentTenant: [],
      dataSource: [],
      queryParam: {},
      enableParam: {}, //审核
      operationColumns: [
        {
          title: '职业名称',
          align: 'center',
          dataIndex: 'postName'
        },
        {
          title: '招聘数',
          align: 'center',
          dataIndex: 'recruitment'
        },
        {
          title: '岗位状态',
          align: 'center',
          scopedSlots: { customRender: 'tags' },
          dataIndex: 'tags'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    this.headers = { 'X-Access-Token': token }
    this.initTenantList()
  },
  computed: {
    uploadAction: function() {
      return this.url.fileUpload
    }
  },
  methods: {
    // 获取用户对应部门弹出框提交给返回的数据
    modalFormOktt(formDat, byid) {
      console.log('企业上一页传值', formDat)
      console.log('上一页传值2', byid)
      this.edradio = byid
      this.edit(formDat)
    },
    //单选
    radioChange(radiores) {
      var that = this

      if (radiores.target.value == 2) {
        this.$refs.entinfo.showDrawer(this.enterpriseinfoobj)
        that.visible = false
      }

      console.log('单选事件', radiores.target.value)
    },
    modalFormOk(rest) {
      console.log('父组件', rest)
      this.edit(rest)
    },
    handleEdit() {
      console.log('最后一页', this.enterpriseinfoobj)
      this.$refs.determineinfo.edit(this.enterpriseinfoobj)
      this.visible = false
    },
    touplist() {
      // console.log("上一页",this.enterpriseinfoobj);
      this.$emit('ok', this.enterpriseinfoobj)
      this.visible = false
    },
    loadData(queryParam) {
      // if (arg === 1) {
      //   this.ipagination.current = 1
      // }
      let params = this.getQueryParams() //查询条件
      console.log('审核查询条件')
      console.log(params)
      //  var logoAddressUrl='http://120.79.207.87:8091';
      getfabuPostList(params).then(res => {
        if (res.success) {
          console.log('发布岗位列表', res)
          for (var i = 0; i < res.result.length; ++i) {
            // res.result[i].releasestate = res.result[i].releasestate == 1 ? '审核通过' : '审核未通过'
            switch (res.result[i].releasestate) {
              case 0:
                // console.log('未发布')
                res.result[i].releasestate = '未发布'
                break
              case 1:
                // console.log('已发布')
                res.result[i].releasestate = '已发布'
                break
              case 2:
                // console.log('过期')
                res.result[i].releasestate = '过期'
                break
              case -1:
                // console.log('删除')
                res.result[i].releasestate = '删除'
                break
            }
          }
          this.dataSource = res.result
          this.ipagination.total = res.result.total
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      // param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    //审核
    handleClickRow(trecord, index) {
      return {
        on: {
          click: () => {
            // console.log(trecord, index)
            console.log('点击行内容record', trecord)

            let that = this
            that.boothtext = {}
            that.boothtext.postName = trecord.postName
            that.boothtext.jobType = trecord.jobType
            that.boothtext.salary = trecord.salary
            that.boothtext.recruitment = trecord.recruitment
            that.boothtext.educationRequirements = trecord.educationRequirements
            that.boothtext.workExperience = trecord.workExperience
            that.boothtext.jobNature = trecord.jobNature
            that.boothtext.ageRequirement = trecord.ageRequirement
            that.boothtext.genderRequirement = trecord.genderRequirement
            that.boothtext.special = trecord.special
            that.boothtext.jobDescription = trecord.jobDescription
            // that.rowselectjob.enterpriseInfoId = trecord.enterpriseInfoId //企业id
            // that.rowselectjob.id = trecord.id //招聘会id
            // console.log('点击行内容record2', that.rowselectjob)
            // getPositionList(that.rowselectjob).then((res) => {
            //   const vm = this
            //   if (res.success) {
            //     if (res.result.records.length > 0) {

            //       vm.boothtext.enterpriseName = ''
            //       vm.boothtext.enterpriseName = trecord.enterpriseName
            //       vm.boothtext.boothNumber = res.result.records[0].boothNumber
            //       vm.boothtext.boothType = res.result.records[0].boothType
            //       vm.boothtext.boothPosition = res.result.records[0].boothPosition
            //       vm.boothtext.validEnddate = res.result.records[0].validEnddate
            //     } else {
            //       this.$message.warning('未找到对应信息')
            //     }
            //   }
            // })
          }
        }
      }
    },
    handleEnable(idr) {
      const that = this
      console.log('审核' + idr)
      console.log('审核对象', that.exobj)
      that.enableParam.id = idr
      that.enableParam.enable = 1
      that.enableParam.enterpriseinfoid = that.exobj.enterpriseid
      that.enableParam.jobFairId = that.exobj.jobfairid
      that.enableParam.CreateBy = store.getters.userInfo.username
      enablepostapi(that.enableParam).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(this.queryParam)
        } else {
          that.$message.warning(res.message)
          this.loadData(this.queryParam)
        }
      })
    },
    falsehandleEnable(idr) {
      const that = this
      console.log('审核不通过' + idr)
      console.log('审核对象', that.exobj)
      that.enableParam.id = idr
      that.enableParam.enable = 0
      that.enableParam.enterpriseinfoid = that.exobj.enterpriseid
      that.enableParam.jobFairId = that.exobj.jobfairid
      that.enableParam.CreateBy = store.getters.userInfo.username
      enablepostapi(that.enableParam).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(this.queryParam)
        } else {
          that.$message.warning(res.message)
          this.loadData(this.queryParam)
        }
      })
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
      let that = this
      that.edradio = 1
      // console.log('职位信息', record.enterpriseid)
      console.log('职位信息1', record)
      that.enterpriseinfoobj = record
      that.exobj = record
      that.boothtext = {}
      that.queryParam.enterpriseinfoid = record.enterpriseid
      that.queryParam.jobFairId = record.jobfairid
      that.checkedDepartNameString = ''
      that.loadData(that.queryParam)
      that.userId = record.id
      that.visible = true
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
          that.confirmLoading = true
          if (!values.birthday) {
            values.birthday = ''
          } else {
            values.birthday = values.birthday.format(this.dateFormat)
          }
          let formData = Object.assign(this.model, values)
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
          let obj
          if (!this.model.id) {
            formData.id = this.userId
            obj = addUser(formData)
          } else {
            obj = editUser(formData)
          }
          obj
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
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
    beforeUpload: function(file) {
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
    // 搜索用户对应的部门API
    onSearch() {
      this.$refs.departWindow.add(this.checkedDepartKeys, this.userId)
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
/* @import './Determine'; */
</style>