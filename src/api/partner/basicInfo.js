import axios from '@/libs/api.request'

// 获取企业列表
export const getPartnerList = data => {
  return axios.request({
    url: '/partner/getPartnerList',
    data: data,
    method: 'post'
  })
}
// 新增企业信息
export const addPartnerInfo = data => {
  return axios.request({
    url: '/partner/addPartnerInfo',
    data: data,
    method: 'post'
  })
}
// 修改企业信息
export const updatePartnerInfo = data => {
  return axios.request({
    url: '/partner/updatePartnerInfo',
    data: data,
    method: 'post'
  })
}
// 停用启用
export const setIsActive = data => {
  return axios.request({
    url: '/partner/setIsActive',
    data: data,
    method: 'post'
  })
}
// 组织信息修改历史
export const getPartnerHistoryInfo = data => {
  return axios.request({
    url: '/partner/getPartnerHistoryInfo',
    data: data,
    method: 'post'
  })
}
// 企业审核
export const updatePartnerStatus = data => {
  return axios.request({
    url: '/partner/updatePartnerStatus',
    data: data,
    method: 'post'
  })
}

// 获取用户列表
export const getUserList = data => {
  return axios.request({
    url: '/user/getUserList',
    data: data,
    method: 'post'
  })
}
// 修改用户信息
export const updateUserInfo = data => {
  return axios.request({
    url: '/user/updateUserInfo',
    data: data,
    method: 'post'
  })
}
// 用户停用启用
export const setUserIsActive = data => {
  return axios.request({
    url: '/user/setIsActive',
    data: data,
    method: 'post'
  })
}
// 普通用户审核
export const verifyUser = data => {
  return axios.request({
    url: '/user/verifyUser',
    data: data,
    method: 'post'
  })
}
// 管理员审核
export const verifyAdminStatus = data => {
  return axios.request({
    url: '/user/verifyAdminStatus',
    data: data,
    method: 'post'
  })
}
// 用户信息修改历史
export const getUserHistoryInfo = data => {
  return axios.request({
    url: '/user/getUserHistoryInfo',
    data: data,
    method: 'post'
  })
}
