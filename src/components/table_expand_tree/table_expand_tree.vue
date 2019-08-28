<template>
  <div id="expand">
    <Table highlight-row
           @on-current-change="getRow"
           :loading="loading"
           :showHeader="isHeader"
           :columns="tableColumnsExpand"
           :row-class-name="setClassName"
           :data="listAuth">
    </Table>
  </div>

</template>
<script>
export default {
  props: {
    rowExpand: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableColumnsExpand: {
      type: Array,
      default: () => {
        return []
      }
    },
    nameExpand: {
      type: String,
      default: ''
    },
    isHeader: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      loading: false,
      listAuth: []
    }
  },
  created () {
    let object = {}
    if (this.nameExpand === 'orderFlowNo') {
      object = this.rowExpand.refundDetailsList
    } else {
      object = this.rowExpand.childList
    }
    this.listAuth.splice(0)
    if (object) {
      object.forEach(r => {
        if (this.nameExpand === 'brand') {
          let clearBrand = r.brand.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
          r.brand = '　' + clearBrand
        } else if (this.nameExpand === 'bankName') {
          let clearBrand = r.bankName.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
          r.bankName = '　' + clearBrand
        } else if (this.nameExpand === 'brandName') {
          let clearBrand = r.brandName.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
          r.brandName = '　' + clearBrand
        } else if (this.nameExpand === 'classCd') {
          let clearBrand = r.classCd.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
          r.classCd = '　' + clearBrand
        }
        this.listAuth.push(r)
      })
    }
  },
  methods: {
    getRow (currentRow, oldCurrentRow) {
    },
    setClassName (row, index) {
      return (row.childList === undefined || row.childList.length === 0) ? 'tdNoExpend' : ''
    }
  }
}
</script>
<style lang="less">
  #expand{
    .ivu-table td{
      /*background: #f8f8f9*/
    }
    .ivu-table-wrapper{
      border: none!important;
      .ivu-table:before{
        height:0px!important;
      }
      .ivu-table:after{
        height:0px!important;
      }
    }
  }
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
 /* .ivu-icon-ios-arrow-forward:before{
    content:'\F217'
  }*/
  /*\F208*/
</style>
