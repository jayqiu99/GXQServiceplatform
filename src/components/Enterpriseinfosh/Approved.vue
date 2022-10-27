<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <div style="margin-left: 5%">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="12">
            <a-col :md="7" :sm="8">
              <a-form-item label="所属行业" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                <!-- <a-input placeholder="请输入所属行业" v-model="queryParam.trade"></a-input> -->
                <a-select show-search v-model="queryParam.trade" option-filter-prop="children"
                  :filter-option="filterOption">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in industryoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                    }}</a-select-option>
                </a-select>
                <!-- <a-cascader
                  :field-names="{ label: 'dataName', value: 'dataName', children: 'items' }"
                  v-model="queryParam.trade"
                  :options="industryoption"
                  placeholder="请选择"
                  @change="cascaderonChange"
                /> -->
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="8">
              <a-form-item label="企业规模" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                <a-select show-search v-model="queryParam.scale" option-filter-prop="children"
                  :filter-option="filterOption">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in scaleoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                    }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :md="7" :sm="10">
              <a-form-item label="所属区域" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                <!-- <a-select v-model="queryParam.area">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in areaoption" :key="d.id" :value="d.dataName">{{
                    d.dataName
                  }}</a-select-option>
                </a-select> -->
                <a-cascader :options="areaoption" v-model="areassq" @change="areaonChange" placeholder="请选择区域" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="8">
              <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 14, offset: 1 }">
                <a-select show-search :filter-option="filterOptiont" v-model="queryParam.id">
                  <a-select-option value>请选择</a-select-option>
                  <a-select-option v-for="d in listforlebel" :key="d.value" :value="d.value">{{ d.label }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="8">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator" style="border-top: 5px">
        <!-- <a-button @click="tohandleAdd" type="primary" icon="plus">添加企业</a-button> -->
        <a-button type="primary" @click="exportFile"> 导出查询数据 </a-button>
      </div>
      <a-table ref="table" rowKey="id" size="middle" :columns="columns" :dataSource="dataSource"
        :pagination="ipagination" :loading="loading" bordered @change="handleTableChange">
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
        </a-table-column> -->
        <span slot="action" slot-scope="text, record">
          <!-- <a-popconfirm title="确定重置密码吗?" @confirm="() =>handleResetad(record.id)">
            <a>重置密码</a>
          </a-popconfirm>-->
          <!-- <a @click="handleResetad(record.id)">
            <a-icon type="edit"/>
            重置密码
          </a>-->
          <!-- <a-divider type="vertical"/> -->
          <a @click="handleEdit(record)">
            <a-icon type="file-search" />编辑修改
          </a>
          <!-- <a-divider type="vertical"/> -->

          <!-- <a-divider type="vertical"/> -->
          <!-- <a @click="editDictItem(record)"><a-icon type="setting"/> 审核</a> -->
          <a-divider type="vertical" />
          <!-- <a-popconfirm
            title="确定要审核通过吗?"
            ok-text="通过"
            cancel-text="不通过"
            @cancel="() => unexconfirm(record.id)"
            @confirm="() => exconfirm(record.id)"
          > -->
          <a @click="examineFormclick(record)">
            <a-icon type="setting" />审核
          </a>
          <!-- </a-popconfirm> -->

          <a-divider type="vertical" />
          <a-popconfirm title="确定重置密码吗?" @confirm="() => handleResetad(record.id)">
            <a>
              <a-icon type="unlock" />重置密码
            </a>
          </a-popconfirm>
          <!-- <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定重置密码吗?" @confirm="() =>handleResetad(record.id)">
                  <a>重置密码</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定启用吗?" @confirm="() =>handleEnable(record.id)">
                  <a>启用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item>
                <a @click="editDictItem(record)">审核</a>
              </a-menu-item>

              <a-menu-item v-if="record.enable=='未启用'">
                <a-popconfirm title="确定要启用吗?" @confirm="() => handleEnable(record.id)">
                  <a>启用</a>
                </a-popconfirm>
              </a-menu-item>

              <a-menu-item v-if="record.enable=='已启用'">
                <a-popconfirm title="确定要禁用吗?" @confirm="() => handleDisable(record.id)">
                  <a>禁用</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>
      </a-table>
    </div>
    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <examine-modal ref="examineForm" @ok="modalFormOk"></examine-modal>
    <!-- 字典类型 -->
    <examine-item-list ref="examineForm" @ok="modalFormOk"></examine-item-list>
    <addent ref="toaddent" @ok="modalFormOk"></addent>
  </a-card>
</template>

<script>
  import { editresetenterprise, editenable, approvedList, editexamine } from '@/api/api'
  import { filterObj } from '@/utils/util'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import UserModal from './modules/ApprovededigMd.vue'
  import ExamineItemList from './modules/Examineform'
  import Addent from './modules/toapproved.vue'
  // import ExamineItemList from './modules/ExamineModel'
  import { getAction } from '@/api/manage'
  import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
  import JInput from '@/components/jeecg/JInput'
  import Vue from 'vue'

  export default {
    name: 'DictList',
    mixins: [JeecgListMixin],
    components: { UserModal, ExamineItemList, JInput, Addent },
    data() {
      return {
        listforlebel: [], //企业下拉
        description: '这是数据字典页面',
        visible: false,
        options: '',
        // 查询条件行业
        cascaderit: '',
        // 查询条件
        queryParam: {
          trade: '',
          scale: '',
          area: '',
          name: '',
          id: ''
        },

        areaId: '', //区域
        areaname: '', //区域
        areassq: [], //区域
        newlogoAddress: '',
        industryoption: [], //行业
        scaleoption: [], //规模
        areaoption: [], //区域
        examineparams: {
          id: '',
          examinestate: '',
        },
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key: 'rowIndex',
          //   width: 70,
          //   fixed: 'left',
          //   align: "center",
          //   customRender: function (t, r, index) {
          //     return parseInt(index) + 1;
          //   }
          // },
          {
            title: '所属区域',
            align: 'center',
            width: 150,
            dataIndex: 'area',
          },
          {
            title: '企业LOGO',
            align: 'center',
            width: 150,
            dataIndex: 'logoAddress',
            scopedSlots: { customRender: 'logoAddress' },
          },
          {
            title: '企业名称',
            align: 'center',
            width: 300,
            dataIndex: 'enterpriseName',
          },
          {
            title: '负责人',
            align: 'center',
            width: 80,
            dataIndex: 'companyPrincipal',
          },
          {
            title: '联系电话',
            align: 'center',
            width: 120,
            dataIndex: 'phone',
          },
          {
            title: '所属行业',
            align: 'center',
            width: 130,
            dataIndex: 'trade',
          },
          {
            title: '企业规模',
            align: 'center',
            width: 100,
            dataIndex: 'scale',
          },
          // {
          //   title: '地址',
          //   align: 'center',
          //   width: 200,
          //   dataIndex: 'address',
          // },
          // {
          //   title: '审核状态',
          //   align: 'center',
          //   width: 90,
          //   dataIndex: 'examinestate',
          // },
          {
            title: '登录账号',
            align: 'center',
            width: 130,
            dataIndex: 'account',
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: 200,
            align: 'center',
            scopedSlots: { customRender: 'action' },
          },
        ],
        dataSource: [],
        restParam: {
          id: '',
        },
        enableParam: {
          id: '',
          enable: '',
        },
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
          entseList: '/hall/enterprise/listforlebel',
          list: '/base/list?type=area',
          delete: '/sys/dict/delete',
          exportXlsUrl: 'sys/dict/exportXls',
          importExcelUrl: 'sys/dict/importExcel',
          refleshCache: 'sys/dict/refleshCache',
          queryAllDictItems: 'sys/dict/queryAllDictItems',
          Reseturl: '/hall/enterprise/resetpsw',
          industrylist: '/base/list?type=industrytype',
          industrychildren: '/base/list?type=industryname',
          scalelist: '/base/list?type=scale',
          arealist: '/base/getcityjsoninfo',
        },
      }
    },
    computed: {
      importExcelUrl: function () {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      },
    },
    mounted() {
      this.trymodel()
      this.getareaList()
      this.getentList()
      this.getindustryList()
      this.getscaleList()
    },
    methods: {
      //企业下拉框
      getentList() {
        let that = this
        getAction(that.url.entseList).then(res => {
          that.listforlebel = res.result
          that.loadData()
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
        // console.log('区域字段', this.boothtext)
        // this.areaId=op[op.length].value
        // op[op.length].value
      },
      tohandleAdd() {
        this.$refs.toaddent.add()
      },
      examineFormclick(resobj) {
        this.$refs.examineForm.edit(resobj)
      },
      switched() {
        this.loadData()
      },
      cascaderonChange(value) {
        console.log('行业', value)
        this.cascaderit = value[1]
      },
      trymodel() {
        let that = this

        getAction(that.url.industrylist).then((res) => {
          // let items = []
          for (var i = 0; i < res.result.records.length; ++i) {
            res.result.records[i].items = ''
            let aaa = i
            getAction(that.url.industrychildren, { parentid: res.result.records[i].id }).then((rest) => {
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

        console.log('查询条件', this.areaname)
        console.log(params)
        params.area = this.areaname
        var logoAddressUrl = 'http://123.57.236.82:8080/zqhr'
        approvedList(params).then((res) => {
          console.log("res", res);
          if (res.success) {
            for (var i = 0; i < res.result.records.length; ++i) {
              // res.result.records[i].examinestate = res.result.records[i].examinestate == 1 ? '通过' : '不通过'
              res.result.records[i].logoAddress = logoAddressUrl + res.result.records[i].logoAddress
              this.newlogoAddress = res.result.records[i].logoAddress
            }
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
          editexamine(this.examineparams).then((res) => {
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
          editexamine(this.examineparams).then((res) => {
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
        getAction(that.url.industrylist).then((res) => {
          that.industryoption = res.result.records
          that.loadData()
        })
      },
      //规模下拉框
      getscaleList() {
        let that = this
        getAction(that.url.scalelist).then((res) => {
          that.scaleoption = res.result.records
          that.loadData()
        })
      },
      //区域下拉框
      getareaList() {
        let that = this
        getAction(that.url.arealist).then((res) => {
          that.areaoption = res.result
          // that.loadData()
        })
      },
      handleDisable(DisableId) {
        const that = this
        that.enableParam.id = DisableId
        that.enableParam.enable = -1
        editenable(that.enableParam).then((res) => {
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
        that.restParam.id = idr
        editresetenterprise(that.restParam).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
          } else {
            that.$message.warning(res.message)
          }
        })
      },
      handleEnable(idr) {
        const that = this
        console.log('启用' + idr)
        that.enableParam.id = idr
        that.enableParam.enable = 1
        editenable(that.enableParam).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            this.loadData()
          } else {
            that.$message.warning(res.message)
            this.loadData()
          }
        })
      },
      edit(record) {
        console.log('修改对象：', record)

        // this.areassq=['1', '1', '1']
        if (record.bdmAreaInfoId != null) {
          var areastr = record.bdmAreaInfoId
          this.areassq = areastr.split(',')
        }
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
      exportFile() {
        var that = this
        var trade = that.queryParam.trade
        var area = that.queryParam.area
        var name = that.queryParam.name
        var scale = that.queryParam.scale
        console.log('trade', trade)
        console.log('area', area)
        console.log('name', name)
        console.log('scale', scale)

        this.$http({
          url: '/hall/enterprise/export?area=' + area + '&trade=' + trade + '&name=' + name + '&scale=' + scale,
          method: 'get',
          responseType: 'arraybuffer', // 表明返回服务器返回的数据类型
          headers: {
            'Content-Type': 'application/json',
          },
          // data: {
          //   area:area,
          //   name:name,
          //   scale:scale,
          //   trade:trade,
          // },
        })
          .then((res) => {
            //创建一个隐藏的a连接，
            const link = document.createElement('a')
            let blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=UTF-8' })
            link.style.display = 'none'
            //设置连接
            link.href = URL.createObjectURL(blob)
            link.download = '招聘会企业岗位信息表'
            document.body.appendChild(link)
            //模拟点击事件
            link.click()
            //console.log("res",res);
          })
          .catch((err) => {
            console.log(err)
          })
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