<template>
  <ul class="hand">
    <li v-for="cid in cardIDs" :key="cid">
      <GameCard :id="cid" :prioritizeMini="true"> </GameCard>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import GameCard from "./GameCard.vue";

@Options({
  components: {
    GameCard,
  },
  props: {
    cardIDs: Array,
  },
})
export default class Hand extends Vue {
  public cardIDs!: number[];
}
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}
ul.hand {
  display: flex;
  justify-content: center;
}
li {
  list-style-type: none;
  margin-left: -10px;
  margin-right: -10px;
}
</style>
