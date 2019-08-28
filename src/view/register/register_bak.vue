<style lang="less">
  @import 'register.less';
</style>
<template>
  <div class="register">
    <Layout>
      <Header>
        <Row>
          <Col span="5">&nbsp;</Col>
          <Col span="14" class="header-title">
            <span>新能源汽车平台</span>
            <span class="toLogin-style" @click="toLogin"><Button>返回登录</Button></span>
          </Col>
          <Col span="5">&nbsp;</Col>
        </Row>
      </Header>
      <Content>
        <Row>
        <Col span="5">&nbsp;</Col>
        <Col span="14" class="con-bg">
          <Form ref="form" :model="form" :rules="formRules" :label-width="200">
            <FormItem prop="userType" label="用户类型">
              <Select v-model="form.userType" placeholder="请选择用户类型" style="width:50%;" @on-change="clearInfoFrom" >
                <Option v-for="item in userTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="账号" prop="userName">
              <Input v-model="form.userName" placeholder="请输入账号" style="width:50%;" />
            </FormItem>
            <FormItem label="密码" prop="pwd">
              <Input v-model="form.pwd" type="password" placeholder="请输入密码" style="width:50%;" />
            </FormItem>
            <FormItem label="确认密码" prop="conPwd" >
              <Input v-model="form.conPwd" type="password" placeholder="请输入确认密码" style="width:50%;" />
            </FormItem>
            <FormItem label="手机号" prop="phone" >
              <Input v-model="form.phone" placeholder="请输入手机号" style="width:50%;" />
            </FormItem>
            <FormItem label="验证码" prop="verifyCode" >
              <Input v-model="form.verifyCode" type="text" placeholder="请输入验证码" style="width:50%;" class="code" size="large">
              <span slot="append" @click="getCode" class="timer-style" :style="codeDisabled?'color:#9D9D9D;':''">{{verifyText}}</span>
              </Input>
            </FormItem>
          </Form>
          <div v-if="(form.userType=='7'||form.userType=='8')?true:false" class="btn-center">
            <Button type="primary" @click="registerSubmit">注册</Button>
          </div>
          <custom-form ref="infoForm" v-if="getShowP(form.userType)"
             :isPwd="true"
             :labelWidth="200"
             :infoForm="infoFormP"
             :ruleInfoForm="ruleInfoFormP"
             :FormItemDate="FormItemDateP"
             :btnSubmit="'注册'"
             :btnCancel="'返回登录'"
             :showBtnCancel="false"
             @on-form-submit="registerSubmit"
          ></custom-form>
          <custom-form ref="infoForm" v-if="getShowU(form.userType)"
             :isPwd="true"
             :labelWidth="200"
             :infoForm="infoFormU"
             :ruleInfoForm="ruleInfoFormU"
             :FormItemDate="FormItemDateU"
             :btnSubmit="'注册'"
             :btnCancel="'返回登录'"
             :showBtnCancel="false"
             @on-form-submit="registerSubmit"
          ></custom-form>
        </Col>
        <Col span="5">&nbsp;</Col>
      </Row></Content>
      <Content class="con-footer">
        <Row>
          <Col span="5">&nbsp;</Col>
          <Col span="14">

            <div class="content2">
              <span>平台介绍<br></span>
              <span>联系我们</span>
              <span>联系我们</span>
            </div>
          </Col>
          <Col span="5">&nbsp;</Col>
        </Row>
      </Content>
      <Footer>
        <Row>
        <Col span="5">&nbsp;</Col>
        <Col span="14" class="footer-title">
          平台运营：中企云商科技股份有限公司
          联系电话：0000000000000000
          地址：某某市
          备案号
        </Col>
        <Col span="5">&nbsp;</Col>
      </Row></Footer>
    </Layout>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import { chooseRole, getVerifyCode, registerSubmit } from '@/api/common'

