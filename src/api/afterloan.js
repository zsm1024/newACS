/* eslint-disable */
import request from '@/utils/credit'
// 【保险】
//  获取保险列表
export function insuList(params) {
  const data = params
  return request({
    url: 'S100013/insurance/getlist',
    method: 'post',
    data
  })
};
//  获取案件列表
export function getcontract(params) {
  const data = params
  return request({
    url: 'S100013/insurance/getcontract',
    method: 'post',
    data
  })
};
//保险模糊搜索
export function matching(params) {
  const data = params
  return request({
    url: 'S100013/insurance/matching',
    method: 'post',
    data
  })
}
// 删除
export function del(params) {
  return request({
    url: 'S100013/insurance/del?id=' + params,
    method: 'post',
  })
}
//查看保险申请信息
export function look(params) {
  return request({
    url: 'S100013/insurance/look?id=' + params,
    method: 'post',
  })
}
//获取留言列表
export function getlist(params) {
  return request({
    url: 'S100013/insurancemsg/getlist?id=' + params,
    method: 'post',
  })
}
//回复留言
export function save(params) {
  const data = params
  return request({
    url: 'S100013/insurancemsg/save',
    method: 'post',
    data
  })
}
//新建保险申请获取数据
export function addinsu(params) {
  return request({
    url: 'S100013/insurance/new?id=' + params,
    method: 'post',
  })
}
//提交保险申请
export function submitinsu(params) {
  const data = params
  return request({
    url: 'S100013/insurance/submit',
    method: 'post',
    data
  })
}
//暂存保险申请
export function saveinsu(params) {
  const data = params
  return request({
    url: 'S100013/insurance/save',
    method: 'post',
    data
  })
}
//编辑保险申请
export function editinsu(params) {
  return request({
    url: 'S100013/insurance/edit?id=' + params,
    method: 'post',
  })
}
//解抵押列表
export function mortgetlist(params) {
  const data = params
  return request({
    url: 'S100013/mortgage/getlist',
    method: 'post',
    data
  })
}
//解抵押模糊搜索
export function mortmatching(params) {
  const data = params
  return request({
    url: 'S100013/mortgage/matching',
    method: 'post',
    data
  })
}
//解抵详情
export function mortget(params) {
  return request({
    url: 'S100013/mortgage/get?id=' + params,
    method: 'post'
  })
}
//进行解抵
export function mortsureinfo(params) {
  return request({
    url: 'S100013/mortgage/sure?id=' + params,
    method: 'post'
  })
}
// 延期管理 start
// 延期申请列表
export function getDelayList(params) {
  const data = params
  return request({
    url: 'S100013/delay/getlist',
    //url: 'delay/getlist',
    method: 'post',
    data
  })
}
// 新建延期申请
export function createDelay(camainno) {
  return request({
    url: 'S100013/delay/new?camainno=' + camainno,
    //url: 'delay/new/' + camainno,
    method: 'post'
  })
}
// 查看延期申请
export function delayDetail(id) {
  return request({
    url: 'S100013/delay/look?id=' + id,
    //url: 'delay/look/' + id,
    method: 'post'
  })
}
// 保存延期申请
export function saveDelay(params) {
  const data = params
  return request({
    url: 'S100013/delay/submit',
    //url: 'delay/submit',
    method: 'post',
    data
  })
}
// 删除延期申请
export function delDelay(id) {
  return request({
    url: 'S100013/delay/delete?id=' + id,
    //url: 'delay/delete/' + id,
    method: 'post'
  })
}
// 延期管理 end

// 文档管理 start
// 归档列表
export function getDocList(params) {
  const data = params
  return request({
    url: 'S100013/doc/getlist',
    //url: 'doc/getlist',
    method: 'post',
    data
  })
}
// 获取最新运单
export function getLastPost() {
  return request({
    url: 'S100013/post/lastpost',
    //url: 'post/lastpost',
    method: 'post',
  })
}
// 获取运单信息
export function getPostInfo(id) {
  return request({
    url: 'S100013/post/edit?id=' + id,
    //url: 'post/edit/' + id,
    method: 'post',
  })
}
// 保存运单信息
export function savePostInfo(params) {
  const data = params
  return request({
    url: 'S100013/post/save',
    //url: 'post/save',
    method: 'post',
    data
  })
}
// 判断是否免抵押退回绿本
export function checkPostFile(params) {
  var data = params;
  return request({
    url: 'S100013/postfile/check',
    //url: 'postfile/check',
    method: 'post',
    data
  })
}
// 邮寄列表
export function getPostFileList(params) {
  var data = params;
  return request({
    url: 'S100013/postfile/getlist',
    //url: 'postfile/getlist',
    method: 'post',
    data
  })
}
// 删除单个邮寄
export function delPostFile(id) {
  return request({
    url: 'S100013/postfile/del?id=' + id,
    //url: 'postfile/del/' + id,
    method: 'post',
  })
}
// 删除邮寄列表
export function delPostFiles(dcpostid) {
  return request({
    url: 'S100013/postfile/delfiles?dcpostid=' + dcpostid,
    //url: 'postfile/delfiles/' + dcpostid,
    method: 'post',
  })
}
// 邮寄
export function savePostFiles(id) {
  return request({
    url: 'S100013/post/submit?id=' + id,
    //url: 'post/submit/' + id,
    method: 'post',
  })
}
// 新建归档信息
export function createDoc(id) {
  return request({
    url: 'S100013/doc/new?id=' + id,
    //url: 'doc/new/' + id,
    method: 'post',
  })
}
// 归档详情
export function docDetail(params) {
  var data = params;
  return request({
    url: 'S100013/doc/edit',
    //url: 'doc/edit',
    method: 'post',
    data
  })
}
// 保存归档
export function saveDoc(params) {
  const data = params
  return request({
    url: 'S100013/doc/submit',
    //url: 'doc/submit',
    method: 'post',
    data
  })
}
// 文档管理 end