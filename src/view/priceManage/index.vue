<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :isAdd="this.buttonList['183']"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        :queryForm="queryForm"
        @on-query-select-one="getClassesOption"
        @on-query-select-two="getClassSelect"
        @on-query-select-three="getCarProductNm"
        @on-query-select-four="getCarProductStyle"
        @on-query-cancel-one="getQueryCancelOne"
        @on-query-cancel-two="getQueryCancelTwo"
        @on-query-cancel-three="getQueryCancelThree"
        @on-query-cancel-four="getQueryCancelFour"
        :queryFormItemData="queryFormItemData"
        @on-add-page="toAddPage"
        @on-get-list="handleQueryList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
      ></custom-table>
      <Modal v-model="modal" :title="title" :mask-closeable="false" :width="isAddAndUpdate?800:600" @on-cancel="handleApplyCancel">
        <Form v-if="isAddAndUpdate" ref="infoForm" :model="infoForm" :rules="isDisable?infoFormRulesUpdate:infoFormRules" :label-width="140" inline>
          <FormItem label="品牌" prop="brand">
            <Input v-model="infoForm.brand" disabled style="width:200px;" />
          </FormItem>
          <FormItem label="车系" prop="seriesNm">
            <Input v-model="infoForm.seriesNm" disabled style="width:200px;" />
          </FormItem>
          <FormItem label="产品名称" prop="carProductNm">
            <Input v-model="infoForm.carProductNm" disabled style="width:200px;" />
          </FormItem>
          <FormItem label="产品款式" prop="carProductStyle">
            <Input v-model="infoForm.carProductStyle" disabled style="width:200px;" />
          </FormItem>
          <FormItem prop="carProductVer" label="产品版本" v-if="!isDisable">
            <Select v-model="infoForm.carProductVer" @on-change="getValueNull(infoForm.carProductVer)" placeholder="请选择产品版本"  style="width:200px">
              <Option v-for="item in durationOption" @click.native="getColorDropOption(item.carProductCd,item.earnestMoney)" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="colorId" label="颜色" v-if="!isDisable">
            <Select v-model="infoForm.colorId" placeholder="请选择颜色" :disabled="isDisable" style="width:200px">
              <Option v-for="item in colorDropOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="carProductVer" label="产品版本" v-if="isDisable">
            <Input v-model="infoForm.carProductVer" disabled style="width:200px;" />
          </FormItem>
          <FormItem prop="colorName" label="颜色" v-if="isDisable">
            <Input v-model="infoForm.colorName" disabled style="width:200px;" />
          </FormItem>
          <FormItem label="销售范围" prop="carProductAddress">
            <Input v-model="infoForm.carProductAddress" placeholder="请输入销售范围" :disabled="isDisable" style="width:200px;" />
          </FormItem>
          <FormItem label="价格" prop="carProductPrice">
            <Input v-model="infoForm.carProductPrice" placeholder="请输入价格"  style="width:180px;" />&nbsp;&nbsp;元
          </FormItem>
          <FormItem label="履约保证金" prop="earnestMoney">
            <Input v-model="infoForm.earnestMoney" disabled style="width:200px;" />
          </FormItem>
          <div class="footerDiv">
            <Button type="primary" class="submitBtn" @click="handleSubmit">提交</Button>
          </div>
        </Form>
        <div v-if="!isAddAndUpdate" style="padding-left:20%;">
          <Form ref="checkForm" :model="checkForm" label-position="left" :rules="checkRules" :label-width="70">
            <FormItem label="审核意见" prop="isVerify">
              <RadioGroup v-model="checkForm.isVerify">
                <Radio label="2">&nbsp;&nbsp;审核通过&nbsp;&nbsp;&nbsp;</Radio>
                <Radio label="3">&nbsp;&nbsp;审核不通过</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
        <div slot="footer" style="text-align: center">
          <Button v-if="!isAddAndUpdate" class="btn1" type="text" @click="handleApplyCancel">取消</Button>
          <Button v-if="!isAddAndUpdate" type="primary" @click="handleSubmitApply">提交</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType, getBrandSelect, getClassesSelect } from '@/api/common'
