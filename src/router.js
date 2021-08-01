import { createRouter, createWebHistory } from 'vue-router'

import CoachDetial from './pages/coaches/CoachDetial.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegistation from './pages/coaches/CoachRegistation.vue'
import ContactCoache from './pages/requests/ContactCoache.vue'
import RequestsReceieved from './pages/requests/RequestsReceieved.vue'
import NotFound from './pages/NotFound.vue'

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
    { path: '/register', component: CoachRegistation },
    { path: '/requests', component: RequestsReceieved },
    { path: '/:notFound(.*)', component: NotFound }, // no matter what was enter here you wanna handle it with this route
  ]
})

export default router