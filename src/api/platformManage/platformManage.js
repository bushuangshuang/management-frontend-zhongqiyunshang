import axios from '@/libs/api.request'

// 产品类别
export const mainClassesLoadData = data => {
  return axios.request({
    url: '/mainClasses/loadData',
    data: data,
    method: 'post'
  })
}
