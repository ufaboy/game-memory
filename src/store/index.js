import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isStartedGame: false,
    cellArray: [],
    firstCell: null,
    secondCell: null,
  },
  mutations: {
    setStartedGame(state) {
      state.isStartedGame = true
    },
    setStoppedGame(state) {
      state.isStartedGame = false
    },
    setCellArray (state, payload) {
      state.cellArray = payload
    }

  },
  actions: {
  },
  modules: {
  }
})
