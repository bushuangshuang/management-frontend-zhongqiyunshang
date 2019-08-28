<template>
  <Form ref="infoForm" :model="infoForm" :rules="rules" :label-width="labelWidth" :inline="isInline">
    <FormItem v-for="(item,index) in FormItemDate" :key="index" :prop="item.prop" :label="item.label">
      <Input v-if="item.type==='input'" @on-blur="setLocal" :readonly="item.readonly" v-model="infoForm[item.prop]" :disabled="!item.disabled?false:item.disabled" :placeholder="item.placeholder" :style="{width:item.width}" />
      <div v-else-if="item.type==='inputPlaceholder'" class="">
        <div class="ivu-form-item-content" :style="{marginLeft: labelWidth}">
          <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type" :style="{width:item.width}">
            <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
            <input data-v-a4c38f90="" style="border:none" type="text">
          </div>
        </div>
      </div>
      <div v-else-if="item.type==='inputUnit'">
        <Input v-model="infoForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" />
        <span style="margin-left:6px;">{{item.unit}}</span>
      </div>
      <Input v-else-if="item.type==='pwd'" type="password" v-model="infoForm[item.prop]" :disabled="!item.disabled?false:item.disabled" :placeholder="item.placeholder" :style="{width:item.width}" />
      <Input v-else-if="item.type==='textArea'" v-model="infoForm[item.prop]" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." :style="{width:item.width}" />
      <Select v-else-if="item.type==='select'" v-model="infoForm[item.prop]" clearable :placeholder="item.placeholder" :style="{width:item.width}" >
        <Option v-for="itemV in item.selectOption" @click.native="setLocal"  :value="itemV.value" :key="itemV.value">{{ itemV.label }}</Option>
      </Select>
      <div v-else-if="item.type==='colorPicker'" :style="{width:item.width}">
        <ColorPicker v-model="infoForm[item.prop]" :disabled="!!item.readonly?item.readonly:false" :colors="item.colors" />
      </div>
      <Date-picker v-else-if="item.type==='date'" :value="infoForm[item.prop]" :format="item.format" type="date" placeholder="选择日期"></Date-picker>
      <div v-else-if="item.type==='file'" :style="{width:item.width}">
          <Upload action="/common/upload" v-if="(!!item.readonly&&item.readonly===true)?false:true"
                  :before-upload="handleUpload"
                  :show-upload-list="false"
                  >
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
          <img v-if="item.fileShow" :src="getFileUrl(infoForm[item.prop])" @click="showImg" class="showImg">
          <Modal v-if="item.fileShow" title="查看图片" v-model="visible">
            <img :src="getFileUrl(infoForm[item.prop])" v-if="visible" style="width: 100%">
            <div slot="footer"></div>
          </Modal>
      </div>
      <div v-else-if="item.type==='productFile'" :style="{width:item.width}">
        <Upload action="/common/upload" v-if="(!!item.readonly&&item.readonly===true)?false:true"
                :before-upload="handleUploadProduct"
                :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        <img v-if="item.fileShow" :src="getFileUrl(infoForm[item.prop])" @click="showImg" class="showImg">
        <Modal v-if="item.fileShow" title="查看图片" v-model="visible">
          <img :src="getFileUrl(infoForm[item.prop])" v-if="visible" style="width: 100%">
          <div slot="footer"></div>
        </Modal>
      </div>
      <div v-else-if="item.type==='label'" class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type" :style="{width:item.width}">
        <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
        <input :style="item.isUpdate?'color:#F45416;border:1px solid #F45416':''" autocomplete="off" spellcheck="false" type="text" v-model="infoForm[item.prop]" placeholder="" readonly="readonly" class="ivu-input ivu-input-default">
      </div>
      <div v-else-if="item.type==='textAreaLabel'" class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type" :style="{width:item.width}">
        <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
        <Input :style="item.isUpdate?'color:#F45416;border:1px solid #F45416':''" v-model="infoForm[item.prop]" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
      </div>
      <div v-else-if="item.type==='labelFile'" @click="getFileShow(infoForm[item.propUrl])">
        <span :style="item.isUpdate?'color:#F45416;border:1px solid #F45416':''" class="fileName" >{{infoForm[item.propName]}}</span>
      </div>
      <div v-else-if="item.type==='labelImg'" class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type" :style="{width:item.width}">
        <img :src="getFileUrl(infoForm[item.prop])" @click="showImg" class="showImgLabel">
        <Modal v-if="item.fileShow" title="查看图片" v-model="visible">
          <img :src="getFileUrl(infoForm[item.prop])" v-if="visible" style="width: 100%">
          <div slot="footer"></div>
        </Modal>
      </div>
    </FormItem>
    <div class="footerDiv" v-if="showFooter">
      <Button type="primary" class="btn1" @click="handleStepNext" v-if="showBtnStepNext">{{btnStepNext}}</Button>
      <Button type="text" class="btn1" v-if="showBtnCancel" @click="handleCancel">{{btnCancel}}</Button>
      <Button type="primary" @click="handleSubmit" v-if="showBtnSubmit">{{btnSubmit}}</Button>
    </div>
  </Form>
