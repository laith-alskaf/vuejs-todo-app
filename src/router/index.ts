import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/todo/:id',
    name: 'TodoDetails',
    props: true,
    component: () => import('../views/TodoDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
