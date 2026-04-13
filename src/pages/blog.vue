<template>
  <v-container class="fill-height" max-width="900">
    <h2 class="text-h5 font-weight-medium mb-3">
      Posts
    </h2>
    <v-card
      v-for="blog in blogs"
      :key="blog.slug"
      class="mb-4 pa-4 d-flex"
      hover
      rounded="xl"
      :to="'blog/'+blog.slug"
    >
      <div class="d-flex align-center">
        <v-img
          v-if="blog.thumbnail"
          class="rounded-l"
          height="128"
          :src="blog.thumbnail"
          width="128"
        />
      </div>
      <div class="pa-4 d-flex flex-column justify-center">
        <v-card-title>{{ blog.title }}</v-card-title>
        <v-card-subtitle>{{ blog.date }}</v-card-subtitle>
        <v-card-text>{{ blog.description }}</v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  const blogs = [
    {
      title: 'Compute shaders for better character customization',
      date: 'April 13 2026',
      description: 'Writing a custom morphing pipeline in Godot and Blender to increase body shape diversity and customization in characters.',
      slug: 'godotcompute',
      thumbnail: 'blog/godotcompute/thumb.gif',
    },
    {
      title: 'Writing a custom C# scheduler and serializer',
      date: 'April 12 2026',
      description: 'Solving the problem of saving and loading coroutine state in C#, in an elegant, engine-agnostic way.',
      slug: 'csharproutines',
      thumbnail: 'blog/csharp.png',
    },
  ]
</script>
