<template>
  <div class="container">
    <template v-if="!prioritizeMini">
      <div
        class="card"
        v-bind:style="{
          width: size.width,
          height: size.height,
          backgroundImage: 'url(' + urlBase.value + image + ')',
        }"
      >
        <div v-if="text" class="container-text">
          <div
            class="text"
            v-if="text"
            v-bind:style="{
              top: textDef.offsetY,
              borderWidth: textDef.padding || 0,
            }"
          >
            {{ text }}
          </div>
        </div>
      </div>
    </template>

    <template v-if="miniDef && prioritizeMini">
      <div
        class="card card-mini"
        v-bind:style="{
          width: miniDef.size.width,
          height: miniDef.size.height,
          backgroundImage: 'url(' + urlBase.value + miniDef.image + ')',
        }"
        @click="showDetails"
        v-on:mouseover="showDetails"
      ></div>
    </template>
  </div>

  <teleport to="#modals" v-if="modal">
    <div
      class="card card-modal"
      v-bind:style="{
        width: size.width,
        height: size.height,
        top: modalTop + 'px',
        left: modalLeft + 'px',
        backgroundImage: 'url(' + urlBase.value + image + ')',
      }"
    >
      <div v-if="text" class="container-text">
        <div
          class="text"
          v-if="text"
          v-bind:style="{
            top: textDef.offsetY,
            borderWidth: textDef.padding || 0,
          }"
        >
          {{ text }}
        </div>
      </div>
    </div>

    <Modal @hide-modal="hideDetails" :backdrop="false"></Modal>
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Ref } from "vue";
import Modal from "./Modal.vue";

export interface Size {
  // xRatio: number;
  // yRatio: number;
  width: string;
  height: string;
}

@Options({
  components: {
    Modal,
  },
  props: {
    id: String,
    prioritizeMini: Boolean,
  },
  inject: ["urlBase", "cardDef"],
})
export default class GameCard extends Vue {
  public name!: string;
  public image!: string;
  public size!: {
    width: number;
    height: number;
  };
  public textDef!: {
    offsetY: number;
    padding: number;
  };
  public text!: string;
  public prioritizeMini!: boolean;
  public miniDef!: {
    image: string;
    size: {
      width: number;
      height: number;
    };
  };

  public modal = false;
  public modalTop = 0;
  public modalLeft = 0;

  public id!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public cardDef!: any;
  public urlBase!: Ref<string>;

  public created() {
    this.cardDef;
    const ids = /(.+)(\d+)/.exec(this.id);
    if (!ids) {
      return;
    }
    const cat = ids[1];
    const idx = Number(ids[2]);
    const def = this.cardDef[cat];
    this.text = def.texts[idx];
    this.image = def.image;
    this.size = def.size;
    this.textDef = def.textDef;
    this.miniDef = def.miniDef;
  }

  public showDetails(evt: MouseEvent) {
    console.log("evt", evt);

    const elm = evt.srcElement as HTMLElement;
    const rect = elm.getBoundingClientRect();

    // find center coordinate
    const centerY = rect.top + rect.height / 2;
    const centerX = rect.left + rect.width / 2;
    this.modal = true;

    setTimeout(() => {
      // wait for render
      const mcElm = document.querySelector(".card-modal");
      if (!mcElm) {
        return;
      }
      const mcRect = mcElm.getBoundingClientRect();
      const mcTop = centerY - mcRect.height / 2;
      const mcLeft = centerX - mcRect.width / 2;
      this.modalTop = mcTop > 0 ? mcTop : 0;
      this.modalLeft = mcLeft > 0 ? mcTop : 0;
    });
    // this.$emit("showModal", { aaa: "bbb" });
  }

  public hideDetails() {
    this.modal = false;
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
}
.card {
  position: relative;
}
.card-modal {
  position: absolute;
  z-index: 2;
}
.container-text,
.text {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0px solid transparent;
  overflow-y: auto;
  text-align: left;
}
.title {
  position: absolute;
}
</style>
