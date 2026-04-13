/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router/routes'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Routes,
})

router.afterEach(to => {
  document.title = to.meta.title || 'Nahuel - Portfolio'
})

export default router
