<template>
  <div>
    <Row>
      <Col span="15">
      <Card>
        <p slot="title">订单基本信息</p>
        <custom-form
          :isInline="true"
          :showFooter="false"
          :labelWidth="110"
          :infoForm="orderBasic"
          :FormItemDate="orderBasicData"
        ></custom-form>
      </Card>
      </Col>
      <Col span="8" offset="1">
      <Card>
        <p slot="title">购买用户信息</p>
        <custom-form
          :isInline="true"
          :showFooter="false"
          :labelWidth="80"
          :infoForm="orderUser"
          :FormItemDate="orderUserData"
        ></custom-form>
      </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;">
      <Col>
      <Card>
        <p slot="title">车辆信息</p>
        <custom-form
          :isInline="true"
          :showFooter="false"
          :labelWidth="180"
          :infoForm="orderDetail"
          :FormItemDate="orderDetailData"
        ></custom-form>
      </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;">
      <Col>
      <Card>
        <p slot="title">历史信息</p>
        <custom-table
          :showQuery="false"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :showPage="false"
        ></custom-table>
      </Card>
      </Col>
    </Row>
    <Row style="margin-top:20px;" v-if="tableDataRF.length!==0">
      <Col>
      <Card>
        <p slot="title">退款信息</p>
        <Table border :columns="columnsRF" :row-class-name="setClassName" :data="tableDataRF"></Table>
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
import TableExpandTree from '@/components/table_expand_tree'
export default {
  name: 'order-detail',
  components: {
    CustomForm, CustomTable
  },
  data () {
    return {
      id: localStorage.getItem('orderDataId') || '',
      dataDetail: {},
      orderBasic: {
        orderFlowNo: '', // 订单编号
        partnerNm: '', // 产品名称
        seriesNm: '', // 车系
        carProductStyle: '', // 产品款式
        carProductVer: '', // 产品版本
        carProductKind: '', // 产品类型
        carPowerMaxKm: '', // 最大里程(km)
        productColor: '', // 车辆颜色
        carProductPrice: '', // 厂商指导价格
        orderMoney: '', // 成交价格(万)
        orderPayStr: '', // 支付方式
        financialServicesModel: '', // 金融产品
        orderStatusStr: '' // 订单状态
      },
      orderUser: {
        realName: '',
        username: '',
        sex: '',
        email: '',
        idCardType: '',
        idCard: '',
        address: ''
      },
      orderDetail: {
        carPowerSvolume: '', // 排气量[L]
        carPowerKw: '', // 最大功率[kW]
        carPowerMaxPs: '', // 最大马力[Ps]
        carPowerMaxRpm: '', // 最大功率转速[rpm]
        carPowerMaxNm: '', // 最大扭矩[N.m]
        carPowerMaxNmRpm: '', // 最大扭矩转速[rpm]
        carPowerCylinder: '', // 缸体形式
        carPowerCpum: '', // 气缸数[缸]
        carPowerIa: '', // 进气形式
        carPowerOilType: '', // 供油方式
        carPowerOilNum: '', // 燃油标号
        carPowerStart: '', // 发动机启停
        carPowerT: '', // 变速箱类型
        carPowerTnum: '', // 挡位个数
        carPowerMaxSpeed: '', // 最高车速[km/h]
        carPowerAccs: '', // 0-100km/h加速时间[s]
        carPowerOilBee: '', // 混合工况油耗[L/100km]
        carPowerEp: '', // 环保标准
        carPowerZkw: '', // 电动机总功率[kW]
        carPowerZnm: '', // 电动机总扭矩[N.m]
        carPowerHemkw: '', // 前电动机最大功率[kW]
        carPowerHemnm: '', // 前电动机最大扭矩[N.m]
        carPowerBemkw: '', // 后电动机最大功率[kW]
        carPowerBemnm: '', // 后电动机最大扭矩[N.m]
        carPowerBatkwh: '', // 电池容量[kwh]
        carPowerBatTime: '', // 电池充电时间
        carPowerBatBee: '', // 耗电量[kwh/100km]
        carPowerMaxKm: ''// 最大续航里程[km]
      },
      orderLogs: [],
      orderBasicData: [
        {
          type: 'label',
          prop: 'orderFlowNo',
          label: '订单编号',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'partnerNm',
          label: '产品名称',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'seriesNm',
          label: '车系',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carProductStyle',
          label: '产品款式',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carProductVer',
          label: '产品版本',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carProductKind',
          label: '产品类型',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerMaxKm',
          label: '最大里程(km)',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'productColor',
          label: '车辆颜色',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carProductPrice',
          label: '厂商指导价格(万)',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'orderMoney',
          label: '成交价格(万)',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'orderPayStr',
          label: '支付方式',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'financialServicesModel',
          label: '金融产品',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'orderStatusStr',
          label: '订单状态',
          isUpdate: false,
          width: '190px'
        }
      ],
      orderUserData: [
        {
          type: 'label',
          prop: 'realName',
          label: '姓名',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'username',
          label: '电话号码',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'sex',
          label: '性别',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'email',
          label: '邮箱',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'idCardType',
          label: '证件类型',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'idCard',
          label: '证件号码',
          isUpdate: false,
          width: '150px'
        },
        {
          type: 'label',
          prop: 'address',
          label: '地址',
          isUpdate: false,
          width: '150px'
        }
      ],
      orderDetailData: [
        {
          type: 'label',
          prop: 'carPowerMaxKm',
          label: '最大续航里程[km]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerBatBee',
          label: '耗电量[kwh/100km]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerBatTime',
          label: '电池充电时间',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerBatkwh',
          label: '电池容量[kwh]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerSvolume',
          label: '排气量[L]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerKw',
          label: '最大功率[kW]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerMaxPs',
          label: '最大马力[Ps]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerMaxRpm',
          label: '最大功率转速[rpm]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerCylinder',
          label: '缸体形式',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerCpum',
          label: '气缸数[缸]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerIa',
          label: '进气形式',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerOilType',
          label: '供油方式',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerT',
          label: '变速箱类型',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerTnum',
          label: '挡位个数',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerMaxSpeed',
          label: '最高车速[km/h]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerAccs',
          label: '0-100km/h加速时间[s]',
          isUpdate: false,
          width: '190px'
        },
        {
          type: 'label',
          prop: 'carPowerOilBee',
          label: '混合工况油耗[L/100km]',
          isUpdate: false,
          width: '190px'
        }
      ],
      tableColumns: [
        {
          title: '订单号',
          key: 'orderFlowNo',
          align: 'center'
        },
        {
          title: '操作前订单状态',
          key: 'beforeOrderStatusStr',
          align: 'center'
        },
        {
          title: '操作后订单状态',
          key: 'afterOrderStatusStr',
          align: 'center'
        },
        /* {
            title: '下一状态节点',
            key: 'nextOrderStatus',
            align: 'center'
          }, */
        {
          title: '创建时间',
          key: 'createDate',
          align: 'center'
        },
        {
          title: '最后更新流水',
          key: 'lastUpdAcct',
          align: 'center'
        },
        {
          title: '最后更新时间',
          key: 'lastUpdTime',
          align: 'center'
        },
        {
          title: '备注',
          key: 'note',
          align: 'center'
        }
      ],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      tableDataRF: [],
      columnsRF: [
        {
          type: 'expand',
          width: 20,
          render: (h, params) => {
            return h(TableExpandTree, {
              style: {
                padding: 0
              },
              props: {
                rowExpand: params.row,
                nameExpand: 'orderFlowNo',
                isHeader: true,
                tableColumnsExpand: [
                  {
                    title: ' ', key: 'orderFlowNo', align: 'center', width: 20
                  },
                  {
                    title: '退款单号', key: 'refundFlowNo', align: 'center', width: 175
                  },
                  {
                    title: '退款金额(元)', key: 'refundAmount', align: 'center', width: 175
                  },
                  {
                    title: '退款日期', key: 'refundCreateDate', align: 'center'
                  },
                  {
                    title: '退款状态', key: 'refundStatus', align: 'center'
                  },
                  {
                    title: '退款人', key: 'refundLastUpdAcct', align: 'center'
                  },
                  {
                    title: '退款响应信息', key: 'refundResponseMsg', align: 'center'
                  }
                ]
              }
            })
          }
        },
        {
          title: '订单号', key: 'orderFlowNo', align: 'center', width: 175
        },
        {
          title: '支付单号', key: 'payFlowNo', align: 'center', width: 175
        },
        {
          title: '支付金额(元)', key: 'payAmount', align: 'center'
        },
        {
          title: '支付方式', key: 'type', align: 'center'
        },
        {
          title: '支付状态', key: 'payStatus', align: 'center'
        },
        {
          title: '支付日期', key: 'createDate', align: 'center'
        },
        {
          title: '已退金额(元)', key: 'countRefundAmount', align: 'center'
        }
      ]
    }
  },
  created () {
    this.getDateById()
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
          this.tableDataRF = res.data.info.paymentDetailsList
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toBack () {
      this.$router.push({ name: 'orderData' })
    },
    setClassName (row, index) {
      return (row.refundDetailsList === undefined || row.refundDetailsList.length === 0) ? 'tdNoExpend' : ''
    }
  }
}
</script>

<style scoped type="less">
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
</style>
