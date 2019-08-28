<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :bordered="false">
        <p slot="title">欢迎登录</p>
        <!--<a href="#" slot="extra" @click="toRegister" class="res-style">立即注册</a>-->
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="res-forget"><span class="res-style" @click="toRegister">立即注册</span><span class="res-style" @click="toForget">忘记密码</span></p>
          <p v-if="isError" class="login-tip" style="color:red;">{{errorMsg}}</p>
          <p v-if="isError==true?false:true" class="login-tip" style="">{{errorMsg}}</p>
        </div>
      </Card>
    </div>
    <Modal v-model="modal" :title="title" :mask-closeable="false" width="600" @on-cancel="handleCancel">
      <Form v-if="isForget" ref="formUser" :model="formUser" :rules="formUserRules" :label-width="200">
        <FormItem label="账号" prop="username">
          <Input v-model="formUser.username" placeholder="请输入账号" @on-blur="onBlurUserName" style="width:50%;" />
        </FormItem>
        <FormItem label="手机号" prop="oldPhone" >
          <Input v-model="formUser.oldPhone" placeholder="请输入手机号" style="width:50%;" />
        </FormItem>
        <FormItem label="验证码" prop="verifyCode" >
          <Input v-model="formUser.verifyCode" type="text" placeholder="请输入验证码" style="width:50%;" class="code" size="large">
          <span slot="append" @click="getCode" class="timer-style" :style="codeDisabled?'color:#9D9D9D;':''">{{verifyText}}</span>
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="pwd">
          <Input v-model="formUser.pwd" type="password" placeholder="请输入新密码" style="width:50%;" />
        </FormItem>
        <FormItem label="确认新密码" prop="conPwd" >
          <Input v-model="formUser.conPwd" type="password" placeholder="请输入确认新密码" style="width:50%;" />
        </FormItem>
      </Form>
      <div slot="footer" style="text-align: center">
        <Button type="primary" class="submitBtn" @click="handleSubmitF">提交</Button>
      </div>
    </Modal>
    <Modal v-model="modalRela" title="关联已有企业" :mask-closeable="false" width="600" @on-cancel="handleRelaCancel">
      <div>
        <Form ref="formRelation" :model="formRelation" :rules="formRelationRules" :label-width="200">
          <FormItem prop="type" label="企业名称">
            <Input v-model="formRelation.businessName" placeholder="请输入企业名称" style="width:50%;" />
          </FormItem>
        </Form>
        <div class="login-tip">{{errorMsgM}}</div>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" class="submitBtn" @click="handleSubmitRela">提交</Button>
      </div>
    </Modal>
    <Footer class="footer-position">
      平台运营：中企云商科技股份有限公司
      联系电话：0000000000000000
      地址：某某市
      备案号
    </Footer>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { getVerifyCode, getUserInfo, forgetPwd, userPartner } from '@/api/common'
export default {
  components: {
    LoginForm
  },
  data () {
    const pwdValidate = (rule, value, callback) => {
      this.$refs.formUser.validateField('conPwd')
      callback()
    }
    const pwdCheckValidate = (rule, value, callback) => {
      if (this.formUser.pwd !== '' && value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (this.formUser.pwd !== value) {
        callback(new Error('密码和确认密码应相同'))
      } else {
        callback()
      }
    }
    return {
      isError: false,
      errorMsg: '输入任意用户名和密码即可',
      modal: false,
      modalRela: false,
      errorMsgM: '',
      title: '',
      isForget: false,
      codeDisabled: false,
      verifyText: '获取验证码',
      countdown: 60,
      timer: null,
      username: '',
      formUser: {
        username: '',
        oldPhone: '',
        phone: '',
        verifyCode: '',
        pwd: '',
        conPwd: ''
      },
      formUserRules: {
        username: [{ required: true, message: '此项必填', trigger: 'blur' }],
        verifyCode: [{ required: true, message: '此项必填', trigger: 'blur' }],
        pwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdValidate, trigger: 'blur' }
        ],
        conPwd: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { required: true, validator: pwdCheckValidate, trigger: 'blur' }
        ]
      },
      formRelation: {
        businessName: ''
      },
      formRelationRules: {
        businessName: [{ required: true, message: '此项必填', trigger: 'blur' }]
      }

    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password, phone, verifyCode }) {
      this.handleLogin({ userName, password, phone, verifyCode }).then(res => {
        if (res.data.code === '200') {
          this.$router.push({
            name: this.$config.homeName
          })
        } else if (res.data.errorCode === '1') { // 完善企业信息
          this.$Modal.warning({
            title: '提示',
            content: '当前用户未完善企业信息',
            width: '400px',
            closable: true,
            okText: '完善企业信息',
            onOk: () => {
              localStorage.setItem('registerStep', 'step11')
              localStorage.setItem('registerUserName', userName)
              this.$router.push({ name: 'register' })
            }
          })
        } else if (res.data.errorCode === '2') { // 关联已有企业
          this.modalRela = true
          this.username = userName
        } else {
          this.isError = true
          this.errorMsg = res.data.msg
        }
        /* if (res == undefined || res.length == 0) { //eslint-disable-line
          this.$router.push({
            name: this.$config.homeName
          })
        }else {
          this.isError = true
          this.errorMsg = res.toString()
        } */
      })
    },
    toRegister () {
      this.$router.push({ name: 'register' })
    },
    toForget () {
      this.modal = true
      this.title = '忘记密码'
      this.isForget = true
    },
    handleCancel () {
      this.modal = false
      this.$refs['formUser'].resetFields()
    },
    handleRelaCancel () {
      this.modalRela = false
      this.$refs['formRelation'].resetFields()
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
              this.modalRela = false
              this.$refs['formRelation'].resetFields()
            } else {
              this.errorMsgM = res.data.msg
            }
          })
        }
      })
    },
    handleSubmitF () {
      this.$refs['formUser'].validate((valid) => {
        if (valid) {
          let data = {
            username: this.formUser.username,
            phone: this.formUser.phone,
            verifyCode: this.formUser.verifyCode,
            pwd: this.formUser.pwd
          }
          forgetPwd(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('修改密码成功！')
              this.$refs['formUser'].resetFields()
              this.modal = false
              this.resetCode()
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        }
      })
    },
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
    resetCode () {
      clearInterval(this.timer)
      this.codeDisabled = false
      this.verifyText = '获取验证码'
      this.countdown = 60
      this.timer = null
    },
    onBlurUserName () {
      let data = {
        username: this.formUser.username
      }
      getUserInfo(data).then(res => {
        if (res.data.code === '200') {
          this.formUser.phone = res.data.msg.data.phone
          this.formUser.oldPhone = res.data.msg.data.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    }
  }
}
</script>

<style>
  .footer-position{text-align:center;position: absolute;bottom:0px;width:100%}
  .ivu-layout-footer{
    background-color:rgba(0, 0, 0, 0)!important;
    color: #dcdcdc!important;
  }

</style>
