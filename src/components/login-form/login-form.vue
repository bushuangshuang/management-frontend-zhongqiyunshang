<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名" @on-blur="onBlurUserName">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <div v-if="isAdmin==='1'">
      <FormItem prop="phone">
        <Input v-model="form.phone" placeholder="请输入手机号" >
        <span slot="prepend">
          <Icon :size="16" type="ios-call" />
        </span>
        </Input>
      </FormItem>
      <FormItem prop="verifyCode" >
        <Input v-model="form.verifyCode" type="text" placeholder="请输入验证码" class="code" size="large">
        <span slot="prepend">
          <Icon :size="16" type="md-checkmark-circle" />
        </span>
        <span slot="append" @click="getCode" class="timer-style" :style="codeDisabled?'color:#9D9D9D;':''">{{verifyText}}</span>
        </Input>
      </FormItem>
    </div>
    <FormItem style="margin-bottom:0px;">
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { getVerifyCode, getUserInfo } from '@/api/common'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    phoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    },
    verifyCodeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      codeDisabled: false,
      verifyText: '获取验证码',
      countdown: 60,
      timer: null,
      form: {
        userName: '', // 'super_admin',
        password: '', // '123456'
        phone: '',
        verifyCode: ''
      },
      isAdmin: '0'
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        phone: this.phoneRules,
        verifyCode: this.verifyCodeRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            phone: this.form.phone,
            verifyCode: this.form.verifyCode
          })
        }
      })
    },
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
    onBlurUserName () {
      let data = {
        username: this.form.userName
      }
      getUserInfo(data).then(res => {
        if (res.data.code === '200') {
          this.isAdmin = res.data.msg.isAdmin
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    }
  }
}
</script>
