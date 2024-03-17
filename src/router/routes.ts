import { RouteRecordRaw } from 'vue-router'

export const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home.vue')
  },
  {
    path: '/summary',
    name: 'summary',
    component: () => import('../pages/summary.vue')
  }
]
