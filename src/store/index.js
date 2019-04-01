import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import websocket from './modules/websocket'
import apipush from './modules/apipush'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    websocket
  },
  getters
})
if (process.env.NODE_ENV == 'development') {
  store.registerModule('apipush', apipush)
}

export default store
