<template>
  <div class="add-page">
    <div style="min-height:200px;">
      <Card>
        <custom-form
          :isInline="true"
          :showFooter="false"
          :labelWidth="120"
          :infoForm="infoBasic"
          :FormItemDate="infoBasicData"
          :btnSubmit="'添加车辆'"
          :showBtnCancel="false"
          @on-form-submit="toNewAdd"
        ></custom-form>
        <Button type="primary" @click="toNewAdd" class="btnAdd">添加车辆</Button>
      </Card>
      <Card style="margin-top: 30px;">
        <custom-table
          :tableData="tableData"
          :tableColumns="tableColumns"
          :page="page"
          :queryForm="queryForm"
          @on-query-select-one="getClassesOption"
          @on-query-select-two="getClassSelect"
          @on-query-cancel-one="getQueryCancelOne"
          :queryFormItemData="queryFormItemData"
          @on-get-list="getList"
          @on-change-page="handlePage"
          @on-change-pageSize="handlePageSize"
        ></custom-table>
      </Card>
    </div>
    <Modal v-model="modal" title="绑定车辆" :mask-closeable="false" width="600" @on-cancel="handleCancel">
      <Form ref="formModel" :model="formModel" :rules="formModelRules" :label-width="180" inline>
        <FormItem prop="classNm" label="品牌">
          <Select v-model="formModel.classNm" clearable @on-change="classNmCancel" placeholder="请选择品牌" style="width:200px;">
            <Option v-for="item in classNmOption" @click.native="classNmSelect(item)" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="seriesNm" label="车系">
          <Select v-model="formModel.seriesNm" clearable @on-change="seriesNmCancel" placeholder="请选择车系" style="width:200px;">
            <Option v-for="item in seriesNmOption" @click.native="seriesNmSelect(item)"  :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="carProductNm" label="产品名称">
          <Select v-model="formModel.carProductNm" clearable @on-change="carProductNmCancel" placeholder="请选择产品名称" style="width:200px;">
            <Option v-for="item in carProductNmOption" @click.native="carProductNmSelect(item)" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="carProductStyle" label="产品款式">
          <Select v-model="formModel.carProductStyle" clearable @on-change="carProductStyleCancel" placeholder="请选择产品款式" style="width:200px;">
            <Option v-for="item in carProductStyleOption" @click.native="carProductStyleSelect(item)" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="carProductVer" label="产品版本">
          <Select v-model="formModel.carProductVer" clearable @on-change="carProductVerCancel" placeholder="请选择产品版本" style="width:200px;">
            <Option v-for="item in carProductVerOption" @click.native="carProductVerSelect(item)" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="carProductUcd" label="产品识别码">
          <Input v-model="formModel.carProductUcd" placeholder="" readonly style="width:200px;" />
        </FormItem>
      </Form>
      <div slot="footer" style="text-align: center">
        <Button type="primary" @click="handleSubmitBind">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { getBrandSelect, getClassesSelect } from '@/api/common'
