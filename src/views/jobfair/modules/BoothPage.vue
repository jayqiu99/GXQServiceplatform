<template>
  <div>
    <a-card :bordered="true">
      <div class="imgBox"><img src="../../../../src/assets/zw/zwpmt.jpg" alt /></div>
      <div class="lefttop">
        <el-row :gutter="10" v-for="(item, index) in lefttopItem" :key="item.value">
          <el-col style="margin-left: 4px" :span="6">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="lefttop2">
        <el-row :gutter="20" v-for="(item, index) in lefttop2Item" :key="item.value">
          <el-col style="margin-left: 8px" :span="10">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="lefttop3">
        <el-row :gutter="20" v-for="(item, index) in lefttop3Item" :key="item.value">
          <el-col style="margin-left: 8px" :span="10">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="righttop">
        <el-row :gutter="20" v-for="(item, index) in righttopItem" :key="item.value">
          <el-col style="margin-left: 5px" :span="10">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="righttop2">
        <el-row :gutter="20" v-for="(item, index) in righttop2Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="10">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="righttop3">
        <el-row :gutter="20" v-for="(item, index) in righttop3Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="10">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="mid1">
        <el-row :gutter="20" v-for="(item, index) in mid1Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="8">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="mid2">
        <el-row :gutter="20" v-for="(item, index) in mid2Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="8">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="mid3">
        <el-row :gutter="20" v-for="(item, index) in mid3Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="8">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="mid4">
        <el-row :gutter="20" v-for="(item, index) in mid4Item" :key="item.value">
          <el-col style="margin-left: 5px" :span="8">
            <a-button :disabled="item.isDisable" size="small" :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }} </a-button></el-col
          >
        </el-row>
      </div>
      <div class="rights">
        <el-row :gutter="10" v-for="(item, index) in rightsItem" :key="item.value">
          <el-col style="margin-left:7px" :span="6"> <a-button :disabled="item.isDisable" :style="{ background: item.background }" @click="btnClick(item.value)" size="small">{{item.name }}</a-button></el-col>
        </el-row>
      </div>
      <div class="bottoms">
        <el-row :gutter="10"  v-for="(item, index) in bottomsItem" :key="item.value">
          <el-col style="margin-left:8px" :span="3"> <a-button :disabled="item.isDisable" :style="{ background: item.background }" @click="btnClick(item.value)" size="small">{{item.name }} </a-button></el-col>
        </el-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import {
  getBoothList,
  togetBoothList,
  jobenterpriseList,
  openadd,
  closeact,
  addBasic,
  editBasic,
  duplicateCheck,
  getEditById,
  addbooth,
  addUser,
  editenterprise,
  queryUserRole,
  queryall,
} from '@/api/api'
export default {
  props: {
    recordData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isDisable: false,
      lefttopItem: [
        {
          name: 'Z001',
          isDisable: false,
          value: '1',
          background:''
        },
        {
          name: 'Z002',
          isDisable: false,
          value: '2',
           background:''
        },
        {
          name: 'Z003',
          isDisable: false,
          value: '3',
           background:''
        },
      ],
      lefttop2Item: [
        {
          name: 'Z006',
          isDisable: false,
          value: '6',
           background:''
        },
        {
          name: 'Z007',
          isDisable: false,
          value: '7',
           background:''
        },
      ],
      lefttop3Item: [
        {
          name: 'Z008',
          isDisable: false,
          value: '8',
           background:''
        },
        {
          name: 'Z009',
          isDisable: false,
          value: '9',
           background:''
        },
      ],
      righttopItem: [
        {
          name: 'Z004',
          isDisable: false,
          value: '4',
           background:''
        },
        {
          name: 'Z005',
          isDisable: false,
          value: '5',
           background:''
        },
      ],
      righttop2Item: [
        {
          name: 'Z010',
          isDisable: false,
          value: '10',
           background:''
        },
        {
          name: 'Z011',
          isDisable: false,
          value: '11',
           background:''
        },
      ],
      righttop3Item: [
        {
          name: 'Z012',
          isDisable: false,
          value: '12',
           background:''
        },
        {
          name: 'Z013',
          isDisable: false,
          value: '13',
           background:''
        },
      ],
      mid1Item: [
        {
          name: 'Z014',
          isDisable: false,
          value: '14',
           background:''
        },
        {
          name: 'Z015',
          isDisable: false,
          value: '15',
           background:''
        },
      ],
      mid2Item: [
        {
          name: 'Z016',
          isDisable: false,
          value: '16',
           background:''
        },
        {
          name: 'Z017',
          isDisable: false,
          value: '17',
           background:''
        },
      ],
      mid3Item: [
        {
          name: 'Z018',
          isDisable: false,
          value: '18',
           background:''
        },
        {
          name: 'Z019',
          isDisable: false,
          value: '19',
           background:''
        },
      ],
      mid4Item: [
        {
          name: 'Z020',
          isDisable: false,
          value: '20',
           background:''
        },
        {
          name: 'Z021',
          isDisable: false,
          value: '21',
           background:''
        },
      ],
      rightsItem: [
        {
          name: 'Z030',
          isDisable: false,
          value: '30',
           background:''
        },
        {
          name: 'Z031',
          isDisable: false,
          value: '31',
           background:''
        },
        {
          name: 'Z032',
          isDisable: false,
          value: '32',
           background:''
        },
        {
          name: 'Z033',
          isDisable: false,
          value: '33',
           background:''
        },
      ],
       bottomsItem: [
        {
          name: 'Z022',
          isDisable: false,
          value: '22',
           background:''
        },
        {
          name: 'Z023',
          isDisable: false,
          value: '23',
           background:''
        },
        {
          name: 'Z024',
          isDisable: false,
          value: '24',
           background:''
        },
        {
          name: 'Z025',
          isDisable: false,
          value: '25',
           background:''
        },
         {
          name: 'Z026',
          isDisable: false,
          value: '26',
           background:''
        },
        {
          name: 'Z027',
          isDisable: false,
          value: '27',
           background:''
        },
        {
          name: 'Z028',
          isDisable: false,
          value: '28',
           background:''
        },
        {
          name: 'Z029',
          isDisable: false,
          value: '29',
           background:''
        },
      ],
    }
  },
  methods: {
    //获取展位
    getBooth() {
      togetBoothList({ jobFairId: this.recordData.id }).then((res) => {
        console.log('返回的数据', res)
        if(res.result.records.length>0){}
      })
    },
    //展位按钮点击事件
    btnClick(value){
      var _this=this
       getBoothList({boothInsidenumber:value,jobFairId:this.recordData.id}).then((res) => {
        console.log('点击展位',res)
        if (res.success) {
          if (res.result.records.length >= 1) {

          }
          }
       })
    }
  },
  created() {
    console.log('拿到的数据', this.recordData)
    this.getBooth()
  },
}
</script>

<style>
.lefttop {
  left: 392px;
  top: 90px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.lefttop2 {
  left: 437.8px;
  top: 210px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.lefttop3 {
  left: 437.8px;
  top: 260px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.righttop {
  left: 845px;
  top: 85px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.righttop2 {
  left: 845px;
  top: 225px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.righttop3 {
  left: 845px;
  top: 265px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.mid1 {
  left: 442px;
  top: 495px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.mid2 {
  left: 585px;
  top: 495px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.mid3 {
  left: 442px;
  top: 545px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.mid4 {
  left: 585px;
  top: 545px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.bottoms {
  left: 395px;
  top: 680px;
  display: flex;
  position: absolute;
  z-index: 9999;
}
.rights {
  left: 710px;
  top: 505px;
  display: flex;
  position: absolute;
  z-index: 9999;
  transform: rotate(90deg);
}
.imgBox {
  position: relative;
  left: 259px;
  width: 100%;
}
</style>