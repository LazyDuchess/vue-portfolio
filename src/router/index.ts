/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Blog from '@/pages/blog.vue'
import BlogPost from '@/pages/blogpost.vue'
import Index from '@/pages/index.vue'
import Showcase from '@/pages/showcase.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/showcase',
      component: Showcase,
    },
    {
      path: '/blog',
      component: Blog,
    },
    {
      path: '/blog/:slug',
      component: BlogPost,
    },
  ],
})

router.afterEach(to => {
  document.title = to.meta.title || 'Nahuel - Portfolio'
})

export default router
