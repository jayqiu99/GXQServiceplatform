<template>
  <div>
    <!-- <div id="tests">测试打印</div> -->
    <a-drawer title :width="750" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose">
      <table id="tests" cellpadding="0" cellspacing="0" align="center" bgcolor="#fff" class="column">
        <tbody>
          <tr>
            <td valign="top">
              <!--基本信息-->
              <table cellspacing="0" cellpadding="0" border="0" class="box1">
                <tbody>
                  <tr>
                    <td class="hbox" align="middle">
                      <img :src="imgsrc + formData.headimgAddress" width="85" height="104" class="head" alt="头像" />
                    </td>
                    <td>
                      <table cellspacing="0" cellpadding="0" border="0" class="infr">
                        <tbody>
                          <tr>
                            <td colspan="2" class="name">{{ formData.name }}</td>
                            <td align="right" class="icard"></td>
                          </tr>
                          <tr>
                            <td valign="top" colspan="3">
                              <p>
                                <img class="vam" src="https://img01.51jobcdn.com/im/2016/resume/y4.png" width="20"
                                  height="20" />
                                {{ formData.gender }}
                                <span class="p5">|</span>
                                {{ this.getAge(formData.birthday) }}岁 ({{ formData.birthday }})
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--最近工作-->
              <table cellspacing="0" cellpadding="0" border="0" class="box2">
                <tbody>
                  <tr>
                    <td class="tba">
                      <table cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td valign="top" class="tb2">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <thead style="height: 0">
                                  <tr>
                                    <td valign="top" class="keys"></td>
                                    <td valign="top" class="txt2"></td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colspan="2" class="plate2">个人详细信息</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">性别：</td>
                                    <td valign="top" class="txt2">{{ formData.gender }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">学历：</td>
                                    <td valign="top" class="txt2">{{ formData.education }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">参加工作：</td>
                                    <td valign="top" class="txt2">{{ formData.participateInWork }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td valign="top" class="tb2">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <thead style="height: 0">
                                  <tr>
                                    <td valign="top" class="keys"></td>
                                    <td valign="top" class="txt2"></td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colspan="2" class="plate2"></td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">出生日期：</td>
                                    <td valign="top" class="txt2">{{ formData.birthday }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">联系电话：</td>
                                    <td valign="top" class="txt2">{{ formData.phone }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">工作经验：</td>
                                    <td valign="top" class="txt2">
                                      {{
                                      formData.experience
                                      }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--个人信息-->
              <!--求职意向-->
              <table cellspacing="0" cellpadding="0" border="0" class="box">
                <tbody>
                  <tr>
                    <td class="tba">
                      <table cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                          <tr>
                            <td valign="top" class="tb2">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <thead style="height: 0">
                                  <tr>
                                    <td valign="top" class="keys"></td>
                                    <td valign="top" class="txt2"></td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colspan="2" class="plate2">求职意向</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">期望职业：</td>
                                    <td valign="top" class="txt2">{{ formData.intendedPosition }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">期望行业：</td>
                                    <td valign="top" class="txt2">{{ formData.intendedIndustries }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">工作区域：</td>
                                    <td valign="top" class="txt2">{{ formData.workArea }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">求职类型：</td>
                                    <td valign="top" class="txt2">{{ formData.jobSearchType }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td valign="top" class="tb2">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <thead style="height: 0">
                                  <tr>
                                    <td valign="top" class="keys"></td>
                                    <td valign="top" class="txt2"></td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td colspan="2" class="plate2"></td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys"></td>
                                    <td valign="top" class="txt2"></td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">期望薪资：</td>
                                    <td valign="top" class="txt2">{{ formData.salaryExpectation }}</td>
                                  </tr>
                                  <tr>
                                    <td valign="top" class="keys">到岗时间：</td>
                                    <td valign="top" class="txt2">{{ formData.availableTime }}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--工作经验-->
              <table cellspacing="0" cellpadding="0" border="0" class="box">
                <tbody>
                  <tr>
                    <td class="plate1">工作经验</td>
                  </tr>
                  <tr>
                    <td class="tbb">
                      <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td class="p15">
                            <table cellspacing="0" cellpadding="0" border="0">
                              <tbody>
                                <tr>
                                  <td valign="top" class="time">
                                    {{
                                    formData.workingHoursStart == null
                                    ? ''
                                    : formData.workingHoursStart.replace(new RegExp('-', 'gm'), '/')
                                    }}{{
                                    formData.workingHoursStart == null || formData.workingHoursEnd == null ? '' : '-'
                                    }}{{
                                    formData.workingHoursEnd == null
                                    ? ''
                                    : formData.workingHoursEnd.replace(new RegExp('-', 'gm'), '/')
                                    }}
                                  </td>
                                  <td valign="top" class="rtbox">
                                    <strong class="txt3">{{ formData.postName }}</strong>
                                    <span class="p5">
                                      {{
                                      formData.postName == null || formData.jobNature == null ? '' : '|'
                                      }}
                                    </span>
                                    <span>{{ formData.jobNature }}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="phd tb1" colspan="2">
                                    <span>{{ formData.jobCompanyName }}</span>
                                    <span class="gray"></span>
                                  </td>
                                </tr>
                                <!--<tr>
                                                            <td class="phd tb1 gray2" colspan="2">计算机硬件<span class="p5">|</span>合资</td>
                                </tr>-->
                                <tr>
                                  <td class="tb1" colspan="2">
                                    <table cellspacing="0" cellpadding="0" border="0">
                                      <tbody>
                                        <tr>
                                          <td valign="top" class="keys">{{ formData.jobDescription == null ? '' :
                                            '工作描述：' }}</td>
                                          <td valign="top" class="txt1">
                                            <div v-html="transChar(formData.jobDescription, '\n', '<br>')"></div>
                                            <!-- <div v-html="formData.jobDescription"></div> -->
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 项目经验 -->
              <table cellspacing="0" cellpadding="0" border="0" class="box">
                <tbody>
                  <tr>
                    <td class="plate1">教育经历</td>
                  </tr>
                  <tr>
                    <td class="tba">
                      <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td class="tba">
                            <table cellspacing="0" cellpadding="0" border="0">
                              <tr>
                                <td class="p15">
                                  <table cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                      <tr>
                                        <td valign="top" class="time">
                                          {{
                                          formData.schoolHoursStart == null
                                          ? ''
                                          : formData.schoolHoursStart.replace(new RegExp('-', 'gm'), '/')
                                          }}{{
                                          formData.schoolHoursStart == null || formData.schoolHoursEnd == null
                                          ? ''
                                          : '-'
                                          }}{{
                                          formData.schoolHoursEnd == null
                                          ? ''
                                          : formData.schoolHoursEnd.replace(new RegExp('-', 'gm'), '/')
                                          }}
                                        </td>
                                        <td valign="top" class="rtbox">
                                          <strong>{{ formData.graduateSchool }}</strong>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="tb1" colspan="2">
                                          {{ formData.education
                                          }}
                                          <span class="p5">
                                            {{
                                            formData.education == null || formData.majorCategory == null ? '' : '|'
                                            }}
                                          </span>
                                          {{ formData.majorCategory }}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }">
        <a-button :style="{ marginRight: '8px' }" @click="onClose">关闭</a-button>
        <a-button :style="{ marginRight: '8px' }" type="primary" v-print="'#tests'">打印</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
  import { getUrl } from '@/api/manage'
  import { resumeList } from '@/api/api'
  import store from '@/store'
  export default {
    data() {
      return {
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
          workingHoursEnd: '',
          workingHoursStart: '',
          schoolHoursEnd: '',
          schoolHoursStart: '',
          majorCategory: '',
          postName: '',
          jobCompanyName: '',
          jobDescription: '',
          graduateSchool: '',
          experience: ''
        },
        queryParam: {
          id: '',
          jobfairid: '',
          enterpriseinfoid: '',
          enterpriseName: '',
          displaysign: '',
          phone: '',
        },
        horizontalbar1: '',
        horizontalbar2: '',
        visible: false,
        imgsrc: ''
      }
    },
    methods: {
      transChar(val, patten, replaceChar) {
        if (!val) {
          return ''
        }

        let reg = new RegExp(patten, 'g')

        return val.replace(reg, replaceChar)
      },
      showDrawer(record) {
        console.log("简历1", record);

        var departn = localStorage.getItem('departId')
        this.axios({
          method: 'get',
          url: '/sys/getenterprisebyuser',
          headers: {},
          params: { userid: store.getters.userInfo.id, departid: departn },
        })
          .then((response) => {
            console.log('企业信息', response.result)
            if (response.result.enterpriseIds == '') {
              console.log("超级管理员登录");
            } else {
              console.log("企业登录");
              this.axios({
                method: 'get',
                url: '/app/interview/browse',
                headers: {},
                params: { enterpriseInfoId: response.result.enterpriseIds, curriculumVitaeId: record.curriculumVitaeId },
              })
                .then((response) => {
                  console.log('查看简历+1', response)
                })
            }

          })
          .catch(function (error) {
            // this.$message.error(res.message || '上传失败');
            // data.onError() // 返回报错
            console.log(error)
          })

        this.queryParam.id = record.curriculumVitaeId;
        let params = this.queryParam //查询条件
        resumeList(params).then((res) => {
          if (res.success) {
 
            console.log("简历2", res.result.records[0]);
            this.formData = res.result.records[0]
            this.formData.headimgAddress =
            this.formData.headimgAddress == null ? '/zqhrimg/publicImg/TX.png' : this.formData.headimgAddress
            //this.horizontalbar1
            this.horizontalbar2 = this.formData.education == null || this.formData.majorCategory == null ? '' : '-'
            this.formData.educationHistory =
            this.formData.educationHistory == null ? '' : this.formData.educationHistory.replace(/\n/g, '<br/>')
            //工作经验

            // console.log("工作经验1",this.formData.experience);

            let _this = this
            let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
            let start = new Date(record.participateInWork)
            let end = new Date(this.getNowFormatDate())
            let year = end.getFullYear() - start.getFullYear()
            let month = end.getMonth() - start.getMonth()
            let day = end.getDate() - start.getDate()
            if (month < 0) {
              year--
              month = end.getMonth() + (12 - start.getMonth())
            }
            if (day < 0) {
              month--
              let index = flag.findIndex(temp => {
                return temp === start.getMonth() + 1
              })
              let monthLength
              if (index <= 6) {
                monthLength = 31
              } else if (index > 6 && index <= 10) {
                monthLength = 30
              } else {
                monthLength = 28
              }
              day = end.getDate() + (monthLength - start.getDate())
            }
            var returnstr = month >= 6 ? `${year + 1}` + '年' : year + '年'
            if (year == 0) {
              returnstr = month >= 6 ? '1年' : '0年'
            }
            this.formData.experience = returnstr
            // console.log("工作经验",this.formData.experience);
            this.visible = true
          }
        })
      },
      //当前时间
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
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' '
        // +
        // date.getHours() +
        // seperator2 +
        // date.getMinutes() +
        // seperator2 +
        // date.getSeconds()
        return currentdate
      },
      onClose() {
        console.log('关闭')
        this.visible = false
      },
      monthDayDiff(starttime, endtime) {
        // this指针
        let _this = this
        let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
        let start = new Date(starttime)
        let end = new Date(endtime)
        let year = end.getFullYear() - start.getFullYear()
        let month = end.getMonth() - start.getMonth()
        let day = end.getDate() - start.getDate()
        if (month < 0) {
          year--
          month = end.getMonth() + (12 - start.getMonth())
        }
        if (day < 0) {
          month--
          let index = flag.findIndex(temp => {
            return temp === start.getMonth() + 1
          })
          let monthLength
          if (index <= 6) {
            monthLength = 31
          } else if (index > 6 && index <= 10) {
            monthLength = 30
          } else {
            monthLength = 28
          }
          day = end.getDate() + (monthLength - start.getDate())
        }
        // this.result = `相差${12 * year + month}月${day}天`;
        var returnstr = year == '0' ? `${month}月` : `${year}年${month}月`
        return returnstr
      },
      getAge(strAge) {
        if (strAge == null) {
          this.$message.warning('简历信息缺失：（年龄错误）')
          return null;
        } else {
          console.log('年纪', strAge)
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
        }
      }
    },
    created() {
      this.imgsrc = getUrl()
    }
  }
</script>
<style scope>
  /* html,
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
  } */

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
    width: 698px;
    height: 90px;
  }

  .chead .txt {
    width: 152px;
    height: 90px;
  }

  .column {
    width: 1002px;
    line-height: 28px;
    border: 1px solid #dedede;
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
    word-wrap: break-word;
    color: #ffffff;
    background-color: #3f4160;
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

  .column .plate1,
  .column .plate2 {
    width: 430px;
    height: 54px;
    font-size: 16px;
    font-weight: bold;
    color: #818ba3;
  }

  .column .plate1 {
    width: 900px;
    padding: 0 50px;
  }

  .column .plate1 .f16 {
    font-size: 14px;
    font-weight: normal;
    color: #333333;
  }

  .column .plate1 .f12 {
    font-size: 12px;
    font-weight: normal;
    color: #999999;
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
    width: 220px;
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