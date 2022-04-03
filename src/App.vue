<template>
  {{ num }}
  <button v-on:click="getNum">Get Num</button>
  <div id="modals"></div>

  <Hand :cardIDs="['mainCard0', 'mainCard1', 'mainCard2']"></Hand>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Ref } from "vue";
// from: https://stackoverflow.com/a/69367607
// import { computed } from "@vue/reactivity";
import { watch } from "vue";
import { Gamedata } from "bga_src/client/type/gamedata.d";
import {
  BgaRequest,
  BgaNotification,
} from "bga_src/client/type/bga-interface.d";
import { cardDefs } from "./def/card";
import GameCard from "./components/GameCard.vue";
import Hand from "./components/Hand.vue";

@Options({
  components: {
    GameCard,
    Hand,
  },
  provide: () => {
    return {
      // provided through main.ts
      // urlBase: ref(""),
      cardDef: cardDefs,
    };
  },
  inject: ["urlBase"],
})
export default class App extends Vue {
  public bgaRequest: BgaRequest | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public bgaRequestPromise: Promise<any> = Promise.resolve();
  public bgaNotifications: BgaNotification[] = [];
  public num = 0;
  public urlBase!: Ref<string>;

  public gamedata: Gamedata = {
    current_player_id: "",
    decision: { decision_type: "" },
    game_result_neutralized: "",
    gamestate: null,
    gamestates: {},
    neutralized_player_id: "",
    notifications: { last_packet_id: "", move_nbr: "" },
    playerorder: [],
    players: {},
    tablespeed: "",
  };

  mounted() {
    this.initBgaNotification();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public request(name: string, args: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.bgaRequest = {
        name: name,
        args: args,
      };
      setTimeout(() => {
        this.bgaRequestPromise
          .then((reply) => {
            resolve(reply);
          })
          .catch((e) => {
            reject(e);
          });
      });
    });
  }

  private initBgaNotification(): void {
    watch(this.bgaNotifications, (notifs: BgaNotification[]) => {
      const notif = notifs.shift();
      if (!notif) {
        return;
      }
      switch (notif.name) {
        case "getNum":
          this.num = notif.args.num;
          break;
        default:
          break;
      }
    });
  }

  public getNum(): void {
    this.request("getNum", {
      num: this.num,
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
