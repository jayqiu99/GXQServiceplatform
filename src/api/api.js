import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import Vue from 'vue'
import {UI_CACHE_DB_DICT_DATA } from "@/store/mutation-types"

//角色管理
const addRole = (params)=>postAction("/sys/role/add",params);
const editRole = (params)=>putAction("/sys/role/edit",params);
const checkRoleCode = (params)=>getAction("/sys/role/checkRoleCode",params);
const queryall = (params)=>getAction("/sys/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/sys/user/add",params);
const editUser = (params)=>putAction("/sys/user/edit",params);
const queryUserRole = (params)=>getAction("/sys/user/queryUserRole",params);
const getUserList = (params)=>getAction("/sys/user/list",params);
const frozenBatch = (params)=>putAction("/sys/user/frozenBatch",params);
//验证用户是否存在
const checkOnlyUser = (params)=>getAction("/sys/user/checkOnlyUser",params);
//改变密码
const changePassword = (params)=>putAction("/sys/user/changePassword",params);

//权限管理
const addPermission= (params)=>postAction("/sys/permission/add",params);
const editPermission= (params)=>putAction("/sys/permission/edit",params);
const getPermissionList = (params)=>getAction("/sys/permission/list",params);
/*update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params)=>getAction("/sys/permission/getSystemMenuList",params);
const getSystemSubmenu = (params)=>getAction("/sys/permission/getSystemSubmenu",params);
const getSystemSubmenuBatch = (params) => getAction('/sys/permission/getSystemSubmenuBatch', params)

const queryTreeList = (params)=>getAction("/sys/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/sys/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/sys/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/sys/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/sys/permission/saveRolePermission",params);
const queryPermissionsByUser = (params)=>getAction("/sys/permission/getUserPermissionByToken",params);
const loadAllRoleIds = (params)=>getAction("/sys/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/sys/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/sys/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/sys/sysDepart/queryTreeList",params);
const queryIdTree = (params)=>getAction("/sys/sysDepart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/sys/sysDepart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/sys/sysDepart/searchBy",params);
const deleteByDepartId   = (params)=>deleteAction("/sys/sysDepart/delete",params);

//二级部门管理
const queryDepartPermission = (params)=>getAction("/sys/permission/queryDepartPermission",params);
const saveDepartPermission = (params)=>postAction("/sys/permission/saveDepartPermission",params);
const queryTreeListForDeptRole = (params)=>getAction("/sys/sysDepartPermission/queryTreeListForDeptRole",params);
const queryDeptRolePermission = (params)=>getAction("/sys/sysDepartPermission/queryDeptRolePermission",params);
const saveDeptRolePermission = (params)=>postAction("/sys/sysDepartPermission/saveDeptRolePermission",params);
const queryMyDepartTreeList = (params)=>getAction("/sys/sysDepart/queryMyDeptTreeList",params);

//日志管理
//const getLogList = (params)=>getAction("/sys/log/list",params);
const deleteLog = (params)=>deleteAction("/sys/log/delete",params);
const deleteLogList = (params)=>deleteAction("/sys/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/sys/dict/add",params);
const editDict = (params)=>putAction("/sys/dict/edit",params);
const treeList = (params)=>getAction("/sys/dict/treeList",params);
const addDictItem = (params)=>postAction("/sys/dictItem/add",params);
const editDictItem = (params)=>putAction("/sys/dictItem/edit",params);

//基本信息管理
const areaList = (params)=>getAction("/base/list?type=area",params);// 《地区查询》
const ageList = (params)=>getAction("/base/list?type=Age",params);// 《地区查询》
const addBasic = (params)=>postAction("/base/add",params);// 《基本信息新增》
const delArea = (params)=>getAction("/base/delete",params);// 《地区删除》
const natureList = (params)=>getAction("/base/list?type=nature",params);// 《企业性质查询》
const scaleList = (params)=>getAction("/base/list?type=scale",params);// 《企业规模查询》
const industryList = (params)=>getAction("/base/list?type=industry",params);// 《行业信息查询》
const editBasic = (params)=>getAction("/base/editById",params);// 《地区修改》
const editinvitation = (params)=>postAction("/hall/jobfair/editById",params);// 《邀请函模板修改》
const templatedome = (params)=>postAction("/base/template/editById",params);// 《模板添加》
const templatedomeadd = (params)=>postAction("/base/template/add",params);// 《模板添加》
const ipadisdamage = (params)=>getAction("/base/ipadregister/isdamage",params);//ipad
//企业启用岗位
const entpsottoeditenable = (params)=>getAction("/hall/jobfairposition/enable",params);//启用-岗位
//岗位管理
const psoteditenable = (params)=>getAction("/hall/position/enable",params);//启用-岗位
const delectpostd= (params)=>getAction("/hall/position/deletePostReleaseTemporary",params);// 删除
const addPostapprovedList = (params)=>postAction("/hall/position/addPostReleaseTemporary",params);// 《企业审核通过查询》
const postapprovedList = (params)=>getAction("/hall/position/queryexaminejob?examinestate=1",params);// 《企业审核通过查询》
const enTemporaryList = (params)=>getAction("/hall/position/enterprisePostReleaseTemporaryList?examinestate=2",params);// 《待审核岗位查询》
const enTemporaryList3 = (params)=>getAction("/hall/position/enterprisePostReleaseTemporaryList",params);// 《待审核岗位查询》
const enTemporaryList2 = (params)=>getAction("/hall/position/enterprisePostReleaseTemporaryList?examinestate=0",params);// 《待审核岗位查询》
const audpostList = (params)=>getAction("/hall/position/enterprisePostReleaseTemporaryList?examinestate=-1",params);// 《待审核岗位查询》
const isjudgejobFair = (params)=>getAction("/hall/jobfair/judgejobFair",params);
//报名企业选择企业
const notselected = (params)=>getAction("/hall/entryenterprise/querynoentryenterpriselist",params);//未选择企业
const rigselected = (params)=>getAction("/hall/entryenterprise/queryentryenterpriselist",params);//未选择企业
//企业简历查看
const entcandiateList = (params)=>getAction("/app/interview/receivelist",params);
//企业信息管理
const addenterprise=(params)=>postAction("/hall/enterprise/addEnterpriseTemporary",params);
const dbaddenterprise=(params)=>postAction("/hall/enterprise/add",params);
const enterpriselist = (params)=>getAction("/hall/enterprise/list",params);//企业数据查询
const editenterprise = (params)=>postAction("/hall/enterprise/editById",params);//编辑企业信息
const editresetenterprise = (params)=>getAction("/hall/enterprise/resetpsw",params);//重置企业密码
const editenable = (params)=>getAction("/hall/enterprise/enable",params);//启用-企业
const editexamine = (params)=>getAction("/hall/enterprise/examine",params);//审核-企业
const editexamine2 = (params)=>getAction("/hall/enterprise/examine",params);//审核-企业
const approvedList = (params)=>getAction("/hall/enterprise/list?examinestate=1",params);// 《企业审核通过查询》 
const entapprovedList = (params)=>getAction("/hall/enterprise/list",params);// 《企业审核通过查询》//已去了examinestate 
const auditList = (params)=>getAction("/hall/enterprise/list?examinestate=-1",params);// 《企业审核未通过查询》
const toberetList = (params)=>getAction("hall/enterprise/EnterpriseTemporaryList",params);// 《企业待审核查询》
//企业报名招聘会
const entbmjobfairList = (params)=>getAction("/hall/entryenterprise/queryjobfairEntryEnterpriseJob",params);// 《招聘会查询》
//招聘会信息管理
const jobenterpriseList = (params)=>getAction("/hall/entryenterprise/list",params);// 《招聘会查询》
const jobfairList = (params)=>getAction("/hall/jobfair/list?isexisting=0",params);// 《招聘会查询》
const jobenablecount = (params)=>getAction("/hall/jobfair/list?enable=1",params);// 《招聘会查询》
const jobenable = (params)=>getAction("/hall/jobfair/enable",params);//启用-招聘会
const setuphall = (params)=>getAction("/hall/jobfair/setuphall",params);//设置招聘大厅()
//展位
const getqueryBoothInfoListbyenable = (params)=>getAction("/hall/booth/queryBoothInfoListbyenable",params);// 《查看已占展位》
const getBoothList = (params)=>getAction("/hall/booth/list",params);// 《展位查询》
const togetBoothList = (params)=>getAction("/hall/booth/list?pageSize=100",params);// 《展位查询》
const getEditById=(params)=>postAction("/hall/booth/editById",params);
const getboothobj=(params)=>getAction("/hall/booth/getboothbyenterpriseid",params);
const openadd=(params)=>postAction("/hall/booth/add",params);
const chooseboothadd=(params)=>postAction("/hall/booth/choosebooth",params);//企业选择展位
const closeact = (params)=>getAction("/hall/booth/close",params);// 《不公开》
const addbooth=(params)=>postAction("/hall/booth/add",params);
const cancelbooth=(params)=>getAction("/hall/booth/cancelbooth",params);
//（企业）编辑岗位信息
const getentpostjobfairList = (params)=>getAction("/hall/jobfairposition/queryexaminejob",params);//岗位查询
//简历查询

const resumeList = (params)=>getAction("/hall/curriculumvitae/list",params);//  
//招聘岗位
const getpostListout = (params)=>getAction("/hall/position/queryexaminejobenterprise?examinestate=-1",params);// 《报名企业审核查询》
const getpostList = (params)=>getAction("/hall/position/queryexaminejobenterprise?examinestate=1",params);// 《报名企业审核查询》
const getpostList2 = (params)=>getAction("/hall/position/querybigjobenterprise",params);// 《招聘会大屏企业》
const getaminejobList = (params)=>getAction("/hall/position/queryexaminejob",params);// 《报名企业审核查询》
//报名企业审核
const newgetPositionList = (params)=>getAction("/hall/jobfairposition/queryexaminejob",params);
const getPositionList = (params)=>getAction("/hall/position/list",params);// 《报名企业审核查询》
const getfabuPostList = (params)=>getAction("/hall/position/EnterprisePostReleasebyjobfair",params);// 《查询企业发布招聘会岗位含发布状态列表》
const getPositionexamine = (params)=>getAction("/hall/position/examine",params);// 《报名企业职位审核》
const enablepostapi = (params)=>getAction("/hall/position/enablepost",params);// 《企业发布招聘会岗位是否启用》
const getentryenterpriseex= (params)=>getAction("/hall/entryenterprise/examine",params);// 《报名企业审核》
const getOnekey= (params)=>getAction("/hall/position/examineall",params);// 《一键审核》
//批量邀请企业
const invitationjobfair  = (params)=>postAction("/hall/jobfair/invitation",params);
//查询企业
const getenterpriseList = (params)=>getAction("/hall/enterprise/invitationlist",params);// 
//查询企业员工
const staffList = (params)=>getAction("/app/staff/list",params);//
//文件上传A
const upload  = (params)=>postAction("/base/upload",params);
//生成二维码
const genqrcode  = (params)=>getAction("/base/generate",params);
//生成入场券
const getaddticket  = (params)=>postAction("/app/ticket/addticket",params);
//取消入场券
const getcancelticket  = (params)=>postAction("/app/ticket/cancelticket",params);
//员工修改
const poststaff  = (params)=>postAction("/app/staff/editById",params);
//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/sys/dict/getDictItems/${code}`,params);
//从缓存中获取字典配置
function getDictItemsFromCache(dictCode) {
  if (Vue.ls.get(UI_CACHE_DB_DICT_DATA) && Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]) {
    let dictItems = Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode];
    console.log("-----------getDictItemsFromCache----------dictCode="+dictCode+"---- dictItems=",dictItems)
    return dictItems;
  }
}

//系统通告
const doReleaseData = (params)=>getAction("/sys/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/sys/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/sys/loginfo",params);
const getVisitInfo = (params)=>getAction("/sys/visitInfo",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/sys/user/queryUserByDepId",params);

// 重复校验
const duplicateCheck = (params)=>getAction("/sys/duplicate/check",params);
// 加载分类字典
const loadCategoryData = (params)=>getAction("/sys/category/loadAllData",params);
const checkRuleByCode = (params) => getAction('/sys/checkRule/checkByCode', params)
//加载我的通告信息
const getUserNoticeInfo= (params)=>getAction("/sys/sysAnnouncementSend/getMyAnnouncementSend",params);
const getTransitURL = url => `/sys/common/transitRESTful?url=${encodeURIComponent(url)}`
// 中转HTTP请求
export const transitRESTful = {
  get: (url, parameter) => getAction(getTransitURL(url), parameter),
  post: (url, parameter) => postAction(getTransitURL(url), parameter),
  put: (url, parameter) => putAction(getTransitURL(url), parameter),
  http: (url, parameter) => httpAction(getTransitURL(url), parameter),
}

export {
  isjudgejobFair,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changePassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  duplicateCheck,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  getSystemSubmenuBatch,
  loadCategoryData,
  checkRuleByCode,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  getUserNoticeInfo,
  getDictItemsFromCache,
  areaList,
  ageList,
  addBasic,
  delArea,
  upload,
  natureList,
  scaleList,
  industryList,
  editBasic,
  editenterprise,
  editresetenterprise,
  editenable,
  psoteditenable,
  entpsottoeditenable,
  editexamine,
  editexamine2,
  approvedList,
  entapprovedList,
  entcandiateList,
  postapprovedList,
  enTemporaryList,
  enTemporaryList2,
  enTemporaryList3,
  audpostList,
  notselected,
  rigselected,
  auditList,
  toberetList,
  jobfairList,
  entbmjobfairList,
  jobenterpriseList,
  jobenablecount,
  jobenable,
  setuphall,
  getBoothList,
  togetBoothList,
  getEditById,
  getboothobj,
  openadd,
  chooseboothadd,
  getqueryBoothInfoListbyenable,
  cancelbooth,
  closeact,
  addbooth,
  addenterprise,
  dbaddenterprise,
  addPostapprovedList,
  delectpostd,
  enterpriselist,
  getPositionList,
  newgetPositionList,
  getfabuPostList,
  getaminejobList,
  resumeList,
  getentpostjobfairList,
  getpostList,
  getpostList2,
  getpostListout,
  getPositionexamine,
  enablepostapi,
  getentryenterpriseex,
  editinvitation,
  invitationjobfair,
  getenterpriseList,
  genqrcode,
  staffList,
  getaddticket,
  getcancelticket,
  poststaff,
  templatedome,
  templatedomeadd,
  getOnekey,
  ipadisdamage
}



