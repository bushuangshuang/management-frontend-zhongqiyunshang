import axios from '@/libs/api.request'

export const imgFileUrl = 'https://eshop.s3.cn-north-1.jcloudcs.com/'

export const upLoadFile = data => {
  return axios.request({
    url: '/common/upload',
    data: data,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const uploadImg = () => {
  return axios.request({
    url: 'https://eshop.s3.cn-north-1.jcloudcs.com/'

  })
}
export const loadDataByType = data => {
  return axios.request({
    url: '/websiteData/loadDataByType',
    data: data,
    method: 'post'
  })
}
export const getVerifyCode = data => {
  return axios.request({
    url: '/user/getVerifyCode',
    data: data,
    method: 'post'
  })
}
export const registerSubmit = data => {
  return axios.request({
    url: '/user/register',
    data: data,
    method: 'post'
  })
}
export const chooseRole = () => {
  return axios.request({
    url: '/user/chooseRole',
    method: 'post'
  })
}
// 产品大类下拉
export const getBrandSelect = () => {
  return axios.request({
    url: '/mainClasses/getBrandSelect',
    method: 'post'
  })
}
// 产品车系下拉
export const getClassesSelect = data => {
  return axios.request({
    url: '/mainClasses/getClassesSelect',
    data: data,
    method: 'post'
  })
}
// 用户注册
export const userRegister = data => {
  return axios.request({
    url: '/user/userRegister',
    data: data,
    method: 'post'
  })
}
// 查询用户基本信息
export const getUserInfo = data => {
  return axios.request({
    url: '/user/getUserInfo',
    data: data,
    method: 'post'
  })
}
// 修改密码
export const forgetPwd = data => {
  return axios.request({
    url: '/user/forgetPwd',
    data: data,
    method: 'post'
  })
}
// 新增企业信息2.0
export const savePartnerInfo = data => {
  return axios.request({
    url: '/partner/savePartnerInfo',
    data: data,
    method: 'post'
  })
}
// 关联已有企业
export const userPartner = data => {
  return axios.request({
    url: '/user/userPartner',
    data: data,
    method: 'post'
  })
}
// 品牌、车系停用不能新增产品
export const checkActiveByClasses = data => {
  return axios.request({
    url: '/mainClasses/checkActiveByClasses',
    data: data,
    method: 'post'
  })
}
