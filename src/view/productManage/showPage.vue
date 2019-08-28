<template>
  <div class="add-page">
    <div style="min-height:200px;">
      <div class="productTip">部分信息提示：<span>标配&nbsp;&nbsp;●</span><span>选配&nbsp;&nbsp;○</span><span>无&nbsp;&nbsp;-</span></div>
      <Tabs :value="tabName">
        <TabPane label="基本信息" name="name1">
          <custom-form
             :isInline="true"
             :showBtnCancel="false"
             :labelWidth="140"
             :infoForm="infoForm.tCarBasicShow"
             :FormItemDate="FormItemDate.tCarBasic"
             :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="车辆尺寸信息" name="name9">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarSizeShow"
            :FormItemDate="FormItemDate.tCarSize"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="动力系统信息" name="name7">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarPowerShow"
            :FormItemDate="FormItemDate.tCarPower"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="底盘信息" name="name3">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarChassisShow"
            :FormItemDate="FormItemDate.tCarChassis"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="安全配置信息" name="name8">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarSecurityShow"
            :FormItemDate="FormItemDate.tCarSecurity"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="驾驶辅助信息" name="name2">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarAdasShow"
            :FormItemDate="FormItemDate.tCarAdas"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="外部配置信息" name="name4">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarEconfigurationShow"
            :FormItemDate="FormItemDate.tCarEconfiguration"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="内部配置信息" name="name6">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarIconfigurationShow"
            :FormItemDate="FormItemDate.tCarIconfiguration"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
        <TabPane label="娱乐信息" name="name5">
          <custom-form
            :isInline="true"
            :showBtnCancel="false"
            :labelWidth="140"
            :infoForm="infoForm.tCarEntShow"
            :FormItemDate="FormItemDate.tCarEnt"
            :showBtnSubmit="false"
          ></custom-form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
