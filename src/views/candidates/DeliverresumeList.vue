<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="投递企业" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select
                show-search
                placeholder="输入企业名称"
                option-filter-prop="children"
                :options="listforlebel"
                :filter-option="filterOptiont"
                v-model="queryParam.enterpriseInfoId"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
              <!-- <a-input placeholder v-model="queryParam.enterprisename"></a-input> -->
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <a-form-item label="性别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.gender" placeholder="请选择性别">
                <a-select-option value>请选择</a-select-option>
                <a-select-option value="男">男性</a-select-option>
                <a-select-option value="女">女性</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="学历" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.education">
                <a-select-option v-for="d in educationlist" :key="d.dataName" :value="d.dataName">{{
                  d.dataName
                }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <!-- <a-form-item label="投递岗位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.postname"></a-input>
            </a-form-item> -->
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator" style="border-top: 5px">
        <a-button @click="exportData" type="primary" icon="download">导出简历汇总</a-button>
      </div>
      <a-table
        bordered
        ref="table"
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="seeResume(record)">查看简历</a>
          <a-divider v-if="record.photographResumeAddress != null" type="vertical" />
          <a v-if="record.photographResumeAddress != null" @click="seeEnclosure(record)">查看附件</a>
          <!-- <a-divider type="vertical" /> -->
          <!-- <a @click="confirm(record)">{{record.enable==-1?'启用':'禁用'}}</a> -->
        </span>
      </a-table>
    </div>
    <resume-info ref="resumeinfo"></resume-info>
    <enclo-sure ref="enclosure"></enclo-sure>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ResumeInfo from './ResumeInfo'
import EncloSure from './Enclosure'
import { getAction } from '@/api/manage'
import store from '@/store'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import Vue from 'vue'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { ResumeInfo, EncloSure },
  data() {
    return {
      visible: false,
      statelable: '启用',
      listforlebel: [], //企业下拉
      // 查询条件
      queryParam: {
        name: '',
        idcard: '',
        gender: '',
        education: '',
        postname: '',
        enterprisename: '',
        enterpriseInfoId: '',
      },
      // 表头
      columns: [
        {
          title: '投递企业',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 230,
        },
        {
          title: '投递岗位',
          align: 'center',
          dataIndex: 'postName2',
          width: 170,
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'name',
          width: 90,
        },
        {
          title: '性别',
          align: 'center',
          dataIndex: 'gender',
          width: 50,
        },
        {
          title: '年龄',
          align: 'center',
          dataIndex: 'age',
          width: 80,
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'phone',
          width: 130,
        },
        {
          title: '投递时间',
          align: 'center',
          dataIndex: 'submitResumeTime',
          width: 130,
        },
        // {
        //   title: '工作经验',
        //   align: 'center',
        //   dataIndex: 'participateInWork',
        //   width: 150,
        //   customRender: (value, row, index) => {
        //     return this.monthDayDiff(value, row.workingHoursEnd)
        //   }
        // },
        // {
        //   title: '简历完成度',
        //   align: 'center',
        //   dataIndex: 'completionRate',
        //   customRender: (value, row, index) => {
        //     var returnvalue = ''
        //     if (value == 0 || value == null) {
        //       returnvalue = 0
        //     } else {
        //       returnvalue = value
        //     }
        //     return returnvalue + '%'
        //   },
        //   width: 150,
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 200,
        },
      ],
      dict: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      educationlist: [],
      url: {
        educationlist: '/base/list?type=education&pageNo=1&pageSize=1000',
        list: '/app/interview/receivelist',
        enable: '/hall/curriculumvitae/enable',
        entlist: '/hall/enterprise/listforlebel',
      },
    }
  },
  created() {
    this.getEducationlist()
  },
  computed: {},
  mounted() {
    console.log('登录信息', store.getters.userInfo)
    this.getentList()
  },
  methods: {
    exportData() {
      // console.log("招聘会ID",this.queryParam.jobfairId);
      var that = this,
        queryParam = that.queryParam
      console.log('查询条件', queryParam)
      // return
      this.$http({
        url:
          '/app/interview/exportXlsReceiveResume?enterpriseInfoId=' +
          queryParam.enterpriseInfoId +
          '&gender=' +
          queryParam.gender +
          '&postname=' +
          queryParam.postname,
        method: 'get',
        responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
        headers: {
          'Content-Type': 'application/json',
        },
        // data: {
        //   jobfairid:rec.id
        // },
      })
        .then((res) => {
          //创建一个隐藏的a连接，
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' })
          link.style.display = 'none'
          //设置连接
          link.href = URL.createObjectURL(blob)
          link.download = '企业收到简历汇总信息表'
          document.body.appendChild(link)
          //模拟点击事件
          link.click()
          //console.log("res",res);
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //企业下拉
    //企业名称下拉
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    handleBlur() {
      console.log('blur')
    },
    handleFocus() {
      console.log('focus')
    },
    getentList() {
      let that = this
      getAction(that.url.entlist).then((res) => {
        that.listforlebel = res.result
        that.loadData()
      })
    },
    //查看附件
    seeEnclosure(record) {
      this.$refs.enclosure.showDrawer(record)
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    getEducationlist() {
      getAction(this.url.educationlist).then((res) => {
        this.educationlist = res.result.records
      })
    },
    monthDayDiff(starttime, endtime) {
      // this指针

      let _this = this
      let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
      let start = new Date(starttime)
      let end = new Date(this.getNowFormatDate())
      let year = end.getFullYear() - start.getFullYear()
      let month = end.getMonth() - start.getMonth()
      let day = end.getDate() - start.getDate()
      if (month < 0) {
        year--
        month = end.getMonth() + (12 - start.getMonth())
      }
      if (day < 0) {
        month--
        let index = flag.findIndex((temp) => {
          return temp === start.getMonth() + 1
        })
        let monthLength
        if (index <= 6) {
          monthLength = 31
        } else if (index > 6 && index <= 10) {
          monthLength = 30
        } else {
          monthLength = 28
        }
        day = end.getDate() + (monthLength - start.getDate())
      }
      var returnstr = month >= 6 ? `${year + 1}` + '年' : year + '年'
      if (year == 0) {
        returnstr = month >= 6 ? '1年' : '0年'
      }
      return returnstr
    },
    //当前时间
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
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' '
      // +
      // date.getHours() +
      // seperator2 +
      // date.getMinutes() +
      // seperator2 +
      // date.getSeconds()
      return currentdate
    },
    //状态确认框
    confirm(record) {
      let that = this
      console.log(record)
      let enable = 1
      let content = ''
      if (record.enable == 1) {
        enable = -1
        content = '确认要把状态改为禁用吗？'
      } else {
        enable = 1
        content = '确认要把状态改为启用吗？'
      }
      this.$confirm({
        title: 'Info',
        content: content,
        okText: '确认',
        cancelText: '取消',
        onOk() {
          getAction(that.url.enable, { id: record.id, enable: enable }).then((res) => {
            that.loadData()
            that.$notification['success']({
              message: '通知',
              duration: 2,
              description: '修改成功',
            })
          })
        },
        onCancel() {
          that.$notification['info']({
            message: '通知',
            duration: 2,
            description: '已取消',
          })
        },
      })
    },
    //取消选择
    cancelDict() {
      this.dict = ''
      this.visible = false
      this.loadData()
    },
    //查看简历
    seeResume(record) {
      console.log(record)
      this.$refs.resumeinfo.showDrawer(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.name = ''
      that.queryParam.idcard = ''
      that.queryParam.gender = ''
      that.queryParam.education = ''
      that.loadData(this.ipagination.current)
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>