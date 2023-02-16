<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="tohandleCancelclose"
    :visible="Muvisible"
    style="height: 100%; overflow: auto; padding-bottom: 53px"
  >
    <a-spin :spinning="confirmLoading">
      <div class="clearfix">
        <!-- <a-form :form="form">
        <a-form-item label="企业图片" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <p>
          <a-divider orientation="left">企业环境图片</a-divider>
        </p>
        <el-upload
          action="https://dwrlzy.jiahangit.com.cn/zqhr/base/upload"
          :data="{systype:biaz}"
          list-type="picture-card"
          :file-list="elimgfileList"
          :limit="10"
          :on-preview="handlePictureCardPreview"
          :on-success="handleVideoSuccess"
          :on-remove="handleRemove"
          :on-exceed="masterFileMax"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

        <p>
          <a-divider orientation="left">企业宣传视频</a-divider>
        </p>

        <video-up
          class="avatar-uploader"
          style="width:20%"
          @eChange="videoChange"
          text="上传"
          v-if="videoForm.showVideoPath ==''"
          v-model="videofileList"
        ></video-up>
        <a-popconfirm v-if="videoForm.showVideoPath !='' && !videoFlag" title="确定要删除视频吗?" @confirm="() => delectvideo()">
          <a-button type="primary" style="">清除视频</a-button>
          <!-- <a-button type="primary" style="float: left;margin-left: 25%;margin-top: -4.8%;">清除视频</a-button> -->
        </a-popconfirm>
        <br/>
        <video
          id="videoclass"
          v-if="videoForm.showVideoPath !='' && !videoFlag"
          v-bind:src="videoForm.showVideoPath"
          class="avatar video-avatar"
          controls="controls"
        >您的浏览器不支持视频播放</video>
        
      </div>
    </a-spin>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-radio-group v-model="edradio" @change="radioChange">
        <a-radio :value="1">基础信息</a-radio>
        <a-radio :value="2">多媒体信息</a-radio>
      </a-radio-group>
      <a-button style="margin-right: 0.8rem" @click="tohandleCancelclose">关闭</a-button>
      <!-- <a-button type="primary">保存</a-button> -->
      <!-- <a-button @click="handleSubmit" type="primary">保存</a-button> -->
    </div>
  </a-drawer>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

import pick from 'lodash.pick'
import moment from 'moment'
import Vue from 'vue'
// 引入搜索部门弹出框的组件
import JSelectPosition from '@/components/jeecgbiz/JSelectPosition'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { getAction } from '@/api/manage'
import JImageUpload from '../../../components/jeecg/JImageUpload.vue'
import ImagesUp from '../../../components/jeecg/ToImagesup.vue'
import VideoUp from '../../../components/jeecg/VideoUp.vue'
// import { addUser, editenterprise, queryUserRole, queryall, addenterprise } from '@/api/api'
import ARow from 'ant-design-vue/es/grid/Row'

