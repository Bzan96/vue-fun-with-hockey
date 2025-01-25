<script setup lang="ts">
import HockeyTeams from '../components/HockeyTeams.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>

  <Suspense>
    <HockeyTeams />

    <template #fallback> Loading... </template>
  </Suspense>
</template>
