<template>
  <div>
    <Table highlight-row
           @on-current-change="getRow"
           :loading="loading"
           :showHeader=true border
           :columns="listColumns"
           :row-class-name="setClassName"
           :data="listAuth">
    </Table>
  </div>

</template>
<script>
import TableExpandTree from '@/components/table_expand_tree'
export default {
  data () {
    return {
      columns: [],
      columns2: [
        {
          title: '姓名',
          key: 'name',
          width: 100
          // fixed: 'left'
        },
        {
          title: '年龄',
          key: 'age',
          width: 100
        },
        {
          title: '省份',
          key: 'province',
          width: 100
        },
        {
          title: '市区',
          key: 'city',
          width: 100
        },
        {
          title: '地址',
          key: 'address',
          width: 200
        },
        {
          title: '邮编',
          key: 'zip',
          width: 100
        }
      ],
      data4: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        }
      ],
      loading: false,
      listColumns: [
        {
          title: '序号',
          key: 'id',
          width: 70,
          align: 'center'
        },
        {
          type: 'expand',
          width: 20,
          render: (h, params) => {
            return h(TableExpandTree, {
              style: {
                padding: 0
              },
              props: {
                rowExpand: params.row
              }
            })
          }
        },
        {
          title: '权限名称',
          key: 'name',
          className: 'Title_css',
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '权限名称',
          key: 'name',
          className: 'Title_css',
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '权限名称',
          key: 'name',
          className: 'Title_css',
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }
              }, params.row.name)
            ])
          }
        }
      ],
      listAuth: [
        {
          index: 0,
          name: '名称1',
          children: [
            {
              index: 0,
              name: '111',
              children: [
                {
                  index: 0,
                  name: '111'

                },
                {
                  index: 1,
                  name: '222'
                }
              ]
            },
            {
              index: 1,
              name: '222'
            }
          ]
        },
        {
          index: 1,
          name: '名称2',
          children: [
            {
              index: 0,
              name: '333',
              children: [
                {
                  index: 0,
                  name: '111'

                },
                {
                  index: 1,
                  name: '222'
                }
              ]
            },
            {
              index: 1,
              name: '444'
            },
            {
              index: 2,
              name: '555'
            }
          ]
        },
        {
          index: 2,
          name: '名称3'
        },
        {
          index: 3,
          name: '名称4'
        }
      ]
    }
  },
  methods: {
    getRow (currentRow, oldCurrentRow) {
    },
    setClassName (row, index) {
      return row.children === undefined ? 'tdNoExpend' : ''
    }
  }
}
</script>
<style lang="less">
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
</style>

<!--<template>
  <tree-grid
    :items='data'
    :columns='columns'
    @on-row-click='rowClick'
    @on-selection-change='selectionClick'
    @on-sort-change='sortClick'
  ></tree-grid>
</template>
<script>
  import TreeGrid from '@/components/tree-grid'
  export default {
    data() {
      return {
        columns: [
          {
          type: 'selection',
          width: '50',
        }, {
          title: '编码',
          key: 'code',
          sortable: true,
          width: '150',
        }, {
          title: '名称',
          key: 'name',
          width: '150',
        }, {
          title: '状态',
          key: 'status',
          width: '150',
        }, {
          title: '备注',
          key: 'remark',
          width: '150',
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'primary',
            text: '编辑'
          }, {
            type: 'error',
            text: '删除'
          }],
          width: '150',
        }],
        data: [{
          id: '1',
          code: '0001',
          name: '测试数据1',
          status: '启用',
          remark: '测试数据测试数据',
          _checked: true
        }, {
          id: '2',
          code: '0002',
          name: '测试数据2',
          status: '启用',
          remark: '测试数据测试数据',
          children: [{
            id: '01',
            code: '00001',
            name: '测试数据01',
            status: '启用',
            remark: '测试数据测试数据',
            children: [{
              id: '01',
              code: '00001',
              name: '测试数据01',
              status: '启用',
              remark: '测试数据测试数据',
            }, {
            id: '02',
            code: '00002',
            name: '测试数据02',
            status: '启用',
            remark: '测试数据测试数据',
          }]
          }, {
            id: '02',
            code: '00002',
            name: '测试数据02',
            status: '启用',
            remark: '测试数据测试数据',
            children: [{
              id: '01',
              code: '00001',
              name: '测试数据01',
              status: '启用',
              remark: '测试数据测试数据',
            }, {
              id: '02',
              code: '00002',
              name: '测试数据02',
              status: '启用',
              remark: '测试数据测试数据',
            }]
          }]
        }, {
          id: '3',
          code: '0003',
          name: '测试数据3',
          status: '启用',
          remark: '测试数据测试数据'
        }, {
          id: '4',
          code: '0004',
          name: '测试数据4',
          status: '启用',
          remark: '测试数据测试数据'
        }]
      }
    },
    components: {
      TreeGrid
    },
    methods: {
      rowClick(data, index, event) {
        console.log('当前行数据:' + data)
        console.log('点击行号:' + index)
        console.log('点击事件:' + event)
      },
      selectionClick(arr) {
        console.log('选中数据id数组:' + arr)
      },
      sortClick(key, type) {
        console.log('排序字段:' + key)
        console.log('排序规则:' + type)
      }
    }
  }
</script>-->

<!--<template>
  <div>
    首页
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      tableData: []
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>-->
