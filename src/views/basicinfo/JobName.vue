<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper" id="tableinfo">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="职位名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-input placeholder v-model="queryParam.majorname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="2">
            <a-form-item label="职位类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
              <a-select v-model="queryParam.majortype" show-search :filter-option="filterOption">
                <a-select-option v-for="d in jobtypelist" :key="d.id" :value="d.id">{{ d.dataName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8" :push="3">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator" style="border-top: 5px; margin-left: 5%">
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </div>
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
    <job-name-modal ref="modalForm" @ok="modalFormOk"></job-name-modal>
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import JobNameModal from '../basicinfo/modules/JobNameModal'
import Vue from 'vue'

export default {
  name: 'MajorName',
  mixins: [JeecgListMixin],
  components: { JobNameModal },
  data() {
    return {
      // 查询条件
      queryParam: {
        majorname: '',
        majortype: '',
      },
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
          title: '职位类型',
          align: 'center',
          dataIndex: 'parentName',
          width: 250,
        },
        {
          title: '职位名称',
          align: 'center',
          dataIndex: 'dataName',
          width: 250,
        },
        {
          title: '新增时间',
          align: 'center',
          dataIndex: 'createTime',
          width: 250,
        },
        {
          title: '更新时间',
          align: 'center',
          dataIndex: 'updateTime',
          width: 150,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 250,
        },
      ],
      jobtypelist: [],
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 },
      },
      url: {
        typelist: '/base/list?type=jobtype&pageNo=1&pageSize=1000',
        list: '/base/parentlist?type=jobname',
        delete: '/base/delete',
      },
    }
  },
  methods: {
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
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      params.name = params.majorname
      params.parentid = this.queryParam.majortype
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    getTypeList() {
      let that = this
      getAction(this.url.typelist).then((res) => {
        that.jobtypelist = res.result.records
        console.log(that.jobtypelist)
        // that.queryParam.majortype = res.result.records[0].id
        that.jobtypelist.unshift({ id: '', dataName: '请选择' })
      })
    },
    // 重置搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.majortype = ''
      that.queryParam.majorname = ''
      that.loadData(this.ipagination.current)
    },
  },
  created() {
    this.getTypeList()
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>