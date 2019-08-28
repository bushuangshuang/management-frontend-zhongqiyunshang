import axios from '@/libs/api.request'

// 产品管理列表
export const getSaleRangeProductList = data => {
  return axios.request({
    url: '/saleRange/getProductList',
    data: data,
    method: 'post'
  })
}
// 绑定
export const getBoundToPartner = data => {
  return axios.request({
    url: '/saleRange/getBoundToPartner',
    data: data,
    method: 'post'
  })
}
// 解除绑定
export const removeBoundToPartner = data => {
  return axios.request({
    url: '/saleRange/removeBoundToPartner',
    data: data,
    method: 'post'
  })
}
// 销售范围审核
export const setVerifyStatus = data => {
  return axios.request({
    url: '/saleRange/setVerifyStatus',
    data: data,
    method: 'post'
  })
}
// 销售范围审核列表
export const getSaleRangeList = data => {
  return axios.request({
    url: '/saleRange/getSaleRangeList',
    data: data,
    method: 'post'
  })
}
