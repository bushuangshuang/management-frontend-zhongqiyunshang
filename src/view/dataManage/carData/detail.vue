<template>
  <div class="dataSDetail">
    <Row>
      <Col span="11">
      <Card shadow class="heightBorder">
        <p slot="title">地图</p>
        <div id="container">

        </div>
      </Card>
      </Col>
      <Col span="6" class="marginLeft">
      <Card shadow class="heightBorder2T">
        <p slot="title">电池</p>
      </Card>
      <Card shadow class="heightBorder2B">
        <p slot="title">电控</p>
      </Card>
      </Col>
      <Col span="6" class="marginLeft">
      <Card shadow class="heightBorder2T">
        <p slot="title">电机</p>
      </Card>
      <Card shadow class="heightBorder2B">
        <p slot="title">GSP轨迹</p>
      </Card>
      </Col>
    </Row>
    <Row class="averageStyleTop">
      <Col span="17">
      <Card shadow class="heightBorder">
        <p slot="title">数据项目</p>
      </Card>
      </Col>
      <Col span="6" class="marginLeft">
      <Card shadow class="heightBorder">
        <p slot="title">保养、维修、保险、违章、贷款</p>
      </Card>
      </Col>
    </Row>
    <Button style="margin-top:20px;" type="primary" @click="toBack">返回</Button>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
import { orderDetails } from '@/api/partner/saleManage'
import MapLoader from '@/assets/js/amap'
export default {
  name: 'order-detail',
  components: {
    CustomForm, CustomTable
  },
  data () {
    return {
      map: null,
      list: [
        {
          lng: 116.3744520000,
          lat: 39.8964650000
        },
        {
          lng: 39.8979300000,
          lat: 116.3745170000
        },
        {
          lng: 116.3745170000,
          lat: 39.8989840000
        },
        {
          lng: 116.3743450000,
          lat: 39.9002190000
        }
      ],
      locationData: { // 用于定位相关信息提交
        nowLocation: {
          lat: '', // 纬度
          lon: '', // 经度
          province: '', // 省
          city: '', // 市
          district: '', // 区 县
          nowPlace: '', // 省-市-区
          Address: '' // 详细地址
        },
        status: false // 用于回调函数判断 位置是否请求成功
      }
    }
  },
  created () {

    // this.getDateById()
  },
  mounted () {
    let that = this
    /* let latitude = 39.8964650000
    let longitude = 116.3744520000 */
    let lnglat = [116.3744520000, 39.8964650000]
    MapLoader().then(AMap => {
      that.map = new AMap.Map('container', {
        center: [116.3744520000, 39.8964650000], // [116.40, 39.90],
        zoom: 11
      })
      // 插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder'], function () {
        that.map.addControl(new AMap.ToolBar())
        that.map.addControl(new AMap.Scale())

        let geocoder = new AMap.Geocoder({
          city: '010' // 城市，默认：“全国”
        })
        geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            console.log('地址====' + result.regeocode.formattedAddress)
            // that.ruleForm.address = result.regeocode.formattedAddress;
          } else {
            console.log('地址====' + result.regeocode.formattedAddress)
          }
        })
      })
      // marker标记
      that.marker = new AMap.Marker({
        position: null
      })
      that.map.add(that.marker)
      // 绘制折线
      that.path = new AMap.Polyline({
        path: null,
        isOutline: false, // 线条是否带描边，默认false
        outlineColor: '#ffeeff', // 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
        borderWeight: 1, // 描边的宽度，默认为1
        strokeColor: '#3366FF', // 线条颜色，使用16进制颜色代码赋值。默认值为#006600
        strokeOpacity: 1, // 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
        strokeWeight: 2, // 线条宽度，单位：像素
        // 折线样式还支持 'dashed'
        strokeStyle: 'dashed', // 线样式，实线:solid，虚线:dashed
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5], // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
        lineJoin: 'round', // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
        lineCap: 'round', // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
        zIndex: 50 // 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示默认zIndex：50、
      })
      // 将折线添加至地图实例
      that.map.add(that.path)
      /* let trackPath = []
      that.list.forEach((item,index) => {
        trackPath.push(new AMap.LngLat(item.lng,item.lat))
      });
      that.path.setPath(trackPath)
      that.path.show()

      // 将最后一条记录添加marker标记
      let lastTrack = new AMap.LngLat(that.list[0].lng,that.list[0].lat)
      that.map.setCenter(lastTrack)
      that.marker.setPosition(lastTrack)
      that.marker.show() */
    }, e => {
      console.log('地图加载失败', e)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true // B 跳转到 A 时，让 A 缓存，即不刷新
    next()
  },
  methods: {
    getDateById () {
      if (this.id === undefined || this.id === null || this.id === '') {
        this.$Message.info('订单编号为空')
        return
      }
      let data = {
        id: this.id
      }
      orderDetails(data).then(res => {
        if (res.data.code === '200') {
          this.orderBasic.orderFlowNo = res.data.info.orderInfo.orderFlowNo // 订单编号
          this.orderBasic.partnerNm = res.data.info.orderInfo.brandNm // 产品名称
          this.orderBasic.seriesNm = res.data.info.orderInfo.seriesNm // 车系
          this.orderBasic.carProductStyle = res.data.info.carInfo.carProductStyle // 产品款式
          this.orderBasic.carProductVer = res.data.info.carInfo.carProductVer // 产品版本
          this.orderBasic.carProductKind = res.data.info.carInfo.carProductKind // 产品类型
          this.orderBasic.carPowerMaxKm = res.data.info.carInfo.carPowerMaxKm // 最大里程(km)
          this.orderBasic.productColor = res.data.info.orderInfo.productColor // 车辆颜色
          this.orderBasic.carProductPrice = res.data.info.carInfo.carProductPrice // 厂商指导价格
          this.orderBasic.orderMoney = res.data.info.orderInfo.orderPrice // 成交价格(万)
          this.orderBasic.orderPayStr = res.data.info.orderInfo.orderPayStr // 支付方式
          this.orderBasic.financialServicesModel = res.data.info.orderInfo.financialServicesModelId // 金融产品
          this.orderBasic.orderStatusStr = res.data.info.orderInfo.orderStatusStr// 订单状态
          this.orderUser = res.data.info.confUser
          this.orderDetail = res.data.info.carInfo
          this.tableData = res.data.info.orderLogs
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    toBack () {
      this.$router.push({ name: 'carData' })
    }
  }
}
</script>

<style scoped lang="less">
  .dataSDetail{
    padding:0 10px;
    .averageStyleTop{margin-top:20px;}
    .heightBorder{height: 400px!important;border: 1px solid #e8eaec!important;}
    #container{width:100%;height:300px;}
    .marginLeft{
      margin-left: 17px;
      .heightBorder2T{height:190px!important;border: 1px solid #e8eaec!important;margin-bottom: 17px;}
      .heightBorder2B{height:190px!important;border: 1px solid #e8eaec!important;margin-top: 17px;}
    }
  }
</style>
