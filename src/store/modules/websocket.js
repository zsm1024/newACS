import { getToken } from '@/utils/auth'
const websocket = {
  state: {
    socket: {
      ws: null,
      isConnected: true,
      message: '',
      reconnectError: false,
    },
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      var url = 'ws://127.0.0.1:30296' //10.50.132.166:30296
      state.socket.ws = new WebSocket(url);

      state.socket.ws.onmessage = evt => {
        state.socket.message =  evt.data;
      }
      state.socket.ws.onerror = evt => {
        if (evt) {
          state.socket.isConnected = false
        }
      }
    },
    SOCKET_MESSAGE: (state, message) => {
      state.socket.message = message
      
    },
    SOCKET_SENDDATA (state, data)  {
      if(state.socket.ws){
        state.socket.ws.onopen = () => {
          if (state.socket.ws.readyState ===1) {
            state.socket.ws.send(data)
          }
        }
      }
    },
  },
  actions: {
    SocketConnect: ({ commit }) => {
        commit('SOCKET_CONNECT')
    },
    SocketMessage: ({ commit }, message) => {
      commit('SOCKET_MESSAGE', message)
    },
    SocketSenddata: ({ commit }, data) => {
      commit('SOCKET_SENDDATA', data)
    }
  }
}
export default websocket