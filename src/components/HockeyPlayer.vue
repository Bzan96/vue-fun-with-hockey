<script setup lang="ts">
import { useRoute } from 'vue-router'

type Player = {
  id: number
  firstName: {
    default: string
  }
  lastName: {
    default: string
  }
  currentTeamId: number | null
  position: string
  sweaterNumber: number | null
}

const fetchPlayer = async () => {
  const { path } = useRoute()

  try {
    const probablePlayerId = path.substring(path.length - 7)

    if (!isNaN(parseInt(probablePlayerId, 10))) {
      const response = await fetch(`/api/player?player_id=${probablePlayerId}`)
      const data = (await response.json()) as Player

      return data
    }
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error })
  }
}

const player = await fetchPlayer()
</script>

<template v-if="player != null">
  <h1>{{ player?.firstName.default }} {{ player?.lastName.default }}</h1>
  <div>{{ player }}</div>
  <!-- <div class="columns">
    <section v-for="letter in Object.keys(teamsByLetter)" :key="letter" :aria-labelledby="letter">
      <ul>
        <h2 :id="letter">{{ letter }}</h2>
        <li v-for="team in teamsByLetter[letter]" :key="team.id">{{ team.fullName }}</li>
      </ul>
    </section>
  </div> -->
</template>

<style scoped>
h1 {
  margin-bottom: 30px;
  font-size: 40px;
}

h2 {
  color: var(--secondary);
}

div.columns {
  columns: 1;

  @media (min-width: 501px) {
    columns: 2;
  }
  @media (min-width: 769px) {
    columns: 3;
  }
  @media (min-width: 1920px) {
    columns: 4;
  }
}

section {
  margin-bottom: 20px;
}

ul {
  padding: 0;
  list-style: none;
}
</style>
