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
        <span style="display: inline-block; width: calc(100% - 51px); padding-right: 10px; text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height: 20px; width: 20px; border: 0px"></a-button>
        </span>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <div style="margin: auto; width: 100%; display: flex; border: 1px solid #e9e9e9; height: 100%">
        <div class="Jobtab" style="width: 43%; flaot: left">
          <a-table
            :columns="operationColumns"
            bordered
            :customRow="handleClickRow"
            :dataSource="dataSource"
            :pagination="ipagination"
            @change="handleTableChange"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="isAblefalse(record)"> <a-icon type="file-search" />编辑岗位 </a>
              <a-divider type="vertical" />
              <a @click="detailpost(record.id)"> <a-icon type="setting" />删除 </a>
              <a-divider type="vertical" />
              <a-menu-item v-if="record.enable == '未启用'" style="display: inline-block">
                <a-popconfirm title="确定要启用吗?" @confirm="() => handleEnable(record.id)">
                  <a>启用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.enable == '已启用'" style="display: inline-block">
                <a-popconfirm title="确定要禁用吗?" @confirm="() => handleDisable(record.id)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item>
            </span>
          </a-table>
          <!-- <a-button @click="handleAdd" type="primary" icon="plus">添加岗位</a-button> -->
        </div>
        <div style="width: 57%; flaot: left; border: 1px solid #e9e9e9">
          <div style="margin-left: 3%">
            <detail-list>
              <detail-list-item term="岗位名称" style="width: 100%; margin-top: 2%">
                <a-input style="width: 50%" placeholder v-model="boothtext.postName" v-if="ispd == 0"></a-input>
                <span v-if="ispd == 1">{{ boothtext.postName }}</span>
              </detail-list-item>
              <detail-list-item term="岗位描述" style="width: 100%; margin-top: 2%">
                <!-- <div class="ql-editor" id="imgurlid" v-html="boothtext.jobDescription"></div> -->
                <a-textarea v-if="ispd == 0" v-model="boothtext.jobDescription" />
                <span v-if="ispd == 1">{{ boothtext.jobDescription }}</span>
              </detail-list-item>
              <detail-list-item term="岗位类型" style="width: 100%; margin-top: 2%">
                <a-cascader
                  style="width: 50%"
                  v-if="ispd == 0"
                  v-model="bba"
                  @change="onChange"
                  :options="jobTypeoptions"
                  placeholder
                />
                <span v-if="ispd == 1">{{ boothtext.jobType }}</span>
              </detail-list-item>
              <detail-list-item term="工作经验" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.workExperience">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option value="无经验">无经验</a-select-option>
                  <a-select-option value="一年以上">一年以上</a-select-option>
                  <a-select-option value="1-3年">1-3年</a-select-option>
                  <a-select-option value="3-5年">3-5年</a-select-option>
                  <a-select-option value="5-10年">5-10年</a-select-option>
                  <a-select-option value="10年以上">10年以上</a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.workExperience }}</span>
              </detail-list-item>
              <detail-list-item term="学历要求" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.educationRequirements">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in educationRequirementsoption" :key="d.id" :value="d.dataName">
                    {{ d.dataName }}
                  </a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.educationRequirements }}</span>
              </detail-list-item>
              <detail-list-item term="薪资待遇" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.salary">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in salaryoption" :key="d.id" :value="d.dataName">
                    {{ d.dataName }}
                  </a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.salary }}</span>
              </detail-list-item>
              <detail-list-item term="招聘人数" style="width: 100%; margin-top: 2%">
                <a-input style="width: 50%" v-if="ispd == 0" placeholder v-model="boothtext.recruitment"></a-input>
                <span v-if="ispd == 1">{{ boothtext.recruitment }}</span>
              </detail-list-item>
              <detail-list-item term="工作性质" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.jobNature">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option value="全职">全职</a-select-option>
                  <a-select-option value="兼职">兼职</a-select-option>
                  <a-select-option value="实习">实习</a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.jobNature }}</span>
              </detail-list-item>
              <detail-list-item term="年龄要求" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.ageRequirement">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in ageoption" :key="d.id" :value="d.dataName">
                    {{ d.dataName }}
                  </a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.ageRequirement }}</span>
              </detail-list-item>

              <detail-list-item term="工作区域" style="width: 100%; margin-top: 2%">
                <a-cascader
                style="width: 50%"
                  v-if="ispd == 0"
                  :options="areaoption"
                  v-model="areassq"
                  @change="areaonChange"
                  placeholder="请选择区域"
                />
                <span v-if="ispd == 1">{{ boothtext.areassq }}</span>
              </detail-list-item>

              <detail-list-item term="工作详址" style="width: 100%; margin-top: 2%">
                <!-- <a-textarea
                  v-if="ispd == 0"
                  placeholder="请输入工作地址"
                  v-decorator.trim="['jobAddress', validatorRules.jobAddress]"
                /> -->
                <a-input style="width: 50%" placeholder v-model="boothtext.jobAddress" v-if="ispd == 0"></a-input>
                <span v-if="ispd == 1">{{ boothtext.jobAddress }}</span>
              </detail-list-item>

              <detail-list-item term="性别要求" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.genderRequirement">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option value="不限">不限</a-select-option>
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.genderRequirement }}</span>
              </detail-list-item>
              <detail-list-item term="特色服务" style="width: 100%; margin-top: 2%">
                <a-checkbox-group v-model="trya" v-if="ispd == 0" :options="tttoptions" />
                <span v-if="!isAble">{{ boothtext.special }}</span>
              </detail-list-item>

              <detail-list-item term="是否长期有效" style="width: 100%; margin-top: 2%">
                <a-radio-group v-model="boothtext.effectiveState" @change="radioonChange">
                  <a-radio :value="1">长期有效</a-radio>
                  <a-radio :value="2">仅此招聘会有效</a-radio>
                  <a-radio :value="3">限时有效</a-radio>
                </a-radio-group>
              </detail-list-item>
              <detail-list-item
                v-if="boothtext.effectiveState == 3"
                term="是否长期有效"
                style="width: 100%; margin-top: 2%"
              >
                <a-range-picker
                  :show-time="{ format: 'HH:mm' }"
                  v-if="boothtext.effectiveStartdate != null && boothtext.effectiveEnddate != null"
                  format="YYYY-MM-DD"
                  style="width: 100%"
                  :placeholder="['举办开始时间', '举办结束时间']"
                  :value="[
                    this.moment(boothtext.effectiveStartdate, dateFormat),
                    this.moment(boothtext.effectiveEnddate, dateFormat),
                  ]"
                  @change="dateonChange"
                />
                <a-range-picker
                  :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                  show-time
                  v-if="boothtext.effectiveStartdate == null || boothtext.effectiveEnddate == null"
                  format="YYYY-MM-DD"
                  @change="dateonChange"
                />
                <!-- <a-range-picker
                  :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                  format="yyyy-MM-dd HH:mm:ss"
                  @change="dateonChange"
                />-->
              </detail-list-item>
            </detail-list>
          </div>
        </div>
      </div>
    </a-spin>
    <a-button @click="handleAdd" type="primary" icon="plus">添加岗位</a-button>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <a-button style="margin-right: 0.8rem" @click="touplist()">关闭</a-button>
      <a-button @click="handleEdit()" type="primary">保存</a-button>
      <!-- <a-button style="margin-right: .8rem" @click="handleCancel">取消</a-button> -->
      <!-- </a-popconfirm> -->
    </div>
    <determine ref="determineinfo" @ok="modalFormOk"></determine>
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
  getaminejobList,
  psoteditenable,
  getPositionList,
  getPositionexamine,
} from '@/api/api'
import { disabledAuthFilter } from '@/utils/authFilter'
import { duplicateCheck } from '@/api/api'
import JImageUpload from '../../../components/jeecg/JImageUpload'
import { mixinDevice } from '@/utils/mixin.js'
import PageLayout from '@/components/page/PageLayout'
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
  },

  data() {
    this.dateFormat = 'YYYY/MM/DD'
    return {
      xlpostname:'',//岗位
        xlpostId:'',//岗位
      ispd: 1,
      isAble: false,
      bba: [],
      areassq: [],
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
      ],
      trya: [],
      areaoption: [], //区域
      ageoption: [], //年龄
      educationRequirementsoption: [], //学历
      salaryoption: [], //薪资
      jobTypeoptions: [], //工作类型
      datafileView: '',
      enterpriseinfoobj: '',
      exobj: {},
      effectiveStartdate: '',
      effectiveEnddate: '',
      boothtext: {
        postName: '',
        salary: '',
        jobType: '',
        jobTypeId: '',
        salary: '',
        recruitment: '',
        educationRequirements: '',
        workExperience: '',
        jobNature: '',
        ageRequirement: '',
        genderRequirement: '',
        special: '',
        jobDescription: '',
        effectiveState: '',
        effectiveStartdate: '',
        effectiveEnddate: '',
        areaId: '',
        areaname: '',
      },
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
              message: '请输入用户账号!',
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

        realname: { rules: [{ required: true, message: '请输入用户名称!' }] },
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
        workNo: {
          rules: [{ required: true, message: '请输入工号' }, { validator: this.validateWorkNo }],
        },
        telephone: {
          rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }],
        },
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
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
        queryTenantList: '/sys/tenant/queryList',
        salarylist: '/base/list?type=salaryrange&pageNo=1&pageSize=100',
        jobTypelist: '/base/queryBaseDataByjobtype',
        educationRequirementslist: '/base/list?type=education&pageNo=1&pageSize=100',
        agelist: '/base/list?type=Age&pageNo=1&pageSize=100',
        arealist: '/base/getcityjsoninfo',
      },
      identity: '1',
      fileList: [],
      tenantList: [],
      currentTenant: [],
      dataSource: [],
      queryParam: {},
      addis: 0,
      enableParam: {
        id: '',
        examinestate: '',
      }, //审核
      operationColumns: [
        {
          title: '职业名称',
          align: 'center',
          dataIndex: 'postName',
          key: 'name',
        },
        {
          title: '招聘数',
          align: 'center',
          dataIndex: 'recruitment',
          key: 'number',
          with: 30,
        },
        {
          title: '是否启用',
          align: 'center',
          dataIndex: 'enable',

          with: 30,
        },
        // {
        //   title: '审核状态',
        //   align: 'center',
        //   dataIndex: 'examinestate',
        //   key: 'number'
        // }
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
        },
      ],
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    this.headers = { 'X-Access-Token': token }
    this.initTenantList()
    // 默认全部选中
    // this.options = this.speciallist
  },
  computed: {
    uploadAction: function () {
      return this.url.fileUpload
    },
  },
  mounted() {},
  methods: {
    areaonChange(res, op) {
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
      // console.log('区域字段1', op[op.length - 1].value)
      console.log('区域字段2', areaobj)
      console.log('区域id', areaidstr)

      this.boothtext.areaId = areaidstr
      this.boothtext.areaname = areaobj
      // this.areaId=op[op.length].value
      // op[op.length].value
    },
    //添加岗位
    handleAdd() {
      this.ispd = 0
      this.addis = 1
      this.boothtext = {}
      this.trya = []
    },
    getareaList() {
      let that = this
      getAction(that.url.arealist).then((res) => {
        // console.log("省市区", res.result);
        that.areaoption = res.result
        // that.loadData()
      })
    },
    //启用
    handleEnable(idr) {
      const that = this
      console.log('启用' + idr)
      that.enableParam.id = idr
      that.enableParam.enable = 1
      psoteditenable(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(1)
        } else {
          that.$message.warning(res.message)
          this.loadData(1)
        }
      })
    },

    //禁用
    handleDisable(DisableId) {
      const that = this
      that.enableParam.id = DisableId
      that.enableParam.enable = -1
      psoteditenable(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(1)
        } else {
          that.$message.warning(res.message)
          this.loadData(1)
        }
      })
    },
    //日期范围
    dateonChange(dates, dateStrings) {
      console.log('From1: ', dates[0], ', to: ', dates[1])
      console.log('From22: ', dateStrings[0], ', to: ', dateStrings[1])
      this.boothtext.effectiveStartdate = dateStrings[0]
      this.boothtext.effectiveEnddate = dateStrings[1]
    },
    //单选框
    radioonChange(e) {
      console.log('单选', e.target.value)
      if (e.target.value == 3) {
        console.log('单选', this.boothtext.effectiveStartdate)
        // boothtext.effectiveStartdate
        // boothtext.effectiveEnddate
      }
    },
    onChange(res, op) {
      // console.log('级联选择', res)
      console.log('级联选择2', op)
      console.log('级联选择333', op.length)
      var postobj = ''
        var postidstr = ''
        for (var a = 0; a < op.length; ++a) {
          console.log('循环', postobj)
          postobj += op[a].label + '/'
          postidstr += op[a].value + ','
        }
        if (postobj.length > 0) {
          postobj = postobj.substr(0, postobj.length - 1)
          postidstr = postidstr.substr(0, postidstr.length - 1)
        }
        // console.log('区域字段1', op[op.length - 1].value)
        console.log('岗位字段2', postobj)
        console.log('岗位id', postidstr)
        this.xlpostId = postidstr
        this.xlpostname = postobj
    },
    detailpost(res) {
      this.axios({
        method: 'GET',
        url: '/hall/position/delete',
        headers: {},
        params: { id: res },
      })
        .then((response) => {
          console.log(response)
          this.loadData(1)
          this.$message.success('删除成功！')
          this.selectedRowKeys = []
        })
        .catch(function (error) {
          this.$message.success('删除失败:', error)
          console.log(error)
        })
    },
    // checked的选中项
    onChangeChecked(checkedValues) {
      this.$emit('changeByChecked', checkedValues)
    },
    oncheckbox(checkedValues) {
      console.log('多选checked = ', checkedValues)
      // console.log('多选长度 = ', checkedValues.length)
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
    //工作类型
    getjobTypelist() {
      let that = this
      getAction(that.url.jobTypelist).then((res) => {
        that.jobTypeoptions = res.result
        // console.log("工作类型级联下拉",res);
      })
    },
    //薪资下拉
    getsalaryList() {
      let that = this
      getAction(that.url.salarylist).then((res) => {
        // console.log("薪资下拉",res);
        that.salaryoption = res.result.records
      })
    },
    modalFormOk(rest) {
      console.log('父组件', rest)
      this.edit(rest)
    },
    isAblefalse(rowrecord) {
      this.bba = []
      this.ispd = 0
      this.addis = 0
      this.isAble = false

      if (rowrecord.jobTypeId != null) {
          var areastr = rowrecord.jobTypeId
          this.bba = areastr.split(',')
          console.log("岗位类型",this.bba);
        }
    },
    handleEdit() {
      console.log('岗位新增查询。。。。。。', this.queryParam)
      // this.$refs.determineinfo.edit(this.enterpriseinfoobj)
      //
      if (this.ispd == 1) {
        this.$message.warning('暂无法保存信息，请启用表单编辑状态')
      } else {
        if (this.addis == 1) {
          console.log('岗位新增。。。。。。', this.exobj)
          var addattr = ''
          for (var a = 0; a < this.trya.length; ++a) {
            console.log('循环', addattr)
            addattr += this.trya[a] + ','
          }

          if (addattr.length > 0) {
            addattr = addattr.substr(0, addattr.length - 1)
          }
          this.boothtext.special = addattr
          this.boothtext.jobTypeId = this.xlpostId
          this.boothtext.jobType = this.xlpostname
          this.boothtext.createBy = store.getters.userInfo.username
          this.boothtext.enterpriseInfoId = this.exobj.enterpriseInfoId
          console.log('新增保存对象', this.boothtext)
          this.axios({
            method: 'post',
            url: '/hall/position/addPostRelease',
            headers: {},
            data: this.boothtext,
          })
            .then((response) => {
              console.log(response)
              if (response.success == true) {
                this.$message.success(response.message)
                this.loadData(1)
                this.$emit('ok')
              } else {
                this.$message.warning(response.message)
                this.$emit('error')
              }
            })
            .finally(() => {
              // this.confirmLoading = false
              this.checkedDepartNames = []
              this.userDepartModel.departIdList = { userId: '', departIdList: [] }
              // this.close()
            })
            .catch(function (error) {
              // this.$message.warning(error)

              console.log(error)
            })
        } else if (this.addis == 0) {
          console.log('岗位修改。。。。。。')
          var attr = ''
          for (var a = 0; a < this.trya.length; ++a) {
            console.log('循环', attr)
            attr += this.trya[a] + ','
          }

          if (attr.length > 0) {
            attr = attr.substr(0, attr.length - 1)
          }
          console.log('特色服务22', attr)
          this.boothtext.special = attr
          console.log('保存', this.boothtext)
          if (this.boothtext.enable == '已启用') {
            this.boothtext.enable = 1
          } else if (this.boothtext.enable == '未启用') {
            this.boothtext.enable = -1
          }
          this.boothtext.jobTypeId = this.xlpostId
            this.boothtext.jobType = this.xlpostname
          this.boothtext.updateBy = store.getters.userInfo.username
          console.log('234567890-=', this.boothtext)
          this.axios({
            method: 'post',
            url: '/hall/position/editById',
            headers: {},
            data: this.boothtext,
          })
            .then((response) => {
              console.log(response)
              if (response.success == true) {
                this.$message.success(response.message)
                this.$emit('ok')
              } else {
                this.$message.warning(response.message)
                this.$emit('error')
              }
            })
            .finally(() => {
              this.confirmLoading = false
              this.checkedDepartNames = []
              this.userDepartModel.departIdList = { userId: '', departIdList: [] }
              this.close()
            })
            .catch(function (error) {
              this.$message.warning(response.message)

              console.log(error)
            })
          // this.visible = false
        }
      }
    },
    touplist() {
      // console.log("上一页",this.enterpriseinfoobj);
      this.$emit('ok', this.enterpriseinfoobj)
      this.visible = false
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      console.log('岗位列表数据', params)
      // console.log('审核查询条件111', params)
      // console.log(queryParam)
      //  var logoAddressUrl='http://120.79.207.87:8091';
      getaminejobList(params).then((res) => {
        if (res.success) {
          console.log('岗位列表数据', res.result.records)
          for (var i = 0; i < res.result.records.length; ++i) {
            // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '审核通过' : '审核未通过'
            res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
          }
          this.dataSource = res.result.records
          // console.log('列表数据2', this.dataSource)
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
            //console.log("33456",this.dataSource)
            console.log('点击行内容record', trecord)
            var str = trecord.special
            if (str != null) {
              var arrayList = str.split(',')
              this.trya = arrayList
              console.log('逗号分割', arrayList)
            }

            this.boothtext = trecord
            // let that = this
            // that.boothtext = {}
            // this.boothtext.postName = trecord.postName
            // this.boothtext.jobType = trecord.jobType
            // this.boothtext.salary = trecord.salary
            // this.boothtext.recruitment = trecord.recruitment
            // this.boothtext.educationRequirements = trecord.educationRequirements
            // this.boothtext.workExperience = trecord.workExperience
            // this.boothtext.jobNature = trecord.jobNature
            // this.boothtext.ageRequirement = trecord.ageRequirement
            // this.boothtext.genderRequirement = trecord.genderRequirement
            // this.boothtext.special = trecord.special
            // this.boothtext.jobDescription = trecord.jobDescription
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
          },
        },
      }
    },
    handleEnablett(idr) {
      const that = this
      console.log('审核' + idr)
      that.enableParam.id = idr
      that.enableParam.examinestate = 1
      that.enableParam.enterpriseInfoId = that.exobj.enterpriseInfoId
      that.enableParam.jobFairId = that.exobj.jobFairId
      console.log('审核对象12', that.exobj)
      console.log('审核对象123', that.enableParam)
      getPositionexamine(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(1)
        } else {
          that.$message.warning(res.message)
          this.loadData(1)
        }
      })
    },
    falsehandleEnable(idr) {
      const that = this
      console.log('审核不通过' + idr)
      console.log('审核对象', that.exobj)
      that.enableParam.id = idr
      that.enableParam.examinestate = -1
      that.enableParam.enterpriseInfoId = that.exobj.enterpriseid
      that.enableParam.jobFairId = that.exobj.jobfairid
      getPositionexamine(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData(1)
        } else {
          that.$message.warning(res.message)
          this.loadData(1)
        }
      })
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
      let that = this
      this.ispd = 1
      console.log('添加事件', record)
      getAction(this.url.arealist).then((res) => {
        // console.log("省市区", res.result);
        that.areaoption = res.result
        // that.loadData()
        if (record.bdmAreaInfoId != null) {
          var postareastr = record.bdmAreaInfoId
          this.areassq = postareastr.split(',')
        }
      })
      if (record.area != '' && record.area != null && record.area != undefined) {
        console.log('区域分割前')
        var areaobj = record.area.split('/')
        this.areassq = areaobj
        // console.log("区域分割后",);
      }
      // console.log('职位信息', record.enterpriseid)
      console.log('职位信息1', record)
      that.exobj = record
      // this.speciallist=this.try
      this.options = this.try
      this.getsalaryList()
      this.getjobTypelist()
      this.geteducationList()
      this.getageList()
      that.enterpriseinfoobj = record

      that.boothtext = {}
      that.queryParam.enterpriseinfoid = record.enterpriseInfoId
      that.queryParam.jobFairId = record.jobFairId
      that.queryParam.examinestate = 1
      // console.log('企业id', that.queryParam.enterpriseInfoId)
      // console.log('招聘会id', that.queryParam.jobFairId)
      // console.log('招聘会id', that.queryParam.jobFairId)
      that.checkedDepartNameString = ''
      that.loadData(1)
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
      console.log(213)
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
            .then((res) => {
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
/* @import './Determine'; */
</style>