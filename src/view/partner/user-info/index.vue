<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        :queryForm="queryForm"
        :queryFormItemData="queryFormItemData"
        @on-get-list="getList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
        @to-edit="toEdit"
      ></custom-table>
    </div>
    <Modal v-model="modal" :title="title" :mask-closeable="false" width="850" @on-cancel="handleUpdateCancel">
      <custom-form v-if="editShow"
                   :isInline="true"
                   :labelWidth="140"
                   :infoForm="infoForm"
                   :ruleInfoForm="ruleInfoForm"
                   :FormItemDate="FormItemDateModal"
                   @on-form-submit="handleUpdateSubmit"
                   @on-form-cancel="handleUpdateCancel"
      ></custom-form>
      <div v-if="!editShow" >
        <div class="padding-l">
          <Col span="11">
          <Card style="width:100%">
            <p slot="title" >变更前</p>
            <custom-form
              :showFooter="false"
              :labelWidth="80"
              :infoForm="infoFormOld"
              :FormItemDate="FormItemDateModalOld"
            ></custom-form>
          </Card>
          </Col>
          <Col span="11" offset="1">
          <Card style="width:100%">
            <p slot="title">变更后</p>
            <custom-form
              :showFooter="false"
              :labelWidth="80"
              :infoForm="infoFormNew"
              :FormItemDate="FormItemDateModalNew"
            ></custom-form>
          </Card>
          </Col>
        </div>
        <div class="padding-l">
          <Form ref="checkForm" :model="checkForm" label-position="left" :rules="isAdmin?checkAdminRules:checkRules" :label-width="70">
            <FormItem label="">
            </FormItem>
            <FormItem label="平台角色" prop="platformRole" v-if="!isAdmin" style="padding-top: 20px;">
              <Select v-model="checkForm.platformRole" placeholder="请选择平台角色" style="width: 200px;">
                <Option v-for="item in platformRoleOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="审核意见" prop="isVerify">
              <RadioGroup v-model="checkForm.isVerify">
                <Radio label="1">&nbsp;&nbsp;不通过&nbsp;&nbsp;&nbsp;</Radio>
                <Radio label="2">&nbsp;&nbsp;通过</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button v-if="!editShow" class="btn1" type="text" @click="handleUpdateCancel">取消</Button>
        <Button v-if="!editShow" type="primary" @click="handleSubmitApply">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { loadDataByType } from '@/api/common'