import { getCarType, getCarProductStyle, getCarVersionSelect } from '@/api/partner/productPrice'
import { bindingProduct, financeCarloadData, cancelBinding } from '@/api/partner/financeProduct'
import TableExpandTree from '@/components/table_expand_tree'
export default {
  name: 'addPage',
  components: {
    CustomForm, CustomTable
  },
  data () {
    return {
      infoBasic: {
        bankName: '',
        classNm: '',
        repayTypeStr: '',
        downPaymentRatio: '',
        termStr: ''
      },
      infoBasicData: [
        {
          type: 'label',
          prop: 'bankName',
          label: '金融机构名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'classNm',
          label: '金融产品',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'repayTypeStr',
          label: '还款方式',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'downPaymentRatio',
          label: '首付比例',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'textAreaLabel',
          prop: 'termStr',
          label: '贷款期限及利率表',
          isUpdate: false,
          width: '200px'
        }
      ],
      modal: false,
      formModel: {
        classNm: '',
        seriesNm: '',
        carProductNm: '',
        carProductStyle: '',
        carProductVer: '',
        carProductUcd: ''
      },
      formModelRules: {
        classNm: [{ required: true, type: 'number', message: '此项必填', trigger: 'blur' }],
        seriesNm: [{ required: true, type: 'number', message: '此项必填', trigger: 'blur' }],
        carProductNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductStyle: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carProductVer: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      classNmOption: [],
      seriesNmOption: [],
      carProductNmOption: [],
      carProductStyleOption: [],
      carProductVerOption: [],
      selectQuery: {
        classCd: '',
        productCd: '',
        carProductStyle: '',
        carProductNm: ''
      },
      carProductCd: '',
      financeId: '',
      tableData: [],
      tableColumns: [
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
                tableColumnsExpand: [
                  {
                    type: 'expand',
                    width: 20,
                    render: (h, params) => {
                      return h(TableExpandTree, {
                        style: {
                          padding: 0
                        },
                        props: {
                          rowExpand: params.row
                        }
                      })
                    }
                  },
                  {
                    title: '品牌',
                    key: 'brandName',
                    align: 'left'
                  },
                  {
                    title: '车系',
                    align: 'center',
                    key: 'seriesName'
                  },
                  {
                    title: '产品名称',
                    key: 'carProductNm',
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
                    title: '显示',
                    key: 'onLine',
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.onLine === 1 ? '上线' : params.row.onLine === 2 ? '下线' : ''
                      )
                    }
                  },
                  {
                    title: '操作',
                    key: 'handle',
                    align: 'center',
                    render: (h, params) => {
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
                              this.toCancelBind(params.row)
                            }
                          }

                        }, '取消绑定')
                      ])
                    }
                  }
                ],
                nameExpand: 'brandName'
              }
            })
          }
        },
        {
          title: '品牌',
          key: 'brandName',
          align: 'left'
        },
        {
          title: '车系',
          align: 'center',
          key: 'seriesName'
        },
        {
          title: '产品名称',
          key: 'carProductNm',
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
          title: '显示',
          key: 'onLine',
          align: 'center',
          render: (h, params) => {
            return h('div', '')
          }
        },
        {
          title: '操作',
          key: 'handle',
          align: 'center'
        }
      ],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      queryForm: {
        classNm: '',
        seriesNm: '',
        carProductNm: '',
        carProductVer: ''
      },
      query: {
        brandClassCd: '',
        seriesClassCd: ''
      }

    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.queryData
    }
  },
  created () {
    if (localStorage.getItem('financeObj')) {
      let classNmStr = localStorage.getItem('financeObj')
      let classNmObj = JSON.parse(classNmStr)
      this.infoBasic = classNmObj
      this.financeId = classNmObj.financeId
    }
    this.getQueryOption()
    this.getList()
    this.getClassNmOption()
  },
  mounted () {
  },
  methods: {
    toNewAdd () {
      this.modal = true
    },
    handleCancel () {
      this.modal = false
      this.getList()
      this.carProductCd = ''
      this.formModel = {}
      this.seriesNmOption = []
      this.carProductNmOption = []
      this.carProductStyleOption = []
      this.carProductVerOption = []
    },
    getClassNmOption () {
      getBrandSelect().then(res => {
        if (res.data.code === '200') {
          this.classNmOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    classNmCancel () {
      if (this.formModel.classNm === undefined || this.formModel.classNm === null || this.formModel.classNm === '') {
        this.formModel = {}
        this.seriesNmOption = []
        this.carProductNmOption = []
        this.carProductStyleOption = []
        this.carProductVerOption = []
      }
    },
    classNmSelect (obj) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择品牌')
        return
      }
      this.selectQuery.classCd = obj.classCd
      this.formModel.seriesNm = ''
      this.formModel.carProductNm = ''
      this.formModel.carProductStyle = ''
      this.formModel.carProductVer = ''
      this.formModel.carProductUcd = ''
      this.carProductNmOption = []
      this.carProductStyleOption = []
      this.carProductVerOption = []
      let data = {
        parentClassCd: obj.classCd
      }
      getClassesSelect(data).then(res => {
        if (res.data.code === '200') {
          this.seriesNmOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    seriesNmCancel () {
      if (this.formModel.seriesNm === undefined || this.formModel.seriesNm === null || this.formModel.seriesNm === '') {
        this.formModel.seriesNm = ''
        this.formModel.carProductNm = ''
        this.formModel.carProductStyle = ''
        this.formModel.carProductVer = ''
        this.formModel.carProductUcd = ''
        this.carProductNmOption = []
        this.carProductStyleOption = []
        this.carProductVerOption = []
      }
    },
    seriesNmSelect (obj) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择车系')
        return
      }
      this.selectQuery.productCd = obj.value
      this.formModel.carProductNm = ''
      this.formModel.carProductStyle = ''
      this.formModel.carProductVer = ''
      this.formModel.carProductUcd = ''
      this.carProductStyleOption = []
      this.carProductVerOption = []
      let data = {
        id: obj.value.toString()
      }
      getCarType(data).then(res => {
        if (res.data.code === '200') {
          this.carProductNmOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    carProductNmCancel () {
      if (this.formModel.carProductNm === undefined || this.formModel.carProductNm == null || this.formModel.carProductNm === '') {
        this.formModel.carProductNm = ''
        this.formModel.carProductStyle = ''
        this.formModel.carProductVer = ''
        this.formModel.carProductUcd = ''
        this.carProductStyleOption = []
        this.carProductVerOption = []
      }
    },
    carProductNmSelect (obj) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择产品名称')
        return
      }
      this.selectQuery.carProductNm = obj.label
      this.formModel.carProductStyle = ''
      this.formModel.carProductVer = ''
      this.formModel.carProductUcd = ''
      this.carProductVerOption = []
      let data = {
        id: this.selectQuery.productCd.toString(),
        carProductNm: obj.label
      }
      getCarProductStyle(data).then(res => {
        if (res.data.code === '200') {
          this.carProductStyleOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    carProductStyleCancel () {
      if (this.formModel.carProductStyle === undefined || this.formModel.carProductStyle == null || this.formModel.carProductStyle === '') {
        this.formModel.carProductStyle = ''
        this.formModel.carProductVer = ''
        this.formModel.carProductUcd = ''
        this.carProductVerOption = []
      }
    },
    carProductStyleSelect (obj) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择产品款式')
        return
      }
      this.selectQuery.carProductStyle = obj.label
      this.formModel.carProductVer = ''
      this.carProductVerOption = []
      let data = {
        productCd: this.selectQuery.productCd.toString(),
        carProductNm: this.selectQuery.carProductNm,
        carProductStyle: this.selectQuery.carProductStyle
      }
      getCarVersionSelect(data).then(res => {
        if (res.data.code === '200') {
          this.carProductVerOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    carProductVerCancel () {
      if (this.formModel.carProductVer === undefined || this.formModel.carProductVer == null || this.formModel.carProductVer === '') {
        this.formModel.carProductVer = ''
        this.formModel.carProductUcd = ''
      }
    },
    carProductVerSelect (obj) {
      this.formModel.carProductUcd = obj.value
      this.carProductCd = obj.carProductCd
    },
    handleSubmitBind () {
      this.$refs['formModel'].validate((valid) => {
        if (valid) {
          let data = {
            carProductCd: this.carProductCd,
            financeId: this.financeId.toString()
          }
          bindingProduct(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('成功绑定！')
              this.handleCancel()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    getList () {
      let data = {
        financeId: this.financeId,
        brandClassCd: this.query.brandClassCd,
        seriesClassCd: this.query.seriesClassCd,
        carProductNm: this.queryForm.carProductNm ? this.queryForm.carProductNm : '',
        carProductVer: this.queryForm.carProductVer ? this.queryForm.carProductVer : '',
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      financeCarloadData(data).then(res => {
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
    getQueryOption () {
      getBrandSelect().then(res => {
        if (res.data.code === '200') {
          this.classNmOption = res.data.list
          let arr = [
            {
              type: 'select',
              prop: 'classNm',
              label: '品牌',
              selectOption: this.classNmOption,
              isCascade: 'twoCascadeOne',
              placeholder: '请选择品牌',
              width: '140px'
            },
            {
              type: 'select',
              prop: 'seriesNm',
              label: '车系',
              placeholder: '请选择车系',
              isCascade: 'twoCascadeTwo',
              selectOption: this.seriesNmOption,
              width: '140px'
            },
            {
              type: 'input',
              prop: 'carProductNm',
              label: '产品名称',
              placeholder: '请输入产品名称',
              width: '140px'
            },
            {
              type: 'input',
              prop: 'carProductVer',
              label: '产品版本',
              placeholder: '请输入产品版本',
              width: '140px'
            }
          ]
          this.$store.commit('setQueryData', arr)
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getClassesOption ({ obj }) {
      if (obj === undefined || obj === null || obj === '') {
        this.$Message.info('请先选择品牌')
        return
      }
      this.query.brandClassCd = obj.classCd
      let data = {
        parentClassCd: obj.classCd
      }
      getClassesSelect(data).then(res => {
        if (res.data.code === '200') {
          this.seriesNmOption = res.data.list
          let arr = [
            {
              type: 'select',
              prop: 'classNm',
              label: '品牌',
              selectOption: this.classNmOption,
              isCascade: 'twoCascadeOne',
              placeholder: '请选择品牌',
              width: '140px'
            },
            {
              type: 'select',
              prop: 'seriesNm',
              label: '车系',
              placeholder: '请选择车系',
              isCascade: 'twoCascadeTwo',
              selectOption: this.seriesNmOption,
              width: '140px'
            },
            {
              type: 'input',
              prop: 'carProductNm',
              label: '产品名称',
              placeholder: '请输入产品名称',
              width: '140px'
            },
            {
              type: 'input',
              prop: 'carProductVer',
              label: '产品版本',
              placeholder: '请输入产品版本',
              width: '140px'
            }
          ]
          this.$store.commit('setQueryData', arr)
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getClassSelect ({ obj }) {
      this.query.seriesClassCd = obj.classCd
    },
    getQueryCancelOne () {
      this.queryForm.classNm = ''
      this.queryForm.seriesNm = ''
      this.query.brandClassCd = ''
      this.query.seriesClassCd = ''
      let arr = [
        {
          type: 'select',
          prop: 'classNm',
          label: '品牌',
          selectOption: this.classNmOption,
          isCascade: 'twoCascadeOne',
          placeholder: '请选择品牌',
          width: '140px'
        },
        {
          type: 'select',
          prop: 'seriesNm',
          label: '车系',
          placeholder: '请选择车系',
          isCascade: 'twoCascadeTwo',
          selectOption: [],
          width: '140px'
        },
        {
          type: 'input',
          prop: 'carProductNm',
          label: '产品名称',
          placeholder: '请输入产品名称',
          width: '140px'
        },
        {
          type: 'input',
          prop: 'carProductVer',
          label: '产品版本',
          placeholder: '请输入产品版本',
          width: '140px'
        }
      ]
      this.$store.commit('setQueryData', arr)
    },
    toCancelBind (row) {
      this.$Modal.warning({
        title: '取消绑定',
        content: '确定要取消绑定吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.carFinanceId.toString()
          }
          cancelBinding(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('取消绑定成功！')
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
  .btnAdd{float:right;position: relative;bottom:70px;right:20%;}
</style>
