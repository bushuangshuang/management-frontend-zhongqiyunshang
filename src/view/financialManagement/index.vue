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
      <Modal v-model="modal" title="确认退款" :mask-closeable="false" width="1100" @on-cancel="handleCancel">
        <Table border ref="selection" :columns="columnsRF" :row-class-name="setClassName"  @on-selection-change="handleRowChange" :data="tableDataRF"></Table>
        <div slot="footer" style="text-align: center">
          <Button @click="handleCancel">取消</Button>
          <Button type="primary" class="submitBtn" @click="handleSubmitRF">提交</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/custom-table'
import CustomForm from '@/components/custom-form'
import { loadDataByType } from '@/api/common'
import { financialOrderLoadData, confirmRefund, RefundedCompletion } from '@/api/partner/saleManage'
import { storage } from '@/libs/common'
import TableExpandTree from '@/components/table_expand_tree'
export default {
  name: 'index',
  components: {
    CustomTable,
    CustomForm
  },
  data: function () {
    return {
      nameTab: 'name1',
      buttonList: [],
      queryForm: {
        partnerNm: '',
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
          align: 'center',
          width: 130
        },
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          width: 170,
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
                  display: (this.buttonList['217']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toClaim(params.row)
                  }
                }

              }, '确认退款'),
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
                    that.refundCompletion(params.row.id)
                  }
                }

              }, '退款完成')
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
      payOption: [],
      modal: false,
      infoFormV: {
        refundMoney: ''
      },
      ruleInfoFormV: {
        refundMoney: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ]
      },
      FormItemDateModalV: [
        {
          type: 'inputUnit',
          prop: 'refundMoney',
          label: '退款金额',
          unit: '元',
          placeholder: '请输入退款金额',
          width: '200px'
        }
      ],
      selectId: '',
      columnsRF: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
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
                    title: ' ', key: 'orderFlowNo', align: 'center', width: 80
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
          title: '支付金额(元)', key: 'payAmount', align: 'center', width: 110
        },
        {
          title: '支付方式', key: 'type', align: 'center', width: 90
        },
        {
          title: '支付状态', key: 'payStatus', align: 'center', width: 90
        },
        {
          title: '支付日期', key: 'createDate', align: 'center', width: 100
        },
        {
          title: '已退金额(元)', key: 'countRefundAmount', align: 'center', width: 110
        },
        {
          title: '退款金额(元)',
          key: 'refundAmount',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Input', {
                props: {
                  type: 'text',
                  size: 'small',
                  value: this.tableDataRF[params.index].refundAmount,
                  disabled: this.tableDataRF[params.index].payAmount === this.tableDataRF[params.index].refundAmount
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-blur': () => {
                    this.tableDataRF[params.index].refundAmount = event.target.value
                  }
                }
              })

            ])
          }
        }
      ],
      tableDataRF: [],
      selection: [],
      selectRF: []
    }
  },
  watch: {

  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.financeQueryData
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
              type: 'input',
              prop: 'partnerNm',
              label: '服务商名称',
              placeholder: '请输入服务商名称',
              width: '140px'
            },
            {
              type: 'select',
              prop: 'orderPay',
              label: '付款方式',
              selectOption: res.data.list,
              placeholder: '请输入付款方式',
              width: '140px'
            }
          ]
          this.$store.commit('setFinanceQueryData', arr)
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
        partnerNm: this.queryForm.partnerNm,
        orderPay: this.queryForm.orderPay,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      financialOrderLoadData(data).then(res => {
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
      this.modal = true
      this.selectId = row.id
      // let isSelection = false
      // for(let i=0;i<row.payDetailsList.length;i++){
      //   if(row.payDetailsList[i].responseCode !== 'XY_0000'){
      //     this.columnsRF.unshift({
      //       type: 'selection',
      //       width: 60,
      //       align: 'center'
      //     })
      //     isSelection = true
      //     break
      //   }
      // }
      // if(isSelection){
      for (let i = 0; i < row.payDetailsList.length; i++) {
        if (row.payDetailsList[i].responseCode === 'XY_0000') { // 判断是否已退所有款 payAmount-refundAmount小于等于0
          row.payDetailsList[i]._disabled = true
        }
      }
      // }
      this.tableDataRF = row.payDetailsList
    },
    handleCancel () {
      this.modal = false
      this.getList()
    },
    handleSubmitV ({ infoForm }) {
      let data = {
        id: this.selectId,
        refundMoney: infoForm.refundMoney
      }
      confirmRefund(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.info('退款成功！')
          this.getList()
          this.modal = false
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    keepTwoDecimalFull (num) {
      let result = parseFloat(num)
      if (isNaN(result)) {
        this.$Message.info('传递参数错误，请检查！')
        return false
      }
      result = Math.round(num * 100) / 100
      let sx = result.toString()
      var posDecimal = sx.indexOf('.')
      if (posDecimal < 0) {
        posDecimal = sx.length
        sx += '.'
      }
      while (sx.length <= posDecimal + 2) {
        sx += '0'
      }
      return sx
    },
    handleSubmitRF () {
      if (this.selection.length === 0) {
        this.$Message.info('请先选择退款记录')
        return
      }
      let isCheck = false
      this.selectRF = []
      this.selection.forEach(item => {
        this.tableDataRF.forEach(itemT => {
          if (item.id === itemT.id) {
            item.refundAmount = itemT.refundAmount
          }
        })
      })
      for (let i = 0; i < this.selection.length; i++) {
        let rfAmount = this.selection[i].refundAmount
        if (rfAmount) {
          let reg = /^\d+(\.\d{1,2})?$/
          if (reg.test(rfAmount)) {
            if (rfAmount > this.keepTwoDecimalFull(Number(this.selection[i].payAmount) - Number(this.selection[i].refundAmount))) {
              this.$Message.info('输入退款金额小于等于付款金额')
              isCheck = true
              return
            } else {
              let rfObj = {
                'refundAmount': rfAmount,
                'id': this.selection[i].id
              }
              this.selectRF.push(rfObj)
            }
          } else {
            this.$Message.info('输入退款金额为正整数或保留两位小数')
            isCheck = true
            return
          }
        } else {
          this.$Message.info('请填写选中的退款金额')
          isCheck = true
          return
        }
      }
      if (!isCheck) {
        let data = this.selectRF
        confirmRefund(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.info('退款成功！')
            this.getList()
            this.modal = false
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
    },
    handleRowChange (arr) {
      this.selection = arr
    },
    setClassName (row, index) {
      return (row.refundDetailsList === undefined || row.refundDetailsList.length === 0) ? 'tdNoExpend' : ''
    },
    refundCompletion (id) {
      this.$Modal.warning({
        title: '状态',
        content: '确定完成退款吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            'id': id
          }
          RefundedCompletion(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('已完成退款！')
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

<style scoped lang="less">
  .ivu-table-cell{
    padding-left: 8px;
    padding-right: 8px;
  }
  .submitBtn{background-color: #F45416;color: #fff;border: 1px solid #F45416;margin-left: 20px;}
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
</style>
