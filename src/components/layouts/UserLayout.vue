<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <img src="~@/assets/login/indexlog.jpg" />
          <!-- <a-button type="primary" @click="toaddregisck">点击关注抖音及微信视频号</a-button> -->
          <!-- <a href="http://www.baidu.com/" target="_blank">
            人力资源与社会保障局
          </a> -->
        </div>
      </div>
      <div class="wrap-bg">
        <div class="wrap">
          <img src="~@/assets/login/body1.png" />
          
          <route-view></route-view>
        </div>
      </div>
      <!-- <div style="float:right;">
            <a-affix> 
              <div style="width:65px;background-color:#0067ED;height:150px">
                <div @click="toaddregisck" style="padding-top:10px; ">
                  <a-icon style="color:#Fff;font-size:30px" type="qrcode" /> 
                  <div style="color:#Fff">关注讯息</div> 
                </div>
                <div style="width:80%;margin:10px auto;border:1px solid #fff;"></div>
                 <div @click="toaddregisck2" style="padding-top:0;text-align:center"> 
                   <img style="width:35px" src="~@/assets/login/phone.png" /> 
                  <div style="color:#Fff">联系客服</div> 
                </div>
              </div>
 
            </a-affix>
          
          </div> -->
      <!-- <div style="width:21%;margin-left:60%;">
        <div style="display:inline-block">
          <div style="font-size:15px">关注抖音号</div>
          <div style="font-size:15px">（请用抖音APP扫码）</div>
          <img style="width: 150px" src="~@/assets/login/dy.png" />
        </div>
        <div style="display:inline-block;margin-left:2%">
          <div style="font-size:15px">关注微信视频号</div>
          <div style="font-size:15px">（请用微信APP扫码）</div>
          <img style="width: 150px" src="~@/assets/login/wx.png" />
        </div>
        <div style="widht:100%;margin-top:2%;color:red;font-size:17px">（注册前扫码关注“广东加薪发布”抖音号和微信视频号，以便参加直播招聘会。）</div>
      </div> -->

      <!-- <div style="width:19%;float: right; margin-right:20%">
        <div style="display:inline-block">
          <div style="background:rgb(63 176 241);width: 146px;height:146px"><img style="width: 126px;height:126px;margin-top:10px" src="~@/assets/login/dy.png" /></div>
          <div style="background:rgb(63 176 241);margin-top:5%">
          <div style="font-size:15px;color:#fff">关注抖音号</div>
          <div style="font-size:15px;color:#fff">（请用抖音APP扫码）</div>
          </div>
        </div>
        <div style="display:inline-block;margin-left:17%">
          <div style="background:rgb(63 176 241);width: 146px;height:146px"><img style="width: 126px;height:126px;margin-top:10px" src="~@/assets/login/wx.png" /></div>
          <div style="background:rgb(63 176 241);margin-top:5%">
          <div style="font-size:15px;color:#fff">关注微信视频号</div>
          <div style="font-size:15px;color:#fff">（请用微信APP扫码）</div></div>
        </div>
        <div style="width:100%;margin:2% auto;color:#fff;font-size:17px;background:rgb(63 176 241);">（注册前扫码关注“广东加薪发布”抖音号和微信视频号，以便方便参加直播招聘会。）</div>
      </div> -->
      <!-- <div class="footer">
        <div class="copyright">
          Copyright &copy; 2020 <img src="~@/assets/login/title-bg.png">
        </div>
      </div> -->
    </div>
    <data-look ref="modalForm2" @ok="modalFormOk"></data-look>
    <data-look-s ref="modalForm3" @ok="modalFormOk"></data-look-s>
  </div>
</template>

<script>
import RouteView from '@/components/layouts/RouteView'
import DataLook from './dataLook'
import DataLookS from './dataLook3'
import { mixinDevice } from '@/utils/mixin.js'
import DataLook3 from './dataLook3.vue'

export default {
  name: 'UserLayout',
  components: { RouteView, DataLook,DataLookS },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  methods: {
    toaddregisck() {
      this.$refs.modalForm2.edit()
    },
     toaddregisck2() {
      this.$refs.modalForm3.edit()
    },
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  },
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background-color: #a5d4f6;
    background-size: 100%;
    text-align: center;

    a {
      text-decoration: none;
    }

    .top {
      background: #ccc url(~@/assets/login/title-bg.png) repeat-x;

      .header {
        position: relative;
        width: auto;
        display: inline-block;
        a {
          position: absolute;
          top: 18px;
          font-size: 26px;
          right: 50px;
          color: #ccc;
        }
      }
    }

    .wrap-bg {
      background: #fff url(~@/assets/login/body-bg.png) repeat-x;

      .wrap {
        position: relative;
        width: auto;
        display: inline-block;
        text-align: center;
      }

      .main {
        text-align: left;
        background-color: #fff;
        padding: 25px;
        min-width: 260px;
        width: 368px;
        border-radius: 12px;
        position: absolute;
        right: 100px;
        top: 60px;
      }
    }
    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 0;
      text-align: center;
      background: #ccc url(~@/assets/login/title-bg.png) repeat-x;

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>