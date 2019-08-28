<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <div class="addBtn">
        <Button type="primary" @click="toBrandAdd" v-if="this.buttonList['175']">新增品牌</Button>
      </div>
      <Table border :columns="tableColumns" :data="tableData" :row-class-name="setClassName"></Table>
    </div>
    <Modal v-model="modal" :title="title" :mask-closeable="false" width="800" @on-cancel="handleCancel">
      <Form v-if="!isShow" ref="infoFormP" :model="infoFormP" :rules="ruleInfoFormP" :label-width="140" inline>
        <FormItem label="产品类别名称" prop="classNm">
          <Input v-model="infoFormP.classNm" placeholder="请输入产品类别名称" style="width:200px;" />
        </FormItem>
        <FormItem label="产地" prop="productionaddress">
          <Input v-model="infoFormP.productionaddress" placeholder="请输入产地" style="width:200px;" />
        </FormItem>
        <!--<FormItem label="是否启用" prop="isActive" >
          <Select v-model="infoFormP.isActive" placeholder="请选择是否启用" style="width:200px;">
            <Option v-for="item in isActiveOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>-->
        <FormItem label="品类图片" prop="classPic">
          <Upload action="/common/upload"
                  :before-upload="handleUploadP"
                  :show-upload-list="false">
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
          <img :src="getFileUrl(infoFormP.classPic)" @click="showImg" class="showImg">
          <Modal title="查看图片" v-model="visible">
            <img :src="getFileUrl(infoFormP.classPic)" v-if="visible" style="width: 100%">
            <div slot="footer"></div>
          </Modal>
        </FormItem>
        <div class="footerDiv">
          <Button type="primary" class="submitBtn" @click="handleSubmitP">提交</Button>
        </div>
      </Form>
      <Form v-if="isShow" ref="infoFormC" :model="infoFormC" :rules="ruleInfoFormC" :label-width="140" inline>
        <FormItem prop="parentBrandName" label="品牌">
          <Input v-model="infoFormC.parentBrandName" disabled style="width:200px;" />
        </FormItem>
        <FormItem label="车系" prop="classNm">
          <Input v-model="infoFormC.classNm" placeholder="请输入车系名称" style="width:200px;" />
        </FormItem>
        <FormItem label="产地" prop="productionaddress">
          <Input v-model="infoFormC.productionaddress" placeholder="请输入产地" style="width:200px;" />
        </FormItem>
        <!--<FormItem label="是否启用" prop="isActive" >
          <Select v-model="infoFormC.isActive" placeholder="请选择是否启用" style="width:200px;">
            <Option v-for="item in isActiveOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>-->
        <FormItem label="是否推荐" prop="isRecommend" >
          <Select v-model="infoFormC.isRecommend" placeholder="请选择是否推荐" style="width:200px;">
            <Option v-for="item in isRecommendOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="品类图片" prop="classPic">
          <Upload action="/common/upload"
                  :before-upload="handleUploadC"
                  :show-upload-list="false">
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
          <img :src="getFileUrl(infoFormC.classPic)" @click="showImg" class="showImg">
          <Modal title="查看图片" v-model="visible">
            <img :src="getFileUrl(infoFormC.classPic)" v-if="visible" style="width: 100%">
            <div slot="footer"></div>
          </Modal>
        </FormItem>
        <div class="footerDiv">
          <Button type="primary" class="submitBtn" @click="handleSubmitC">提交</Button>
        </div>
      </Form>
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
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType, getBrandSelect, imgFileUrl, upLoadFile } from '@/api/common'
import { mainClassesLoadData, addMainClasses, updateMainClasses, editActive, toSubmitVerify } from '@/api/platformManage/classesManage'
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
                    title: '产品编号',
                    key: 'classCd',
                    align: 'left'
                  },
                  {
                    title: '产品名称',
                    align: 'center',
                    key: 'classNm'
                  },
                  {
                    title: '产地',
                    key: 'productionaddress',
                    align: 'center'
                  },
                  {
                    title: '是否推荐',
                    key: 'isRecommendStr',
                    align: 'center'
                  },
                  {
                    title: '审核状态',
                    key: 'verifyStatusStr',
                    align: 'center'
                  },
                  {
                    title: '显示',
                    key: 'isActiveStr',
                    align: 'center'
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
                            display: (this.buttonList['208']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toEditSeries(params.row)
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
                            display: (this.buttonList['209']) ? 'inline-block' : 'none'
                          },
                          on: {
                            click: () => {
                              this.toEditActive(params.row)
                            }
                          }

                        }, params.row.isActive === 1 ? '停用' : '启用'),
                        h('Button', {
                          props: {
                            type: 'text',
                            size: 'small'
                          },
                          style: {
                            color: '#2d8cf0',
                            display: (params.row.verifyStatus === 1 && this.buttonList['215']) ? 'inline-block' : 'none'
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
                nameExpand: 'classCd'
              }
            })
          }
        },
        {
          title: '产品编号',
          key: 'classCd',
          align: 'left'
        },
        {
          title: '产品名称',
          align: 'center',
          key: 'classNm'
        },
        {
          title: '产地',
          key: 'productionaddress',
          align: 'center'
        },
        {
          title: '是否推荐',
          key: 'isRecommendStr',
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'verifyStatusStr',
          align: 'center'
        },
        {
          title: '显示',
          key: 'isActiveStr',
          align: 'center'
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
                  display: (this.buttonList['177']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toBrandEdit(params.row)
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
                  display: (this.buttonList['176']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toAddSeries(params.row)
                  }
                }

              }, '新增车系'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (this.buttonList['178']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.toEditActive(params.row)
                  }
                }

              }, params.row.isActive === 1 ? '停用' : '启用'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0',
                  display: (params.row.verifyStatus === 1 && this.buttonList['179']) ? 'inline-block' : 'none'
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
      isActiveOption: [],
      brandOption: [],
      isRecommendOption: [],
      modal: false,
      modalV: false,
      title: '新增',
      infoFormP: {
        classNm: '',
        classPic: '',
        // isActive: '',
        productionaddress: ''
      },
      infoFormC: {
        parentClassCd: '',
        parentBrandName: '',
        classPic: '',
        // isActive: '',
        isRecommend: '',
        productionaddress: ''
      },
      visible: false,
      ruleInfoFormP: {
        classNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        classPic: [{ required: true, message: '此项必填', trigger: 'blur' }],
        // isActive: [{ required: true, message: '此项必填', trigger: 'blur' }],
        productionaddress: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      ruleInfoFormC: {
        classPic: [{ required: true, message: '此项必填', trigger: 'blur' }],
        isActive: [{ required: true, message: '此项必填', trigger: 'blur' }],
        productionaddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        isRecommend: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      isShow: false,
      checkForm: {
        isVerify: '',
        verifyReason: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      checkId: '',
      isShowReason: false,
      buttonList: []
    }
  },
  computed: {
  },
  created () {
    this.getList()
    this.getBrandOption()
    this.getIsActiveOption()
    this.getIsRecommendOption()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    setClassName (row, index) {
      return (row.childList === undefined || row.childList.length === 0) ? 'tdNoExpend' : ''
    },
    getBrandOption () {
      getBrandSelect().then(res => {
        if (res.data.code === '200') {
          this.brandOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getIsActiveOption () {
      let data = {
        type: 'IS_ACTIVE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.isActiveOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getIsRecommendOption () {
      let data = {
        type: 'IS_RECOMMEND'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.isRecommendOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getList () {
      mainClassesLoadData().then(res => {
        if (res.data.code === '200') {
          this.tableData = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toBrandAdd () {
      this.modal = true
      this.title = '新增'
      this.isShow = false
    },
    toBrandEdit (row) {
      this.modal = true
      this.title = '修改'
      this.isShow = false
      this.infoFormP = row
      this.infoFormP.isActive = row.isActive.toString()
    },
    toAddSeries (row) {
      this.modal = true
      this.title = '新增'
      this.isShow = true
      this.infoFormC.parentClassCd = row.classCd
      this.infoFormC.parentBrandName = row.classNm
    },
    toEditSeries (row) {
      this.modal = true
      this.title = '修改'
      this.isShow = true
      this.infoFormC = row
      this.infoFormC.isActive = row.isActive.toString()
      this.infoFormC.isRecommend = row.isRecommend.toString()
      this.brandOption.forEach(item => {
        if (item.classCd === row.parentClassCd) {
          this.infoFormC.parentBrandName = item.label
        }
      })
    },
    toVerify (row) {
      this.modalV = true
      this.checkId = row.id
    },
    toEditActive (row) {
      // 0停用 1启用
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
            active: isActive
          }
          editActive(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('状态修改成功！')
              this.getList()
            }
          })
        }
      })
    },
    handleCancel () {
      this.getList()
      this.modal = false
      if (this.$refs['infoFormP']) this.$refs['infoFormP'].resetFields()
      if (this.$refs['infoFormC']) this.$refs['infoFormC'].resetFields()
    },
    handleCancelV () {
      this.getList()
      this.modalV = false
      if (this.$refs['checkForm']) this.$refs['checkForm'].resetFields()
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
    },
    showReason (value) {
      if (value === '3') {
        this.isShowReason = true
      } else {
        this.isShowReason = false
      }
    },
    handleSubmitP () {
      this.$refs['infoFormP'].validate((valid) => {
        if (valid) {
          let data = {
            id: this.infoFormP.id,
            classNm: this.infoFormP.classNm,
            classPic: this.infoFormP.classPic,
            isActive: this.infoFormP.isActive,
            productionaddress: this.infoFormP.productionaddress
          }
          if (this.infoFormP.id) {
            updateMainClasses(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          } else {
            addMainClasses(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          }
        }
      })
    },
    handleSubmitC () {
      this.$refs['infoFormC'].validate((valid) => {
        if (valid) {
          let data = {
            id: this.infoFormC.id,
            parentClassCd: this.infoFormC.parentClassCd,
            classNm: this.infoFormC.classNm,
            classPic: this.infoFormC.classPic,
            // isActive: this.infoFormC.isActive,
            isRecommend: this.infoFormC.isRecommend,
            productionaddress: this.infoFormC.productionaddress
          }
          if (this.infoFormC.id) {
            updateMainClasses(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          } else {
            addMainClasses(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.handleCancel()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          }
        }
      })
    },
    showImg () {
      this.visible = true
    },
    getFileUrl (url) {
      let fileUrl = ''
      if (url !== undefined && url !== null && url !== '') {
        fileUrl = imgFileUrl + url
      }
      return fileUrl
    },
    handleUploadP (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.infoFormP.classPic = res.data.list[0]
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleUploadC (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.infoFormC.classPic = res.data.list[0]
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .addBtn{
    padding:0px 6.5% 20px 0px;
    text-align: right;
  }
  .showImg{
    position: absolute;
    top: -5px;
    left: 118px;
    height: 50px;
    width: 80px;
  }
</style>
