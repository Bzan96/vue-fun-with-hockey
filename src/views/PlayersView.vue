<script setup lang="ts">
import HockeyPlayers from '../components/HockeyPlayers.vue'
</script>

<template>
  <Suspense>
    <HockeyPlayers />

    <template #fallback> Loading... </template>
  </Suspense>
</template>