import { storage } from '@/libs/common'
import { getUserList, verifyUser, updateUserInfo, setUserIsActive, getUserHistoryInfo, verifyAdminStatus } from '@/api/partner/basicInfo'
export default {
  name: 'index',
  components: {
    CustomForm,
    CustomTable
  },
  data () {
    return {
      nameTab: 'name1',
      isSelection: 'true',
      tableColumns: [
        {
          title: '用户账号',
          key: 'username',
          align: 'center'
        },
        {
          title: '用户名称',
          align: 'center',
          key: 'realName'
        },
        {
          title: '身份证号',
          key: 'idCard',
          align: 'center'
        },
        {
          title: '用户性质',
          key: 'userNature',
          align: 'center'
        },
        {
          title: '所属企业',
          key: 'belongPartner',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '显示',
          key: 'activeName',
          align: 'center',
          width: 80
        },
        {
          title: '审核状态',
          key: 'verifyName',
          align: 'center',
          width: 100
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
                  color: '#2d8cf0',
                  display: params.row.isUpdate === '1' ? 'inline-block' : 'none'
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
                  display: (params.row.isVerify === 0 && this.buttonList['172']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toApply(params.row)
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
                  display: (this.buttonList['173']) ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    that.toStatus(params.row)
                  }
                }
              }, params.row.enabled === 0 ? '启用' : params.row.enabled === 1 ? '停用' : '状态')
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
      isVerifyOption: [],
      queryForm: {
        realName: '',
        enabled: '',
        isVerify: ''
      },
      isActiveOption: [],
      modal: false,
      editShow: false,
      title: '修改',
      infoForm: {
        id: '',
        employeeId: '',
        fileUrl: '',
        realName: '',
        email: '',
        address: '',
        sex: '',
        phone: '',
        idCardType: '',
        idCard: ''
      },
      ruleInfoForm: {
        employeeId: [{ required: true, message: '此项必填', trigger: 'blur' }],
        // fileUrl: [{ required: true, message: '此项必填', trigger: 'blur' }],
        realName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        email: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        address: [{ required: true, message: '此项必填', trigger: 'blur' }],
        sex: [{ required: true, message: '此项必填', trigger: 'change' }],
        phone: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        idCardType: [{ required: true, message: '此项必填', trigger: 'blur' }],
        idCard: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, message: '请输入正确的身份证格式', trigger: 'blur' }
        ]
      },
      sexOption: [],
      idCardTypeOption: [],
      FormItemDateModal: [],
      infoFormS: {
        employeeId: {
          old: '',
          new: ''
        },
        photo: {
          old: '',
          new: ''
        },
        realName: {
          old: '',
          new: ''
        },
        email: {
          old: '',
          new: ''
        },
        address: {
          old: '',
          new: ''
        },
        sex: {
          old: '',
          new: ''
        },
        phone: {
          old: '',
          new: ''
        },
        idCardType: {
          old: '',
          new: ''
        },
        idCard: {
          old: '',
          new: ''
        }
      },
      infoFormOld: {
        photo: '',
        realName: '',
        email: '',
        address: '',
        sex: '',
        phone: '',
        idCardType: '',
        idCard: ''
      },
      infoFormNew: {
        photo: '',
        realName: '',
        email: '',
        address: '',
        sex: '',
        phone: '',
        idCardType: '',
        idCard: ''
      },
      FormItemDateModalS: [
        {
          type: 'label',
          prop: 'realName',
          label: '姓名',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'sex',
          label: '性别',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'photo',
          label: '员工照片',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'email',
          label: '邮箱',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'address',
          label: '联系地址',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'phone',
          label: '联系电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCardType',
          label: '身份证类型',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCard',
          label: '身份证号',
          width: '200px'
        }
      ],
      FormItemDateModalOld: [
        {
          type: 'label',
          prop: 'realName',
          label: '姓名',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'sex',
          label: '性别',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelImg',
          prop: 'photo',
          label: '员工照片',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'email',
          label: '邮箱',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'address',
          label: '联系地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'phone',
          label: '联系电话',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCardType',
          label: '身份证类型',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCard',
          label: '身份证号',
          isUpdate: false,
          width: '200px'
        }
      ],
      FormItemDateModalNew: [
        {
          type: 'label',
          prop: 'realName',
          label: '姓名',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'sex',
          label: '性别',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelImg',
          prop: 'photo',
          label: '员工照片',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'email',
          label: '邮箱',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'address',
          label: '联系地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'phone',
          label: '联系电话',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCardType',
          label: '身份证类型',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idCard',
          label: '身份证号',
          isUpdate: false,
          width: '200px'
        }
      ],
      checkForm: {
        isVerify: '',
        platformRole: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }],
        platformRole: [{ required: true, message: '此项必填', trigger: 'change' }]
      },
      checkId: '',
      platformRoleOption: [],
      isAdmin: false,
      checkAdminRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      platformType: '',
      platformRoleOptionP: [],
      platformRoleOptionS: [],
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
    this.setQueryData()
    this.getIsVerifyOption()
    this.getIsActiveOption()
    this.getSexOption()
    this.getPlatformRoleOptionP()
    this.getPlatformRoleOptionS()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    getPlatformRoleOptionP () {
      let data = {
        'type': 'PLATFORM_ROLE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.platformRoleOptionP = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getPlatformRoleOptionS () {
      let data = {
        'type': 'SELLER_ROLE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.platformRoleOptionS = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getSexOption () {
      let data = {
        'type': 'Gender'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.sexOption = res.data.list
          let postData = {
            'type': 'ID_TYPE'
          }
          loadDataByType(postData).then(res => {
            if (res.data.code === '200') {
              this.idCardTypeOption = res.data.list
              this.FormItemDateModal = [
                {
                  type: 'input',
                  prop: 'realName',
                  label: '姓名',
                  placeholder: '请输入姓名',
                  width: '200px'
                },
                {
                  type: 'select',
                  prop: 'sex',
                  label: '性别',
                  selectOption: this.sexOption,
                  placeholder: '请选择性别',
                  width: '200px'
                },
                {
                  type: 'file',
                  prop: 'fileUrl',
                  label: '员工照片',
                  fileShow: true,
                  width: '200px'
                },
                {
                  type: 'input',
                  prop: 'email',
                  label: '邮箱',
                  placeholder: '请输入邮箱',
                  width: '200px'
                },
                {
                  type: 'input',
                  prop: 'address',
                  label: '联系地址',
                  placeholder: '请输入联系地址',
                  width: '200px'
                },
                {
                  type: 'input',
                  prop: 'phone',
                  label: '联系电话',
                  placeholder: '请输入联系电话',
                  width: '200px'
                },
                {
                  type: 'select',
                  prop: 'idCardType',
                  label: '身份证类型',
                  selectOption: this.idCardTypeOption,
                  placeholder: '请选择身份证类型',
                  width: '200px'
                },
                {
                  type: 'input',
                  prop: 'idCard',
                  label: '身份证号',
                  placeholder: '请输入身份证号',
                  width: '200px'
                }
              ]
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    setQueryData () {
      let data = {
        'type': 'IS_ACTIVE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.isActiveOption = res.data.list
          let data = {
            'type': 'PARTNER_STATUS'
          }
          loadDataByType(data).then(res => {
            if (res.data.code === '200') {
              this.isVerifyOption = res.data.list
              let arr = [
                {
                  type: 'input',
                  prop: 'realName',
                  label: '姓名',
                  placeholder: '请输入姓名',
                  width: '140px'
                },
                {
                  type: 'select',
                  prop: 'enabled',
                  label: '显示状态',
                  selectOption: this.isActiveOption,
                  placeholder: '请输入显示状态',
                  width: '140px'
                },
                {
                  type: 'select',
                  prop: 'isVerify',
                  label: '审核状态',
                  placeholder: '请选择审核状态',
                  selectOption: this.isVerifyOption,
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
    getIsVerifyOption () {
      let data = {
        'type': 'PARTNER_STATUS'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.isVerifyOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getIsActiveOption () {
      let data = {
        'type': 'IS_ACTIVE'
      }
      loadDataByType(data).then(res => {
          if (res.data.code === '200') { //eslint-disable-line
          this.isActiveOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getStatus (value, name) {
      let arr = []
      if (name === 'isVerify') {
        arr = this.isVerifyOption
      } else if (name === 'enabled') {
        arr = this.isActiveOption
      }
      var label = ''
      for (var child of arr) {
          if (child.value == value) {//eslint-disable-line
          label = child.label
          break
        }
      }
      return label
    },
    getList () {
      let data = {
        realName: this.queryForm.realName,
        enabled: this.queryForm.enabled,
        isVerify: this.queryForm.isVerify,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getUserList(data).then(res => {
          if (res.data.code == 200) { // eslint-disable-line
          this.tableData = res.data.page.list
          this.tableData[0]['isUpdate'] = '1'
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
      this.infoForm = {}
      this.infoForm = row
      this.infoForm.fileUrl = row.photo
        if (row.isActive != undefined && row.isActive != null && row.isActive != '') {//eslint-disable-line
        this.infoForm.isActive = row.isActive.toString()
      }
        if (row.enabled != undefined && row.enabled != null && row.enabled != '') {//eslint-disable-line
        this.infoForm.enabled = row.enabled.toString()
      }
      this.title = '编辑'
      this.modal = true
      this.editShow = true
    },
    toApply (row) {
      this.platformType = row.platformType
      if (row.platformType === 3) {
        this.platformRoleOption = this.platformRoleOptionP
      } else if (row.platformType === 1) {
        this.platformRoleOption = this.platformRoleOptionS
      }
      this.checkId = row.username
      this.editShow = false
      this.checkForm.isVerify = row.isVerify.toString()
      let data = {
        username: row.username
      }
      getUserHistoryInfo(data).then(res => {
        if (res.data.code === '200') {
          this.infoFormOld = res.data.HistoryInfo.oldInfo
          this.infoFormNew = res.data.HistoryInfo.newInfo
          /* let key = Object.keys(res.data.HistoryInfo.newInfo)
          let oldArr = (res.data.HistoryInfo.oldInfo === undefined || res.data.HistoryInfo.oldInfo === null) ? [] : Object.values(res.data.HistoryInfo.oldInfo)
          let newArr = Object.values(res.data.HistoryInfo.newInfo)
          for (let i = 0; i < key.length; i++) {
            this.infoFormS[key[i]] = {
              old: oldArr.length === 0 ? '' : oldArr[i],
              new: newArr[i]
            }
          } */
          let key = Object.keys(res.data.HistoryInfo.newInfo)
          let oldArr = (res.data.HistoryInfo.oldInfo === undefined || res.data.HistoryInfo.oldInfo === null) ? [] : Object.values(res.data.HistoryInfo.oldInfo)
          let newArr = Object.values(res.data.HistoryInfo.newInfo)
          for (let i = 0; i < key.length; i++) {
            if (oldArr.length === 0) {
              for (let j = 0; j < this.FormItemDateModalOld.length; j++) {
                this.FormItemDateModalOld[j].isUpdate = true
                this.FormItemDateModalNew[j].isUpdate = true
              }
            } else if (oldArr[i] !== newArr[i]) {
              for (let j = 0; j < this.FormItemDateModalOld.length; j++) {
                if (this.FormItemDateModalOld[j].prop === key[i]) {
                  this.FormItemDateModalOld[j].isUpdate = true
                  this.FormItemDateModalNew[j].isUpdate = true
                }
              }
            }
          }
          this.title = '审核'
          this.isAdmin = row.isAdmin === '1'
          this.modal = true
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toStatus (row) {
      // 0未启用 1启用
      let tipMsg = ''
      let isActive = row.enabled.toString()
      if (row.enabled === 0) {
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
            username: row.username,
            isActive: isActive
          }
          setUserIsActive(data).then(res => {
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
    handleUpdateCancel () {
      this.infoForm = {}
      this.checkForm = {}
      // this.$refs['infoForm'].resetFields()
      this.getList()
      this.modal = false
    },
    handleUpdateSubmit () {
      let data = {
        username: this.infoForm.username,
        employeeId: this.infoForm.employeeId,
        photo: this.infoForm.fileUrl,
        realName: this.infoForm.realName,
        email: this.infoForm.email,
        address: this.infoForm.address,
        sex: this.infoForm.sex,
        phone: this.infoForm.phone,
        idCardType: this.infoForm.idCardType,
        idCard: this.infoForm.idCard
      }
      updateUserInfo(data).then(res => {
          if (res.data.code === '200') { //eslint-disable-line
          this.$Message.success('修改成功!')
          this.getList()
          this.modal = false
          this.editShow = false
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleSubmitApply () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          if (this.isAdmin) {
            let data = {
              username: this.checkId,
              isVerify: this.checkForm.isVerify
            }
            verifyAdminStatus(data).then(res => {
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg)
                this.$refs['checkForm'].resetFields()
                this.modal = false
                this.getList()
              } else {
                this.$Message.info(res.data.msg)
              }
            })
          } else {
            let data = {
              username: this.checkId,
              isVerify: this.checkForm.isVerify,
              platformRole: this.checkForm.platformRole
            }
            verifyUser(data).then(res => {
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
  .padding-l{
    padding-left:30px;
  }
</style>
