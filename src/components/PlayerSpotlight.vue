<script setup lang="ts">
type Spotlight = {
  playerId: number
  name: {
    default: string
    [key: string]: string
  }
  playerSlug: string
  position: string
  sweaterNumber: number
  teamId: number
  headshot: string
  teamTriCode: string
  teamLogo: string
  sortId: number
}

const fetchPlayersInSpotlight = async () => {
  try {
    const response = await fetch('/api/player-spotlight')
    const data = (await response.json()) as Spotlight[]
    console.log(response, data)

    return data
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error })
  }
}

const playersInSpotlight = await fetchPlayersInSpotlight()
</script>

<template v-if="playersInSpotlight != null">
  <h2>Spotlight</h2>
  <ul v-for="player in playersInSpotlight" :key="player.playerId">
    <li>
      <img :src="player.teamLogo" :alt="player.teamTriCode" class="team-logo" />
      <figure>
        <img :src="player.headshot" :alt="player.name.default" />
        <figcaption>{{ player.name.default }}</figcaption>
      </figure>
    </li>
  </ul>
</template>

<style scoped lang="scss">
h2 {
  margin: 30px auto;
}

ul {
  list-style: none;

  li {
    position: relative;
    width: fit-content;

    img.team-logo {
      position: absolute;
      top: 45%;
      left: 20px;
      transform: translateY(-50%);
      max-width: 60px;
    }
  }

  figure {
    max-width: fit-content;

    img {
      border-radius: 999px;
      box-shadow: 0 0 8px 8px #ededed;
    }

    figcaption {
      text-align: center;
    }
  }
}
</style>
