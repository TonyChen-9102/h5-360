import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: uni.getStorageSync('userInfo') || null,
    token: uni.getStorageSync('accessToken') || '',
    isLogin: !!uni.getStorageSync('accessToken')
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      state.isLogin = true
      uni.setStorageSync('userInfo', userInfo)
    },
    SET_TOKEN(state, token) {
      state.token = token
      state.isLogin = true
      uni.setStorageSync('accessToken', token)
    },
    LOGOUT(state) {
      state.userInfo = null
      state.token = ''
      state.isLogin = false
      uni.removeStorageSync('accessToken')
      uni.removeStorageSync('userInfo')
    }
  },
  actions: {
    login({ commit }, { token, userInfo }) {
      commit('SET_TOKEN', token)
      commit('SET_USER_INFO', userInfo)
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  }
})

export default store
