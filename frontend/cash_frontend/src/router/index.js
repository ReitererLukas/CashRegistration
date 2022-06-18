import { store } from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/adminView',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters['userstore/isUserAdmin']) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: "/exchanges",
    name: "exchangeView",
    component: () => import('../views/ExchangeView.vue'),
    beforeEnter: (to, from, next) => {
      if(store.getters['userstore/isLoggedIn']) {
        next();
      } else {
        next('/');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
