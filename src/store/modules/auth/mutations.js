export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    // if login again set didAutoLogout false again
    // next time is switches to true, also triggered App.vue watcher again
    state.didAutoLogout = false
    // state.tokenExpiration = payload.tokenExpiration; 實際不需存在store
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
}