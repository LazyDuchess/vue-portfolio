export default [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/blog',
    component: () => import('@/pages/blog.vue'),
  },
  {
    path: '/showcase',
    component: () => import('@/pages/showcase.vue'),
  },
  {
    path: '/blog/:slug',
    component: () => import('@/pages/blogpost.vue'),
  },
]
