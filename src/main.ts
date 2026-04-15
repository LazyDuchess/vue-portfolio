import { ViteSSG } from 'vite-ssg'
import { registerPlugins } from '@/plugins'
import routes from '@/router/routes'
import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.config.globalProperties.$title = 'Nahuel'
    app.config.globalProperties.$description = 'Programming, reverse engineering and game development projects.'
    registerPlugins(app)
  },
)
