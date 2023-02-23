<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="标题" :labelCol="{ span: 7 }" :wrapperCol="{ span: 16, offset: 1 }">
              <a-input placeholder="请输入标题" v-model="queryParam.noticeTitle"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="7" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
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

      <div class="table-operator" style="border-top: 5px; margin-left: 5%">
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </div>

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
        <span slot="enablescope" slot-scope="text, record">
          <a-switch
            checked-children="启用"
            un-checked-children="关闭"
            :checked="Boolean(record.enable)"
            @change="enableChange($event,record)"
          ></a-switch>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">
            <a-icon type="edit" />编辑修改
          </a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <!-- 字典类型 -->
    <public-modal ref="modalForm" :noticetype="queryParam.noticetype" :title="title" @ok="modalFormOk"></public-modal>
    <!-- 字典类型 -->
    <dict-item-list ref="dictItemList"></dict-item-list>
    <dict-delete-list ref="dictDeleteList" @refresh="() => loadData()"></dict-delete-list>
  </a-card>
</template>

<script>
const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'rowIndex',
    width: 120,
    align: 'center',
    customRender: function(t, r, index) {
      return parseInt(index) + 1
    }
  },
  {
    title: '标题',
    align: 'center',
    width: 470,
    dataIndex: 'noticeTitle'
  },
  //    {
  //     title: '公告内容',
  //     align: 'left',
  //     width: 240,
  //     dataIndex: 'noticeContent',
  //   },
  {
    title: '是否启用',
    align: 'center',
    width: 100,
    dataIndex: 'enable',
    scopedSlots: { customRender: 'enablescope' }
  },
  {
    title: '创建时间',
    align: 'center',
    width: 150,
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    align: 'center',
    width: 150,
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import publicModal from './modules/publicModal'
import DictItemList from '../system/DictItemList'
import DictDeleteList from '../system/DictDeleteList'
import { getAction, deleteAction, postAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import Vue from 'vue'

export default {
  name: 'policyInterpretation',
  mixins: [JeecgListMixin],
  components: { publicModal, DictItemList, DictDeleteList },
  data() {
    return {
      visible: false,
      // 查询条件
      queryParam: {
        noticeTitle: '',
        noticetype: 'unscramble'
      },
      columns,
      dataSource: [],
      dict: '',
      labelCol: {
        xs: { span: 8 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19 }
      },
      url: {
        list: '/app/publicnotice/list',
        delete: '/app/publicnotice/delete',
        enable: '/app/publicnotice/zcenable',
        edit: '/app/publicnotice/editById'
      },
      title:'修改编辑政策解读'
    }
  },
  computed: {},
  created() {
    this.loadData()
  },
  methods: {
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      getAction(this.url.list, params).then(res => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    handleDelete(deleId) {
      console.log('删除')
      let that = this
      deleteAction(that.url.delete, { id: deleId }).then(res => {
        if (res.success) {
          this.loadData(1)
          that.$message.success(res.message)
        } else {
          that.$message.warning(res.message)
          this.loadData()
        }
      })
    },
    enableChange(e, record) {
      var _this = this
      if (e) {
        record.enable = 1
      } else {
        record.enable = 0
      }
      getAction(this.url.enable, { id: record.id, enable: record.enable }).then(res => {
        if (res.success) {
          _this.$message.success(res.message)
          this.loadData(1)
        } else {
          _this.$message.warning(res.message)
          this.loadData()
        }
        console.log(res)
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    //取消选择
    cancelDict() {
      this.dict = ''
      this.visible = false
      this.loadData()
    },
    //编辑字典数据
    editDictItem(record) {
      this.$refs.dictItemList.edit(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.noticeTitle = ''
      that.queryParam.noticetype = 'unscramble'
      that.loadData(this.ipagination.current)
    },
    openDeleteList() {
      this.$refs.dictDeleteList.show()
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>