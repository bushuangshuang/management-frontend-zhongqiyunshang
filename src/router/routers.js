import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: (resolve) => require(['@/view/login/login.vue'], resolve)
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      hideInMenu: true
    },
    component: (resolve) => require(['@/view/register/register.vue'], resolve)
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      title: '首页',
      hideInMenu: false,
      notCache: true,
      icon: 'md-home'
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          hideInMenu: false,
          notCache: true,
          icon: 'md-home'
        },
        component: (resolve) => require(['@/view/single-page/home'], resolve)
      }
    ]
  },
  {
    path: '/basicInfo',
    name: 'basicInfo',
    component: Main,
    meta: {
      title: '基础信息',
      icon: 'md-options'
    },
    children: [
      {
        path: 'organManage',
        name: '组织管理',
        meta: {
          title: '组织管理'
        },
        component: (resolve) => require(['@/view/partner/basic-info/index.vue'], resolve)
      },
      {
        path: 'userManage',
        name: '用户管理',
        meta: {
          title: '用户管理'
        },
        component: (resolve) => require(['@/view/partner/user-info/index.vue'], resolve)
      }
    ]

  },
  {
    path: '/classManage',
    name: 'classManage',
    meta: {
      title: '产品类别管理',
      hideInBread: true,
      icon: 'icon-a'
    },
    component: Main,
    children: [
      {
        path: 'classManagePage',
        name: 'classManagePage',
        meta: {
          title: '产品类别管理',
          icon: 'logo-buffer'
        },
        component: (resolve) => require(['@/view/classManage/index'], resolve)
      }
    ]
  },
  {
    path: '/productManage',
    name: 'productManage',
    meta: {
      title: '产品管理',
      hideInBread: true,
      icon: 'md-cube'
    },
    component: Main,
    children: [
      {
        path: 'productManagePage',
        name: 'productManagePage',
        meta: {
          title: '产品管理',
          icon: 'md-cube'
        },
        component: (resolve) => require(['@/view/productManage/index'], resolve)
      },
      {
        path: 'productAddPage',
        name: 'productAddPage',
        meta: {
          hideInMenu: true,
          title: '编辑车型'
        },
        component: (resolve) => require(['@/view/productManage/addPage'], resolve)
      },
      {
        path: 'productShowPage',
        name: 'productShowPage',
        meta: {
          hideInMenu: true,
          title: '查看产品详情'
        },
        component: (resolve) => require(['@/view/productManage/showPage'], resolve)
      }
    ]
  },
  {
    path: '/priceManage',
    name: 'priceManage',
    meta: {
      title: '价格管理',
      hideInBread: true,
      icon: 'icon-a'
    },
    component: Main,
    children: [
      {
        path: 'priceManage',
        name: 'priceManage',
        meta: {
          title: '价格管理',
          icon: 'md-pricetags',
          keepAlive: true
        },
        component: (resolve) => require(['@/view/priceManage/index.vue'], resolve)
      },
      {
        path: 'priceAddPage',
        name: 'priceAddPage',
        meta: {
          title: '增加价格',
          hideInMenu: true,
          icon: 'md-home'
        },
        component: (resolve) => require(['@/view/priceManage/addPage'], resolve)
      }
    ]
  },
  {
    path: '/financeManage',
    name: 'financeManage',
    meta: {
      title: '金融产品',
      hideInBread: true,
      icon: 'md-card'
    },
    component: Main,
    children: [
      {
        path: 'financeManagePage',
        name: 'financeManagePage',
        meta: {
          title: '金融产品',
          icon: 'md-card'
        },
        component: (resolve) => require(['@/view/financeManage/index'], resolve)
      },
      {
        path: 'financeBindingPage',
        name: 'financeBindingPage',
        meta: {
          title: '金融产品绑定',
          hideInMenu: true,
          icon: 'md-home'
        },
        component: (resolve) => require(['@/view/financeManage/bindingPage'], resolve)
      }
    ]
  },
  {
    path: '/salesScopeManage',
    name: 'salesScopeManage',
    meta: {
      title: '销售范围管理',
      hideInBread: true,
      icon: 'md-map'
    },
    component: Main,
    children: [
      {
        path: 'salesScopeManagePage',
        name: 'salesScopeManagePage',
        meta: {
          title: '销售范围管理',
          icon: 'md-map'
        },
        component: (resolve) => require(['@/view/salesScopeManage/index'], resolve)
      }
    ]
  },
  {
    path: '/salesScopeVerify',
    name: 'salesScopeVerify',
    meta: {
      title: '销售范围审核',
      hideInBread: true,
      icon: 'ios-copy'
    },
    component: Main,
    children: [
      {
        path: 'salesScopeVerifyPage',
        name: 'salesScopeVerifyPage',
        meta: {
          title: '销售范围审核',
          icon: 'ios-copy'
        },
        component: (resolve) => require(['@/view/salesScopeVerify/index'], resolve)
      }
    ]
  },
  {
    path: '/saleManage',
    name: 'saleManage',
    component: Main,
    meta: {
      title: '订单管理',
      icon: 'ios-paper'
    },
    children: [
      {
        path: 'orderManage',
        name: 'orderManage',
        meta: {
          title: '订单查询',
          icon: ''
        },
        component: (resolve) => require(['@/view/saleManage/orderManage/index.vue'], resolve)
      },
      {
        path: 'orderPool',
        name: 'orderPool',
        meta: {
          title: '订单池',
          icon: ''
        },
        component: (resolve) => require(['@/view/saleManage/orderPool/index.vue'], resolve)
      },
      {
        path: 'myOrder',
        name: 'myOrder',
        meta: {
          title: '我的订单',
          keepAlive: true,
          icon: ''
        },
        component: (resolve) => require(['@/view/saleManage/myOrder/index.vue'], resolve)
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        meta: {
          title: '订单详情',
          hideInMenu: true
        },
        component: (resolve) => require(['@/view/saleManage/myOrder/orderDetail.vue'], resolve)
      }
    ]
  },
  {
    path: '/dataManage',
    name: 'dataManage',
    component: Main,
    meta: {
      title: '数据管理',
      icon: 'md-pie'
    },
    children: [
      {
        path: 'carData',
        name: 'carData',
        meta: {
          title: '车辆数据'
        },
        component: (resolve) => require(['@/view/dataManage/carData/index.vue'], resolve)
      },
      {
        path: 'carDataDetail',
        name: 'carDataDetail',
        meta: {
          title: '车辆详情',
          hideInMenu: true
        },
        component: (resolve) => require(['@/view/dataManage/carData/detail.vue'], resolve)
      },
      {
        path: 'userData',
        name: 'userData',
        meta: {
          title: '用户数据'
        },
        component: (resolve) => require(['@/view/dataManage/userData/index.vue'], resolve)
      },
      {
        path: 'userDataDetail',
        name: 'userDataDetail',
        meta: {
          title: '用户详情',
          hideInMenu: true

        },
        component: (resolve) => require(['@/view/dataManage/userData/detail.vue'], resolve)
      },
      {
        path: 'orderData',
        name: 'orderData',
        meta: {
          title: '订单数据'
        },
        component: (resolve) => require(['@/view/dataManage/orderData/index.vue'], resolve)
      },
      {
        path: 'orderDataDetail',
        name: 'orderDataDetail',
        meta: {
          title: '订单详情',
          hideInMenu: true

        },
        component: (resolve) => require(['@/view/dataManage/orderData/detail.vue'], resolve)
      }
    ]
  }, {
    path: '/financialManagement',
    name: 'financialManagement',
    meta: {
      title: '财务管理',
      hideInBread: true,
      icon: 'logo-usd'
    },
    component: Main,
    children: [
      {
        path: 'financialManagementPage',
        name: 'financialManagementPage',
        meta: {
          title: '财务管理',
          icon: 'logo-usd'
        },
        component: (resolve) => require(['@/view/financialManagement/index'], resolve)
      }
    ]
  },
  {
    path: '/logisticsSystem',
    name: 'logisticsSystem',
    meta: {
      title: '物流系统',
      hideInBread: true,
      icon: 'ios-navigate'
    },
    component: Main,
    children: [
      {
        path: 'logisticsSystemPage',
        name: 'logisticsSystemPage',
        meta: {
          title: '物流系统',
          icon: 'ios-navigate'
        }
      }
    ]
  },
  /* {
    path: '/testForm',
    name: 'testForm',
    component: Main,
    meta: {
      title: 'test-form'
    },
    children: [
      {
        path: 'testForm',
        name: 'testForm',
        meta: {
          icon: 'md-notifications',
          title: 'table&form表单'
        },
        component: (resolve) => require(['@/view/test-form/test-form.vue'], resolve)
      }
    ]

  }, */
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: (resolve) => require(['@/view/single-page/message/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: (resolve) => require(['@/view/error-page/401.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: (resolve) => require(['@/view/error-page/500.vue'], resolve)

  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: (resolve) => require(['@/view/error-page/404.vue'], resolve)

  }
]
