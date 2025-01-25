<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/teams">Teams</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: row;

  nav {
    margin-left: 15%;
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
}
</style>
