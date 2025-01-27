<script setup lang="ts">
import HockeyPlayer from '../components/HockeyPlayer.vue'
</script>

<template>
  <Suspense>
    <HockeyPlayer />

    <template #fallback> Loading... </template>
  </Suspense>
</template>
