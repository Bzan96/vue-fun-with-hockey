<script setup lang="ts">
type Player = {
  id: number
  firstName: string
  lastName: string
  fullName: string
  currentTeamId: number | null
  positionCode: string
  sweaterNumber: number | null
}

const fetchPlayers = async () => {
  try {
    const response = await fetch('/api/players')
    const { data } = (await response.json()) as { data: Player[] }

    return data
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error })
  }
}

const players = await fetchPlayers()
</script>

<template>
  <h1>Players</h1>
  <div>{{ players }}</div>
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
