<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <div class="text-center mb-8">
        <h1 class="text-h3 font-weight-bold">
          Nahuel Rocchetti
        </h1>

        <p class="text-subtitle-1 text-medium-emphasis">
          C# Developer (ASP.NET Backend, networking and game development)
        </p>

        <p class="text-body-2 mt-2">
          <router-link to="/contact">Looking for a developer? Reach out!</router-link>
        </p>
      </div>

      <div>
        <h2 class="text-h5 font-weight-medium mb-3">
          About Me
        </h2>

        <p class="text-body-1">
          My name is Nahuel, I'm a programmer from Argentina focused on developing with C# and C++ with a strong background in game development, reverse engineering and networking.
        </p>

        <p class="text-body-1">
          I'm mostly known for developing patches and tools for games like <i>The Sims 2</i> and <i>Dead Rising 2: Off The Record</i>, reverse engineering engine behavior to fix bugs, extend functionality and improve performance.
        </p>

        <p class="text-body-1">
          More recently I've worked on <i>All City Network</i> - an MMO Multiplayer mod for Bomb Rush Cyberfunk, a game developed in the Unity Engine.
        </p>

        <p class="text-body-1">
          I'm currently expanding into full-stack web development, working on an ASP.NET backend for auth and player count for All City Network, with a Vue frontend. This portfolio was made using Vue.
        </p>

        <p class="text-body-1">
          Nowadays I'm learning Godot and fullstack development with Vue and ASP.NET.
        </p>

        <p class="text-body-1">
          Check out the <router-link to="/showcase">Showcase</router-link> and <router-link to="/blog">Blog</router-link> sections of the page to see some of my projects and technical dives!
        </p>

        <h2 class="text-h5 font-weight-medium mb-3">
          Skills
        </h2>

        <ul class="text-body-1 mb-4">
          <li>C#, C++, ASP.NET Core</li>
          <li>Networking (real-time client-server)</li>
          <li>TypeScript and JavaScript</li>
        </ul>

        <h2 class="text-h5 font-weight-medium mb-3">
          Tech
        </h2>

        <ul class="text-body-1">
          <li>Unity and Godot for game development</li>
          <li>Vue, Vuetify, Vite and ASP.NET for web apps</li>
        </ul>

      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import { getCurrentInstance } from 'vue'

  const { appContext } = getCurrentInstance()

  useHead({
    title: `Home - ${appContext.config.globalProperties.$title}`,
  })

  useSeoMeta({
    title: `Home - ${appContext.config.globalProperties.$title}`,
    description: appContext.config.globalProperties.$description,
    ogTitle: `Home - ${appContext.config.globalProperties.$title}`,
    ogDescription: appContext.config.globalProperties.$description,
    ogImage: 'https://lazyduchess.online/seoicon.png',
  })

</script>
