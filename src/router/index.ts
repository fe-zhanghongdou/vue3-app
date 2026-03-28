import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/waterfall',
    name: 'Waterfall',
    component: () => import('../views/Waterfall.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
