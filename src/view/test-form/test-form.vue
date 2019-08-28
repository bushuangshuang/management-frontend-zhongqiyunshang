<template>
  <div class="info">
    <div class="info-title">個人信息</div>
    <div style="display: flex;justify-content: space-between">
      <div style="width: 50%">
        <custom-table
          :isSelection="isSelection"
          :tableData="tableData"
          :tableColumns="tableColumns"
          :page="page"
          :queryForm="queryForm"
          :queryFormItemData="queryFormItemData"
          @on-selection-click="selectionClick"
          @on-get-list="getList"
          @on-change-page="handlePage"
          @on-change-pageSize="handlePageSize"></custom-table>
      </div>
      <div style="width:50%;">
        <custom-form
          :infoForm="infoForm"
          :ruleInfoForm="ruleInfoForm"
          :FormItemDate="FormItemDate"
          @on-form-submit="handleSubmit"
        ></custom-form>
      </div>
    </div>

  </div>

</template>

<script>
import CustomForm from '@/components/custom-form'
import CustomTable from '@/components/custom-table'
export default {
  name: 'test-form',
  components: {
    CustomForm,
    CustomTable
  },
  data () {
    return {
      ruleInfoForm: {
        name: [{ required: true, message: '此项必填', trigger: 'blur' }],
        sex: [{ required: true, message: '此项必填', trigger: 'change' }],
        birthday: [{ required: true, type: 'string', message: '此项必填', trigger: 'change' }]
      },
      infoForm: {
        name: 'xingMing',
        sex: '1',
        birthday: '2019-01-02',
        nation: '民族',
        price: '3000'
      },
      FormItemDate: [
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          placeholder: '请输入姓名'
        },
        {
          type: 'select',
          prop: 'sex',
          isCascade: false,
          label: '性别',
          placeholder: '请选择性别',
          selectOption: [{ value: '1', label: '男' }, { value: '2', label: '女' }]
        },
        {
          type: 'date',
          prop: 'birthday',
          label: '出生日期',
          placeholder: '请选择出生日期',
          format: 'yyyy-MM-dd'
        },
        {
          type: 'input',
          prop: 'nation',
          label: '民族',
          placeholder: '请输入民族'
        },
        {
          type: 'input',
          prop: 'price',
          label: '价格',
          placeholder: '请输入价格'
        },
        {
          type: 'file',
          prop: 'fileUrl',
          label: '上传文件',
          model: 'infoForm.fileUrl'
        }
      ],
      ids: [],
      isSelection: false,
      tableData: [
        {
          name: '张三',
          sex: '女',
          birthday: '2000-08-09',
          nation: '汉族'
        },
        {
          name: '张三',
          sex: '男',
          birthday: '2000-08-09',
          nation: '汉族'
        },
        {
          name: '张三',
          sex: '男',
          birthday: '2000-08-09',
          nation: '汉族'
        },
        {
          name: '张三',
          sex: '女',
          birthday: '2000-08-09',
          nation: '汉族'
        }

      ],
      tableColumns: [
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex'
        },
        {
          title: '出生日期',
          key: 'birthday',
          align: 'center'
        },
        {
          title: '民族',
          key: 'nation',
          align: 'center'
        }
      ],
      page: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      queryForm: {
        name: '',
        sex: ''
      },
      queryFormItemData: [
        {
          type: 'input',
          prop: 'name',
          label: '姓名',
          model: 'infoForm.name',
          placeholder: '请输入姓名',
          width: '200px'
        },
        {
          type: 'select',
          prop: 'sex',
          label: '性别',
          model: 'infoForm.sex',
          placeholder: '请选择性别',
          selectOption: [{ value: '1', label: '男' }, { value: '2', label: '女' }],
          width: '200px'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.page.total = this.tableData.length
    },
    selectionClick ({ ids }) {
      this.ids = ids
    },
    handlePage ({ pageNumber }) {
      this.page.pageNumber = pageNumber
      this.getList()
    },
    handlePageSize ({ pageSize }) {
      this.page.pageSize = pageSize
      this.getList()
    },
    handleSubmit ({ infoForm }) {
    }
  }
}

</script>

<style scoped>
  .info-title{
    font-size: 18px;
    text-align: center;
    padding:20px 0;
  }
</style>
