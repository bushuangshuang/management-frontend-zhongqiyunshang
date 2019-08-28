import axios from '@/libs/api.request'

// 数据管理--订单数据
export const allOrderLoadData = data => {
  return axios.request({
    url: '/order/allOrderLoadData',
    data: data,
    method: 'post'
  })
}
