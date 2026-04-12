<template>
  <v-card
    v-for="project in filteredProjects"
    :key="project.title"
    class="mb-4 pa-4 d-flex"
    hover
    :href="project.link"
    rel="noopener"
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
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
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
