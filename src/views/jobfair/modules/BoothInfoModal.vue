<template>
  <a-drawer title="展位编辑" :maskClosable="true" :width="drawerWidth" placement="right" :closable="true"
    @close="handleCancel" :visible="visible" style="height: 100%;overflow: auto;padding-bottom: 53px;">
    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
        <span style="display:inline-block;width:calc(100% - 51px);padding-right:10px;text-align: right">
          <a-button @click="toggleScreen" icon="appstore" style="height:20px;width:20px;border:0px"></a-button>
        </span>
      </div>
    </template>
    <div class="mentTitleone">
      <img src="../../../../public/images/crk.png" style="width:65%;" alt />
    </div>
    <!-- <div class="mentTitleone">
      <img src="../../../../public/images/闸机入口.png" style="width:65%;" alt />
    </div>
    <div class="mentTitletwo">
      <img src="../../../../public/images/闸机出口.png" style="width:65%;" alt />
    </div> -->
    <div>
      <!-- <div id="tabdiv" style="float:left;border: 1px solid #E9E9E9;width:30%;height:100%;">
        <a-form layout="inline" style="margin-left:10%" @keyup.enter.native="searchQuery">
          <a-row :gutter="20">
            <a-col :md="12" :sm="9">
              <a-form-item label :labelCol="{span:2}" :wrapperCol="{span: 15, offset: 3}">
                <a-input-search placeholder="请输入企业名" size="small" style="margin-left:-10%; width:320%"
                  v-model="enterpriseparams.enterpriseName" @search="searchQuery" />
              </a-form-item>
            </a-col>
            
          </a-row>
        </a-form>
        <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource"
          :pagination="ipagination" :loading="loading" :customRow="handleClickRow" @change="handleTableChange">
          <template slot="avatarslot" slot-scope="text, record, index">
            <div class="anty-img-wrap">
              <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
            </div>
          </template>
        </a-table>
      </div> -->

      <div id="divclas" style="float:left;border: 1px solid #E9E9E9;width: 100%;">
        <div id="clip_path" style="float:left;border: 1px solid #E9E9E9;width: 100%;">
          <div style="width: 2px;height: 18%;background-color: black;clear : none;position: absolute;top:10%;left: 21%; ">  
          </div>
          <div style="width: 54.5%;height: 2px;background-color: black;clear : none;position: absolute;top:10%;left: 21%; ">  
          </div>
          <div style="width: 2px;height: 21.5%;background-color: black;clear : none;position: absolute;top:10%;left: 75.5%; ">  
          </div>
          <div style="width: 4%;height: 2px;background-color: black;clear : none;position: absolute;top:31.2%;left: 71.5%; ">  
          </div>
          <div style="width: 2px;height: 35%;background-color: black;clear : none;position: absolute;top:31.2%;left: 71.5%; ">  
          </div>
          <div style="width: 6%;height: 2px;background-color: black;clear : none;position: absolute;top:28%;left: 15.2%; ">  
          </div>
          <div style="width: 2px;height: 2%;background-color: black;clear : none;position: absolute;top:28%;left: 15.1%; ">  
          </div>
          <div style="width: 2px;height: 17%;background-color: black;clear : none;position: absolute;top:41%;left: 15.1%; ">  
          </div>
          <div style="width: 7%;height: 2px;background-color: black;clear : none;position: absolute;top:58%;left: 15.1%; ">  
          </div>
          <div style="width: 2px;height: 8%;background-color: black;clear : none;position: absolute;top:58%;left: 22.1%; ">  
          </div>
          <div style="width: 49.5%;height: 2px;background-color: black;clear : none;position: absolute;top:66%;left: 22.1%; ">  
          </div>
          <div>
            <div style="float: left;margin-left: 23%;margin-top: 4%;margin-bottom: 5%;">
              <div>
                <div style="width: 15.8%;height: 1px;background-color: black;clear : none;position: absolute;top:12%;left: 23.7%; ">  
                </div>
                <div style="width: 1px;height: 5%;background-color: black;clear : none;position: absolute;top:12%;left: 23.6%; ">  
                </div>
                <div style="width: 1px;height: 4.9%;background-color: black;clear : none;position: absolute;top:12%;left: 39.5%; ">  
                </div>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorThree}" size="small"
                      @click="selectBoothbut(3)">{{buttext.txThree}}</a-button>
                  </td>
                  <td style="padding-left: 10%;">
                    <a-button type :style="{'background':colorConfirma.colorTwo}" size="small"
                      @click="selectBoothbut(2)">
                      {{buttext.txTwo}}</a-button>
                  </td>
                  <td style="padding-left: 20%;">
                    <a-button type :style="{'background':colorConfirma.colorOne}" size="small"
                      @click="selectBoothbut(1)">
                      {{buttext.txone}}</a-button>
                  </td>
                </tr>
              </div>
              <div style="margin-top: 8%;margin-left: 12%;">
                <div style="width: 1px;height: 9%;background-color: black;clear : none;position: absolute;top:19%;left: 28%; ">  
                </div>
                <div style="width: 1px;height: 8.9%;background-color: black;clear : none;position: absolute;top:19%;left: 38.4%; ">  
                </div>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorSix}" size="small"
                      @click="selectBoothbut(6)">{{buttext.txSix}}</a-button>
                  </td>
                  <td style="padding-left: 10%;">
                    <a-button type :style="{'background':colorConfirma.colorSeven}" size="small"
                      @click="selectBoothbut(7)">{{buttext.txSeven}}</a-button>
                  </td>

                </tr>
                <tr>
                  <td colspan="2" style="padding-left: 1%;"   class="thetransverse">
                    <el-divider></el-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorEight}" size="small"
                      @click="selectBoothbut(8)">{{buttext.txEight}}</a-button>
                  </td>
                  <td style="padding-left: 10%;">
                    <a-button type :style="{'background':colorConfirma.colorNine}" size="small"
                      @click="selectBoothbut(9)">{{buttext.txNine}}</a-button>
                  </td>

                </tr>
              </div>

              <div style="margin-top: 25%;margin-left: 12%;">
                <div style="width: 1px;height: 10%;background-color: black;clear : none;position: absolute;top:38.5%;left: 27.6%; ">  
                </div>
                <div style="width: 1px;height: 10%;background-color: black;clear : none;position: absolute;top:38.5%;left: 48.5%; ">  
                </div>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorFourteen}" size="small"
                      @click="selectBoothbut(14)">{{buttext.txFourteen}}</a-button>
                  </td>
                  <td style="padding-left: 7%;">
                    <a-button type :style="{'background':colorConfirma.colorFifteen}" size="small"
                      @click="selectBoothbut(15)">{{buttext.txFifteen}}</a-button>
                  </td>
                  <td style="padding-left: 3.5%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-right: 8%;">
                    <a-button type :style="{'background':colorConfirma.colorSixteen}" size="small"
                      @click="selectBoothbut(16)">{{buttext.txSixteen}}</a-button>
                  </td>
                  <td style="padding-left: 5%;">
                    <a-button type :style="{'background':colorConfirma.colorSeventeen}" size="small"
                      @click="selectBoothbut(17)">{{buttext.txSeventeen}}</a-button>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">
                    <el-divider></el-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorEighteen}" size="small"
                      @click="selectBoothbut(18)">{{buttext.txEighteen}}</a-button>
                  </td>
                  <td style="padding-left: 7%;">
                    <a-button type :style="{'background':colorConfirma.colorNineteen}" size="small"
                      @click="selectBoothbut(19)">{{buttext.txNineteen}}</a-button>
                  </td>
                  <td style="padding-left: 3.5%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-right: 8%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty}" size="small"
                      @click="selectBoothbut(20)">{{buttext.txTwenty}}</a-button>
                  </td>
                  <td style="padding-left: 5%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_one}" size="small"
                      @click="selectBoothbut(21)">{{buttext.txTwenty_one}}</a-button>
                  </td>
                </tr>

              </div>

              <div style="margin-top: 25%;margin-left: 5%;">
                <div style="width: 1px;height: 5%;background-color: black;clear : none;position: absolute;top:59%;left: 25%; ">  
                </div>
                <div style="width: 1px;height: 5%;background-color: black;clear : none;position: absolute;top:59%;left: 70.2%; ">  
                </div>
                <div style="width: 45.3%;height: 1px;background-color: black;clear : none;position: absolute;top:64%;left: 25%; ">  
                </div>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorTwenty_two}" size="small"
                      @click="selectBoothbut(22)">{{buttext.txTwenty_two}}</a-button>
                  </td>
                  <td style="padding-left: 4.5%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_three}" size="small"
                      @click="selectBoothbut(23)">{{buttext.txTwenty_three}}</a-button>
                  </td>
                  <td style="padding-left: 3%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-left: 2%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_four}" size="small"
                      @click="selectBoothbut(24)">{{buttext.txTwenty_four}}</a-button>
                  </td>
                  <td style="padding-left: 9%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_five}" size="small"
                      @click="selectBoothbut(25)">{{buttext.txTwenty_five}}</a-button>
                  </td>
                  <td style="padding-left: 8%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-left: 7%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_six}" size="small"
                      @click="selectBoothbut(26)">{{buttext.txTwenty_six}}</a-button>
                  </td>
                  <td style="padding-left: 13%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_seven}" size="small"
                      @click="selectBoothbut(27)">{{buttext.txTwenty_seven}}</a-button>

                  </td>
                  <td style="padding-left: 12%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-left: 11%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_eight}" size="small"
                      @click="selectBoothbut(28)">{{buttext.txTwenty_eight}}</a-button>
                  </td>
                  <td style="padding-left: 15%;">
                    <a-button type :style="{'background':colorConfirma.colorTwenty_nine}" size="small"
                      @click="selectBoothbut(29)">{{buttext.txTwenty_nine}}</a-button>
                  </td>
                </tr>

              </div>
            </div>
            <!-- 右 -->
            <div style="float: right;margin-right: 17%;margin-top: 4%;">
              <div style="width: 10.3%;height: 1px;background-color: black;clear : none;position: absolute;top:12%;left: 63%; ">  
              </div>
              <div style="width: 1px;height: 5%;background-color: black;clear : none;position: absolute;top:12%;left: 63%; ">  
              </div>
              <div style="width: 1px;height: 4.9%;background-color: black;clear : none;position: absolute;top:12%;left: 73.3%; ">  
              </div>
              <tr>
                <td>
                  <a-button type :style="{'background':colorConfirma.colorFour}" size="small"
                    @click="selectBoothbut(4)">
                    {{buttext.txFour}}</a-button>
                </td>
                <td style="padding-left: 14%;">
                  <a-button type :style="{'background':colorConfirma.colorFive}" size="small"
                    @click="selectBoothbut(5)">
                    {{buttext.txFive}}</a-button>
                </td>

              </tr>

              <div style="margin-top: 18%;margin-right: 32%;">
                <div style="width: 1px;height: 9.4%;background-color: black;clear : none;position: absolute;top:19.5%;left: 62.7%; ">  
                </div>
                <div style="width: 1px;height: 9.4%;background-color: black;clear : none;position: absolute;top:19.5%;left: 73.5%; ">  
                </div>
                <div style="width: 3%;height: 1px;background-color: black;clear : none;position: absolute;top:30.5%;left: 62.4%; ">  
                </div>
                <div style="width: 1px;height: 26%;background-color: black;clear : none;position: absolute;top:30.5%;left: 65.4%; ">  
                </div>
                <div style="width: 3%;height: 1px;background-color: black;clear : none;position: absolute;top:56.5%;left: 62.5%; ">  
                </div>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorTen}" size="small"
                      @click="selectBoothbut(10)">{{buttext.txTen}}</a-button>
                  </td>
                  <td style="padding-left: 12%;">
                    <a-button type :style="{'background':colorConfirma.colorEleven}" size="small"
                      @click="selectBoothbut(11)">{{buttext.txEleven}}</a-button>
                  </td>

                </tr>
                <tr>
                  <td colspan="5" style="padding-left: 5%;" class="tttransverse">
                    <el-divider></el-divider>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorTwelve}" size="small"
                      @click="selectBoothbut(12)">{{buttext.txTwelve}}</a-button>
                  </td>
                  <td style="padding-left: 12%;">
                    <a-button type :style="{'background':colorConfirma.colorThirteen}" size="small"
                      @click="selectBoothbut(13)">{{buttext.txThirteen}}</a-button>
                  </td>

                </tr>
              </div>
              
              <div id="trrotate" style="margin-top: 10%;margin-right: 99%;">
                <tr>
                  <td>
                    <a-button type :style="{'background':colorConfirma.colorThirty}" size="small"
                      @click="selectBoothbut(30)">{{buttext.txThirty}}</a-button>
                  </td>
                  <td style="padding-left: 8%;">
                    <a-button type :style="{'background':colorConfirma.colorThirty_one}" size="small"
                      @click="selectBoothbut(31)">{{buttext.txThirty_one}}</a-button>
                  </td>
                  <td style="padding-left: 6%;">
                    <el-divider direction="vertical"></el-divider>
                  </td>
                  <td style="padding-left: 4%;">
                    <a-button type :style="{'background':colorConfirma.colorThirty_two}" size="small"
                      @click="selectBoothbut(32)">{{buttext.txThirty_two}}</a-button>
                  </td>
                  <td style="padding-left: 13%;">
                    <a-button type :style="{'background':colorConfirma.colorThirty_three}" size="small"
                      @click="selectBoothbut(33)">{{buttext.txThirty_three}}</a-button>
                  </td>
                </tr>
              </div>
            </div>


          </div>
        </div>
        <a-divider orientation="left" style="padding-top:10px ;">展位信息</a-divider>
        <div style="margin-left:90%;">
          <a @click="handleEdit(strrecord)">
            <a-icon type="edit" />编辑修改
          </a>
        </div>
        <a-card :bordered="false" style="margin-left:3%;margin-top:0%;">
          <detail-list title>
            <detail-list-item term="展位编号">{{boothtext.boothNumber}}</detail-list-item>
            <detail-list-item term="展位类型" style="margin-left:25%;">{{boothtext.boothType}}</detail-list-item>
          </detail-list>
          <detail-list title>
            <detail-list-item term="展位绑定企业" style="width:100%;margin-top:2%;">{{boothtext.enterpriseName}}
            </detail-list-item>
            <!-- <detail-list-item term="操作" style="margin-left:58%;margin-top:-4.5%;">
              <a @click="editDictItem()">绑定企业</a>
              <a-divider type="vertical" />

              <a @click="Unbind()">取消绑定</a>
            </detail-list-item> -->
            <detail-list-item term="操作" style="margin-left:58%;margin-top:-4.5%;">
              <a @click="open()">公开</a>
              <a-divider type="vertical" />

              <a @click="Unbind()">不公开</a>
            </detail-list-item>
          </detail-list>
          <detail-list title>
            <detail-list-item term="展位位置" style="margin-top:2%;">{{boothtext.boothPosition}}</detail-list-item>
            <detail-list-item term="展位有效期限" style="margin-left:58%;width:100%;margin-top:-4.5%;">
              {{boothtext.validEnddate}}</detail-list-item>
          </detail-list>
        </a-card>
      </div>
    </div>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <!-- <a-popconfirm title="" @confirm="handleCancel" okText="确定" cancelText="取消"> -->
      <a-button type="primary" style="margin-right: 0%" @click="handleCancel">关闭</a-button>
      <!-- </a-popconfirm> -->
      <!-- <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">保存</a-button> -->
    </div>
    <!-- 字典类型 -->
    <examine-item-list ref="modalForm" @eChange="exupdate" @ok="modalFormOk"></examine-item-list>
    <user-recycle-bin-modal ref="modalFormlist" @eChange="eChange" @ok="modalFormOk" />
    <!-- :visible.sync="recycleBinVisible" -->
  </a-drawer>
