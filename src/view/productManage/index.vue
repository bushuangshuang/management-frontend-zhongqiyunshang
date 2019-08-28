<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :isAdd="this.buttonList['180']"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        :queryForm="queryForm"
        @on-query-select-one="getClassesOption"
        @on-query-select-two="getClassSelect"
        @on-query-cancel-one="getQueryCancelOne"
        :queryFormItemData="queryFormItemData"
        @on-add-page="toAddPage"
        @on-get-list="getList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
      ></custom-table>
      <Modal v-model="modal" :title="title" :mask-closeable="false" :width="width" @on-cancel="handleApplyCancel">
        <div v-if="isEditColor">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="colorForm"
            :ruleInfoForm="colorRule"
            :FormItemDate="FormItemDate"
            @on-form-submit="handleSubmitColor"
          ></custom-form>
          <Table class="marginTop20" border :columns="tableColumnsColor" :data="tableDataColor"></Table>
        </div>
        <div v-if="!isEditColor">
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
          <Button v-if="!isEditColor" class="btn1" type="text" @click="handleApplyCancel">取消</Button>
          <Button v-if="!isEditColor" type="primary" @click="handleSubmitApply">提交</Button>
        </div>
      </Modal>
      <Modal title="查看图片" v-model="visible">
        <img :src="getFileUrl(colorPhoto)" v-if="visible" style="width: 100%">
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType, getBrandSelect, getClassesSelect, imgFileUrl, checkActiveByClasses } from '@/api/common'
import { getProductList, getCarDetailPage, submitDraft, verifyProduct, deleteProduct, setOnlineStatus, getAllCarType,
  addOrModifyColor, colorList, setColorStatus } from '@/api/partner/productPrice'
