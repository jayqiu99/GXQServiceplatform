<template>
  <div style="margin-right:25%;">
    <!-- <div id="tests">测试打印</div> -->
    <a-drawer
      title
      :width="950"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <table
        style
        id="tests"
        cellpadding="0"
        cellspacing="0"
        align="center"
        bgcolor="#fff"
        class="column"
      >
        <tbody>
          <tr>
            <td valign="top">
              <!--基本信息-->
              <table cellspacing="0" cellpadding="0" class="box1">
                <h1 style="margin-left:42%;margin-top:25%;">iPad二维码</h1>
                <tbody>
                  <tr>
                    <td class="hbox" style="margin-right:35%;" align="center">
                      <img :src="erurl" class="head" alt="二维码" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button>
        <a-button type="primary" v-print="'#tests'" @click="prints">打印</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { getUrl } from '@/api/manage'
export default {
  data() {
    return {
      erurl: '',
      formData: {
        account: '',
        birthday: '',
        completionRate: '',
        createBy: '',
        createTime: '',
        currentStatus: '',
        education: '',
        email: '',
        gender: '',
        habitation: '',
        headimgAddress: '',
        id: '',
        idcard: '',
        intendedIndustries: '',
        intendedPosition: '',
        jobNature: '',
        name: '',
        openid: '',
        overt: '',
        phone: '',
        salaryExpectation: '',
        updateBy: '',
        updateTime: '',
        workArea: '',
        workExperience: '',
        workHistory: '',
      },
      visible: false,
      imgsrc: '',
    }
  },
  methods: {
    showDrawer(record) {
      console.log(record)
      this.erurl = record
      //   this.formData = record
      //   this.formData.educationHistory=this.formData.educationHistory.replace(/\n/g,"<br/>")
      //   console.log('typeof', this.formData.educationHistory)
      // this.prints()
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    prints() {
      // console.log('打印++++++++')
      // var prints = document.getElementById('tests')
    },
    getAge(strAge) {
      var birArr = strAge.split('-')
      var birYear = birArr[0]
      var birMonth = birArr[1]
      var birDay = birArr[2]

      d = new Date()
      var nowYear = d.getFullYear()
      var nowMonth = d.getMonth() + 1 //记得加1
      var nowDay = d.getDate()
      var returnAge

      if (birArr == null) {
        return false
      }
      var d = new Date(birYear, birMonth - 1, birDay)
      if (d.getFullYear() == birYear && d.getMonth() + 1 == birMonth && d.getDate() == birDay) {
        if (nowYear == birYear) {
          returnAge = 0 //
        } else {
          var ageDiff = nowYear - birYear //
          if (ageDiff > 0) {
            if (nowMonth == birMonth) {
              var dayDiff = nowDay - birDay //
              if (dayDiff < 0) {
                returnAge = ageDiff - 1
              } else {
                returnAge = ageDiff
              }
            } else {
              var monthDiff = nowMonth - birMonth //
              if (monthDiff < 0) {
                returnAge = ageDiff - 1
              } else {
                returnAge = ageDiff
              }
            }
          } else {
            return '出生日期晚于今天，数据有误' //返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge + 1
      } else {
        return '输入的日期格式错误！'
      }
    },
  },
  created() {
    this.imgsrc = getUrl()
  },
}
</script>
<style scope>
html,
body,
div,
p {
  margin: 0;
  padding: 0;
}
body {
  font-size: 14px;
  font-family: 'microsoft yahei';
  background-color: #ffffff;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
}
th,
td {
  font-size: 14px;
  padding: 0;
}
a {
  text-decoration: none;
}
img {
  border: 0 none;
}
.blue {
  text-decoration: none;
  color: #3c3d5d;
}
.chead {
  width: 1002px;
}
.chead .logo {
  width: 598px;
  height: 90px;
}
.chead .txt {
  width: 152px;
  height: 90px;
}
.column {
  width: 1002px;
  line-height: 28px;
}
.column .hbox {
  width: 185px;
  height: 154px;
}
.column .head {
  display: block;
  background-color: #fafafa;
}
.column .box {
  width: 100%;
  background-color: #ffffff;
  border-top: 2px solid #f2f3f5;
}
.column .box1 {
  width: 100%;
}
.column .box2 {
  width: 100%;
  background-color: #f8f9fa;
}
.column .tba {
  width: 940px;
  padding: 0 30px 15px;
}
.column .tbb {
  width: 940px;
  padding: 0 50px;
}
.column .tb1 {
  width: 900px;
  line-height: 28px;
  color: #333333;
  word-break: break-all;
  padding: 0 20px;
}
.column .tb2 {
  width: 430px;
  padding: 0 20px;
}
.column .tb3 {
  width: 900px;
  padding: 15px 20px 15px 0;
}
.column .gray,
.column .gray2 {
  color: #999999;
  word-break: break-all;
}
.column .gray2 {
  color: #666666;
}

.column .keys,
.column .keys2 {
  width: 95px;
  line-height: 28px;
  color: #666666;
}
.column .keyworkHistory {
  width: 400px;
  line-height: 28px;
  color: #666666;
  padding: 0 20px;
}
.column .keyspersonalIntroduction {
  width: 400px;
  line-height: 28px;
  color: #666666;
  padding: 0 0px;
}
.column .keys2 {
  width: 110px;
}
.column .txt1,
.column .txt2,
.column .txt3 {
  width: 345px;
  line-height: 28px;
  color: #333333;
  word-break: break-all;
}
.column .txt2 {
  width: 345px;
}
.column .txt3 {
  width: auto;
  max-width: 815px;
  font-size: 14px;
  font-weight: bold;
}
.column .txt4 {
  width: 305px;
  color: #ffffff;
  word-break: break-all;
}
.column .infr {
  width: 767px;
  color: #ffffff;
  table-layout: auto;
}
.column .vam,
.column .grcha {
  vertical-align: middle;
  margin-left: 5px;
}
.column .box1 .vam {
  margin-right: 5px;
  margin-left: 0;
}
.column .name {
  font-size: 24px;
  padding-bottom: 18px;
}
.column .icard {
  color: #a1a3ae;
  padding-bottom: 18px;
}
.column .con {
  border-top: 1px dotted #ddd;
}
.column .pr20 {
  width: 225px;
  padding-right: 20px;
}
.column .time {
  width: 120px;
  line-height: 28px;
  color: #666666;
  padding-left: 20px;
}
.column .rtbox {
  width: 765px;
  line-height: 28px;
  color: #333333;
  padding: 0 20px 0 15px;
  word-break: break-all;
}
.column .hai,
.column .guan {
  line-height: 18px;
  font-size: 12px;
  color: #ffffff;
  vertical-align: text-top;
  margin-left: 5px;
  padding: 1px 3px;
  background-color: #3cbe7f;
  border-radius: 2px;
}
.column .guan {
  background-color: #ff9f20;
}
.column .tag {
  display: inline-block;
  word-break: break-all;
  display: inline;
  zoom: 1;
}
.column .all {
  color: #666;
  padding: 10px 20px;
  background-color: #fafafa;
}
.column .tit {
  width: 900px;
  height: 40px;
  color: #666666;
  padding: 0 20px;
  background-color: #f5f5f5;
}
.column .p15 {
  padding: 15px 0;
}
.column .p5 {
  display: inline-block;
  color: #666666;
  padding: 0 5px;
  display: inline;
  zoom: 1;
}
.column .cell .skill {
  width: 165px;
  text-align: right;
  padding-right: 15px;
}
.column .cell .skbg,
.column .cell .skco {
  display: inline-block;
  width: 245px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: #ffffff;
  vertical-align: top;
  margin-top: 6px;
  background-color: #dddddd;
  border-radius: 20px;
  display: inline;
  zoom: 1;
}
.column .cell .skco {
  width: 235px;
  font-style: normal;
  margin-top: 0;
  padding-left: 10px;
  background-color: #ff9f20;
  z-index: 3;
}
.column .sl .skco {
  width: 173px;
}
.column .lh .skco {
  width: 112px;
}
.column .yb .skco {
  width: 51px;
}
.column .fbox strong {
  font-size: 14px;
  font-weight: bold;
}
.column .cha {
  font-size: 12px;
  font-weight: normal;
  color: #00457d;
  margin-left: 5px;
}
.column .cha:hover {
  color: #ff6000;
}
.column .email {
  width: 330px;
}

.eng td,
.eng .txt3,
.eng .fbox strong {
  font-size: 13px;
  font-family: 'Arial';
}
.eng .txt1,
.eng .rtbox,
.eng .phd {
  width: 775px;
  font-size: 13px;
  font-family: 'Arial';
  line-height: 28px;
}
.eng .txt2 {
  width: 305px;
}
.eng .txt4 {
  width: 245px;
}
.eng .cell .txt3 {
  width: 120px;
}
.eng .time,
.eng .keys {
  width: 110px;
  font-size: 13px;
  text-align: right;
}
.eng .cell .skill {
  width: 130px;
}
.eng .phd {
  padding-left: 145px;
}
.eng .keys {
  padding-right: 15px;
}
.eng .pr20 {
  width: 205px;
}
.eng .pr20 .keys {
  width: 100px;
}
.eng .email {
  width: 270px;
}
</style>
<style media="print">
/*打印去掉页眉页脚*/
@page {
  size: auto;
  margin: 0mm;
}
</style>
<style scoped>
#InvoiceVoucher {
  width: 62%;
  margin: 0 auto;
  text-align: left;
  display: none;
}
</style>