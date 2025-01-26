<script setup lang="ts">
import PlayersInSpotlight from '../components/PlayerSpotlight.vue'
</script>

<template>
  <h1>Welcome to the world of hockey statistics</h1>
  <blockquote>"There are lies, greater lies and then there are <em>statistics</em>"</blockquote>

  <Suspense>
    <PlayersInSpotlight />
  </Suspense>
</template>