import { setIsActive } from '@/api/partner/basicInfo'
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
      visible: false,
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
                    key: 'verifyStatus',
                    align: 'center',
                    render: (h, params) => {
                      return h('div',
                        params.row.verifyStatus === 0 ? '草稿' : params.row.verifyStatus === 1 ? '待审核' : params.row.verifyStatus === 2 ? '审核通过' : params.row.verifyStatus === 3 ? '审核不通过' : ''
                      )
                    }
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
                    width: 210,
                    render: (h, params) => {
                      return h('div', [
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: params.row.verifyStatus === 0 ? 'none' : 'inline-block'
                          },
                          on: {
                            click: () => {
                              this.toShowDetail(params.row)
                            }
                          }
                        }, '查看详情'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (params.row.verifyStatus === 0 && this.buttonList['181']) ? 'inline-block' : 'none'
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
                            color: '#2d8cf0'
                          },
                          on: {
                            click: () => {
                              this.toAddAndEditColor(params.row)
                            }
                          }
                        }, '编辑颜色'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (params.row.verifyStatus === 0) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toSubmitApply(params.row)
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
                            display: params.row.verifyStatus === 0 ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toDelete(params.row)
                            }
                          }
                        }, '删除'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (params.row.verifyStatus === 1 && this.buttonList['182']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toApply(params.row)
                            }
                          }
                        }, '审核'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: params.row.verifyStatus === 2 ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toOnLine(params.row)
                            }
                          }
                        }, params.row.onLine === 1 ? '下线' : '上线')

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
          align: 'center'
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
          align: 'center',
          width: 210
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
        carProductNm: '',
        carProductKind: ''
      },
      classNmOption: [],
      seriesNmOption: [],
      carProductNmOption: [],
      carProductKindOption: [],
      selectClass: {
        classNm: '',
        seriesNm: '',
        seriesId: ''
      },
      query: {
        brand: '',
        classNm: '',
        carProductNm: '',
        carProductKind: ''
      },
      onSaleOption: [],
      isActiveOption: [],
      modal: false,
      checkForm: {
        isVerify: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      carProductCd: '',
      title: '',
      width: 600,
      isEditColor: false,
      colorForm: {
        carProductColour: '',
        carColourValue: '',
        fileUrl: ''
      },
      colorRule: {
        carProductColour: [{ required: true, message: '此项必填', trigger: 'blur' }],
        carColourValue: [{ required: true, message: '此项必填', trigger: 'blur' }],
        fileUrl: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      FormItemDate: [
        {
          type: 'input',
          prop: 'carProductColour',
          label: '颜色名称',
          placeholder: '请输入颜色名称',
          width: '200px'
        }, {
          type: 'colorPicker',
          prop: 'carColourValue',
          label: '色值',
          colors: [],
          placeholder: '请输入色值',
          width: '200px'
        }, {
          type: 'file',
          fileShow: true,
          prop: 'fileUrl',
          label: '颜色图片',
          width: '200px'
        }
      ],
      tableColumnsColor: [
        {
          title: '颜色名称',
          key: 'carProductColour',
          align: 'center'
        },
        {
          title: '色值',
          align: 'center',
          key: 'carColourValue'
        },
        {
          title: '颜色图片',
          key: 'colorPhoto',
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: imgFileUrl + params.row.colorPhoto,
                style: 'width:80px;height:50px;margin:8px;border-radius:2px;vertical-align: middle;'
              },
              on: {
                click: () => {
                  this.toShowColorPhoto(params.row.colorPhoto)
                }
              }
            })
          }
        },
        {
          title: '状态',
          align: 'center',
          key: 'statusStr'
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
                    this.toEditColor(params.row)
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
                },
                on: {
                  click: () => {
                    this.toEditStatus(params.row)
                  }
                }
              }, params.row.status === 1 ? '停用' : '启用')
            ])
          }
        }
      ],
      colorPhoto: '',
      tableDataColor: [],
      selectColorId: '',
      buttonList: []
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
      this.selectClass = {
        classNm: '',
        seriesNm: '',
        seriesId: ''
      }
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
      this.selectClass.classNm = obj.label
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
      this.selectClass.seriesId = obj.value
      this.selectClass.seriesNm = obj.label
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
      getProductList(data).then(res => {
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
    toAddPage () {
      if (this.selectClass.classNm === undefined || this.selectClass.classNm === null || this.selectClass.classNm === '') {
        this.$Message.info('请先选择品牌及系列后再点击新增')
        return
      }
      if (this.selectClass.seriesId === undefined || this.selectClass.seriesId === null || this.selectClass.seriesId === '') {
        this.$Message.info('请先选择系列后再点击新增')
        return
      }
      let data = {
        brandClassCd: this.query.brand,
        seriesClassCd: this.query.classNm
      }
      checkActiveByClasses(data).then(res => {
        if (res.data.code === '200') {
          this.clearLocalValue()
          localStorage.setItem('classNmObj', JSON.stringify(this.selectClass))
          this.$router.push({ name: 'productAddPage' })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toEdit (row) {
      let obj = {
        classNm: row.brand.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
        seriesNm: row.classNm,
        seriesId: row.productCd
      }
      this.clearLocalValue()
      localStorage.setItem('classNmObj', JSON.stringify(obj))
      let data = {
        carId: row.carProductCd
      }
      getCarDetailPage(data).then(res => {
        if (res.data.code === '200') {
          let tCarBasicObj = res.data.CarDetail.tCarBasic
          tCarBasicObj.carProductPrice = tCarBasicObj.carProductPrice ? tCarBasicObj.carProductPrice.toString() : tCarBasicObj.carProductPrice
          tCarBasicObj.earnestMoney = tCarBasicObj.earnestMoney ? tCarBasicObj.earnestMoney.toString() : tCarBasicObj.earnestMoney
          tCarBasicObj.onSale = tCarBasicObj.onSale ? tCarBasicObj.onSale.toString() : tCarBasicObj.onSale
          localStorage.setItem('tCarBasic', JSON.stringify(res.data.CarDetail.tCarBasic))
          localStorage.setItem('tCarAdas', JSON.stringify(res.data.CarDetail.tCarAdas))
          localStorage.setItem('tCarChassis', JSON.stringify(res.data.CarDetail.tCarChassis))
          localStorage.setItem('tCarEconfiguration', JSON.stringify(res.data.CarDetail.tCarEconfiguration))
          localStorage.setItem('tCarEnt', JSON.stringify(res.data.CarDetail.tCarEnt))
          localStorage.setItem('tCarIconfiguration', JSON.stringify(res.data.CarDetail.tCarIconfiguration))
          localStorage.setItem('tCarPower', JSON.stringify(res.data.CarDetail.tCarPower))
          localStorage.setItem('tCarSecurity', JSON.stringify(res.data.CarDetail.tCarSecurity))
          localStorage.setItem('tCarSize', JSON.stringify(res.data.CarDetail.tCarSize))
          this.$router.push({ name: 'productAddPage' })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toAddAndEditColor (row) {
      this.carProductCd = row.carProductCd
      this.getColorList()
      this.title = '编辑颜色'
      this.isEditColor = true
      this.width = 800
      this.colorForm = {
        carProductColour: '',
        carColourValue: '',
        fileUrl: ''
      }
      this.modal = true
    },
    getFileUrl (url) {
      let fileUrl = ''
      if (url !== undefined && url !== null && url !== '') {
        fileUrl = imgFileUrl + url
      }
      return fileUrl
    },
    toShowColorPhoto (url) {
      this.colorPhoto = url
      this.visible = true
    },
    getColorList () {
      let data = {
        carProductCd: this.carProductCd
      }
      colorList(data).then(res => {
        if (res.data.code === '200') {
          this.tableDataColor = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toEditColor (row) {
      this.selectColorId = row.id
      this.colorForm = row
      this.colorForm.fileUrl = row.colorPhoto
    },
    toEditStatus (row) {
      // 0停用 1启用
      let tipMsg = ''
      let status = row.status.toString()
      if (row.status === 0) {
        tipMsg = '启用'
        status = '1'
      } else {
        tipMsg = '停用'
        status = '0'
      }
      this.$Modal.warning({
        title: '状态',
        content: '确定要' + tipMsg + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id.toString(),
            status: status
          }
          setColorStatus(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('状态修改成功！')
              this.getColorList()
            }
          })
        }
      })
    },
    handleSubmitColor ({ infoForm }) {
      let data = {}
      if (this.selectColorId) {
        data = {
          id: this.selectColorId,
          carProductColour: infoForm.carProductColour,
          carColourValue: infoForm.carColourValue,
          colorPhoto: infoForm.fileUrl
        }
      } else {
        data = {
          carProductCd: this.carProductCd,
          carProductColour: infoForm.carProductColour,
          carColourValue: infoForm.carColourValue,
          colorPhoto: infoForm.fileUrl
        }
      }
      addOrModifyColor(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.success(res.data.msg)
          this.selectColorId = ''
          this.colorForm = {
            carProductColour: '',
            carColourValue: '',
            fileUrl: ''
          }
          this.getColorList()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toStatus (row) {
      // 0未启用 1启用
      let tipMsg = ''
      let isActive = row.isActive.toString()
      if (row.isActive === 0) {
        tipMsg = '启用'
        isActive = '1'
      } else {
        tipMsg = '停用'
        isActive = '0'
      }
      this.$Modal.warning({
        title: '状态',
        content: '确定要' + tipMsg + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            id: row.id.toString(),
            isActive: isActive
          }
          setIsActive(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('状态修改成功！')
              this.getList()
            }
          })
        }
      })
    },
    clearLocalValue () {
      localStorage.removeItem('tCarBasic')
      localStorage.removeItem('tCarAdas')
      localStorage.removeItem('tCarChassis')
      localStorage.removeItem('tCarEconfiguration')
      localStorage.removeItem('tCarEnt')
      localStorage.removeItem('tCarIconfiguration')
      localStorage.removeItem('tCarPower')
      localStorage.removeItem('tCarSecurity')
      localStorage.removeItem('tCarSize')
    },
    // 审核
    toApply (row) {
      this.modal = true
      this.title = '审核'
      this.width = 600
      this.isEditColor = false
      this.carProductCd = row.carProductCd
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
            carProductCd: row.carProductCd
          }
          submitDraft(data).then(res => {
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
    handleApplyCancel () {
      this.getList()
      this.checkForm = {}
      this.modal = false
      this.selectColorId = ''
      this.carProductCd = ''
    },
    handleSubmitApply () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          let data = {
            carProductCd: this.carProductCd,
            verifyStatus: this.checkForm.isVerify
          }
          verifyProduct(data).then(res => {
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
    toDelete (row) {
      this.$Modal.warning({
        title: '删除',
        content: '确定要删除吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            carProductCd: row.carProductCd
          }
          deleteProduct(data).then(res => {
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
    toOnLine (row) {
      // 1 上线 2 下线
      let tipMsg = ''
      let isActive = row.onLine.toString()
      if (row.onLine === 1) {
        tipMsg = '下线'
        isActive = '2'
      } else {
        tipMsg = '上线'
        isActive = '1'
      }
      this.$Modal.warning({
        title: '状态',
        content: '确定要' + tipMsg + '吗？',
        width: '400px',
        closable: true,
        onOk: () => {
          let data = {
            carProductCd: row.carProductCd,
            onLine: isActive
          }
          setOnlineStatus(data).then(res => {
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
    toShowDetail (row) {
      let obj = {
        classNm: row.brand.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
        seriesNm: row.classNm,
        seriesId: row.productCd
      }
      this.clearLocalValue()
      localStorage.setItem('classNmObjShow', JSON.stringify(obj))
      let data = {
        carId: row.carProductCd
      }
      getCarDetailPage(data).then(res => {
        if (res.data.code === '200') {
          let tCarBasicObj = res.data.CarDetail.tCarBasic
          tCarBasicObj.carProductPrice = tCarBasicObj.carProductPrice ? tCarBasicObj.carProductPrice.toString() : tCarBasicObj.carProductPrice
          tCarBasicObj.earnestMoney = tCarBasicObj.earnestMoney ? tCarBasicObj.earnestMoney.toString() : tCarBasicObj.earnestMoney
          this.carProductKindOption.forEach(item => {
            if (item.value === tCarBasicObj.carProductKind) {
              tCarBasicObj.carProductKind = item.label
            }
          })
          this.onSaleOption.forEach(item => {
            if (item.value === tCarBasicObj.onSale.toString()) {
              tCarBasicObj.onSale = item.label
            }
          })
          localStorage.setItem('tCarBasicShow', JSON.stringify(tCarBasicObj))
          localStorage.setItem('tCarAdasShow', JSON.stringify(res.data.CarDetail.tCarAdas))
          localStorage.setItem('tCarChassisShow', JSON.stringify(res.data.CarDetail.tCarChassis))
          localStorage.setItem('tCarEconfigurationShow', JSON.stringify(res.data.CarDetail.tCarEconfiguration))
          localStorage.setItem('tCarEntShow', JSON.stringify(res.data.CarDetail.tCarEnt))
          localStorage.setItem('tCarIconfigurationShow', JSON.stringify(res.data.CarDetail.tCarIconfiguration))
          localStorage.setItem('tCarPowerShow', JSON.stringify(res.data.CarDetail.tCarPower))
          localStorage.setItem('tCarSecurityShow', JSON.stringify(res.data.CarDetail.tCarSecurity))
          localStorage.setItem('tCarSizeShow', JSON.stringify(res.data.CarDetail.tCarSize))
          this.$router.push({ name: 'productShowPage' })
        } else {
          this.$Message.info(res.data.msg)
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
 /* .ivu-table tr:last-child td{
    border-bottom:none!important;
  }*/
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
  .marginTop20{margin-top: 20px;}
</style>
