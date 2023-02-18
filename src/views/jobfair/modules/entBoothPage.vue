<template>
    <div>
        <a-card :bordered="true">
            <div class="imgBox"><img src="../../../../src/assets/zw/zwpmt.jpg" alt /></div>
            <div style="height: 20%; clear: none; position: absolute; top: 10%; right: 6.5%">
                <a-button type style="width: 50px" size="small"></a-button>
                <span style="color: black; font-size: 16px; font-weight: 800">可选展位</span>
            </div>
            <div style="height: 20%; clear: none; position: absolute; top: 14%; right: 5.2%">
                <a-button type style="width: 50px; background: #d9d9d9" size="small"></a-button>
                <span style="color: black; font-size: 16px; font-weight: 800">不可选展位</span>
            </div>
            <div style="height: 20%; clear: none; position: absolute; top: 18%; right: 6.5%">
                <a-button type style="background: #92d050; width: 50px" size="small"></a-button>
                <span style="color: black; font-size: 16px; font-weight: 800">自选展位</span>
            </div>
            <div style="height: 20%; clear: none; position: absolute; top: 22%; right: 5.2%">
                <a-button type style="width: 50px; background: #ff9b9b" size="small"></a-button>
                <span style="color: black; font-size: 16px; font-weight: 800">已占用展位</span>
            </div>
            <div class="lefttop">
                <el-row :gutter="10" v-for="(item, index) in lefttopItem" :key="item.value">
                    <el-col style="margin-left: 8px" :span="6">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="lefttop2">
                <el-row :gutter="20" v-for="(item, index) in lefttop2Item" :key="item.value">
                    <el-col style="margin-left: 8px" :span="10">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="lefttop3">
                <el-row :gutter="20" v-for="(item, index) in lefttop3Item" :key="item.value">
                    <el-col style="margin-left: 8px" :span="10">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="righttop">
                <el-row :gutter="20" v-for="(item, index) in righttopItem" :key="item.value">
                    <el-col style="margin-left: 2px" :span="10">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="righttop2">
                <el-row :gutter="20" v-for="(item, index) in righttop2Item" :key="item.value">
                    <el-col style="margin-left: 2px" :span="10">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="righttop3">
                <el-row :gutter="20" v-for="(item, index) in righttop3Item" :key="item.value">
                    <el-col style="margin-left: 2px" :span="10">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="mid1">
                <el-row :gutter="20" v-for="(item, index) in mid1Item" :key="item.value">
                    <el-col style="margin-left: 5px" :span="8">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="mid2">
                <el-row :gutter="20" v-for="(item, index) in mid2Item" :key="item.value">
                    <el-col style="margin-left: 5px" :span="8">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="mid3">
                <el-row :gutter="20" v-for="(item, index) in mid3Item" :key="item.value">
                    <el-col style="margin-left: 5px" :span="8">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="mid4">
                <el-row :gutter="20" v-for="(item, index) in mid4Item" :key="item.value">
                    <el-col style="margin-left: 5px" :span="8">
                        <a-button style="width: 48px;" :disabled="item.isDisable" size="small"
                            :style="{ background: item.background }" @click="btnClick(item.value)">{{ item.name }}
                        </a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="rights">
                <el-row :gutter="10" v-for="(item, index) in rightsItem" :key="item.value">
                    <el-col style="margin-left:1px" :span="6">
                        <a-button style="width: 48px;" :disabled="item.isDisable" class="butclass"
                            :style="{ background: item.background }" @click="btnClick(item.value)" size="small">
                            {{ item.name }}</a-button>
                    </el-col>
                </el-row>
            </div>
            <div class="bottoms">
                <el-row :gutter="10" v-for="(item, index) in bottomsItem" :key="item.value">
                    <el-col style="margin-left:6.8px" :span="3">
                        <a-button style="width: 48px;" :disabled="item.isDisable"
                            :style="{ background: item.background }" @click="btnClick(item.value)" size="small">
                            {{ item.name }} </a-button>
                    </el-col>
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
    chooseboothadd,
    getboothobj
} from '@/api/api'
import store from '@/store'
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
            entinfo: '',
            isDisable: false,
            strrecord: {},
            boothEntity: {},
            boothtext: {
                enterpriseName: '',
                boothNumber: '',
                boothType: '',
                boothPosition: '',
                validEnddate: '',
            },
            lefttopItem: [
                {
                    name: 'Z031',
                    isDisable: false,
                    value: '31',
                    background: ''
                },
                {
                    name: 'Z032',
                    isDisable: false,
                    value: '32',
                    background: ''
                },
                {
                    name: 'Z033',
                    isDisable: false,
                    value: '33',
                    background: ''
                },
            ],
            lefttop2Item: [
                {
                    name: 'Z030',
                    isDisable: false,
                    value: '30',
                    background: ''
                },
                {
                    name: 'Z029',
                    isDisable: false,
                    value: '29',
                    background: ''
                },
            ],
            lefttop3Item: [
                {
                    name: 'Z027',
                    isDisable: false,
                    value: '27',
                    background: ''
                },
                {
                    name: 'Z028',
                    isDisable: false,
                    value: '28',
                    background: ''
                },
            ],
            righttopItem: [
                {
                    name: 'Z001',
                    isDisable: false,
                    value: '1',
                    background: ''
                },
                {
                    name: 'Z002',
                    isDisable: false,
                    value: '2',
                    background: ''
                },
            ],
            righttop2Item: [
                {
                    name: 'Z004',
                    isDisable: false,
                    value: '4',
                    background: ''
                },
                {
                    name: 'Z003',
                    isDisable: false,
                    value: '3',
                    background: ''
                },
            ],
            righttop3Item: [
                {
                    name: 'Z005',
                    isDisable: false,
                    value: '5',
                    background: ''
                },
                {
                    name: 'Z006',
                    isDisable: false,
                    value: '6',
                    background: ''
                },
            ],
            mid1Item: [
                {
                    name: 'Z026',
                    isDisable: false,
                    value: '26',
                    background: ''
                },
                {
                    name: 'Z025',
                    isDisable: false,
                    value: '25',
                    background: ''
                },
            ],
            mid2Item: [
                {
                    name: 'Z024',
                    isDisable: false,
                    value: '24',
                    background: ''
                },
                {
                    name: 'Z023',
                    isDisable: false,
                    value: '23',
                    background: ''
                },
            ],
            mid3Item: [
                {
                    name: 'Z019',
                    isDisable: false,
                    value: '19',
                    background: ''
                },
                {
                    name: 'Z020',
                    isDisable: false,
                    value: '20',
                    background: ''
                },
            ],
            mid4Item: [
                {
                    name: 'Z021',
                    isDisable: false,
                    value: '21',
                    background: ''
                },
                {
                    name: 'Z022',
                    isDisable: false,
                    value: '22',
                    background: ''
                },
            ],
            rightsItem: [
                {
                    name: 'Z007',
                    isDisable: false,
                    value: '7',
                    background: ''
                },
                {
                    name: 'Z008',
                    isDisable: false,
                    value: '8',
                    background: ''
                },
                {
                    name: 'Z009',
                    isDisable: false,
                    value: '9',
                    background: ''
                },
                {
                    name: 'Z010',
                    isDisable: false,
                    value: '10',
                    background: ''
                },
            ],
            bottomsItem: [
                {
                    name: 'Z018',
                    isDisable: false,
                    value: '18',
                    background: ''
                },
                {
                    name: 'Z017',
                    isDisable: false,
                    value: '17',
                    background: ''
                },
                {
                    name: 'Z016',
                    isDisable: false,
                    value: '16',
                    background: ''
                },
                {
                    name: 'Z015',
                    isDisable: false,
                    value: '15',
                    background: ''
                },
                {
                    name: 'Z014',
                    isDisable: false,
                    value: '14',
                    background: ''
                },
                {
                    name: 'Z013',
                    isDisable: false,
                    value: '13',
                    background: ''
                },
                {
                    name: 'Z012',
                    isDisable: false,
                    value: '12',
                    background: ''
                },
                {
                    name: 'Z011',
                    isDisable: false,
                    value: '11',
                    background: ''
                },
            ],
        }
    },
    methods: {
        //选择展位
        SelectBoothadd() {
            var vm = this;
            console.log("展位信息", vm.strrecord);
        },
        // 修改展位
        handleEdits(data) {
            console.log(data)
            var _this = this
            var values = {}
            values.updateTime = this.getNowFormatDate()
            values.updateBy = (store.getters.userInfo.id || '').trim()
            var obj
            var formData = Object.assign(data, values)
            formData.boothNumber = this.boothtext.boothNumber;
            if (!data.id) {
                formData.createBy = store.getters.userInfo.id
                formData.createTime = this.getNowFormatDate()
                obj = addbooth(formData)
            } else {
                obj = getEditById(formData)
            }
            obj.then((res) => {
                if (res.success) {
                    _this.$message.success(res.message)
                    _this.getBooth()
                } else {
                    _this.$message.warning(res.message)
                }
            })
        },
        chongzhi() {
            this.lefttopItem = [
                {
                    name: 'Z031',
                    isDisable: false,
                    value: '31',
                    background: ''
                },
                {
                    name: 'Z032',
                    isDisable: false,
                    value: '32',
                    background: ''
                },
                {
                    name: 'Z033',
                    isDisable: false,
                    value: '33',
                    background: ''
                },
            ]
            this.lefttop2Item = [
                {
                    name: 'Z030',
                    isDisable: false,
                    value: '30',
                    background: ''
                },
                {
                    name: 'Z029',
                    isDisable: false,
                    value: '29',
                    background: ''
                },
            ]
            this.lefttop3Item = [
                {
                    name: 'Z027',
                    isDisable: false,
                    value: '27',
                    background: ''
                },
                {
                    name: 'Z028',
                    isDisable: false,
                    value: '28',
                    background: ''
                },
            ]
            this.righttopItem = [
                {
                    name: 'Z001',
                    isDisable: false,
                    value: '1',
                    background: ''
                },
                {
                    name: 'Z002',
                    isDisable: false,
                    value: '2',
                    background: ''
                },
            ]
            this.righttop2Item = [
                {
                    name: 'Z004',
                    isDisable: false,
                    value: '4',
                    background: ''
                },
                {
                    name: 'Z003',
                    isDisable: false,
                    value: '3',
                    background: ''
                },
            ]
            this.righttop3Item = [
                {
                    name: 'Z005',
                    isDisable: false,
                    value: '5',
                    background: ''
                },
                {
                    name: 'Z006',
                    isDisable: false,
                    value: '6',
                    background: ''
                },
            ]
            this.mid1Item = [
                {
                    name: 'Z026',
                    isDisable: false,
                    value: '26',
                    background: ''
                },
                {
                    name: 'Z025',
                    isDisable: false,
                    value: '25',
                    background: ''
                },
            ]
            this.mid2Item = [
                {
                    name: 'Z024',
                    isDisable: false,
                    value: '24',
                    background: ''
                },
                {
                    name: 'Z023',
                    isDisable: false,
                    value: '23',
                    background: ''
                },
            ]
            this.mid3Item = [
                {
                    name: 'Z019',
                    isDisable: false,
                    value: '19',
                    background: ''
                },
                {
                    name: 'Z020',
                    isDisable: false,
                    value: '20',
                    background: ''
                },
            ]
            this.mid4Item = [
                {
                    name: 'Z021',
                    isDisable: false,
                    value: '21',
                    background: ''
                },
                {
                    name: 'Z022',
                    isDisable: false,
                    value: '22',
                    background: ''
                },
            ]
            this.rightsItem = [
                {
                    name: 'Z007',
                    isDisable: false,
                    value: '7',
                    background: ''
                },
                {
                    name: 'Z008',
                    isDisable: false,
                    value: '8',
                    background: ''
                },
                {
                    name: 'Z009',
                    isDisable: false,
                    value: '9',
                    background: ''
                },
                {
                    name: 'Z010',
                    isDisable: false,
                    value: '10',
                    background: ''
                },
            ],
                this.bottomsItem = [
                    {
                        name: 'Z018',
                        isDisable: false,
                        value: '18',
                        background: ''
                    },
                    {
                        name: 'Z017',
                        isDisable: false,
                        value: '17',
                        background: ''
                    },
                    {
                        name: 'Z016',
                        isDisable: false,
                        value: '16',
                        background: ''
                    },
                    {
                        name: 'Z015',
                        isDisable: false,
                        value: '15',
                        background: ''
                    },
                    {
                        name: 'Z014',
                        isDisable: false,
                        value: '14',
                        background: ''
                    },
                    {
                        name: 'Z013',
                        isDisable: false,
                        value: '13',
                        background: ''
                    },
                    {
                        name: 'Z012',
                        isDisable: false,
                        value: '12',
                        background: ''
                    },
                    {
                        name: 'Z011',
                        isDisable: false,
                        value: '11',
                        background: ''
                    },
                ]
        },
        //获取展位
        getBooth() {
            this.chongzhi();
            // hall/booth/list
            var departn = localStorage.getItem('departId')
            this.axios({
                method: 'get',
                url: '/sys/getenterprisebyuser',
                headers: {},
                params: { userid: store.getters.userInfo.id, departid: departn },
            })
                .then((response) => {
                    this.entinfo = response.result
                    console.log('企业信息', response.result)

                    togetBoothList({ jobFairId: this.recordData.id }).then((res) => {
                        console.log('返回的数据', res)
                        var vm = this;
                        if (res.result.records.length > 0) {
                            for (let a = 0; a < res.result.records.length; a++) {
                                if (res.result.records[a].isoccupy > 0) {//res.result.records[a].enable > 0 && res.result.records[a].enterpriseInfoId > 0) {
                                    // console.log("已选展位",res.result.records);
                                    let casenum = res.result.records[a].boothInsidenumber
                                    if (casenum == 1) {
                                        vm.righttopItem[0].background = '#ff9b9b'
                                        vm.righttopItem[0].isDisable = true
                                    } else if (casenum == 2) {
                                        vm.righttopItem[1].background = '#ff9b9b'
                                        vm.righttopItem[1].isDisable = true
                                    } else if (casenum == 3) {
                                        vm.righttop2Item[1].background = '#ff9b9b'
                                        vm.righttop2Item[1].isDisable = true
                                    } else if (casenum == 4) {
                                        vm.righttop2Item[0].background = '#ff9b9b'
                                        vm.righttop2Item[0].isDisable = true
                                    } else if (casenum == 5) {
                                        vm.righttop3Item[0].background = '#ff9b9b'
                                        vm.righttop3Item[0].isDisable = true
                                    } else if (casenum == 6) {
                                        vm.righttop3Item[1].background = '#ff9b9b'
                                        vm.righttop3Item[1].isDisable = true
                                    } else if (casenum == 7) {
                                        vm.rightsItem[0].background = '#ff9b9b'
                                        vm.rightsItem[0].isDisable = true
                                    } else if (casenum == 8) {
                                        vm.rightsItem[1].background = '#ff9b9b'
                                        vm.rightsItem[1].isDisable = true
                                    } else if (casenum == 9) {
                                        vm.rightsItem[2].background = '#ff9b9b'
                                        vm.rightsItem[2].isDisable = true
                                    } else if (casenum == 10) {
                                        vm.rightsItem[3].background = '#ff9b9b'
                                        vm.rightsItem[3].isDisable = true
                                    } else if (casenum == 11) {
                                        vm.bottomsItem[7].background = '#ff9b9b'
                                        vm.bottomsItem[7].isDisable = true
                                    } else if (casenum == 12) {
                                        vm.bottomsItem[6].background = '#ff9b9b'
                                        vm.bottomsItem[6].isDisable = true
                                    } else if (casenum == 13) {
                                        vm.bottomsItem[5].background = '#ff9b9b'
                                        vm.bottomsItem[5].isDisable = true
                                    } else if (casenum == 14) {
                                        vm.bottomsItem[4].background = '#ff9b9b'
                                        vm.bottomsItem[4].isDisable = true
                                    } else if (casenum == 15) {
                                        vm.bottomsItem[3].background = '#ff9b9b'
                                        vm.bottomsItem[3].isDisable = true
                                    } else if (casenum == 16) {
                                        vm.bottomsItem[2].background = '#ff9b9b'
                                        vm.bottomsItem[2].isDisable = true
                                    } else if (casenum == 17) {
                                        vm.bottomsItem[1].background = '#ff9b9b'
                                        vm.bottomsItem[1].isDisable = true
                                    } else if (casenum == 18) {
                                        vm.bottomsItem[0].background = '#ff9b9b'
                                        vm.bottomsItem[0].isDisable = true
                                    } else if (casenum == 19) {
                                        vm.mid3Item[0].background = '#ff9b9b'
                                        vm.mid3Item[0].isDisable = true
                                    } else if (casenum == 20) {
                                        vm.mid3Item[1].background = '#ff9b9b'
                                        vm.mid3Item[1].isDisable = true
                                    } else if (casenum == 21) {
                                        vm.mid4Item[0].background = '#ff9b9b'
                                        vm.mid4Item[0].isDisable = true
                                    } else if (casenum == 22) {
                                        vm.mid4Item[1].background = '#ff9b9b'
                                        vm.mid4Item[1].isDisable = true
                                    } else if (casenum == 23) {
                                        vm.mid2Item[1].background = '#ff9b9b'
                                        vm.mid2Item[1].isDisable = true
                                    } else if (casenum == 24) {
                                        vm.mid2Item[0].background = '#ff9b9b'
                                        vm.mid2Item[0].isDisable = true
                                    } else if (casenum == 25) {
                                        vm.mid1Item[1].background = '#ff9b9b'
                                        vm.mid1Item[1].isDisable = true
                                    } else if (casenum == 26) {
                                        vm.mid1Item[0].background = '#ff9b9b'
                                        vm.mid1Item[0].isDisable = true
                                    } else if (casenum == 27) {
                                        vm.lefttop3Item[0].background = '#ff9b9b'
                                        vm.lefttop3Item[0].isDisable = true
                                    } else if (casenum == 28) {
                                        vm.lefttop3Item[1].background = '#ff9b9b'
                                        vm.lefttop3Item[1].isDisable = true
                                    } else if (casenum == 29) {
                                        vm.lefttop2Item[1].background = '#ff9b9b'
                                        vm.lefttop2Item[1].isDisable = true
                                    } else if (casenum == 30) {
                                        vm.lefttop2Item[0].background = '#ff9b9b'
                                        vm.lefttop2Item[0].isDisable = true
                                    } else if (casenum == 31) {
                                        vm.lefttopItem[0].background = '#ff9b9b'
                                        vm.lefttopItem[0].isDisable = true
                                    } else if (casenum == 32) {
                                        vm.lefttopItem[1].background = '#ff9b9b'
                                        vm.lefttopItem[1].isDisable = true
                                    } else if (casenum == 33) {
                                        vm.lefttopItem[2].background = '#ff9b9b'
                                        vm.lefttopItem[2].isDisable = true
                                    }
                                } else if (res.result.records[a].enable == -1) {
                                    let casenum = res.result.records[a].boothInsidenumber
                                    if (casenum == 1) {
                                        vm.righttopItem[0].isDisable = true
                                    } else if (casenum == 2) {
                                        vm.righttopItem[1].isDisable = true
                                    } else if (casenum == 3) {
                                        vm.righttop2Item[1].isDisable = true
                                    } else if (casenum == 4) {
                                        vm.righttop2Item[0].isDisable = true
                                    } else if (casenum == 5) {
                                        vm.righttop3Item[0].isDisable = true
                                    } else if (casenum == 6) {
                                        vm.righttop3Item[1].isDisable = true
                                    } else if (casenum == 7) {
                                        vm.rightsItem[0].isDisable = true
                                    } else if (casenum == 8) {
                                        vm.rightsItem[1].isDisable = true
                                    } else if (casenum == 9) {
                                        vm.rightsItem[2].isDisable = true
                                    } else if (casenum == 10) {
                                        vm.rightsItem[3].isDisable = true
                                    } else if (casenum == 11) {
                                        vm.bottomsItem[7].isDisable = true
                                    } else if (casenum == 12) {
                                        vm.bottomsItem[6].isDisable = true
                                    } else if (casenum == 13) {
                                        vm.bottomsItem[5].isDisable = true
                                    } else if (casenum == 14) {
                                        vm.bottomsItem[4].isDisable = true
                                    } else if (casenum == 15) {
                                        vm.bottomsItem[3].isDisable = true
                                    } else if (casenum == 16) {
                                        vm.bottomsItem[2].isDisable = true
                                    } else if (casenum == 17) {
                                        vm.bottomsItem[1].isDisable = true
                                    } else if (casenum == 18) {
                                        vm.bottomsItem[0].isDisable = true
                                    } else if (casenum == 19) {
                                        vm.mid3Item[0].isDisable = true
                                    } else if (casenum == 20) {
                                        vm.mid3Item[1].isDisable = true
                                    } else if (casenum == 21) {
                                        vm.mid4Item[0].isDisable = true
                                    } else if (casenum == 22) {
                                        vm.mid4Item[1].isDisable = true
                                    } else if (casenum == 23) {
                                        vm.mid2Item[1].isDisable = true
                                    } else if (casenum == 24) {
                                        vm.mid2Item[0].isDisable = true
                                    } else if (casenum == 25) {
                                        vm.mid1Item[1].isDisable = true
                                    } else if (casenum == 26) {
                                        vm.mid1Item[0].isDisable = true
                                    } else if (casenum == 27) {
                                        vm.lefttop3Item[0].isDisable = true
                                    } else if (casenum == 28) {
                                        vm.lefttop3Item[1].isDisable = true
                                    } else if (casenum == 29) {
                                        vm.lefttop2Item[1].isDisable = true
                                    } else if (casenum == 30) {
                                        vm.lefttop2Item[0].isDisable = true
                                    } else if (casenum == 31) {
                                        vm.lefttopItem[0].isDisable = true
                                    } else if (casenum == 32) {
                                        vm.lefttopItem[1].isDisable = true
                                    } else if (casenum == 33) {
                                        vm.lefttopItem[2].isDisable = true
                                    }
                                }
                                //编号
                                let txcasenum = res.result.records[a].boothInsidenumber
                                // console.log('尽来展示展位编号',res.result.records)
                                if (txcasenum == 1) {
                                    // vm.righttopItem[0].name = res.result.records[a].boothInsidenumber
                                    vm.righttopItem[0].name = "01"
                                } else if (txcasenum == 2) {
                                    vm.righttopItem[1].name = "02"
                                } else if (txcasenum == 3) {
                                    vm.righttop2Item[1].name = "03"
                                } else if (txcasenum == 4) {
                                    vm.righttop2Item[0].name = "04"
                                } else if (txcasenum == 5) {
                                    vm.righttop3Item[0].name = "05"
                                } else if (txcasenum == 6) {
                                    vm.righttop3Item[1].name = "06"
                                } else if (txcasenum == 7) {
                                    vm.rightsItem[0].name = "07"
                                } else if (txcasenum == 8) {
                                    vm.rightsItem[1].name = "08"
                                } else if (txcasenum == 9) {
                                    vm.rightsItem[2].name = "09"
                                } else if (txcasenum == 10) {
                                    vm.rightsItem[3].name = "10"
                                } else if (txcasenum == 11) {
                                    vm.bottomsItem[7].name = "11"
                                } else if (txcasenum == 12) {
                                    vm.bottomsItem[6].name = "12"
                                } else if (txcasenum == 13) {
                                    vm.bottomsItem[5].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 14) {
                                    vm.bottomsItem[4].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 15) {
                                    vm.bottomsItem[3].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 16) {
                                    vm.bottomsItem[2].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 17) {
                                    vm.bottomsItem[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 18) {
                                    vm.bottomsItem[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 19) {
                                    vm.mid3Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 20) {
                                    vm.mid3Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 21) {
                                    vm.mid4Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 22) {
                                    vm.mid4Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 23) {
                                    vm.mid2Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 24) {
                                    vm.mid2Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 25) {
                                    vm.mid1Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 26) {
                                    vm.mid1Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 27) {
                                    vm.lefttop3Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 28) {
                                    vm.lefttop3Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 29) {
                                    vm.lefttop2Item[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 30) {
                                    vm.lefttop2Item[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 31) {
                                    vm.lefttopItem[0].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 32) {
                                    vm.lefttopItem[1].name = res.result.records[a].boothInsidenumber
                                } else if (txcasenum == 33) {
                                    vm.lefttopItem[2].name = res.result.records[a].boothInsidenumber
                                }
                            }
                        }
                        // booth/getboothbyenterpriseid
                        console.log("已选展位", this.entinfo);
                        getboothobj({ enterpriseinfoid: this.entinfo.enterpriseIds, jobfairid: this.recordData.id }).then((res) => {
                            if (res.success) {
                                this.$emit('nullInfo',true)
                                // console.log("已选展位",res.result);
                                if (res.result.id == undefined) {

                                } else {
                                    let casenum = res.result.boothInsidenumber
                                    // vm.lefttopItem[0].background = '#4FFF4F'
                                    if (casenum == 1) {
                                        vm.righttopItem[0].background = '#4FFF4F'
                                    } else if (casenum == 2) {
                                        vm.righttopItem[1].background = '#4FFF4F'
                                    } else if (casenum == 3) {
                                        vm.righttop2Item[1].background = '#4FFF4F'
                                    } else if (casenum == 4) {
                                        vm.righttop2Item[0].background = '#4FFF4F'
                                    } else if (casenum == 5) {
                                        vm.righttop3Item[0].background = '#4FFF4F'
                                    } else if (casenum == 6) {
                                        vm.righttop3Item[1].background = '#4FFF4F'
                                    } else if (casenum == 7) {
                                        vm.rightsItem[0].background = '#4FFF4F'
                                    } else if (casenum == 8) {
                                        vm.rightsItem[1].background = '#4FFF4F'
                                    } else if (casenum == 9) {
                                        vm.rightsItem[2].background = '#4FFF4F'
                                    } else if (casenum == 10) {
                                        vm.rightsItem[3].background = '#4FFF4F'
                                    } else if (casenum == 11) {
                                        vm.bottomsItem[7].background = '#4FFF4F'
                                    } else if (casenum == 12) {
                                        vm.bottomsItem[6].background = '#4FFF4F'
                                    } else if (casenum == 13) {
                                        vm.bottomsItem[5].background = '#4FFF4F'
                                    } else if (casenum == 14) {
                                        vm.bottomsItem[4].background = '#4FFF4F'
                                    } else if (casenum == 15) {
                                        vm.bottomsItem[3].background = '#4FFF4F'
                                    } else if (casenum == 16) {
                                        vm.bottomsItem[2].background = '#4FFF4F'
                                    } else if (casenum == 17) {
                                        vm.bottomsItem[1].background = '#4FFF4F'
                                    } else if (casenum == 18) {
                                        vm.bottomsItem[0].background = '#4FFF4F'
                                    } else if (casenum == 19) {
                                        vm.mid3Item[0].background = '#4FFF4F'
                                    } else if (casenum == 20) {
                                        vm.mid3Item[1].background = '#4FFF4F'
                                    } else if (casenum == 21) {
                                        vm.mid4Item[0].background = '#4FFF4F'
                                    } else if (casenum == 22) {
                                        vm.mid4Item[1].background = '#4FFF4F'
                                    } else if (casenum == 23) {
                                        vm.mid2Item[1].background = '#4FFF4F'
                                    } else if (casenum == 24) {
                                        vm.mid2Item[0].background = '#4FFF4F'
                                    } else if (casenum == 25) {
                                        vm.mid1Item[1].background = '#4FFF4F'
                                    } else if (casenum == 26) {
                                        vm.mid1Item[0].background = '#4FFF4F'
                                    } else if (casenum == 27) {
                                        vm.lefttop3Item[0].background = '#4FFF4F'
                                    } else if (casenum == 28) {
                                        vm.lefttop3Item[1].background = '#4FFF4F'
                                    } else if (casenum == 29) {
                                        vm.lefttop2Item[1].background = '#4FFF4F'
                                    } else if (casenum == 30) {
                                        vm.lefttop2Item[0].background = '#4FFF4F'
                                    } else if (casenum == 31) {
                                        vm.lefttopItem[0].background = '#4FFF4F'
                                    } else if (casenum == 32) {
                                        vm.lefttopItem[1].background = '#4FFF4F'
                                    } else if (casenum == 33) {
                                        vm.lefttopItem[2].background = '#4FFF4F'
                                    }
                                }
                                // this.$message.success(res.message)
                            } else {
                                this.$message.warn(res.message)
                                this.$emit('nullInfo',false)
                            }
                        })
                    })
                })
                .catch(function (error) {
                    // this.$message.error(res.message || '上传失败');
                    // data.onError() // 返回报错
                    // console.log(error)
                })
        },
        //展位按钮点击事件
        btnClick(value) {
            var _this = this

            getBoothList({ boothInsidenumber: value, jobFairId: this.recordData.id }).then((res) => {
                if (res.success) {
                    if (res.result.records.length >= 1) {
                        console.log('选择展位', res.result.records)

                        _this.strrecord = res.result.records[0]
                        _this.boothtext.boothNumber = ''
                        _this.boothtext.boothType = ''
                        _this.boothtext.boothPosition = ''
                        _this.boothtext.validEnddate = ''
                        _this.boothtext.enterpriseName = ''
                        _this.boothtext.boothNumber = res.result.records[0].boothNumber
                        _this.boothtext.boothType = res.result.records[0].boothType
                        _this.boothtext.boothPosition = res.result.records[0].boothPosition
                        _this.boothtext.validEnddate = res.result.records[0].validEnddate

                        // chooseboothadd
                        _this.boothEntity.boothInfoId = res.result.records[0].id;
                        _this.boothEntity.jobFairId = res.result.records[0].jobFairId;
                        _this.boothEntity.examineTime = this.getNowFormatDate();
                        _this.boothEntity.examinestate = 0;
                        _this.boothEntity.updateTime = this.getNowFormatDate();
                        _this.boothEntity.enterpriseInfoId = this.entinfo.enterpriseIds;
                        _this.boothEntity.createBy = res.result.records[0].createBy;
                        console.log('选择展位参数', _this.boothEntity)
                        chooseboothadd(_this.boothEntity).then((res) => {
                            if (res.success) {
                                this.$message.success(res.message)
                                console.log('选择展位', res)
                                this.$nextTick(() => {
                                    this.getBooth()
                                })
                            } else {
                                this.$message.warn(res.message)
                            }
                        })
                    } else {
                        console.log('展位编辑信息参数', this.queryParam.jobFairId)

                        _this.strrecord = {}

                        _this.strrecord.check = true
                        _this.strrecord.boothInsidenumber = value
                        _this.strrecord.jobFairId = _this.queryParam.jobFairId
                        _this.boothtext.boothNumber = ''
                        _this.boothtext.boothType = ''
                        _this.boothtext.boothPosition = ''
                        _this.boothtext.validEnddate = ''
                        _this.boothtext.enterpriseName = ''
                    }
                }
            })
        },
        //获取时间
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
    },
    created() {
        console.log('拿到的数据', this.recordData)
        this.getBooth()
    },
}
</script>

<style scoped>
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
    left: 700px;
    top: 510px;
    display: flex;
    position: absolute;
    z-index: 9999;
    transform: rotate(90deg);
}

.imgBox {
    position: relative;
    /* left: 259px; */
    padding-left: 21%;
    width: 100%;
}

.butclass {
    margin-right: 10px;
}
</style>