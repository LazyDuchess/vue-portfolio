<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <div>
        <h2 class="text-h5 font-weight-medium mb-3">
          Contact
        </h2>

        <p class="text-subtitle-1 text-medium-emphasis">
          You can find my socials and contact info here and at the website footer!
        </p>

        <p class="text-body-1">
          GitHub: <a href="https://github.com/LazyDuchess" target="_blank">LazyDuchess</a>
        </p>

        <p class="text-body-1">
          LinkedIn: <a href="https://www.linkedin.com/in/nahuel-rocchetti-b347a6214/" target="_blank">Nahuel Rocchetti</a>
        </p>

        <p class="text-body-1">
          E-mail: <a href="mailto:lattechariot@gmail.com" target="_blank">lattechariot@gmail.com</a>
        </p>

        <p class="text-body-1">
          Twitter: <a href="https://x.com/LazyDuchess" target="_blank">LazyDuchess</a>
        </p>

        <p class="text-body-1">
          Discord: lazyduchess
        </p>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import { getCurrentInstance } from 'vue'

  const { appContext } = getCurrentInstance()

  useHead({
    title: `Contact - ${appContext.config.globalProperties.$title}`,
  })

  useSeoMeta({
    title: `Contact - ${appContext.config.globalProperties.$title}`,
    description: appContext.config.globalProperties.$description,
    ogTitle: `Contact - ${appContext.config.globalProperties.$title}`,
    ogDescription: appContext.config.globalProperties.$description,
    ogImage: 'https://lazyduchess.online/seoicon.png',
  })

</script>
