<template>
  <div>
    <a-form :form="form" style="width: 120%;margin-top: 20px;" @keyup.enter.native="nextStep">
      <!-- <a-form-item
        label="手机"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
      >
        <a-input
          type="text"
          autocomplete="false"
          style="width:100%;margin-left:0px"
          v-decorator="['phone',{ rules: validatorRules.phone.rule}]"
          placeholder="请输入手机号">
          <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)'}"/>
        </a-input>
      </a-form-item> -->
      <a-form-item
        label="企业名称:"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        style="margin-left: -30px;"
      >
        <a-input
          type="text"
          autocomplete="false"
          style="width:85%;margin-left:0px"
          v-decorator="['enterpriseName',{ rules: validatorRules.enterpriseName.rule}]"
          placeholder="请输入企业名称">
          <!-- <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)'}"/> -->
        </a-input>
      </a-form-item>
      <a-form-item
        label="信用代码"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        style="margin-left: -30px;"
      >
        <a-input
          type="text"
          autocomplete="false"
          style="width:85%;margin-left:0px"
          v-decorator="['creditCode',{ rules: validatorRules.creditCode.rule}]"
          placeholder="请输入信用代码">
          <!-- <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)'}"/> -->
        </a-input>
      </a-form-item>
      <a-form-item
        label="注册账号"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        style="margin-left: -30px;"
      >
        <a-input
          type="text"
          autocomplete="false"
          style="width:85%;margin-left:0px"
          v-decorator="['account',{ rules: validatorRules.account.rule}]"
          placeholder="请输入已注册账号">
          <!-- <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)'}"/> -->
        </a-input>
      </a-form-item>
      <!-- <a-form-item
        label="验证码"
        :labelCol="{span: 5}"
        :wrapperCol="{span: 19}"
        v-if="show">
        <a-row :gutter="16" style="margin-left: 2px">
          <a-col class="gutter-row" :span="12">
            <a-input
              v-decorator="['captcha',validatorRules.captcha]"
              type="text"
              placeholder="手机短信验证码">
            </a-input>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              tabindex="-1"
              size="default"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getCaptcha"
              v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
          </a-col>
        </a-row>
      </a-form-item> -->
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <router-link style="float: left;line-height: 40px; margin-left: -40px;" :to="{ name: 'login' }">使用已有账户登录</router-link>
        <a-button type="primary" @click="nextStep" style="margin-left: 10px">重新获取密码</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {postAction,getAction} from '@/api/manage'

  export default {
    name: "Step2",
    props: ['userList'],
    data() {
      return {
        form: this.$form.createForm(this),
        loading: false,
        // accountName: this.userList.username,
        dropList: "0",
        captcha: "",
        show: true,
        state: {
          time: 60,
          smsSendBtn: false,
        },
        formLogin: {
          captcha: "",
          mobile: "",
        },
        validatorRules: {
          captcha: {rule: [{required: true, message: '请输入短信验证码!'}, {validator: this.validateCaptcha}]},
          phone: {rule: [{required: true, message: '请输入手机号码!'}, {validator: this.validatePhone}]},
          enterpriseName: {rule: [{required: true, message: '请输入企业名称!'}]},
          creditCode: {rule: [{required: true, message: '请输入企业信用代码!'}]},
          account: {rule: [{required: true, message: '请输入已注册账号!'}]},
        },
      }
    },
    computed: {
    },
    methods: {
      nextStep() {
        let that = this
        that.loading = true
        this.form.validateFields((err, values) => {
          console.log(values);
          if (!err) {
            if (that.dropList == "0") {
              
                var params = {}
                params.enterpriseName = values.enterpriseName;
                params.creditCode = values.creditCode;
                params.account = values.account;
                getAction("/hall/enterprise/forgotpassword ", params).then((res) => {
                  console.log(res);
                  if (res.success) {
                    console.log(res);
                    this.$router.push({name: 'registerResult', params: {...values}})
                  } else {
                    this.cmsFailed(res.message);
                  }
                })

              
            }


          }
        })
      },
      getCaptcha(e) {
        e.preventDefault();
        let that = this;
        let phone=that.form.getFieldValue("phone")
        if(!phone){
          this.cmsFailed("手机号不能为空!");
          return;
        }
        this.state.smsSendBtn = true;
        let interval = window.setInterval(() => {
          if (that.state.time-- <= 0) {
            that.state.time = 60;
            that.state.smsSendBtn = false;
            window.clearInterval(interval);
          }
        }, 1000);

        const hide = this.$message.loading('验证码发送中..', 0);
        let smsParams = {
          mobile: phone,
          smsmode: "2"
        };
        postAction("/sys/sms", smsParams).then(res => {
          if (!res.success) {
            setTimeout(hide, 1);
            this.cmsFailed(res.message);
          }
          setTimeout(hide, 500);
        })
      },
      cmsFailed(err) {
        this.$notification['error']({
          message: "验证错误",
          description: err,
          duration: 4,
        });
      },
      handleChangeSelect(value) {
        var that = this;
        console.log(value);
        if (value == 0) {
          that.dropList = "0";
          that.show = true;
        } else {
          that.dropList = "1";
          that.show = false;
        }
      },
      validatePhone(rule,value,callback){
          if(value){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!myreg.test(value)){
              callback("请输入正确的手机号")
            }else{
              callback();
            }
          }else{
            callback()
          }
      }
    }

  }
</script>

<style lang="less" scoped>
  .stepFormText {
    margin-bottom: 24px;
  }

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }
</style>