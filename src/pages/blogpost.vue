<template>
  <v-container class="fill-height" max-width="900">
    <div class="markdown" v-html="content" />
  </v-container>
  <div class="darken" :class="{ open: expandedImage != null }" @click="unexpand()" />
</template>

<script setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import MarkdownIt from 'markdown-it'
  import { getCurrentInstance, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useBlog } from '@/composables/useBlog'

  const { appContext } = getCurrentInstance()

  const { getPostBySlug } = useBlog()

  const expandedImage = ref(null)

  const route = useRoute()
  const md = new MarkdownIt()

  const slug = route.path.split('/').pop()

  let content = '<h1>Whoops!</h1>Could not find that blog post. Sorry!'

  const post = getPostBySlug(slug)

  useHead({
    title: `${post.title} - ${appContext.config.globalProperties.$title}`,
  })

  useSeoMeta({
    title: `${post.title} - ${appContext.config.globalProperties.$title}`,
    description: post.description,
    ogTitle: `${post.title} - ${appContext.config.globalProperties.$title}`,
    ogDescription: post.description,
    ogImage: post.seoimage,
  })

  if (post) {
    content = md.render(post.content)
  }

  async function unexpand () {
    if (expandedImage.value == null)
      return
    expandedImage.value.remove()
    expandedImage.value = null
  }

  onMounted(() => {
    for (const img of document.querySelectorAll('.markdown img')) {
      img.addEventListener('click', () => {
        if (expandedImage.value != null)
          return
        const newImg = img.cloneNode(false)
        newImg.classList.add('markdownexpanded')
        document.body.append(newImg)
        expandedImage.value = newImg
        newImg.addEventListener('click', () => {
          expandedImage.value = null
          newImg.remove()
        })
      })
    }
  })
</script>

<style>
.markdown img {
    max-width: 100%;
    max-height: 512px;
    cursor: zoom-in;
}

.markdownexpanded {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  max-width: 90vw;
  max-height: 90vh;
  z-index: 5000;
  cursor: zoom-out;
}

.darken {
    z-index: 2000;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 500%;
    background-color: #000000;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.darken.open {
    pointer-events: auto;
    opacity: 0.8;
}
</style>
