<template>
  <a-modal
    :width="drawerWidth"
    :title="title"
    :visible="innerVisible"
    @cancel="handleCancel"
    cancelText="关闭"
    :okButtonProps="{style:{display:'none'}}"
  >
    <a-card :bordered="false">
      <!-- 左侧面板 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" style="margin-left:10%" @keyup.enter.native="searchQuery">
          <a-row :gutter="50">
            <a-col :md="10" :sm="8">
              <a-form-item label="企业名称" :labelCol="{span: 7}" :wrapperCol="{span: 16, offset: 1}">
                <a-input placeholder="请输入企业名称" v-model="queryParam.enterpriseName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="8">
            <a-form-item label="所属区域" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.area">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in areaoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                  }}</a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
            <a-col :md="10" :sm="8">
              <a-form-item label="所属行业" :labelCol="{span: 7}" :wrapperCol="{span: 16, offset: 1}">
                <!-- <a-input placeholder="请输入行业名称" v-model="queryParam.trade"></a-input> -->
                <a-select v-model="queryParam.trade">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in industryoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="8">
            <a-form-item label="单位性质" :labelCol="{span: 6}" :wrapperCol="{span: 14, offset: 1}">
              <a-select v-model="queryParam.trade">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in natureoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                  }}</a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
            <a-col :md="7" :sm="8">
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button
                  type="primary"
                  @click="searchReset"
                  icon="reload"
                  style="margin-left: 8px"
                >重置</a-button>
              </span>
            </a-col>
          </a-row>
          
        </a-form>
        <a-table
          ref="table"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          @change="handleTableChange"
          bordered
        >
          <span slot="action" slot-scope="text, record">
            <a @click="handleEdit(record)">
              <a-icon type="redo" />绑定
            </a>
          </span>
        </a-table>
      </div>
      <!-- <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal> -->
      <!-- 字典类型 -->
      <!-- <dict-item-list ref="dictItemList"></dict-item-list> -->
      <!-- <dict-delete-list ref="dictDeleteList" @refresh="() =>loadData()"></dict-delete-list> -->
    </a-card>
  </a-modal>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'rowIndex',
    width: 120,
    align: 'center',
    customRender: function (t, r, index) {
      return parseInt(index) + 1
    },
  },
  {
    title: '企业名称',
    align: 'left',
    width: 240,
    dataIndex: 'enterpriseName',
  },
  // {
  //   title: '创建人',
  //   align: "left",
  //   width: 200,
  //   dataIndex: 'createBy',
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
]
import { putAction, deleteAction, getFileAccessHttpUrl } from '@/api/manage'
import { jobfairList, jobenterpriseList, getEditById } from '@/api/api'
import { filterObj } from '@/utils/util'
import Vue from 'vue'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import { getAction } from '@/api/manage'
import store from '@/store'
// 高度封装的请求，请使用 superRequest.call(this,{}) 的方式调用
function superRequest(options) {
  this.loading = !!options.loading
  options.promise
    .then((res) => {
      if (res.success && typeof options.success === 'function') {
        options.success(res)
      } else {
        throw new Error(res.message)
      }
    })
    .catch((e) => {
      console.error('查询已删除的用户失败：', e)
      this.$message.warning('查询已删除的用户失败：' + (e.message || e))
    })
    .finally(() => {
      this.loading = false
    })
}

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: {},
  data() {
    return {
      drawerWidth: '70%',
      description: '',
      areaoption: [], //区域
      industryoption: [], //行业
      natureoption:[],
      innerVisible: false,
      // 查询条件
      queryParam: {
        enterpriseName: '',
        area:'',
        trade:'',
        nature:''
      },
      boothInfoEntity: {},
      jsonadd: {},
      jobfairId: '',
      title: '绑定企业',
      columns,
      dataSource: [],
      dict: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        list: '/base/list?type=area',
        delete: '/base/area/delete',
        exportXlsUrl: 'sys/dict/exportXls',
        importExcelUrl: 'sys/dict/importExcel',
        refleshCache: 'sys/dict/refleshCache',
        queryAllDictItems: 'sys/dict/queryAllDictItems',
        industrychildren: '/base/list?type=industryname',
        natureolist:'/base/list?type=nature'
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  created() {
    this.loadData()
  },
mounted() {
  console.log("111111122222");
    this.getareaList()
    this.getindustryoptList()
    this.getnatureoption()
  },
  methods: {
    //区域下拉框
    getareaList() {
      let that = this
      
      getAction(that.url.list).then((res) => {
        that.areaoption = res.result.records
        console.log("区域：",res);
        that.loadData()
      })
    },
    
    //区域下拉框
    getnatureoption() {
      let that = this
      getAction(that.url.natureolist).then((res) => {
        that.natureoption = res.result.records
        that.loadData()
      })
    },
    //区域下拉框
    getindustryoptList() {
      let that = this
      getAction(that.url.industrychildren).then((res) => {
        that.industryoption = res.result.records
        that.loadData()
      })
    },
    //行业下拉
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
    handleEditonr(record){
      this.$emit('eChange', record)
      console.log("1can",record)
      record.id=record.jobfairid
      console.log("1can",record)
    },
    handleEdit(record) {
      var recordID = record.enterpriseid
      console.log("绑定展位参数：",recordID)
      
      console.log("绑定展位参数obj：",record)
      if (recordID != null || recordID != undefined || recordID != '') {
        this.jsonadd.updateTime = this.getNowFormatDate()
        this.jsonadd.enterpriseInfoId = recordID
        this.jsonadd.updateBy = store.getters.userInfo.id
        this.boothInfoEntity = this.jsonadd
        console.log(this.boothInfoEntity)
        getEditById(this.boothInfoEntity).then((res) => {
          if (res.success) {
            this.innerVisible = false
            // this.$parent.edit(1);
            this.$message.success("绑定成功！")
            record.id=record.jobfairid
            this.$emit('eChange', record)
          } else {
            this.$message.warn("绑定失败！")
            // this.$message.warn(res.message)
          }
        })
        //修改报名企业的展位
      }
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      // console.log("参数");
      // console.log(params);
      jobenterpriseList(params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam)
      param.jobfairId = this.jobfairId
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    edit(record, jsonadd) {
      this.innerVisible = true
      this.jobfairId = record
      this.jsonadd = jsonadd
      console.log(jsonadd)
      console.log(this.jsonadd)
      this.loadData()
    },
    handleCancel() {
      this.innerVisible = false
    },
    //取消选择
    cancelDict() {
      this.dict = ''
      this.innerVisible = false
      this.loadData()
    },
    //编辑字典数据
    editDictItem(record) {
      this.$refs.dictItemList.edit(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.enterpriseName = ''
      that.loadData(this.ipagination.current)
    },
    openDeleteList() {
      this.$refs.dictDeleteList.show()
    },
    refleshCache() {
      getAction(this.url.refleshCache)
        .then((res) => {
          if (res.success) {
            //重新加载缓存
            getAction(this.url.queryAllDictItems).then((res) => {
              if (res.success) {
                Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
                Vue.ls.set(UI_CACHE_DB_DICT_DATA, res.result, 7 * 24 * 60 * 60 * 1000)
              }
            })
            this.$message.success('刷新缓存完成！')
          }
        })
        .catch((e) => {
          this.$message.warn('刷新缓存失败！')
          console.log('刷新失败', e)
        })
    },
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>