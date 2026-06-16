import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/profile',
      component: Profile,
    },
  ],
})

export default router
