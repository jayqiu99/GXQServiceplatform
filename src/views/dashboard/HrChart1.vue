<template>
  <div class="page-header-index-wide">
    <!-- <a-card :loading="loading" :bordered="false" title :style="{ marginTop: '24px' }">
      <h1 style="font-size: 36px;">2021年年度招聘会数据分析</h1>
    </a-card> -->
    <a-card :loading="loading" :bordered="false" title>
      <a-row :gutter="24">
        <!-- <a-col :sm="24" :md="12" :xl="4" :style="{ marginBottom: '24px' }">
          <a-card title="待办工作" class="dbgzclass" style="width: 100%;">
            
            <div>
            <span><a  slot="extra" href="" class="afount">企业信息审核</a></span>
            <span class="ahrefco" style="margin-left: 15%;">{{Jobfair}}</span>
            </div>
            <div id="postdiv">
            <span><a slot="extra" href="" class="afount">岗位审核</a></span>
            <span class="ahrefco" style="margin-left: 30%;">{{Jobfair}}</span>
            </div>
            <div id="jobfdiv">
            <span><a slot="extra" href="" class="afount">报名企业审核</a></span>
            <span class="ahrefco" style="margin-left: 15%;">{{Jobfair}}</span>
            </div>
          </a-card>
        </a-col> -->
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card class="jlsclass" style="width: 90%">
            <div><span>高新区人力资源</span></div>
            <div><span>招聘会数</span></div>
            <span style="float: right; font-size:22px;margin-top: -15%; margin-right: 5%">{{ Jobfair }}</span>
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card class="rzqy" style="width: 90%">
            <div><span>高新区人力资源</span></div>
            <div><span>入驻企业</span></div>
            <span style="float: right; font-size:22px;margin-top: -15%; margin-right: 5%">{{ enterpriseCount }}</span>
            <!-- <span>广东加薪发布入驻企业</span>
            <span style="margin-left: 20%">{{ enterpriseCount }}</span> -->
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card class="gwsclass" style="width: 90%">
            <div><span>高新区人力资源</span></div>
            <div><span>岗位数</span></div>
            <span style="float: right; font-size:22px;margin-top: -15%; margin-right: 5%">{{ postReleaseCount }}</span>
            <!-- <span>广东加薪发布岗位数</span>
            <span style="margin-left: 20%">{{ postReleaseCount }}</span> -->
          </a-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
          <a-card class="jlsclass" style="width: 90%">
            <div><span>高新区人力资源</span></div>
            <div><span>注册简历</span></div>
            <span style="float: right;font-size:22px; margin-top: -15%; margin-right: 5%">{{ curriculumVitaeCount
              }}</span>
            <!-- <span>广东加薪发布简历数</span>
            <span style="margin-left: 20%">{{ curriculumVitaeCount }}</span> -->
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card :loading="loading" v-if="!isShow" :bordered="false" title="招聘会报名" :style="{ marginTop: '24px' }">
      <div style="float: left;margin-top: -4%;margin-left: 5.5%;">
        <img src="../../assets/fit.png" alt="logo" style="margin-left:2px;">
        <img src="../../assets/fit.png" alt="logo" style="margin-left:5px;">
        <img src="../../assets/fit.png" alt="logo" style="margin-left:5px;">
      </div>

      <!-- :class="fordiv(i)" -->
      <div v-for="(item, i) in bMdatesource">
        <el-alert title="" v-if="bMdatesource[i].holdingtimeDate !== null " :closable="false" class="leftdivcss" type="success"
          style="width: 15%;float:left;height: 95px;" description="">
          <div slot="title" class="header-title">
            <span class="title-name">{{bMdatesource[i].holdingtimeDate}}</span>
            <!-- <span class="title-name">待定</span> -->
          </div>
          <slot>
            <span class="el-alert__description">{{bMdatesource[i].holdingtimeWeek}}</span>
          </slot>
        </el-alert>
        <el-alert title="" v-if="bMdatesource[i].holdingtimeDate == null " :closable="false" class="leftdivcss" type="success"
          style="width: 15%;float:left;height: 95px;" description="">
          <div slot="title" class="header-title" style="width: 200%;">
            <span class="title-name" style="margin-left: 20%;font-weight: 900;">待定</span>
          </div>
          <!-- <slot>
            <span class="el-alert__description">{{bMdatesource[i].holdingtimeWeek}}</span>
          </slot> -->
        </el-alert>

        <div v-on:click="clickalert(item)">
          <el-alert title="" style="width: 75%;float:left;height: 95px;" :closable="false" type="info">
            <div slot="title" class="header-title">
              <span class="title-name">{{bMdatesource[i].name}}</span>
            </div>
            <div style="width: 100%;">
              <slot style="display: flex;">
                <span class="el-alert__description">地点：{{bMdatesource[i].address | ellipsis}} </span>
                <span class="el-alert__description">&nbsp;&nbsp;&nbsp;&nbsp;已参会企业：<span style="color: coral;">
                    {{bMdatesource[i].enterpriseTotal}}</span></span>
                <span class="el-alert__description">&nbsp;&nbsp;&nbsp;&nbsp;剩余展位：<span style="color: coral;">
                    {{bMdatesource[i].surplusBooth}}</span></span>
                <span class="el-alert__description">&nbsp;&nbsp;&nbsp;&nbsp;我的报名状态：<span style="color: coral;">
                    {{bMdatesource[i].examinestate}}</span></span>
              </slot>
            </div>
            <!-- <div style="width: 70%;margin-top: -3%;position: absolute;padding-left: 89%;" v-on:click="clickalert()">
        <el-button class="butclass" type="primary" @click="clickalerttwo">立即报名</el-button>
      </div> -->

          </el-alert>
        </div>
        <el-alert title="" :closable="false" center style="width: 10%;float:left;height: 95px;">
          <div>
            <router-link to='/jobfair/entjobfairbm'>
              <el-button v-if="bMdatesource[i].entrytimeOverdue != '已过期' && bMdatesource[i].examinestate !='已报名'"
                class="butclass" type="primary" @click="clickalerttwo(bMdatesource[i])">立即报名</el-button>
            </router-link>

            <el-button v-if="bMdatesource[i].entrytimeOverdue == '已过期'" type="info" plain disabled>报名已截止</el-button>
          </div>

        </el-alert>
        <div>&nbsp;</div>
      </div>

    </a-card>

    <a-card :loading="loading" v-if="isShow" :bordered="false" title="招聘信息分析" :style="{ marginTop: '24px' }">
      <a-row>
        <a-col :style="{ marginBottom: '24px' }">
          <a-card :loading="loading" :bordered="false" title="">
            <ve-line style="width: auto; height: 320px; position: relative" :data="chartData11"
              :settings="chartSettings">
            </ve-line>
            <div style="margin-left: 97%">月份</div>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :style="{ marginBottom: '24px' }">
          <a-card :loading="loading" :bordered="false" title="">
            <ve-line style="width: auto; height: 320px; position: relative" :data="chartDatatwo"
              :settings="chartSettings">
            </ve-line>
            <div style="margin-left: 97%">月份</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card :loading="loading" :bordered="false" title :style="{ marginTop: '24px' }">
      <a-row :gutter="24">
        <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card :loading="loading" :bordered="false" title="最新人才">
            <a slot="extra" v-if="isShow" href="http://zqgxjob.gxzhdw.cn:1022/candidates/CandidateList">更多</a>
            <div style="font-size: 20px">
              <a-list :data-source="listdata">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <div class="rcdiv"></div>
                  <a-list-item-meta :description="item.tostritem">
                    <a slot="title">{{ item.name }}</a>
                  </a-list-item-meta>
                  <div class="uodatetimecolor">{{ item.updateTime }}</div>
                </a-list-item>
                <div v-if="loading " class="demo-loading-container">
                  <a-spin />
                </div>
              </a-list>
            </div>
          </a-card>
        </a-col>

        <a-col :sm="24" :md="12" :xl="12" :style="{ marginBottom: '24px' }">
          <a-card :loading="loading" :bordered="false" title="最新岗位">
            <a slot="extra" v-if="isShow" href="http://zqgxjob.gxzhdw.cn:1022/recruitmentposition/post">更多</a>
            <div>
              <a-list item-layout="horizontal" :data-source="postlistdata">
                <a-list-item slot="renderItem" slot-scope="item">
                  <div class="gwdiv"></div>
                  <a-list-item-meta :description="item.tostritem">
                    <a slot="title">{{ item.postName }}</a>
                  </a-list-item-meta>
                  <div class="uodatetimecolor">{{ item.updateTime }}</div>
                  <!-- <a-list-item-meta>
                    <a slot="title">{{ item.address }}</a>
                  </a-list-item-meta> -->
                </a-list-item>
              </a-list>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <!-- 报名并添加参会人员 -->
    <a-modal :title="chtitle" :width="600" :visible="bmandtbryvisible" @cancel="bmtjryhandleCancel">
      <a-spin :spinning="confirmLoading">
        <!-- 1 -->
        <el-card class="box-card" style="height: 300px;">
          <div slot="header" class="clearfix">
            <span>参会人员1</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[0].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[0].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[0].phone"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!-- 2 -->
        <el-card class="box-card" style="height: 300px;">
          <div slot="header" class="clearfix">
            <span>参会人员2</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign[1].name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="formLabelAlign[1].post"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="formLabelAlign[1].phone"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </a-spin>

      <template slot="footer">
        <a-button @click="bmtjryhandleCancel">关闭</a-button>
        <a-button type="primary" @click="bmandbcchry">报名招聘会</a-button>
      </template>
    </a-modal>
    <see-modal ref="toomodalForm"></see-modal>
  </div>
