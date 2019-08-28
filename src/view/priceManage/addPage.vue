<template>
  <div>
      <custom-form
        :btnSubmit="'连续添加'"
        :isInline="true"
        :showBtnCancel="false"
        :labelWidth="140"
        :infoForm="infoForm"
        :ruleInfoForm="rule"
        :FormItemDate="FormItemDate"
        @on-form-submit="handleSubmit"
      ></custom-form>
    <br/>
    <br/>
    <custom-table
      :showQuery="false"
      :tableData="tableData"
      :tableColumns="tableColumns"
      :page="page"
      @on-get-list="getList"
      @on-change-page="handlePage"
      @on-change-pageSize="handlePageSize"
    ></custom-table>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType } from '@/api/common'
import { getPriceList, getDuration, addOrUpdateCarPrice } from '@/api/partner/productPrice'
export default {
  name: 'add-page',
  components: {
    CustomForm,
    CustomTable
  },
  data () {
    return {
      infoForm: {
        brand: '',
        seriesNm: '',
        productCd: '',
        carProductNm: '',
        carProductStyle: '',
        carProductCd: '',
        colorValue: '',
        colorNm: '',
        carProductAddress: '',
        carProductPrice: '',
        earnestMoney: '',
        fileUrl: '20190409013537301CpALu'
      },
      rule: {
        carProductCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        colorValue: [{ required: true, message: '此项必填', trigger: 'blur' }],
        colorNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductPrice: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ],
        earnestMoney: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ]
      },
      tableColumns: [
        {
          title: '产品编码',
          key: 'carProductCd',
          align: 'center'
        },
        {
          title: '产品名称',
          align: 'center',
          key: 'carProductNm'
        },
        {
          title: '车系',
          key: 'classNm',
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
          align: 'center',
          render: (h, params) => {
            return h('div',
              this.getStatus(params.row.carProductKind, 'kind')
            )
          }
        },
        {
          title: '最大里程(km)',
          key: 'carPowerMaxKm',
          width: 120,
          align: 'center'
        },
        {
          title: '车辆颜色',
          key: 'name',
          align: 'center'
        },
        {
          title: '地域',
          key: 'carProductAddress',
          align: 'center'
        },
        {
          title: '厂商指导价格',
          width: 120,
          key: 'carProductPrice',
          align: 'center'
        },
        {
          title: '履约保证金',
          key: 'earnestMoney',
          align: 'center'
        }, {
          title: '审核状态',
          key: 'verifyStatus',
          align: 'center',
          render: (h, params) => {
            return h('div',
              this.getStatus(params.row.verifyStatus, 'isVerify')
            )
          }
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
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    that.toEdit(params.row)
                  }
                }

              }, '修改'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                  // display: params.row.isVerify === 0 ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toApply(params.row)
                  }
                }
              }, '审核')
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
      isVerifyOption: [],
      durationOption: [],
      selectId: '',
      query: {
        brand: '',
        productCd: '',
        carProductNm: '',
        carProductStyle: ''
      }
    }
  },
  computed: {
    FormItemDate () {
      return this.$store.state.user.priceAddPageQueryData
    }
  },
  created () {
    this.getDurationOption()
    this.getKindOption()
    this.getList()
    this.getVerifyOption()
  },
  methods: {
    getVerifyOption () {
      let data = {
        'type': 'VERIFY_STATUS'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.isVerifyOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getDurationOption () {
      if (localStorage.getItem('queryPrice')) {
        let priceStr = localStorage.getItem('queryPrice')
        let priceObj = JSON.parse(priceStr)
        this.query = priceObj
      }
      if (localStorage.getItem('selectPrice')) {
        let priceStr = localStorage.getItem('selectPrice')
        let priceObj = JSON.parse(priceStr)
        this.infoForm.brand = priceObj.brand
        this.infoForm.seriesNm = priceObj.seriesNm
        this.infoForm.productCd = priceObj.productCd
        this.infoForm.carProductNm = priceObj.carProductNm
        this.infoForm.carProductStyle = priceObj.carProductStyle

        this.selectId = priceObj.id ? priceObj.id : ''
        let isReadonly = !!this.selectId
        if (isReadonly) {
          this.infoForm.carProductCd = priceObj.carProductCd
          this.infoForm.colorValue = priceObj.colorValue
          this.infoForm.colorNm = priceObj.colorNm
          this.infoForm.carProductAddress = priceObj.carProductAddress
          this.infoForm.carProductPrice = priceObj.carProductPrice
          this.infoForm.earnestMoney = priceObj.earnestMoney
          this.infoForm.fileUrl = priceObj.fileUrl
        }
        let data = {
          productCd: priceObj.productCd,
          carProductNm: priceObj.carProductNm,
          carProductStyle: priceObj.carProductStyle
        }
        getDuration(data).then(res => {
          if (res.data.code === '200') {
            this.durationOption = res.data.list
            let arr = [
              {
                type: 'input',
                prop: 'brand',
                label: '品牌',
                readonly: true,
                width: '200px'
              },
              {
                type: 'input',
                prop: 'seriesNm',
                label: '车系',
                readonly: true,
                width: '200px'
              },
              {
                type: 'input',
                prop: 'carProductNm',
                label: '产品名称',
                readonly: true,
                width: '200px'
              },
              {
                type: 'input',
                prop: 'carProductStyle',
                label: '产品款式',
                readonly: true,
                width: '200px'
              },
              {
                type: 'select',
                prop: 'carProductCd',
                label: '公里',
                selectOption: this.durationOption,
                placeholder: '请选择公里',
                readonly: isReadonly,
                width: '200px'
              },
              {
                type: 'colorPicker',
                prop: 'colorValue',
                label: '颜色',
                readonly: isReadonly,
                colors: [],
                width: '200px'
              },
              {
                type: 'input',
                prop: 'colorNm',
                label: '颜色名称',
                readonly: isReadonly,
                placeholder: '请输入颜色名称',
                width: '200px'
              },
              {
                type: 'input',
                prop: 'carProductAddress',
                label: '销售范围',
                readonly: isReadonly,
                placeholder: '请输入销售范围',
                width: '200px'
              },
              {
                type: 'input',
                prop: 'carProductPrice',
                label: '价格',
                placeholder: '请输入价格',
                width: '200px'
              },
              {
                type: 'input',
                prop: 'earnestMoney',
                label: '履约保证金',
                readonly: isReadonly,
                placeholder: '请输入履约保证金',
                width: '200px'
              },
              {
                type: 'file',
                prop: 'fileUrl',
                readonly: isReadonly,
                fileShow: true,
                label: '上传图片',
                width: '200px'
              }
            ]
            this.$store.commit('setPriceAddPageQueryData', arr)
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
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
      } else if (name === 'isVerify') {
        arr = this.isVerifyOption
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
    handleSubmit ({ infoForm }) {
      let data = {}
      if (this.selectId !== undefined && this.selectId !== null && this.selectId !== '') {
        data = {
          id: this.selectId.toString(),
          carProductCd: infoForm.carProductCd,
          carColourValue: infoForm.colorValue,
          name: infoForm.colorNm,
          carProductAddress: infoForm.carProductAddress,
          carProductPrice: infoForm.carProductPrice,
          photoUrl: infoForm.fileUrl
        }
      } else {
        data = {
          carProductCd: infoForm.carProductCd,
          carColourValue: infoForm.colorValue,
          name: infoForm.colorNm,
          carProductAddress: infoForm.carProductAddress,
          carProductPrice: infoForm.carProductPrice,
          photoUrl: infoForm.fileUrl
        }
        addOrUpdateCarPrice(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.success(res.data.msg)
            this.getList()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
    },
    getList () {
      let data = {
        brand: this.query.brand,
        classNm: this.query.productCd,
        carProductNm: this.query.carProductNm,
        carProductStyle: this.query.carProductStyle,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getPriceList(data).then(res => {
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
    toEdit (row) {
      this.selectId = row.id
      this.infoForm.carProductCd = row.carProductCd
      this.infoForm.colorValue = row.carColourValue
      this.infoForm.colorNm = row.name
      this.infoForm.carProductAddress = row.carProductAddress
      this.infoForm.carProductPrice = row.carProductPrice
      this.infoForm.earnestMoney = row.earnestMoney
      this.infoForm.fileUrl = row.photoUrl
    }
  }
}
</script>

<style scoped>

</style>
