<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :queryForm="queryForm"
        :queryFormItemData="queryFormItemData"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        @on-get-list="getList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
      ></custom-table>
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/custom-table'
import CustomForm from '@/components/custom-form'
import { loadDataByType } from '@/api/common'
import { allOrderLoadData } from '@/api/platformManage/dataManage'
export default {
  name: 'index',
  components: {
    CustomTable,
    CustomForm
  },
  data () {
    return {
      queryForm: {
        orderPay: '',
        orderStatus: ''
      },
      payOption: [],
      statusOption: [],
      tableColumns: [
        {
          title: '订单编号',
          key: 'orderFlowNo',
          width: 175,
          align: 'center'
        },
        {
          title: '产品名称',
          align: 'center',
          key: 'brandNm'
        },
        {
          title: '车系',
          key: 'seriesNm',
          align: 'center'
        },
        {
          title: '产品款式',
          key: 'carProductStyle',
          align: 'center'
        },
        {
          title: '产品版本',
          key: 'carProductVer',
          align: 'center'
        },
        {
          title: '产品类型',
          key: 'carProductKind',
          align: 'center'
        },
        {
          title: '最大里程(km)',
          key: 'carPowerMaxKm',
          width: 120,
          align: 'center'
        },
        {
          title: '车辆颜色',
          key: 'productColor',
          align: 'center'
        },
        {
          title: '厂商指导价格/成交价格(万)',
          key: 'carProductPrice',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h('div', params.row.carProductPrice + ((params.row.orderMoney === 0 || params.row.orderMoney === null) ? '' : '/' + params.row.orderMoney)
            )
          }
        },
        {
          title: '支付方式',
          key: 'orderPayStr',
          align: 'center'
        },
        {
          title: '金融产品',
          key: 'financialServicesModel',
          align: 'center'
        },
        {
          title: '订单状态',
          key: 'orderStatusStr',
          align: 'center'
        },
        {
          title: '操作',
          key: 'handle',
          width: 110,
          // fixed: 'right',
          align: 'center',
          render: (h, params) => {
            let that = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    that.toShow(params.row.id)
                  }
                }
              }, '详细信息')
            ])
          }
        }
      ],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.orderData
    }
  },
  created () {
    this.setQueryData()
    this.getList()
  },
  activated () {
    this.setQueryData()
    this.getList()
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.meta.title !== '查看') {
      from.meta.keepAlive = false
    }
    next()
  },
  methods: {
    setQueryData () {
      let data = {
        'type': 'PAYMENT_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.payOption = res.data.list
          let data = {
            'type': 'ORDER_STATUS'
          }
          loadDataByType(data).then(res => {
            if (res.data.code === '200') {
              this.statusOption = res.data.list
              let arr = [
                {
                  type: 'select',
                  prop: 'orderPay',
                  label: '支付方式',
                  selectOption: this.payOption,
                  placeholder: '请输入支付方式',
                  width: '140px'
                },
                {
                  type: 'select',
                  prop: 'orderStatus',
                  label: '订单状态',
                  placeholder: '请选择订单状态',
                  selectOption: this.statusOption,
                  width: '140px'
                }
              ]
              this.$store.commit('setOrderData', arr)
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getList () {
      let data = {
        orderPay: this.queryForm.orderPay,
        orderStatus: this.queryForm.orderStatus,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      allOrderLoadData(data).then(res => {
        if (res.data.code === '200') {
          this.tableData = res.data.page.list
          this.page.pageNumber = res.data.page.pageNumber
          this.page.pageSize = res.data.page.pageSize
          this.page.total = res.data.page.totalRow
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handlePage ({ pageNumber }) {
      this.page.pageNumber = pageNumber
      this.getList()
    },
    handlePageSize ({ pageSize }) {
      this.page.pageSize = pageSize
      this.getList()
    },
    toShow (id) {
      localStorage.setItem('orderDataId', id)
      this.$router.push({ name: 'orderDataDetail' })
    }
  }
}
</script>
