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

export default router
