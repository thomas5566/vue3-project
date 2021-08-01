export default {
  registerCoach(state, payload) {
    state.coaches.push(payload)
  },
  setCoaches(state, payload) {
    state.coaches = payload
  },
  setFatchTimestamp(state) {
    state.lastFatch = new Date().getTime() // store this Timestamp in last fetch
  }
}