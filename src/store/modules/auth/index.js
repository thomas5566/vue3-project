import mutations from "./mutations.js"
import actions from './actions.js'
import getters from './getters.js'

export default {
  state() {
    return {
      userId: null, // 確保Id不重複
      token: null,
      // tokenExpiration: null, 實際不需存在store
      didAutoLogout: false
    }
  },
  mutations,
  actions,
  getters
}