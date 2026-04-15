<template>
  <v-card
    v-for="project in filteredProjects"
    :key="project.title"
    class="mb-4 pa-4 d-flex list-item"
    hover
    :href="project.link"
    rel="noopener"
    rounded="xl"
    target="_blank"
  >
    <div class="d-flex align-center">
      <v-img
        v-if="project.thumbnail"
        class="rounded-l"
        height="128"
        :src="project.thumbnail"
        width="128"
      />
    </div>
    <div class="pa-4 d-flex flex-column justify-center">
      <v-card-title>{{ project.title }}</v-card-title>
      <v-card-text>{{ project.description }}</v-card-text>
    </div>
  </v-card>
</template>

      <script setup>
  import { computed } from 'vue'

  const props = defineProps({
    projects: Array,
    category: String,
  })

  const filteredProjects = computed(() => {
    if (!props.category || props.category === 'all') {
      return props.projects
    }

    return props.projects.filter(
      p => p.category === props.category,
    )
  })
</script>
