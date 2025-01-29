<script setup lang="ts">
type Team = {
  id: number
  franchiseId: number
  fullName: string
  leagueId: number
  rawTricode: string
  tricode: string
}

type Response = {
  data: Team[]
  total: number
}

const fetchTeams = async () => {
  try {
    const response = await fetch('/api/teams')
    const { data } = (await response.json()) as Response

    return data
      .filter((entry: Team) => entry.franchiseId != null)
      .sort((prev, next) => (prev.fullName > next.fullName ? 0 : -1))
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error })
  }
}

const teams = await fetchTeams()
const teamsByLetter = (teams ?? []).reduce<Record<string, Team[]>>((acc, team) => {
  const startingLetter = team.fullName[0]

  if (acc[startingLetter] == null) {
    acc[startingLetter] = [team]
  } else {
    acc[startingLetter].push(team)
  }

  return acc
}, {})
</script>

<template>
  <h1>Teams</h1>
  <div class="columns">
    <section v-for="letter in Object.keys(teamsByLetter)" :key="letter" :aria-labelledby="letter">
      <ul>
        <h2 :id="letter">{{ letter }}</h2>
        <li v-for="team in teamsByLetter[letter]" :key="team.id">{{ team.fullName }}</li>
      </ul>
    </section>
  </div>
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
