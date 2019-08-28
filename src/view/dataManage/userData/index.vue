<template>
  <div class="basic-info">
    <div style="min-height:200px;">
      <custom-table
        :queryForm="queryForm"
        :queryFormItemData="queryFormItemData"
        :tableData="tableData"
        :tableColumns="tableColumns"
        :page="page"
        @on-get-list="getList"
        @on-change-page="handlePage"
        @on-change-pageSize="handlePageSize"
      ></custom-table>
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/custom-table'
import CustomForm from '@/components/custom-form'
import { loadDataByType } from '@/api/common'
import { myOrderLoadData } from '@/api/partner/saleManage'
export default {
  name: 'index',
  components: {
    CustomTable,
    CustomForm
  },
  data () {
    return {
      queryForm: {
        carLicence: '',
        carProductCd: '',
        carStatus: '',
        userName: '',
        linkPhone: ''
      },
      carStatusOption: [],
      tableColumns: [
        {
          title: '车牌号',
          key: 'carLicence',
          width: 175,
          align: 'center'
        },
        {
          title: '车辆编码',
          align: 'center',
          key: 'carProductCd'
        },
        {
          title: '使用人',
          key: 'username',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'phone',
          align: 'center'
        },
        {
          title: '车辆状态',
          key: 'carStatus',
          align: 'center'
        },
        {
          title: '操作',
          key: 'handle',
          width: 180,
          // fixed: 'right',
          align: 'center',
          render: (h, params) => {
            let that = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#2d8cf0'
                },
                on: {
                  click: () => {
                    that.toShow(params.row.id)
                  }
                }
              }, '详细信息')
            ])
          }
        }
      ],
      tableData: [],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }

    }
  },
  computed: {
    queryFormItemData () {
      return this.$store.state.user.carData
    }
  },
  created () {
    this.setQueryData()
    this.getList()
  },
  activated () {
    this.setQueryData()
    this.getList()
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    if (to.meta.title !== '查看') {
      from.meta.keepAlive = false
    }
    next()
  },
  methods: {
    setQueryData () {
      let data = {
        'type': 'PAYMENT_TYPE'
      }
      loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.carStatusOption = res.data.list
          let arr = [
            {
              type: 'input',
              prop: 'carLicence',
              label: '车牌号',
              placeholder: '请输入车牌号',
              width: '140px'
            },
            {
              type: 'input',
              prop: 'carProductCd',
              label: '车辆编码',
              placeholder: '请输入车辆编码',
              width: '140px'
            },
            {
              type: 'select',
              prop: 'carStatus',
              label: '车辆状态',
              placeholder: '请选择车辆状态',
              selectOption: this.carStatusOption,
              width: '140px'
            },
            {
              type: 'input',
              prop: 'userName',
              label: '用户名称',
              placeholder: '请输入用户名称',
              width: '140px'
            },
            {
              type: 'input',
              prop: 'linkPhone',
              label: '联系方式',
              placeholder: '请输入联系方式',
              width: '140px'
            }
          ]
          this.$store.commit('setCarData', arr)
        } else {
          this.$Message.info(res.data.msg)
        }
      })
    },
    getList () { // {query}
      let data = {
        carLicence: this.queryForm.carLicence,
        carProductCd: this.queryForm.carProductCd,
        carStatus: this.queryForm.carStatus,
        userName: this.queryForm.userName,
        linkPhone: this.queryForm.linkPhone,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      myOrderLoadData(data).then(res => {
        if (res.data.code === '200') {
          this.tableData = res.data.page.list
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
    toShow (id) {
      localStorage.setItem('userDataId', id)
      this.$router.push({ name: 'userDataDetail' })
    }
  }
}
</script>
