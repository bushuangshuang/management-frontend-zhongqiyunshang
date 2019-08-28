<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.useShowTable{
  width:100%;
  border-collapse:collapse;
  border:none;
  word-wrap:break-word;
  word-break:break-all;
}
.useShowTable tr td{
  border: 1px #fff solid;
  padding:8px;
}
.footerDiv{
  width:100%;
  text-align: center
}
.btn1{
  margin-right: 20px;
}
.btn2{
  margin-left: 20px;
}
td.ivu-table-expanded-cell{
  padding:0 !important;
}
.ivu-table-border td:last-child{
  border-right:none!important;
}
/* .ivu-table tr:last-child td{
   border-bottom:none!important;
 }*/
.tdNoExpend .ivu-table-cell-with-expand{
  display: none;
}
.ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #F45416!important;
  background-color: #F45416!important;
}
</style>
