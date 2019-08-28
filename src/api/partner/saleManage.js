import axios from '@/libs/api.request'

// 查询订单池管理分页列表信息
export const orderPoolLoadData = data => {
  return axios.request({
    url: '/order/orderPoolLoadData',
    data: data,
    method: 'post'
  })
}
// 业务员认领订单
export const claimOrder = data => {
  return axios.request({
    url: '/order/claimOrder',
    data: data,
    method: 'post'
  })
}

// 查询订单管理分页列表信息
export const orderMgtLoadData = data => {
  return axios.request({
    url: '/order/ordermgtLoadData',
    data: data,
    method: 'post'
  })
}

// 查询我的订单分页列表信息
export const myOrderLoadData = data => {
  return axios.request({
    url: '/order/myOrderLoadData',
    data: data,
    method: 'post'
  })
}
// 审核订单
export const confirmOfOrder = data => {
  return axios.request({
    url: '/order/confirmOfOrder',
    data: data,
    method: 'post'
  })
}
// 服务商验车
export const sellerValidateCar = data => {
  return axios.request({
    url: '/order/sellerValidateCar',
    data: data,
    method: 'post'
  })
}
// 确认已支付
export const confirmOfpaid = data => {
  return axios.request({
    url: '/order/confirmOfpaid',
    data: data,
    method: 'post'
  })
}
// 上传数据
export const sellerUploadData = data => {
  return axios.request({
    url: '/order/sellerUploadData',
    data: data,
    method: 'post'
  })
}
// 确认退款
export const confirmRefund = data => {
  return axios.request({
    url: '/order/confirmRefund',
    data: data,
    method: 'post'
  })
}

// 订单详情
export const orderDetails = data => {
  return axios.request({
    url: '/order/orderDetails',
    data: data,
    method: 'post'
  })
}
// 服务商主动退款
export const sellerMakeRefund = data => {
  return axios.request({
    url: '/order/sellerMakeRefund',
    data: data,
    method: 'post'
  })
}
// 财务管理列表
export const financialOrderLoadData = data => {
  return axios.request({
    url: '/order/financialOrderLoadData',
    data: data,
    method: 'post'
  })
}
// 财务管理退款完成
export const RefundedCompletion = data => {
  return axios.request({
    url: '/order/RefundedCompletion',
    data: data,
    method: 'post'
  })
}
