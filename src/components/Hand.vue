<template>
  <div>
    <div v-for="cid in cardIDs" :key="cid">
      <GameCard :id="cid" :prioritizeMini="true"> </GameCard>
    </div>
  </div>
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

<style scoped lang="scss"></style>
