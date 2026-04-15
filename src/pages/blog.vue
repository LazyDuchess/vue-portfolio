<template>
  <v-container class="fill-height" max-width="900">
    <h2 class="text-h5 font-weight-medium mb-3">
      Posts
    </h2>
    <p class="text-subtitle-1 text-medium-emphasis">
      Technical deep dives into what I've worked on.
    </p>
    <v-card
      v-for="post in posts"
      :key="post.slug"
      class="mb-4 pa-4 d-flex"
      hover
      rounded="xl"
      :to="'blog/'+post.slug"
    >
      <div class="d-flex align-center">
        <v-img
          v-if="post.thumbnail"
          class="rounded-l"
          height="128"
          :src="post.thumbnail"
          width="128"
        />
      </div>
      <div class="pa-4 d-flex flex-column justify-center align-start">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ new Date(post.date).toDateString() }}</v-card-subtitle>
        <v-card-text>{{ post.description }}</v-card-text>
        <div class="d-flex flex-wrap">
          <v-chip
            v-for="category in post.categories"
            class="category"
          >
            {{ category }}
          </v-chip>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import { useBlog } from '@/composables/useBlog'

  const { posts } = useBlog()

  useHead({
    title: 'Nahuel - Blog',
  })

  useSeoMeta({
    title: 'Nahuel - Blog',
    description: 'Programming, reverse engineering and game development projects.',
    ogTitle: 'Nahuel - Blog',
    ogDescription: 'Programming, reverse engineering and game development projects.',
  })
</script>

<style>
.category {
  color: rgb(88, 35, 68);
  outline: 2px solid rgb(122, 67, 101);
  font-size: 12px;
  margin-left: 16px;
}
.category .v-chip__content {
  color: rgb(207, 207, 207);
}
</style>