</template>

<script>
  import SeeModal from './modules/SeejobfairIndex'
  import ChartCard from '@/components/ChartCard'
  import MiniArea from '@/components/chart/MiniArea'
  import ACol from 'ant-design-vue/es/grid/Col'
  import store from '@/store'

  export default {
    name: 'IndexChart',
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 40) {
          return value.slice(0, 40) + '...'
        }
        return value
      }
    },
    components: {
      ACol,
      ChartCard,
      MiniArea,
      SeeModal
    },
    data() {
      this.chartSettings = {
        yAxisName: ['数量'], //单位
      }
      return {
        addchpo: [],
        SignupformData: {
          createBy: '',
          createTime: '',
          enterpriseInfoId: '',
          id: '',
          jobFairId: '',
          updateBy: '',
          updateTime: '',
        },
        jobfairinfo: '',
        chtitle: '添加参会人员',
        confirmLoading: false,
        labelPosition: 'right',
        formLabelAlign: [{
          name: '',
          post: '',
          phone: ''
        }, {
          name: '',
          post: '',
          phone: ''
        }],
        bmandtbryvisible: false,//参会人员
        bMdatesource: [],
        // v-charts配置参数 
        foralrte: [
          { id: 1, name: "name1" },
          { id: 2, name: "name2" },
          { id: 3, name: "name3" }
        ],
        isShow: true,
        listdata: [],
        postlistdata: [],
        loading: true,
        center: null,
        Jobfair: 0,
        chartData11: {},
        chartDatatwo: {},
        chartData12: {
          columns: ['招聘会', '应聘者人数', '企业数'],
          rows: [
            { 招聘会: '应届生专场招聘会', 应聘者人数: 1393, 企业数: 109 },
            { 招聘会: '大型综合招聘会', 应聘者人数: 3530, 企业数: 323 },
            { 招聘会: '行业人才招聘会', 应聘者人数: 2923, 企业数: 262 },
            { 招聘会: '中高级人才招聘会 ', 应聘者人数: 1723, 企业数: 142 },
          ],
        },

        chartData21: {
          columns: ['职位', '职位数', '录用数'],
          rows: [
            { 职位: '系统架构师', 职位数: 1134, 录用数: 854 },
            { 职位: '网页设计', 职位数: 2951, 录用数: 2433 },
            { 职位: '数据库管理', 职位数: 2573, 录用数: 2333 },
            { 职位: '程序员', 职位数: 922, 录用数: 757 },
            { 职位: '测试工程师', 职位数: 3153, 录用数: 2935 },
            { 职位: '产品经理', 职位数: 1367, 录用数: 1233 },
            { 职位: '项目经理', 职位数: 900, 录用数: 500 },
          ],
        },

        chartData22: {
          columns: ['行业', '职位数', '录用数'],
          rows: [
            { 行业: '旅游业', 职位数: 14000, 录用数: 11335 },
            { 行业: '服务业', 职位数: 15000, 录用数: 15336 },
            { 行业: '制造业', 职位数: 22000, 录用数: 19854 },
            { 行业: '高新科技产业', 职位数: 13000, 录用数: 11045 },
            { 行业: '娱乐业', 职位数: 12000, 录用数: 11845 },
            { 行业: '地产业', 职位数: 15000, 录用数: 12995 },
          ],
        },

        chartData31: {
          columns: ['地区', '人数'],
          rows: [
            { 地区: '本市', 人数: 93826 },
            { 地区: '本省', 人数: 23667 },
            { 地区: '外省', 人数: 6507 },
          ],
        },

        chartData32: {
          columns: ['日期', '参加人数', '录用人数'],
          rows: [
            { 日期: '1月', 参加人数: 11657, 录用人数: 10335 },
            { 日期: '2月', 参加人数: 12850, 录用人数: 10354 },
            { 日期: '3月', 参加人数: 10354, 录用人数: 9334 },
            { 日期: '4月', 参加人数: 10985, 录用人数: 8977 },
            { 日期: '5月', 参加人数: 9154, 录用人数: 6000 },
            { 日期: '6月', 参加人数: 11513, 录用人数: 9513 },
            { 日期: '7月', 参加人数: 9356, 录用人数: 7356 },
            { 日期: '8月', 参加人数: 10461, 录用人数: 8461 },
            { 日期: '9月', 参加人数: 8987, 录用人数: 6987 },
            { 日期: '10月', 参加人数: 10866, 录用人数: 8866 },
            { 日期: '11月', 参加人数: 9721, 录用人数: 7721 },
            { 日期: '12月', 参加人数: 8096, 录用人数: 6096 },
          ],
        },
        enterpriseCount: 0, //企业数
        postReleaseCount: 0, //岗位数
        curriculumVitaeCount: 0, //简历数
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
    },
    mounted() {
      // var departn = localStorage.getItem('departId')
      //   console.log('部门信息', departn)
      //   console.log('userID', store.getters.userInfo.id)
      //   this.axios({
      //     method: 'get',
      //     url: '/sys/getenterprisebyuser',
      //     headers: {},
      //     params: { userid: store.getters.userInfo.id, departid: departn },
      //   })
      //     .then((response) => {
      //       console.log('企业信息', response.result)

      //       let params = this.getQueryParams() //查询条件
      //       params.id = response.result.enterpriseIds
      //       console.log('table参数', params)
      //     })
      //     .catch(function (error) {
      //       // this.$message.error(res.message || '上传失败');
      //       data.onError() // 返回报错
      //       console.log(error)
      //     })
      this.bMclick();//报名列表
      this.loadingchartData()
      this.loadingchartDatatwo()
      this.geiJobfair()
      this.Statisticscount()
      this.topostlist()
      this.tocurlistdata()
      this.isShowbut();
    },
    methods: {
      // //限制字符长度
      // ellipsis(value){
      //     if (!value) return '';
      //     if (value.length > 12) {
      //       return value.slice(0,12) + '...'
      //     }
      //     return value
      //   },

      //添加参会人员
      bmandbcchry() {
        this.bmandtbryvisible = true;
        var departn = localStorage.getItem('departId')
        console.log('userID', store.getters.userInfo)
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn },
        })
          .then((response) => {
            // console.log('报名企业信息', response.result)
            // console.log('报名招聘会信息', this.jobfairinfo)
            // debugger
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
                this.$message.warning('参会人员1联系电话不正确！')
                return;
              }
            }
            if (this.formLabelAlign[1].phone != '') {
              if (!/^1[3456789]\d{9}$/.test(this.formLabelAlign[1].phone)) {
                this.$message.warning('参会人员2联系电话不正确！')
                return;
              }
            }

            this.SignupformData.createBy = store.getters.userInfo.username
            this.SignupformData.createTime = this.getNowFormatDate()
            this.SignupformData.enterpriseInfoId = response.result.enterpriseIds
            this.SignupformData.jobFairId = this.jobfairinfo.id
            console.log('报名信息', this.SignupformData)

            if (this.formLabelAlign[1].name == '') {
              // console.log('参会报名信息1111',  this.formLabelAlign[1])
              this.addchpo[0] = this.formLabelAlign[0];
            } else {
              this.addchpo = this.formLabelAlign;
            }
            // console.log('参会报名信息1111',  this.addchpo)
            // console.log('参会报名信息2222',  this.formLabelAlign)
            this.axios({
              method: 'post',
              url: '/hall/entryenterprise/entry',
              headers: {},
              params: {},
              data: this.SignupformData,
            })
              .then((restt) => {
                if (restt.success) {
                  this.$message.success(restt.message)

                  console.log("报名添加参会人员11234567890-", this.formLabelAlign);
                  console.log("报名添加参会人员2", this.addchpo);
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
                        this.bmandtbryvisible = false;
                        // this.bMclick();
                      } else {
                        this.$message.warning(response.message)
                        // this.bMclick();
                      }
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                  this.bMclick();
                } else {
                  this.$message.warning(restt.message)
                }
              })
              .catch(function (error) {
                this.bMclick();
                console.log(error)
              })
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      bmtjryhandleCancel() {
        this.bmtjryclose()
      },
      bmtjryclose() {
        this.$emit('close')
        this.bmandtbryvisible = false
      },

      bMclick() {
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

            let params = {};
            // params.enable = getparams.enable
            // params.holdingtimeOverdue = getparams.holdingtimeOverdue
            params.enterpriseinfoid = response.result.enterpriseIds
            params.isexisting = 1;
            console.log('table参数2', params)
            // entbmjobfairList(params).then((res) => {
            this.axios({
              method: 'get',
              url: '/hall/entryenterprise/queryjobfairEntryEnterpriseJob',
              headers: {},
              params: params,
            })
              .then((res) => {
                if (params.enterpriseinfoid == '' || params.enterpriseinfoid == null) {
                  console.log('报名table数据1', res.success)
                  this.bMdatesource = []
                } else {
                  if (res.success) {
                    console.log('报名table数据2', res.result.re)
                    for (var i = 0; i < res.result.records.length; ++i) {



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

                      // if (res.result.records[i].examinestate == -1) {
                      //   res.result.records[i].examinestate = '审核未通过'
                      // } else if (res.result.records[i].examinestate == 0) {
                      //   res.result.records[i].examinestate = '待审核'
                      // } else if (res.result.records[i].examinestate == 1) {
                      //   res.result.records[i].examinestate = '审核通过'
                      // } else if (res.result.records[i].examinestate == -2) {
                      //   res.result.records[i].examinestate = ''
                      // }
                      if (res.result.records[i].examinestate == -2) {
                        res.result.records[i].examinestate = '未报名'
                      } else {
                        res.result.records[i].examinestate = '已报名'
                      }

                      if (res.result.records[i].entrytimeStart != null) {
                        let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 16)
                        let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 16)

                        res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
                      }

                      if (res.result.records[i].holdingtimeStart != null) {
                        let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 16)
                        let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 16)
                        res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
                      }
                      // let jentrytimeStart = res.result.records[i].entrytimeStart.substr(0, 16)
                      // let jentrytimeEnd = res.result.records[i].entrytimeEnd.substr(0, 16)
                      // res.result.records[i].entrytimeStart = jentrytimeStart + ' 至 ' + jentrytimeEnd
                      // let jholdingtimeStart = res.result.records[i].holdingtimeStart.substr(0, 16)
                      // let jholdingtimeEnd = res.result.records[i].holdingtimeEnd.substr(0, 16)
                      // res.result.records[i].holdingtimeStart = jholdingtimeStart + ' 至 ' + jholdingtimeEnd
                    }
                    this.bMdatesource = res.result.records
                    console.log('报名数据列表', this.bMdatesource)
                    console.log('报名数据列表22', this.foralrte)
                    // this.ipagination.total = res.result.total
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
      fordiv(index) {
        console.log("样式下表", index);
        return 'fordiv' + index;
      },
      clickalert(item) {
        console.log("conconcconc", item);
        this.$refs.toomodalForm.edit(item)
      },
      clickalerttwo(record) {
        console.log("conconcconc2222", record);
        // this.jobfairinfo = record;

        // var departn = localStorage.getItem('departId')
        // this.axios({
        //   method: 'get',
        //   url: '/sys/getenterprisebyuser',
        //   headers: {},
        //   params: { userid: store.getters.userInfo.id, departid: departn },
        // })
        //   .then((response) => {
        //     console.log('企业信息', response.result)


        //     this.axios({
        //       method: 'get',
        //       url: '/app/staff/list',
        //       headers: {},
        //       params: { enterpriseInfoId: response.result.enterpriseIds, jobfairid: record.id },
        //     })
        //       .then((response) => {
        //         console.log('参会人员信息', response.result.records.length)
        //         console.log('参会人员信息', response.result.records)
        //         if (response.result.records.length < 1) {
        //           this.formLabelAlign[0].jobFairId = this.jobfairinfo.id
        //           this.formLabelAlign[0].enterpriseInfoId = response.result.enterpriseIds
        //           this.formLabelAlign[0].createBy = store.getters.userInfo.username
        //           this.formLabelAlign[0].name = ''
        //           this.formLabelAlign[0].post = ''
        //           this.formLabelAlign[0].phone = ''
        //           this.formLabelAlign[0].createTime = this.getNowFormatDate()

        //           this.formLabelAlign[1].jobFairId = this.jobfairinfo.id
        //           this.formLabelAlign[1].enterpriseInfoId = response.result.enterpriseIds
        //           this.formLabelAlign[1].createBy = store.getters.userInfo.username
        //           this.formLabelAlign[1].name = ''
        //           this.formLabelAlign[1].post = ''
        //           this.formLabelAlign[1].phone = ''
        //           this.formLabelAlign[1].createTime = this.getNowFormatDate()
        //           this.bmandtbryvisible = true;
        //           // this.$message.warning('该企业没有参会人员！')
        //           // return
        //         } else if (response.result.records.length == 1) {
        //           this.formLabelAlign[0].jobFairId = response.result.records[0].jobFairId
        //           this.formLabelAlign[0].enterpriseInfoId = response.result.records[0].enterpriseInfoId
        //           this.formLabelAlign[0].createBy = response.result.records[0].createBy
        //           this.formLabelAlign[0].name = response.result.records[0].name
        //           this.formLabelAlign[0].post = response.result.records[0].post
        //           this.formLabelAlign[0].phone = response.result.records[0].phone
        //           this.formLabelAlign[0].createTime = response.result.records[0].createTime
        //           this.bmandtbryvisible = true;
        //         }
        //         else {
        //           this.formLabelAlign = response.result.records
        //           this.bmandtbryvisible = true;
        //         }

        //       })

        //   })
        //   .catch(function (error) {
        //     // this.$message.error(res.message || '上传失败');
        //     // data.onError() // 返回报错
        //     console.log(error)
        //   })
      },
      // 获取时间
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
      isShowbut() {
        var departn = localStorage.getItem('departId')
        console.log('部门信息', departn)
        console.log('userID', store.getters.userInfo.id)
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn }
        })
          .then(response => {
            // console.log('登录企业信息', response.result)
            if (response.result.enterpriseIds == '') {
              console.log("超级管理员登录");
              this.isShow = true;
            } else {
              console.log("企业登录");
              this.isShow = false;
            }
          })
          .catch(function (error) {
            // this.$message.error(res.message || '上传失败');
            data.onError() // 返回报错
            console.log(error)
          })
      },
      tocurlistdata() {
        this.axios({
          method: 'get',
          url: '/hall/curriculumvitae/list',
          headers: {},
          // params: { openid: 1 }
        })
          .then((response) => {
            // postName
            this.listdata = response.result.records
            console.log('最新人才信息', this.listdata.length)
            for (var i = 0; i < this.listdata.length; i++) {
              if (this.listdata[i].intendedPosition == null) {
                this.listdata[i].intendedPosition = '不限'
              }
              var birthdayto = this.listdata[i].birthday
              var birthday_time = birthdayto.split('-')
              var birthYear = birthday_time[0]

              var d = new Date()
              var nowYear = d.getFullYear()
              var age = nowYear - birthYear
              this.listdata[i].tostritem =
                this.listdata[i].gender +
                '/' +
                age +
                '岁/' +
                this.listdata[i].education +
                '\xa0 \xa0' +
                '职位意向：' +
                this.listdata[i].intendedPosition

              var timearr = this.listdata[i].updateTime.replace(' ', ':').replace(/\:/g, '-').split('-')
              var timestr = '' + timearr[0] + '/' + timearr[1] + '/' + timearr[2]
              // console.log('更新日期', timestr)
              this.listdata[i].updateTime = timestr
              // {{ item.gender }}/{{ item.education }}/职位意向：{{ item.intendedPosition }}
            }
            console.log('最新人才信息', this.listdata)
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
      topostlist() {
        this.axios({
          method: 'get',
          url: '/hall/position/seekjob',
          headers: {},
          params: { openid: 1 },
        })
          .then((response) => {
            // postName
            this.postlistdata = response.result.records
            for (var i = 0; i < this.postlistdata.length; i++) {
              if (this.postlistdata[i].workExperience == null) {
                this.postlistdata[i].workExperience = '不限'
              }
              this.postlistdata[i].tostritem =
                this.postlistdata[i].educationRequirements +
                '/工作经验：' +
                this.postlistdata[i].workExperience +
                ' \xa0 | \xa0' +
                this.postlistdata[i].enterpriseName
              // this.postlistdata[i].tostritem=this.postlistdata[i].educationRequirements+"/工作经验："+this.postlistdata[i].workExperience+"\xa0 \xa0 \xa0地址："+this.postlistdata[i].address

              var timearr = this.postlistdata[i].updateTime.replace(' ', ':').replace(/\:/g, '-').split('-')
              var timestr = '' + timearr[0] + '/' + timearr[1] + '/' + timearr[2]
              // console.log('更新日期', timestr)
              this.postlistdata[i].updateTime = timestr
              // {{ item.gender }}/{{ item.education }}/职位意向：{{ item.intendedPosition }}
            }
            console.log('最新岗位信息', response.result.records)
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
      Statisticscount() {
        this.axios({
          method: 'get',
          url: '/hall/statistics/PositionHomePageStatistics',
          headers: {},
          params: { openid: 1 },
        })
          .then((response) => {
            this.enterpriseCount = response.result.enterpriseCount
            this.postReleaseCount = response.result.postReleaseCount
            this.curriculumVitaeCount = response.result.curriculumVitaeCount
            console.log('首页统计', response.result)
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
      geiJobfair() {
        this.axios({
          method: 'get',
          url: '/hall/jobfair/list',
          headers: {},
        })
          .then((response) => {
            this.Jobfair = response.result.total
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
      // chartDatatwo
      loadingchartDatatwo() {
        this.axios({
          method: 'get',
          url: '/BigScreen/statistics/getHomePageDataPost',
          headers: {},
        })
          .then((response) => {
            this.chartDatatwo = response
            console.log('年度统计2', response)
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
      loadingchartData() {
        this.axios({
          method: 'get',
          url: '/BigScreen/statistics/getHomePageData',
          headers: {},
        })
          .then((response) => {
            this.chartData11 = response
            console.log('年度统计1', response)
          })
          .finally(() => { })
          .catch(function (error) {
            console.log(error)
          })
      },
    },
  }
</script>
<style scoped>
  .fordiv0 {
    height: 100%;
    width: 100%;
    margin-top: 6%;
  }

  .fordiv1 {
    height: 100%;
    width: 100%;
    margin-top: 6%;
  }

  .fordiv2 {
    height: 100%;
    width: 100%;
    margin-top: 6%;
  }

  .fordiv3 {
    margin-top: 6%;
  }

  .fordiv4 {
    margin-top: 6%;
  }

  .butclass {
    /* position: relative;
    margin-left: 130%;
    float: left;
    margin-top: -5%; */
  }

  .el-alert--info.is-light {
    background-color: #f9f9fc;
  }

  .el-alert--info.is-light {
    color: black;
  }

  .el-alert--info .el-alert__description {
    color: black;
  }

  /* 左div */
  .el-alert--success.is-light {
    background-color: #90ddff;
    color: black;
    padding-left: 4%;
  }

  .uodatetimecolor {
    color: rgba(204, 197, 197, 0.849);
  }

  .rcdiv {
    width: 10px;
    height: 10px;
    background-color: skyblue;
    margin-right: 5%;
  }

  .gwdiv {
    width: 10px;
    height: 10px;
    background-color: red;
    margin-right: 5%;
  }

  .rzqy {
    font-weight: 700;
    height: 120px;
    /* margin-top: 5%; */
    background-color: blue;
    color: white;
    font-size: 18px;
  }

  .gwsclass {
    font-weight: 700;
    height: 120px;
    /* margin-top: 5%; */
    background-color: #20cab8;
    color: white;
    font-size: 18px;
  }

  .jlsclass {
    font-weight: 700;
    height: 120px;
    /* margin-top: 5%; */
    background-color: #9a17f4;
    color: white;
    font-size: 18px;
  }

  .dbgzclass {
    height: 150px;
    margin-top: -5%;
    /* color: white; */
    font-size: 15px;
  }

  #postdiv {
    margin-top: 5%;
  }

  #jobfdiv {
    margin-top: 5%;
  }

  .ahrefco {
    color: red;
  }

  .afount {
    font-size: 13px;
  }
</style>

<style lang="less" scoped>
  /deep/ [data-v-e9cd92dc] .el-alert__title {
    font-size: 20px;
    line-height: 50px;
  }

  /deep/ [data-v-e9cd92dc] .leftdivcss .el-alert__title {
    font-size: 25px;
    line-height: 35px;
  }

  /deep/ .el-alert__title {
    font-size: 18px;
    line-height: 18px;
  }

  /* 中间div */
  /deep/ .el-alert .el-alert__description {
    font-size: 16px;
    line-height: 18px;
  }

  /* 左div */
  /deep/ .el-alert--success.is-light .el-alert__description {
    font-size: 18px;
    color: black;
    margin-left: -6%
  }

  /deep/ .dbgzclass .ant-card-head {
    min-height: 8px;
    margin-bottom: -1px;
    padding: 0 5px;
    color: black;
    font-weight: 500;
    font-size: 14px;
    background: transparent;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 2px 2px 0 0;
    zoom: 1;
  }

  /deep/ .dbgzclass .ant-card-head-title {
    display: inline-block;
    -ms-flex: 1;
    flex: 1;
    padding: 12px 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /deep/ .dbgzclass .ant-card-body {
    padding: 4px 20px;
    zoom: 1;
  }
</style>