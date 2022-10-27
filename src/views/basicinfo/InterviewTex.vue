<template>
  <a-card :bordered="false">
    <!-- 左侧面板 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" style="margin-left: 10%" @keyup.enter.native="searchQuery">
        <a-row :gutter="12">
          <a-col :md="7" :sm="8">
            <a-form-item label="模板名称" :labelCol="{ span: 7 }" :wrapperCol="{ span: 16, offset: 1 }">
              <a-select
                show-search
                v-model="Templatetype"
                option-filter-prop="children"
                @change="handleChange"
              >
                <a-select-option value="interviewinvite"> 面试邀约模板 </a-select-option>
                <a-select-option value="invitation"> 邀请函模板 </a-select-option>
                <a-select-option value="offer"> 录用通知 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="table-operator" style="border-top: 5px; margin-left: 5%">
        <a-button @click="invitationAdd" type="primary" icon="plus">保存</a-button>
        <a-button @click="preview" type="primary" icon="eye">预览</a-button>
        <!-- <a-button @click="Template" type="primary" icon="calendar">模板</a-button> -->
      </div>
    </div>
    <!-- <a @click="editDictItem(record)"><a-icon type="setting"/>审核</a> -->
    <div style="height:600px">
      <quill-editor v-model="demovalue" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
      </quill-editor>
    <!-- <j-editor v-model="demovalue" /> -->
    </div>
    <!-- <j-cditor v-model="demo" /> -->
    <!-- <div>编辑富文本内容{{demovalue}}</div> -->
    <p-review ref="invitationlist" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
import EditorBar from '../../components/wangEnduit/index'
import PReview from './modules/EyePreview'
import PageLayout from '@/components/page/PageLayout'
import JEditor from '@/components/jeecg/JEditor'
import JCditor from '@/components/jeecg/JCodeEditor'
import { areaList, editinvitation, templatedome, templatedomeadd } from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import DictModal from '../basicinfo/modules/AreaModal'
import DictItemList from '../system/DictItemList'
import DictDeleteList from '../system/DictDeleteList'
import { getAction } from '@/api/manage'
import { UI_CACHE_DB_DICT_DATA } from '@/store/mutation-types'
import Vue from 'vue'
import store from '@/store'

export default {
  name: 'DictList',
  mixins: [JeecgListMixin],
  components: {DictModal,JCditor, DictItemList, DictDeleteList, JEditor, PageLayout, PReview,quillEditor},
  data() {
    return {
      isClear: false,
      detail:"",
      demo:'',
      isno: '',
      datajob: {},
      Templatetype: 'invitation',
      joboption: [],
      demovalue: '',
      eyeid: '',
      description: '这是地区信息管理页面',
      visible: false,
      // 查询条件
      queryParam: {
        name: '',
      },
      invitationobj: [],
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
        list: '/sys/dict/list',
        delete: '/base/area/delete',
        exportXlsUrl: 'sys/dict/exportXls',
        importExcelUrl: 'sys/dict/importExcel',
        refleshCache: 'sys/dict/refleshCache',
        queryAllDictItems: 'sys/dict/queryAllDictItems',
        industrylist: '/hall/jobfair/list',
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
    this.getindustryList()
    // this.loadingdata()
    this.loadtex();
  },
  methods: {
    change(val) {
      console.log(val)
      
    },
    loadtex(){
      let that = this
      
      getAction('/base/template/query', { templateType: that.Templatetype}).then((res) => {
        if (res.result == null) {
          console.log('模板不为空')
          this.isno = 0
          this.demovalue = ''
        } else {
          this.isno = 1
          this.demovalue = res.result.templateContent
          this.datajob.id = res.result.id
        }
      })
    },
    // loadingdata() {
    //   getAction('/base/template/query', { templateType: 'interviewinvite' }).then((res) => {
    //     if (res.result == null) {
    //       console.log('面试邀约模板不为空')
    //       this.isno = 0
    //     } else {
    //       this.demovalue = res.result.templateContent
    //       this.datajob.id = res.result.id
    //     }
    //   })
    // },

    handleChange(value) {
      let that = this
      console.log('选种', value)
      
      getAction('/base/template/query', { templateType: value }).then((res) => {
        if (res.result == null) {
          console.log('模板不为空')
          this.isno = 0
          this.demovalue = ''
        } else {
          this.isno = 1
          this.demovalue = res.result.templateContent
          this.datajob.id = res.result.id
        }
      })
    },
    preview() {
      this.$refs.invitationlist.edit(this.demovalue)
    },
    invitationAdd() {
      console.log("提交状态",this.isno);
      console.log("模板类型",this.Templatetype);
      if (this.isno == 1) {
        let that = this
        // console.log('添加对象', that.invitationobj.invitation)
        if (that.demovalue != '' && that.demovalue != null) {
          console.log('添加对象', this.demovalue)
          this.datajob.templateContent = this.demovalue
          this.datajob.templateType = this.Templatetype
          this.datajob.updateBy = store.getters.userInfo.username
          this.datajob.updateTime = this.getNowFormatDate()
          console.log('添加对象2', this.datajob)
          templatedome(this.datajob).then((res) => {
            if (res.success) {
              that.$message.success('修改模板内容成功！')
            } else {
              that.$message.warning('修改模板内容失败！')
            }
          })
        } else {
          that.$message.warning('保存内容不能为空！')
        }
      } else if (this.isno == 0) {
        //   templatedomeadd
        let that = this
        if (that.demovalue != '' && that.demovalue != null) {
          console.log('添加对象', this.demovalue)
          this.datajob.templateContent = this.demovalue
          this.datajob.templateType = this.Templatetype
          this.datajob.createBy = store.getters.userInfo.username
          this.datajob.createTime = this.getNowFormatDate()
          console.log('添加对象2', this.datajob)
          templatedomeadd(this.datajob).then((res) => {
            if (res.success) {
              that.$message.success('保存模板内容成功！')
            } else {
              that.$message.warning('保存模板内容失败！')
            }
          })
        } else {
          that.$message.warning('保存内容不能为空！')
        }
      }
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
    getindustryList() {
      let that = this
      getAction(that.url.industrylist).then((res) => {
        that.joboption = res.result.records
      })
    },
    addtext() {
      this.demovalue = "<h1 style='text-align: center;'>啊啊啊啊啊</h1>"
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      let params = this.getQueryParams() //查询条件
      areaList(params).then((res) => {
        if (res.success) {
          this.dataSource = res.result.records
          this.ipagination.total = res.result.total
        }
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
      that.queryParam.name = ''
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
/* @import '../../components/wangEnduit/index'; */
</style>