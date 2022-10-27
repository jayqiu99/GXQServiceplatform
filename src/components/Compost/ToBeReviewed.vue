<template>
  <div
    v-loading="temloading"
    element-loading-text="拼命上传中......"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <a-card :bordered="false">
      <!-- 左侧面板 -->
      <div class="table-page-search-wrapper">
        <div style="margin-left: 5%">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="12">
              <a-col :md="8" :sm="8">
                <a-form-item
                  label="企业名称"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{ span: 12, offset: 1 }"
                >
                  <a-select
                    show-search
                    placeholder="输入企业名称"
                    option-filter-prop="children"
                    :options="listforlebel"
                    :filter-option="filterOptiont"
                    v-model="queryParam.enterpriseid"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChange"
                  ></a-select>
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="8">
                <a-form-item
                  label="岗位名称"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{ span: 14, offset: 1 }"
                >
                  <a-input placeholder="请输入岗位名称" v-model="queryParam.postName"></a-input>
                </a-form-item>
              </a-col>
               <a-col :md="9" :sm="8">
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
            <!-- <a-row :gutter="12">
              <a-col :md="8" :sm="8">
                <a-form-item
                  label="导入批次"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{ span: 14, offset: 1 }"
                >
                  <a-input placeholder="请输入批次号" v-model="queryParam.batch"></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="7" :sm="10">
                <a-form-item
                  label="错误标志"
                  :labelCol="{ span: 6 }"
                  :wrapperCol="{ span: 14, offset: 1 }"
                >
                  <a-select show-search v-model="queryParam.iserror">
                    <a-select-option value>请选择</a-select-option>
                    <a-select-option value="0">无错误信息</a-select-option>
                    <a-select-option value="1">有错误信息</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

             
            </a-row> -->
          </a-form>
        </div>
        <!-- 操作按钮区域 -->
        <div class="table-operator" style="border-top: 5px">
          <a-button @click="handleAdd" type="primary" icon="plus">添加岗位</a-button>
          <a-button @click="batchExamine" type="primary"><a-icon type="check" /> 批量审核通过</a-button>
          <!-- <a-upload
            name="file"
            style="margin-left: 1px;display:inline-block"
            :multiple="false"
            @change="changeFile"
            accept=".excle, .xlsx"
            :customRequest="customRequest"
          >
            <a-button type="primary">
              <a-icon type="upload" />导入Excel
            </a-button>
          </a-upload> -->
          <a-button
            type="primary"
            style="margin-left: 8px ;display:inline-block"
            @click="exportFile"
          >导出查询数据</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">
                <a-icon type="delete" @click="batchDel" />删除
              </a-menu-item>
              <!-- <a-menu-item key="22">
                <a-icon type="delete" @click="batchDel" />审核
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="delete" @click="batchDel" />批次审核
              </a-menu-item> -->
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
            <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
            <a style="margin-left: 24px" @click="onClearSelected">清空</a>
          </div>
          <a-table
            ref="table"
            rowKey="id"
            size="middle"
            :columns="columns"
            :scroll="{ x: 1000, y: 500 }"
            :dataSource="dataSource"
            :pagination="ipagination"
            :loading="loading"
            bordered
            @change="handleTableChange"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
            <template slot="logoAddress" slot-scope="text, record, index">
              <div class="anty-img-wrap">
                <a-avatar shape="square" :src="record.logoAddress" icon="user" />
              </div>
            </template>

            <!-- <a-table-column key="enable" title="启用" data-index="enable">
          <template slot-scope="enable">
            <span>
              <a-tag v-for="tag in enable" :key="tag" color="blue">{{ tag }}</a-tag>
            </span>
          </template>
            </a-table-column>-->
            <span slot="action" slot-scope="text, record">
              <a @click="handleEdit(record)">
                <a-icon type="file-search" />编辑修改
              </a>

              <a-divider type="vertical" />
              <!-- <a-popconfirm
            title="确定要审核通过吗?"
            ok-text="通过"
            cancel-text="不通过"
            @cancel="() => unexconfirm(record.id)"
            @confirm="() => exconfirm(record.id)"
              >-->
              <a @click="examineFormclick(record)">
                <a-icon type="setting" />审核
              </a>
              <!-- </a-popconfirm> -->

              <a-divider type="vertical" />
              <a-popconfirm title="确定要删除吗?" @confirm="() => handleResetad(record.id)">
                <a>
                  <a-icon type="unlock" />删除
                </a>
              </a-popconfirm>
              <!-- <a-divider type="vertical" />
            <a-popconfirm title="确定要启用吗?" @confirm="() => handleEnable(record.id)">
              <a>启用</a>
            </a-popconfirm>

            <a-popconfirm v-if="false" title="确定要禁用吗?" @confirm="() => handleDisable(record.id)">
              <a>禁用</a>
              </a-popconfirm>-->
            </span>
          </a-table>
        </div>
      </div>
      <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

      <!-- <examine-modal ref="examineForm" @ok="modalFormOk"></examine-modal> -->
      <!-- 字典类型 -->
      <examine-item-list ref="examineForm" @ok="modalFormOk"></examine-item-list>
    </a-card>
  </div>
