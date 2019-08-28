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
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType, getBrandSelect, getClassesSelect } from '@/api/common'
import { getAllCarType } from '@/api/partner/productPrice'
import { getSaleRangeProductList, getBoundToPartner, removeBoundToPartner } from '@/api/partner/saleRangeManage'
import TableExpandTree from '@/components/table_expand_tree'
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
      isShowReason: false,
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
                    key: 'brand',
                    align: 'left'
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
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.carProductKind === '1' ? '新能源' : params.row.carProductKind === '2' ? '燃油' : ''
                      )
                    }
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
                            display: (params.row.verifyStatus !== 1 && this.buttonList['194']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toBindingCompany(params.row)
                            }
                          }

                        }, this.getBtnName(params.row.onBound))
                      ])
                    }
                  }
                ],
                nameExpand: 'brand'
              }
            })
          }
        },
        {
          title: '品牌',
          key: 'brand',
          align: 'left'
        },
        {
          title: '车系',
          align: 'center',
          key: 'classNm'
        },
        {
          title: '产品名称',
          key: 'count',
          align: 'center',
          render: (h, params) => {
            return h('div',
              '产品' + params.row.carTypeCount + '个'
            )
          }
        }, {
          title: '产品版本',
          key: 'carProductVer',
          align: 'center',
          render: (h, params) => {
            return h('div',
              '版本' + params.row.count + '个'
            )
          }
        },
        {
          title: '产品类型',
          key: 'carProductKind',
          align: 'center',
          render: (h, params) => {
            return h('div', '（燃油、新能源）')
          }
        },
        {
          title: '在售状态',
          key: 'onSale',
          align: 'center',
          render: (h, params) => {
            return h('div', '【在售' + params.row.onSaleCount + '款、停产' + params.row.offSaleCount + '款】')
          }

        },
        {
          title: '审核状态',
          key: 'verifyStatus',
          align: 'center'
        },
        {
          title: '显示',
          key: 'onLine',
          align: 'center'
        },

        {
          title: '操作',
          key: 'handle',
          align: 'center'
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
        seriesNm: ''
      },
      classNmOption: [],
      seriesNmOption: [],
      carProductNmOption: [],
      carProductKindOption: [],
      query: {
        brand: '',
        classNm: '',
        carProductNm: '',
        carProductKind: ''
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
        }/*,
        {
          type: 'select',
          prop: 'carProductNm',
          label: '产品名称',
          placeholder: '请选择产品名称',
          selectOption: this.carProductNmOption,
          width: '140px'
        },
        {
          type: 'select',
          prop: 'carProductKind',
          label: '产品类型',
          placeholder: '请选择产品类型',
          selectOption: this.carProductKindOption,
          width: '140px'
        } */
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
                    }/*,
                    {
                      type: 'select',
                      prop: 'carProductNm',
                      label: '产品名称',
                      placeholder: '请选择产品名称',
                      selectOption: this.carProductNmOption,
                      width: '140px'
                    },
                    {
                      type: 'select',
                      prop: 'carProductKind',
                      label: '产品类型',
                      placeholder: '请选择产品类型',
                      selectOption: this.carProductKindOption,
                      width: '140px'
                    } */
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
            }/*,
            {
              type: 'select',
              prop: 'carProductNm',
              label: '产品名称',
              placeholder: '请选择产品名称',
              selectOption: this.carProductNmOption,
              width: '140px'
            },
            {
              type: 'select',
              prop: 'carProductKind',
              label: '产品类型',
              placeholder: '请选择产品类型',
              selectOption: this.carProductKindOption,
              width: '140px'
            } */
          ]
          this.$store.commit('setQueryData', arr)
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getClassSelect ({ obj }) {
      this.query.classNm = obj.classCd
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
        carProductNm: this.queryForm.carProductNm ? this.queryForm.carProductNm : '',
        carProductKind: this.queryForm.carProductKind ? this.queryForm.carProductKind : '',
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getSaleRangeProductList(data).then(res => {
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
    getBtnName (onBound) {
      let btnName = ''
      if (onBound === '1') {
        btnName = '解除绑定'
      } else if (onBound === '2') {
        btnName = '绑定'
      }
      return btnName
    },
    toBindingCompany (row) { // 1--已绑定 2--未绑定
      if (row.onBound === '1') {
        this.$Modal.warning({
          title: '解除绑定',
          content: '确定要解除绑定吗？',
          width: '400px',
          closable: true,
          onOk: () => {
            let data = {
              carProductCd: row.carProductCd
            }
            removeBoundToPartner(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success('成功解除绑定！')
                this.getList()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          }
        })
      } else if (row.onBound === '2') {
        this.$Modal.warning({
          title: '绑定',
          content: '确定要绑定吗？',
          width: '400px',
          closable: true,
          onOk: () => {
            let data = {
              carProductCd: row.carProductCd
            }
            getBoundToPartner(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success('成功绑定！')
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
