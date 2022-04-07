<template>
  <ul class="grid">
    <li
      v-for="(gridRow, idx) in grid"
      :key="idx"
      v-bind:style="{
        width: size.width,
        borderRadius: size.radius,
        margin: margin,
      }"
    >
      <ul>
        <li
          v-for="gridCell in gridRow"
          :key="gridCell"
          class="grid-cell"
          v-bind:style="{
            width: size.width,
            height: size.height,
            borderRadius: size.radius,
            margin: margin,
          }"
        ></li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { SizeDef, MarginDef } from "../type/GridDef.d";
import GameCard from "./GameCard.vue";

@Options({
  components: {
    GameCard,
  },
  props: {
    type: String,
  },
  inject: ["gridDef"],
})
export default class Grid extends Vue {
  public gridDef!: any;
  public grid!: number[][];
  public type!: string;
  public size!: SizeDef;
  public margin!: string;

  public created() {
    const def = this.gridDef[this.type];
    if (typeof def.layout === "string") {
      this.grid = this.parseLayoutStr(def.layout);
    } else {
      this.grid = def.layout;
    }
    this.size = def.size;
    debugger;
    this.margin = this.formatMargin(def.margin);
    console.log("this.grid", this.grid);
  }

  private parseLayoutStr(layoutStr: string): number[][] {
    const match = /(\d+)x(\d+)/g.exec(layoutStr);
    if (match === null) {
      throw "invalid grid layout";
    }
    const x = Number(match[1]);
    const y = Number(match[2]);
    return new Array(x).fill(new Array(y).fill(null));
  }

  private formatMargin(margin: MarginDef): string {
    const r = /^(\d+)(.+)/;
    const rm = r.exec(margin.row) || [null, "0", ""];
    const cm = r.exec(margin.column) || [null, "0", ""];
    return `${Number(rm[1]) / 2}${rm[2]} ${Number(cm[1]) / 2}${cm[2]}`;
  }
}
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}
ul.grid {
  display: flex;
  justify-content: center;
}
li {
  list-style-type: none;
}
li.grid-cell {
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