import { storage } from '@/libs/common'
import { getPriceList, getCarType, getCarProductStyle, submitPriceDraft, verifyPrice, getCarVersionSelect, addOrUpdateCarPrice, colorDropdown } from '@/api/partner/productPrice'
export default {
  name: 'index',
  components: {
    CustomForm,
    CustomTable
  },
  data () {
    return {
      kindOption: [],
      isVerifyOption: [],
      buttonList: [],
      queryForm: {
        brand: '',
        seriesNm: '',
        carProductNm: '',
        carProductStyle: ''
      },
      selectClass: {
        brand: '',
        seriesNm: '',
        productCd: '',
        carProductNm: '',
        carProductStyle: ''
      },
      query: {
        brand: '',
        productCd: '',
        carProductNm: '',
        carProductStyle: ''
      },
      classNmOption: [],
      seriesNmOption: [],
      carProductNmOption: [],
      carProductStyleOption: [],
      tableColumns: [
        {
          title: '产品编码',
          key: 'carProductCd',
          align: 'center',
          width: 140
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
          width: 140,
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
                  display: (params.row.verifyStatus === '0' && this.buttonList['184']) ? 'inline-block' : 'none'
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
                  color: '#2d8cf0',
                  display: params.row.verifyStatus === '0' ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toSubmitApply(params.row)
                  }
                }
              }, '提交审核'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.verifyStatus === '1' && this.buttonList['185']) ? 'inline-block' : 'none'
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
      modal: false,
      title: '审核',
      isAddAndUpdate: false,
      selectId: '',
      checkForm: {
        isVerify: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      carProductCd: '',
      infoForm: {
        brand: '',
        seriesNm: '',
        productCd: '',
        carProductNm: '',
        carProductStyle: '',
        carProductCd: '',
        carProductAddress: '',
        carProductPrice: '',
        earnestMoney: '',
        carPowerMaxKm: '',
        colorId: '',
        colorName: ''
      },
      infoFormRules: {
        carProductCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        colorId: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductPrice: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ]
      },
      infoFormRulesUpdate: {
        carProductPrice: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ]
      },
      durationOption: [],
      FormItemDate: [],
      colorDropOption: [],
      isDisable: false

    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.productPrice.queryPriceData
    }
  },
  created () {
    this.getQueryOption()
    this.getList()
    this.getVerifyOption()
    this.getKindOption()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    handleQueryList () {
      this.page = {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
      this.getList()
    },
    getQueryOption () {
      getBrandSelect().then(res => {
        if (res.data.code === '200') {
          this.classNmOption = res.data.list
          this.getSetQuery()
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
    getVerifyOption () {
      let data = {
        'type': 'VERIFY_STATUS'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') { //eslint-disable-line
          this.isVerifyOption = res.data.list
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
    getList (name) {
      let data = {}
      if (name === 'cancel') {
        data = {
          brand: '',
          productCd: '',
          carProductNm: '',
          carProductStyle: '',
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        }
      } else {
        data = {
          brand: this.query.brand,
          productCd: this.query.productCd,
          carProductNm: this.query.carProductNm,
          carProductStyle: this.query.carProductStyle,
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        }
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
    getSetQuery () {
      let arr = [
        {
          type: 'select',
          prop: 'brand',
          label: '品牌',
          selectOption: this.classNmOption,
          isCascade: 'fourCascadeOne',
          placeholder: '请选择品牌',
          width: '140px'
        },
        {
          type: 'select',
          prop: 'seriesNm',
          label: '车系',
          placeholder: '请选择车系',
          isCascade: 'fourCascadeTwo',
          selectOption: this.seriesNmOption,
          width: '140px'
        },
        {
          type: 'select',
          prop: 'carProductNm',
          label: '产品名称',
          placeholder: '请选产品名称',
          isCascade: 'fourCascadeThree',
          selectOption: this.carProductNmOption,
          width: '140px'
        },
        {
          type: 'select',
          prop: 'carProductStyle',
          label: '产品款式',
          placeholder: '请选择产品款式',
          isCascade: 'fourCascadeFour',
          selectOption: this.carProductStyleOption,
          width: '140px'
        }
      ]
      this.$store.commit('setQueryPriceData', arr)
    },
    getClassesOption ({ obj }) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择品牌')
        return
      }
      this.selectClass.brand = obj.label
      this.query.brand = obj.classCd
      this.getQueryCancelTwo()
      let data = {
        parentClassCd: obj.classCd
      }
      getClassesSelect(data).then(res => {
        if (res.data.code === '200') {
          this.seriesNmOption = res.data.list
          this.getSetQuery()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getClassSelect ({ obj }) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择系列')
        return
      }
      this.selectClass.seriesNm = obj.label
      this.selectClass.productCd = obj.value.toString()
      this.query.productCd = obj.value.toString()
      this.getQueryCancelThree()
      let data = {
        id: obj.value.toString()
      }
      getCarType(data).then(res => {
        if (res.data.code === '200') {
          this.carProductNmOption = res.data.list
          this.getSetQuery()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCarProductNm ({ obj }) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择产品名称')
        return
      }
      this.selectClass.carProductNm = obj.label
      this.query.carProductNm = obj.label
      this.getQueryCancelFour()
      let data = {
        id: this.selectClass.productCd,
        carProductNm: obj.label
      }
      getCarProductStyle(data).then(res => {
        if (res.data.code === '200') {
          this.carProductStyleOption = res.data.list
          this.getSetQuery()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCarProductStyle ({ obj }) {
      this.selectClass.carProductStyle = obj.label
      this.query.carProductStyle = obj.label
    },
    getQueryCancelOne () {
      this.queryForm = {}
      this.seriesNmOption = []
      this.carProductNmOption = []
      this.carProductStyleOption = []
      this.getSetQuery()
    },
    getQueryCancelTwo () {
      this.queryForm.seriesNm = ''
      this.queryForm.carProductNm = ''
      this.queryForm.carProductStyle = ''
      this.selectClass.seriesNm = ''
      this.selectClass.productCd = ''
      this.selectClass.carProductNm = ''
      this.selectClass.carProductStyle = ''
      this.query.productCd = ''
      this.query.carProductNm = ''
      this.query.carProductStyle = ''
      this.carProductNmOption = []
      this.carProductStyleOption = []
      this.getSetQuery()
    },
    getQueryCancelThree () {
      this.queryForm.carProductNm = ''
      this.queryForm.carProductStyle = ''
      this.selectClass.carProductNm = ''
      this.selectClass.carProductStyle = ''
      this.query.carProductNm = ''
      this.query.carProductStyle = ''
      this.carProductStyleOption = []
      this.getSetQuery()
    },
    getQueryCancelFour () {
      this.queryForm.carProductStyle = ''
      this.selectClass.carProductStyle = ''
      this.query.carProductStyle = ''
    },
    toAddPage () {
      if (this.selectClass.brand === undefined || this.selectClass.brand === null || this.selectClass.brand === '') {
        this.$Message.info('请先选择品牌、车系、产品名称、产品款式后再点击新增')
        return
      }
      if (this.selectClass.seriesNm === undefined || this.selectClass.seriesNm === null || this.selectClass.seriesNm === '') {
        this.$Message.info('请先选择车系、产品名称、产品款式后再点击新增')
        return
      }
      if (this.selectClass.carProductNm === undefined || this.selectClass.carProductNm === null || this.selectClass.carProductNm === '') {
        this.$Message.info('请先选择产品名称、产品款式后再点击新增')
        return
      }
      if (this.selectClass.carProductStyle === undefined || this.selectClass.carProductStyle === null || this.selectClass.carProductStyle === '') {
        this.$Message.info('请先选择产品款式后再点击新增')
        return
      }
      // localStorage.setItem('selectPrice', JSON.stringify(this.selectClass))
      // localStorage.setItem('queryPrice', JSON.stringify(this.query))
      // this.$router.push({ name: 'priceAddPage' })

      this.getDurationOption()
      this.modal = true
      this.isAddAndUpdate = true
      this.title = '新增'
      this.isDisable = false
    },
    toEdit (row) {
      this.selectId = row.id
      this.infoForm = row
      this.infoForm.carProductPrice = row.carProductPrice.toString()
      this.infoForm.earnestMoney = row.earnestMoney.toString()
      this.infoForm.seriesNm = row.classNm
      this.infoForm.colorName = row.name
      this.modal = true
      this.title = '修改'
      this.isAddAndUpdate = true
      this.isDisable = true
      /* let selectV = {
        id: row.id,
        brand: row.brand,
        seriesNm: row.classNm,
        productCd: row.productCd,
        carProductNm: row.carProductNm,
        carProductStyle: row.carProductStyle,
        carProductCd: row.carProductCd,
        colorValue: row.carColourValue,
        colorNm: row.name,
        carProductAddress: row.carProductAddress,
        carProductPrice: row.carProductPrice,
        earnestMoney: row.earnestMoney,
        fileUrl: row.photoUrl
      }
      localStorage.setItem('selectPrice', JSON.stringify(selectV))
      this.$router.push({ name: 'priceAddPage' }) */
    },
    handleApplyCancel () {
      // this.$refs['infoForm'].resetFields()
      this.modal = false
      this.getList('cancel')
      this.checkForm = {
        isVerify: ''
      }
      this.infoForm = {
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
      }
      this.selectId = ''
    },
    handleSubmitApply () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          let data = {
            id: this.selectId.toString(),
            verifyStatus: this.checkForm.isVerify
          }
          verifyPrice(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('已审核！')
              this.$refs['checkForm'].resetFields()
              this.modal = false
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    // 提交审核
    toSubmitApply (row) {
      this.$Modal.warning({
        title: '提交审核',
        content: '确定要提交审核吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id.toString()
          }
          submitPriceDraft(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('提交审核成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    // 审核
    toApply (row) {
      this.modal = true
      this.title = '审核'
      this.isAddAndUpdate = false
      this.selectId = row.id
    },
    // 新增
    getDurationOption () {
      let isReadonly = !!this.selectId
      if (!isReadonly) {
        this.infoForm.brand = this.selectClass.brand
        this.infoForm.seriesNm = this.selectClass.seriesNm
        this.infoForm.carProductNm = this.selectClass.carProductNm
        this.infoForm.carProductStyle = this.selectClass.carProductStyle
      }
      let data = {
        productCd: this.selectClass.productCd.toString(),
        carProductNm: this.selectClass.carProductNm,
        carProductStyle: this.selectClass.carProductStyle
      }
      getCarVersionSelect(data).then(res => {
        if (res.data.code === '200') {
          this.durationOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
      /* let data = {
        productCd: this.selectClass.productCd,
        carProductNm: this.selectClass.carProductNm,
        carProductStyle: this.selectClass.carProductStyle
      }
      getDuration(data).then(res => {
        if (res.data.code === '200') {
          this.durationOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      }) */
    },
    getValueNull (value) {
      if (value === undefined || value === null || value === '') {
        this.colorDropOption = []
        this.infoForm.earnestMoney = ''
      }
    },
    getColorDropOption (carProductCd, earnestMoney) {
      this.infoForm.carProductCd = carProductCd
      this.infoForm.earnestMoney = earnestMoney.toString()
      let data = {
        carProductCd: carProductCd
      }
      colorDropdown(data).then(res => {
        if (res.data.code === '200') {
          this.colorDropOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleSubmit () {
      let data = {}
      if (this.selectId) {
        data = {
          id: this.selectId.toString(),
          carProductPrice: this.infoForm.carProductPrice
        }
      } else {
        data = {
          carProductCd: this.infoForm.carProductCd,
          carProductAddress: this.infoForm.carProductAddress,
          carProductPrice: this.infoForm.carProductPrice,
          colorId: this.infoForm.colorId
        }
      }
      addOrUpdateCarPrice(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.success(res.data.msg)
          this.handleApplyCancel()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  #basic-info{
    margin:0 50px;
  }
#suggestId{
  width:398px;
  height:30px;
}
  .ivu-card-head p, .ivu-card-head-inner{
    color:#F45416
  }
  .ivu-card-head{
    background-color:rgba(244,84,22,0.2)!important;
  }
  .padding-l{padding-left:30px;}
  .ivu-table-cell{
    padding-left: 8px;
    padding-right: 8px;
  }
</style>
