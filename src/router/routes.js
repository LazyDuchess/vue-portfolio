import { useBlog } from '@/composables/useBlog'

const { posts } = useBlog()

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
    path: '/contact',
    component: () => import('@/pages/contact.vue'),
  },

  ...posts.map(post => ({
    path: `/blog/${post.slug}`,
    component: () => import('@/pages/blogpost.vue'),
  })),
]
