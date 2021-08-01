export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0 // 檢查有沒有data
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId // store/index.js 裡的getter userId
    return coaches.some(coach => coach.id === userId) // 檢查有沒有相同Id
  },
  shouldUpdate(state) {
    const lastFatch = state.lastFatch
    if (!lastFatch) {
      return true // if we have no timestamp yet should update
    }
    const currentTimeStamp = new Date().getTime()
    return (currentTimeStamp - lastFatch) / 1000 > 60 // means more then a minute ago
  }
}