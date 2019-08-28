import axios from '@/libs/api.request'

// 获取金融产品列表
export const getFinanceList = data => {
  return axios.request({
    url: '/finance/loadData',
    data: data,
    method: 'post'
  })
}
// 新增金融产品
export const addFinanceProduct = data => {
  return axios.request({
    url: '/finance/add',
    data: data,
    method: 'post'
  })
}
// 修改金融产品
export const updateFinanceProduct = data => {
  return axios.request({
    url: '/finance/update',
    data: data,
    method: 'post'
  })
}
// 删除金融产品
export const deleteFinanceProduct = data => {
  return axios.request({
    url: '/finance/delete',
    data: data,
    method: 'post'
  })
}

// 添加期限及利率
export const addFinanceTerm = data => {
  return axios.request({
    url: '/finance/addFinanceTerm',
    data: data,
    method: 'post'
  })
}
// 编辑期限及利率
export const updateFinanceTerm = data => {
  return axios.request({
    url: '/finance/updateFinanceTerm',
    data: data,
    method: 'post'
  })
}
// 删除期限及利率
export const deleteFinanceTerm = data => {
  return axios.request({
    url: '/finance/deleteFinanceTerm',
    data: data,
    method: 'post'
  })
}
// 金融产品绑定carProductCd
export const bindingProduct = data => {
  return axios.request({
    url: '/finance/binding',
    data: data,
    method: 'post'
  })
}
// 金融产品绑定产品列表
export const financeCarloadData = data => {
  return axios.request({
    url: '/finance/financeCarloadData',
    data: data,
    method: 'post'
  })
}
// 取消金融产品绑定产品列表
export const cancelBinding = data => {
  return axios.request({
    url: '/finance/cancelBinding',
    data: data,
    method: 'post'
  })
}
// 金融产品审核
export const toSubmitVerify = data => {
  return axios.request({
    url: '/finance/verify',
    data: data,
    method: 'post'
  })
}
