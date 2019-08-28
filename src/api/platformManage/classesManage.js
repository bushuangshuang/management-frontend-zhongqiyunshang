import axios from '@/libs/api.request'

// 产品类别
export const mainClassesLoadData = () => {
  return axios.request({
    url: '/mainClasses/loadData',
    method: 'post'
  })
}
// 产品类别新增
export const addMainClasses = data => {
  return axios.request({
    url: '/mainClasses/add',
    data: data,
    method: 'post'
  })
}
// 产品类别修改
export const updateMainClasses = data => {
  return axios.request({
    url: '/mainClasses/update',
    data: data,
    method: 'post'
  })
}
// 产品类别启用停用
export const editActive = data => {
  return axios.request({
    url: '/mainClasses/active',
    data: data,
    method: 'post'
  })
}
// 产品类别审核
export const toSubmitVerify = data => {
  return axios.request({
    url: '/mainClasses/verify',
    data: data,
    method: 'post'
  })
}
