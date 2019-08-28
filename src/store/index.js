import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import productPrice from './module/productPrice'
import app from './module/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    productPrice,
    app }
})
