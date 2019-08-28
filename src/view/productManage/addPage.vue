<template>
  <div class="add-page">
    <div style="min-height:200px;">
      <div class="productTip">部分信息提示：<span>标配&nbsp;&nbsp;●</span><span>选配&nbsp;&nbsp;○</span><span>无&nbsp;&nbsp;-</span></div>
      <Tabs :value="tabName" @on-click="tabsChanged">
        <TabPane label="基本信息" name="name1">
          <custom-form
             :isInline="true"
             :showBtnCancel="false"
             :labelWidth="140"
             :infoForm="infoForm.tCarBasic"
             :ruleInfoForm="rule.tCarBasic"
             :FormItemDate="FormItemDate.tCarBasic"
             @on-set-local="setLocal1"
             @on-form-submit="handleSubmit"
             :showBtnStepNext="true"
             @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="车辆尺寸信息" name="name2">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarSize"
            :FormItemDate="FormItemDate.tCarSize"
            @on-set-local="setLocal9"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="动力系统信息" name="name3">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarPower"
            :FormItemDate="FormItemDate.tCarPower"
            @on-set-local="setLocal7"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="底盘信息" name="name4">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarChassis"
            :FormItemDate="FormItemDate.tCarChassis"
            @on-set-local="setLocal3"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="安全配置信息" name="name5">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarSecurity"
            :FormItemDate="FormItemDate.tCarSecurity"
            @on-set-local="setLocal8"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="驾驶辅助信息" name="name6">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarAdas"
            :FormItemDate="FormItemDate.tCarAdas"
            @on-set-local="setLocal2"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="外部配置信息" name="name7">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarEconfiguration"
            :FormItemDate="FormItemDate.tCarEconfiguration"
            @on-set-local="setLocal4"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="内部配置信息" name="name8">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarIconfiguration"
            :FormItemDate="FormItemDate.tCarIconfiguration"
            @on-set-local="setLocal6"
            @on-form-submit="handleSubmit"
            :showBtnStepNext="true"
            @on-step-next="handleStepNext"
          ></custom-form>
        </TabPane>
        <TabPane label="娱乐信息" name="name9">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarEnt"
            :FormItemDate="FormItemDate.tCarEnt"
            @on-set-local="setLocal5"
            @on-form-submit="handleSubmit"
          ></custom-form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import { loadDataByType } from '@/api/common'
