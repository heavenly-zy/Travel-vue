import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultCity = '重庆'

try {
  defaultCity = localStorage.getItem('city') || defaultCity
} catch (e) {
  console.log('你的浏览器不支持localStorage!')
}

export default new Vuex.Store({
  state: {
    city: defaultCity
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      localStorage.setItem('city', city)
    }
  },
  modules: {
  }
})