export default {
  name: 'addPage',
  components: {
    CustomForm
  },
  data () {
    return {
      tabName: 'name1',
      infoForm: {
        tCarBasicShow: {
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
        tCarSizeShow: {
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
        tCarPowerShow: {
          motorType: '',
          motorMaterial: '',
          carPowerSvolume: '',
          carpowerKw: '',
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
          carpowerEp: '',
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
        tCarChassisShow: {
          drivingMode: '',
          FrontType: '',
          backType: '',
          susAdjust: '',
          frontBrakeT: '',
          backBreakT: '',
          parkBrakeT: '',
          assistType: '',
          carStructure: '',
          slipDifferential: '',
          approachAngle: '',
          departureAngle: '',
          directionalLock: '',
          acceleratorPedal: ''
        },
        tCarSecurityShow: {
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
          cartyreE: '',
          carChildChair: ''
        },
        tCarAdasShow: {
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
        tCarEconfigurationShow: {
          carHeadlight: '',
          carLed: '',
          carAutoLight: '',
          carFoglampe: '',
          carLightFunc: '',
          stopLamp: '',
          carSkylightT: '',
          carWindowFe: '',
          carWindowBe: '',
          carRearviewAdjust: '',
          approachAngle: '',
          rearviewMirrorEf: '',
          carMediaRear: '',
          carDazzlingEx: '',
          carPrivacyGlass: '',
          carSunshade: '',
          carSunshadeCur: '',
          carRearWiper: '',
          defrostFogging: '',
          carSuctionDoor: '',
          carslideGate: '',
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
        tCarIconfigurationShow: {
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
        tCarEntShow: {
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
      FormItemDate: {
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
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carProductUcd',
            label: '产品识别码',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carProductStyle',
            label: '产品款式',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carProductVer',
            label: '产品版本',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carProductPrice',
            label: '厂商指导价格',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carProductKeep',
            label: '保修政策',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carProductKind',
            label: '产品类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carProductIntro',
            label: '产品简介',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'onSale',
            label: '是否在售',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'earnestMoney',
            label: '履约保证金',
            readonly: true,
            width: '200px'
          },
          {
            type: 'productFile',
            prop: 'carProductPic',
            label: '产品图片',
            readonly: true,
            fileShow: true,
            width: '200px'
          }
        ],
        tCarSize: [
          {
            type: 'input',
            prop: 'compartmentType',
            label: '车身类型',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carStructure',
            label: '车身结构',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSize',
            label: '长*宽*高(mm)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSizeWheelbase',
            label: '轴距(mm)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSizeSeat',
            label: '整备质量(kg)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSizeSeat',
            label: '座位数(个)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSizeLvolume',
            label: '行李箱容积(L)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carSizeOvolume',
            label: '油箱容积(L)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSizeTyreA',
            label: '前轮胎规格',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSizeTyreB',
            label: '后轮胎规格',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSizeTyreC',
            label: '备胎',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: '.carSizeMinTd',
            label: '最小转弯直径(mm)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSizeMaxTd',
            label: '最小离地间隙(mm)',
            readonly: true,
            width: '200px'
          }
        ],
        tCarPower: [
          {
            type: 'input',
            prop: 'motorType',
            label: '发动机型号',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'motorMaterial',
            label: '发动机材质',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerSvolume',
            label: '排气量(L)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carpowerKw',
            label: '最大功率(kW)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxPs',
            label: '最大马力(Ps)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxNmRpm',
            label: '最大功率转速(rpm)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxNm',
            label: '最大扭矩(N.m)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxNmRpm',
            label: '最大扭矩转速(rpm)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carPowerCylinder',
            label: '缸体形式',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerCpum',
            label: '气缸数(缸)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerIa',
            label: '进气形式',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerOilType',
            label: '供油方式',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerOilNum',
            label: '燃油标号',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerStart',
            label: '发动机启停',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerT',
            label: '变速箱类型',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: '.carPowerTnum',
            label: '挡位个数',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxSpeed',
            label: '最高车速(km/h)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carPowerAccs',
            label: '0-100km/h加速时间(s)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerOilBee',
            label: '混合工况油耗(L/100km)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carpowerEp',
            label: '环保标准',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerZkw',
            label: '电动机总功率(kW)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerZnm',
            label: '电动机总扭矩(N.m)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerHemkw',
            label: '前电动机最大功率(kW)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerHemnm',
            label: '前电动机最大扭矩(N.m)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBemkw',
            label: '后电动机最大功率(kW)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBemnm',
            label: '后电动机最大扭矩(N.m)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'batteryBrand',
            label: '电池品牌',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBatkwh',
            label: '电池容量(kwh)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBatTime',
            label: '电池充电时间',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBatBee',
            label: '耗电量(kwh/100km)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerMaxKm',
            label: '最大续航里程(km)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'brsSystem',
            label: 'BRS系统(48V电源)',
            readonly: true,
            width: '200px'
          },
          {
            type: 'input',
            prop: 'carPowerBatQa',
            label: '电池组质保',
            readonly: true,
            width: '200px'
          }
        ],
        tCarChassis: [
          {
            type: 'input',
            prop: 'drivingMode',
            label: '驱动方式',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'FrontType',
            label: '前悬架类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'backType',
            label: '后悬架类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'susAdjust',
            label: '可调悬架',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'frontBrakeT',
            label: '前轮制动器类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'backBreakT',
            label: '后轮制动器类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'parkBrakeT',
            label: '驻车制动器类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'assistType',
            label: '助力类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carStructure',
            label: '车体结构',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'slipDifferential',
            label: '限滑差速器',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'approachAngle',
            label: '接近角',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'departureAngle',
            label: '离去角',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'directionalLock',
            label: '方向锁',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'acceleratorPedal',
            label: '油门踏板',
            readonly: true,
            width: '200px'
          }
        ],
        tCarSecurity: [
          {
            type: 'input',
            prop: 'carAbs',
            label: '防抱死制动(ABS)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carEbd',
            label: '制动力分配(EBD/CBC)',
            readonly: true,
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
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carEsp',
            label: '车身稳定控制(ESP/DSC/VSX)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAirbagM',
            label: '主驾驶安全气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAirbagV',
            label: '副驾驶安全气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAirbagF',
            label: '前侧气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAirbagB',
            label: '后侧气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSafeCur',
            label: '侧安全气帘',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carKneeBall',
            label: '膝部气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'beltAirbag',
            label: '安全带气囊',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'tubeCentral',
            label: '后排中央气管',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carTyreP',
            label: '胎压监测',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'cartyreE',
            label: '零胎压续航轮胎',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carChildChair',
            label: '儿童座椅接口',
            readonly: true,
            width: '200px'
          }
        ],
        tCarAdas: [
          {
            type: 'input',
            prop: 'carConstantSpeed',
            label: '定速巡航',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'laneRetention',
            label: '车道保持',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'parallelAuxiliary',
            label: '并线辅助',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'collisionAlarm',
            label: '碰撞报警',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'fatigueReminder',
            label: '疲劳提醒',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'autoPaking',
            label: '自动泊车',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'teleParking',
            label: '遥控泊车',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'autopilotAssis',
            label: '自动驾驶辅助',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'autoStation',
            label: '自动驻车',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'uphillAssis',
            label: '上坡辅助',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'hillDecentCon',
            label: '陡坡缓降',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'nightVersion',
            label: '夜视系统',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'varGearSteer',
            label: '可变齿轮转向',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'panorama',
            label: '全景影像',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'reverseSensorF',
            label: '前/后倒车雷达',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'backupEffect',
            label: '倒车影像',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'choiseDriveMode',
            label: '驾驶模式选择',
            readonly: true,
            width: '200px'
          }
        ],
        tCarEconfiguration: [
          {
            type: 'input',
            prop: 'carHeadlight',
            label: '前大灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carLed',
            label: '日间行车灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAutoLight',
            label: '自动大灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carFoglampe',
            label: '前/后雾灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carLightFunc',
            label: '大灯功能',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'stopLamp',
            label: '制动灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSkylightT',
            label: '天窗类型',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carWindowFe',
            label: '前电动车窗',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carWindowBe',
            label: '后电动车窗',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carRearviewAdjust',
            label: '外后视镜电动调节',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'approachAngle',
            label: '内后视镜自动防眩目',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'rearviewMirrorEf',
            label: '外后视镜功能',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carMediaRear',
            label: '流媒体后视镜',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carDazzlingEx',
            label: '外后视镜自动防眩目',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carPrivacyGlass',
            label: '隐私玻璃',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSunshade',
            label: '后排侧遮阳帘',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSunshadeCur',
            label: '后遮阳帘',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carRearWiper',
            label: '前/后雨刷器',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'defrostFogging',
            label: '除霜除雾',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carSuctionDoor',
            label: '电吸门',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carslideGate',
            label: '电动侧滑门',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'electricBackupBox',
            label: '电动后备箱',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carLuggRack',
            label: '行李架',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'centralControlLock',
            label: '中控锁',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'intelligentKey',
            label: '智能钥匙',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'externalAntenna',
            label: '外置天线',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'telecontrol',
            label: '远程遥控功能',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'empennage',
            label: '尾翼/扰流板',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'sportSuit',
            label: '运动外观套件',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carWiperFront',
            label: '前雨刷器',
            readonly: true,
            width: '200px'
          }
        ],
        tCarIconfiguration: [
          {
            type: 'input',
            prop: 'interiorMaterial',
            label: '内饰材质',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carAtmosLamp',
            label: '车内氛围灯',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'cosmeticMirror',
            label: '遮阳板化妆镜',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'steerWheelMa',
            label: '方向盘材质',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'steerWheelMul',
            label: '多功能方向盘',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'steerWheelAdjust',
            label: '方向盘调节',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'steerWheelHeat',
            label: '方向盘加热',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'steerWheelChgn',
            label: '方向盘换挡',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'airConditionF',
            label: '前排空调',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'airConditionB',
            label: '后排空调',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'fragSys',
            label: '香氛系统',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'airPurge',
            label: '空气净化',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'onboardRefrige',
            label: '车载冰箱',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'seatArrangeForm',
            label: '座椅排列形式',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'masterSeat',
            label: '主驾驶座椅调节',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'copilotSeat',
            label: '副驾驶座椅调节',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'otherSeat',
            label: '其他座椅调节',
            readonly: true,
            width: '200px'
          }
        ],
        tCarEnt: [
          {
            type: 'input',
            prop: 'crystalScreen',
            label: '中控彩色液晶屏',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'dashBoard',
            label: '全液晶仪表盘',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'driveDisplayScreen',
            label: '行车电脑显示屏',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'hudDisplay',
            label: 'HUD平视显示',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'guideGps',
            label: 'GPS导航',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'smartConnectLocation',
            label: '智能互联定位',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'voiceControl',
            label: '语音控制',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carplay',
            label: '手机互联(Carplay&Android)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'wirelessCharge',
            label: '手机无线充电',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'gestureControl',
            label: '手势控制系统',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'radio',
            label: '收音机',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'cdDvd',
            label: 'CD/DVD',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'blueWifi',
            label: '蓝牙/WIFI连接',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'externalInterface',
            label: '外接接口',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'carTv',
            label: '车载电视',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'audioBran',
            label: '音响品牌',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'speakerNum',
            label: '扬声器数量(个)',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'powerSupply',
            label: '后排液晶屏/娱乐系统',
            readonly: true,
            width: '200px'
          }, {
            type: 'input',
            prop: 'powerSupply',
            label: '车载电源',
            readonly: true,
            width: '200px'
          }
        ]
      }
    }
  },
  computed: {
  },
  created () {
    this.getLocalObj()
  },
  mounted () {
  },
  methods: {
    getLocalObj () {
      this.getLocalStrToLocalObj('tCarBasicShow')
      this.getLocalStrToLocalObj('tCarAdasShow')
      this.getLocalStrToLocalObj('tCarChassisShow')
      this.getLocalStrToLocalObj('tCarEconfigurationShow')
      this.getLocalStrToLocalObj('tCarEntShow')
      this.getLocalStrToLocalObj('tCarIconfigurationShow')
      this.getLocalStrToLocalObj('tCarPowerShow')
      this.getLocalStrToLocalObj('tCarSecurityShow')
      this.getLocalStrToLocalObj('tCarSizeShow')
    },
    getLocalStrToLocalObj (name) {
      if (localStorage.getItem(name) !== undefined && localStorage.getItem(name) !== null && localStorage.getItem(name) !== '') {
        let carInfoStr = localStorage.getItem(name)
        let carInfoObj = JSON.parse(carInfoStr)
        this.infoForm[name] = carInfoObj
        if (name === 'tCarBasicShow') {
          if (localStorage.getItem('classNmObjShow')) {
            let classNmStr = localStorage.getItem('classNmObjShow')
            let classNmObj = JSON.parse(classNmStr)
            this.infoForm.tCarBasicShow.classNm = classNmObj.classNm
            this.infoForm.tCarBasicShow.seriesNm = classNmObj.seriesNm
            this.infoForm.tCarBasicShow.productCd = classNmObj.seriesId.toString()
          }
        }
      }
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
