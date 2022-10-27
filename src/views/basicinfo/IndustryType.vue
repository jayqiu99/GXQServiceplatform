<template>
  <a-row :gutter="10">
    <a-col :md="leftColMd" :sm="24" style="margin-bottom: 20px">
      <a-card :bordered="false" title="行业类型管理">
        <!-- 左侧面板 -->
        <div class="table-page-search-wrapper" id="tableinfo">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24">
              <a-col :md="12" :sm="13" :push="2">
                <a-form-item label="行业类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                  <a-input placeholder v-model="queryParam.industrytype"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="8" :push="3">
                <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-left: 8px">添加</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-table
              ref="table"
              bordered
              rowKey="id"
              size="middle"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="ipagination"
              :loading="loading"
              @change="handleTableChange"
              :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: 'radio' }"
            >
            
              <span slot="action" slot-scope="text, record">
                <a @click="handleEdit(record)">编辑修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </a-table>
          </div>
        </div>
        <industry-type-modal ref="modalForm" @ok="modalFormOk"></industry-type-modal>
      </a-card>
    </a-col>
    <a-col :md="rightColMd" :sm="24">
      <a-card :bordered="false" title="行业名称管理">
        <!-- 左侧面板 -->
        <div class="table-page-search-wrapper" id="tableinfo">
          <a-form layout="inline" @keyup.enter.native="searchQuery2">
            <a-row :gutter="24">
              <a-col :md="12" :sm="12" :push="2">
                <a-form-item label="行业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                  <a-input placeholder v-model="queryParam2.industryname"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="8" :push="3">
                <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                  <a-button type="primary" @click="searchQuery2" icon="search">查询</a-button>
                  <a-button type="primary" @click="searchReset2" icon="reload" style="margin-left: 8px">重置</a-button>
                  <a-button @click="handleAdd2" type="primary" icon="plus" style="margin-left: 8px">添加</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
          <div>
            <a-table
              ref="table"
              bordered
              rowKey="id"
               style="height: 565px"
              size="middle"
              :columns="columns2"
              :dataSource="dataSource2"
              :pagination="ipagination2"
              :loading="loading2"
              @change="handleTableChange"
            >
             <template slot="sort"  slot-scope="text,record"><div style="width：30px;height:21px;font-size:18px;" @click="rowClick(record)">{{record.commonlyUsed}}</div></template>
              
              <span slot="action" slot-scope="text, record">
                <a @click="handleEdit2(record)">编辑修改</a>
                <a-divider type="vertical" />
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete2(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </a-table>
          </div>
        </div>
        <industry-name-modal ref="modalForm2" @ok="modalFormOk2"></industry-name-modal>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction,deleteAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import IndustryTypeModal from '../basicinfo/modules/IndustryTypeModal'
import IndustryNameModal from '../basicinfo/modules/IndustryNameModal'
import Vue from 'vue'

import store from '@/store'

export default {
  name: 'MajorType',
  mixins: [JeecgListMixin],
  components: { IndustryTypeModal, IndustryNameModal },
  data() {
    return {
      // 查询条件
      queryParam: {
        industrytype: '',
      },
      queryParam2: {
        industryname: '',
      },
        rightcolval: 0,
      parentId: '',
      dataSource2: [],
      loading2: false,
      ipagination2: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
      },
      selectedRowKeys: [],
      selectionRows: [],
      superQueryParams2: '',
      filters2: {},
      superQueryMatchType2: 'and',
      // 表头
      columns: [
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
          title: '行业类型',
          align: 'center',
          dataIndex: 'dataName',
          width: 250,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 250,
        },
      ],
      columns2: [
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
          title: '行业名称',
          align: 'center',
          dataIndex: 'dataName',
          width: 250,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
        
        {
          title: '设为常用',
          align: 'center',
          dataIndex: 'commonlyUsed',
          scopedSlots: { customRender: 'sort' },
          width: 100,
        },
      ],
      dict: '',
      timer: null,
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        list: '/base/list?type=industrytype',
        list2: '/base/list?type=industryname',
        delete: '/base/delete',
        updata: '/base/signCommonly',
      },
    }
  },
  computed: {
    leftColMd() {
      return 12
    },
    rightColMd() {
      return 12
    },
  },
  methods: {
      rowClick(record, index) {
      // return {
      //   on: {
      //     click: () => {
            console.log('点击了我', record)
            var params = {}
            params.id = record.id
            if (record.commonlyUsed == '') {
              params.commonly = 1
            } else {
              params.commonly = 0
            }
            params.userid = store.getters.userInfo.id
            getAction(this.url.updata, params).then((res) => {
              console.log('设置常用职位', res)
              if (res.code == 200) {
                this.$message.success(res.message)
                this.loadData2()
              } else {
                this.$message.warning(res.message)
              }
            })
          // },

          // dblclick: () => {
          //   console.log('双击了我')
          // },
        // },
      // }
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
    getQueryParams2() {
      let sqp = {}
      if (this.superQueryParams2) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams2)
        sqp['superQueryMatchType'] = this.superQueryMatchType2
      }
      var param = Object.assign(sqp, this.queryParam2, this.isorter2, this.filters2)
      param.field = this.getQueryField2()
      param.pageNo = this.ipagination2.current
      param.pageSize = this.ipagination2.pageSize
      return filterObj(param)
    },
    getQueryField2() {
      //TODO 字段权限控制
      var str = 'id,'
      this.columns2.forEach(function (value) {
        str += ',' + value.dataIndex
      })
      return str
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.rightcolval = 1
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
      this.model1 = Object.assign({}, selectionRows[0])
      console.log(this.model1)
      this.parentId = this.model1.id
      console.log('selectedRowKeys', selectedRowKeys[0])
      console.log('model1', this.model1)
      this.loadData2()
    },
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      params.name = params.industrytype
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    loadData2(arg) {
      if (arg === 1) {
        this.ipagination2.current = 1
      }
      let params = this.getQueryParams2() //查询条件
      params.name = params.jobname
      params.parentid = this.parentId
      console.log('参数', params)
      getAction(this.url.list2, params).then((res) => {
        if (res.success) {
          var list = res.result.records
          console.log('表2', list)
          for (var i = 0; i < list.length; i++) {
            if (list[i].commonlyUsed == '0') {
              list[i].commonlyUsed = ''
            } else {
              list[i].commonlyUsed = '√'
            }
          }
          this.dataSource2 = list
          this.ipagination2.total = res.result.total
        }
      })
    },
    handleEdit2: function (record) {
      this.$refs.modalForm2.edit(record)
      this.$refs.modalForm2.title = '编辑修改'
      this.$refs.modalForm2.disableSubmit = false
    },
    handleAdd2: function () {
      this.$refs.modalForm2.add()
      this.$refs.modalForm2.title = '新增'
      this.$refs.modalForm2.disableSubmit = false
    },
    handleDelete2: function (id) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
      var that = this
      deleteAction(that.url.delete, { id: id }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData2()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    modalFormOk2() {
      // 新增/修改 成功时，重载列表
      this.loadData2()
    },
    searchQuery2() {
      this.loadData2(1)
    },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.industrytype = ''
      that.loadData(this.ipagination.current)
    },
    searchReset2() {
      var that = this
      that.queryParam2.industryname = ''
      that.loadData2(this.ipagination2.current)
    },
    handleTableChange2(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter2.column = sorter.field
        this.isorter2.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination2 = pagination
      this.loadData2()
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>