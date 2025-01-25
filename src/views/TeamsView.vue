<script setup lang="ts">
import HockeyTeams from '../components/HockeyTeams.vue'
</script>

<template>
  <Suspense>
    <HockeyTeams />

    <template #fallback> Loading... </template>
  </Suspense>
</template>
