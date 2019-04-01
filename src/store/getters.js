const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  message: state => state.websocket.socket.message,
  pushmessage: state => state.apipush.socket.message
}
export default getters
