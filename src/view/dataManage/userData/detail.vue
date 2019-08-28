<template>
  <div class="dataSDetail">
    <Row>
      <Col span="11">
      <Card shadow class="heightBorder">
        <p slot="title">人员基本信息</p>
      </Card>
      </Col>
      <Col span="11" offset="1">
      <Card shadow class="heightBorder">
        <p slot="title">车辆用户信息</p>
      </Card>
      </Col>
    </Row>
    <Row class="averageStyleTop">
      <Col>
      <Card>
        <p slot="title">保养、维修、保险、违章、贷款</p>
      </Card>
      </Col>
    </Row>
    <Button style="margin-top:20px;" type="primary" @click="toBack">返回</Button>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { orderDetails } from '@/api/partner/saleManage'
export default {
  name: 'order-detail',
  components: {
    CustomForm, CustomTable
  },
  data () {
    return {
      id: localStorage.getItem('orderDetailId') || '',
      dataDetail: {},
      orderLogs: [],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created () {
    // this.getDateById()
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true // B 跳转到 A 时，让 A 缓存，即不刷新
    next()
  },
  methods: {
    getDateById () {
      if (this.id === undefined || this.id === null || this.id === '') {
        this.$Message.info('订单编号为空')
        return
      }
      let data = {
        id: this.id
      }
      orderDetails(data).then(res => {
        if (res.data.code === '200') {
          this.orderBasic.orderFlowNo = res.data.info.orderInfo.orderFlowNo // 订单编号
          this.orderBasic.partnerNm = res.data.info.orderInfo.brandNm // 产品名称
          this.orderBasic.seriesNm = res.data.info.orderInfo.seriesNm // 车系
          this.orderBasic.carProductStyle = res.data.info.carInfo.carProductStyle // 产品款式
          this.orderBasic.carProductVer = res.data.info.carInfo.carProductVer // 产品版本
          this.orderBasic.carProductKind = res.data.info.carInfo.carProductKind // 产品类型
          this.orderBasic.carPowerMaxKm = res.data.info.carInfo.carPowerMaxKm // 最大里程(km)
          this.orderBasic.productColor = res.data.info.orderInfo.productColor // 车辆颜色
          this.orderBasic.carProductPrice = res.data.info.carInfo.carProductPrice // 厂商指导价格
          this.orderBasic.orderMoney = res.data.info.orderInfo.orderPrice // 成交价格(万)
          this.orderBasic.orderPayStr = res.data.info.orderInfo.orderPayStr // 支付方式
          this.orderBasic.financialServicesModel = res.data.info.orderInfo.financialServicesModelId // 金融产品
          this.orderBasic.orderStatusStr = res.data.info.orderInfo.orderStatusStr// 订单状态
          this.orderUser = res.data.info.confUser
          this.orderDetail = res.data.info.carInfo
          this.tableData = res.data.info.orderLogs
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toBack () {
      this.$router.push({ name: 'userData' })
    }
  }
}
</script>

<style scoped lang="less">
  .dataSDetail{
    padding:0 10px;
    .averageStyleTop{margin-top:20px;}
    .heightBorder{height: 400px!important;border: 1px solid #e8eaec!important;}
  }
</style>
