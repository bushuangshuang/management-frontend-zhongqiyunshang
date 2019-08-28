<template>
  <div class="basic-info">
    <div style="min-height:200px;">
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
      <Modal v-model="modal" title="审核" :mask-closeable="false" width="600" @on-cancel="handleCancel">
        <Form ref="checkForm" :model="checkForm" label-position="right" :rules="checkRules" :label-width="140">
          <FormItem label="审核意见" prop="isVerify">
            <RadioGroup v-model="checkForm.isVerify" @on-change="showReason">
              <Radio label="2">&nbsp;&nbsp;通过</Radio>
              <Radio label="3">&nbsp;&nbsp;不通过&nbsp;&nbsp;&nbsp;</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="不通过原因" prop="verifyReason" v-if="isShowReason">
            <Input v-model="checkForm.verifyReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入不通过原因" style="width: 240px;" />
          </FormItem>
        </Form>
        <div slot="footer" style="text-align: center">
          <Button type="primary" @click="handleSubmitApply">提交</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType, getBrandSelect, getClassesSelect } from '@/api/common'
import { getAllCarType } from '@/api/partner/productPrice'
import { getSaleRangeList, setVerifyStatus } from '@/api/partner/saleRangeManage'
import { storage } from '@/libs/common'
export default {
  name: 'index',
  components: {
    CustomForm,
    CustomTable
  },
  data () {
    return {
      loading: false,
      buttonList: [],
      modal: false,
      checkForm: {
        isVerify: '',
        verifyReason: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      checkId: '',
      isShowReason: false,
      tableColumns: [
        {
          title: '服务商名称',
          key: 'partnerNm',
          align: 'left',
          width: 200
        },
        {
          title: '品牌',
          key: 'brand',
          align: 'center'
        },
        {
          title: '车系',
          align: 'center',
          key: 'classNm'
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
          title: '在售状态',
          key: 'onSale',
          align: 'center',
          render: (h, params) => {
            return h('div',
              params.row.onSale === 1 ? '在售' : params.row.onSale === 0 ? '停产' : ''
            )
          }
        },
        {
          title: '审核状态',
          key: 'verifyStatusStr',
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
                  color: '#2d8cf0',
                  display: (params.row.verifyStatus === 1 && this.buttonList['196']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toApply(params.row)
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
      queryForm: {
        classNm: '',
        seriesNm: '',
        partnerNm: ''
      },
      classNmOption: [],
      seriesNmOption: [],
      carProductNmOption: [],
      carProductKindOption: [],
      query: {
        brand: '',
        classNm: '',
        partnerNm: ''
      },
      onSaleOption: [],
      isActiveOption: [],
      carProductCd: ''
    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.queryData
    }
  },
  created () {
    this.getList()
    this.getQueryOption()
    this.getOnSaleOption()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    toApply (row) {
      this.modal = true
      this.checkId = row.id
    },
    handleCancel () {
      this.getList()
      this.modal = false
      if (this.$refs['checkForm']) this.$refs['checkForm'].resetFields()
    },
    showReason (value) {
      if (value === '3') {
        this.isShowReason = true
        this.checkForm.verifyReason = ''
      } else {
        this.isShowReason = false
        this.checkForm.verifyReason = ''
      }
    },
    handleSubmitApply () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          let data = {
            id: this.checkId.toString(),
            verifyStatus: this.checkForm.isVerify.toString(),
            verifyReason: this.checkForm.verifyReason
          }
          setVerifyStatus(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success(res.data.msg)
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
    getOnSaleOption () {
      let data = {
        type: 'ON_SALE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.onSaleOption = res.data.list
        }
      })
    },
    getQueryCancelOne () {
      this.queryForm.classNm = ''
      this.queryForm.seriesNm = ''
      this.query.brand = ''
      this.query.classNm = ''
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
        }, {
          type: 'input',
          prop: 'partnerNm',
          label: '服务商名称',
          placeholder: '请输入产品名称',
          width: '140px'
        }
      ]
      this.$store.commit('setQueryData', arr)
    },
    getQueryOption () {
      getAllCarType().then(res => {
        if (res.data.code === '200') {
          this.carProductNmOption = res.data.list
          let data = {
            type: 'CAR_PRODUCT_KIND'
          }
          loadDataByType(data).then(res => {
            if (res.data.code === '200') {
              this.carProductKindOption = res.data.list
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
                      prop: 'partnerNm',
                      label: '服务商名称',
                      placeholder: '请输入产品名称',
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
      this.query.brand = obj.classCd
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
            }, {
              type: 'input',
              prop: 'partnerNm',
              label: '服务商名称',
              placeholder: '请输入产品名称',
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
      // this.query.classNm = obj.classCd
      this.query.classNm = obj.value
    },
    getStatus (value, name) {
      let arr = []
      if (name === 'onSale') {
        arr = this.onSaleOption
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
        brand: this.query.brand,
        classNm: this.query.classNm,
        partnerNm: this.query.partnerNm,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getSaleRangeList(data).then(res => {
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
    }
  }
}
</script>

<style lang="less">
  td.ivu-table-expanded-cell{
    padding:0 !important;
  }
  .ivu-table-border td:last-child{
    border-right:none!important;
  }
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
</style>
