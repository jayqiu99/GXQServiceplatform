<template>
  <a-modal
    :title="title"
    :width="600"
    :visible="visible"
    @cancel="handleCancel"
    style="overflow: auto;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div v-html="noticeObj.noticeContent" class="ql-editor"></div>
        <div v-if="noticeObj.address!=null">
          <span
            style="font-weight:bolder;color:black;margin:20px;font-size:18px"
          >地址:{{noticeObj.address}}</span>
        </div>
        <!-- <div v-if="noticeObj.longitude != null && noticeObj.latitude != null">
          <el-amap
            class="amap-box"
            :zoom="amap.zoom"
            :center="amap.center"
            :plugin="amap.plugin"
            :events="amap.events"
          >
           
            <el-amap-marker
              v-for="(marker, index) in amap.markers"
              :key="'marker' + index"
              :position="marker.position"
            />
          
            <el-amap-text
              v-for="(marker, index) in amap.markers"
              :key="'text' + index"
              :text="marker.text"
              :offset="marker.offset"
              :position="marker.position"
            />
          </el-amap>
        </div> -->
      </a-form>
    </a-spin>

    <template slot="footer">
      <a-button type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getAction } from '../../api/manage'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'IpadRegisterAddModal',
  data() {
    return {
      value: 1,
      title: '通知公告',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      noticeObj: null,
      dataForm: null,
      // 地图对象
      amap: {
        zoom: 16,
        center: [],
        events: {
          // 点击获取地址的数据
          click(e) {}
        },

        plugin: [
          {
            // 定位
            pName: 'Geolocation',
            events: {
              init(o) {
                // o是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  console.log('定位：', result)
                  if (result && result.position) {
                    // 设置经度
                    vm.lng = result.position.lng
                    // 设置维度
                    vm.lat = result.position.lat
                    // 设置坐标
                    vm.amap.center = [vm.lng, vm.lat]
                    let op = {
                      position: [vm.lng, vm.lat],
                      text: result.formattedAddress,
                      offset: [0, 30]
                    }
                    vm.amap.markers.push(op)
                    // 页面渲染好后
                    vm.$nextTick()
                  }
                })
              }
            }
          }
        ],
        //
        markers: []
      }
    }
  },
  created() {},
  mounted() {
    this.getNotice()
  },
  beforeUpdate() {},
  methods: {
    edit(record) {
      this.visible = true
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    getNotice() {
      var _this = this
      getAction('/app/publicnotice/getpublicnotice').then(res => {
        if (res.success) {
          if (res.result != null) {
            _this.visible = true
            _this.noticeObj = res.result
            if (res.result.noticeContent.indexOf('<img') != -1) {
              _this.noticeObj.noticeContent = res.result.noticeContent.replace(
                /<img/g,
                '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"'
              )
            }
            if (res.result.longitude != null && res.result.latitude != null) {
              let obj = {
                position: [res.result.longitude, res.result.latitude],
                text: res.result.address,
                offset: [0, 30]
              }

              _this.amap.markers.push(obj)
              _this.amap.center = [res.result.longitude, res.result.latitude]
            }
          }
        }
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    }
  }
}
</script>
<style  scoped>
/deep/.ant-modal-body {
  max-height: calc(80vh - 150px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e3e3e6;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;

    border-radius: 5px;
  }
}
.amap-box {
  height: 44vh;
  height: calc(60vh - 45px);
}
.el-vue-search-box-container {
  /* // top: 45px; */
  width: 100% !important;
}
.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box .el-input {
  float: left;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 0 7px 7px 0;
  outline: none;
  position: relative;
}

.search-box .el-button {
  position: absolute;
  right: 0;
  top: 1px;
  width: 20%;
  background: #38a28a;
  border-radius: 0 7px 7px 0;
  border: none;
  color: #fff;
  outline: none;
}

.tip-box {
  text-align: center;
  width: 100%;
  position: absolute;
  top: 35px;
  padding: 10px 0;
  background-color: #fff;
  opacity: 0.8;
}
</style>