export default {
  components: {
    CustomForm
  },
  data () {
    const pwdValidate = (rule, value, callback) => {
      this.$refs.form.validateField('conPwd')
      callback()
    }
    const pwdCheckValidate = (rule, value, callback) => {
      if (this.form.pwd !== '' && value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (this.form.pwd !== value) {
        callback(new Error('密码和确认密码应相同'))
      } else {
        callback()
      }
    }
    return {
      codeDisabled: false,
      verifyText: '获取验证码',
      countdown: 60,
      timer: null,
      form: {
        userType: '1',
        userName: '',
        pwd: '',
        conPwd: '',
        phone: '',
        verifyCode: ''
      },
      formRules: {
        userType: [{ required: true, message: '此项必填', trigger: 'blur' }],
        userName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        pwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdValidate, trigger: 'blur' }
        ],
        conPwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdCheckValidate, trigger: 'blur' }
        ],
        phone: [{ required: true, message: '此项必填', trigger: 'blur' }],
        verifyCode: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      infoFormP: {
        partnerNm: '',
        partnerCode: '',
        fileUrl: '20190409013537301CpALu',
        partnerSnm: '',
        partnerEnm: '',
        partnerSenm: '',
        partnerIntroduct: '',
        partnerAddress: '',
        partnerEmail: '',
        partnerAgent: '',
        partnerAgentAreaCd: '',
        partnerLinkUser: '',
        partnerLinkPhone: '',
        partnerWeb: '',
        partnerBankCd: '',
        partnerBankNm: '',
        partnerBankAddress: '',
        partnerOrgCd: '',
        note: '',
        areaId: '',
        verifyName: '',
        activeName: '',
        parentPartner: ''
      },
      ruleInfoFormP: {
        areaId: [{ required: true, message: '此项必填', trigger: 'blur' }],
        fileUrl: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerCode: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerSnm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerEnm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerSenm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerIntroduct: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerEmail: [
          { required: true, message: '此项必填', trigger: 'blur' }
          // { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        partnerAgent: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerAgentAreaCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerLinkUser: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerLinkPhone: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerWeb: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerBankCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerBankNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerBankAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerOrgCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        note: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      FormItemDateP: [
        {
          type: 'input',
          prop: 'parentPartner',
          label: '父级企业名称',
          placeholder: '请输入父级企业名称',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerNm',
          label: '企业名称',
          placeholder: '请输入企业名称',
          width: '50%'
        },
        {
          type: 'file',
          prop: 'fileUrl',
          label: '企业图片',
          fileShow: true,
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerCode',
          label: '企业代码证',
          placeholder: '请输入企业代码证',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerSnm',
          label: '企业中文简称',
          placeholder: '请输入企业中文简称',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerEnm',
          label: '企业英文名称',
          placeholder: '请输入企业英文名称',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerSenm',
          label: '企业英文简称',
          placeholder: '请输入企业英文简称',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerIntroduct',
          label: '企业介绍',
          placeholder: '请输入企业介绍',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerAddress',
          label: '企业联系地址',
          placeholder: '请输入企业联系地址',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerEmail',
          label: '企业邮编',
          placeholder: '请输入企业邮编',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerAgent',
          label: '法人',
          placeholder: '请输入法人',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerAgentAreaCd',
          label: '注册地址',
          placeholder: '请输入注册地址',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerLinkUser',
          label: '联系人',
          placeholder: '请输入联系人',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerLinkPhone',
          label: '联系人电话',
          placeholder: '请输入联系人电话',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerWeb',
          label: '企业网址',
          placeholder: '请输入企业网址',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerBankCd',
          label: '开户行代码',
          placeholder: '请输入开户行代码',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerBankNm',
          label: '开户行名称',
          placeholder: '请输入开户行名称',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerBankAddress',
          label: '开户行地址',
          placeholder: '请输入开户行地址',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'partnerOrgCd',
          label: '组织机构代码',
          placeholder: '请输入组织机构代码',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'areaId',
          label: '地区代码',
          placeholder: '请输入地区代码',
          width: '50%'
        },
        {
          type: 'textArea',
          prop: 'note',
          label: '备注',
          placeholder: '请输入备注',
          width: '50%'
        }

      ],
      infoFormU: {
        realName: '',
        company: ''
      },
      ruleInfoFormU: {
        realName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        company: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      FormItemDateU: [
        {
          type: 'input',
          prop: 'realName',
          label: '姓名',
          placeholder: '请输入姓名',
          width: '50%'
        },
        {
          type: 'input',
          prop: 'company',
          label: '公司名称',
          width: '50%'
        }
      ],
      userTypeOption: []
    }
  },
  created () {
    this.getUserTypeOption()
  },
  methods: {
    getCode () {
      if (this.form.phone === undefined || this.form.phone === null || this.form.phone === '') {
        this.$Message.info('需先填写手机号码')
        return
      }
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--
            if (this.countdown !== 0) {
              this.verifyText = '重新发送(' + this.countdown + ')'
              this.codeDisabled = true
            } else {
              clearInterval(this.timer)
              this.verifyText = '获取验证码'
              this.countdown = 60
              this.timer = null
              this.codeDisabled = false
            }
          }
        }, 1000)
      }
      if (this.codeDisabled === true) {
        return
      }
      let data = {
        phone: this.form.phone
      }
      getVerifyCode(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('短信发送成功!')
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    resetCode () {
      clearInterval(this.timer)
      this.codeDisabled = false
      this.verifyText = '获取验证码'
      this.countdown = 60
      this.timer = null
    },
    clearInfoFrom () {
      let userType = this.form.userType
      this.$refs['form'].resetFields()
      this.form = {}
      this.form.userType = userType
      if (userType !== '7' && userType !== '8') {
        this.infoFormP = {
          fileUrl: '20190409013537301CpALu',
          partnerNm: '',
          partnerCode: '',
          partnerSnm: '',
          partnerEnm: '',
          partnerSenm: '',
          partnerIntroduct: '',
          partnerAddress: '',
          partnerEmail: '',
          partnerAgent: '',
          partnerAgentAreaCd: '',
          partnerLinkUser: '',
          partnerLinkPhone: '',
          partnerWeb: '',
          partnerBankCd: '',
          partnerBankNm: '',
          partnerBankAddress: '',
          partnerOrgCd: '',
          note: '',
          areaId: '',
          verifyName: '',
          activeName: ''
        }
        this.infoFormU = {
          realName: '',
          company: ''
        }
        this.$refs.infoForm == undefined ? '' : this.$refs.infoForm.resetInfoForm() //eslint-disable-line
        this.resetCode()
      }
    },
    getShowP (userType) {
      let flag = false
      if (userType === '1' || userType === '4') {
        flag = true
      }
      return flag
    },
    getShowU (userType) {
      let flag = false
      if (userType === '2' || userType === '3' || userType === '5' || userType === '6') {
        flag = true
      }
      return flag
    },
    getUserTypeOption () {
      chooseRole().then(res => {
        if (res.data.code === '200') {
          this.userTypeOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    registerSubmit ({ infoForm }) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let data = {}
          if (this.form.userType === '7' || this.form.userType === '8') {
            data = {
              username: this.form.userName,
              password: this.form.pwd,
              phone: this.form.phone,
              verifyCode: this.form.verifyCode,
              roleId: this.form.userType
            }
          } else if (this.form.userType === '1' || this.form.userType === '4') {
            data = {
              username: this.form.userName,
              password: this.form.pwd,
              phone: this.form.phone,
              verifyCode: this.form.verifyCode,
              roleId: this.form.userType,
              parentPartner: infoForm.parentPartner,
              partnerNm: infoForm.partnerNm,
              partnerPic: infoForm.partnerPic,
              partnerCode: infoForm.partnerCode,
              partnerSnm: infoForm.partnerSnm,
              partnerEnm: infoForm.partnerEnm,
              partnerSenm: infoForm.partnerSenm,
              partnerIntroduct: infoForm.partnerIntroduct,
              partnerAddress: infoForm.partnerAddress,
              partnerEmail: infoForm.partnerEmail,
              partnerAgent: infoForm.partnerAgent,
              partnerAgentAreaCd: infoForm.partnerAgentAreaCd,
              partnerLinkUser: infoForm.partnerLinkUser,
              partnerLinkPhone: infoForm.partnerLinkPhone,
              partnerWeb: infoForm.partnerWeb,
              partnerBankCd: infoForm.partnerBankCd,
              partnerBankNm: infoForm.partnerBankNm,
              partnerBankAddress: infoForm.partnerBankAddress,
              partnerOrgCd: infoForm.partnerOrgCd,
              areaId: infoForm.areaId,
              note: infoForm.note
            }
          } else {
            data = {
              username: this.form.userName,
              password: this.form.pwd,
              phone: this.form.phone,
              verifyCode: this.form.verifyCode,
              roleId: this.form.userType,
              realName: infoForm.realName,
              partnerNm: infoForm.company
            }
          }
          registerSubmit(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.info('注册成功！')
              this.restForm()
              this.$refs.infoForm == undefined ? '' : this.$refs.infoForm.resetInfoForm() //eslint-disable-line
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    restForm () {
      let userType = this.form.userType
      this.$refs['form'].resetFields()
      this.form.userType = userType
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    }

  }
}
</script>
