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
      <div class="pa-4 d-flex flex-column justify-center">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-subtitle>{{ post.date }}</v-card-subtitle>
        <v-card-text>{{ post.description }}</v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useBlog } from '@/composables/useBlog'

  const { posts } = useBlog()
</script>
