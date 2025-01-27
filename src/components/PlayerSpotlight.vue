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

    return data
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error })
  }
}

const playersInSpotlight = await fetchPlayersInSpotlight()
</script>

<template v-if="playersInSpotlight != null">
  <h2>Spotlight</h2>
  <ul>
    <li v-for="player in playersInSpotlight" :key="player.playerId">
      <a :href="`/player/${player.playerId}`">
        <img :src="player.teamLogo" :alt="player.teamTriCode" class="team-logo" />
        <figure>
          <img :src="player.headshot" :alt="player.name.default" />
          <figcaption>{{ player.name.default }}</figcaption>
        </figure>
      </a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
h2 {
  margin: 30px auto;
  color: var(--secondary);
}

ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 0;

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

    @media (min-width: 769px) {
      width: 45%;
    }
    @media (min-width: 1440px) {
      width: 30%;
    }
  }

  figure {
    max-width: fit-content;
    text-align: center;

    img {
      border-radius: 999px;
      box-shadow: 0 0 8px 8px #ededed;
      background-color: #ededed;
      max-width: calc(100% - 32px);
      cursor: pointer;

      &:hover {
        mix-blend-mode: difference;
        background-color: transparent;
      }
    }

    figcaption {
      text-align: center;
    }
  }
}
</style>
