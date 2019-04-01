import request from '@/utils/credit'

// 订单列表
export function getOrder(params) {
  const data = params
  return request({
    url: 'S100011/order/getlist',
    method: 'post',
    data
  })
}
// 获取厂商
export function getMaker(params) {
  return request({
    url: 'S100011/order/getmaker',
    method: 'get'
  })
}
// 获取全厂商
export function getSpMaker(params) {
  return request({
    url: 'S100011/order/getspmaker?pre=' + params.pre + '&paramPre='+ params.ppre,
    method: 'get'
  })
}
// 获取品牌
export function getBrand(params) {
  return request({
    url: 'S100011/order/getbrand?makerId=' + params.makerId + '&category=' + params.category + '&brandType=' + params.brandType,
    method: 'get'
  })
}
// 获取禁用车型
export function getdisabledbrand(params) {
  const data = params
  return request({
    url: 'S100011/order/getdisabledbrand',
    method: 'post',
    data
  })
}
// 获取款式
export function getStyle(params) {
  return request({
    url: 'S100011/order/getstyle?brandid=' + params,
    method: 'get'
  })
}

// 新增订单
export function orderNew(params) {
  return request({
    url: 'S100011/order/new',
    method: 'get'
  })
}
export function orderNewType(params) {
  return request({
    url: 'S100011/order/new?category=' + params,
    method: 'get'
  })
}

// 获取申请编号
export function getApplicationNo(match) {
  return request({
    url: 'S340011/es/searchcamain?match=' + match,
    method: 'post'
  })
}

// 获取申请编号
export function getApplicationNo2(match) {
  return request({
    url: 'S340011/es/searchcacontract?match=' + match,
    method: 'post'
  })
}
// 获取销售专员

export function getSale(params) {
  const data = params
  return request({
    url: 'S100011/order/getSale',
    method: 'post',
    data
  })
}

// 获取信贷专员

export function getCredit(params) {
  const data = params
  return request({
    url: 'S100011/order/getCredit',
    method: 'post',
    data
  })
}

// 获取评估师

export function getApplist() {
  return request({
    url: 'S100011/order/getAppraiser',
    method: 'get'
  })
}

// 获取订单信息
export function orderInfo(params) {
  return request({
    url: 'S100011/order/info?id=' + params,
    method: 'get'
  })
}
// 获取图片预览
export function ordergetimage(params) {
  return request({
    url: 'S100011/order/getImage?id=' + params,
    method: 'post'
  })
}
// 获取图片预览
export function ordergetoldimage(params) {
  return request({
    url: 'S100011/order/before-signed-images?id=' + params,
    method: 'post'
  })
}
// 获取图片预览
export function ordergetBuimage(params) {
  return request({
    url: 'S100011/order/replenish-images?id=' + params,
    method: 'post'
  })
}
// 图片排序
export function ordersortimg(params) {
  const data = params
  return request({
    url: 'S100011/order/sortImage/',
    method: 'post',
    data
  })
}
// 图片删除
export function orderdelimg(params) {
  return request({
    url: 'S100011/order/delImage?randomstr=' + params,
    method: 'post'
  })
}
// 图片保存
export function orderimgsave(params) {
  const data = params
  return request({
    url: 'S100011/img/saveinfo/',
    method: 'post',
    data
  })
}
// 文档管理-图片保存
export function docimgsave(params) {
  const data = params
  return request({
    url: 'S100011/img/dcsaveinfo/',
    method: 'post',
    data
  })
}
// 删除附加贷

export function delAdditional(params) {
  const data = params
  return request({
    url: 'S100011/order/delAdditional?financialid=' + params,
    method: 'post',
    data
  })
}
// 获取附加贷

export function getAdditional(params) {
  const data = params
  return request({
    url: 'S100011/order/getAdditional',
    method: 'post',
    data
  })
}
// 更新附加贷
export function upAdditional(params) {
  const data = params
  return request({
    url: 'S100011/order/upAdditional',
    method: 'post',
    data
  })
}
// 验证附加贷
export function checkAdditional(params) {
  const data = params
  return request({
    url: 'S100011/order/checkAdditional',
    method: 'post',
    data
  })
}
// 暂存
export function orderSave(params) {
  const data = params
  return request({
    url: 'S100011/order/save',
    method: 'post',
    data
  })
}
// 暂存
export function orderSavesub(params) {
  const data = params
  return request({
    url: 'S100011/order/submit',
    method: 'post',
    data
  })
}
// 暂存
export function orderSign(params) {
  const data = params
  return request({
    url: 'S100011/order/sign',
    method: 'post',
    data
  })
}
// 暂存
export function orderSignStatus(params) {
  return request({
    url: 'S100011/order/signstatus?id=' + params,
    method: 'get'
  })
}
// 签署
export function orderCauserlist(params) {
  return request({
    url: 'S100011/Ca/GetSignUserList?cacategory=' + params.CaCategory + '&' + 'camainId=' + params.CamainId,
    method: 'get'
  })
}
// 发送验证码
export function orderSendsms(params) {
  const data = params
  return request({
    url: 'S100011/Common/SendSmsCheckCode',
    method: 'post',
    data
  })
}

// 订单复制
export function orderCopy(params) {
  const data = params
  return request({
    url: 'S100011/order/copy',
    method: 'post',
    data
  })
}

// 订单删除
export function orderDel(params) {
  const data = params
  return request({
    url: 'S100011/order/delorder',
    method: 'post',
    data
  })
}

