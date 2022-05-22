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
          v-for="(gridCell, idy) in gridRow"
          :key="gridCell"
          class="grid-cell"
          :class="{
            selectable: isSelectable(idx, idy),
            selected: isSelected(idx, idy),
          }"
          v-bind:style="{
            width: size.width,
            height: size.height,
            borderRadius: size.radius,
            margin: margin,
          }"
          @click="selectGrid(idx, idy)"
        >
          <template
            v-if="cardIDs && cardIDs[idy] && cardIDs[idy][idx] !== undefined"
          >
            <GameCard :id="cardIDs[idy][idx]" :prioritizeMini="true"></GameCard>
          </template>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { SizeDef, MarginDef, GridDef } from "../type/GridDef.d";
import { CardDef } from "../type/CardDef.d";
import GameCard from "./GameCard.vue";

@Options({
  components: {
    GameCard,
  },
  props: {
    type: String,
    cardIDs: Array,
    selectable: Array,
    selected: Array,
    exclusiveSelect: Boolean,
    active: Boolean,
  },
  inject: ["gridDef", "cardDef"],
  emits: ["selectGrid"],
})
export default class Grid extends Vue {
  public gridDef!: { [cardType: string]: GridDef };
  public grid!: number[][];
  public type!: string; // card type
  public size!: SizeDef;
  public margin!: string;
  public cardIDs!: string[][];
  public selectable!: boolean[][];
  public selected!: boolean[][];
  public exclusiveSelect = true;
  public active!: boolean;
  public cardDef!: { [cardType: string]: CardDef };

  public created() {
    const def = this.gridDef[this.type];
    if (typeof def.layout === "string") {
      this.grid = this.parseLayoutStr(def.layout);
    } else {
      this.grid = def.layout;
    }
    this.size = def.size;
    this.margin = this.formatMargin(def.margin);
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

  public isSelectable(x: number, y: number): boolean {
    if (!this.active) {
      return false;
    }
    return this.selectable && this.selectable[y] && this.selectable[y][x]
      ? true
      : false;
  }

  public isSelected(x: number, y: number): boolean {
    if (!this.active) {
      return false;
    }
    return this.selected && this.selected[y] && this.selected[y][x]
      ? true
      : false;
  }

  public selectExcept(x: number, y: number): void {
    this.selected.forEach((s, iy) => {
      if (!s) {
        return;
      }
      s.forEach((t, ix) => {
        if (y === iy && x === ix) {
          return;
        }
        this.selected[iy][ix] = false;
      });
    });
  }

  public selectGrid(x: number, y: number): void {
    if (!this.isSelectable(x, y)) {
      return;
    }

    if (this.selected[y] === void 0) {
      this.selected[y] = [];
    }

    this.selected[y][x] = !this.selected[y][x];
    if (this.selected[y][x]) {
      if (this.exclusiveSelect) {
        this.selectExcept(x, y);
      }
      this.$emit("selectGrid", { x, y });
    }
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
ul.grid {
  transform: scale(0.6);
  margin: -120px 0;
}
.selectable {
  border: 2px solid #05fdff;
  box-shadow: 0 0 5px 2px #05fdff;
}
.selected {
  border: 2px solid #fefb05;
  box-shadow: 0 0 5px 2px #fefb05;
}
</style>
