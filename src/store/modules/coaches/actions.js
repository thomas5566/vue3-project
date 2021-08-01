export default {
  async registerCoach(context, formdata) {
    const userId = context.rootGetters.userId
    const coachData = {
      // id: context.rootGetters.userId,
      firstName: formdata.first,
      lastName: formdata.last,
      description: formdata.desc,
      hourlyRate: formdata.rate,
      areas: formdata.areas
    }

    const response = await fetch(`https://vue-http-demo-25ff6-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    // const responseData = await response.json()

    if (!response.ok) {
      // errer ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    }) // 把值丟去mutations
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return // 如果更新時間小於６０秒 就不在跟backend要資料
    }

    const response = await fetch(
      `https://vue-http-demo-25ff6-default-rtdb.firebaseio.com/coaches.json`
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error
    }

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    context.commit('setFatchTimestamp')
  }
}