</template>

<script>
import {
  editresetenterprise,
  delectpostd,
  editenable,
  approvedList,
  enTemporaryList2,
  postapprovedList,
  editexamine
} from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import UserModal from './modules/ApprovedModel'
import ExamineItemList from './modules/Examineform'
// import ExamineItemList from './modules/ExamineModel'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import store from '@/store'
import JInput from '@/components/jeecg/JInput'
import Vue from 'vue'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: { UserModal, ExamineItemList, JInput },
  data() {
    return {
      description: '这是数据字典页面',
      visible: false,
      options: '',
      // 查询条件行业
      cascaderit: '',
      // 查询条件
      queryParam: {
        batch: '',
        postName: '',
        iserror: '',
        enterpriseid: ''
      },
      temloading:false,
      newlogoAddress: '',
      industryoption: [], //行业
      scaleoption: [], //规模
      listforlebel: [], //区域
      examineparams: {
        id: '',
        examinestate: ''
      },
      // 表头
      columns: [
        {
          title: '企业名称',
          align: 'center',
          dataIndex: 'enterpriseName',
          width: 300
        },
        {
          title: '岗位',
          align: 'center',
          dataIndex: 'postName',
          width: 200
        },
        {
          title: '需求人数',
          align: 'center',
          dataIndex: 'recruitment',
          width: 100
        },

        {
          title: '薪资待遇',
          align: 'center',
          dataIndex: 'salary',
          width: 130
        },
        {
          title: '学历要求',
          align: 'center',
          dataIndex: 'educationRequirements',
          width: 100
        },
        {
          title: '年龄要求',
          align: 'center',
          dataIndex: 'ageRequirement',
          width: 100
        },
        {
          title: '性别要求',
          align: 'center',
          dataIndex: 'genderRequirement',
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          // fixed: 'right',
          width: 250
        }
      ],
      dataSource: [],
      restParam: {
        id: ''
      },
      enableParam: {
        id: '',
        enable: ''
      },
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
        list: '/hall/enterprise/listforlebel',
        delete: '/sys/dict/delete',
        exportXlsUrl: 'sys/dict/exportXls',
        importExcelUrl: 'sys/dict/importExcel',
        refleshCache: 'sys/dict/refleshCache',
        queryAllDictItems: 'sys/dict/queryAllDictItems',
        Reseturl: '/hall/enterprise/resetpsw',
        industrylist: '/base/list?type=industrytype',
        industrychildren: '/base/list?type=industryname',
        scalelist: '/base/list?type=scale'
      }
    }
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  mounted() {
    this.trymodel()
    this.getareaList()
    this.getindustryList()
    this.getscaleList()
  },
  methods: {
    batchExamine() {
      console.log('批量审核id', this.delelist)
      if(this.delelist==undefined){
        this.$message.warning("请勾选后再点击提交审核！")
      }else{
      var idsjobids = ''
      for (var i = 0; i < this.delelist.length; i++) {
        if (i == this.delelist.length - 1) {
          idsjobids += this.delelist[i].id
        } else {
          idsjobids += this.delelist[i].id + ','
        }
      }
      console.log(idsjobids, '参数')
      this.axios({
        method: 'get',
        url: '/hall/position/plexamineallPostReleaseTemporary',
        headers: {},
        params: {
          jobids: idsjobids,
          UpdateBy:store.getters.userInfo.username,
        },
      })
        .then((response) => {
          if (response.code == 200) {
            this.$message.success(response.message)
            this.loadData()
            that.$emit('ok')
          } else {
            this.$message.warning(response.message)
            this.loadData()
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
      }
    },
    exportFile() {
      var that = this
      var tenterpriseid = that.queryParam.enterpriseid
      var tpostName = that.queryParam.postName
      var tbatch = that.queryParam.batch
      var tiserror = that.queryParam.iserror
      console.log('tenterpriseid', tenterpriseid)
      console.log('tpostName', tpostName)
      console.log('tbatch', tbatch)
      console.log('tiserror', tiserror)

      this.$http({
        url:
          '/hall/position/exportXlsJobTemporary?batch=' +
          tbatch +
          '&enterpriseid=' +
          tenterpriseid +
          '&iserror=' +
          tiserror +
          '&postName=' +
          tpostName,
        method: 'get',
        responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
        headers: {
          'Content-Type': 'application/json'
        }
        // data: {
        //   area:area,
        //   name:name,
        //   scale:scale,
        //   trade:trade,
        // },
      })
        .then(res => {
          //创建一个隐藏的a连接，
          const link = document.createElement('a')
          let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' })
          link.style.display = 'none'
          //设置连接
          link.href = URL.createObjectURL(blob)
          link.download = '岗位待审核信息表'
          document.body.appendChild(link)
          //模拟点击事件
          link.click()
          //console.log("res",res);
        })
        .catch(err => {
          console.log(err)
        })
    },
    tofontcolor() {
      return {
        style: {
          color: 'red'
        }
      }
    },
    // 上传文件
    changeFile(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功`)
        this.$refs.upload.clearFiles()
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败.`)
        this.$refs.upload.clearFiles()
      }
      this.temloading=false;
    },
    // 上传提交
    customRequest(data) {
      this.temloading=true;
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('token', 'token')
      this.axios({
        method: 'post',
        url: '/hall/position/importExcel',
        headers: {},
        params: {},
        data: formData
      })
        .then(response => {
          // this.$message.success('上传成功');
          data.onSuccess()
          this.loadData()
          console.log(response)
        })
        .catch(function(error) {
          // this.$message.error(res.message || '上传失败');
          data.onError() // 返回报错
          console.log(error)
        })
    },
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
    filterOptiont(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      }
    },
    // 复选框选中
    onSelectChange(electedRowKeys, selectedRows) {
      this.delelist = selectedRows
      this.selectedRowKeys = electedRowKeys
      console.log(this.delelist)
      // this.ids = this.selectedRowKeys
    },
    //删除
    batchDel() {
      // console.log(this.delelist)
      for (var i = 0; i < this.delelist.length; i++) {
        this.axios({
          method: 'get',
          url: '/hall/position/deletePostReleaseTemporary',
          headers: {},
          params: { id: this.delelist[i].id }
        })
          .then(response => {
            console.log(response)
            this.loadData()
            this.$message.success('删除成功！')
            this.selectedRowKeys = []
          })
          .catch(function(error) {
            this.$message.success('删除失败:', error)
            console.log(error)
          })
      }
    }, 
    examineFormclick(resobj) {
      
      if (resobj.iserror == 0 || resobj.errorReason =="该企业岗位已存在") {
        this.$refs.examineForm.edit(resobj)
      } else if (resobj.iserror == 1 && resobj.errorReason !="该企业岗位已存在") {
        this.$notification['warning']({
          message: '不能审核',
          description: resobj.errorReason
        })
        // this.$message.warning(resobj.errorReason);
      }
    },
    // switched() {
    //   this.loadData()
    // },
    cascaderonChange(value) {
      console.log('行业', value)
      this.cascaderit = value[1]
    },
    trymodel() {
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
        this.industryoption = res.result.records
      })
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      console.log('查询条件')
      console.log('123', params)
      var logoAddressUrl = 'http://123.57.236.82:8080/zqhr'
      enTemporaryList2(params).then(res => {
        if (res.success) {
          // for (var i = 0; i < res.result.records.length; ++i) {
          //   // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '通过' : '不通过'
          //   res.result.records[i].logoAddress = logoAddressUrl + res.result.records[i].logoAddress
          //   this.newlogoAddress = res.result.records[i].logoAddress
          // }
          console.log('待审核列表', this.dataSource)
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
      })
    },
    //审核
    exconfirm(exid) {
      console.log('审核', exid)
      this.examineparams.id = exid
      this.examineparams.examinestate = 1
      let obj
      if (exid > 0) {
        editexamine(this.examineparams).then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
          } else {
            this.$message.warning(res.message)
            this.loadData()
          }
        })
      } else {
        console.log('审核为空！')
      }
    },
    unexconfirm(exid) {
      console.log('审核', exid)
      this.examineparams.id = exid
      this.examineparams.examinestate = -1
      let obj
      if (exid > 0) {
        editexamine(this.examineparams).then(res => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
          } else {
            this.$message.warning(res.message)
            this.loadData()
          }
        })
      } else {
        console.log('审核为空！')
      }
    },
    //行业下拉
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },

    getindustryList() {
      let that = this
      getAction(that.url.industrylist).then(res => {
        that.industryoption = res.result.records
        that.loadData()
      })
    },
    //规模下拉框
    getscaleList() {
      let that = this
      getAction(that.url.scalelist).then(res => {
        that.scaleoption = res.result.records
        that.loadData()
      })
    },
    //企业下拉框
    getareaList() {
      let that = this
      getAction(that.url.list).then(res => {
        that.listforlebel = res.result
        that.loadData()
      })
    },
    handleDisable(DisableId) {
      const that = this
      that.enableParam.id = DisableId
      that.enableParam.enable = -1
      editenable(that.enableParam).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData()
        } else {
          that.$message.warning(res.message)
          this.loadData()
        }
      })
    },
    handleResetad(idr) {
      const that = this
      console.log('删除ID', idr)
      // that.restParam.id = idr
      this.axios({
        method: 'GET',
        url: '/hall/position/deletePostReleaseTemporary',
        headers: {},
        params: { id: idr }
      })
        .then(response => {
          console.log(response)
          this.loadData()
          this.$message.success('删除成功！')
          this.selectedRowKeys = []
        })
        .catch(function(error) {
          this.$message.success('删除失败:', error)
          console.log(error)
        })
    },
    handleEnable(idr) {
      const that = this
      console.log('启用' + idr)
      that.enableParam.id = idr
      that.enableParam.enable = 1
      editenable(that.enableParam).then(res => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData()
        } else {
          that.$message.warning(res.message)
          this.loadData()
        }
      })
    },
    getQueryParams() {
      var param = Object.assign({}, this.queryParam, this.isorter)
      console.log('参数传输', param)
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
      this.$refs.examineItemList.edit(record)
    },
    // 重置字典类型搜索框的内容
    searchReset() {
      var that = this
      that.queryParam.trade = ''
      that.queryParam.area = ''
      that.queryParam.name = ''
      that.queryParam.scale = ''
      that.cascaderit = ''
      that.loadData(this.ipagination.current)
    },
    openDeleteList() {
      this.$refs.dictDeleteList.show()
    },
    refleshCache() {
      getAction(this.url.refleshCache)
        .then(res => {
          if (res.success) {
            //重新加载缓存
            getAction(this.url.queryAllDictItems).then(res => {
              if (res.success) {
                Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
                Vue.ls.set(UI_CACHE_DB_DICT_DATA, res.result, 7 * 24 * 60 * 60 * 1000)
              }
            })
            this.$message.success('刷新缓存完成！')
          }
        })
        .catch(e => {
          this.$message.warn('刷新缓存失败！')
          console.log('刷新失败', e)
        })
    }
  },
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>
<style>
.ant-upload-list {
  display: none;
}
</style>