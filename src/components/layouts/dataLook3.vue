<template>
  <a-modal :title="title" :width="600" :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <div style="width:100%">
          <!-- <div style="display: inline-block; margin-left: 15%">
            <div style="font-size: 15px">关注抖音号</div>
            <div style="font-size: 15px">（请用抖音APP扫码）</div>
            <img style="width: 150px" src="~@/assets/login/dy.png" />
          </div>
          <div style="display: inline-block; margin-left: 20%">
            <div style="font-size: 15px">关注微信视频号</div>
            <div style="font-size: 15px">（请用微信APP扫码）</div>
            <img style="width: 150px" src="~@/assets/login/wx.png" />
          </div>
          <div style="widht: 100%; margin-top: 2%; color: red; font-size: 17px">
            （注册前扫码关注“广东加薪发布”抖音号和微信视频号，以便参加直播招聘会。）
          </div> -->
          <span>客服微信：Jiaxinjie2021</span>
        </div>
        <!-- <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="Ipad编号">
          <a-input
            placeholder="请输入Ipad编号"
            v-decorator.trim="[ 'ipadCode', validatorRules.ipadCode]"
          />
        </a-form-item> -->
      </a-form>
    </a-spin>

    <template slot="footer">
      <a-button type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'IpadRegisterAddModal',
  data() {
    return {
      value: 1,
      title: '联系客服',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
    }
  },
  created() {},
  methods: {
    edit(record) {
      this.visible = true
    },
    // 关闭
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
  },
}
</script>