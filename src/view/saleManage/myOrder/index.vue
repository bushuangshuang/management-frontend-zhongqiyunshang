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
      <Modal v-model="modal" :title="title" :mask-closeable="false" width="800" @on-cancel="handleCancel">
        <custom-form
           :isInline="true"
           :labelWidth="isLine?140:240"
           :showBtnCancel="false"
           :infoForm="infoFormV"
           :ruleInfoForm="ruleInfoFormV"
           :FormItemDate="FormItemDateModalV"
           @on-form-submit="handleSubmitV"
           @on-form-cancel="handleCancel"
        ></custom-form>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/custom-table'
import CustomForm from '@/components/custom-form'
import { loadDataByType } from '@/api/common'
import { storage } from '@/libs/common'
import { myOrderLoadData, confirmOfOrder, sellerValidateCar, confirmOfpaid, sellerUploadData, sellerMakeRefund } from '@/api/partner/saleManage'
export default {
  name: 'index',
  components: {
    CustomTable,
    CustomForm
  },
  data () {
    return {
      nameTab: 'name1',
      buttonList: [],
      queryForm: {
        orderPay: '',
        orderStatus: ''
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
          width: 180,
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
                  color: '#2d8cf0',
                  display: ((params.row.orderStatus === 2 || params.row.orderStatus === 3) && this.buttonList['199']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toActiveRefund(params.row)
                  }
                }
              }, '退款'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.orderStatus === 4 && this.buttonList['200']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toVehicleCar(params.row)
                  }
                }
              }, '服务商验车'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.orderStatus === 1 || params.row.orderStatus === 3 || params.row.orderStatus === 4 ||
                            params.row.orderStatus === 5 || params.row.orderStatus === 8 ||
                            params.row.orderStatus === 10 || params.row.orderStatus === 12 ||
                            params.row.orderStatus === 13 || params.row.orderStatus === 14 ||
                            params.row.orderStatus === 15) ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    that.toClaim(params.row)
                  }
                }
              }, that.btnName(params.row.orderStatus)),
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
      },
      kindOption: [],
      payOption: [],
      statusOption: [],
      buyFieldOption: [],
      carKindOption: [],
      carUseOption: [],
      orderPayOption: [],
      userSexOption: [],
      userIdTypeOption: [],
      modal: false,
      title: '',
      selectId: '',
      selectOrderStatus: '',
      isLine: true
    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.queryData
    },
    ruleInfoFormV () {
      return this.$store.state.user.ruleInfoFormV
    },
    infoFormV () {
      return this.$store.state.user.infoFormV
    },
    FormItemDateModalV () {
      return this.$store.state.user.FormItemDateModalV
    }
  },
  created () {
    this.buttonList = storage.getItem('buttonList')
    this.setQueryData()
    this.getKindOption()
    this.getList()
    this.getUyFieldOption()
    this.getCarKindOption()
    this.getCarUseOption()
    this.getOrderPayOption()
    this.getUserSexOption()
    this.getUserIdTypeOption()
  },
  activated () {
    this.buttonList = storage.getItem('buttonList')
    this.setQueryData()
    this.getKindOption()
    this.getList()
    this.getUyFieldOption()
    this.getCarKindOption()
    this.getCarUseOption()
    this.getOrderPayOption()
    this.getUserSexOption()
    this.getUserIdTypeOption()
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
    getUyFieldOption () {
      let data = {
        'type': 'BUY_FIELD'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.buyFieldOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCarKindOption () {
      let data = {
        'type': 'CAR_KIND'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.carKindOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCarUseOption () {
      let data = {
        'type': 'CAR_USE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.carUseOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getOrderPayOption () {
      let data = {
        'type': 'PAYMENT_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.orderPayOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getUserSexOption () {
      let data = {
        'type': 'Gender'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.userSexOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getUserIdTypeOption () {
      let data = {
        'type': 'ID_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.userIdTypeOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
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
              this.$store.commit('setQueryData', arr)
            } else {
              this.$Message.info(res.data.msg)
            }
          })
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
        orderStatus: this.queryForm.orderStatus,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      myOrderLoadData(data).then(res => {
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
    toVehicleCar (row) {
      this.title = '服务商验车'
      this.modal = true
      this.isLine = false
      this.selectId = row.id
      this.selectOrderStatus = row.orderStatus
      let infoFormV = {
        carProductUcd: row.carProductUcd,
        carProductVin: '',
        engineNumber: ''
      }
      let ruleInfoFormV = {
        carProductVin: [{ required: true, message: '此项必填', trigger: 'blur' }],
        engineNumber: [{ required: true, message: '此项必填', trigger: 'blur' }]
      }
      let FormItemDateModalV = [
        {
          type: 'label',
          prop: 'carProductUcd',
          label: '产品识别码',
          width: '200px'
        },
        {
          type: 'input',
          prop: 'carProductVin',
          label: 'VIN码',
          placeholder: '请输入VIN码',
          width: '200px'
        },
        {
          type: 'input',
          prop: 'engineNumber',
          label: '发动机号',
          placeholder: '请输入发动机号',
          width: '200px'
        }
      ]
      this.$store.commit('setInfoFormV', infoFormV)
      this.$store.commit('setRuleInfoFormV', ruleInfoFormV)
      this.$store.commit('setFormItemDateModalV', FormItemDateModalV)
    },
    toClaim (row) {
      let title = ''
      let api = ''
      this.selectId = row.id
      this.selectOrderStatus = row.orderStatus
      if (row.orderStatus === 2) {
        title = '服务商确认'
        api = confirmOfOrder
      } else if (row.orderStatus === 6 || row.orderStatus === 7 || row.orderStatus === 11) {
        title = '确认已支付'
        api = confirmOfpaid
      } else if (row.orderStatus === 9) {
        this.title = '上传数据'
        this.modal = true
        this.isLine = true
        let ruleInfoFormV = {
          buyCity: [{ required: true, message: '此项必填', trigger: 'blur' }],
          buyDate: [{ required: true, message: '此项必填', trigger: 'change' }],
          buyField: [{ required: true, message: '此项必填', trigger: 'change' }],
          carCertificate: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carKind: [{ required: true, message: '此项必填', trigger: 'change' }],
          carLicence: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carPrice: [
            { required: true, message: '此项必填', trigger: 'blur' },
            { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
          ],
          carUse: [{ required: true, message: '此项必填', trigger: 'change' }],
          carUseAddr: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carUseUnit: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carUseUser: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carUser: [{ required: true, message: '此项必填', trigger: 'blur' }],
          driveLicenseCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
          driveLicenseDate: [{ required: true, message: '此项必填', trigger: 'change' }],
          driveLicenseSdate: [{ required: true, message: '此项必填', trigger: 'change' }],
          invoiceDate: [{ required: true, message: '此项必填', trigger: 'change' }],
          invoiceNum: [{ required: true, message: '此项必填', trigger: 'blur' }],
          licenceArea: [{ required: true, message: '此项必填', trigger: 'blur' }],
          orderPay: [{ required: true, message: '此项必填', trigger: 'change' }],
          userId: [{ required: true, message: '此项必填', trigger: 'blur' }],
          userIdAddr: [{ required: true, message: '此项必填', trigger: 'blur' }],
          userIdType: [{ required: true, message: '此项必填', trigger: 'change' }],
          userPhone: [{ required: true, message: '此项必填', trigger: 'blur' }, { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }],
          userSex: [{ required: true, message: '此项必填', trigger: 'change' }]
        }
        let infoFormV = {
          partnerNm: row.partnerNm,
          buyCity: '',
          buyDate: '',
          buyField: '',
          carCertificate: '',
          carKind: '',
          carLicence: '',
          carPrice: '',
          carUse: '',
          carUseAddr: '',
          carUseUnit: '',
          carUseUser: '',
          carUser: row.realName,
          driveLicenseCd: '',
          driveLicenseDate: '',
          driveLicenseSdate: '',
          invoiceDate: '',
          invoiceNum: '',
          licenceArea: '',
          orderPay: row.orderPay,
          userId: row.idCard,
          userIdAddr: row.address,
          userIdType: row.idCardType,
          userPhone: '',
          userSex: row.sex
        }
        let FormItemDateModalV = [
          {
            type: 'input',
            prop: 'partnerNm',
            label: '经销商全称',
            readonly: true,
            width: '200px'
          },
          {
            type: 'date',
            prop: 'buyDate',
            label: '填报日期',
            placeholder: '请选择填报日期',
            format: 'yyyy-MM-dd',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'buyField',
            label: '购车领域',
            selectOption: this.buyFieldOption,
            placeholder: '请选择购车领域',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'buyCity',
            label: '购车城市',
            placeholder: '请输入购车领域',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'licenceArea',
            label: '上牌区域',
            placeholder: '行政区划代码即邮政编码6位',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carUseUnit',
            label: '车辆运行单位',
            placeholder: '请输入车辆运行单位',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'carKind',
            label: '车辆种类',
            selectOption: this.carKindOption,
            placeholder: '请选择车辆种类',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'carUse',
            label: '车辆用途',
            selectOption: this.carUseOption,
            placeholder: '请选择车辆用途',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'orderPay',
            label: '支付方式',
            selectOption: this.orderPayOption,
            placeholder: '请选择支付方式',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carUser',
            label: '用户姓名',
            placeholder: '请输入用户姓名',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'userSex',
            label: '性别',
            selectOption: this.userSexOption,
            placeholder: '请选择性别',
            width: '200px'
          },
          {
            type: 'select',
            prop: 'userIdType',
            label: '证件类型',
            selectOption: this.userIdTypeOption,
            placeholder: '请选择证件类型',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'userId',
            label: '证件号码',
            placeholder: '请输入证件号码',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'userIdAddr',
            label: '证件地址',
            placeholder: '请输入证件地址',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carUseUser',
            label: '车辆实际使用人',
            placeholder: '请输入车辆实际使用人',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carUseAddr',
            label: '车辆实际使用地址',
            placeholder: '请输入车辆实际使用地址',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'userPhone',
            label: '联系电话',
            placeholder: '请输入联系电话',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carLicence',
            label: '车辆牌照',
            placeholder: '请输入车辆牌照',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPrice',
            label: '购买价格（元）',
            placeholder: '请输入购买价格（元）',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'invoiceNum',
            label: '发票号',
            placeholder: '请输入发票号',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'driveLicenseCd',
            label: '行驶证号',
            placeholder: '请输入行驶证号',
            width: '200px'
          },
          {
            type: 'date',
            prop: 'invoiceDate',
            label: '发票时间',
            placeholder: '请选择发票时间',
            format: 'yyyy-MM-dd',
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carCertificate',
            label: '合格证号',
            placeholder: '请输入合格证号',
            width: '200px'
          },
          {
            type: 'date',
            prop: 'driveLicenseSdate',
            label: '行驶证发证时间',
            placeholder: '请选择行驶证发证时间',
            format: 'yyyy-MM-dd',
            width: '200px'
          },
          {
            type: 'date',
            prop: 'driveLicenseDate',
            label: '行驶证注册时间',
            placeholder: '请选择行驶证注册时间',
            format: 'yyyy-MM-dd',
            width: '200px'
          }

        ]
        this.$store.commit('setInfoFormV', infoFormV)
        this.$store.commit('setRuleInfoFormV', ruleInfoFormV)
        this.$store.commit('setFormItemDateModalV', FormItemDateModalV)
        return
      }
      //  else if (row.orderStatus === 14) {
      //   this.title = '确认退款'
      //   this.modal = true
      //   this.isLine = false
      //   let ruleInfoFormV = {
      //     refundMoney: [{ required: true, message: '此项必填', trigger: 'blur' }, { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }]
      //   }
      //   let infoFormV = {
      //     refundMoney: ''
      //   }
      //   let FormItemDateModalV = [
      //     {
      //       type: 'input',
      //       prop: 'refundMoney',
      //       label: '退款金额',
      //       placeholder: '请输入退款金额',
      //       width: '200px'
      //     }
      //   ]
      //   this.$store.commit('setInfoFormV', infoFormV)
      //   this.$store.commit('setRuleInfoFormV', ruleInfoFormV)
      //   this.$store.commit('setFormItemDateModalV', FormItemDateModalV)
      //   return
      // }
      this.$Modal.warning({
        title: title,
        content: '确定' + title + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id
          }
          if (api === '') {
            this.$Message.info('未联调接口')
          } else {
            api(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(title + '成功！')
                this.getList()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          }
        }
      })
    },
    btnName (status) {
      let btnName = ''
      if (status === 2) {
        btnName = '服务商确认'
      } else if (status === 6 || status === 7 || status === 11) {
        btnName = '确认已支付'
      } else if (status === 9) {
        btnName = '上传数据'
      } else if (status === 14) {
        btnName = '确认退款'
      }
      // else if (status === 4) {
      //   btnName = '服务商验车'
      // }
      return btnName
    },
    toActiveRefund (row) {
      this.selectId = row.id
      this.selectOrderStatus = row.orderStatus
      this.title = '确认退款'
      this.modal = true
      this.isLine = false
      let ruleInfoFormV = {
        // refundMoney: [
        //   { required: true, message: '此项必填', trigger: 'blur' },
        //   { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        // ],
        refundReason: [
          { type: 'string', max: 100, message: '退款不能超过100字', trigger: 'blur' }
        ]
      }
      let infoFormV = {
        // refundMoney: '',
        refundReason: ''
      }
      let FormItemDateModalV = [
        // {
        //   type: 'input',
        //   prop: 'refundMoney',
        //   label: '退款金额',
        //   placeholder: '请输入退款金额',
        //   width: '200px'
        // },
        {
          type: 'textArea',
          prop: 'refundReason',
          label: '退款理由',
          placeholder: '请输入退款理由',
          width: '200px'
        }
      ]
      this.$store.commit('setInfoFormV', infoFormV)
      this.$store.commit('setRuleInfoFormV', ruleInfoFormV)
      this.$store.commit('setFormItemDateModalV', FormItemDateModalV)
    },
    toShow (id) {
      localStorage.setItem('orderDetailId', id)
      this.$router.push({ name: 'orderDetail' })
    },
    handleSubmitV ({ infoForm }) {
      if (this.selectOrderStatus === 4) { // 服务商验车
        let data = {
          id: this.selectId,
          carProductUcd: infoForm.carProductUcd,
          carProductVin: infoForm.carProductVin,
          engineNumber: infoForm.engineNumber
        }
        sellerValidateCar(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.info('服务商验车成功！')
            this.modal = false
            this.getList()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      } else if (this.selectOrderStatus === 9) { // 服务商上传数据
        let data = {
          buyCity: infoForm.buyCity,
          buyDate: infoForm.buyDate,
          buyField: infoForm.buyField,
          carCertificate: infoForm.carCertificate,
          carKind: infoForm.carKind,
          carLicence: infoForm.carLicence,
          carPrice: parseInt(infoForm.carPrice),
          carUse: infoForm.carUse,
          carUseAddr: infoForm.carUseAddr,
          carUseUnit: infoForm.carUseUnit,
          carUseUser: infoForm.carUseUser,
          carUser: infoForm.carUser,
          driveLicenseCd: infoForm.driveLicenseCd,
          driveLicenseDate: infoForm.driveLicenseDate,
          driveLicenseSdate: infoForm.driveLicenseSdate,
          id: this.selectId,
          invoiceDate: infoForm.invoiceDate,
          invoiceNum: infoForm.invoiceNum,
          licenceArea: infoForm.licenceArea,
          orderPay: infoForm.orderPay,
          userId: infoForm.userId,
          userIdAddr: infoForm.userIdAddr,
          userIdType: infoForm.userIdType,
          userPhone: infoForm.userPhone,
          userSex: infoForm.userSex
        }
        sellerUploadData(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.info('上传数据成功！')
            this.modal = false
            this.getList()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      } else if (this.selectOrderStatus === 2 || this.selectOrderStatus === 3) { // 服务商主动退款
        /* if (infoForm.refundReason.length > 100) {
          this.$Message.info('退款原因不能超过100个字！')
          return
        } */
        let data = {
          id: this.selectId,
          // refundMoney: infoForm.refundMoney,
          applyRefundReason: infoForm.refundReason
        }
        sellerMakeRefund(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.info('主动退款发起成功！')
            this.getList()
            this.modal = false
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
      // else if (this.selectOrderStatus === 14) { // 确认退款
      //   let data = {
      //     id: this.selectId,
      //     refundMoney: infoForm.refundMoney
      //   }
      //   confirmRefund(data).then(res => {
      //     if (res.data.code === '200') {
      //       this.$Message.info('退款成功！')
      //       this.getList()
      //       this.modal = false
      //     } else {
      //       this.$Message.info(res.data.msg)
      //     }
      //   })
      // }
    },
    handleSubmitU () {

    },
    handleCancel () {
      this.modal = false
      this.getList()
    }
  }
}
</script>
