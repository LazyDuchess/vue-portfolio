<template>
  <v-container class="fill-height" max-width="900">
    <div>
      <p class="text-subtitle-1 text-medium-emphasis">
        Check out my work!
      </p>
      <h2 class="text-h5 font-weight-medium mb-3">
        Modding and Reverse Engineering
      </h2>
      <ShowcaseProject
        category="mod"
        :projects="projects"
      />
      <h2 class="text-h5 font-weight-medium mb-3">
        Unity Engine
      </h2>
      <ShowcaseProject
        category="unity"
        :projects="projects"
      />
      <h2 class="text-h5 font-weight-medium mb-3">
        Godot Engine
      </h2>
      <ShowcaseProject
        category="godot"
        :projects="projects"
      />
      <h2 class="text-h5 font-weight-medium mb-3">
        Other
      </h2>
      <ShowcaseProject
        category="software"
        :projects="projects"
      />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { useHead, useSeoMeta } from '@unhead/vue'
  import { getCurrentInstance } from 'vue'
  import ShowcaseProject from '@/components/ShowcaseProject.vue'

  const { appContext } = getCurrentInstance()

  useHead({
    title: `Showcase - ${appContext.config.globalProperties.$title}`,
  })

  useSeoMeta({
    title: `Showcase - ${appContext.config.globalProperties.$title}`,
    description: appContext.config.globalProperties.$description,
    ogTitle: `Showcase - ${appContext.config.globalProperties.$title}`,
    ogDescription: appContext.config.globalProperties.$description,
  })

  const projects = [
    {
      title: 'OpenTS2',
      description: 'An open source rewrite of The Sims 2 in Unity. Requires a legal copy of The Sims 2 to load its assets.',
      link: 'https://github.com/LazyDuchess/OpenTS2',
      category: 'unity',
      thumbnail: 'showcase/opents2.png',
    },
    {
      title: 'All City Network',
      description: 'An MMO-like Multiplayer mod for Bomb Rush Cyberfunk, developed using Unity and the LiteNetLib networking library.',
      link: 'https://github.com/LazyDuchess/BombRushMP',
      category: 'unity',
      thumbnail: 'showcase/acnthumb.png',
    },
    {
      title: 'Thieving Hexe',
      description: 'A small Roguelite Game Jam project. Created in 12 days for the Itch.io Black and White Jam #8.',
      link: 'https://lazyduchess.itch.io/thieving-hexe',
      category: 'unity',
      thumbnail: 'showcase/hexe.png',
    },
    {
      title: 'Takeover TD',
      description: 'A tiny Tower Defense game made in about 2 days for the Itch.io Mini Jam 208 and as a personal project to learn the engine.',
      link: 'https://lazyduchess.itch.io/takeover-td',
      category: 'godot',
      thumbnail: 'showcase/takeovertd.png',
    },
    {
      title: 'Texel Game Engine',
      description: 'A simple 3D Game Engine developed for the Wii in C++ as a fun experiment.',
      link: 'https://github.com/LazyDuchess/texel',
      category: 'software',
      thumbnail: 'showcase/github.svg',
    },
    {
      title: 'TS2 Extender',
      description: 'A patch for The Sims 2 Legacy Collection that fixes several longstanding issues and overhauls its Lua scripting engine. DLL Hook written in C++ and x86 assembly.',
      link: 'https://github.com/LazyDuchess/TS2-Extender',
      category: 'mod',
      thumbnail: 'showcase/sims2.png',
    },
    {
      title: 'Off The Record Patch',
      description: 'A patch for Dead Rising 2: Off The Record that fixes a lot of issues with its PC port - such as stability, bugs, framerate issues and fixes native controller support. DLL Hook written in C++ and x86 assembly.',
      link: 'https://github.com/LazyDuchess/OffTheRecordPatch',
      category: 'mod',
      thumbnail: 'showcase/otr.png',
    },
  ]
</script>
