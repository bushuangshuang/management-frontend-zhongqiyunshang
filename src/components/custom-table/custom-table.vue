<template>
  <div>
    <Form v-if="showQuery" ref="queryForm" :model="queryForm" :label-width="80" inline>
      <FormItem v-for="(item,index) in queryFormItemData" :key="index" :label="item.label">
        <Input v-if="item.type==='input'" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" />
        <Select v-else-if="item.type==='select' && getBool(item.isCascade)"  v-model="queryForm[item.prop]" clearable :placeholder="item.placeholder" :style="{width:item.width}">
          <Option v-for="itemV in item.selectOption" :value="itemV.value" :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <!--二级级联 start-->
        <Select v-else-if="item.type==='select' && item.isCascade==='twoCascadeOne'" clearable @on-change="getTwoCancelOne" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onTwoQuerySelectOne(itemV)"  :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <Select v-else-if="item.type==='select' && item.isCascade==='twoCascadeTwo'" clearable @on-change="getTwoCancelTwo" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onTwoQuerySelectTwo(itemV)" :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <!--二级级联 end-->
        <!--四级级联 start-->
        <Select v-else-if="item.type==='select' && item.isCascade==='fourCascadeOne'" clearable @on-change="getFourCancelOne" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onFourQuerySelectOne(itemV)"  :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <Select v-else-if="item.type==='select' && item.isCascade==='fourCascadeTwo'" clearable @on-change="getFourCancelTwo" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onFourQuerySelectTwo(itemV)" :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <Select v-else-if="item.type==='select' && item.isCascade==='fourCascadeThree'" clearable @on-change="getFourCancelThree" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onFourQuerySelectThree(itemV)" :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <Select v-else-if="item.type==='select' && item.isCascade==='fourCascadeFour'" clearable @on-change="getFourCancelFour" v-model="queryForm[item.prop]" :placeholder="item.placeholder" :style="{width:item.width}" >
          <Option v-for="itemV in item.selectOption" :value="itemV.value" @click.native="onFourQuerySelectFour(itemV)" :key="itemV.value">{{ itemV.label }}</Option>
        </Select>
        <!--四级级联 end-->
        <Date-picker v-else-if="item.type==='date'" :value="queryForm[item.prop]" :format="item.format" type="date" placeholder="选择日期" :style="{width:item.width}"></Date-picker>
      </FormItem>
      <FormItem :label-width="50">
        <Button type="primary" @click="getList">查询</Button>
      </FormItem>
      <FormItem :label-width="50" v-if="isAdd">
        <Button type="primary" @click="toAddPage">新增</Button>
      </FormItem>
    </Form>
    <Table v-if="isSelection" :data="tableData" :columns="tableColumns" @on-selection-change='selectionClick' stripe border></Table>
    <Table v-if="!isSelection" :data="tableData" :columns="tableColumns" border :row-class-name="setClassName"></Table><!--stripe-->
    <div v-if="showPage" style="margin:10px;overflow:hidden">
      <div style="float: right;">
        <Page :total="page.total" :current="page.pageNumber" :page-size="page.pageSize" show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
      </div>
    </div>
  </div>
</template>

<script>
import CustomForm from '@/components/custom-form'
export default {
  name: 'custom-table',
  components: {
    CustomForm
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false
    },
    showPage: {
      type: Boolean,
      default: true
    },
    showQuery: {
      type: Boolean,
      default: true
    },
    queryForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    queryFormItemData: {
      type: Array,
      default: () => {
        return [{
          type: '',
          label: '',
          model: '',
          placeholder: '',
          selectOption: []
        }]
      }
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    page: {
      type: Object,
      default: () => {
        return {
          pageNumber: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    getBool (value) {
      return value === undefined
    },
    selectionClick (arr) {
      let ids = []
      for (var i = 0; i < arr.length; i++) {
        ids.push(arr[i])
      }
      this.$emit('on-selection-click', { ids: ids })
    },
    handlePage (value) {
      this.$emit('on-change-page', { pageNumber: value })
    },
    handlePageSize (value) {
      this.$emit('on-change-pageSize', { pageSize: value })
    },
    getList () {
      let query = this.queryForm
      this.$emit('on-get-list', { query: query })
    },
    // 二级级联
    onTwoQuerySelectOne (e) {
      this.$emit('on-query-select-one', { obj: e })
    },
    getTwoCancelOne (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-cancel-one')
      }
    },
    getTwoCancelTwo (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-select-two', { obj: {} })
      }
    },
    onTwoQuerySelectTwo (e) {
      this.$emit('on-query-select-two', { obj: e })
    },
    // 四级级联
    onFourQuerySelectOne (e) {
      this.$emit('on-query-select-one', { obj: e })
    },
    getFourCancelOne (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-cancel-one')
      }
    },
    onFourQuerySelectTwo (e) {
      this.$emit('on-query-select-two', { obj: e })
    },
    getFourCancelTwo (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-cancel-two')
      }
    },
    onFourQuerySelectThree (e) {
      this.$emit('on-query-select-three', { obj: e })
    },
    getFourCancelThree (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-cancel-three')
      }
    },
    onFourQuerySelectFour (e) {
      this.$emit('on-query-select-four', { obj: e })
    },
    getFourCancelFour (value) {
      if (value === undefined || value === null || value === '') {
        this.$emit('on-query-cancel-four')
      }
    },

    toAddPage () {
      this.$emit('on-add-page')
    },
    setClassName (row, index) {
      return (row.childList === undefined || row.childList.length === 0) ? 'tdNoExpend' : ''
    }
  }
}
</script>

<style>
  .ivu-page-options-elevator {
    vertical-align: middle;
    height: 33px!important;
    line-height: 1!important;
  }
  .tdNoExpend .ivu-table-cell-with-expand{
    display: none;
  }
</style>