import { addOrUpdateProduct } from '@/api/partner/productPrice'
export default {
  name: 'addPage',
  components: {
    CustomForm
  },
  data () {
    return {
      tabName: 'name1',
      onSaleOption: [
        {
          value: '0',
          label: '停产'
        },
        {
          value: '1',
          label: '在售'
        }
      ],
      compartmentTypeOption: [],
      kindOption: [],
      infoForm: {
        tCarBasic: {
          classNm: '',
          seriesNm: '',
          productCd: '',
          carProductNm: '',
          carProductUcd: '',
          carProductStyle: '',
          carProductVer: '',
          carProductPrice: '',
          carProductKeep: '',
          carProductKind: '',
          carProductIntro: '',
          onSale: '',
          earnestMoney: '',
          carProductPic: ''
        },
        tCarSize: {
          compartmentType: '',
          carStructure: '',
          carSize: '',
          carSizeWheelbase: '',
          carSizeMass: '',
          carSizeSeat: '',
          carSizeLvolume: '',
          carSizeOvolume: '',
          carSizeTyreA: '',
          carSizeTyreB: '',
          carSizeTyreC: '',
          carSizeMinTd: '',
          carSizeMaxTd: ''
        },
        tCarPower: {
          motorType: '',
          motorMaterial: '',
          carPowerSvolume: '',
          carPowerKw: '',
          carPowerMaxPs: '',
          carPowerMaxNmRpm: '',
          carPowerMaxNm: '',
          carPowerCylinder: '',
          carPowerCpum: '',
          carPowerIa: '',
          carPowerOilType: '',
          carPowerOilNum: '',
          carPowerStart: '',
          carPowerT: '',
          carPowerTnum: '',
          carPowerMaxSpeed: '',
          carPowerAccs: '',
          carPowerOilBee: '',
          carPowerEp: '',
          carPowerZkw: '',
          carPowerZnm: '',
          carPowerHemkw: '',
          carPowerHemnm: '',
          carPowerBemkw: '',
          carPowerBemnm: '',
          batterybrand: '',
          carPowerBatkwh: '',
          carPowerBatTime: '',
          carPowerBatBee: '',
          carPowerMaxKm: '',
          brsSystem: '',
          carPowerBatQa: ''
        },
        tCarChassis: {
          drivingMode: '',
          frontType: '',
          backType: '',
          susAdjust: '',
          frontBrakeT: '',
          backBrakeT: '',
          parkBrakeT: '',
          assistType: '',
          carStructure: '',
          slipDifferential: '',
          approachAngle: '',
          departureAngle: '',
          directionalLock: '',
          acceleratorPedal: ''
        },
        tCarSecurity: {
          carAbs: '',
          carEbd: '',
          carBa: '',
          carArs: '',
          carEsp: '',
          carAirbagM: '',
          carAirbagV: '',
          carAirbagF: '',
          carAirbagB: '',
          carSafeCur: '',
          carKneeBall: '',
          beltAirbag: '',
          tubeCentral: '',
          carTyreP: '',
          carTyreE: '',
          carChildChair: ''
        },
        tCarAdas: {
          carConstantSpeed: '',
          laneRetention: '',
          parallelAuxiliary: '',
          collisionAlarm: '',
          fatigueReminder: '',
          autoParking: '',
          teleParking: '',
          autopilotAssis: '',
          autoStation: '',
          uphillAssis: '',
          hillDecentCon: '',
          nightVision: '',
          varGearSteer: '',
          panorama: '',
          reverseSensorF: '',
          backupEffect: '',
          choiseDriveMode: ''
        },
        tCarEconfiguration: {
          carHeadlight: '',
          carLed: '',
          carAutolight: '',
          carFoglampe: '',
          carLightFunc: '',
          stopLamp: '',
          carSkylightT: '',
          carWindowFe: '',
          carWindowBe: '',
          carRearviewAdjust: '',
          carDazzlingInner: '',
          rearviewMirrorEf: '',
          carMediaRear: '',
          carDazzlingEx: '',
          carPrivacyGlass: '',
          carSunshade: '',
          carSunshadeCur: '',
          carRearWiper: '',
          defrostFogging: '',
          carSuctionDoor: '',
          carSlideGate: '',
          electricBackupBox: '',
          carLuggRack: '',
          centralControlLock: '',
          intelligentKey: '',
          externalAntenna: '',
          telecontrol: '',
          empennage: '',
          sportSuit: '',
          carWiperFront: ''
        },
        tCarIconfiguration: {
          interiorMaterial: '',
          carAtmosLamp: '',
          cosmeticMirror: '',
          steerWheelMa: '',
          steerWheelMul: '',
          steerWheelAdjust: '',
          steerWheelHeat: '',
          steerWheelChgn: '',
          airConditionF: '',
          airConditionB: '',
          fragSys: '',
          airPurge: '',
          onboardRefrige: '',
          seatArrangeForm: '',
          masterSeat: '',
          copilotSeat: '',
          otherSeat: ''
        },
        tCarEnt: {
          crystalScreen: '',
          dashBoard: '',
          driveDisplayScreen: '',
          hudDisplay: '',
          guideGps: '',
          smartConnectLocation: '',
          voiceControl: '',
          carplay: '',
          wirelessCharge: '',
          gestureControl: '',
          radio: '',
          cdDvd: '',
          blueWifi: '',
          externalInterface: '',
          carTv: '',
          audioBrand: '',
          speakerNum: '',
          systemEnt: '',
          powerSupply: ''
        }
      },
      rule: {
        tCarBasic: {
          carProductNm: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carProductUcd: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carProductStyle: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carProductVer: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carProductPrice: [
            { required: true, message: '此项必填', trigger: 'change' },
            { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
          ],
          carProductKeep: [{ required: true, message: '此项必填', trigger: 'blur' }],
          carProductKind: [{ required: true, message: '此项必填', trigger: 'blur' }],
          onSale: [{ required: true, message: '此项必填', trigger: 'blur' }],
          earnestMoney: [
            { required: true, message: '此项必填', trigger: 'blur' },
            { type: 'string', pattern: /^\d+(\.\d{1,2})?$/, message: '请输入整数或小数点后两位', trigger: 'blur' }
          ],
          carProductPic: [{ required: true, message: '此项必填', trigger: 'blur' }]
        }
      }
    }
  },
  computed: {
    FormItemDate () {
      return this.$store.state.user.FormItemDate
    }
  },
  created () {
    this.getLocalObj()
    this.getKindOption()
  },
  mounted () {
  },
  methods: {
    getKindOption () {
      let data = {
        type: 'CAR_PRODUCT_KIND'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.kindOption = res.data.list
          let data = {
            type: 'COMPARTMENT_TYPE'
          }
          loadDataByType(data).then(res => {
            if (res.data.code === '200') {
              this.compartmentTypeOption = res.data.list
              let obj = {
                tCarBasic: [
                  {
                    type: 'input',
                    prop: 'classNm',
                    label: '品牌',
                    readonly: true,
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'seriesNm',
                    label: '车系',
                    readonly: true,
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carProductNm',
                    label: '产品名称',
                    placeholder: '请输入产品名称',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carProductUcd',
                    label: '产品识别码',
                    placeholder: '请输入产品识别码',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carProductStyle',
                    label: '产品款式',
                    placeholder: '请输入产品款式',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carProductVer',
                    label: '产品版本',
                    placeholder: '请输入产品版本',
                    width: '200px'
                  },
                  {
                    type: 'inputUnit',
                    prop: 'carProductPrice',
                    label: '厂商指导价格',
                    placeholder: '请输入厂商指导价格',
                    unit: '元',
                    width: '182px'
                  }, {
                    type: 'input',
                    prop: 'carProductKeep',
                    label: '保修政策',
                    placeholder: '请输入保修政策',
                    width: '200px'
                  }, {
                    type: 'select',
                    prop: 'carProductKind',
                    label: '产品类型',
                    selectOption: this.kindOption,
                    placeholder: '请输入产品类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carProductIntro',
                    label: '产品简介',
                    placeholder: '请输入产品简介',
                    width: '200px'
                  },
                  {
                    type: 'select',
                    prop: 'onSale',
                    label: '是否在售',
                    selectOption: this.onSaleOption,
                    placeholder: '请选择是否在售',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'earnestMoney',
                    label: '履约保证金',
                    placeholder: '请输入履约保证金',
                    width: '200px'
                  },
                  {
                    type: 'productFile',
                    prop: 'carProductPic',
                    label: '产品图片',
                    fileShow: true,
                    width: '200px'
                  }
                ],
                tCarSize: [
                  {
                    type: 'select',
                    prop: 'compartmentType',
                    label: '车身类型',
                    selectOption: this.compartmentTypeOption,
                    placeholder: '请输入车身类型',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carStructure',
                    label: '车身结构',
                    placeholder: '请输入车身结构',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSize',
                    label: '长*宽*高(mm)',
                    placeholder: '请输入长*宽*高',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSizeWheelbase',
                    label: '轴距(mm)',
                    placeholder: '请输入轴距',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSizeMass',
                    label: '整备质量(kg)',
                    placeholder: '请输入整备质量',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSizeSeat',
                    label: '座位数(个)',
                    placeholder: '请输入座位数',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSizeLvolume',
                    label: '行李箱容积(L)',
                    placeholder: '请输入行李箱容积',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carSizeOvolume',
                    label: '油箱容积(L)',
                    placeholder: '请输入油箱容积',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSizeTyreA',
                    label: '前轮胎规格',
                    placeholder: '请输入前轮胎规格',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSizeTyreB',
                    label: '后轮胎规格',
                    placeholder: '请输入后轮胎规格',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSizeTyreC',
                    label: '备胎',
                    placeholder: '请输入备胎',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSizeMinTd',
                    label: '最小转弯直径(mm)',
                    placeholder: '请输入最小转弯直径',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSizeMaxTd',
                    label: '最小离地间隙(mm)',
                    placeholder: '请输入最小离地间隙',
                    width: '200px'
                  }
                ],
                tCarPower: [
                  {
                    type: 'input',
                    prop: 'motorType',
                    label: '发动机型号',
                    placeholder: '请输入发动机型号',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'motorMaterial',
                    label: '发动机材质',
                    placeholder: '请输入发动机材质',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerSvolume',
                    label: '排气量(L)',
                    placeholder: '请输入排气量',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerKw',
                    label: '最大功率(kW)',
                    placeholder: '请输入最大功率',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxPs',
                    label: '最大马力(Ps)',
                    placeholder: '请输入最大马力',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxRpm',
                    label: '最大功率转速(rpm)',
                    placeholder: '请输入最大功率转速',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxNm',
                    label: '最大扭矩(N.m)',
                    placeholder: '请输入最大扭矩',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxNmRpm',
                    label: '最大扭矩转速(rpm)',
                    placeholder: '请输入最大扭矩转速',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carPowerCylinder',
                    label: '缸体形式',
                    placeholder: '请输入缸体形式',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerCpum',
                    label: '气缸数(缸)',
                    placeholder: '请输入气缸数',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerIa',
                    label: '进气形式',
                    placeholder: '请输入进气形式',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerOilType',
                    label: '供油方式',
                    placeholder: '请输入供油方式',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerOilNum',
                    label: '燃油标号',
                    placeholder: '请输入燃油标号',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerStart',
                    label: '发动机启停',
                    placeholder: '请输入发动机启停',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerT',
                    label: '变速箱类型',
                    placeholder: '请输入变速箱类型',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerTnum',
                    label: '挡位个数',
                    placeholder: '请输入挡位个数',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxSpeed',
                    label: '最高车速(km/h)',
                    placeholder: '请输入最高车速',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carPowerAccs',
                    label: '0-100km/h加速时间(s)',
                    placeholder: '请输入0-100km/h加速时间',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerOilBee',
                    label: '混合工况油耗(L/100km)',
                    placeholder: '请输入混合工况油耗',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerEp',
                    label: '环保标准',
                    placeholder: '请输入环保标准',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerZkw',
                    label: '电动机总功率(kW)',
                    placeholder: '请输入电动机总功率',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerZnm',
                    label: '电动机总扭矩(N.m)',
                    placeholder: '请输入电动机总扭矩',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerHemkw',
                    label: '前电动机最大功率(kW)',
                    placeholder: '请输入前电动机最大功率',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerHemnm',
                    label: '前电动机最大扭矩(N.m)',
                    placeholder: '请输入前电动机最大扭矩',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBemkw',
                    label: '后电动机最大功率(kW)',
                    placeholder: '请输入后电动机最大功率',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBemnm',
                    label: '后电动机最大扭矩(N.m)',
                    placeholder: '请输入后电动机最大扭矩',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'batteryBrand',
                    label: '电池品牌',
                    placeholder: '请输入电池品牌',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBatkwh',
                    label: '电池容量(kwh)',
                    placeholder: '请输入电池容量',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBatTime',
                    label: '电池充电时间',
                    placeholder: '请输入电池充电时间',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBatBee',
                    label: '耗电量(kwh/100km)',
                    placeholder: '请输入耗电量',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerMaxKm',
                    label: '最大续航里程(km)',
                    placeholder: '请输入最大续航里程',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'brsSystem',
                    label: 'BRS系统(48V电源)',
                    placeholder: '请输入BRS系统',
                    width: '200px'
                  },
                  {
                    type: 'input',
                    prop: 'carPowerBatQa',
                    label: '电池组质保',
                    placeholder: '请输入电池组质保',
                    width: '200px'
                  }
                ],
                tCarChassis: [
                  {
                    type: 'input',
                    prop: 'drivingMode',
                    label: '驱动方式',
                    placeholder: '请输入驱动方式',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'frontType',
                    label: '前悬架类型',
                    placeholder: '请输入前悬架类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'backType',
                    label: '后悬架类型',
                    placeholder: '请输入后悬架类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'susAdjust',
                    label: '可调悬架',
                    placeholder: '请输入可调悬架',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'frontBrakeT',
                    label: '前轮制动器类型',
                    placeholder: '请输入前轮制动器类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'backBrakeT',
                    label: '后轮制动器类型',
                    placeholder: '请输入后轮制动器类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'parkBrakeT',
                    label: '驻车制动器类型',
                    placeholder: '请输入驻车制动器类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'assistType',
                    label: '助力类型',
                    placeholder: '请输入助力类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carStructure',
                    label: '车体结构',
                    placeholder: '请输入车体结构',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'slipDifferential',
                    label: '限滑差速器',
                    placeholder: '请输入限滑差速器',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'approachAngle',
                    label: '接近角',
                    placeholder: '请输入接近角',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'departureAngle',
                    label: '离去角',
                    placeholder: '请输入离去角',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'directionalLock',
                    label: '方向锁',
                    placeholder: '请输入方向锁',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'acceleratorPedal',
                    label: '油门踏板',
                    placeholder: '请输入油门踏板',
                    width: '200px'
                  }
                ],
                tCarSecurity: [
                  {
                    type: 'input',
                    prop: 'carAbs',
                    label: '防抱死制动(ABS)',
                    placeholder: '请输入防抱死制动',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carEbd',
                    label: '制动力分配(EBD/CBC)',
                    placeholder: '请输入制动力分配',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carBa',
                    label: '制动辅助(BA/EBA/BAS)',
                    placeholder: '请输入制动辅助',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carArs',
                    label: '牵引力控制(ARS/TCS/TRC)',
                    placeholder: '请输入牵引力控制',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carEsp',
                    label: '车身稳定控制(ESP/DSC/VSX)',
                    placeholder: '请输入车身稳定控制',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAirbagM',
                    label: '主驾驶安全气囊',
                    placeholder: '请输入主驾驶安全气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAirbagV',
                    label: '副驾驶安全气囊',
                    placeholder: '请输入副驾驶安全气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAirbagF',
                    label: '前侧气囊',
                    placeholder: '请输入前侧气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAirbagB',
                    label: '后侧气囊',
                    placeholder: '请输入后侧气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSafeCur',
                    label: '侧安全气帘',
                    placeholder: '请输入侧安全气帘',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carKneeBall',
                    label: '膝部气囊',
                    placeholder: '请输入膝部气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'beltAirbag',
                    label: '安全带气囊',
                    placeholder: '请输入安全带气囊',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'tubeCentral',
                    label: '后排中央气管',
                    placeholder: '请输入后排中央气管',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carTyreP',
                    label: '胎压监测',
                    placeholder: '请输入胎压监测',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carTyreE',
                    label: '零胎压续航轮胎',
                    placeholder: '请输入零胎压续航轮胎',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carChildChair',
                    label: '儿童座椅接口',
                    placeholder: '请输入儿童座椅接口',
                    width: '200px'
                  }
                ],
                tCarAdas: [
                  {
                    type: 'input',
                    prop: 'carConstantSpeed',
                    label: '定速巡航',
                    placeholder: '请输入定速巡航',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'laneRetention',
                    label: '车道保持',
                    placeholder: '请输入车道保持',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'parallelAuxiliary',
                    label: '并线辅助',
                    placeholder: '请输入并线辅助',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'collisionAlarm',
                    label: '碰撞报警',
                    placeholder: '请输入碰撞报警',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'fatigueReminder',
                    label: '疲劳提醒',
                    placeholder: '请输入疲劳提醒',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'autoParking',
                    label: '自动泊车',
                    placeholder: '请输入自动泊车',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'teleParking',
                    label: '遥控泊车',
                    placeholder: '请输入遥控泊车',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'autopilotAssis',
                    label: '自动驾驶辅助',
                    placeholder: '请输入自动驾驶辅助',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'autoStation',
                    label: '自动驻车',
                    placeholder: '请输入自动驻车',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'uphillAssis',
                    label: '上坡辅助',
                    placeholder: '请输入上坡辅助',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'hillDecentCon',
                    label: '陡坡缓降',
                    placeholder: '请输入产品名称',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'nightVision',
                    label: '夜视系统',
                    placeholder: '请输入夜视系统',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'varGearSteer',
                    label: '可变齿轮转向',
                    placeholder: '请输入可变齿轮转向',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'panorama',
                    label: '全景影像',
                    placeholder: '请输入全景影像',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'reverseSensorF',
                    label: '前/后倒车雷达',
                    placeholder: '请输入前/后倒车雷达',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'backupEffect',
                    label: '倒车影像',
                    placeholder: '请输入倒车影像',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'choiseDriveMode',
                    label: '驾驶模式选择',
                    placeholder: '请输入驾驶模式选择',
                    width: '200px'
                  }
                ],
                tCarEconfiguration: [
                  {
                    type: 'input',
                    prop: 'carHeadlight',
                    label: '前大灯',
                    placeholder: '请输入前大灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carLed',
                    label: '日间行车灯',
                    placeholder: '请输入日间行车灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAutolight',
                    label: '自动大灯',
                    placeholder: '请输入自动大灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carFoglampe',
                    label: '前/后雾灯',
                    placeholder: '请输入前/后雾灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carLightFunc',
                    label: '大灯功能',
                    placeholder: '请输入大灯功能',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'stopLamp',
                    label: '制动灯',
                    placeholder: '请输入制动灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSkylightT',
                    label: '天窗类型',
                    placeholder: '请输入天窗类型',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carWindowFe',
                    label: '前电动车窗',
                    placeholder: '请输入前电动车窗',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carWindowBe',
                    label: '后电动车窗',
                    placeholder: '请输入后电动车窗',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carRearviewAdjust',
                    label: '外后视镜电动调节',
                    placeholder: '请输入外后视镜电动调节',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carDazzlingInner',
                    label: '内后视镜自动防眩目',
                    placeholder: '请输入内后视镜自动防眩目',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'rearviewMirrorEf',
                    label: '外后视镜功能',
                    placeholder: '请输入外后视镜功能',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carMediaRear',
                    label: '流媒体后视镜',
                    placeholder: '请输入流媒体后视镜',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carDazzlingEx',
                    label: '外后视镜自动防眩目',
                    placeholder: '请输入外后视镜自动防眩目',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carPrivacyGlass',
                    label: '隐私玻璃',
                    placeholder: '请输入隐私玻璃',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSunshade',
                    label: '后排侧遮阳帘',
                    placeholder: '请输入后排侧遮阳帘',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSunshadeCur',
                    label: '后遮阳帘',
                    placeholder: '请输入后遮阳帘',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carRearWiper',
                    label: '前/后雨刷器',
                    placeholder: '请输入前/后雨刷器',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'defrostFogging',
                    label: '除霜除雾',
                    placeholder: '请输入除霜除雾',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSuctionDoor',
                    label: '电吸门',
                    placeholder: '请输入电吸门',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carSlideGate',
                    label: '电动侧滑门',
                    placeholder: '请输入电动侧滑门',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'electricBackupBox',
                    label: '电动后备箱',
                    placeholder: '请输入电动后备箱',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carLuggRack',
                    label: '行李架',
                    placeholder: '请输入行李架',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'centralControlLock',
                    label: '中控锁',
                    placeholder: '请输入中控锁',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'intelligentKey',
                    label: '智能钥匙',
                    placeholder: '请输入智能钥匙',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'externalAntenna',
                    label: '外置天线',
                    placeholder: '请输入外置天线',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'telecontrol',
                    label: '远程遥控功能',
                    placeholder: '请输入远程遥控功能',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'empennage',
                    label: '尾翼/扰流板',
                    placeholder: '请输入尾翼/扰流板',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'sportSuit',
                    label: '运动外观套件',
                    placeholder: '请输入运动外观套件',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carWiperFront',
                    label: '前雨刷器',
                    placeholder: '请输入前雨刷器',
                    width: '200px'
                  }
                ],
                tCarIconfiguration: [
                  {
                    type: 'input',
                    prop: 'interiorMaterial',
                    label: '内饰材质',
                    placeholder: '请输入内饰材质',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carAtmosLamp',
                    label: '车内氛围灯',
                    placeholder: '请输入车内氛围灯',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'cosmeticMirror',
                    label: '遮阳板化妆镜',
                    placeholder: '请输入遮阳板化妆镜',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'steerWheelMa',
                    label: '方向盘材质',
                    placeholder: '请输入方向盘材质',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'steerWheelMul',
                    label: '多功能方向盘',
                    placeholder: '请输入多功能方向盘',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'steerWheelAdjust',
                    label: '方向盘调节',
                    placeholder: '请输入方向盘调节',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'steerWheelHeat',
                    label: '方向盘加热',
                    placeholder: '请输入方向盘加热',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'steerWheelChgn',
                    label: '方向盘换挡',
                    placeholder: '请输入方向盘换挡',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'airConditionF',
                    label: '前排空调',
                    placeholder: '请输入前排空调',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'airConditionB',
                    label: '后排空调',
                    placeholder: '请输入后排空调',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'fragSys',
                    label: '香氛系统',
                    placeholder: '请输入香氛系统',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'airPurge',
                    label: '空气净化',
                    placeholder: '请输入空气净化',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'onboardRefrige',
                    label: '车载冰箱',
                    placeholder: '请输入车载冰箱',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'seatArrangeForm',
                    label: '座椅排列形式',
                    placeholder: '请输入座椅排列形式',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'masterSeat',
                    label: '主驾驶座椅调节',
                    placeholder: '请输入主驾驶座椅调节',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'copilotSeat',
                    label: '副驾驶座椅调节',
                    placeholder: '请输入副驾驶座椅调节',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'otherSeat',
                    label: '其他座椅调节',
                    placeholder: '请输入其他座椅调节',
                    width: '200px'
                  }
                ],
                tCarEnt: [
                  {
                    type: 'input',
                    prop: 'crystalScreen',
                    label: '中控彩色液晶屏',
                    placeholder: '请输入中控彩色液晶屏',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'dashBoard',
                    label: '全液晶仪表盘',
                    placeholder: '请输入全液晶仪表盘',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'driveDisplayScreen',
                    label: '行车电脑显示屏',
                    placeholder: '请输入行车电脑显示屏',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'hudDisplay',
                    label: 'HUD平视显示',
                    placeholder: '请输入HUD平视显示',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'guideGps',
                    label: 'GPS导航',
                    placeholder: '请输入GPS导航',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'smartConnectLocation',
                    label: '智能互联定位',
                    placeholder: '请输入智能互联定位',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'voiceControl',
                    label: '语音控制',
                    placeholder: '请输入语音控制',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carplay',
                    label: '手机互联(Carplay&Android)',
                    placeholder: '请输入手机互联',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'wirelessCharge',
                    label: '手机无线充电',
                    placeholder: '请输入手机无线充电',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'gestureControl',
                    label: '手势控制系统',
                    placeholder: '请输入手势控制系统',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'radio',
                    label: '收音机',
                    placeholder: '请输入收音机',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'cdDvd',
                    label: 'CD/DVD',
                    placeholder: '请输入CD/DVD',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'blueWifi',
                    label: '蓝牙/WIFI连接',
                    placeholder: '请输入蓝牙/WIFI连接',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'externalInterface',
                    label: '外接接口',
                    placeholder: '请输入外接接口',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'carTv',
                    label: '车载电视',
                    placeholder: '请输入车载电视',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'audioBrand',
                    label: '音响品牌',
                    placeholder: '请输入音响品牌',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'speakerNum',
                    label: '扬声器数量(个)',
                    placeholder: '请输入扬声器数量',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'systemEnt',
                    label: '后排液晶屏/娱乐系统',
                    placeholder: '请输入后排液晶屏/娱乐系统',
                    width: '200px'
                  }, {
                    type: 'input',
                    prop: 'powerSupply',
                    label: '车载电源',
                    placeholder: '请输入车载电源',
                    width: '200px'
                  }
                ]
              }
              this.$store.commit('setFormItemDate', obj)
            } else {
              this.$Message.info(res.data.msg)
            }
          })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    tabsChanged (name) {
      this.tabName = name
      if (name === 'name1') {
        this.getLocalStrToLocalObj('tCarBasic')
      } else if (name === 'name2') {
        this.getLocalStrToLocalObj('tCarSize')
      } else if (name === 'name3') {
        this.getLocalStrToLocalObj('tCarPower')
      } else if (name === 'name4') {
        this.getLocalStrToLocalObj('tCarChassis')
      } else if (name === 'name5') {
        this.getLocalStrToLocalObj('tCarSecurity')
      } else if (name === 'name6') {
        this.getLocalStrToLocalObj('tCarAdas')
      } else if (name === 'name7') {
        this.getLocalStrToLocalObj('tCarEconfiguration')
      } else if (name === 'name8') {
        this.getLocalStrToLocalObj('tCarIconfiguration')
      } else if (name === 'name9') {
        this.getLocalStrToLocalObj('tCarEnt')
      }
    },
    getBoolean (value) {
      let localV = localStorage.getItem(value)
      let isGetLocal = false
      if (localV === undefined || localV === null || localV === '') {
        isGetLocal = true
      }
      return isGetLocal
    },
    getLocalObj () {
      this.getLocalStrToLocalObj('tCarBasic')
      this.getLocalStrToLocalObj('tCarAdas')
      this.getLocalStrToLocalObj('tCarChassis')
      this.getLocalStrToLocalObj('tCarEconfiguration')
      this.getLocalStrToLocalObj('tCarEnt')
      this.getLocalStrToLocalObj('tCarIconfiguration')
      this.getLocalStrToLocalObj('tCarPower')
      this.getLocalStrToLocalObj('tCarSecurity')
      this.getLocalStrToLocalObj('tCarSize')
    },
    getLocalStrToLocalObj (name) {
      if (localStorage.getItem(name) !== undefined && localStorage.getItem(name) !== null && localStorage.getItem(name) !== '') {
        let carInfoStr = localStorage.getItem(name)
        let carInfoObj = JSON.parse(carInfoStr)
        this.infoForm[name] = carInfoObj
        if (name === 'tCarBasic') {
          if (localStorage.getItem('classNmObj') !== undefined && localStorage.getItem('classNmObj') !== null && localStorage.getItem('classNmObj') !== '') {
            let classNmStr = localStorage.getItem('classNmObj')
            let classNmObj = JSON.parse(classNmStr)
            this.infoForm.tCarBasic.classNm = classNmObj.classNm
            this.infoForm.tCarBasic.seriesNm = classNmObj.seriesNm
            this.infoForm.tCarBasic.productCd = classNmObj.seriesId.toString()
          }
        }
      } else {
        if (name === 'tCarBasic') {
          if (localStorage.getItem('classNmObj') !== undefined && localStorage.getItem('classNmObj') !== null && localStorage.getItem('classNmObj') !== '') {
            let classNmStr = localStorage.getItem('classNmObj')
            let classNmObj = JSON.parse(classNmStr)
            this.infoForm.tCarBasic.classNm = classNmObj.classNm
            this.infoForm.tCarBasic.seriesNm = classNmObj.seriesNm
            this.infoForm.tCarBasic.productCd = classNmObj.seriesId.toString()
          }
        }
      }
    },
    handleStepNext () {
      let num = Number(this.tabName.substr(this.tabName.length - 1, 1)) + Number(1)
      this.tabName = 'name' + num
    },
    handleSubmit () {
      this.getLocalObj()
      if (this.checkTCarBasic()) {
        this.$Message.info('基本信息不能为空')
        return
      }
      let data = {
        carBasic: this.infoForm.tCarBasic,
        carAdas: this.infoForm.tCarAdas,
        carChassis: this.infoForm.tCarChassis,
        econfiguration: this.infoForm.tCarEconfiguration,
        carEnt: this.infoForm.tCarEnt,
        iconfiguration: this.infoForm.tCarIconfiguration,
        carPower: this.infoForm.tCarPower,
        carSecurity: this.infoForm.tCarSecurity,
        carSize: this.infoForm.tCarSize
      }
      addOrUpdateProduct(data).then(res => {
        if (res.data.code === '200') {
          this.$Message.success(res.data.msg)
          this.$router.push({ name: 'productManagePage' })
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    checkTCarBasic () {
      let isNull = false
      let carProductCd = this.infoForm.tCarBasic.carProductCd
      let keys = []
      let values = []
      if (carProductCd === undefined || carProductCd === null || carProductCd === '') {
        keys = Object.keys(this.infoForm.tCarBasic)
        values = Object.values(this.infoForm.tCarBasic)
      } else {
        keys = ['carProductNm', 'carProductUcd', 'carProductStyle', 'carProductVer', 'carProductPrice', 'carProductKeep', 'carProductKind', 'carProductIntro', 'onSale', 'carProductPic']
        values = [this.infoForm.tCarBasic.carProductNm, this.infoForm.tCarBasic.carProductUcd, this.infoForm.tCarBasic.carProductStyle,
          this.infoForm.tCarBasic.carProductVer, this.infoForm.tCarBasic.carProductPrice, this.infoForm.tCarBasic.carProductKeep,
          this.infoForm.tCarBasic.carProductKind, this.infoForm.tCarBasic.carProductIntro, this.infoForm.tCarBasic.onSale, this.infoForm.tCarBasic.carProductPic]
      }
      for (let i = 0; i < keys.length; i++) {
        if (values[i] === undefined || values[i] === null || values[i] === '') {
          isNull = true
          break
        }
      }
      return isNull
    },
    setLocal1 ({ infoForm }) {
      localStorage.setItem('tCarBasic', JSON.stringify(infoForm))
    },
    setLocal2 ({ infoForm }) {
      localStorage.setItem('tCarAdas', JSON.stringify(infoForm))
    },
    setLocal3 ({ infoForm }) {
      localStorage.setItem('tCarChassis', JSON.stringify(infoForm))
    },
    setLocal4 ({ infoForm }) {
      localStorage.setItem('tCarEconfiguration', JSON.stringify(infoForm))
    },
    setLocal5 ({ infoForm }) {
      localStorage.setItem('tCarEnt', JSON.stringify(infoForm))
    },
    setLocal6 ({ infoForm }) {
      localStorage.setItem('tCarIconfiguration', JSON.stringify(infoForm))
    },
    setLocal7 ({ infoForm }) {
      localStorage.setItem('tCarPower', JSON.stringify(infoForm))
    },
    setLocal8 ({ infoForm }) {
      localStorage.setItem('tCarSecurity', JSON.stringify(infoForm))
    },
    setLocal9 ({ infoForm }) {
      localStorage.setItem('tCarSize', JSON.stringify(infoForm))
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
    }
  }
}
</script>

<style scoped lang="less">
  .productTip{
    padding:10px 20px;
    margin-bottom: 10px;
    background-color: #f1f1f1;
    span{
      padding:0 20px 0 0;
    }
  }
</style>
