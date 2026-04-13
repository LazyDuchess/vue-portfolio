import { ViteSSG } from 'vite-ssg'
import { registerPlugins } from '@/plugins'
import routes from '@/router/routes'
import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    registerPlugins(app)
  },
)
