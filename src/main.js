// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
// import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'babel-polyfill'
import './index.less'
import '@/assets/icons/iconfont.css'

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'http://bbf2692fe8254af79197945e9762c292@sentry.zqysjt.com:8080//5',
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true,
    }),
    new Integrations.RewriteFrames()
  ],
  environment: process.env.VUE_APP_ENV
});

//Sentry.captureException(new Error("Something broke"));

if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
//importDirective(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
