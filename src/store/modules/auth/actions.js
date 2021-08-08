let timer; // set timer as globel value 就可以在這檔案任意使用

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOcSKg4ECC-dsffi9T99yzGp7BvDlBiUU'

    if (mode === 'signup') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOcSKg4ECC-dsffi9T99yzGp7BvDlBiUU'
    }
    const response = await fetch(
      url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate. Check you loading data.')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000; 測試AutoLogout用
    const expirationDate = new Date().getTime() + expiresIn; // 現在時間＋The number of seconds in which the ID token expires. 

    // 存token以防page reload
    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(function () {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      // tokenExpiration: expirationDate 實際不需存在store
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // if page reload get remain time
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return; // 如果小於０秒的話 就不執行下面程式（login)
    }

    // if timer is > 0 (still valid)
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        // tokenExpiration: null 實際不需存在store
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer); // 案logout就清除timer

    context.commit('setUser', {
      // pass context data to mutations setUser and set value to null
      token: null,
      userId: null,
      // tokenExpiration: null, 實際不需存在store
    })
  },
  autoLogout(context) {
    // 如果自動登出的話, 踢出限制頁面到其他頁面
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
}