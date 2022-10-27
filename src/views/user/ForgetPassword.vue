<template>
    <result
      :isSuccess="true"
      :content="false"
      :title="email">
  
      <template slot="action">
        <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
      </template>
  
    </result>
  </template>
  
  <script>
    import Result from '@/views/result/Result'
  
    export default {
      name: "ForgetPassword",
      components: {
        Result
      },
      data () {
        return {
          form: {},
        }
      },
      computed: {
        email () {
            console.log("忘记密码111",this.form);
          let v = this.form ? this.form.username || this.form.mobile : ' XXX '
          console.log("忘记密码",v);
          let title = `你的账户：${v} 注册成功`
          this.username = v;
          return title
        }
      },
      created () {
        console.log("忘记密码222",this.$route.params);
        this.form = this.$route.params
      },
      methods: {
        goHomeHandle () {
          let params={};
          params.username=this.form.username;
          params.password=this.form.password;
          console.log(params);
          this.$router.push({name:'login',params})
        },
      }
    }
  </script>
  
  <style scoped>
  
  </style>