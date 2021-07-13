import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isStartedGame: false,
    resultArray: []
  },
  mutations: {
    setStartedGame(state) {
      state.isStartedGame = true
    },
    setStoppedGame(state) {
      state.isStartedGame = false
    },
    setUser(state, payload) {
      state.resultArray.push(payload)
    },
  },
  actions: {
    setStartedGame({ commit }) {
      commit('setStartedGame')
    },
    setFinishGame({ commit }, payload) {
      commit('setStoppedGame')
      commit('setUser', payload)
    }
  },
})
