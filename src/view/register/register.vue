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
          <div v-if="title==='step1'">
            <Form ref="formUser" :model="formUser" :rules="formUserRules" :label-width="200">
              <FormItem prop="roleType" label="类型">
                <Select v-model="formUser.roleType" placeholder="请选择类型" @on-change="isSuperAdmin" style="width:50%;">
                  <Option v-for="item in roleTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <!--<FormItem prop="platformRole" label="平台角色">-->
                <!--<Select v-model="formUser.platformRole" placeholder="请选择平台角色" style="width:50%;" >-->
                  <!--<Option v-for="item in platformRoleOption" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
              <!--</FormItem>-->
              <FormItem label="账号" prop="userName">
                <Input v-model="formUser.userName" placeholder="请输入账号" style="width:50%;" />
              </FormItem>
              <FormItem label="密码" prop="pwd">
                <Input v-model="formUser.pwd" type="password" placeholder="请输入密码" style="width:50%;" />
              </FormItem>
              <FormItem label="确认密码" prop="conPwd" >
                <Input v-model="formUser.conPwd" type="password" placeholder="请输入确认密码" style="width:50%;" />
              </FormItem>
              <FormItem label="手机号" prop="phone" >
                <Input v-model="formUser.phone" placeholder="请输入手机号" style="width:50%;" />
              </FormItem>
              <FormItem label="验证码" prop="verifyCode" >
                <Input v-model="formUser.verifyCode" type="text" placeholder="请输入验证码" style="width:50%;" class="code" size="large">
                <span slot="append" @click="getCode" class="timer-style" :style="codeDisabled?'color:#9D9D9D;':''">{{verifyText}}</span>
                </Input>
              </FormItem>
              <FormItem label="真实姓名" prop="realName">
                <Input v-model="formUser.realName" placeholder="请输入真实姓名" style="width:50%;" />
              </FormItem>
              <FormItem label="身份证号" prop="idCard">
                <Input v-model="formUser.idCard" placeholder="请输入身份证号" style="width:50%;" />
              </FormItem>
              <FormItem label="" prop="relation" v-if="isSuper">
                <RadioGroup v-model="formUser.relation">
                  <Radio label="1">新注册企业</Radio>
                  <Radio label="2">关联已有企业</Radio>
                </RadioGroup>
              </FormItem>
            </Form>
            <div class="footerDiv">
              <Button type="primary" class="submitBtn" @click="handleSubmitUser">提交</Button>
            </div>
          </div>
          <div v-if="title==='step11'" style="margin:0 10%">
            <h3 style="margin:20px 0">完善企业信息</h3>
            <Form ref="formCompany" :model="formCompany" :rules="formCompanyRules" :label-width="136" inline>
              <FormItem prop="parentPartner" label="关联上级企业" :label-width="100">
                <Input v-model="formCompany.parentPartner" placeholder="请输入上级企业" style="width:120%;" />
              </FormItem>
              <Card dis-hover style="margin-bottom: 24px;">
                <p slot="title">基础信息</p>
                <FormItem prop="partnerNm" label="公司全称">
                  <Input v-model="formCompany.partnerNm" placeholder="请输入公司全称" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerSnm" label="公司简称">
                  <Input v-model="formCompany.partnerSnm" placeholder="请输入公司简称" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerEnm" label="英文名称">
                  <Input v-model="formCompany.partnerEnm" placeholder="请输入英文名称" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerSenm" label="英文简称">
                  <Input v-model="formCompany.partnerSenm" placeholder="请输入英文简称" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerProperty" label="企业性质">
                  <Select v-model="formCompany.partnerProperty" placeholder="请选择企业性质" style="width:165%;">
                    <Option v-for="item in companyPropertyOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <br/>
                <FormItem prop="partnerAgent" label="法人代表">
                  <Input v-model="formCompany.partnerAgent" placeholder="请输入法人代表" style="width:120%;" />
                </FormItem>
                <br/>
                <FormItem prop="idType" label="证件类型">
                  <Select v-model="formCompany.idType" placeholder="请选择证件类型" style="width:165%;">
                    <Option v-for="item in idTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem prop="idCard" label="证件号码" :label-width="171">
                  <Input v-model="formCompany.idCard" placeholder="请输入证件号码" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerAddress" label="企业联系地址">
                  <Input v-model="formCompany.partnerAddress" placeholder="请输入企业联系地址" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerAgentAreaCd" label="企业注册地址" :label-width="128">
                  <Input v-model="formCompany.partnerAgentAreaCd" placeholder="请输入企业注册地址" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerIntroduct" label="公司简介">
                  <Input type="textarea" v-model="formCompany.partnerIntroduct" placeholder="请输入公司简介" style="width:100%;" :autosize="{minRows: 3,maxRows: 5}"  />
                </FormItem>
              </Card>
              <Card dis-hover style="margin-bottom: 24px;">
                <p slot="title">公司证件资质信息</p>
                <FormItem prop="partnerCode" label="统一社会信用代码">
                  <Input v-model="formCompany.partnerCode" placeholder="请输入统一社会信用代码" style="width:120%;" />
                </FormItem>
                <FormItem prop="taxId" label="税务登记号">
                  <Input v-model="formCompany.taxId" placeholder="请输入税务登记号" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerBankNm" label="开户行名称">
                  <Input v-model="formCompany.partnerBankNm" placeholder="请输入开户行名称" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerBankCd" label="开户行账号">
                  <Input v-model="formCompany.partnerBankCd" placeholder="请输入开户行账号" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerBankAddress" label="开户行地址">
                  <Input v-model="formCompany.partnerBankAddress" placeholder="请输入开户行地址" style="width:120%;" />
                </FormItem>
                <FormItem prop="registeredCapital" label="注册资金(万元)">
                  <Input v-model="formCompany.registeredCapital" placeholder="请输入注册资金" style="width:120%;" />
                </FormItem>
              </Card>
              <Card dis-hover style="margin-bottom: 24px;">
                <p slot="title">联系方式</p>
                <FormItem prop="partnerPhone" label="咨询电话">
                  <Input v-model="formCompany.partnerPhone" placeholder="请输入咨询电话" style="width:120%;" />
                </FormItem>
                <br/>
                <FormItem prop="partnerLinkUser" label="联系人">
                  <Input v-model="formCompany.partnerLinkUser" placeholder="请输入联系人" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerLinkPhone" label="手机号">
                  <Input v-model="formCompany.partnerLinkPhone" placeholder="请输入手机号" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerEmail" label="EMAIL">
                  <Input v-model="formCompany.partnerEmail" placeholder="请输入EMAIL" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerQQ" label="QQ">
                  <Input v-model="formCompany.partnerQq" placeholder="请输入QQ" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerPostalCode" label="邮编">
                  <Input v-model="formCompany.partnerPostalCode" placeholder="请输入邮编" style="width:120%;" />
                </FormItem>
                <FormItem prop="partnerFax" label="传真">
                  <Input v-model="formCompany.partnerFax" placeholder="请输入传真" style="width:120%;" />
                </FormItem>
                <FormItem label="管理员账号" prop="userName">
                  <Input v-model="formCompany.userName" readonly placeholder="请输入管理员账号" style="width:120%;" />
                </FormItem>
                <FormItem label="密码" prop="pwd">
                  <Input v-model="formCompany.pwd" type="password" placeholder="请输入密码" style="width:120%;" />
                </FormItem>
                <FormItem label="确认密码" prop="conPwd" >
                  <Input v-model="formCompany.conPwd" type="password" placeholder="请输入确认密码" style="width:120%;" />
                </FormItem>
                <FormItem label="验证码" prop="verifyCode" >
                  <Input v-model="formCompany.verifyCode" type="text" placeholder="请输入验证码" style="width:74%;" class="code" size="large">
                  <span slot="append" @click="getCompanyCode" class="timer-style" :style="codeDisabled?'color:#9D9D9D;':''">{{verifyText}}</span>
                  </Input>
                </FormItem>
              </Card>
              <Card dis-hover style="margin-bottom: 24px;">
                <p slot="title">认证材料附件<span style="font-size:12px;font-weight: normal;margin-left:18px;">支持jpg、jpeg、png、pdf文件上传，单个文件不得超过5M</span></p>
                <FormItem prop="authorizeeIdcardName" label="被授权人身份证">
                  <Upload action="/common/upload"
                          :format="['jpg','jpeg','png','pdf']"
                          accept=".jpg,.jpeg,.png,.pdf"
                          :max-size="5120"
                          :before-upload="handleUploadIdCard"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :show-upload-list="false">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>
                </FormItem>
                <span class="fileName" @click="getFileShow(formCompany.authorizeeIdcardUrl)">{{formCompany.authorizeeIdcardName}}</span>
                <br/>
                <FormItem prop="businessLicenseName" label="营业执照">
                  <Upload action="/common/upload"
                          :format="['jpg','jpeg','png','pdf']"
                          accept=".jpg,.jpeg,.png,.pdf"
                          :max-size="5120"
                          :before-upload="handleUploadBusiness"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :show-upload-list="false">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>
                </FormItem>
                <span class="fileName" @click="getFileShow(formCompany.businessLicenseUrl)">{{formCompany.businessLicenseName}}</span>
                <br/>
                <FormItem prop="authorizationName" label="授权书(加盖公章)">
                  <Upload action="/common/upload"
                          :format="['jpg','jpeg','png','pdf']"
                          accept=".jpg,.jpeg,.png,.pdf"
                          :max-size="5120"
                          :before-upload="handleUploadCert"
                          :on-format-error="handleFormatError"
                          :on-exceeded-size="handleMaxSize"
                          :show-upload-list="false">
                    <Button icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>
                </FormItem>
                <span class="fileName" @click="getFileShow(formCompany.authorizationUrl)">{{formCompany.authorizationName}}</span>
              </Card>
              <div class="footerDiv">
                <Button type="primary" class="submitBtn" @click="handleSubmitCompany">提交</Button>
              </div>
            </Form>
          </div>
          <Modal v-model="modal" :title="modalTitle" :mask-closeable="false" width="600" @on-cancel="handleCancel">
            <div v-if="isRelation">
              <Form ref="formRelation" :model="formRelation" :rules="formRelationRules" :label-width="200">
                <FormItem prop="type" label="企业名称">
                  <Input v-model="formRelation.businessName" placeholder="请输入企业名称" style="width:50%;" />
                </FormItem>
              </Form>
              <div class="errorTig">{{errorMsg}}</div>
            </div>
            <div v-if="!isRelation" class="applyClass">
              <div class="waitClass">企业审核中，请等待</div>
              <Button @click="toLogin">返回登录界面({{countD}})</Button>
            </div>
            <div slot="footer" style="text-align: center">
              <Button v-if="isRelation" type="primary" class="submitBtn" @click="handleSubmitRela">提交</Button>
            </div>
          </Modal>
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
import { loadDataByType, getVerifyCode, upLoadFile, userRegister, imgFileUrl, savePartnerInfo, userPartner } from '@/api/common'
import { companyName } from '@/api/global'
export default {
  components: {
    CustomForm
  },
  data () {
    const pwdValidateUser = (rule, value, callback) => {
      this.$refs.formUser.validateField('conPwd')
      callback()
    }
    const pwdCheckValidateUser = (rule, value, callback) => {
      if (this.formUser.pwd !== '' && value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (this.formUser.pwd !== value) {
        callback(new Error('密码和确认密码应相同'))
      } else {
        callback()
      }
    }
    const pwdValidate = (rule, value, callback) => {
      this.$refs.formCompany.validateField('conPwd')
      callback()
    }
    const pwdCheckValidate = (rule, value, callback) => {
      if (this.formCompany.pwd !== '' && value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (this.formCompany.pwd !== value) {
        callback(new Error('密码和确认密码应相同'))
      } else {
        callback()
      }
    }
    return {
      title: localStorage.getItem('registerStep') || 'step1', //
      codeDisabled: false,
      verifyText: '获取验证码',
      countdown: 60,
      timer: null,
      roleTypeOption: [],
      platformRoleOption: [],
      companyPropertyOption: [],
      idTypeOption: [],
      username: localStorage.getItem('registerUserName') || '',
      formUser: {
        roleType: '',
        // platformRole:'',
        userName: '',
        pwd: '',
        conPwd: '',
        phone: '',
        verifyCode: '',
        idCard: '',
        realName: '',
        relation: ''
      },
      formUserRules: {
        roleType: [{ required: true, message: '此项必填', trigger: 'change' }],
        // platformRole:[{ required: true, message: '此项必填', trigger: 'change' }],
        userName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        pwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdValidateUser, trigger: 'blur' }
        ],
        conPwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdCheckValidateUser, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        verifyCode: [{ required: true, message: '此项必填', trigger: 'blur' }],
        idCard: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, message: '请输入正确的身份证格式', trigger: 'blur' }
        ],
        realName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        relation: [{ required: true, message: '请关联已有企业或新注册企业', trigger: 'change' }]
      },
      formCompany: {
        parentPartner: '',
        partnerNm: '',
        partnerSnm: '',
        partnerEnm: '',
        partnerSenm: '',
        partnerProperty: '',
        partnerAgent: '',
        idType: '',
        idCard: '',
        partnerIntroduct: '',
        partnerCode: '',
        taxId: '',
        partnerBankNm: '',
        partnerBankCd: '',
        partnerBankAddress: '',
        registeredCapital: '',
        partnerLinkUser: '',
        partnerLinkPhone: '',
        partnerEmail: '',
        partnerQq: '',
        partnerPostalCode: '',
        partnerFax: '',
        userName: '',
        pwd: '',
        conPwd: '',
        verifyCode: '',
        authorizeeIdcardUrl: '',
        authorizeeIdcardName: '',
        businessLicenseUrl: '',
        businessLicenseName: '',
        authorizationUrl: '',
        authorizationName: '',
        partnerAgentAreaCd: '',
        partnerAddress: '',
        partnerPhone: ''
      },
      formCompanyRules: {
        partnerNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerProperty: [{ required: true, message: '此项必填', trigger: 'change' }],
        partnerAgent: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerIntroduct: [{ type: 'string', max: 150, message: '公司简介不能超过150字', trigger: 'blur' }],
        partnerCode: [{ required: true, message: '此项必填', trigger: 'blur' }],
        taxId: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerBankCd: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerBankNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
        registeredCapital: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' },
          { type: 'string', max: 20, message: '注册资金不能超过20数字', trigger: 'blur' }
        ],
        partnerLinkUser: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerLinkPhone: [{ required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        userName: [{ required: true, message: '此项必填', trigger: 'blur' }],
        pwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdValidate, trigger: 'blur' }
        ],
        conPwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdCheckValidate, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        verifyCode: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerPhone: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^((\d{0,2}-)?(0\d{1,4}-)\d{8,9})|([1][3,4,5,6,7,8][0-9]{9})$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        partnerPostalCode: [{ type: 'string', pattern: /^[1-9]\d{5}(?!\d)$/, message: '请输入正确的邮编格式', trigger: 'blur' }],
        partnerEmail: [{ type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
        partnerQq: [{ type: 'string', pattern: /^[1-9][0-9]{4,}$/, message: '请输入正确的QQ格式', trigger: 'blur' }],
        partnerFax: [{ type: 'string', pattern: /^(\d{3,4}-)?\d{7,8}$/, message: '请输入正确的传真格式', trigger: 'blur' }],
        idCard: [
          { type: 'string', pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, message: '请输入正确的身份证格式', trigger: 'blur' }
        ]
      },
      formRelation: {
        businessName: ''
      },
      formRelationRules: {
        businessName: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      modal: false,
      errorMsg: '',
      modalTitle: '',
      isRelation: true,
      timerD: null,
      countD: 20,
      isSuper: true
    }
  },
  created () {
    this.getRoleTypeOption()
    this.getPlatformRoleOption()
    this.getCompanyPropertyOption()
    this.getIdTypeOption()
    let randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    this.formCompany.userName = 'admin' + randomNum
  },
  methods: {
    getCode () {
      if (this.formUser.phone === undefined || this.formUser.phone === null || this.formUser.phone === '') {
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
        phone: this.formUser.phone
      }
      getVerifyCode(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.success('短信发送成功!')
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCompanyCode () {
      if (this.formCompany.partnerLinkPhone === undefined || this.formCompany.partnerLinkPhone === null || this.formCompany.partnerLinkPhone === '') {
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
        phone: this.formCompany.partnerLinkPhone
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
    getRoleTypeOption () {
      let data = {
        'type': 'PLATFORM_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.roleTypeOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getPlatformRoleOption () {
      let data = {
        'type': 'PLATFORM_ROLE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.platformRoleOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getCompanyPropertyOption () {
      let data = {
        'type': 'COMPANY_PROPERTY'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.companyPropertyOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getIdTypeOption () {
      let data = {
        'type': 'ID_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.idTypeOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleFormatError (file) {
      this.$Message.info('支持jpg、jpeg、png、pdf文件上传')
    },
    handleMaxSize (file) {
      this.$Message.info('文件不得超过5M')
    },
    handleUploadIdCard (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.formCompany.authorizeeIdcardUrl = res.data.list[0]
          this.formCompany.authorizeeIdcardName = file.name
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleUploadBusiness (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.formCompany.businessLicenseUrl = res.data.list[0]
          this.formCompany.businessLicenseName = file.name
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleUploadCert (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.formCompany.authorizationUrl = res.data.list[0]
          this.formCompany.authorizationName = file.name
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    handleSubmitUser () {
      this.$refs['formUser'].validate((valid) => {
        if (valid) {
          let data = {
            platformType: this.formUser.roleType,
            // platformRole: this.formUser.platformRole,
            username: this.formUser.userName,
            password: this.formUser.pwd,
            phone: this.formUser.phone,
            verifyCode: this.formUser.verifyCode,
            idCard: this.formUser.idCard,
            realName: this.formUser.realName,
            belongpnrType: this.formUser.relation
          }
          userRegister(data).then(res => {
            if (res.data.code === '200') {
              if (!this.isSuper) {
                let data = {
                  username: this.formUser.userName,
                  partnerNm: companyName
                }
                userPartner(data).then(res => {
                  if (res.data.code === '200') {
                    this.$Message.success(res.data.msg)
                    this.$refs['formUser'].resetFields()
                    this.resetCode()
                  } else {
                    this.errorMsg = res.data.msg
                  }
                })
              } else {
                let relation = this.formUser.relation
                this.username = this.formUser.userName
                this.resetCode()
                this.$Modal.confirm({
                  title: '提示',
                  content: '注册用户成功！',
                  width: '400px',
                  closable: true,
                  okText: relation === '1' ? '完善企业信息' : relation === '2' ? '关联已有企业' : '',
                  onOk: () => {
                    this.$refs['formUser'].resetFields()
                    if (relation === '1') {
                      this.title = 'step11'
                    } else if (relation === '2') {
                      this.modalTitle = '企业关联'
                      this.isRelation = true
                      this.modal = true
                    }
                  }
                })
              }
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
    getFileShow (url) {
      window.open(imgFileUrl + url, '_blank')
    },
    handleSubmitCompany () {
      this.$refs['formCompany'].validate((valid) => {
        if (valid) {
          if (this.formCompany.parentPartner === undefined || this.formCompany.parentPartner === null || this.formCompany.parentPartner === '') {
            this.formCompany.parentPartner = companyName
          }
          let data = {
            adminPassword: this.formCompany.pwd,
            adminUsername: this.formCompany.userName,
            authorizationName: this.formCompany.authorizationName,
            authorizationUrl: this.formCompany.authorizationUrl,
            authorizeeIdcardName: this.formCompany.authorizeeIdcardName,
            authorizeeIdcardUrl: this.formCompany.authorizeeIdcardUrl,
            businessLicenseName: this.formCompany.businessLicenseName,
            businessLicenseUrl: this.formCompany.businessLicenseUrl,
            idcard: this.formCompany.idCard,
            idcardType: this.formCompany.idType,
            parentPartnerNm: this.formCompany.parentPartner,
            partnerAddress: this.formCompany.partnerAddress,
            partnerAgent: this.formCompany.partnerAgent,
            partnerAgentAreaCd: this.formCompany.partnerAgentAreaCd,
            partnerBankAddress: this.formCompany.partnerBankAddress,
            partnerBankCd: this.formCompany.partnerBankCd,
            partnerBankNm: this.formCompany.partnerBankNm,
            partnerCode: this.formCompany.partnerCode,
            partnerEmail: this.formCompany.partnerEmail,
            partnerEnm: this.formCompany.partnerEnm,
            partnerFax: this.formCompany.partnerFax,
            partnerIntroduct: this.formCompany.partnerIntroduct,
            partnerLinkPhone: this.formCompany.partnerLinkPhone,
            partnerLinkUser: this.formCompany.partnerLinkUser,
            partnerNm: this.formCompany.partnerNm,
            partnerPostalCode: this.formCompany.partnerPostalCode,
            partnerProperty: this.formCompany.partnerProperty,
            partnerQq: this.formCompany.partnerQq,
            partnerSenm: this.formCompany.partnerSenm,
            partnerSnm: this.formCompany.partnerSnm,
            partnerWeb: this.formCompany.partnerWeb,
            registeredCapital: this.formCompany.registeredCapital,
            taxId: this.formCompany.taxId,
            username: this.username,
            verifyCode: this.formCompany.verifyCode,
            partnerPhone: this.formCompany.partnerPhone
          }
          savePartnerInfo(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success(res.data.msg)
              this.modal = true
              this.isRelation = false
              this.modalTitle = ''
              this.getCountDown()
              localStorage.removeItem('registerStep')
              localStorage.removeItem('registerUserName')
              this.$refs['formCompany'].resetFields()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
      this.resetCode()
    },
    handleSubmitRela () {
      this.$refs['formRelation'].validate((valid) => {
        if (valid) {
          let data = {
            username: this.username,
            partnerNm: this.formRelation.businessName
          }
          userPartner(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success(res.data.msg)
              this.modal = true
              this.modalTitle = ''
              this.isRelation = false
              this.getCountDown()
              this.$refs['formRelation'].resetFields()
            } else {
              this.errorMsg = res.data.msg
            }
          })
        }
      })
    },
    handleCancel () {
      if (!this.isRelation) {
        this.toLogin()
      } else {
        this.$refs['formRelation'].resetFields()
      }
    },
    getCountDown () {
      const TIME_COUNT = 20
      if (!this.timerD) {
        this.countD = TIME_COUNT
        this.timerD = setInterval(() => {
          if (this.countD > 0 && this.countD <= TIME_COUNT) {
            this.countD--
          } else {
            this.modal = false
            clearInterval(this.timerD)
            this.timerD = null
            // 跳转的页面写在此处
            this.toLogin()
          }
        }, 1000)
      }
    },
    isSuperAdmin () {
      if (this.formUser.roleType === '3') {
        this.isSuper = false
        this.formUser.relation = '2'
      } else {
        this.isSuper = true
        this.formUser.relation = ''
      }
    }

  }/*,
  destroyed(){
    localStorage.removeItem('registerStep')
    localStorage.removeItem('registerUserName')
  } */
}
</script>
<style lang="less" scoped>
  .submitBtn{background-color: #F45416;color: #fff;border: 1px solid #F45416}
  .ivu-card-body{
    padding: 16px 0px;
  }
  .errorTig{color: red;text-align: center}
  .fileName{
    line-height: 32px;
    height: 32px;
    text-decoration: underline;
    color: #348EED;
  }
  .applyClass{
    padding:40px;
    width:100%;
    text-align: center;
    .waitClass{
      font-size: 18px;
      color:#000;
      padding:20px;
    }
  }
</style>
