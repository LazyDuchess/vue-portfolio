<template>
  <v-app>
    <v-app-bar elevation="2">
      <template v-if="!$vuetify.display.mdAndUp" #prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </template>
      <v-app-bar-title class="font-weight-bold">
        {{ titleName }}{{ flashCursor ? "_" : "" }}
      </v-app-bar-title>
      <template v-if="$vuetify.display.mdAndUp">
        <div absolute class="center-wrapper">
          <v-btn class="nav-btn" :ripple="false" to="/" variant="plain">Home
            <span class="nav-underline" /></v-btn>
          <v-btn class="nav-btn" :ripple="false" to="/showcase" variant="plain">Showcase
            <span class="nav-underline" /></v-btn>
          <v-btn
            class="nav-btn"
            :class="{ 'v-btn--active': $route.path.startsWith('/blog') }"
            :ripple="false"
            to="/blog"
            variant="plain"
          >Blog
            <span class="nav-underline" /></v-btn>
          <v-btn class="nav-btn" :ripple="false" to="/contact" variant="plain">Contact
            <span class="nav-underline" /></v-btn>
        </div>
      </template>
    </v-app-bar>
    <template v-if="!$vuetify.display.mdAndUp">
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list class="flex-grow-1 overflow-y-auto" density="compact">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :active="item.route == '/' ? $route.path == '/' : $route.path.startsWith(item.route)"
            class="navitem"
            link
            :to="item.route"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>
    <v-main>
      <router-view />
    </v-main>
    <v-footer class="d-flex flex-column align-center py-6">

      <!-- Text -->
      <div class="text-body-2 mb-3 text-center">
        By Lazy Duchess. Made with Vuetify.
      </div>

      <!-- Social buttons -->
      <div class="d-flex justify-center social">
        <v-btn
          href="https://github.com/LazyDuchess"
          icon
          target="_blank"
          variant="text"
        >
          <v-icon icon="mdi-github" />
        </v-btn>

        <v-btn
          href="https://x.com/LazyDuchess"
          icon
          target="_blank"
          variant="text"
        >
          <v-icon icon="mdi-twitter" />
        </v-btn>

        <v-btn
          href="https://www.linkedin.com/in/nahuel-rocchetti-b347a6214"
          icon
          target="_blank"
          variant="text"
        >
          <v-icon icon="mdi-linkedin" />
        </v-btn>

        <v-btn
          href="mailto:lattechariot@gmail.com"
          icon
          target="_blank"
          variant="text"
        >
          <v-icon icon="mdi-email" />
        </v-btn>
      </div>

    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import { onMounted, ref, watch } from 'vue'

  const items = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Showcase',
      route: '/showcase',
    },
    {
      title: 'Blog',
      route: '/blog',
    },
    {
      title: 'Contact',
      route: '/contact',
    },
  ]

  const drawer = ref(false)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })

  useHead({
    title: 'Nahuel - Portfolio',
  })

  useSeoMeta({
    title: 'Nahuel - Portfolio',
    description: 'Programming, reverse engineering and game development projects.',
    ogTitle: 'Nahuel - Portfolio',
    ogDescription: 'Programming, reverse engineering and game development projects.',
  })

  const title1 = 'Nahuel'
  const title2 = 'Lazy Duchess'
  const titleName = ref<string>(title1)
  const flashCursor = ref<boolean>(true)
  let titleStep = 0

  onMounted(() => {
    setInterval(() => {
      flashCursor.value = titleStep != 0 && titleStep != 3 ? false : !flashCursor.value
    }, 500)

    setInterval(() => {
      if (titleStep == 1) {
        if (titleName.value.length > 0) {
          titleName.value = titleName.value.slice(0, Math.max(0, titleName.value.length - 1))
        } else {
          titleStep = 2
        }
      } else if (titleStep == 2) {
        if (titleName.value == title2) {
          titleStep = 3
        } else {
          titleName.value += title2[titleName.value.length]
        }
      } else if (titleStep == 4) {
        if (titleName.value.length > 0) {
          titleName.value = titleName.value.slice(0, Math.max(0, titleName.value.length - 1))
        } else {
          titleStep = 5
        }
      } else if (titleStep == 5) {
        if (titleName.value == title1) {
          titleStep = 0
        } else {
          titleName.value += title1[titleName.value.length]
        }
      }
    }, 50)

    setInterval(() => {
      if (titleStep == 0)
        titleStep = 1
      else if (titleStep == 3)
        titleStep = 4
    }, 5000)
  })
</script>

<style scoped>

.navitem.v-list-item--active {
  color: var(--color-accent);
}

.center-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-btn {
  height: 64px;
  font-size: 18px;
}

.nav-btn.v-btn--active  {
  color: var(--color-accent);
  opacity: 1;
}

.nav-btn.v-btn--active .nav-underline {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 3px;
  background-color: var(--color-accent);
  z-index: 10;
}

.v-app-bar-title {
  color: var(--color-title);
  font-family: "VT323", monospace;
  font-size: 32px
}

.social {
  color: var(--color-accent);
}

</style>