export default {
  name: 'UserModal',
  components: {
    JSelectPosition,
    JImageUpload,
    ImagesUp,
    ARow,
    VideoUp
  },
  data() {
    return {
      videoForm: {
        showVideoPath: ''
      },
      videoFlag: false,
      biaz: '',
      dialogImageUrl: '',
      dialogVisible: false,
      elimgfileList: [],
      confirmLoading: false,
      checkedList: [],
      plainOptions: [],
      videolen: {},
      videofileList: [],
      description: '图片预览页面',
      spinning: false,
      //数据集
      dataSource: [
        {
          key: 0,
          fileDetails: [
            {
              imgUrl: 'https://static.jeecg.com/upload/test/3a4490d5d1cd495b826e528537a47cc1.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            },
            {
              imgUrl: 'https://static.jeecg.com/upload/test/1_1588149743473.jpg'
            }
          ]
        }
      ],
      url: {},
      uploadobj: {},
      videoobj: {},
      // labelCol: {
      //   xs: { span: 24 },
      //   sm: { span: 5 }
      // },
      // wrapperCol: {
      //   xs: { span: 24 },
      //   sm: { span: 16 }
      // },
      toobj: {},
      fileList: {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: '',
        thumbUrl: ''
      },
      Muvisible: false,
      edradio: 2,
      disableSubmit: false,
      drawerWidth: '90%',
      title: '多媒体上传',
      previewVisible: false,
      previewImage: '',
      tolist: []
    }
  },
  created() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    this.headers = { 'X-Access-Token': token }
  },
  computed: {},
  mounted() {},
  methods: {
    //限制上传数量
    masterFileMax(files, fileList) {
            console.log(files, fileList);
            this.$message.warning(`最多上传 10 张图片。`);
        },
    handleVideoSuccess(res, file) {
      //获取上传图片地址

      if (res.code == 200) {
        console.log('上传成功！！！', res)
        console.log('文件上传222', this.uploadobj)
        this.uploadobj.multimediaAddress = res.result
        this.uploadobj.multimediaType = 'img'
        var formData = this.uploadobj
        this.axios({
          method: 'post',
          url: '/hall/enterpriseMultimedia/add',
          headers: {},
          params: {},
          data: formData
        })
          .then(response => {
            this.$message.success('上传成功')
            // console.log('多媒体上传', response)
            // this.selectimglist()
          })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        this.$message.error('图片上传失败，请重新上传！')
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      // console.log("删除id", file.id)
      this.axios({
        method: 'get',
        url: '/hall/enterpriseMultimedia/delete',
        headers: {},
        params: {
          id: file.id
        }
      })
        .then(response => {})
        .catch(function(error) {
          console.log(error)
        })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    //删除视频
    delectvideo() {
      var vm = this
      this.axios({
        method: 'get',
        url: '/hall/enterpriseMultimedia/list',
        headers: {},
        params: {
          enterpriseInfoId: vm.videoobj.enterpriseInfoId,
          multimediatype: 'video'
        }
      })
        .then(response => {
          vm.videolen.tolength = response.result.records.length
          if (vm.videolen.tolength > 0) {
            vm.videolen.vid = response.result.records[0].id
            this.axios({
              method: 'get',
              url: '/hall/enterpriseMultimedia/delete',
              headers: {},
              params: {
                id: vm.videolen.vid
              }
            })
              .then(response => {
                this.$notification['success']({
                  message: '通知',
                  description: '视频删除成功！'
                })
                this.videoForm.showVideoPath = ''
              })
              .catch(function(error) {
                console.log(error)
              })
          } else {
            this.$notification['warning']({
              message: '通知',
              description: '暂无视频需要删除！'
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    videoChange(info) {
      console.log('视频上传地址', info)
      var vm = this
      vm.videoobj = vm.uploadobj
      vm.videoobj.multimediaAddress = info
      vm.videoobj.multimediaType = 'video'
      var formData = vm.videoobj

      this.axios({
        method: 'get',
        url: '/hall/enterpriseMultimedia/list',
        headers: {},
        params: {
          enterpriseInfoId: vm.videoobj.enterpriseInfoId,
          multimediatype: 'video'
        }
      })
        .then(response => {
          // this.$message.success('上传成功');
          // console.log('多媒体查询视频', response.result.records)
          vm.videolen.tolength = response.result.records.length
          if (vm.videolen.tolength > 0) {
            // vm.videolen.vid = response.result.records[0].id
            this.$message.warning('该企业已存在视频,请删除后再进行删除')
            // console.log("视频保存参数",formData);
            // console.log('视频保存参数长度', vm.videolen.tolength)

            // if (confirm('该企业已存在视频,是否继续上传并覆盖') == true) {
            //   console.log('video数量', vm.videolen)
            //   this.axios({
            //     method: 'get',
            //     url: '/hall/enterpriseMultimedia/delete',
            //     headers: {},
            //     params: {
            //       id: vm.videolen.vid
            //     }
            //   })
            //     .then(response => {
            //       // this.$message.success('上传成功');
            //       console.log('删除图片', response.success)
            //       if (response.success == true) {
            //         this.axios({
            //           method: 'post',
            //           url: '/hall/enterpriseMultimedia/add',
            //           headers: {},
            //           params: {},
            //           data: formData
            //         })
            //           .then(response => {
            //             this.$message.success('上传成功')
            //             // console.log('多媒体上传', response)
            //             this.videolist()
            //             this.selectimglist()
            //           })
            //           .catch(function(error) {
            //             console.log(error)
            //           })
            //       }
            //     })
            //     .catch(function(error) {
            //       console.log(error)
            //     })
            // } else {
            //   return
            // }
          } else {
            console.log('视频上传地址id', formData)
            this.axios({
              method: 'post',
              url: '/hall/enterpriseMultimedia/add',
              headers: {},
              params: {},
              data: formData
            })
              .then(response => {
                this.$message.success('上传成功')
                // console.log('多媒体上传', response)
                this.videolist()
                this.selectimglist()
              })
              .catch(function(error) {
                console.log(error)
              })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    imghandleCancel() {
      this.previewVisible = false
    },
    selectimglist() {
      this.elimgfileList = []
      this.axios({
        method: 'get',
        url: '/hall/enterpriseMultimedia/list',
        headers: {},
        params: {
          enterpriseInfoId: this.uploadobj.enterpriseInfoId,
          multimediatype: 'img'
        }
      })
        .then(response => {
          // this.$message.success('上传成功');
          console.log('多媒体查询图片', response.result.records)
          this.dataSource[0].fileDetails = response.result.records
          for (let i = 0; i < response.result.records.length; i++) {
            this.dataSource[0].fileDetails[i].imgUrl =
              'https://dwrlzy.jiahangit.com.cn/zqhr' + response.result.records[i].multimediaAddress
          }
          let imgList = response.result.records
          imgList.forEach(item => {
            this.elimgfileList.push({
              id: item.id,
              url: item.imgUrl
            })
          })
          //  console.log('elemen查询图片', this.elimgfileList)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview

      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    //单选
    radioChange(radiores) {
      var that = this
      // that.visible = true
      if (radiores.target.value == 1) {
        that.Muvisible = false
        this.$emit('ok', this.toobj, radiores.target.value)
      }
      console.log('单选事件', radiores.target.value)
    },
    videolist() {
      this.videoForm.showVideoPath = ''
      console.log('视频查询企业', this.uploadobj.enterpriseInfoId)
      this.axios({
        method: 'get',
        url: '/hall/enterpriseMultimedia/list',
        headers: {},
        params: {
          enterpriseInfoId: this.toobj.id,
          multimediatype: 'video'
        }
      })
        .then(response => {
          console.log('视频上传', response.result.records.length)
          if (response.result.records.length > 0) {
            this.videoForm.showVideoPath = 'https://dwrlzy.jiahangit.com.cn/zqhr' + response.result.records[0].multimediaAddress
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    ttedit(record) {
      var that = this
      that.elimgfileList = []

      // that.videoForm.showVideoPath="";
      console.log('多媒体修改对象111：', record)
      // console.log('修改对象id：', record.id)
      that.edradio = 2
      this.toobj = record
      this.biaz = 'sysEnterprise'
      this.uploadobj.enterpriseInfoId = record.id

      this.uploadobj.createBy = store.getters.userInfo.username
      this.uploadobj.createTime = this.getNowFormatDate()
      this.selectimglist()
      this.videolist()

      // console.log('轮播图', this.tolist)

      that.Muvisible = true
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
    //抽屉关闭
    tohandleCancelclose() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.Muvisible = false
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
    // 根据屏幕变化,设置抽屉尺寸
    resetScreenSize() {
      let screenWidth = document.body.clientWidth
      if (screenWidth < 500) {
        this.drawerWidth = screenWidth
      } else {
       this.drawerWidth = '90%'
      }
    },
    identityChange(e) {
      if (e.target.value === '1') {
        this.departIdShow = false
      } else {
        this.departIdShow = true
      }
    }
  }
}
</script>

<style scoped>
#videoclass {
  padding-top: 3%;
  width: 70%;
}
.avatar-uploader > .ant-upload {
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
.table-operator {
  margin-bottom: 10px;
}

.clName .ant-tree li span.ant-tree-switcher,
.ant-tree li span.ant-tree-iconEle {
  width: 10px !important;
}

.clName .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: #1890ff !important;
}
.ant-col-12 {
  width: 100%;
}
</style>