// 删除紧急联系人
export function delurpart(params) {
  const data = params
  return request({
    url: 'S100011/order/delurgentparty',
    method: 'post',
    data
  })
}
// 删除地址
export function deladdress(params) {
  const data = params
  return request({
    url: 'S100011/order/deladdress',
    method: 'post',
    data
  })
}
// 删除共借人或者担保人
export function delparty(params) {
  const data = params
  return request({
    url: 'S100011/order/delparty',
    method: 'post',
    data
  })
}

// 获取流程审批的按钮
export function getCurrentTaskCmd(params) {
  return request({
    url: 'S100011/wf/getcurrenttaskcmd?dataid=' + params,
    method: 'get'
  })
}

// 获取修订回复按钮
export function postRevisepause(params) {
  const data = params
  return request({
    url: 'S100011/wf/revisepause',
    method: 'post',
    data
  })
}
// 附条件核准
export function postConditionalapproval(params) {
  const data = params
  return request({
    url: 'S100011/wf/conditionalapproval',
    method: 'post',
    data
  })
}

// 获取留言
export function getMsglist(params) {
  return request({
    url: 'S100011/msg/getlist?orderid=' + params,
    method: 'get'
  })
}
// 添加消息
export function postaddMsg(params) {
  const data = params
  return request({
    url: 'S100011/msg/addmsg',
    method: 'post',
    data
  })
}

// 添加打印
export function postPrintCommon(params) {
  return request({
    url: 'S100011/print/common',
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      // eslint-disable-next-line
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function postPrintTransfer(params) {
  return request({
    url: 'S100011/print/transfer',
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      // eslint-disable-next-line
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function postPrintContract(params) {
  return request({
    url: 'S100011/print/contract',
    method: 'post',
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      // eslint-disable-next-line
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function postPrintInsurance(params) {
  return request({
    url: 'S100011/Ca/InsuranceSign',
    method: 'post',
    data: params
  })
}
// 获取图片

export function getImg(params) {
  return request({
    url: 's120017/download?md5=' + params,
    method: 'get'
  })
}

// 更新ocr状态
export function postUpCardOcr(params) {
  const data = params
  return request({
    url: 'S100011/Ca/UpdateCardOcrStatus',
    method: 'post',
    data
  })
}

// 获取金融产品
export function getProductlist(params) {
  return request({
    url: 'S100011/financial/getlist?styleId=' + params.style + '&brandCode=' + params.code,
    method: 'get'
  })
}
// 二手车获取金融产品
export function getProductlistTwo(params) {
  return request({
    url: 'S100011/financial/getlist?styleId=1&category=' + params,
    method: 'get'
  })
}
// 获取金融产品
export function getfinancialInfo(params) {
  const data = params
  return request({
    url: 'S100011/financial/info',
    method: 'post',
    data
  })
}

// 获取签署文件列表
export function getCaFilesList(params) {
  return request({
    url: 'S100011/Ca/GetCaFilesList?cacategory=' + params.cacategory + '&camainId=' + params.camainId,
    method: 'get'
  })
}

// 获取签署文件列表
export function getCrediterdu(params) {
  return request({
    url: 'S100011/dealer/getCredit',
    method: 'get'
  })
}

// 获取销售总监新接口

export function getSaleDirector(params) {
  return request({
    url: 'S100011/order/getSaleDirector',
    method: 'get'
  })
}

// 资产变更
// 资产变更列表
export function getAssetList(params) {
  const data = params
  return request({
    url: 'S100011/asset/getlist',
    method: 'post',
    data
  })
}
// 详情
export function getAssetInfo(params) {
  return request({
    url: 'S100011/asset/info?camainid=' + params,
    method: 'get'
  })
}
// 详情
export function getPictureinfo(params) {
  return request({
    url: 'S100011/asset/pictureinfo?camainid=' + params,
    method: 'get'
  })
}
// 提交
export function getAssetSubmit(params) {
  const data = params
  return request({
    url: 'S100011/asset/submit',
    method: 'post',
    data
  })
}
// 暂存
export function getAssetSave(params) {
  const data = params
  return request({
    url: 'S100011/asset/Save',
    method: 'post',
    data
  })
}
// 废弃
export function getAssetGiveup(params) {
  const data = params
  return request({
    url: 'S100011/asset/giveup',
    method: 'post',
    data
  })
}

// 附加贷
export function getAssetCreateveex(params) {
  const data = params
  return request({
    url: 'S100011/asset/createveex',
    method: 'post',
    data
  })
}
// 图片存储
export function getAssetPicturesave(params) {
  const data = params
  return request({
    url: 'S100011/asset/picturesave',
    method: 'post',
    data
  })
}
// 标签系统
export function getAppTags(params) {
  const data = params
  return request({
    url: 'S100041/tag/get_app_tags',
    method: 'post',
    data
  })
}
// 图片存储
export function getAssetDelimpicture(params) {
  const data = params
  return request({
    url: 'S100011/asset/delimpicture',
    method: 'post',
    data
  })
}

// 获取资产变更
export function getOriginalinfo(params) {
  return request({
    url: 'S100011/asset/originalinfo?camainid=' + params,
    method: 'get'
  })
}

// 获取GPS派单
export function getGpsinfo(params) {
  return request({
    url: 'S100011/gps/getorderinfo?cacontractid=' + params,
    method: 'get'
  })
}
// 添加GPS派单
export function postGpsinfo(params) {
  const data = params
  return request({
    url: 'S100011/gps/addorupdate' ,
    method: 'post',
    data
  })
}
