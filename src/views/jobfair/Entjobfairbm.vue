<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="13" :sm="12">
            <!-- <a-form-item label="招聘会名称">
              <a-input placeholder="请输入招聘会名称" v-model="queryParam.name"></a-input>
            </a-form-item> -->
            <a-form-item
              label="招聘会名称"
              :labelCol="{ span: 6 }"
              style="margin-left: -14px"
              :wrapperCol="{ span: 14, offset: 1 }"
            >
              <a-select v-model="queryParam.jobfairid" style="margin-left: -18px; width: 94%">
                <a-select-option value>请选择</a-select-option>
                <a-select-option v-for="d in jobfairdata" :key="d.id" :value="d.id">{{ d.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="8">
            <a-form-item label="启用状态">
              <a-select v-model="queryParam.enable" placeholder="请选择举办状态">
                <a-select-option value="">请选择</a-select-option>
                <a-select-option value="1">已启用</a-select-option>
                <a-select-option value="-1">未启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="8" :sm="12">
            <a-form-item label="招聘会举办时间">
              <a-date-picker style="width: 100%" v-model="queryParam.holdingtime" format="YYYY-MM-DD" />
            </a-form-item>
          </a-col> -->
          <!-- <a-col :md="5" :sm="8">
            <a-form-item label="招聘会结束时间">
              <a-date-picker v-model="queryParam.holdingtimeEnd" @change="onChange" />
            </a-form-item>
          </a-col>-->

          <!--
          <template v-if="toggleSearchStatus">
            <a-col :md="6" :sm="8">
              <a-form-item label="企业负责人">
                <a-input placeholder="请输入企业负责人" v-model="queryParam.realname"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="8">

              <a-form-item label="招聘会时间">
                <a-select v-model="queryParam.status" placeholder="请选择招聘会时间范围">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">1-2</a-select-option>
                  <a-select-option value="2">2-3</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="8">
              <a-form-item label="联系电话">
                <a-input placeholder="请输入联系电话" v-model="queryParam.phone"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="8">

              <a-form-item label="是否到场">
                <a-select v-model="queryParam.status" placeholder="请选择招聘会时间范围">
                  <a-select-option value="">请选择</a-select-option>
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="2">否</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>-->

          <a-col :md="6" :sm="8">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <!-- <div class="table-operator" style="border-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加招聘会</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1"> <a-icon type="delete" @click="batchDel" />删除 </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>-->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{ x: 1500, y: 700 }"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template slot="enable" slot-scope="text, record">
          <div class="anty-img-wrap">
            <span>
              <a-tag v-if="record.holdingtimeOverdue == '已过期'" color="#D9D9D9">已过期</a-tag>
              <a-tag v-if="record.holdingtimeOverdue == '即将进行'" color="#FFC000">即将进行</a-tag>
              <a-tag v-if="record.holdingtimeOverdue == '正在进行'" color="#5ACF00">正在进行</a-tag>
              <a-tag v-if="record.holdingtimeOverdue == '未启用'" color="#D9D9D9">未启用</a-tag>
            </span>
          </div>
        </template>

        <template slot="examine" slot-scope="text, record">
          <div class="anty-img-wrap">
            <span>
              <a-tag v-if="record.examinestate == '审核未通过'" color="red">审核未通过</a-tag>
              <a-tag v-if="record.examinestate == '待审核'">待审核</a-tag>
              <a-tag v-if="record.examinestate == '审核通过'" color="blue">审核通过</a-tag>
            </span>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <!-- <a-popconfirm v-if="record.entrytimeOverdue != '已过期'" title="确定报名该招聘会吗?" @confirm="() => toSignup(record)">
            <a>
              <a>报名</a>
            </a>
          </a-popconfirm> 
          <a-divider v-if="record.entrytimeOverdue != '已过期'" type="vertical" /> -->
          <a-popconfirm
            v-if="record.entrytimeOverdue != '已过期'"
            title="确定报名该招聘会吗?"
            @confirm="() => Selectlocation(record)"
          >
            <a>
              <a>报名</a>
            </a>
          </a-popconfirm>
          <!-- <a-divider type="vertical" v-if="record.holdingtimeOverdue != -1" /> -->
          <a-divider v-if="record.entrytimeOverdue != '已过期'" type="vertical" />
          <a @click="PosthandleEdit(record)">发布岗位</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">招聘会详情</a>
          <a-divider type="vertical" />
          <a @click="EditParticipants(record)">编辑招聘人员</a>
          <a-divider type="vertical" />
          <a v-if="record.entrytimeOverdue != '已过期'" @click="bjSelectlocation(record)">选择展位</a>
          <!-- <a-divider type="vertical" />
          <a-popconfirm  title="确定提交审核吗?"
            @confirm="() => Submitforreview(record)">
            <a>
              <a>提交审核</a>
            </a>
          </a-popconfirm> -->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->
    <add-modal ref="modalForm" @ok="modalFormOk"></add-modal>
    <topost-modal ref="postmodalForm" @ok="modalFormOk"></topost-modal>
    <!-- 添加招聘人员 -->
    <a-modal :title="title" :width="800" :visible="tbryvisible" @cancel="tjryhandleCancel">
      <a-spin :spinning="confirmLoading">
        <!-- 1 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>招聘人员1</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div>
            <el-form :label-position="labelPosition" label-width="120px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[0].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[0].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[0].phone"></el-input>
              </el-form-item>
              <el-form-item label="是否愿意出镜" prop="oncamera">
                <el-radio v-model="formLabelAlign[0].oncamera" :label="0">否</el-radio>
                <el-radio v-model="formLabelAlign[0].oncamera" :label="1">是</el-radio>
              </el-form-item>
              <el-form-item required v-if="formLabelAlign[0].oncamera == 1">
                <span slot="label">
                  <span style="font-weight: 700; color: red">出镜注意事项</span>
                </span>
                <span style="color: black; font-weight: 700"
                  ><p>（1）确定愿意出镜的企业HR提前做好准备，并必须参加，否则会影响线上直播的正常开展。</p>
                  <p>（2）出镜时间在3分钟之内，企业HR准备好企业介绍、企业福利待遇、招聘岗位的要求等有关招聘的信息。</p>
                  <p>（3）尽量不要在抖音直播时提及微信或其他平台、电话号码等，可用“某信”等方式介绍。</p></span
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!-- 2 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>招聘人员2</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="item">
            <el-form :label-position="labelPosition" label-width="120px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[1].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[1].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[1].phone"></el-input>
              </el-form-item>
              <el-form-item label="是否愿意出镜" prop="oncamera">
                <el-radio v-model="formLabelAlign[1].oncamera" :label="0">否</el-radio>
                <el-radio v-model="formLabelAlign[1].oncamera" :label="1">是</el-radio>
              </el-form-item>
              <el-form-item required v-if="formLabelAlign[1].oncamera == 1">
                <span slot="label">
                  <span style="font-weight: 700; color: red">出镜注意事项</span>
                </span>
                <span style="color: black; font-weight: 700">
                  <p>（1）确定愿意出镜的企业HR提前做好准备，并必须参加，否则会影响线上直播的正常开展。</p>
                  <p>（2）出镜时间在3分钟之内，企业HR准备好企业介绍、企业福利待遇、招聘岗位的要求等有关招聘的信息。</p>
                  <p>（3）尽量不要在抖音直播时提及微信或其他平台、电话号码等，可用“某信”等方式介绍。</p></span
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </a-spin>

      <template slot="footer">
        <a-button @click="tjryhandleCancel">关闭</a-button>
        <a-button type="primary" @click="bcchry">保存招聘人员</a-button>
      </template>
    </a-modal>
    <!-- 报名并添加招聘人员 -->
    <a-drawer :title="title" :width="600" @close="bmtjryclose" :visible="bmandtbryvisible" @cancel="bmtjryhandleCancel">
      <a-spin :spinning="confirmLoading">
        <!-- 1 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>招聘人员1</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="item">
            <el-form :label-position="labelPosition" label-width="120px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[0].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[0].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[0].phone"></el-input>
              </el-form-item>
              <el-form-item label="是否愿意出镜" prop="oncamera">
                <el-radio v-model="formLabelAlign[0].oncamera" :label="0">否</el-radio>
                <el-radio v-model="formLabelAlign[0].oncamera" :label="1">是</el-radio>
              </el-form-item>
              <el-form-item required v-if="formLabelAlign[0].oncamera == 1">
                <span slot="label">
                  <span style="font-weight: 700; color: red">出镜注意事项</span>
                </span>
                <span style="color: black; font-weight: 700">
                  <p>（1）确定愿意出镜的企业HR提前做好准备，并必须参加，否则会影响线上直播的正常开展。</p>
                  <p>（2）出镜时间在3分钟之内，企业HR准备好企业介绍、企业福利待遇、招聘岗位的要求等有关招聘的信息。</p>
                  <p>（3）尽量不要在抖音直播时提及微信或其他平台、电话号码等，可用“某信”等方式介绍。</p></span
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!-- 2 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>招聘人员2</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="item">
            <el-form :label-position="labelPosition" label-width="120px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[1].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[1].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[1].phone"></el-input>
              </el-form-item>
              <el-form-item label="是否愿意出镜" prop="oncamera">
                <el-radio v-model="formLabelAlign[1].oncamera" :label="0">否</el-radio>
                <el-radio v-model="formLabelAlign[1].oncamera" :label="1">是</el-radio>
              </el-form-item>
              <el-form-item required v-if="formLabelAlign[1].oncamera == 1">
                <span slot="label">
                  <span style="font-weight: 700; color: red">出镜注意事项</span>
                </span>
                <span style="color: black; font-weight: 700">
                  <p>（1）确定愿意出镜的企业HR提前做好准备，并必须参加，否则会影响线上直播的正常开展。</p>
                  <p>（2）出镜时间在3分钟之内，企业HR准备好企业介绍、企业福利待遇、招聘岗位的要求等有关招聘的信息。</p>
                  <p>（3）尽量不要在抖音直播时提及微信或其他平台、电话号码等，可用“某信”等方式介绍。</p></span
                >
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </a-spin>
      <div style="margin-top: 40%; margin-left: 90%">
        <!-- <a-button @click="bmtjryhandleCancel" style="margin-right: 1%;">返回上一页</a-button> -->
        <a-button type="primary" @click="bmandbcchry">下一步</a-button>
      </div>
    </a-drawer>
    <!-- 报名展位 -->
    <a-drawer
      title="展位选择"
      :maskClosable="true"
      :width="drawerWidth"
      placement="right"
      :closable="true"
      @close="xzhandleCancel"
      :visible="zwvisible"
      style="height: 100%; overflow: auto; padding-bottom: 53px"
    >
      <booth-page :key="boothkey" :recordData="recordData" />
      <div class="drawer-bootom-button">
        <a-button style="margin-left: 85%; margin-top: 1%" @click="xzhandleCancel">关闭</a-button>
        <a-button @click="zwnext()" type="primary" style="margin-left: 1%; margin-top: 1%">确认并下一页</a-button>
        <!-- <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">保存</a-button> -->
      </div>
    </a-drawer>
    <!-- 编辑展位 -->
    <a-drawer
      title="展位选择"
      :maskClosable="true"
      :width="drawerWidth"
      placement="right"
      :closable="true"
      @close="bjxzhandleCancel"
      :visible="bjzwvisible"
      style="height: 100%; overflow: auto; padding-bottom: 53px"
    >
      <booth-page @nullInfo="nullInfo" :key="boothkey" :recordData="recordData" />
      <div class="drawer-bootom-button">
        <!-- <a-popconfirm  title="确定提交审核吗?"
            @confirm="() => Submitforreview(record)">
            <a>
              <a>提交审核</a>
            </a>
          </a-popconfirm> -->

        <a-button style="margin-left: 85%; margin-top: 1%; margin-right: 1%" @click="bjxzhandleCancel">关闭</a-button>
        <a-popconfirm v-if="jobfairinfo.buttonType != 1" title="确定提交审核吗?" @confirm="() => Submitforreview()">
          <a>
            <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交审核</a-button>
          </a>
        </a-popconfirm>
        <a-button v-else @click="Submitforreview()" type="primary" :loading="confirmLoading">下一步</a-button>
      </div>
    </a-drawer>
    <Bmbooth-modal ref="modalFormlist" @ok="modalFormOk" />
  </a-card>
</template>

<script>
import { filterObj } from '@/utils/util'
import { putAction, getFileAccessHttpUrl } from '@/api/manage'
import { frozenBatch, entbmjobfairList, jobenablecount, jobenable } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JInput from '@/components/jeecg/JInput'
import store from '@/store'
import AddModal from './modules/EntjobfairInf'
import BmboothModal from './modules/BmBooth'
import { getAction } from '@/api/manage'
import TopostModal from './modules/EntseePostion.vue'
import BoothPage from './modules/entBoothPage'

export default {
  name: 'UserList',
  mixins: [JeecgListMixin],
  components: {
    JInput,
    TopostModal,
    AddModal,
    BmboothModal,
    BoothPage,
  },
  data() {
    return {
      bjzwvisible: false,
      JumpObj: '',
      drawerWidth: '70%',
      recordData: null,
      boothkey: false,
      zwvisible: false,
      addchpo: [],
      bmandtbryvisible: false,
      jobfairinfo: '',
      labelPosition: 'right',
      formLabelAlign: [
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
      ],
      title: '添加招聘人员',
      confirmLoading: false,
      tbryvisible: false,
      isfalse: false,
      description: '',
      queryParam: {
        name: '',
        enable: '1',
        holdingtimeOverdue: '',
        holdingtimeStart: '',
        holdingtimeEnd: '',
      },
      recycleBinVisible: false,
      enableParam: {
        id: '',
        enable: '',
      },
      dataSource: [],
      // SignupformData: {
      //   createBy: '',
      //   createTime: '',
      //   enterpriseInfoId: '',
      //   id: '',
      //   jobFairId: '',
      //   updateBy: '',
      //   updateTime: '',
      // },
      jobfairdata: [],
      columns: [
        /*{
              title: '#',
              dataIndex: '',
              key:'rowIndex',
              width:60,
              align:"center",
              customRender:function (t,r,index) {
                return parseInt(index)+1;
              }
            },*/
        {
          title: '招聘会名称',
          align: 'center',
          dataIndex: 'name',
          width: 230,
          fixed: 'left',
        },
        {
          title: '主办单位',
          align: 'center',
          dataIndex: 'organizer',
          width: 190,
          // fixed: 'left'
        },
        // {
        //   title: '招聘会主题',
        //   align: 'center',
        //   width: 100,
        //   dataIndex: 'theme'
        // },
        {
          title: '报名时间',
          align: 'center',
          width: 150,
          dataIndex: 'entrytimeStart',
        },
        {
          title: '举办时间',
          align: 'center',
          width: 150,
          dataIndex: 'holdingtimeStart',
        },
        {
          title: '举办状态',
          align: 'center',
          width: 80,
          dataIndex: 'entrytimeOverdue',
          scopedSlots: { customRender: 'enable' },
        },
        {
          title: '已报名企业',
          align: 'center',
          width: 90,
          dataIndex: 'enterpriseTotal',
        },
        {
          title: '剩余展位',
          align: 'center',
          width: 80,
          dataIndex: 'surplusBooth',
        },
        {
          title: '报名审核',
          align: 'center',
          width: 100,
          dataIndex: 'examinestate',
          scopedSlots: { customRender: 'examine' },
        },
        {
          title: '通知',
          align: 'center',
          width: 300,
          dataIndex: 'remarks',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 260,
          fixed: 'right',
        },
      ],
      url: {
        syncUser: '/process/extActProcess/doSyncUser',
        list: '/sys/user/list',
        delete: '/hall/jobfair/delete',
        deleteBatch: '',
        exportXlsUrl: '/sys/user/exportXls',
        jobfairdata: '/hall/jobfair/list?pageSize=1000', //?isexisting=0
        importExcelUrl: 'sys/user/importExcel',
      },
      istrue: '',
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  created() {
    this.getJobfairList()
  },
  methods: {
    handleSubmit() {},
    nullInfo(istrue) {
      this.istrue = istrue
    },
    Submitforreview() {
      console.log(this.JumpObj, this.jobfairinfo)
      if (!this.istrue) {
        this.$message.warning('暂未选择展位，请选择展位再提交')
        return
      }
      if (this.jobfairinfo.buttonType == 1) {
        this.PosthandleEdit(this.jobfairinfo)
        this.bjxzhandleCancel()
        return
      }
      var departn = localStorage.getItem('departId')
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
            url: '/hall/booth/submitchoosebooth',
            headers: {},
            params: { enterpriseinfoid: response.result.enterpriseIds, jobfairid: this.JumpObj.id },
          }).then((response) => {
            if (response.success) {
              this.$message.success(response.message)
            } else {
              this.$message.warning(response.message)
            }
            // console.log('提交审核', response)
          })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          // data.onError() // 返回报错
          console.log(error)
        })
    },
    zwnext() {
      this.zwvisible = false
      this.toSignup(this.JumpObj)
    },
    EditParticipants(record) {
      console.log('招聘人员', record)
      this.jobfairinfo = record
      this.formLabelAlign= [
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
      ]
      var departn = localStorage.getItem('departId')
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
            url: '/app/staff/list',
            headers: {},
            params: { enterpriseInfoId: response.result.enterpriseIds, jobfairid: record.id },
          }).then((response) => {
            console.log('招聘人员信息', response.result.records)
            if (response.result.records.length < 1) {
              this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
              this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
              this.formLabelAlign[0].createBy = store.getters.userInfo.username
              this.formLabelAlign[0].name = ''
              this.formLabelAlign[0].post = ''
              this.formLabelAlign[0].phone = ''
              this.formLabelAlign[0].oncamera = ''
              this.formLabelAlign[0].createTime = this.getNowFormatDate()

              this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
              this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
              this.formLabelAlign[1].createBy = store.getters.userInfo.username
              this.formLabelAlign[1].name = ''
              this.formLabelAlign[1].post = ''
              this.formLabelAlign[1].phone = ''
              this.formLabelAlign[1].oncamera = ''
              this.formLabelAlign[1].createTime = this.getNowFormatDate()
              this.tbryvisible = true
              // this.$message.warning('该企业没有招聘人员！')
              // return
            } else if (response.result.records.length == 1) {
              this.formLabelAlign[0].jobFairId = response.result.records[0].jobFairId
              this.formLabelAlign[0].enterpriseInfoId = response.result.records[0].enterpriseInfoId
              this.formLabelAlign[0].createBy = response.result.records[0].createBy
              this.formLabelAlign[0].name = response.result.records[0].name
              this.formLabelAlign[0].post = response.result.records[0].post
              this.formLabelAlign[0].phone = response.result.records[0].phone
              this.formLabelAlign[0].oncamera = response.result.records[0].oncamera
              this.formLabelAlign[0].createTime = response.result.records[0].createTime
              this.tbryvisible = true
            } else {
              this.formLabelAlign = response.result.records
              this.tbryvisible = true
            }
          })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          // data.onError() // 返回报错
          console.log(error)
        })
    },
    bmandbcchry() {
      this.bmandtbryvisible = true

      this.jobfairinfo.buttonType = 1
      // this.PosthandleEdit(this.jobfairinfo)
      var departn = localStorage.getItem('departId')
      console.log('userID', store.getters.userInfo)
      this.axios({
        method: 'get',
        url: '/sys/getenterprisebyuser',
        headers: {},
        params: { userid: store.getters.userInfo.id, departid: departn },
      })
        .then((response) => {
          console.log('企业信息', response.result)

          this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
          this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
          this.formLabelAlign[0].createBy = store.getters.userInfo.username
          this.formLabelAlign[0].createTime = this.getNowFormatDate()

          this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
          this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
          this.formLabelAlign[1].createBy = store.getters.userInfo.username
          this.formLabelAlign[1].createTime = this.getNowFormatDate()

          if (this.formLabelAlign[0].phone != '') {
            if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign[0].phone)) {
              // callback(new Error("请输入正确的手机号"));
              this.$message.warning('招聘人员1联系电话不正确！')
              return
            }
          }
          if (this.formLabelAlign[0].oncamera === '') {
            this.$message.warning('招聘人员1请选择是否愿意出镜')
            return
          }

          if (this.formLabelAlign[1].phone != '') {
            if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign[1].phone)) {
              this.$message.warning('招聘人员2联系电话不正确！')
              return
            }
          }

          if (this.formLabelAlign[1].name == '') {
            // console.log('参会报名信息1111',  this.formLabelAlign[1])
            this.addchpo[0] = this.formLabelAlign[0]
          } else {
            if (this.formLabelAlign[1].oncamera === '') {
              this.$message.warning('招聘人员2请选择是否愿意出镜')
              return
            }
            this.addchpo = this.formLabelAlign
          }
          // this.axios({
          //   method: 'post',
          //   url: '/hall/entryenterprise/entry',
          //   headers: {},
          //   params: {},
          //   data: this.SignupformData,
          // })
          //   .then((restt) => {
          //     if (restt.success) {
          // this.$message.success(restt.message)
          console.log('报名添加招聘人员1', this.formLabelAlign)
          console.log('报名添加招聘人员2', this.addchpo)
          this.axios({
            method: 'post',
            url: '/app/staff/add',
            headers: {},
            params: {},
            data: this.addchpo,
          })
            .then((response) => {
              if (response.success) {
                // this.$message.success(response.message)
                this.loadData()
                this.bmandtbryvisible = false

                if (this.jobfairinfo.isselectionbooth == 0) {
                  this.PosthandleEdit(this.jobfairinfo)
                } else {
                  this.JumpObj = this.jobfairinfo
                  this.recordData = this.jobfairinfo
                  this.boothkey = !this.boothkey
                  this.bjzwvisible = true
                }
              } else {
                this.loadData()
                this.$message.warning(response.message)
              }
            })
            .catch(function (error) {
              // this.$message.error(res.message || '上传失败');
              console.log(error)
            })
          //   } else {
          //     this.$message.warning(restt.message)
          //   }
          // })
          // .catch(function (error) {
          //   // this.$message.error(res.message || '上传失败');
          //   console.log(error)
          // })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          // data.onError() // 返回报错
          console.log(error)
        })
    },
    bcchry() {
      console.log('招聘人员', this.formLabelAlign)

      var departn = localStorage.getItem('departId')
      console.log('userID', store.getters.userInfo)
      this.axios({
        method: 'get',
        url: '/sys/getenterprisebyuser',
        headers: {},
        params: { userid: store.getters.userInfo.id, departid: departn },
      })
        .then((response) => {
          console.log('企业信息', response.result)
          this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
          this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
          this.formLabelAlign[0].createBy = store.getters.userInfo.username
          this.formLabelAlign[0].createTime = this.getNowFormatDate()

          this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
          this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
          this.formLabelAlign[1].createBy = store.getters.userInfo.username
          this.formLabelAlign[1].createTime = this.getNowFormatDate()

          if (this.formLabelAlign[0].phone != '') {
            if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign[0].phone)) {
              // callback(new Error("请输入正确的手机号"));
              this.$message.warning('招聘人员1联系电话不正确！')
              return
            }
          }
          if (this.formLabelAlign[0].oncamera === '') {
            this.$message.warning('招聘人员1请选择是否愿意出镜')
            return
          }
          if (this.formLabelAlign[1].phone != '') {
            if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign[1].phone)) {
              this.$message.warning('招聘人员2联系电话不正确！')
              return
            }
          }
          if (this.formLabelAlign[1].name == '') {
            this.addchpo[0] = this.formLabelAlign[0]
          } else {
            if (this.formLabelAlign[1].oncamera === '') {
              this.$message.warning('招聘人员2请选择是否愿意出镜')
              return
            }
            this.addchpo = this.formLabelAlign
          }
          // this.$message.success(response.message)
          this.axios({
            method: 'post',
            url: '/app/staff/add',
            headers: {},
            params: {},
            data: this.addchpo,
          })
            .then((response) => {
              if (response.success) {
                this.$message.success(response.message)
                this.tbryvisible = false
              } else {
                this.$message.warning(response.message)
              }
            })
            .catch(function (error) {
              // this.$message.error(res.message || '上传失败');
              console.log(error)
            })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          console.log(error)
        })
    },
    bjxzhandleCancel() {
      this.bjzwvisible = false
    },
    xzhandleCancel() {
      this.zwvisible = false
    },
    bmtjryhandleCancel() {
      this.bmtjryclose()
      this.Selectlocation(this.JumpObj)
    },
    bmtjryclose() {
      this.$emit('close')
      this.bmandtbryvisible = false
    },
    tjryhandleCancel() {
      this.tjryclose()
    },
    tjryclose() {
      this.$emit('close')
      this.tbryvisible = false
    },
    getJobfairList() {
      let that = this
      getAction(that.url.jobfairdata).then((res) => {
        console.log(res, 'res')
        that.jobfairdata = res.result.records
        //that.queryParam.jobfairid = res.result.records[0].id
        // that.getEntryenterpriseList(that.queryParam.jobfairid)
        that.loadData()
      })
    },
    inEnterprise(record) {
      this.$refs.modalForminvitation.edit(record)
    },
    //选展位
    bjSelectlocation(record) {
      console.log('展位对象', record)
      var that = this
      this.JumpObj = record
      console.log('123', this.jobfairinfo)
      this.jobfairinfo = record
      this.recordData = record
      this.boothkey = !this.boothkey
      this.bjzwvisible = true
      // this.$refs.modalFormlist.reset()
      // this.$refs.modalFormlist.edit(record)
      // this.toSignup(record);Selectlocation
    },
    //
    Selectlocation(record) {
      console.log('报名对象111', record)
      // record.isselectionbooth = 1;
      var departn = localStorage.getItem('departId')

      this.axios({
        method: 'get',
        url: '/sys/getenterprisebyuser',
        headers: {},
        params: { userid: store.getters.userInfo.id, departid: departn },
      })
        .then((response) => {
          this.axios({
            method: 'get',
            url: '/hall/entryenterprise/entryjudge',
            headers: {},
            params: {
              JobFairId: record.id,
              EnterpriseInfoId: response.result.enterpriseIds,
            },
          })
            .then((response2) => {
              console.log('123', response2)
              if (!response2.success) {
                this.$message.error(response2.message)
                return
              } else {
                // this.$message.error('企业没报名招聘会');
                this.JumpObj = record
                this.recordData = record
                this.boothkey = !this.boothkey
                // if (record.isselectionbooth == 0) {
                this.toSignup(record)
              }
            })
            .catch(function (error) {
              this.$message.error(error.message || '报名失败，请联系管理人员')
              // data.onError() // 返回报错
              console.log(error)
              return
            })
        })
        .catch(function (error) {
          this.$message.error(error.message || '报名失败，请联系管理人员')
          // data.onError() // 返回报错
          console.log(error)
          return
        })

      // } else {
      //   this.zwvisible = true
      // }

      // this.$refs.modalFormlist.reset()
      // this.$refs.modalFormlist.edit(record)
      // this.toSignup(record);
    },
    //报名
    toSignup(record) {
      console.log('招聘会信息', record)
      this.jobfairinfo = record
      var departn = localStorage.getItem('departId')
      this.formLabelAlign= [
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
        {
          name: '',
          post: '',
          phone: '',
          oncamera: '',
        },
      ]
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
            url: '/app/staff/list',
            headers: {},
            params: { enterpriseInfoId: response.result.enterpriseIds, jobfairid: record.id },
          }).then((response2) => {
            console.log('招聘人员信息', response2.result.records.length)
            if (response2.result.records.length < 1) {
              this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
              this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
              this.formLabelAlign[0].createBy = store.getters.userInfo.username
              this.formLabelAlign[0].name = ''
              this.formLabelAlign[0].post = ''
              this.formLabelAlign[0].phone = ''
              this.formLabelAlign[0].oncamera = ''
              this.formLabelAlign[0].createTime = this.getNowFormatDate()

              this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
              this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
              this.formLabelAlign[1].createBy = store.getters.userInfo.username
              this.formLabelAlign[1].name = ''
              this.formLabelAlign[1].post = ''
              this.formLabelAlign[1].phone = ''
              this.formLabelAlign[1].oncamera = ''
              this.formLabelAlign[1].createTime = this.getNowFormatDate()
              this.bmandtbryvisible = true
              // this.$message.warning('该企业没有招聘人员！')
              // return
            } else if (response2.result.records.length == 1) {
              this.formLabelAlign[0].jobFairId = response2.result.records[0].jobFairId
              this.formLabelAlign[0].enterpriseInfoId = response2.result.records[0].enterpriseInfoId
              this.formLabelAlign[0].createBy = response2.result.records[0].createBy
              this.formLabelAlign[0].name = response2.result.records[0].name
              this.formLabelAlign[0].post = response2.result.records[0].post
              this.formLabelAlign[0].phone = response2.result.records[0].phone
              this.formLabelAlign[0].oncamera = response2.result.records[0].oncamera
              this.formLabelAlign[0].createTime = response2.result.records[0].createTime
              this.bmandtbryvisible = true
            } else {
              this.formLabelAlign = response2.result.records
              this.bmandtbryvisible = true
            }
          })
        })
        .catch(function (error) {
          // this.$message.error(res.message || '上传失败');
          // data.onError() // 返回报错
          console.log(error)
        })
      // this.tbryvisible = true;
    },
    PosthandleEdit(record) {
      console.log('传值', record)
      this.jobfairinfo = record
      this.$refs.postmodalForm.edit(record)
      // if (record.holdingtimeEnd < this.getNowFormatDate()) {
      //   this.$notification['warning']({
      //     message: '通知',
      //     duration: 2,
      //     description: '招聘会已过期，无法编辑！',
      //   })
      // } else {
      //   this.$refs.modalForm.edit(record)
      // }
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
    editDictItem(record) {
      if (record.enable == '未启用') {
        this.$message.warn('招聘会未启用，不能编辑展位')
      } else if (record.enable == '已启用') {
        this.$refs.modalFormlist.reset()
        this.$refs.modalFormlist.edit(record)
      }
    },
    invitationitem(record) {
      this.$refs.invitationlist.edit(record)
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

          let getparams = this.getQueryParams() //查询条件
          let params = {}
          params.jobfairId = getparams.jobfairid
          console.log('table参数', this.getQueryParams())
          params.enable = getparams.enable
          // params.holdingtimeOverdue = getparams.holdingtimeOverdue
          params.enterpriseinfoid = response.result.enterpriseIds
          console.log('table参数2', params)
          // entbmjobfairList(params).then((res) => {
          this.axios({
            method: 'get',
            url: '/hall/entryenterprise/queryjobfairEntryEnterpriseJob',
            headers: {},
            params: params,
          }).then((res) => {
            if (params.enterpriseinfoid == '' || params.enterpriseinfoid == null) {
              console.log('table数据1', res.success)
              this.dataSource = []
            } else {
              if (res.success) {
                console.log('table数据2', res.result.re)
                for (var i = 0; i < res.result.records.length; ++i) {
                  // res.result.records[i].enable = res.result.records[i].enable == 1 ? '已启用' : '未启用'
                  // res.result.records[i].entrytimeOverdue = res.result.records[i].enable == 1 ? '已启用' : '未启用'
                  // if (res.result.records[i].entrytimeOverdue == -1) {
                  //   res.result.records[i].entrytimeOverdue = '已过期'
                  // } else if (res.result.records[i].entrytimeOverdue == 0) {
                  //   res.result.records[i].entrytimeOverdue = '即将进行'
                  // } else if (res.result.records[i].entrytimeOverdue == 1 && res.result.records[i].enable == 1) {
                  //   res.result.records[i].entrytimeOverdue = '正在进行'
                  // } else if (res.result.records[i].entrytimeOverdue == 1 && res.result.records[i].enable == -1) {
                  //   res.result.records[i].entrytimeOverdue = '即将进行'
                  // }
                  if (res.result.records[i].enable == 1) {
                    if (res.result.records[i].holdingtimeOverdue == 1) {
                      res.result.records[i].holdingtimeOverdue = '正在进行'
                    } else if (res.result.records[i].holdingtimeOverdue == -1) {
                      res.result.records[i].holdingtimeOverdue = '已过期'
                    } else if (res.result.records[i].holdingtimeOverdue == 0) {
                      res.result.records[i].holdingtimeOverdue = '即将进行'
                    }
                  } else if (res.result.records[i].enable == -1) {
                    if (res.result.records[i].holdingtimeOverdue == 1) {
                      res.result.records[i].holdingtimeOverdue = '未启用'
                    } else if (res.result.records[i].holdingtimeOverdue == -1) {
                      res.result.records[i].holdingtimeOverdue = '已过期'
                    } else if (res.result.records[i].holdingtimeOverdue == 0) {
                      res.result.records[i].holdingtimeOverdue = '即将进行'
                    }
                  }

                  if (res.result.records[i].entrytimeOverdue == 1) {
                    res.result.records[i].entrytimeOverdue = '正在进行'
                  } else if (res.result.records[i].entrytimeOverdue == 0) {
                    res.result.records[i].entrytimeOverdue = '即将进行'
                  } else if (res.result.records[i].entrytimeOverdue == -1) {
                    res.result.records[i].entrytimeOverdue = '已过期'
                  }

                  // examinestate

                  if (res.result.records[i].examinestate == -1) {
                    res.result.records[i].examinestate = '审核未通过'
                  } else if (res.result.records[i].examinestate == 0) {
                    res.result.records[i].examinestate = '待审核'
                  } else if (res.result.records[i].examinestate == 1) {
                    res.result.records[i].examinestate = '审核通过'
                  } else if (res.result.records[i].examinestate == -2) {
                    res.result.records[i].examinestate = ''
                  }

                  if (res.result.records[i].entrytimeStart != null && res.result.records[i].entrytimeStart != '待定') {
                    let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 10)
                    let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 10)

                    res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
                  } else {
                    res.result.records[i].entrytimeStart = '待定'
                  }

                  if (
                    res.result.records[i].holdingtimeStart != null &&
                    res.result.records[i].holdingtimeStart != '待定'
                  ) {
                    console.log('报错数据1', res.result.records[i].holdingtimeStart)
                    console.log('报错数据2', res.result.records[i].holdingtimeEnd)
                    let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 10)
                    let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 10)
                    res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
                  } else {
                    res.result.records[i].holdingtimeStart = '待定'
                  }
                  // let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 16)
                  // let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 16)
                  // res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
                  // let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 16)
                  // let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 16)
                  // res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
                }
                this.dataSource = res.result.records
                console.log('数据列表', this.dataSource)
                this.ipagination.total = res.result.total
              }
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
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      if (this.superQueryParams) {
        param['superQueryParams'] = encodeURI(this.superQueryParams)
        param['superQueryMatchType'] = this.superQueryMatchType
      }
      return filterObj(param)
    },
    getAvatarView: function (avatar) {
      return getFileAccessHttpUrl(avatar)
    },
    //是否启用
    handleEnable(recdata) {
      if (recdata.holdingtimeEnd < this.getNowFormatDate()) {
        this.$notification['warning']({
          message: '通知',
          duration: 2,
          description: '招聘会已过期，无法启用！',
        })
      } else {
        const that = this
        console.log('启用' + recdata)
        that.enableParam.id = recdata.id
        that.enableParam.enable = 1

        let params = this.getQueryParams() //查询条件

        jobenablecount().then((res) => {
          if (res.result.records.length >= 1) {
            // console.log('res')
            // console.log(res.result.records.length)
            return that.$message.warning('已有招聘会启用，一次只能启用一个！')
          } else {
            jobenable(that.enableParam).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                this.loadData()
              } else {
                that.$message.warning(res.message)
                this.loadData()
              }
            })
          }
        })
      }
    },
    handleDisable(DisableId) {
      const that = this
      that.enableParam.id = DisableId
      that.enableParam.enable = -1
      jobenable(that.enableParam).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          this.loadData()
        } else {
          that.$message.warning(res.message)
          this.loadData()
        }
      })
    },
    batchFrozen: function (status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return false
      } else {
        let ids = ''
        let that = this
        let isAdmin = false
        that.selectionRows.forEach(function (row) {
          if (row.username == 'admin') {
            isAdmin = true
          }
        })
        if (isAdmin) {
          that.$message.warning('管理员账号不允许此操作,请重新选择！')
          return
        }
        that.selectedRowKeys.forEach(function (val) {
          ids += val + ','
        })
        that.$confirm({
          title: '确认操作',
          content: '是否' + (status == 1 ? '解冻' : '冻结') + '选中账号?',
          onOk: function () {
            frozenBatch({ ids: ids, status: status }).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            })
          },
        })
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel()
      } else if (e.key == 2) {
        this.batchFrozen(2)
      } else if (e.key == 3) {
        this.batchFrozen(1)
      }
    },
    handleFrozen: function (id, status, username) {
      let that = this
      //TODO 后台校验管理员角色
      if ('admin' == username) {
        that.$message.warning('管理员账号不允许此操作！')
        return
      }
      frozenBatch({ ids: id, status: status }).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.loadData()
        } else {
          that.$message.warning(res.message)
        }
      })
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username)
    },
    handleAgentSettings(username) {
      this.$refs.sysUserAgentModal.agentSettings(username)
      this.$refs.sysUserAgentModal.title = '用户代理人设置'
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>