</template>

<script>
  import pick from 'lodash.pick'
  import moment from 'moment'
  import Vue from 'vue'
  // 引入搜索部门弹出框的组件
  import JSelectPosition from '@/components/jeecgbiz/JSelectPosition'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import store from '@/store'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getAction } from '@/api/manage'
  import { addUser, editenterprise, queryUserRole, queryall } from '@/api/api'
  import { disabledAuthFilter } from '@/utils/authFilter'
  import { duplicateCheck, getBoothList, togetBoothList, jobenterpriseList, getEditById,openadd,closeact } from '@/api/api'
  import JImageUpload from '../../../components/jeecg/JImageUpload'
  import DetailList from '@/components/tools/DetailList'
  import ExamineItemList from './BoothEditorNodal'
  import UserRecycleBinModal from './EnterpriseModal'
  import { filterObj } from '@/utils/util'

  const DetailListItem = DetailList.Item

  export default {
    name: 'UserModal',
    mixins: [JeecgListMixin],
    components: {
      JImageUpload,
      JSelectPosition,
      DetailList,
      DetailListItem,
      ExamineItemList,
      UserRecycleBinModal,
    },
    data() {
      return {
        queryParam: {
          enterpriseName: '',
          boothInsidenumber: '',
        },
        zanweiparam: {},
        strrecord: {},
        check: false,
        str: '',
        jobFairId: '',
        boothInsidenumber: '',
        colorConfirm: '',
        colorConfirma: {
          colorOne: '',
          colorTwo: '',
          colorThree: '',
          colorFour: '',
          colorFive: '',
          colorSix: '',
          colorSeven: '',
          colorEight: '',
          colorNine: '',
          colorTen: '',
          colorEleven: '',
          colorTwelve: '',
          colorThirteen: '',
          colorFourteen: '',
          colorFifteen: '',
          colorSixteen: '',
          colorSeventeen: '',
          colorEighteen: '',
          colorNineteen: '',
          colorTwenty: '',
          colorTwenty_one: '',
          colorTwenty_two: '',
          colorTwenty_three: '',
          colorTwenty_four: '',
          colorTwenty_five: '',
          colorTwenty_six: '',
          colorTwenty_seven: '',
          colorTwenty_eight: '',
          colorTwenty_nine: '',
          colorThirty: '',
          colorThirty_one: '',
          colorThirty_two: '',
          colorThirty_three: '',
          colorThirty_four: '',
          colorThirty_five: '',
          colorThirty_six: '',
          colorThirty_seven: '',
          colorThirty_eight: '',
          colorThirty_nine: '',
          colorForty: '',
          colorForty_one: '',
          colorForty_two: '',
          colorForty_three: '',
          colorForty_four: '',
          colorForty_five: '',
          colorForty_six: '',
          colorForty_seven: '',
          colorForty_eight: '',
          colorForty_nine: '',
          colorFifty: '',
          colorFifty_one: '',
          colorFifty_two: '',
          colorFifty_three: '',
          colorFifty_four: '',
          colorFifty_five: '',
          colorFifty_six: '',
        },
        boothtext: {
          enterpriseName: '',
          boothNumber: '',
          boothType: '',
          boothPosition: '',
          validEnddate: '',
        },
        boothEntity: {
          id: '',
          boothNumber: '',
          boothPosition: '',
          updateTime: '',
          jobFairId: '',
          validStartdate: '',
          enterpriseInfoId: 0,
          boothType: '',
          createBy: '',
          validEnddate: '',
          createTime: '',
          updateBy: '',
          boothInsidenumber: '',
        },
        // 表头
        recycleBinVisible: false,
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
            title: '企业名',
            align: 'center',
            dataIndex: 'enterpriseName',
          },
          {
            title: '展位',
            align: 'center',
            dataIndex: 'boothNumber',
          },
        ],
        jsonadd: {},
        loadDatajobid: {
          jobfairId: '',
        },
        buttext: {
          txone: '',
          txTwo: '',
          txThree: '',
          txFour: '',
          txFive: '',
          txSix: '',
          txSeven: '',
          txEight: '',
          txNine: '',
          txTen: '',
          txEleven: '',
          txTwelve: '',
          txThirteen: '',
          txFourteen: '',
          txFifteen: '',
          txSixteen: '',
          txSeventeen: '',
          txEighteen: '',
          txNineteen: '',
          txTwenty: '',
          txTwenty_one: '',
          txTwenty_two: '',
          txTwenty_three: '',
          txTwenty_four: '',
          txTwenty_five: '',
          txTwenty_six: '',
          txTwenty_seven: '',
          txTwenty_eight: '',
          txTwenty_nine: '',
          txThirty: '',
          txThirty_one: '',
          txThirty_two: '',
          txThirty_three: '',
          txThirty_four: '',
          txThirty_five: '',
          txThirty_six: '',
          txThirty_seven: '',
          txThirty_eight: '',
          txThirty_nine: '',
          txForty: '',
          txForty_one: '',
          txForty_two: '',
          txForty_three: '',
          txForty_four: '',
          txForty_five: '',
          txForty_six: '',
          txForty_seven: '',
          txForty_eight: '',
          txForty_nine: '',
          txFifty: '',
          txFifty_one: '',
          txFifty_two: '',
          txFifty_three: '',
          txFifty_four: '',
          txFifty_five: '',
          txFifty_six: '',
        },
        xgid: '',
        rowselectjob: {},
        dataSource: [],
        departDisabled: false, //是否是我的部门调用该页面
        roleDisabled: false, //是否是角色维护调用该页面
        modalWidth: 800,
        drawerWidth: '70%',
        modaltoggleFlag: true,
        confirmDirty: false,
        selectedDepartKeys: [], //保存用户选择部门id
        checkedDepartKeys: [],
        checkedDepartNames: [], // 保存部门的名称 =>title
        checkedDepartNameString: '', // 保存部门的名称 =>title
        resultDepartOptions: [],
        userId: '', //保存用户id
        disableSubmit: false,
        userDepartModel: { userId: '', departIdList: [] }, // 保存SysUserDepart的用户部门中间表数据需要的对象
        dateFormat: 'YYYY-MM-DD',
        validatorRules: {
          username: {
            rules: [
              {
                required: true,
                message: '请输入用户账号!',
              },
              {
                validator: this.validateUsername,
              },
            ],
          },
          password: {
            rules: [
              {
                required: true,
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,./]).{8,}$/,
                message: '密码由8位数字、大小写字母和特殊符号组成!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          },
          confirmpassword: {
            rules: [
              {
                required: true,
                message: '请重新输入登陆密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          },
          enterpriseName: { rules: [{ required: true, message: '请输入用户名称!' }] },
          phone: { rules: [{ validator: this.validatePhone }] },
          email: {
            rules: [
              {
                validator: this.validateEmail,
              },
            ],
          },
          roles: {},
          //  sex:{initialValue:((!this.model.sex)?"": (this.model.sex+""))}
          trade: {
            rules: [{ required: true, message: '请输入所属行业' }, { validator: this.validateWorkNo }],
          },
          telephone: {
            rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }],
          },
        },
        departIdShow: false,
        departIds: [], //负责部门id
        title: '操作',
        visible: false,
        model: {},
        roleList: [],
        selectedRole: [],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        boothInfoEntity: { id: '' },
        uploadLoading: false,
        confirmLoading: false,
        headers: {},
        enterpriseparams: {
          jobFairId: '',
          enterpriseName: '',
          id: '',
        },
        objjob: {},
        getjobFairId: '',
        getenterpriseid: '',
        form: this.$form.createForm(this),
        picUrl: '',
        url: {
          list: '/hall/enterprise/list',
          fileUpload: window._CONFIG['domianURL'] + '/sys/common/upload',
          userWithDepart: '/sys/user/userDepartList', // 引入为指定用户查看部门信息需要的url
          userId: '/sys/user/generateUserId', // 引入生成添加用户情况下的url
          syncUserByUserName: '/process/extActProcess/doSyncUserByUserName', //同步用户到工作流
          queryTenantList: '/sys/tenant/queryList',
        },
        identity: '1',
        fileList: [],
        tenantList: [],
        currentTenant: [],
      }
    },
    created() {
      const token = Vue.ls.get(ACCESS_TOKEN)
      this.headers = { 'X-Access-Token': token }
      this.initTenantList()
    },
    computed: {
      //绑定企业
      uploadAction: function () {
        return this.url.fileUpload
      },
    },
    methods: {
      eChange(e) {
        this.$nextTick(() => {
          this.edit(e);
          this.selectBoothbut(this.jsonadd.boothInsidenumber);
        });
      },
      exupdate(e) {
        this.$nextTick(() => {
          let vm = this;
          console.log("编辑展位", e);
          let txcasenum = e.boothInsidenumber
          if (txcasenum == 1) {
            vm.buttext.txone = e.boothNumber
          } else if (txcasenum == 2) {
            vm.buttext.txTwo = e.boothNumber
          } else if (txcasenum == 3) {
            vm.buttext.txThree = e.boothNumber
          } else if (txcasenum == 4) {
            vm.buttext.txFour = e.boothNumber
          } else if (txcasenum == 5) {
            vm.buttext.txFive = e.boothNumber
          } else if (txcasenum == 6) {
            vm.buttext.txSix = e.boothNumber
          } else if (txcasenum == 7) {
            vm.buttext.txSeven = e.boothNumber
          } else if (txcasenum == 8) {
            vm.buttext.txEight = e.boothNumber
          } else if (txcasenum == 9) {
            vm.buttext.txNine = e.boothNumber
          } else if (txcasenum == 10) {
            vm.buttext.txTen = e.boothNumber
          } else if (txcasenum == 11) {
            vm.buttext.txEleven = e.boothNumber
          } else if (txcasenum == 12) {
            vm.buttext.txTwelve = e.boothNumber
          } else if (txcasenum == 13) {
            vm.buttext.txThirteen = e.boothNumber
          } else if (txcasenum == 14) {
            vm.buttext.txFourteen = e.boothNumber
          } else if (txcasenum == 15) {
            vm.buttext.txFifteen = e.boothNumber
          } else if (txcasenum == 16) {
            vm.buttext.txSixteen = e.boothNumber
          } else if (txcasenum == 17) {
            vm.buttext.txSeventeen = e.boothNumber
          } else if (txcasenum == 18) {
            vm.buttext.txEighteen = e.boothNumber
          } else if (txcasenum == 19) {
            vm.buttext.txNineteen = e.boothNumber
          } else if (txcasenum == 20) {
            vm.buttext.txTwenty = e.boothNumber
          } else if (txcasenum == 21) {
            vm.buttext.txTwenty_one = e.boothNumber
          } else if (txcasenum == 22) {
            vm.buttext.txTwenty_two = e.boothNumber
          } else if (txcasenum == 23) {
            vm.buttext.txTwenty_three = e.boothNumber
          } else if (txcasenum == 24) {
            vm.buttext.txTwenty_four = e.boothNumber
          } else if (txcasenum == 25) {
            vm.buttext.txTwenty_five = e.boothNumber
          } else if (txcasenum == 26) {
            vm.buttext.txTwenty_six = e.boothNumber
          } else if (txcasenum == 27) {
            vm.buttext.txTwenty_seven = e.boothNumber
          } else if (txcasenum == 28) {
            vm.buttext.txTwenty_eight = e.boothNumber
          } else if (txcasenum == 29) {
            vm.buttext.txTwenty_nine = e.boothNumber
          } else if (txcasenum == 30) {
            vm.buttext.txThirty = e.boothNumber
          } else if (txcasenum == 31) {
            vm.buttext.txThirty_one = e.boothNumber
          } else if (txcasenum == 32) {
            vm.buttext.txThirty_two = e.boothNumber
          } else if (txcasenum == 33) {
            vm.buttext.txThirty_three = e.boothNumber
          } else if (txcasenum == 34) {
            vm.buttext.txThirty_four = e.boothNumber
          } else if (txcasenum == 35) {
            vm.buttext.txThirty_five = e.boothNumber
          } else if (txcasenum == 36) {
            vm.buttext.txThirty_six = e.boothNumber
          } else if (txcasenum == 37) {
            vm.buttext.txThirty_seven = e.boothNumber
          } else if (txcasenum == 38) {
            vm.buttext.txThirty_eight = e.boothNumber
          } else if (txcasenum == 39) {
            vm.buttext.txThirty_nine = e.boothNumber
          } else if (txcasenum == 40) {
            vm.buttext.txForty = e.boothNumber
          } else if (txcasenum == 41) {
            vm.buttext.txForty_one = e.boothNumber
          } else if (txcasenum == 42) {
            vm.buttext.txForty_two = e.boothNumber
          } else if (txcasenum == 43) {
            vm.buttext.txForty_three = e.boothNumber
          } else if (txcasenum == 44) {
            vm.buttext.txForty_four = e.boothNumber
          } else if (txcasenum == 45) {
            vm.buttext.txForty_five = e.boothNumber
          } else if (txcasenum == 46) {
            vm.buttext.txForty_six = e.boothNumber
          } else if (txcasenum == 47) {
            vm.buttext.txForty_seven = e.boothNumber
          } else if (txcasenum == 48) {
            vm.buttext.txForty_eight = e.boothNumber
          } else if (txcasenum == 49) {
            vm.buttext.txForty_nine = e.boothNumber
          } else if (txcasenum == 50) {
            vm.buttext.txFifty = e.boothNumber
          } else if (txcasenum == 51) {
            vm.buttext.txFifty_one = e.boothNumber
          } else if (txcasenum == 52) {
            vm.buttext.txFifty_two = e.boothNumber
          } else if (txcasenum == 53) {
            vm.buttext.txFifty_three = e.boothNumber
          } else if (txcasenum == 54) {
            vm.buttext.txFifty_four = e.boothNumber
          } else if (txcasenum == 55) {
            vm.buttext.txFifty_five = e.boothNumber
          } else if (txcasenum == 56) {
            vm.buttext.txFifty_six = e.boothNumber
          }
        });
      },

      handleClickRow(trecord, index) {
        return {
          on: {
            click: () => {
              // console.log(trecord, index)
              // console.log('点击行内容record', trecord)

              let that = this
              // that.boothtext={};
              that.rowselectjob.enterpriseInfoId = trecord.enterpriseid //企业id
              that.rowselectjob.jobfairid = trecord.jobfairid //招聘会id

              togetBoothList(that.rowselectjob).then((res) => {
                const vm = this
                if (res.success) {
                  if (res.result.records.length > 0) {
                    vm.boothtext.boothNumber = ''
                    vm.boothtext.boothType = ''
                    vm.boothtext.boothPosition = ''
                    vm.boothtext.validEnddate = ''
                    vm.boothtext.enterpriseName = ''
                    vm.boothtext.enterpriseName = trecord.enterpriseName
                    vm.boothtext.boothNumber = res.result.records[0].boothNumber
                    vm.boothtext.boothType = res.result.records[0].boothType
                    vm.boothtext.boothPosition = res.result.records[0].boothPosition
                    vm.boothtext.validEnddate = res.result.records[0].validEnddate
                  } else {
                    this.$message.warning('该企业尚未绑定展位！！')
                  }
                }
              })
            },
          },
        }
      },
      // handleEdit(jsonstr){
      //   console.log("编辑展位",jsonstr);
      // },
      open(){
        let vm = this
        console.log("展展展展展",this.jobFairId);
        if (this.jobFairId == '' || this.jobFairId == undefined || this.jobFairId == null) {
          this.$message.warning('请选择展位！')
        } else {
          console.log('展位ID:----' + this.jobFairId + '---', vm.jsonadd)
        }
        if (this.jsonadd.id != null || this.jsonadd.id != undefined || this.jsonadd.id != '') {
          this.jsonadd.updateTime = this.getNowFormatDate()
          this.jsonadd.enterpriseInfoId = 0;
          this.jsonadd.updateBy = store.getters.userInfo.id
          this.boothInfoEntity = this.jsonadd
          this.boothInfoEntity.id = this.xgid
          console.log("修改对象id", this.xgid)

          this.boothEntity = {
            id: this.xgid,
            boothNumber: this.jsonadd.boothNumber,
            boothPosition: this.jsonadd.boothPosition,
            updateTime: this.getNowFormatDate(),
            jobFairId: this.jsonadd.jobFairId,
            validStartdate: this.jsonadd.validStartdate,
            enterpriseInfoId: 0,
            boothType: this.jsonadd.boothType,
            createBy: store.getters.userInfo.id,
            validEnddate: this.jsonadd.validEnddate,
            createTime: this.jsonadd.createTime,
            updateBy: store.getters.userInfo.id,
            boothInsidenumber: this.jsonadd.boothInsidenumber,
          }
          console.log("修改对象", this.boothEntity)
          openadd(this.boothEntity).then((res) => {
            if (res.success) {
              this.$message.success(res.message)

              console.log("公开",this.jsonadd)
              this.jsonadd.id = this.jsonadd.jobFairId
              this.reset();
              this.$nextTick(() => {
                this.edit(this.jsonadd);
              });
            } else {
              this.$message.warn(res.message)
            }
          })
        }
      },
      close(){
        let vm = this
        if (this.jobFairId == '' || this.jobFairId == undefined || this.jobFairId == null) {
          this.$message.warning('请选择展位！')
        } else {
          console.log('展位ID:----' + this.jobFairId + '---', vm.jsonadd)
        }
        if (this.jsonadd.id != null || this.jsonadd.id != undefined || this.jsonadd.id != '') {
          this.jsonadd.updateTime = this.getNowFormatDate()
          this.jsonadd.enterpriseInfoId = 0;
          this.jsonadd.updateBy = store.getters.userInfo.id
          this.boothInfoEntity = this.jsonadd
          this.boothInfoEntity.id = this.xgid
          console.log("修改对象id", this.xgid)

          this.boothEntity = {
            id: this.xgid,
            boothNumber: this.jsonadd.boothNumber,
            boothPosition: this.jsonadd.boothPosition,
            updateTime: this.getNowFormatDate(),
            jobFairId: this.jsonadd.jobFairId,
            validStartdate: this.jsonadd.validStartdate,
            enterpriseInfoId: 0,
            boothType: this.jsonadd.boothType,
            createBy: this.jsonadd.createBy,
            validEnddate: this.jsonadd.validEnddate,
            createTime: this.jsonadd.createTime,
            updateBy: store.getters.userInfo.id,
            boothInsidenumber: this.jsonadd.boothInsidenumber,
          }
          console.log("修改对象", this.boothEntity)
          closeact(this.boothEntity).then((res) => {
            if (res.success) {
              // this.$parent.edit(1);
              this.$message.success(res.message)

              console.log(this.jsonadd)
              this.jsonadd.id = this.jsonadd.jobFairId
              this.reset();
              this.$nextTick(() => {
                this.edit(this.jsonadd);
              });
            } else {
              this.$message.warn(res.message)
            }
          })
        }
      },
      editDictItem() {
        let vm = this
        if (this.jobFairId == '' || this.jobFairId == undefined || this.jobFairId == null) {
          this.$message.warning('请选择展位！')
        } else {
          console.log('展位ID:----' + this.jobFairId + '---', this.jsonadd)
          this.$refs.modalFormlist.edit(this.jobFairId, vm.jsonadd)
        }
      },
      Unbind() {
        let vm = this
        if (this.jobFairId == '' || this.jobFairId == undefined || this.jobFairId == null) {
          this.$message.warning('请选择展位！')
        } else {
          console.log('展位ID:----' + this.jobFairId + '---', vm.jsonadd)
        }
        if (this.jsonadd.id != null || this.jsonadd.id != undefined || this.jsonadd.id != '') {
          this.jsonadd.updateTime = this.getNowFormatDate()
          this.jsonadd.enterpriseInfoId = 0;
          this.jsonadd.updateBy = store.getters.userInfo.id
          this.boothInfoEntity = this.jsonadd
          this.boothInfoEntity.id = this.xgid
          console.log("修改对象id", this.xgid)

          this.boothEntity = {
            id: this.xgid,
            boothNumber: this.jsonadd.boothNumber,
            boothPosition: this.jsonadd.boothPosition,
            updateTime: this.getNowFormatDate(),
            jobFairId: this.jsonadd.jobFairId,
            validStartdate: this.jsonadd.validStartdate,
            enterpriseInfoId: 0,
            boothType: this.jsonadd.boothType,
            createBy: this.jsonadd.createBy,
            validEnddate: this.jsonadd.validEnddate,
            createTime: this.jsonadd.createTime,
            updateBy: store.getters.userInfo.id,
            boothInsidenumber: this.jsonadd.boothInsidenumber,
          }
          console.log("修改对象", this.boothEntity)
          getEditById(this.boothEntity).then((res) => {
            if (res.success) {
              this.innerVisible = false
              // this.$parent.edit(1);
              this.$message.success(res.message)

              console.log(this.jsonadd)
              this.jsonadd.id = this.jsonadd.jobFairId
              this.reset();
              this.$nextTick(() => {
                this.edit(this.jsonadd);
              });
            } else {
              this.$message.warn(res.message)
            }
          })
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
      isDisabledAuth(code) {
        return disabledAuthFilter(code)
      },

      initTenantList() {
        getAction(this.url.queryTenantList).then((res) => {
          if (res.success) {
            this.tenantList = res.result
          }
        })
      },
      //窗口最大化切换
      toggleScreen() {
        if (this.modaltoggleFlag) {
          this.modalWidth = window.innerWidth
        } else {
          this.modalWidth = 800
        }
        this.modaltoggleFlag = !this.modaltoggleFlag
      },
      initialRoleList() {
        queryall().then((res) => {
          if (res.success) {
            this.roleList = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      loadUserRoles(userid) {
        queryUserRole({ userid: userid }).then((res) => {
          if (res.success) {
            this.selectedRole = res.result
          } else {
            console.log(res.message)
          }
        })
      },
      refresh() {
        this.selectedDepartKeys = []
        this.checkedDepartKeys = []
        this.checkedDepartNames = []
        this.checkedDepartNameString = ''
        this.userId = ''
        this.resultDepartOptions = []
        this.departId = []
        this.departIdShow = false
        this.currentTenant = []
      },
      add() {
        this.picUrl = ''
        this.refresh()
        this.edit({ activitiSync: '1' })
      },
      reset() {
        // this.colorConfirma = {};
        this.loadDatajobid.jobfairId = null;
        this.queryParam.jobFairId = null;
        this.queryParam.boothInsidenumber = null;
        for (let name in this.colorConfirma) {
          this.colorConfirma[name] = '';
        }
        for (let name in this.buttext) {
          this.buttext[name] = '';
        }
      },
      edit(record) {
        // this.colorConfirma = {} //清楚上次展位样式
        // this.buttext={};//清楚上次展位编号
        console.log("展位对象", record);
        this.loadDatajobid.jobfairId = record.id
        this.zanweiparam.jobFairId = record.id
        console.log("查询展位参数", this.zanweiparam);
        togetBoothList(this.zanweiparam).then((res) => {
          const vm = this
          if (res.success) {
            console.log("查询展位参数" + JSON.stringify(this.zanweiparam));
            console.log("查询展位长度" + res.result.records.length);
            if (res.result.records.length >= 45) {
              for (let a = 0; a < res.result.records.length; a++) {
                if (res.result.records[a].enable > 0) {
                  let casenum = res.result.records[a].boothInsidenumber
                  if (casenum == 1) {
                    vm.colorConfirma.colorOne = '#4FFF4F'
                  } else if (casenum == 2) {
                    vm.colorConfirma.colorTwo = '#4FFF4F'
                  } else if (casenum == 3) {
                    vm.colorConfirma.colorThree = '#4FFF4F'
                  } else if (casenum == 4) {
                    vm.colorConfirma.colorFour = '#4FFF4F'
                  } else if (casenum == 5) {
                    vm.colorConfirma.colorFive = '#4FFF4F'
                  } else if (casenum == 6) {
                    vm.colorConfirma.colorSix = '#4FFF4F'
                  } else if (casenum == 7) {
                    vm.colorConfirma.colorSeven = '#4FFF4F'
                  } else if (casenum == 8) {
                    vm.colorConfirma.colorEight = '#4FFF4F'
                  } else if (casenum == 9) {
                    vm.colorConfirma.colorNine = '#4FFF4F'
                  } else if (casenum == 10) {
                    vm.colorConfirma.colorTen = '#4FFF4F'
                  } else if (casenum == 11) {
                    vm.colorConfirma.colorEleven = '#4FFF4F'
                  } else if (casenum == 12) {
                    vm.colorConfirma.colorTwelve = '#4FFF4F'
                  } else if (casenum == 13) {
                    vm.colorConfirma.colorThirteen = '#4FFF4F'
                  } else if (casenum == 14) {
                    vm.colorConfirma.colorFourteen = '#4FFF4F'
                  } else if (casenum == 15) {
                    vm.colorConfirma.colorFifteen = '#4FFF4F'
                  } else if (casenum == 16) {
                    vm.colorConfirma.colorSixteen = '#4FFF4F'
                  } else if (casenum == 17) {
                    vm.colorConfirma.colorSeventeen = '#4FFF4F'
                  } else if (casenum == 18) {
                    vm.colorConfirma.colorEighteen = '#4FFF4F'
                  } else if (casenum == 19) {
                    vm.colorConfirma.colorNineteen = '#4FFF4F'
                  } else if (casenum == 20) {
                    vm.colorConfirma.colorTwenty = '#4FFF4F'
                  } else if (casenum == 21) {
                    vm.colorConfirma.colorTwenty_one = '#4FFF4F'
                  } else if (casenum == 22) {
                    vm.colorConfirma.colorTwenty_two = '#4FFF4F'
                  } else if (casenum == 23) {
                    vm.colorConfirma.colorTwenty_three = '#4FFF4F'
                  } else if (casenum == 24) {
                    vm.colorConfirma.colorTwenty_four = '#4FFF4F'
                  } else if (casenum == 25) {
                    vm.colorConfirma.colorTwenty_five = '#4FFF4F'
                  } else if (casenum == 26) {
                    vm.colorConfirma.colorTwenty_six = '#4FFF4F'
                  } else if (casenum == 27) {
                    vm.colorConfirma.colorTwenty_seven = '#4FFF4F'
                  } else if (casenum == 28) {
                    vm.colorConfirma.colorTwenty_eight = '#4FFF4F'
                  } else if (casenum == 29) {
                    vm.colorConfirma.colorTwenty_nine = '#4FFF4F'
                  } else if (casenum == 30) {
                    vm.colorConfirma.colorThirty = '#4FFF4F'
                  } else if (casenum == 31) {
                    vm.colorConfirma.colorThirty_one = '#4FFF4F'
                  } else if (casenum == 32) {
                    vm.colorConfirma.colorThirty_two = '#4FFF4F'
                  } else if (casenum == 33) {
                    vm.colorConfirma.colorThirty_three = '#4FFF4F'
                  } else if (casenum == 34) {
                    vm.colorConfirma.colorThirty_four = '#4FFF4F'
                  } else if (casenum == 35) {
                    vm.colorConfirma.colorThirty_five = '#4FFF4F'
                  } else if (casenum == 36) {
                    vm.colorConfirma.colorThirty_six = '#4FFF4F'
                  } else if (casenum == 37) {
                    vm.colorConfirma.colorThirty_seven = '#4FFF4F'
                  } else if (casenum == 38) {
                    vm.colorConfirma.colorThirty_eight = '#4FFF4F'
                  } else if (casenum == 39) {
                    vm.colorConfirma.colorThirty_nine = '#4FFF4F'
                  } else if (casenum == 40) {
                    vm.colorConfirma.colorForty = '#4FFF4F'
                  } else if (casenum == 41) {
                    vm.colorConfirma.colorForty_one = '#4FFF4F'
                  } else if (casenum == 42) {
                    vm.colorConfirma.colorForty_two = '#4FFF4F'
                  } else if (casenum == 43) {
                    vm.colorConfirma.colorForty_three = '#4FFF4F'
                  } else if (casenum == 44) {
                    vm.colorConfirma.colorForty_four = '#4FFF4F'
                  } else if (casenum == 45) {
                    vm.colorConfirma.colorForty_five = '#4FFF4F'
                  } else if (casenum == 46) {
                    vm.colorConfirma.colorForty_six = '#4FFF4F'
                  } else if (casenum == 47) {
                    vm.colorConfirma.colorForty_seven = '#4FFF4F'
                  } else if (casenum == 48) {
                    vm.colorConfirma.colorForty_eight = '#4FFF4F'
                  } else if (casenum == 49) {
                    vm.colorConfirma.colorForty_nine = '#4FFF4F'
                  } else if (casenum == 50) {
                    vm.colorConfirma.colorFifty = '#4FFF4F'
                  } else if (casenum == 51) {
                    vm.colorConfirma.colorFifty_one = '#4FFF4F'
                  } else if (casenum == 52) {
                    vm.colorConfirma.colorFifty_two = '#4FFF4F'
                  } else if (casenum == 53) {
                    vm.colorConfirma.colorFifty_three = '#4FFF4F'
                  } else if (casenum == 54) {
                    vm.colorConfirma.colorFifty_four = '#4FFF4F'
                  } else if (casenum == 55) {
                    vm.colorConfirma.colorFifty_five = '#4FFF4F'
                  } else if (casenum == 56) {
                    vm.colorConfirma.colorFifty_six = '#4FFF4F'
                  }
                }
                let txcasenum = res.result.records[a].boothInsidenumber
                console.log("尽来展示展位");
                if (txcasenum == 1) {
                  vm.buttext.txone = res.result.records[a].boothNumber
                } else if (txcasenum == 2) {
                  vm.buttext.txTwo = res.result.records[a].boothNumber
                } else if (txcasenum == 3) {
                  vm.buttext.txThree = res.result.records[a].boothNumber
                } else if (txcasenum == 4) {
                  console.log("尽来展示展位", res.result.records[a].boothNumber);
                  vm.buttext.txFour = res.result.records[a].boothNumber
                } else if (txcasenum == 5) {
                  vm.buttext.txFive = res.result.records[a].boothNumber
                } else if (txcasenum == 6) {
                  vm.buttext.txSix = res.result.records[a].boothNumber
                } else if (txcasenum == 7) {
                  vm.buttext.txSeven = res.result.records[a].boothNumber
                } else if (txcasenum == 8) {
                  vm.buttext.txEight = res.result.records[a].boothNumber
                } else if (txcasenum == 9) {
                  vm.buttext.txNine = res.result.records[a].boothNumber
                } else if (txcasenum == 10) {
                  vm.buttext.txTen = res.result.records[a].boothNumber
                } else if (txcasenum == 11) {
                  vm.buttext.txEleven = res.result.records[a].boothNumber
                } else if (txcasenum == 12) {
                  vm.buttext.txTwelve = res.result.records[a].boothNumber
                } else if (txcasenum == 13) {
                  vm.buttext.txThirteen = res.result.records[a].boothNumber
                } else if (txcasenum == 14) {
                  vm.buttext.txFourteen = res.result.records[a].boothNumber
                } else if (txcasenum == 15) {
                  vm.buttext.txFifteen = res.result.records[a].boothNumber
                } else if (txcasenum == 16) {
                  vm.buttext.txSixteen = res.result.records[a].boothNumber
                } else if (txcasenum == 17) {
                  vm.buttext.txSeventeen = res.result.records[a].boothNumber
                } else if (txcasenum == 18) {
                  vm.buttext.txEighteen = res.result.records[a].boothNumber
                } else if (txcasenum == 19) {
                  vm.buttext.txNineteen = res.result.records[a].boothNumber
                } else if (txcasenum == 20) {
                  vm.buttext.txTwenty = res.result.records[a].boothNumber
                } else if (txcasenum == 21) {
                  vm.buttext.txTwenty_one = res.result.records[a].boothNumber
                } else if (txcasenum == 22) {
                  vm.buttext.txTwenty_two = res.result.records[a].boothNumber
                } else if (txcasenum == 23) {
                  vm.buttext.txTwenty_three = res.result.records[a].boothNumber
                } else if (txcasenum == 24) {
                  vm.buttext.txTwenty_four = res.result.records[a].boothNumber
                } else if (txcasenum == 25) {
                  vm.buttext.txTwenty_five = res.result.records[a].boothNumber
                } else if (txcasenum == 26) {
                  vm.buttext.txTwenty_six = res.result.records[a].boothNumber
                } else if (txcasenum == 27) {
                  vm.buttext.txTwenty_seven = res.result.records[a].boothNumber
                } else if (txcasenum == 28) {
                  vm.buttext.txTwenty_eight = res.result.records[a].boothNumber
                } else if (txcasenum == 29) {
                  vm.buttext.txTwenty_nine = res.result.records[a].boothNumber
                } else if (txcasenum == 30) {
                  vm.buttext.txThirty = res.result.records[a].boothNumber
                } else if (txcasenum == 31) {
                  vm.buttext.txThirty_one = res.result.records[a].boothNumber
                } else if (txcasenum == 32) {
                  vm.buttext.txThirty_two = res.result.records[a].boothNumber
                } else if (txcasenum == 33) {
                  vm.buttext.txThirty_three = res.result.records[a].boothNumber
                } else if (txcasenum == 34) {
                  vm.buttext.txThirty_four = res.result.records[a].boothNumber
                } else if (txcasenum == 35) {
                  vm.buttext.txThirty_five = res.result.records[a].boothNumber
                } else if (txcasenum == 36) {
                  vm.buttext.txThirty_six = res.result.records[a].boothNumber
                } else if (txcasenum == 37) {
                  vm.buttext.txThirty_seven = res.result.records[a].boothNumber
                } else if (txcasenum == 38) {
                  vm.buttext.txThirty_eight = res.result.records[a].boothNumber
                } else if (txcasenum == 39) {
                  vm.buttext.txThirty_nine = res.result.records[a].boothNumber
                } else if (txcasenum == 40) {
                  vm.buttext.txForty = res.result.records[a].boothNumber
                } else if (txcasenum == 41) {
                  vm.buttext.txForty_one = res.result.records[a].boothNumber
                } else if (txcasenum == 42) {
                  vm.buttext.txForty_two = res.result.records[a].boothNumber
                } else if (txcasenum == 43) {
                  vm.buttext.txForty_three = res.result.records[a].boothNumber
                } else if (txcasenum == 44) {
                  vm.buttext.txForty_four = res.result.records[a].boothNumber
                } else if (txcasenum == 45) {
                  vm.buttext.txForty_five = res.result.records[a].boothNumber
                } else if (txcasenum == 46) {
                  vm.buttext.txForty_six = res.result.records[a].boothNumber
                } else if (txcasenum == 47) {
                  vm.buttext.txForty_seven = res.result.records[a].boothNumber
                } else if (txcasenum == 48) {
                  vm.buttext.txForty_eight = res.result.records[a].boothNumber
                } else if (txcasenum == 49) {
                  vm.buttext.txForty_nine = res.result.records[a].boothNumber
                } else if (txcasenum == 50) {
                  vm.buttext.txFifty = res.result.records[a].boothNumber
                } else if (txcasenum == 51) {
                  vm.buttext.txFifty_one = res.result.records[a].boothNumber
                } else if (txcasenum == 52) {
                  vm.buttext.txFifty_two = res.result.records[a].boothNumber
                } else if (txcasenum == 53) {
                  vm.buttext.txFifty_three = res.result.records[a].boothNumber
                } else if (txcasenum == 54) {
                  vm.buttext.txFifty_four = res.result.records[a].boothNumber
                } else if (txcasenum == 55) {
                  vm.buttext.txFifty_five = res.result.records[a].boothNumber
                } else if (txcasenum == 56) {
                  vm.buttext.txFifty_six = res.result.records[a].boothNumber
                }
              }
            } else {
              for (let t = 0; t < 56; t++) {
                console.log("尽来展示展位2");
                let txcasenum = t
                if (txcasenum == 1) {
                  vm.buttext.txone = 'A01'
                } else if (txcasenum == 2) {
                  vm.buttext.txTwo = 'A02'
                } else if (txcasenum == 3) {
                  vm.buttext.txThree = 'A03'
                } else if (txcasenum == 4) {
                  vm.buttext.txFour = 'A04'
                } else if (txcasenum == 5) {
                  vm.buttext.txFive = 'A05'
                } else if (txcasenum == 6) {
                  vm.buttext.txSix = 'A06'
                } else if (txcasenum == 7) {
                  vm.buttext.txSeven = 'A07'
                } else if (txcasenum == 8) {
                  vm.buttext.txEight = 'A08'
                } else if (txcasenum == 9) {
                  vm.buttext.txNine = 'A09'
                } else if (txcasenum == 10) {
                  vm.buttext.txTen = 'A10'
                } else if (txcasenum == 11) {
                  vm.buttext.txEleven = 'A11'
                } else if (txcasenum == 12) {
                  vm.buttext.txTwelve = 'A12'
                } else if (txcasenum == 13) {
                  vm.buttext.txThirteen = 'A13'
                } else if (txcasenum == 14) {
                  vm.buttext.txFourteen = 'A14'
                } else if (txcasenum == 15) {
                  vm.buttext.txFifteen = 'A15'
                } else if (txcasenum == 16) {
                  vm.buttext.txSixteen = 'A16'
                } else if (txcasenum == 17) {
                  vm.buttext.txSeventeen = 'A17'
                } else if (txcasenum == 18) {
                  vm.buttext.txEighteen = 'A18'
                } else if (txcasenum == 19) {
                  vm.buttext.txNineteen = 'A19'
                } else if (txcasenum == 20) {
                  vm.buttext.txTwenty = 'A20'
                } else if (txcasenum == 21) {
                  vm.buttext.txTwenty_one = 'A21'
                } else if (txcasenum == 22) {
                  vm.buttext.txTwenty_two = 'A22'
                } else if (txcasenum == 23) {
                  vm.buttext.txTwenty_three = 'A23'
                } else if (txcasenum == 24) {
                  vm.buttext.txTwenty_four = 'A24'
                } else if (txcasenum == 25) {
                  vm.buttext.txTwenty_five = 'A25'
                } else if (txcasenum == 26) {
                  vm.buttext.txTwenty_six = 'A26'
                } else if (txcasenum == 27) {
                  vm.buttext.txTwenty_seven = 'A27'
                } else if (txcasenum == 28) {
                  vm.buttext.txTwenty_eight = 'A28'
                } else if (txcasenum == 29) {
                  vm.buttext.txTwenty_nine = 'A29'
                } else if (txcasenum == 30) {
                  vm.buttext.txThirty = 'A30'
                } else if (txcasenum == 31) {
                  vm.buttext.txThirty_one = 'A31'
                } else if (txcasenum == 32) {
                  vm.buttext.txThirty_two = 'A32'
                } else if (txcasenum == 33) {
                  vm.buttext.txThirty_three = 'A33'
                } else if (txcasenum == 34) {
                  vm.buttext.txThirty_four = 'A34'
                } else if (txcasenum == 35) {
                  vm.buttext.txThirty_five = 'A35'
                } else if (txcasenum == 36) {
                  vm.buttext.txThirty_six = 'A36'
                } else if (txcasenum == 37) {
                  vm.buttext.txThirty_seven = 'A37'
                } else if (txcasenum == 38) {
                  vm.buttext.txThirty_eight = 'A38'
                } else if (txcasenum == 39) {
                  vm.buttext.txThirty_nine = 'A39'
                } else if (txcasenum == 40) {
                  vm.buttext.txForty = 'A40'
                } else if (txcasenum == 41) {
                  vm.buttext.txForty_one = 'A41'
                } else if (txcasenum == 42) {
                  vm.buttext.txForty_two = 'A42'
                } else if (txcasenum == 43) {
                  vm.buttext.txForty_three = 'A43'
                } else if (txcasenum == 44) {
                  vm.buttext.txForty_four = 'A44'
                } else if (txcasenum == 45) {
                  vm.buttext.txForty_five = 'A45'
                } else if (txcasenum == 46) {
                  vm.buttext.txForty_six = 'A46'
                } else if (txcasenum == 47) {
                  vm.buttext.txForty_seven = 'A47'
                } else if (txcasenum == 48) {
                  vm.buttext.txForty_eight = 'A48'
                } else if (txcasenum == 49) {
                  vm.buttext.txForty_nine = 'A49'
                } else if (txcasenum == 50) {
                  vm.buttext.txFifty = 'A50'
                } else if (txcasenum == 51) {
                  vm.buttext.txFifty_one = 'A51'
                } else if (txcasenum == 52) {
                  vm.buttext.txFifty_two = 'A52'
                } else if (txcasenum == 53) {
                  vm.buttext.txFifty_three = 'A53'
                } else if (txcasenum == 54) {
                  vm.buttext.txFifty_four = 'A54'
                } else if (txcasenum == 55) {
                  vm.buttext.txFifty_five = 'A55'
                } else if (txcasenum == 56) {
                  vm.buttext.txFifty_six = 'A56'
                }
              }
            }
          }
        })
        this.loadData()

        this.resetScreenSize() // 调用此方法,根据屏幕宽度自适应调整抽屉的宽度
        let that = this
        that.initialRoleList()
        that.checkedDepartNameString = ''
        that.form.resetFields()
        if (record.hasOwnProperty('id')) {
          that.loadUserRoles(record.id)
          setTimeout(() => {
            this.fileList = record.avatar
          }, 5)
        }
        that.userId = record.id
        that.visible = true
        that.model = Object.assign({}, record)
        that.$nextTick(() => {
          that.form.setFieldsValue(
            pick(this.model, 'enterpriseName', 'trade', 'scale', 'address', 'synopsis', 'companyPrincipal', 'phone')
          )
        })
        //身份为上级显示负责部门，否则不显示
        if (this.model.userIdentity == '2') {
          this.identity = '2'
          this.departIdShow = true
        } else {
          this.identity = '1'
          this.departIdShow = false
        }
        // 调用查询用户对应的部门信息的方法
        that.checkedDepartKeys = []
        that.loadCheckedDeparts()

        //update-begin-author:taoyan date:2020710 for:多租户配置
        if (!record.relTenantIds || record.relTenantIds.length == 0) {
          this.currentTenant = []
        } else {
          this.currentTenant = record.relTenantIds.split(',').map(Number)
        }
        //update-end-author:taoyan date:2020710 for:多租户配置
      },
      //
      loadCheckedDeparts() {
        let that = this
        if (!that.userId) {
          return
        }
        getAction(that.url.userWithDepart, { userId: that.userId }).then((res) => {
          that.checkedDepartNames = []
          if (res.success) {
            var depart = []
            var departId = []
            for (let i = 0; i < res.result.length; i++) {
              that.checkedDepartNames.push(res.result[i].title)
              this.checkedDepartNameString = this.checkedDepartNames.join(',')
              that.checkedDepartKeys.push(res.result[i].key)
              //新增负责部门选择下拉框
              depart.push({
                key: res.result[i].key,
                title: res.result[i].title,
              })
              departId.push(res.result[i].key)
            }
            that.resultDepartOptions = depart
            //判断部门id是否存在，不存在择直接默认当前所在部门
            if (this.model.departIds) {
              this.departIds = this.model.departIds.split(',')
            } else {
              this.departIds = departId
            }
            that.userDepartModel.departIdList = that.checkedDepartKeys
          } else {
            console.log(res.message)
          }
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
        this.disableSubmit = false
        this.selectedRole = []
        this.userDepartModel = { userId: '', departIdList: [] }
        this.checkedDepartNames = []
        this.checkedDepartNameString = ''
        this.checkedDepartKeys = []
        this.selectedDepartKeys = []
        this.resultDepartOptions = []
        this.departIds = []
        this.departIdShow = false
        this.identity = '1'
        this.fileList = []
      },
      moment,
      handleSubmit() {
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true
            if (!values.birthday) {
              values.birthday = ''
            } else {
              values.birthday = values.birthday.format(this.dateFormat)
            }
            let formData = Object.assign(this.model, values)
            if (that.fileList != '') {
              formData.avatar = that.fileList
            } else {
              formData.avatar = null
            }
            //update-begin-author:taoyan date:2020710 for:多租户配置
            formData.relTenantIds = this.currentTenant.length > 0 ? this.currentTenant.join(',') : ''
            //update-end-author:taoyan date:2020710 for:多租户配置
            formData.selectedroles = this.selectedRole.length > 0 ? this.selectedRole.join(',') : ''
            formData.selecteddeparts =
              this.userDepartModel.departIdList.length > 0 ? this.userDepartModel.departIdList.join(',') : ''
            formData.userIdentity = this.identity
            //如果是上级择传入departIds,否则为空
            if (this.identity === '2') {
              formData.departIds = this.departIds.join(',')
            } else {
              formData.departIds = ''
            }
            // that.addDepartsToUser(that,formData); // 调用根据当前用户添加部门信息的方法
            let obj
            if (!this.model.id) {
              formData.id = this.userId
              obj = addUser(formData)
            } else {
              formData.updateBy = store.getters.userInfo.username
              obj = editenterprise(formData)
            }
            obj
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.$emit('ok')
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.confirmLoading = false
                that.checkedDepartNames = []
                that.userDepartModel.departIdList = { userId: '', departIdList: [] }
                that.close()
              })
          }
        })
      },
      handleCancel() {
        this.check = false;
        this.strrecord = {};
        this.close()
      },
      loadData(arg) {
        if (arg === 1) {
          this.ipagination.current = 1
        }
        // let params = this.getQueryParams() //查询条件

        let params = {
          jobfairId: this.loadDatajobid.jobfairId,
          enterpriseName: this.enterpriseparams.enterpriseName,
          pageNo: this.ipagination.current,
          pageSize: this.ipagination.pageSize
        }
        // console.log("//查询条件",params);
        jobenterpriseList(params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
            this.ipagination.total = res.result.total
          }
        })
      },
      getQueryParams() {
        var param = Object.assign({}, this.enterpriseparams)
        param.jobfairId = this.getjobFairId
        param.enterpriseName = this.enterpriseparams.enterpriseName
        param.enterpriseid = this.getenterpriseid
        param.field = this.getQueryField()
        param.pageNo = this.ipagination.current
        param.pageSize = this.ipagination.pageSize
        if (this.superQueryParams) {
          param['superQueryParams'] = encodeURI(this.superQueryParams)
          param['superQueryMatchType'] = this.superQueryMatchType
        }
        return filterObj(param)
      },
      //查看展位
      selectBoothbut(sid) {
        this.check = true;
        const vm = this
        // vm.boothtext={};
        this.queryParam.boothInsidenumber = sid
        this.queryParam.jobFairId = this.loadDatajobid.jobfairId
        getBoothList(this.queryParam).then((res) => {
          console.log("查看展位",res);
          if (res.success) {
            if (res.result.records.length >= 1) {
              vm.jobFairId = res.result.records[0].jobFairId
              vm.jsonadd = res.result.records[0]

              vm.xgid = vm.jsonadd.id;
              vm.jsonadd.check = true;
              this.strrecord = vm.jsonadd
              //查询企业名称
              this.getjobFairId = res.result.records[0].jobFairId
              this.getenterpriseid = res.result.records[0].enterpriseInfoId
              let params = this.getQueryParams() //查询条件
              params.jobfairId = this.loadDatajobid.jobfairId
              // console.log("展位查询参数：",params)
              console.log("选定：", params)
              jobenterpriseList(params).then((ress) => {
                if (ress.success) {
                  if (ress.result.records.length > 0) {
                    vm.boothtext.enterpriseName = ress.result.records[0].enterpriseName
                  }
                }
              })
              res.result.records[0].enterpriseInfoId
              vm.boothtext.boothNumber = ''
              vm.boothtext.boothType = ''
              vm.boothtext.boothPosition = ''
              vm.boothtext.validEnddate = ''
              vm.boothtext.enterpriseName = ''
              vm.boothtext.boothNumber = res.result.records[0].boothNumber
              vm.boothtext.boothType = res.result.records[0].boothType
              vm.boothtext.boothPosition = res.result.records[0].boothPosition
              vm.boothtext.validEnddate = res.result.records[0].validEnddate
            } else {
              console.log('展位编辑信息参数', this.queryParam.jobFairId)

              this.strrecord = {}

              this.strrecord.check = true;
              this.strrecord.boothInsidenumber = sid
              this.strrecord.jobFairId = this.queryParam.jobFairId
              vm.boothtext.boothNumber = ''
              vm.boothtext.boothType = ''
              vm.boothtext.boothPosition = ''
              vm.boothtext.validEnddate = ''
              vm.boothtext.enterpriseName = ''
            }
          }
        })
      },
      validateToNextPassword(rule, value, callback) {
        const form = this.form
        const confirmpassword = form.getFieldValue('confirmpassword')

        if (value && confirmpassword && value !== confirmpassword) {
          callback('两次输入的密码不一样！')
        }
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      },
      compareToFirstPassword(rule, value, callback) {
        const form = this.form
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样！')
        } else {
          callback()
        }
      },
      validatePhone(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          //update-begin--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------
          if (new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/).test(value)) {
            //update-end--Author:kangxiaolin  Date:20190826 for：[05] 手机号不支持199号码段--------------------

            var params = {
              tableName: 'sys_user',
              fieldName: 'phone',
              fieldVal: value,
              dataId: this.userId,
            }
            duplicateCheck(params).then((res) => {
              if (res.success) {
                callback()
              } else {
                callback('手机号已存在!')
              }
            })
          } else {
            callback('请输入正确格式的手机号码!')
          }
        }
      },
      validateEmail(rule, value, callback) {
        if (!value) {
          callback()
        } else {
          if (
            new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ).test(value)
          ) {
            var params = {
              tableName: 'sys_user',
              fieldName: 'email',
              fieldVal: value,
              dataId: this.userId,
            }
            duplicateCheck(params).then((res) => {
              console.log(res)
              if (res.success) {
                callback()
              } else {
                callback('邮箱已存在!')
              }
            })
          } else {
            callback('请输入正确格式的邮箱!')
          }
        }
      },
      validateUsername(rule, value, callback) {
        var params = {
          tableName: 'sys_user',
          fieldName: 'username',
          fieldVal: value,
          dataId: this.userId,
        }
        duplicateCheck(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback('用户名已存在!')
          }
        })
      },
      validateWorkNo(rule, value, callback) {
        var params = {
          tableName: 'sys_user',
          fieldName: 'work_no',
          fieldVal: value,
          dataId: this.userId,
        }
        duplicateCheck(params).then((res) => {
          if (res.success) {
            callback()
          } else {
            callback('工号已存在!')
          }
        })
      },
      handleConfirmBlur(e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      },

      normFile(e) {
        console.log('Upload event:', e)
        if (Array.isArray(e)) {
          return e
        }
        return e && e.fileList
      },
      beforeUpload: function (file) {
        var fileType = file.type
        if (fileType.indexOf('image') < 0) {
          this.$message.warning('请上传图片')
          return false
        }
        //TODO 验证文件大小
      },
      handleChange(info) {
        this.picUrl = ''
        if (info.file.status === 'uploading') {
          this.uploadLoading = true
          return
        }
        if (info.file.status === 'done') {
          var response = info.file.response
          this.uploadLoading = false
          console.log(response)
          if (response.success) {
            this.model.avatar = response.message
            this.picUrl = 'Has no pic url yet'
          } else {
            this.$message.warning(response.message)
          }
        }
      },

      // 获取用户对应部门弹出框提交给返回的数据
      modalFormOk(formData) {
        this.checkedDepartNames = []
        this.selectedDepartKeys = []
        this.checkedDepartNameString = ''
        this.userId = formData.userId
        this.userDepartModel.userId = formData.userId
        this.departIds = []
        this.resultDepartOptions = []
        var depart = []
        for (let i = 0; i < formData.departIdList.length; i++) {
          this.selectedDepartKeys.push(formData.departIdList[i].key)
          this.checkedDepartNames.push(formData.departIdList[i].title)
          this.checkedDepartNameString = this.checkedDepartNames.join(',')
          //新增部门选择，如果上面部门选择后不为空直接付给负责部门
          depart.push({
            key: formData.departIdList[i].key,
            title: formData.departIdList[i].title,
          })
          this.departIds.push(formData.departIdList[i].key)
        }
        this.resultDepartOptions = depart
        this.userDepartModel.departIdList = this.selectedDepartKeys
        this.checkedDepartKeys = this.selectedDepartKeys //更新当前的选择keys
      },
      // 根据屏幕变化,设置抽屉尺寸
      resetScreenSize() {
        let screenWidth = document.body.clientWidth
        if (screenWidth > 1300) {
          this.drawerWidth = '60%'
          // document.getElementById("tabdiv").style.display="none";//隐藏
        } else {
          this.drawerWidth = '60%'
        }
      },
      identityChange(e) {
        if (e.target.value === '1') {
          this.departIdShow = false
        } else {
          this.departIdShow = true
        }
      },
    },
  }
</script>

<style scoped>
  #clip_path {
     
  }
  .tttransverse .el-divider--horizontal{
    width: 132%;
    height: 2px;
    margin: 13px 0px 10px -10px;
  }
  .thetransverse .el-divider--horizontal{
    width: 120%;
    height: 2px;
    margin: 13px 0px 10px -5px;
  }
  .el-divider--horizontal {
    width: 114%;
    height: 2px;
    margin: 18px 0px 15px -10px;
  }

  .el-divider--vertical {
    width: 3px;
    height: 1.5rem;
  }

  .el-divider {
    background-color: black;
  }

  .avatar-uploader>.ant-upload {
    width: 104px;
    height: 104px;
  }

  .ant-upload-select-picture-card i {
    font-size: 49px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .ant-table-tbody .ant-table-row td {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }

  #divclas {
    width: 70%;
    height: 100%;
  }
</style>
<style>
  #trrotate {
    transform: rotate(90deg);
  }

  #example {
    transform: rotate(90deg);
  }

  #twoexample {
    transform: rotate(30deg);
  }

  .mentTitleone {
    position: absolute;
    left: 46%;
    margin-top: 2%;
  }

  .mentTitletwo {
    position: absolute;
    left: 31%;
    margin-top: 3%;
  }
</style>