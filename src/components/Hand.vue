<template>
  <ul class="hand">
    <li v-for="cid in cardIDs" :key="cid">
      <GameCard
        :id="cid"
        :prioritizeMini="true"
        :selectable="isCardSelectable(cid)"
        @selectCard="selectCard"
        ref="cardRef"
      >
      </GameCard>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CardDef } from "../type/CardDef.d";
import GameCard from "./GameCard.vue";

@Options({
  components: {
    GameCard,
  },
  props: {
    cardIDs: Array,
    exclusiveSelect: Boolean,
    active: Boolean,
  },
  inject: ["cardDef"],
})
export default class Hand extends Vue {
  public cardIDs!: number[];
  public cardDef!: { [cardType: string]: CardDef };
  public exclusiveSelect = true;
  public active!: boolean;

  public isCardSelectable(cid: string): boolean {
    const ids = /(.+)(\d+)/.exec(cid);
    if (!ids) {
      return false;
    }
    const cat = ids[1];
    const idx = Number(ids[2]);
    const details = this.cardDef[cat]?.details?.[idx];
    if (!details?.conditions?.handSelectable) {
      return false;
    }
    // FIXME: add args
    return details.conditions.handSelectable();
  }

  public selectCard(cid: string) {
    if (!this.exclusiveSelect) {
      return;
    }
    console.log("this.$refs", this.$refs);
    // deselect all the other
    (this.$refs.cardRef as GameCard[]).forEach((cr: GameCard) => {
      if (cr.id === cid) {
        return;
      }
      cr.unselectCard();
    });
  }
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
