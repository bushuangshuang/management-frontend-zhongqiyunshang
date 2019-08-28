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
      <Form v-if="editShow" ref="formCompany" :model="formCompany" :rules="formCompanyRules" :label-width="136" inline>
          <FormItem prop="partnerNm" label="公司全称">
            <Input v-model="formCompany.partnerNm" placeholder="请输入公司全称" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerSnm" label="公司简称">
            <Input v-model="formCompany.partnerSnm" placeholder="请输入公司简称" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerEnm" label="英文名称">
            <Input v-model="formCompany.partnerEnm" placeholder="请输入英文名称" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerSenm" label="英文简称">
            <Input v-model="formCompany.partnerSenm" placeholder="请输入英文简称" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerProperty" label="企业性质">
            <Select v-model="formCompany.partnerProperty" placeholder="请选择企业性质" style="width:200px;">
              <Option v-for="item in partnerPropertyOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="partnerAgent" label="法人代表">
            <Input v-model="formCompany.partnerAgent" placeholder="请输入法人代表" style="width:200px;" />
          </FormItem>
          <FormItem prop="idcardType" label="证件类型">
            <Select v-model="formCompany.idcardType" placeholder="请选择证件类型" style="width:200px;">
              <Option v-for="item in idcardTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="idcard" label="证件号码">
            <Input v-model="formCompany.idcard" placeholder="请输入证件号码" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerAddress" label="企业联系地址">
            <Input v-model="formCompany.partnerAddress" placeholder="请输入企业联系地址" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerAgentAreaCd" label="企业注册地址">
            <Input v-model="formCompany.partnerAgentAreaCd" placeholder="请输入企业注册地址" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerIntroduct" label="公司简介">
            <Input type="textarea" v-model="formCompany.partnerIntroduct" placeholder="请输入公司简介" style="width:546px;" :autosize="{minRows: 3,maxRows: 5}"  />
          </FormItem>
          <FormItem prop="partnerCode" label="统一社会信用代码">
            <Input v-model="formCompany.partnerCode" placeholder="请输入统一社会信用代码" style="width:200px;" />
          </FormItem>
          <FormItem prop="taxId" label="税务登记号">
            <Input v-model="formCompany.taxId" placeholder="请输入税务登记号" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerBankNm" label="开户行名称">
            <Input v-model="formCompany.partnerBankNm" placeholder="请输入开户行名称" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerBankCd" label="开户行账号">
            <Input v-model="formCompany.partnerBankCd" placeholder="请输入开户行账号" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerBankAddress" label="开户行地址">
            <Input v-model="formCompany.partnerBankAddress" placeholder="请输入开户行地址" style="width:200px;" />
          </FormItem>
          <FormItem prop="registeredCapital" label="注册资金(万元)">
            <Input v-model="formCompany.registeredCapital" placeholder="请输入注册资金" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerPhone" label="咨询电话">
            <Input v-model="formCompany.partnerPhone" placeholder="请输入咨询电话" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerLinkUser" label="联系人">
            <Input v-model="formCompany.partnerLinkUser" placeholder="请输入联系人" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerLinkPhone" label="手机号">
            <Input v-model="formCompany.partnerLinkPhone" placeholder="请输入手机号" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerEmail" label="EMAIL">
            <Input v-model="formCompany.partnerEmail" placeholder="请输入EMAIL" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerQQ" label="QQ">
            <Input v-model="formCompany.partnerQq" placeholder="请输入QQ" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerPostalCode" label="邮编">
            <Input v-model="formCompany.partnerPostalCode" placeholder="请输入邮编" style="width:200px;" />
          </FormItem>
          <FormItem prop="partnerFax" label="传真">
            <Input v-model="formCompany.partnerFax" placeholder="请输入传真" style="width:200px;" />
          </FormItem>
          <p class="tipPClass">（支持jpg、jpeg、png、pdf文件上传，单个文件不得超过5M）</p>
          <br/>
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
        <div class="footerDiv">
          <Button type="primary" class="submitBtn" @click="handleSubmitCompany">提交</Button>
        </div>
      </Form>
      <div v-if="!editShow" >
        <div class="padding-l">
          <Row>
            <Col span="11">
            <Card style="width:100%">
              <p slot="title" >变更前</p>
              <custom-form
                :showFooter="false"
                :labelWidth="110"
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
                :labelWidth="110"
                :infoForm="infoFormNew"
                :FormItemDate="FormItemDateModalNew"
              ></custom-form>
            </Card>
            </Col>
          </Row>
        </div>
        <div class="padding-l">
          <Form ref="checkForm" :model="checkForm" label-position="left" :rules="checkRules" :label-width="70">
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
import { loadDataByType, imgFileUrl, upLoadFile } from '@/api/common'
import { storage } from '@/libs/common'
import { getPartnerList, updatePartnerInfo, getPartnerHistoryInfo, updatePartnerStatus, setIsActive } from '@/api/partner/basicInfo'
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
          title: '公司编码',
          key: 'partnerId',
          align: 'center'
        },
        {
          title: '公司全称',
          align: 'center',
          key: 'partnerNm'
        },
        {
          title: '营业执照',
          key: 'partnerCode',
          align: 'center'
        },
        {
          title: '联系人',
          key: 'partnerLinkUser',
          align: 'center'
        },
        {
          title: '联系电话',
          key: 'partnerLinkPhone',
          align: 'center'
        },
        {
          title: '状态',
          key: 'verifyName',
          align: 'center'
        },
        {
          title: '显示',
          key: 'activeName',
          align: 'center'
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
                  display: ((params.row.isVerify === 0 || params.row.isVerify === 4) && params.row.isUpdate !== '1' && this.buttonList['166']) ? 'inline-block' : 'none'
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
                  display: (this.buttonList['167']) ? 'inline-block' : 'none' // params.row.isUpdate !== '1' &&
                },
                on: {
                  click: () => {
                    that.toStatus(params.row)
                  }
                }
              }, params.row.isActive === 0 ? '启用' : params.row.isActive === 1 ? '停用' : '状态')
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
      statusOption: [],
      queryForm: {
        partnerNm: '',
        partnerCode: '',
        isVerify: ''
      },
      isActiveOption: [],
      modal: false,
      editShow: false,
      title: '修改',
      partnerPropertyOption: [],
      idcardTypeOption: [],
      formCompany: {
        id: '',
        partnerNm: '',
        partnerSnm: '',
        partnerEnm: '',
        partnerSenm: '',
        partnerProperty: '',
        partnerAgent: '',
        idcardType: '',
        idcard: '',
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
          { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
        ],
        partnerLinkUser: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerLinkPhone: [{ required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        partnerAddress: [{ required: true, message: '此项必填', trigger: 'blur' }],
        partnerPhone: [
          { required: true, message: '此项必填', trigger: 'blur' },
          { type: 'string', pattern: /^((\d{0,2}-)?(0\d{1,4}-)\d{8,9})|([1][3,4,5,6,7,8][0-9]{9})$/, message: '请输入正确的咨询电话', trigger: 'blur' }
        ],
        partnerPostalCode: [{ type: 'string', pattern: /^[1-9]\d{5}(?!\d)$/, message: '请输入正确的邮编格式', trigger: 'blur' }],
        partnerEmail: [{ type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
        partnerQq: [{ type: 'string', pattern: /^[1-9][0-9]{4,}$/, message: '请输入正确的QQ格式', trigger: 'blur' }],
        partnerFax: [{ type: 'string', pattern: /^(\d{3,4}-)?\d{7,8}$/, message: '请输入正确的传真格式', trigger: 'blur' }],
        idcard: [
          { type: 'string', pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/, message: '请输入正确的身份证格式', trigger: 'blur' }
        ]
      },
      infoFormOld: {
        partnerNm: '',
        partnerSnm: '',
        partnerEnm: '',
        partnerSenm: '',
        partnerProperty: '',
        partnerAgent: '',
        idcardType: '',
        idcard: '',
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
      infoFormNew: {
        partnerNm: '',
        partnerSnm: '',
        partnerEnm: '',
        partnerSenm: '',
        partnerProperty: '',
        partnerAgent: '',
        idcardType: '',
        idcard: '',
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
      infoFormS: {
        id: {
          old: '',
          new: ''
        },
        partnerNm: {
          old: '',
          new: ''
        },
        partnerCode: {
          old: '',
          new: ''
        },
        partnerSnm: {
          old: '',
          new: ''
        },
        partnerEnm: {
          old: '',
          new: ''
        },
        partnerSenm: {
          old: '',
          new: ''
        },
        partnerIntroduct: {
          old: '',
          new: ''
        },
        partnerAddress: {
          old: '',
          new: ''
        },
        partnerEmail: {
          old: '',
          new: ''
        },
        partnerAgent: {
          old: '',
          new: ''
        },
        partnerAgentAreaCd: {
          old: '',
          new: ''
        },
        partnerLinkUser: {
          old: '',
          new: ''
        },
        partnerLinkPhone: {
          old: '',
          new: ''
        },
        partnerWeb: {
          old: '',
          new: ''
        },
        partnerBankCd: {
          old: '',
          new: ''
        },
        partnerBankNm: {
          old: '',
          new: ''
        },
        partnerBankAddress: {
          old: '',
          new: ''
        },
        partnerOrgCd: {
          old: '',
          new: ''
        },
        userVstatus: {
          old: '',
          new: ''
        },
        isActive: {
          old: '',
          new: ''
        },
        isVerify: {
          old: '',
          new: ''
        },
        note: {
          old: '',
          new: ''
        },
        areaId: {
          old: '',
          new: ''
        }
      },
      FormItemDateModalS: [
        {
          type: 'label',
          prop: 'partnerNm',
          label: '公司全称',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerCode',
          label: '营业执照',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSnm',
          label: '企业中文简称',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEnm',
          label: '企业英文名称',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSenm',
          label: '企业英文简称',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerIntroduct',
          label: '企业介绍',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAddress',
          label: '企业联系地址',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEmail',
          label: '企业邮编',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgent',
          label: '法人',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgentAreaCd',
          label: '注册地址',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPhone',
          label: '咨询电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkUser',
          label: '联系人',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkPhone',
          label: '联系人电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerWeb',
          label: '企业网址',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankCd',
          label: '开户行代码',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankNm',
          label: '开户行名称',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankAddress',
          label: '开户行地址',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerOrgCd',
          label: '组织机构代码',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'userVstatus',
          label: '会员验证状态',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'activeName',
          label: '公司状态',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'verifyName',
          label: '审核状态',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'note',
          label: '备注',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'areaId',
          label: '地区代码',
          width: '200px'
        }
      ],
      FormItemDateModalOld: [
        {
          type: 'label',
          prop: 'partnerNm',
          label: '公司全称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSnm',
          label: '公司简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEnm',
          label: '英文名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSenm',
          label: '英文简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerProperty',
          label: '企业性质',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgent',
          isUpdate: false,
          label: '法人代表',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idcardType',
          label: '证件类型',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idcard',
          label: '证件号码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAddress',
          label: '企业联系地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgentAreaCd',
          label: '企业注册地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerCode',
          label: '统一社会信用代码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'taxId',
          label: '税务登记号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankNm',
          label: '开户行名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankCd',
          label: '开户行账号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankAddress',
          label: '开户行地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'registeredCapital',
          label: '注册资金',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPhone',
          label: '咨询电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkUser',
          label: '联系人',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkPhone',
          label: '手机号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEmail',
          label: 'EMAIL',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerQq',
          label: 'QQ',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPostalCode',
          label: '邮编',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerFax',
          label: '传真',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'authorizeeIdcardUrl',
          propName: 'authorizeeIdcardName',
          label: '被授权人身份证',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'businessLicenseUrl',
          propName: 'businessLicenseName',
          label: '营业执照',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'authorizationUrl',
          propName: 'authorizationName',
          label: '授权书(加盖公章)',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'textAreaLabel',
          prop: 'partnerIntroduct',
          label: '公司简介',
          isUpdate: false,
          width: '200px'
        }
      ],
      FormItemDateModalOldO: [
        {
          type: 'label',
          prop: 'partnerNm',
          label: '企业名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerCode',
          label: '企业代码证',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSnm',
          label: '企业中文简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEnm',
          label: '企业英文名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSenm',
          label: '企业英文简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerIntroduct',
          isUpdate: false,
          label: '企业介绍',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAddress',
          label: '企业联系地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEmail',
          label: '企业邮编',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgent',
          label: '法人',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgentAreaCd',
          label: '注册地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPhone',
          label: '咨询电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkUser',
          label: '联系人',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkPhone',
          label: '联系人电话',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerWeb',
          label: '企业网址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankCd',
          label: '开户行代码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankNm',
          label: '开户行名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankAddress',
          label: '开户行地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerOrgCd',
          label: '组织机构代码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'userVstatus',
          label: '会员验证状态',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'activeName',
          label: '公司状态',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'verifyName',
          label: '审核状态',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'note',
          label: '备注',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'areaId',
          label: '地区代码',
          isUpdate: false,
          width: '200px'
        }
      ],
      FormItemDateModalNew: [
        {
          type: 'label',
          prop: 'partnerNm',
          label: '公司全称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSnm',
          label: '公司简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEnm',
          label: '英文名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerSenm',
          label: '英文简称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerProperty',
          label: '企业性质',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgent',
          isUpdate: false,
          label: '法人代表',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idcardType',
          label: '证件类型',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'idcard',
          label: '证件号码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAddress',
          label: '企业联系地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerAgentAreaCd',
          label: '企业注册地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerCode',
          label: '统一社会信用代码',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'taxId',
          label: '税务登记号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankNm',
          label: '开户行名称',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankCd',
          label: '开户行账号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerBankAddress',
          label: '开户行地址',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'registeredCapital',
          label: '注册资金',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPhone',
          label: '咨询电话',
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkUser',
          label: '联系人',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerLinkPhone',
          label: '手机号',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerEmail',
          label: 'EMAIL',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerQq',
          label: 'QQ',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerPostalCode',
          label: '邮编',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'label',
          prop: 'partnerFax',
          label: '传真',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'authorizeeIdcardUrl',
          propName: 'authorizeeIdcardName',
          label: '被授权人身份证',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'businessLicenseUrl',
          propName: 'businessLicenseName',
          label: '营业执照',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'labelFile',
          propUrl: 'authorizationUrl',
          propName: 'authorizationName',
          label: '授权书(加盖公章)',
          isUpdate: false,
          width: '200px'
        },
        {
          type: 'textAreaLabel',
          prop: 'partnerIntroduct',
          label: '公司简介',
          isUpdate: false,
          width: '200px'
        }
      ],
      checkForm: {
        isVerify: ''
      },
      checkRules: {
        isVerify: [{ required: true, message: '此项必填', trigger: 'blur' }]
      },
      checkId: '',
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
    this.getStatusOption()
    this.getIsActiveOption()
    this.getPartnerPropertyOption()
    this.getIdcardTypeOption()
  },
  mounted () {
    this.buttonList = storage.getItem('buttonList')
  },
  methods: {
    getPartnerPropertyOption () {
      let data = {
        'type': 'COMPANY_PROPERTY'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.partnerPropertyOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getIdcardTypeOption () {
      let postDate = {
        'type': 'ID_TYPE'
      }
      loadDataByType(postDate).then(res => {
        if (res.data.code === '200') {
          this.idcardTypeOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getStatusOption () {
      let data = {
        'type': 'PARTNER_STATUS'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') { //eslint-disable-line
          this.statusOption = res.data.list
          let arr = [
            {
              type: 'input',
              prop: 'partnerNm',
              label: '公司全称',
              placeholder: '请输入公司全称',
              width: '140px'
            },
            {
              type: 'input',
              prop: 'partnerCode',
              label: '营业执照',
              placeholder: '请输入营业执照',
              width: '140px'
            },
            {
              type: 'select',
              prop: 'isVerify',
              label: '审核状态',
              placeholder: '请选择审核状态',
              selectOption: this.statusOption,
              width: '140px'
            }
          ]
          this.$store.commit('setQueryData', arr)
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
        if (res.data.code === '200') {
          this.isActiveOption = res.data.list
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getStatus (value, name) {
      let arr = []
      if (name === 'isVerify') {
        arr = this.statusOption
      } else if (name === 'isActive') {
        arr = this.isActiveOption
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
        partnerNm: this.queryForm.partnerNm,
        partnerCode: this.queryForm.partnerCode,
        isVerify: this.queryForm.isVerify,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      getPartnerList(data).then(res => {
        if (res.data.code === '200') {
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
      this.formCompany = {}
      this.formCompany = row
      if (row.isActive !== undefined && row.isActive !== null && row.isActive !== '') {
        this.formCompany.isActive = row.isActive.toString()
      }
      if (row.isVerify !== undefined && row.isVerify !== null && row.isVerify !== '') {
        this.formCompany.isVerify = row.isVerify.toString()
      }
      if (row.userVstatus !== undefined && row.userVstatus !== null && row.userVstatus !== '') {
        this.formCompany.userVstatus = row.userVstatus.toString()
      }
      if (row.registeredCapital !== undefined && row.registeredCapital !== null && row.registeredCapital !== '') {
        this.formCompany.registeredCapital = row.registeredCapital.toString()
      }
      this.title = '编辑'
      this.editShow = true
      this.modal = true
    },
    toApply (row) {
      this.checkId = row.id
      if (row.isVerify !== undefined && row.isVerify !== null && row.isVerify !== '') {
        this.checkForm.isVerify = row.isVerify.toString()
      }
      let data = {
        id: row.id.toString()
      }
      getPartnerHistoryInfo(data).then(res => {
        if (res.data.code === '200') {
          this.infoFormOld = res.data.HistoryInfo.oldInfo
          this.infoFormNew = res.data.HistoryInfo.newInfo
          let key = Object.keys(res.data.HistoryInfo.newInfo)
          let oldArr = (res.data.HistoryInfo.oldInfo === undefined || res.data.HistoryInfo.oldInfo === null) ? [] : Object.values(res.data.HistoryInfo.oldInfo)
          let newArr = Object.values(res.data.HistoryInfo.newInfo)
          /* for (let i = 0; i < key.length; i++) {
            this.infoFormS[key[i]] = {
              old: oldArr.length === 0 ? '' : oldArr[i],
              new: newArr[i]
            }
          } */
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
          this.modal = true
          this.editShow = false
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
    handleUpdateCancel () {
      this.modal = false
      this.formCompany = {}
      this.checkForm = {}
      this.getList()
    },
    handleSubmitApply () {
      this.$refs.checkForm.validate(valid => {
        if (valid) {
          let data = {
            id: this.checkId.toString(),
            isVerify: this.checkForm.isVerify
          }
          updatePartnerStatus(data).then(res => {
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
    getFileShow (url) {
      window.open(imgFileUrl + url, '_blank')
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
    handleSubmitCompany () {
      this.$refs['formCompany'].validate((valid) => {
        if (valid) {
          let data = {
            id: this.formCompany.id,
            authorizationName: this.formCompany.authorizationName,
            authorizationUrl: this.formCompany.authorizationUrl,
            authorizeeIdcardName: this.formCompany.authorizeeIdcardName,
            authorizeeIdcardUrl: this.formCompany.authorizeeIdcardUrl,
            businessLicenseName: this.formCompany.businessLicenseName,
            businessLicenseUrl: this.formCompany.businessLicenseUrl,
            idcard: this.formCompany.idcard,
            idcardType: this.formCompany.idcardType,
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
            partnerPhone: this.formCompany.partnerPhone
          }
          updatePartnerInfo(data).then(res => {
            if (res.data.code === '200') {
              this.$Message.success('修改成功！')
              this.modal = false
              this.getList()
              this.$refs['formCompany'].resetFields()
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
  .padding-l{padding-left:30px;}
  .fileName{
    position: absolute;
    line-height: 32px;
    height: 32px;
    text-decoration: underline;
    color: #348EED;
  }
  .tipPClass{padding: 0 0 0 30px;}
  /*oldInfo: {
          partnerId: '',
          partnerPic: '',
          partnerNm: '',
          partnerCode: '',
          fileUrl: '',
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
          userVstatus: '',
          createDate: '',
          isActive: '',
          status: '',
          lastUpdAcct: '',
          lastUpdTime: '',
          note: '',
          longitude: '',
          latitude: '',
          areaId: '',
          changeInfo: ''
        },
        newInfo: {
          partnerId: '',
          partnerPic: '',
          partnerNm: '',
          partnerCode: '',
          fileUrl: '',
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
          userVstatus: '',
          createDate: '',
          isActive: '',
          status: '',
          lastUpdAcct: '',
          lastUpdTime: '',
          note: '',
          longitude: '',
          latitude: '',
          areaId: '',
          changeInfo: ''
        }*/
</style>
