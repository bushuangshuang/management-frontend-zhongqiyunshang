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
import { loadDataByType } from '@/api/common'
import { orderPoolLoadData, claimOrder } from '@/api/partner/saleManage'
import { storage } from '@/libs/common'
export default {
  name: 'index',
  components: {
    CustomTable
  },
  data () {
    return {
      nameTab: 'name1',
      buttonList: [],
      queryForm: {
        orderPay: ''
      },
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
          align: 'center',
          // fixed: 'right',
          render: (h, params) => {
            let that = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (this.buttonList['198']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toClaim(params.row)
                  }
                }

              }, '认领订单')
            ])
          }
        }
      ],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      kindOption: [],
      payOption: []
    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.queryData
    }
  },
  created () {
    this.setQueryData()
    this.getKindOption()
    this.getList()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    setQueryData () {
      let data = {
        'type': 'PAYMENT_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          let arr = [
            {
              type: 'select',
              prop: 'orderPay',
              label: '付款方式',
              selectOption: res.data.list,
              placeholder: '请输入付款方式',
              width: '140px'
            }
          ]
          this.$store.commit('setQueryData', arr)
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getKindOption () {
      let data = {
        'type': 'CAR_PRODUCT_KIND'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.kindOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getStatus (value, name) {
      let arr = []
      if (name === 'kind') {
        arr = this.kindOption
      } else if (name === 'pay') {
        arr = this.payOption
      }
      var label = ''
      for (var child of arr) {
        if (child.value === value) {
          label = child.label
          break
        }
      }
      return label
    },
    getList () {
      let data = {
        orderPay: this.queryForm.orderPay,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      orderPoolLoadData(data).then(res => {
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
    toClaim (row) {
      this.$Modal.warning({
        title: '状态',
        content: '确定要认领订单吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id
          }
          claimOrder(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('认领订单成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    }
  }

}
</script>