</template>

<script>
import { upLoadFile, imgFileUrl } from '@/api/common'

export default {
  name: 'custom-form',
  props: {
    showBtnStepNext: {
      type: Boolean,
      default: false
    },
    btnStepNext: {
      type: String,
      default: '下一步'
    },
    showBtnSubmit: {
      type: Boolean,
      default: true
    },
    isPwd: {
      type: Boolean,
      default: false
    },
    btnSubmit: {
      type: String,
      default: '提交'
    },
    btnCancel: {
      type: String,
      default: '取消'
    },
    showBtnCancel: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    isInline: {
      type: Boolean,
      default: false
    },
    ruleInfoForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    infoForm: {
      type: Object,
      default: () => {
        return {

        }
      }
    },
    FormItemDate: {
      type: Array,
      default: () => {
        return [{
          type: '',
          prop: '',
          label: '',
          model: '',
          placeholder: '',
          selectOption: [],
          radioOption: []
        }]
      }
    }
  },
  data () {
    return {
      rules: this.ruleInfoForm,
      imgFileUrl: imgFileUrl,
      visible: false
    }
  },
  watch: {
  },
  created () {
    this.handleParentCancel()
  },
  methods: {
    handleParentCancel () {
      this.$on('handleParentCancel', function () {
        this.$refs['infoForm'].resetFields()
      })
    },
    handleFormatError (file) {
      this.$Message.info('支持jpg、jpeg、png图片上传')
    },
    resetInfoForm () {
      this.$refs['infoForm'].resetFields()
    },
    handleFormat () {
      this.$emit('on-format')
    },
    handleUpload (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.infoForm.fileUrl = res.data.list[0]
          this.infoForm.partnerPic = res.data.list[0]
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleUploadProduct (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.infoForm.carProductPic = res.data.list[0]
          this.setLocal()
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    handleUploadIdCard (file) {
      const formData = new FormData()
      formData.append('upfile', file)
      upLoadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.infoForm.authorizeeIdcardUrl = res.data.list[0]
          this.infoForm.authorizeeIdcardName = file.name
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
          this.infoForm.businessLicenseUrl = res.data.list[0]
          this.infoForm.businessLicenseName = file.name
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
          this.infoForm.authorizationUrl = res.data.list[0]
          this.infoForm.authorizationName = file.name
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },

    handleCancel () {
      this.$emit('on-form-cancel')
    },
    handleSubmit () {
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          this.$emit('on-form-submit', { infoForm: this.infoForm })
        }
      })
    },
    handleStepNext () {
      this.$emit('on-step-next')
    },
    handleSetLocal () {
      this.$refs['infoForm'].validate((valid) => {
        if (valid) {
          this.$emit('on-form-set-local', { infoForm: this.infoForm })
        }
      })
    },
    showImg () {
      this.visible = true
    },
    changeUserType (value) {
    },
    getColor (value) {
      let flag = false
      if (value !== undefined && value !== null && value !== '') {
        if (value.old === value.new) {
          flag = true
        }
      }
      return flag
    },
    getFileUrl (url) {
      let fileUrl = ''
      if (url !== undefined && url !== null && url !== '') {
        fileUrl = this.imgFileUrl + url
      }
      return fileUrl
    },
    setLocal () {
      this.$emit('on-set-local', { infoForm: this.infoForm })
    },
    getFileShow (url) {
      window.open(imgFileUrl + url, '_blank')
    }
  }

}
</script>

<style lang="less" scoped>
  #allmap{
    width:400px;
    height:400px;
    font-family: '微软雅黑';
    border: 1px red solid;
  }
  .fileName{
    line-height: 32px;
    height: 32px;
    text-decoration: underline;
    color: #348EED;
  }
  .showImg{
    position: absolute;
    top: -5px;
    left: 118px;
    height: 50px;
    width: 80px;
  }
  .showImgLabel{
    position: absolute;
    top: -25px;
    left: 0px;
    height: 50px;
    width: 80px;
  }
  .labels{
    width:400px;
    display:flex;
    justify-content:space-between
  }
  .timer-style{
    font-size: 12px;
  }
</style>
