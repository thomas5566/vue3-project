import { createRouter, createWebHistory } from 'vue-router'

import CoachDetial from './pages/coaches/CoachDetial.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegistation from './pages/coaches/CoachRegistation.vue'
import ContactCoache from './pages/requests/ContactCoache.vue'
import RequestsReceieved from './pages/requests/RequestsReceieved.vue'
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetial,
      props: true, // :id 這個動態值會以value形式 pass 到CoachDetial component
      children: [
        { path: 'contact', component: ContactCoache }, // /coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegistation, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceieved, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }, // no matter what was enter here you wanna handle it with this route
  ]
})

// global navigation guard
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // 如果未登入或沒有token的話, 頁面會導到/auth
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // if we should not be Authenicated, but we are then i wanna go to /coaches page
    next('/coaches')
  } else {
    next()
  }
})

export default router