<template>
  {{ num }}
  <button v-on:click="getNum">Get Num</button>
  <div id="modals"></div>

  <Hand></Hand>

  <GameCard id="mainCard0" :prioritizeMini="true"> </GameCard>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Ref, ref } from "vue";
// from: https://stackoverflow.com/a/69367607
// import { computed } from "@vue/reactivity";
import { watch } from "vue";
import { Gamedata } from "bga_src/client/type/gamedata.d";
import {
  BgaRequest,
  BgaNotification,
} from "bga_src/client/type/bga-interface.d";
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
      cardDef: {
        mainCard: {
          image: require("@/assets/cardset.png"),
          size: { width: "276px", height: "390px" },
          textDef: {
            offsetY: "50%",
            padding: "24px",
          },
          texts: [
            "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. Here we put some long long long text to see how the overwrap things are working. i.e. it should show SCROLLer automatically.",
          ],
          miniDef: {
            image: require("@/assets/cardset-mini.png"),
            size: { width: "138px", height: "120px" },
          },
        },
      },
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

  // public showModal(args: any) {
  //   console.log("args", args);
  // }

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
