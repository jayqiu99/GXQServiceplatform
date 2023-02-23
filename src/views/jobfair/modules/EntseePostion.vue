<template>
  <a-drawer title="查看岗位" :maskClosable="true" :width="drawerWidth" placement="right" :closable="true"
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
      <div style="margin: auto; width: 100%; display: flex; border: 1px solid #e9e9e9; height: 100%">
        <div class="Jobtab" style="width: 53%; flaot: left">
          <a-table :columns="operationColumns" bordered :customRow="handleClickRow" :dataSource="dataSource"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" :pagination="ipagination"
            @change="handleTableChange">
            <span v-if="resstatic != '已过期'" slot="action" slot-scope="text, record">
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
              <detail-list-item term="工作职位" style="width: 100%; margin-top: 2%">
                <a-input style="width: 50%" placeholder v-model="boothtext.postName" v-if="ispd == 0"></a-input>
                <span v-if="ispd == 1">{{ boothtext.postName }}</span>
              </detail-list-item>
              <detail-list-item term="职位描述" style="width: 55%; margin-top: 2%">
                <!-- <div class="ql-editor" id="imgurlid" v-html="boothtext.jobDescription"></div> -->
                <a-textarea v-if="ispd == 0" v-model="boothtext.jobDescription" />
                <span v-if="ispd == 1">{{ boothtext.jobDescription }}</span>
              </detail-list-item>
              <detail-list-item term="岗位类型" style="width: 100%; margin-top: 2%">
                <a-cascader style="width: 50%" v-if="ispd == 0" v-model="bba" @change="postonChange"
                  :options="jobTypeoptions" placeholder />
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
              <detail-list-item term="薪资待遇" v-if="!issalary" style="width: 100%; margin-top: 2%">
                <a-select @select="salarysele" style="width: 50%" v-if="ispd == 0" v-model="boothtext.salary">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in salaryoption" :key="d.id" :value="d.dataName">
                    {{ d.dataName }}
                  </a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.salary }}</span>
              </detail-list-item>
              <detail-list-item term="薪资待遇" v-if="issalary" style="width: 100%; margin-top: 2%">
                <div style="margin-top: -6 0px">
                  <a-input-group compact>
                    <a-select @change="handleinputgr" default-value="自定义">
                      <a-select-option value="自定义">自定义</a-select-option>
                      <a-select-option value="选择薪资">选择薪资</a-select-option>
                    </a-select>
                    <a-input style="width: 39%" placeholder="请输入薪资" v-model="boothtext.salary" />
                  </a-input-group>
                </div>
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
                <div v-if="!isageteue">
                  <a-select @select="agechang" style="width: 50%" v-if="ispd == 0" v-model="boothtext.ageRequirement">
                    <a-select-option value>请选择</a-select-option>
                    <a-select-option v-for="d in ageoption" :key="d.id" :value="d.dataName">
                      {{ d.dataName }}
                    </a-select-option>
                  </a-select>
                </div>
                <a-input-group v-if="isageteue" compact>
                  <a-select @change="handleinputage" style="width: 15%" default-value="自定义">
                    <a-select-option value="自定义">自定义</a-select-option>
                    <a-select-option value="选择年龄">选择年龄</a-select-option>
                  </a-select>
                  <a-input style="width: 35%" placeholder="请输入自定义年龄" v-model="boothtext.ageRequirement" />
                </a-input-group>
                <span v-if="ispd == 1">{{ boothtext.ageRequirement }}</span>
              </detail-list-item>
              <detail-list-item term="工作区域" style="width: 100%; margin-top: 2%">
                <a-cascader style="width: 50%" v-if="ispd == 0" :options="areaoption" v-model="areassq"
                  @change="areaonChange" placeholder="请选择区域" />
                <span v-if="ispd == 1">{{ boothtext.areaname }}</span>
              </detail-list-item>

              <!--<detail-list-item term="工作详址" style="width: 100%; margin-top: 2%">
                           <a-textarea
                            v-if="ispd == 0"
                            placeholder="请输入工作地址"
                            v-decorator.trim="['jobAddress', validatorRules.jobAddress]"
                          /> 
                          <a-input style="width: 50%" placeholder v-model="boothtext.jobAddress" v-if="ispd == 0"></a-input>
                          <span v-if="ispd == 1">{{ boothtext.jobAddress }}</span>
                        </detail-list-item>-->
              <detail-list-item term="性别要求" style="width: 100%; margin-top: 2%">
                <a-select style="width: 50%" v-if="ispd == 0" v-model="boothtext.genderRequirement">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option value="0">不限</a-select-option>
                  <a-select-option value="1">男</a-select-option>
                  <a-select-option value="2">女</a-select-option>
                </a-select>
                <span v-if="ispd == 1">{{ boothtext.genderRequirement }}</span>
              </detail-list-item>
              <detail-list-item term="特色服务" style="width: 100%; margin-top: 2%">
                <a-checkbox-group @change="groupChange" v-model="trya" v-if="ispd == 0" :options="tttoptions" />
                <span v-if="ispd == 1">{{ boothtext.special }}</span>
                <!-- !isAble -->
              </detail-list-item>

              <detail-list-item term="自定义特色服务" v-if="istrue" style="width: 100%; margin-top: 2%">
                <el-select @change="zdytsChange" style="width: 100%" v-model="tsfwvalue" @remove-tag="removetagchange"
                  multiple filterable allow-create default-first-option placeholder="">
                  <el-option v-for="item in tsfwoptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- !isAble -->
              </detail-list-item>

              <detail-list-item term="是否长期有效" style="width: 100%; margin-top: 2%">
                <a-radio-group v-model="boothtext.effectiveState" @change="radioonChange">
                  <a-radio :value="1">长期有效</a-radio>
                  <a-radio :value="2">仅此招聘会有效</a-radio>
                  <a-radio :value="3">限时有效</a-radio>
                </a-radio-group>
              </detail-list-item>
              <detail-list-item v-if="boothtext.effectiveState == 3" term="是否长期有效" style="width: 100%; margin-top: 2%">
                <a-range-picker :show-time="{ format: 'HH:mm' }"
                  v-if="boothtext.effectiveStartdate != null && boothtext.effectiveEnddate != null" format="YYYY-MM-DD"
                  style="width: 100%" :placeholder="['举办开始时间', '举办结束时间']" :value="[
                    this.moment(boothtext.effectiveStartdate, dateFormat),
                    this.moment(boothtext.effectiveEnddate, dateFormat),
                  ]" @change="dateonChange" />
                <a-range-picker
                  :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }" show-time
                  v-if="boothtext.effectiveStartdate == null || boothtext.effectiveEnddate == null" format="YYYY-MM-DD"
                  @change="dateonChange" />
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

    <div v-if="resstatic != '已过期'" class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 0.8rem; float: left">添加岗位</a-button> -->
      <a-button style="float: left" @click="synchronizationPost" type="primary">
        <a-icon type="swap" />同步日常岗位
      </a-button>
      <!-- <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <a-button v-if="exobj.buttonType == 1" style="margin-right: 0.8rem" @click="touplist()">关闭</a-button>
      <a-button style="margin-right: 0.8rem" @click="handleEdit(2)" type="primary">保存</a-button>
      <!-- <a-button style="margin-right: 0.8rem" @click="Singlesubmission(0)" type="primary">单个提交审核</a-button> -->
      <a-button style="margin-right: 0.8rem" @click="Multiplesub(0)" type="primary">多个提交审核</a-button>

      <a-button @click="Oneclicksubmission()" type="primary">一键提交审核</a-button>
      <!-- <a-button style="margin-right: .8rem" @click="handleCancel">取消</a-button> -->
      <!-- </a-popconfirm> -->
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
import {
  addUser,
  editUser,
  queryUserRole,
  queryall,
  getentpostjobfairList, //查看岗位
  entpsottoeditenable, //启用或禁用
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
const DetailListItem = DetailList.Item

export default {
  name: 'UserModal',
  mixins: [JeecgListMixin],
  components: {
    JImageUpload,
    JSelectPosition,
    DetailList,
    DetailListItem,
  },

  data() {
    this.dateFormat = 'YYYY/MM/DD'
    return {
      SignupformData: {
        createBy: '',
        createTime: '',
        enterpriseInfoId: '',
        id: '',
        jobFairId: '',
        updateBy: '',
        updateTime: '',
      },
      selectedRowKeys: [],
      hasSelected: '',
      resstatic: '',
      ischang: false,
      areaoption: [], //区域
      ispd: 1,
      isageteue: false,
      isAble: false,
      bba: [],
      areassq: [],
      areaId: '', //区域
      areaname: '', //区域
      xlpostname: '', //岗位
      xlpostId: '', //岗位
      issalary: false, //薪资
      istrue: false,
      tsfwvalue: [],
      tsfwoptions: [],
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
      trya: [],
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
        area: '',
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
          // key: 'number',
          with: 30,
        },
        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'examinestate',
          // key: 'number',
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
      delelist: []
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
  mounted() { },
  methods: {
    addEnJob() { },
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
    // 复选框选中
    onSelectChange(electedRowKeys, selectedRows) {
      this.delelist = selectedRows
      this.selectedRowKeys = electedRowKeys
      console.log('复选框选中', this.delelist)
      // this.ids = this.selectedRowKeys
    },
    Multiplesub() {
      if (this.dataSource.length == 0) {
        this.$message.warning('无岗位数据')
        return
      }
      else if (this.delelist.length > 0) {
        for (var i = 0; i < this.delelist.length; i++) {
          if (this.delelist[i].examinestate == "保存") {
           break
          }else if(i==this.delelist.length-1){
            this.$message.warning('请编辑岗位并保存后提交审核')
            return
          }
        }
      }
      console.log(this.delelist)
      if (this.delelist.length == 0) {
        this.$message.warning('无法提交，请选中需要提交的岗位')
        return
      }
      if (this.exobj.buttonType == 1) {
        var that = this
        var departn = localStorage.getItem('departId')
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn },
        })
          .then((response) => {
            console.log('企业信息', response.result)


            this.SignupformData.createBy = store.getters.userInfo.username
            this.SignupformData.createTime = this.getNowFormatDate()
            this.SignupformData.enterpriseInfoId = response.result.enterpriseIds
            this.SignupformData.jobFairId = that.exobj.id

            console.log('报名信息', this.SignupformData)
            this.axios({
              method: 'post',
              url: '/hall/entryenterprise/entry',
              headers: {},
              params: {},
              data: this.SignupformData,
            })
              .then((restt) => {
                this.axios({
                  method: 'get',
                  url: '/hall/booth/submitchoosebooth',
                  headers: {},
                  params: { enterpriseinfoid: response.result.enterpriseIds, jobfairid: that.exobj.id },
                }).then((response2) => {
                  // if (restt.success) {
                  var departn = localStorage.getItem('departId')
                  // console.log('部门信息', departn)

                  console.log('企业信息', response.result)
                  console.log('招聘会信息', this.exobj.id)
                  var idsjobids = ''
                  for (var i = 0; i < this.delelist.length; i++) {
                    if (i == this.delelist.length - 1) {
                      idsjobids += this.delelist[i].id
                    } else {
                      idsjobids += this.delelist[i].id + ','
                    }
                  }
                  console.log(idsjobids, '多选提交参数')
                  this.axios({
                    method: 'get',
                    url: '/hall/jobfairposition/submitreviewpostformultiple',
                    headers: {},
                    params: {
                      enterpriseinfoid: response.result.enterpriseIds,
                      CreateBy: store.getters.userInfo.username,
                      ids: idsjobids,
                      jobFairId: this.exobj.id,
                    },
                  })
                    .then((response) => {
                      console.log(response)
                      if (response.success) {
                        // this.$message.success(response.message)
                        this.$message.success('提交成功！')
                        this.ispd = 1
                        this.loadData(1)
                        this.$emit('ok')
                        this.touplist()
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
                      this.$message.warning(response.message)

                      console.log(error)
                    })

                  // } else {
                  //   this.$message.warning(restt.message)
                  // }
                })
                  .catch(function (error) {
                    // this.$message.error(res.message || '上传失败');
                    // data.onError() // 返回报错
                    console.log(error)
                  })
              })
          })
          .catch(function (error) {
            // this.$message.error(res.message || '上传失败');
            // data.onError() // 返回报错
            console.log(error)
          })
      } else {
        console.log('选择长度', this.delelist)
        var departn = localStorage.getItem('departId')
        // console.log('部门信息', departn)
        if (this.delelist.length == 0) {
          this.$message.warning('无法提交，请选中需要提交的岗位')
        } else {
          this.axios({
            method: 'get',
            url: '/sys/getenterprisebyuser',
            headers: {},
            params: { userid: store.getters.userInfo.id, departid: departn },
          })
            .then((response) => {
              console.log('企业信息', response.result)
              console.log('招聘会信息', this.exobj.id)
              var idsjobids = ''
              for (var i = 0; i < this.delelist.length; i++) {
                if (i == this.delelist.length - 1) {
                  idsjobids += this.delelist[i].id
                } else {
                  idsjobids += this.delelist[i].id + ','
                }
              }
              console.log(idsjobids, '多选提交参数')
              this.axios({
                method: 'get',
                url: '/hall/jobfairposition/submitreviewpostformultiple',
                headers: {},
                params: {
                  enterpriseinfoid: response.result.enterpriseIds,
                  CreateBy: store.getters.userInfo.username,
                  ids: idsjobids,
                  jobFairId: this.exobj.id,
                },
              })
                .then((response) => {
                  console.log(response)
                  if (response.success) {
                    // this.$message.success(response.message)
                    this.$message.success('提交成功！')
                    this.ispd = 1
                    this.loadData(1)
                    this.$emit('ok')
                    this.touplist()
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
                  this.$message.warning(response.message)

                  console.log(error)
                })
            })
            .catch(function (error) {
              // this.$message.error(res.message || '上传失败');
              data.onError() // 返回报错
              console.log(error)
            })
        }
      }
    },
    Singlesubmission(e) {
      if (this.boothtext.id == undefined || this.boothtext.id == '') {
        this.$message.warning('无法提交，请选中需要提交的岗位')
      } else {
        console.log('单个提交2', this.boothtext)
        this.axios({
          method: 'get',
          url: '/hall/jobfairposition/submitreviewpostforone',
          headers: {},
          params: { id: this.boothtext.id, CreateBy: store.getters.userInfo.username },
        })
          .then((response) => {
            console.log(response)
            if (response.success == true) {
              // this.$message.success(response.message)
              this.$message.success('提交成功！')
              this.ispd = 1
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
            this.$message.warning(response.message)

            console.log(error)
          })
      }
    },
    Oneclicksubmission() {
      if (this.dataSource.length == 0) {
        this.$message.warning('无岗位数据')
        return

      } else if (this.dataSource.length > 0) {
        for (var i = 0; i < this.dataSource.length; i++) {
          if (this.dataSource[i].examinestate == "保存") {
            break;
          }else if(i==this.dataSource.length-1){
            this.$message.warning('请编辑岗位并保存后提交审核')
            return
          }
        }
      }
      if (this.exobj.buttonType == 1) {
        var that = this
        var departn = localStorage.getItem('departId')
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn },
        })
          .then((response) => {
            console.log('企业信息', response.result)


            this.SignupformData.createBy = store.getters.userInfo.username
            this.SignupformData.createTime = this.getNowFormatDate()
            this.SignupformData.enterpriseInfoId = response.result.enterpriseIds
            this.SignupformData.jobFairId = that.exobj.id

            console.log('报名信息', this.SignupformData)
            this.axios({
              method: 'post',
              url: '/hall/entryenterprise/entry',
              headers: {},
              params: {},
              data: this.SignupformData,
            })
              .then((restt) => {
                // if (restt.success) {
                console.log('that.exobj', this.exobj)
                this.axios({
                  method: 'get',
                  url: '/hall/booth/submitchoosebooth',
                  headers: {},
                  params: { enterpriseinfoid: response.result.enterpriseIds, jobfairid: that.exobj.id },
                }).then((response2) => {
                  console.log('企业信息', response.result)
                  this.axios({
                    method: 'get',
                    url: '/hall/jobfairposition/submitreviewpostforover',
                    headers: {},
                    params: {
                      enterpriseinfoid: response.result.enterpriseIds,
                      jobFairId: this.exobj.id,
                      CreateBy: store.getters.userInfo.username,
                    },
                  })
                    .then((res) => {
                      console.log('一键提交', res)
                      if (res.success) {
                        this.dataSource = []
                        this.loadData(1)
                        this.$message.success(res.message)
                        this.touplist()
                      } else {
                        this.loadData(1)
                        this.$message.warning(res.message)
                      }
                    })
                    .catch(function (error) {
                      // this.$message.error(res.message || '上传失败');
                      data.onError() // 返回报错
                      console.log(error)
                    })

                  // } else {
                  //   this.$message.warning(restt.message)
                  // }
                })
                  .catch(function (error) {
                    // this.$message.error(res.message || '上传失败');
                    // data.onError() // 返回报错
                    console.log(error)
                  })
              })
          })
          .catch(function (error) {
            // this.$message.error(res.message || '上传失败');
            // data.onError() // 返回报错
            console.log(error)
          })
      } else {
        console.log('that.exobj', this.exobj)
        var departn = localStorage.getItem('departId')
        console.log('部门信息', departn)
        console.log('userID', store.getters.userInfo.id)
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn },
        })
          .then((response) => {
            console.log('企业信息', response.result)
            this.axios({
              method: 'get',
              url: '/hall/jobfairposition/submitreviewpostforover',
              headers: {},
              params: {
                enterpriseinfoid: response.result.enterpriseIds,
                jobFairId: this.exobj.id,
                CreateBy: store.getters.userInfo.username,
              },
            })
              .then((res) => {
                console.log('一键提交', res)
                if (res.success) {
                  this.dataSource = []
                  this.loadData(1)
                  this.$message.success(res.message)
                  this.touplist()
                } else {
                  this.loadData(1)
                  this.$message.warning(res.message)
                }
              })
              .catch(function (error) {
                // this.$message.error(res.message || '上传失败');
                data.onError() // 返回报错
                console.log(error)
              })
          })
          .catch(function (error) {
            // this.$message.error(res.message || '上传失败');
            data.onError() // 返回报错
            console.log(error)
          })
      }
    },
    removetagchange(v, p) {
      console.log('移除1', v)
      console.log('移除2', p)
    },
    handleinputage(value) {
      console.log('薪资下拉输入框', value)
      if (value == '选择年龄') {
        this.isageteue = false
        this.form.validateFields((err, values) => {
          let formData = Object.assign(this.model, values)
          console.log('清空下拉输入框', formData)
          this.model.salary = '3K以下'
        })
      } else {
        this.isageteue = true
      }
    },
    agechang(v, l) {
      if (v == '自定义') {
        this.isageteue = true
        console.log('年龄选中', v)
      } else {
        this.isageteue = false
      }
    },
    handleinputgr(value) {
      console.log('薪资下拉输入框', value)
      if (value == '选择薪资') {
        this.issalary = false
        this.form.validateFields((err, values) => {
          let formData = Object.assign(this.model, values)
          console.log('清空下拉输入框', formData)
          this.model.salary = '3K以下'
        })
      } else {
        this.issalary = true
      }
    },
    salarysele(v, l) {
      console.log('薪资选中', v)
      if (v == '其他') {
        this.issalary = true
      } else {
        this.issalary = false
      }
    },
    zdytsChange(res) {
      console.log('触发', res)
      this.ischang = true
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
      this.ischang = true
    },
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
      // console.log('区域字段1', op[op.length - 1].value)
      console.log('区域字段2', areaobj)
      console.log('区域id', areaidstr)

      this.areaId = areaidstr
      this.areaname = areaobj
      // this.areaId=op[op.length].value
      // op[op.length].value
    },
    getareaList() {
      let that = this
      getAction(that.url.arealist).then((res) => {
        // console.log("省市区", res.result);
        that.areaoption = res.result
        // that.loadData()
      })
    },
    //同步日常岗位事件
    synchronizationPost() {
      console.log('同步', this.exobj)
      this.$confirm({
        title: '是否同步',
        content: `确定同步日常岗位吗?`,
        centered: true,
        onOk: () => {
          //待审核执行

          // console.log('待审核跳转', this.enObj)
          var departn = localStorage.getItem('departId')
          console.log('部门信息', departn)
          console.log('userID', store.getters.userInfo.id)
          this.axios({
            method: 'get',
            url: '/sys/getenterprisebyuser',
            headers: {},
            params: { userid: store.getters.userInfo.id, departid: departn },
          })
            .then((response) => {
              console.log('企业信息', response.result)
              this.axios({
                method: 'get',
                url: 'hall/jobfairposition/synchropost',
                headers: {},
                params: {
                  enterpriseinfoid: response.result.enterpriseIds,
                  CreateBy: store.getters.userInfo.username,
                  jobFairId: this.exobj.id,
                },
              })
                .then((response) => {
                  if (response.code == 200) {
                    this.dataSource = []
                    this.loadData(1)
                    this.$message.success(response.message)
                  } else {
                    this.loadData(1)
                    this.$message.warning(response.message)
                  }

                  that.close()
                  that.$emit('ok')
                  console.log(response)
                })
                .catch(function (error) {
                  this.$message.warning(response.message)

                  console.log(error)
                })
            })
            .catch(function (error) {
              // this.$message.error(res.message || '上传失败');
              data.onError() // 返回报错
              console.log(error)
            })
        },
      })
    },
    //添加岗位
    handleAdd() {
      this.ispd = 0
      this.addis = 1
      this.boothtext = {}
      this.trya = []
    },
    //启用
    handleEnable(idr) {
      const that = this
      console.log('启用' + idr)
      that.enableParam.id = idr
      that.enableParam.enable = 1
      entpsottoeditenable(that.enableParam).then((res) => {
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
      entpsottoeditenable(that.enableParam).then((res) => {
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
    postonChange(res, op) {
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
        url: '/hall/jobfairposition/delete',
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
      this.istrue = false
      this.tsfwvalue = []
      this.trya = []
      var str = rowrecord.special
      if (str != null) {
        var arrayList = str.split(',')
        this.trya = arrayList
        console.log('逗号分割', arrayList)
        console.log('逗号分割B', this.Boptions)
        // let arrA = [1, 2, 3]
        // let arrB = [3, 4, 5, 6]
        let c = []
        arrayList.forEach((item) => {
          if (arrayList.includes(item) && !this.Boptions.includes(item)) {
            c.push(item)
          }
        })

        console.log('不存在的', c) //[1,2]
        if (c.length > 0) {
          this.tsfwvalue = c
          this.istrue = true
        }
      }
      if (rowrecord.bdmAreaInfoId != null) {
        var areastr = rowrecord.bdmAreaInfoId
        this.areassq = areastr.split(',')
        console.log('区域', this.areassq)
      }

      if (rowrecord.jobTypeId != null) {
        var postareastr = rowrecord.jobTypeId
        this.bba = postareastr.split(',')
        console.log('岗位类型', this.bba)
      }
      // this.xlpostId = postidstr
      // this.xlpostname = postobj
      // this.bba= ['541','544']
      //   if (rowrecord.area != '' && rowrecord.area != null && rowrecord.area != undefined) {
      //   console.log('区域分割前',rowrecord.area)
      //   var areaobj = rowrecord.area.split('/')
      //   this.areassq = areaobj
      //   console.log("区域分割后",this.areassq);
      // }
    },
    handleEdit(e) {
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
          var departn = localStorage.getItem('departId')
          console.log('部门信息', departn)
          console.log('userID', store.getters.userInfo.id)
          this.axios({
            method: 'get',
            url: '/sys/getenterprisebyuser',
            headers: {},
            params: { userid: store.getters.userInfo.id, departid: departn },
          })
            .then((response) => {
              console.log('企业信息', response.result.enterpriseIds)
              this.boothtext.enterpriseInfoId = response.result.enterpriseIds
              // this.boothtext.special = addattr
              this.boothtext.examinestate = e
              // this.boothtext.examinestate=e
              this.boothtext.bdmAreaInfoId = this.areaId
              this.boothtext.area = this.areaname
              this.boothtext.jobTypeId = this.xlpostId
              this.boothtext.jobType = this.xlpostname
              this.boothtext.createBy = store.getters.userInfo.username
              this.boothtext.jobFairId = this.exobj.id

              if (this.trya.length < 0 && this.tsfwvalue.length < 0) {
                that.$message.warning('请输入或选择特色福利待遇')
                return
              }
              var attr = ''
              if (this.trya.length > 0) {
                for (var a = 0; a < this.trya.length; ++a) {
                  if (this.trya[a] != '其它') {
                    console.log('是否是其他', this.trya[a])
                    attr += this.trya[a] + ','
                  }
                }
                // console.log('其他长度', this.tsfwvalue.length)
                if (this.tsfwvalue.length == 0 && attr.length > 0) {
                  attr = attr.substr(0, attr.length - 1)
                }
              }
              // console.log('特色服务1111', attr)
              var addtsfw = ''
              if (this.tsfwvalue.length > 0) {
                for (var ts = 0; ts < this.tsfwvalue.length; ++ts) {
                  // console.log('循环', addtsfw)
                  addtsfw += this.tsfwvalue[ts] + ','
                }

                if (addtsfw.length > 0) {
                  addtsfw = addtsfw.substr(0, addtsfw.length - 1)
                }
              }
              attr += addtsfw
              // console.log('追加特色服务', addtsfw)
              console.log('特色服务', attr)
              this.boothtext.special = attr

              // console.log('新增保存对象', this.exobj)
              console.log('新增保存对象', this.boothtext)
              this.axios({
                method: 'post',
                url: '/hall/jobfairposition/addPostRelease',
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
            })
            .catch(function (error) {
              console.log(error)
            })
        } else if (this.addis == 0) {
          var attr = ''
          for (var a = 0; a < this.trya.length; ++a) {
            console.log('循环', attr)
            attr += this.trya[a] + ','
          }
          this.boothtext.bdmAreaInfoId = this.areaId
          this.boothtext.area = this.areaname
          this.boothtext.jobTypeId = this.xlpostId
          this.boothtext.jobType = this.xlpostname
          console.log('岗位修改。。。。。。', this.boothtext)
          // if (attr.length > 0) {
          //   attr = attr.substr(0, attr.length - 1)
          // }
          // console.log('特色服务22', attr)
          // this.boothtext.special = attr
          // console.log('保存', this.boothtext)
          if (this.boothtext.enable == '已启用') {
            this.boothtext.enable = 1
          } else if (this.boothtext.enable == '未启用') {
            this.boothtext.enable = -1
          }

          // if (this.boothtext.examinestate == '审核通过') {
          //   this.boothtext.examinestate = 1
          // } else if (this.boothtext.examinestate == '审核未通过') {
          //   this.boothtext.examinestate = -1
          // } else if (this.boothtext.examinestate == '待审核') {
          //   this.boothtext.examinestate = 0
          // } else if (this.boothtext.examinestate == '') {
          //   this.boothtext.examinestate = -2
          // } else if (this.boothtext.examinestate == '保存') {
          //   this.boothtext.examinestate = 2
          // }
          var attr = ''
          console.log('保存特色服务', this.trya)
          if (this.trya.length > 0) {
            for (var a = 0; a < this.trya.length; ++a) {
              if (this.trya[a] != '其它') {
                console.log('是否是其他 ', this.trya[a])
                attr += this.trya[a] + ','
              }
            }

            if (this.ischang == false) {
              console.log('特色服务长度减一', attr)
              attr = attr.substr(0, attr.length - 1)
            }
          }
          // var addtsfw = ''
          // if (this.tsfwvalue.length > 0) {
          //   for (var ts = 0; ts < this.tsfwvalue.length; ++ts) {
          //     console.log('循环', addtsfw)
          //     addtsfw += this.tsfwvalue[ts] + ','
          //   }

          //   if (addtsfw.length > 0) {
          //     addtsfw = addtsfw.substr(0, addtsfw.length - 1)
          //   }
          // }
          console.log('特色服务1', this.trya)
          console.log('特色服务2', this.tsfwvalue)

          let itc = []
          this.tsfwvalue.forEach((item) => {
            if (this.tsfwvalue.includes(item) && !this.trya.includes(item)) {
              itc.push(item)
            }
          })
          console.log('是或存在', itc.length) //[1,2]
          if (itc.length == 0) {
            attr = attr.substr(0, attr.length - 1)
          }
          // if (attr.length > 0) {
          //   attr = attr.substr(0, attr.length - 1)
          // }
          var addtsfw = ''
          if (itc.length > 0) {
            for (var ts = 0; ts < itc.length; ++ts) {
              // console.log('循环', addtsfw)
              addtsfw += itc[ts] + ','
            }

            if (addtsfw.length > 0) {
              addtsfw = addtsfw.substr(0, addtsfw.length - 1)
            }
          }
          attr += addtsfw
          // console.log('追加特色服务2222', attr)
          // console.log('追加特色服务', addtsfw)
          this.boothtext.special = attr
          this.boothtext.examinestate = e
          this.boothtext.updateBy = store.getters.userInfo.username
          console.log('单个提交1', this.boothtext)
          this.axios({
            method: 'post',
            url: '/hall/jobfairposition/editById',
            headers: {},
            data: this.boothtext,
          })
            .then((response) => {
              console.log(response)
              if (response.success == true) {
                // this.$message.success(response.message)
                this.$message.success('提交成功！')
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
      var departn = localStorage.getItem('departId')
      console.log('部门信息', departn)
      console.log('userID', store.getters.userInfo.id)
      this.axios({
        method: 'get',
        url: '/sys/getenterprisebyuser',
        headers: {},
        params: { userid: store.getters.userInfo.id, departid: departn },
      })
        .then((response) => {
          console.log('企业信息', response.result)
          let params = this.getQueryParams() //查询条件
          params.enterpriseinfoid = response.result.enterpriseIds
          console.log('table参数', params)
          if (params.displaysign == '请选择') {
            params.displaysign = -1
          }
          //  var logoAddressUrl='http://120.79.207.87:8091';
          getentpostjobfairList(params).then((res) => {
            if (res.success) {
              console.log('列表数据', res.result.records)
              for (var i = 0; i < res.result.records.length; ++i) {
                // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '审核通过' : '审核未通过'
                if (res.result.records[i].examinestate == -1) {
                  res.result.records[i].examinestate = '审核不通过'
                } else if (res.result.records[i].examinestate == 0) {
                  res.result.records[i].examinestate = '待审核'
                } else if (res.result.records[i].examinestate == 1) {
                  res.result.records[i].examinestate = '审核通过'
                } else if (res.result.records[i].examinestate == 2) {
                  res.result.records[i].examinestate = '保存'
                }
                res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
              }
              this.dataSource = res.result.records
              console.log('列表数据2', this.dataSource)
              this.ipagination.total = res.result.total
            }
          })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          data.onError() // 返回报错
          console.log(error)
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
            this.boothtext.areaname = trecord.area
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
      console.log('this.url.queryTenantList', this.url.queryTenantList)
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
      console.log('发布岗位1', record)
      this.resstatic = record.entrytimeOverdue
      this.ischang = false
      this.issalary = false
      let that = this
      this.ispd = 1
      this.istrue = false
      // console.log('职位信息', record.enterpriseid)
      console.log('用户信息', store.getters.userInfo)
      // console.log('用户信息22', store.getters.enterpriseInfoobj)

      getAction(this.url.arealist).then((res) => {
        // console.log("省市区", res.result);
        that.areaoption = res.result
        // that.loadData()
        if (record.bdmAreaInfoId != null) {
          var areastr = record.bdmAreaInfoId
          this.areassq = areastr.split(',')
        }
      })
      if (record.area != '' && record.area != null && record.area != undefined) {
        console.log('区域分割前')
        var areaobj = record.area.split('/')
        this.areassq = areaobj
        // console.log("区域分割后",);
      }
      this.trya = []
      this.tsfwvalue = []
      var str = record.special
      if (str != null) {
        var arrayList = str.split(',')
        this.trya = arrayList
        console.log('逗号分割', arrayList)
        console.log('逗号分割B', this.Boptions)
        // let arrA = [1, 2, 3]
        // let arrB = [3, 4, 5, 6]
        let c = []
        arrayList.forEach((item) => {
          if (arrayList.includes(item) && !this.Boptions.includes(item)) {
            c.push(item)
          }
        })

        console.log('不存在的', c) //[1,2]
        if (c.length > 0) {
          this.tsfwvalue = c
          this.istrue = true
          console.log('是否解开禁用', this.istrue)
        }
      }
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
      that.queryParam.jobfairid = record.id
      // that.queryParam.examinestate = 1
      // console.log('企业id', that.queryParam.enterpriseInfoId)
      // console.log('招聘会id', that.queryParam.jobFairId)
      // console.log('招聘会id', that.queryParam.jobFairId)
      that.checkedDepartNameString = ''
      that.loadData()
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

/* @import './Determine'; */
</style>