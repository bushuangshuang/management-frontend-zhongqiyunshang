<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :isAdd="this.buttonList['186']"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        :queryForm="query"
        :queryFormItemData="queryFormItemData"
        @on-add-page="toNewAdd"
        @on-get-list="getList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
      ></custom-table>
      <Modal v-model="modal" :title="title" :mask-closeable="false" width="600" @on-cancel="handleApplyCancel">
        <custom-form v-if="isNewAdd"
                     :isInline="true"
                     :labelWidth="140"
                     :infoForm="infoForm"
                     :ruleInfoForm="ruleInfoForm"
                     :FormItemDate="FormItemDateModal"
                     :showBtnCancel="false"
                     @on-form-submit="handleUpdateSubmit"
        ></custom-form>
        <Form v-if="!isNewAdd" ref="infoFormTerm" :model="infoFormTerm" :rules="ruleInfoFormTerm" label-width="140">
          <FormItem label="贷款期限" prop="loanTerm">
            <Input v-model="infoFormTerm.loanTerm" placeholder="请输入贷款期限" style="width:200px;" />
          </FormItem>
          <FormItem label="利率" prop="interestRate">
            <Input v-model="infoFormTerm.interestRate" placeholder="请输入利率" style="width:200px;" />
            <span style="margin-left:6px;">%</span>
          </FormItem>
          <div class="footerDiv">
            <Button type="primary" @click="handleUpdateSubmitTerms">提交</Button>
          </div>
        </Form>
        <!--<custom-form v-if="!isNewAdd"
                     :isInline="true"
                     :labelWidth="140"
                     :infoForm="infoFormTerm"
                     :ruleInfoForm="ruleInfoFormTerm"
                     :FormItemDate="FormItemDateModalTerm"
                     :showBtnCancel="false"
                     @on-form-submit="handleUpdateSubmitTerm"
        ></custom-form>-->
        <div slot="footer" style="text-align: center">

        </div>
      </Modal>
      <Modal v-model="modalV" title="审核" :mask-closeable="false" width="600" @on-cancel="handleCancelV">
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
import { loadDataByType } from '@/api/common'
import { storage } from '@/libs/common'
import { getFinanceList, addFinanceProduct, addFinanceTerm, updateFinanceProduct, deleteFinanceProduct, updateFinanceTerm, deleteFinanceTerm, toSubmitVerify } from '@/api/partner/financeProduct'
import TableExpandTree from '@/components/table_expand_tree'
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
      query: {
        classNm: '',
        bankName: ''
      },
      queryFormItemData: [
        {
          type: 'input',
          prop: 'bankName',
          label: '金融机构',
          placeholder: '请输入金融机构',
          width: '140px'
        },
        {
          type: 'input',
          prop: 'classNm',
          label: '金融产品',
          placeholder: '请输入金融产品',
          width: '140px'
        }
      ],
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
                    title: '金融机构名称',
                    key: 'bankName',
                    align: 'left'
                  },
                  {
                    title: '金融产品',
                    align: 'classNm',
                    key: 'classNm'
                  },
                  {
                    title: '还款方式',
                    key: 'repayTypeStr',
                    align: 'center'
                  },
                  {
                    title: '首付比例',
                    key: 'downPaymentRatio',
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.downPaymentRatio ? params.row.downPaymentRatio + '%' : params.row.downPaymentRatio
                      )
                    }
                  },
                  {
                    title: '期限',
                    key: 'loanTerm',
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.loanTerm ? params.row.loanTerm + '期' : params.row.loanTerm
                      )
                    }
                  },
                  {
                    title: '贷款利率',
                    key: 'interestRate',
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.interestRate ? params.row.interestRate + '%' : params.row.interestRate
                      )
                    }
                  },
                  {
                    title: '状态',
                    key: 'statusStr',
                    align: 'center'
                  },
                  {
                    title: '操作',
                    key: 'handle',
                    align: 'center',
                    width: 240,
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (this.buttonList['192']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toEditTerm(params.row)
                            }
                          }

                        }, '编辑'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (this.buttonList['193']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toEditStatusTerm(params.row)
                            }
                          }

                        }, params.row.status === 0 ? '生效' : params.row.status === 1 ? '失效' : params.row.status)
                      ])
                    }
                  }
                ],
                nameExpand: 'bankName'
              }
            })
          }
        },
        {
          title: '金融机构名称',
          key: 'bankName',
          align: 'left'
        },
        {
          title: '金融产品',
          align: 'classNm',
          key: 'classNm'
        },
        {
          title: '还款方式',
          key: 'repayTypeStr',
          align: 'center'
        },
        {
          title: '首付比例',
          key: 'downPaymentRatio',
          align: 'center',
          render: (h, params) => {
            return h('div',
              params.row.downPaymentRatio ? params.row.downPaymentRatio + '%' : params.row.downPaymentRatio
            )
          }
        },
        {
          title: '期限',
          key: 'loanTerm',
          align: 'center'
        },
        {
          title: '贷款利率',
          key: 'interestRate',
          align: 'center'
        },
        {
          title: '状态',
          key: 'statusStr',
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'verifyStatusStr',
          align: 'center'
        },
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          width: 240,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.status === 0 && this.buttonList['188']) ? 'none' : 'inline-block'
                },
                on: {
                  click: () => {
                    this.toBinding(params.row)
                  }
                }

              }, '绑定'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (this.buttonList['191']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toAdd(params.row)
                  }
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (this.buttonList['187']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toEdit(params.row)
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
                  display: (this.buttonList['189']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    // this.toDelete(params.row)
                    this.toEditStatus(params.row)
                  }
                }
              }, params.row.status === 0 ? '生效' : params.row.status === 1 ? '失效' : params.row.status),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.verifyStatus === 1 && this.buttonList['190']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toVerify(params.row)
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
      title: '',
      isNewAdd: true,
      repayTypeOption: [],
      infoForm: {
        bankName: '',
        classNm: '',
        downPaymentRatio: '',
        repayType: ''
      },
      ruleInfoForm: {
        bankName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        classNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        downPaymentRatio: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ],
        repayType: [{ required: true, message: '此项必填', trigger: 'change' }]
      },
      FormItemDateModal: [],
      financeId: '',
      termId: '',
      infoFormTerm: {
        loanTerm: '',
        interestRate: ''
      },
      ruleInfoFormTerm: {
        loanTerm: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+$/, message: '请输入整数', trigger: 'blur' }
        ],
        interestRate: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ]
      },
      FormItemDateModalTerm: [
        {
          type: 'input',
          prop: 'loanTerm',
          label: '贷款期限',
          placeholder: '请输入贷款期限',
          width: '200px'
        },
        {
          type: 'inputUnit',
          prop: 'interestRate',
          label: '利率',
          unit: '%',
          placeholder: '请输入利率',
          width: '200px'
        }
      ],
      modalV: false,
      checkForm: {
        isVerify: '',
        verifyReason: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      checkId: '',
      isShowReason: false
    }
  },
  computed: {
  },
  created () {
    this.getList()
    this.getRepayTypeOption()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    getRepayTypeOption () {
      let data = {
        'type': 'REPAY_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.repayTypeOption = res.data.list
          this.FormItemDateModal = [
            {
              type: 'input',
              prop: 'bankName',
              label: '金融机构名称',
              placeholder: '请输入金融机构名称',
              width: '200px'
            },
            {
              type: 'input',
              prop: 'classNm',
              label: '金融产品',
              placeholder: '请输入金融产品',
              width: '200px'
            },
            {
              type: 'select',
              prop: 'repayType',
              label: '还款方式',
              selectOption: this.repayTypeOption,
              placeholder: '请选择还款方式',
              width: '200px'
            },
            {
              type: 'inputUnit',
              prop: 'downPaymentRatio',
              label: '首付比例',
              unit: '%',
              placeholder: '请输入首付比例',
              width: '200px'
            }
          ]
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getList () {
      let data = {
        bankName: this.query.bankName,
        classNm: this.query.classNm,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getFinanceList(data).then(res => {
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
    toNewAdd () {
      this.modal = true
      this.title = '新增'
      this.isNewAdd = true
    },
    handleApplyCancel () {
      this.getList()
      this.modal = false
      this.financeId = ''
      this.termId = ''
      this.infoForm = {}
      this.infoFormTerm = {}
      // this.isNewAdd = true
    },
    toBinding (row) {
      if (!!row.loanTerm && !!row.interestRate) {
        let termList = row.childList
        let termStr = ''
        termList.forEach(item => {
          termStr += (item.loanTerm + '期-' + item.interestRate + '%' + '\n')
        })
        let financeObj = {
          financeId: row.id,
          bankName: row.bankName,
          classNm: row.classNm,
          repayTypeStr: row.repayTypeStr,
          downPaymentRatio: row.downPaymentRatio + '%',
          termStr: termStr
        }
        localStorage.setItem('financeObj', JSON.stringify(financeObj))
        this.$router.push({ name: 'financeBindingPage' })
      } else {
        this.$Message.info('请先添加期限和利率再绑定！')
      }
    },
    handleUpdateCancel () {
      this.infoForm = {}
      this.getList()
      this.modal = false
      this.financeId = ''
      this.isNewAdd = false
    },
    toAdd (row) {
      this.modal = true
      this.title = '添加期限及利率'
      this.isNewAdd = false
      this.financeId = row.id
    },
    handleUpdateSubmit ({ infoForm }) {
      if (this.financeId) { // 修改
        let data = {
          id: this.financeId,
          bankName: infoForm.bankName,
          classNm: infoForm.classNm,
          downPaymentRatio: infoForm.downPaymentRatio,
          repayType: infoForm.repayType
        }
        updateFinanceProduct(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.success(res.data.msg)
            this.handleApplyCancel()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      } else { // 新增
        let data = {
          bankName: infoForm.bankName,
          classNm: infoForm.classNm,
          downPaymentRatio: infoForm.downPaymentRatio,
          repayType: infoForm.repayType
        }
        addFinanceProduct(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.success(res.data.msg)
            this.handleApplyCancel()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
    },
    handleUpdateSubmitTerms () {
      this.$refs['infoFormTerm'].validate((valid) => {
        if (valid) {
          if (this.termId) {
            let data = {
              id: this.termId,
              loanTerm: this.infoFormTerm.loanTerm,
              interestRate: this.infoFormTerm.interestRate
            }
            updateFinanceTerm(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleApplyCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          } else {
            let data = {
              financeId: this.financeId,
              loanTerm: this.infoFormTerm.loanTerm,
              interestRate: this.infoFormTerm.interestRate
            }
            addFinanceTerm(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleApplyCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          }
        }
      })
    },
    handleUpdateSubmitTerm ({ infoForm }) {
      if (this.termId) {
        let data = {
          id: this.termId,
          loanTerm: infoForm.loanTerm,
          interestRate: infoForm.interestRate
        }
        updateFinanceTerm(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.success(res.data.msg)
            this.handleApplyCancel()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      } else {
        let data = {
          financeId: this.financeId,
          loanTerm: infoForm.loanTerm,
          interestRate: infoForm.interestRate
        }
        addFinanceTerm(data).then(res => {
          if (res.data.code === '200') {
            this.$Message.success(res.data.msg)
            this.handleApplyCancel()
          } else {
            this.$Message.info(res.data.msg)
          }
        })
      }
    },
    toEdit (row) {
      this.title = '编辑'
      this.isNewAdd = true
      this.infoForm = row
      this.infoForm.downPaymentRatio = row.downPaymentRatio ? row.downPaymentRatio.toString() : row.downPaymentRatio
      this.financeId = row.id
      this.modal = true
    },
    toDelete (row) {
      this.$Modal.warning({
        title: '删除',
        content: '确定要删除吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id
          }
          deleteFinanceProduct(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('删除成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    toEditTerm (row) {
      this.title = '编辑期限及利率'
      this.isNewAdd = false
      this.infoFormTerm = row
      this.infoFormTerm.loanTerm = row.loanTerm ? row.loanTerm.toString() : row.loanTerm
      this.infoFormTerm.interestRate = row.interestRate ? row.interestRate.toString() : row.interestRate
      this.termId = row.id
      this.modal = true
    },
    toDeleteTerm (row) {
      this.$Modal.warning({
        title: '删除',
        content: '确定要删除期限和利率吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id
          }
          deleteFinanceTerm(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('删除成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    toEditStatus (row) {
      // 0失效 1生效
      let tipMsg = ''
      let isStatus = row.status.toString()
      if (row.status === 0) {
        tipMsg = '生效'
        isStatus = '1'
      } else {
        tipMsg = '失效'
        isStatus = '0'
      }
      this.$Modal.warning({
        title: '状态',
        content: '确定要' + tipMsg + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id,
            status: isStatus
          }
          deleteFinanceProduct(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('状态修改成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    toEditStatusTerm (row) {
      // 0失效 1生效
      let tipMsg = ''
      let isStatus = row.status.toString()
      if (row.status === 0) {
        tipMsg = '生效'
        isStatus = '1'
      } else {
        tipMsg = '失效'
        isStatus = '0'
      }
      this.$Modal.warning({
        title: '状态',
        content: '确定要' + tipMsg + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id,
            status: isStatus
          }
          deleteFinanceTerm(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('状态修改成功！')
              this.getList()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    toVerify (row) {
      this.modalV = true
      this.checkId = row.id
    },
    handleCancelV () {
      this.getList()
      this.modalV = false
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
            id: this.checkId,
            verifyStatus: this.checkForm.isVerify,
            verifyReason: this.checkForm.verifyReason
          }
          toSubmitVerify(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success(res.data.msg)
              this.$refs['checkForm'].resetFields()
              this.modalV = false
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
  .footerDiv{
    width:100%;
    text-align: center
  }
</style>
