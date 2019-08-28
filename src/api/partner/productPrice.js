import axios from '@/libs/api.request'

// 产品管理列表
export const getProductList = data => {
  return axios.request({
    url: '/product/getProductList',
    data: data,
    method: 'post'
  })
}
// 添加产品
export const addOrUpdateProduct = data => {
  return axios.request({
    url: '/product/addOrUpdateProduct',
    data: data,
    method: 'post'
  })
}
// 修改产品回显信息
export const getCarDetailPage = data => {
  return axios.request({
    url: '/product/getCarDetailPage',
    data: data,
    method: 'post'
  })
}
// 提交审核
export const submitDraft = data => {
  return axios.request({
    url: '/product/submitDraft',
    data: data,
    method: 'post'
  })
}
// 审核
export const verifyProduct = data => {
  return axios.request({
    url: '/product/verifyProduct',
    data: data,
    method: 'post'
  })
}
// 删除
export const deleteProduct = data => {
  return axios.request({
    url: '/product/deleteProduct',
    data: data,
    method: 'post'
  })
}
// 上下线
export const setOnlineStatus = data => {
  return axios.request({
    url: '/product/setOnlineStatus',
    data: data,
    method: 'post'
  })
}
// 产品名称下拉
export const getAllCarType = () => {
  return axios.request({
    url: '/product/getAllCarType',
    method: 'post'
  })
}

// 价格管理列表
export const getPriceList = data => {
  return axios.request({
    url: '/price/getPriceList',
    data: data,
    method: 'post'
  })
}
// 价格新增
export const addOrUpdateCarPrice = data => {
  return axios.request({
    url: '/price/addOrUpdateCarPrice',
    data: data,
    method: 'post'
  })
}
// 选择产品大类、车系（车系id）获取产品名称
export const getCarType = data => {
  return axios.request({
    url: '/price/getCarType',
    data: data,
    method: 'post'
  })
}
// 选择产品大类、车系、产品名称、获取产品的款式
export const getCarProductStyle = data => {
  return axios.request({
    url: '/price/getCarProductStyle',
    data: data,
    method: 'post'
  })
}
// 择产品大类、车系、产品名称、产品的款式 获取续航里程
export const getDuration = data => {
  return axios.request({
    url: '/price/getDuration',
    data: data,
    method: 'post'
  })
}
// 择产品大类、车系、产品名称、产品的款式 获取产品版本
export const getCarVersionSelect = data => {
  return axios.request({
    url: '/product/getCarVersionSelect',
    data: data,
    method: 'post'
  })
}
// 提交审核
export const submitPriceDraft = data => {
  return axios.request({
    url: '/price/submitPriceDraft',
    data: data,
    method: 'post'
  })
}
// 审核
export const verifyPrice = data => {
  return axios.request({
    url: '/price/verifyPrice',
    data: data,
    method: 'post'
  })
}
// 修改价格
export const modifyPrice = data => {
  return axios.request({
    url: '/price/modifyPrice',
    data: data,
    method: 'post'
  })
}
// 通过carProductCd获取colorList
export const colorList = data => {
  return axios.request({
    url: '/product/getColorList',
    data: data,
    method: 'post'
  })
}
// 给产品新增和编辑增加颜色
export const addOrModifyColor = data => {
  return axios.request({
    url: '/product/addOrModifyColor',
    data: data,
    method: 'post'
  })
}
// 通过carProductCd获取颜色下拉
export const colorDropdown = data => {
  return axios.request({
    url: '/price/colorDropdown',
    data: data,
    method: 'post'
  })
}
// 颜色停用启用
export const setColorStatus = data => {
  return axios.request({
    url: '/product/setColorStatus',
    data: data,
    method: 'post'
  })
}
