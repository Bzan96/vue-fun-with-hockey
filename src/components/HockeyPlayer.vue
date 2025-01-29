<script setup lang="ts">
import { useRoute } from 'vue-router';

type TeamRosterPlayer = {
  playerId: number;
  lastName: Record<string, string>;
  firstName: Record<string, string>;
  playerSlug: string;
};

type Badge = {
  logoUrl: Record<string, string>;
  title: Record<string, string>;
};

type AwardSeason = {
  assists: number;
  blockedShots: number;
  gameTypeId: number;
  gamesPlayed: number;
  goals: number;
  hits: number;
  pim: number;
  plusMinus: number;
  points: number;
  seasonId: number;
};

type Award = {
  trophy: Record<string, string>;
  seasons: AwardSeason[];
};

type Last5GamesStats = {
  assists: number;
  gameDate: string;
  gameId: number;
  gameTypeId: number;
  goals: number;
  homeRoadFlag: string;
  opponentAbbrev: string;
  pim: number;
  plusMinus: number;
  points: number;
  powerPlayGoals: number;
  shifts: number;
  shorthandedGoals: number;
  shots: number;
  teamAbbrev: string;
  toi: string;
};

type SeasonStats = {
  assists: number;
  faceoffWinningPctg: number;
  gameTypeId: number;
  gamesPlayed: number;
  goals: number;
  leagueAbbrev: string;
  pim: number;
  plusMinus: number;
  points: number;
  season: number;
  sequence: number;
  teamName: Record<string, string>;
};

interface Player {
  isActive: boolean;
  currentTeamAbbrev: string;
  fullTeamName: Record<string, string>;
  teamCommonName: Record<string, string>;
  playerId: number;
  firstName: Record<string, string>;
  lastName: Record<string, string>;
  currentTeamId: number | null;
  position: string;
  sweaterNumber: number | null;
  currentTeamRoster: TeamRosterPlayer[];
  teamPlaceNameWithPreposition: Record<string, string>;
  headshot: string;
  heroImage: string;
  heightInInches: number;
  heightInCentimeters: number;
  weightInPounds: number;
  weightInKilograms: number;
  birthCity: Record<string, string>;
  birthStateProvince: Record<string, string>;
  birthDate: string;
  birthCountry: string;
  shootsCatches: string;
  playerSlug: string;
  badges: Badge[];
  inTop100AllTime: number;
  inHHOF: number;
  draftDetails: {
    year: number;
    teamAbbrev: string;
    round: number;
    pickInRound: number;
    overallPick: number;
  };
  awards: Award[];
  featuredStats: {
    season: number;
    regularSeason: {
      subSeason: SeasonStats;
      career: SeasonStats;
    };
  };
  careerTotals: {
    regularSeason: SeasonStats;
    playoffs: SeasonStats;
  };
  last5Games: Last5GamesStats[];
  seasonTotals: SeasonStats[];
}

const fetchPlayer = async () => {
  const { path } = useRoute();

  try {
    const probablePlayerId = path.substring(path.length - 7);

    if (!isNaN(parseInt(probablePlayerId, 10))) {
      const response = await fetch(`/api/player?player_id=${probablePlayerId}`);
      const data = (await response.json()) as Player;

      return data;
    }
  } catch (error) {
    console.error('Oh no, anyway...', { cause: error });
  }
};

const player = await fetchPlayer();

const careerTotals = Object.keys(player?.careerTotals.regularSeason ?? []).reduce<
  Record<string, { regularSeason: unknown; playoffs: unknown }>
>((acc, key) => {
  acc[key] = {
    regularSeason: null,
    playoffs: null,
  };

  return acc;
}, {});

Object.entries(player?.careerTotals.regularSeason ?? []).forEach(([key, value]) => {
  careerTotals[key].regularSeason = value;
});
Object.entries(player?.careerTotals.playoffs ?? []).forEach(([key, value]) => {
  careerTotals[key].playoffs = value;
});

const prettifyKeyName = (key: string) => {
  const parts = key.split(/(?=[A-Z])/g);
  const words = parts.join(' ');

  return words.replace(words[0], words[0].toUpperCase());
};
</script>

<template v-if="player != null">
  <h1>{{ player?.firstName.default }} {{ player?.lastName.default }}</h1>
  <div>
    <table>
      <caption>
        Career Statistics
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Season</th>
          <th scope="col">Playoffs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, value] in Object.entries(careerTotals)" :key="key">
          <th scope="row">{{ prettifyKeyName(key) }}</th>
          <td>{{ value.regularSeason }}</td>
          <td>{{ value.playoffs }}</td>
        </tr>
      </tbody>
    </table>
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

table {
  background-color: var(--primary);

  caption {
    font-weight: bold;
    color: var(--primary);
  }

  th:first-child {
    text-align: left;
    padding-left: 5px;
  }

  th[scope='col'] {
    padding: 5px 20px;
  }

  tr {
    td {
      padding: 5px 20px;
    }

    &:nth-of-type(even) {
      background-color: #eee;
    }
    &:nth-of-type(odd) {
      background-color: #fff;
    }
  }
}
</style>
