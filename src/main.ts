import { createHead } from '@vueuse/head'
import { ViteSSG } from 'vite-ssg'
import { registerPlugins } from '@/plugins'
import routes from '@/router/routes'
import App from './App.vue'

const head = createHead()

export const createApp = ViteSSG(
  App,
  {
    routes,
    prerender: true,
  },
  ({ app }) => {
    app.use(head)
    registerPlugins(app)
  },
  {
    format: 'directory',
  },
)
