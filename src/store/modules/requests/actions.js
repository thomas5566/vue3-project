export default {
  async contactCoach(context, payload) {
    // resive data from the contactCoach component
    const newRequest = {
      // id: new Date().toISOString(), // local only
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    }
    const response = await fetch(`https://vue-http-demo-25ff6-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error
    }

    newRequest.id = responseData.name // automatically generated ID
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest) // addRequest: defind in mutations function
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token;
    const response = await fetch(`https://vue-http-demo-25ff6-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch request.')
      throw error
    }

    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  }
}