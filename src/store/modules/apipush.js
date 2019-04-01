const url = window.g.ApiPushUrl;
const apipush = {
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
      state.socket.ws = new WebSocket(url);
      state.socket.ws.onmessage = evt => {
        state.socket.message = evt.data;
      }
      state.socket.ws.onerror = evt => {
        if (evt) {
          console.log('连接失败')
          console.log(evt)
          state.socket.isConnected = false
        }
      }
    },
    SOCKET_MESSAGE: (state, message) => {
      state.socket.message = message
    },
    SOCKET_SENDDATA(state, response) {
      if (state.socket.ws) {
        if (state.socket.ws.readyState === 1) {
          try {
            var data = {
              apiurl: response.request.responseURL,
              request: response.request.custom.options.body,
              response: response.data,
              token: response.config.headers.Authorization ? response.config.headers.Authorization.split(' ')[1] : '',
              method: response.config.method.toUpperCase()
            }
            data = JSON.stringify(data);
            state.socket.ws.send(data)
          } catch (e) {
            console.log(e); // for debug
          }
        } else {
          state.socket.ws = new WebSocket(url);
        }
      } else {

      }
    },
  },
  actions: {
    PushSocketConnect: ({ commit }) => {
      commit('SOCKET_CONNECT')
    },
    PushSocketMessage: ({ commit }, message) => {
      commit('SOCKET_MESSAGE', message)
    },
    PushSocketSenddata: ({ commit }, data) => {
      commit('SOCKET_SENDDATA', data)
    }
  }
}
export default apipush