import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '重庆'
  },
  mutations: {
    _changeCity(state, city) {
      state.city = city
    }
  },
  actions: {
    changeCity(context, city) {
      context.commit('_changeCity', city)
    }
  },
  modules: {
  }
})
