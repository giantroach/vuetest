import { CardDef } from "../type/CardDef.d";

const always = function (): boolean {
  return true;
};
const noway = function (): boolean {
  return false;
};

export const cardDefs: { [cardType: string]: CardDef } = {
  mainCard: {
    image: require("@/assets/cardset.png"),
    sprite: "8x2",
    size: { width: "276px", height: "390px", radius: "20px" },
    textDef: {
      offsetY: "50%",
      padding: "24px",
    },
    details: {
      0: {
        text: "0:The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. Here we put some long long long text to see how the overwrap things are working. i.e. it should show SCROLLer automatically.",
        conditions: {
          handSelectable: always,
          targetAfterPlay: noway,
          gridSelectable: noway,
        },
      },
      1: {
        text: "1:The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. Here we put some long long long text to see how the overwrap things are working. i.e. it should show SCROLLer automatically.",
        conditions: {
          handSelectable: always,
          targetAfterPlay: noway,
          gridSelectable: noway,
        },
      },
      2: {
        text: "2:The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. Here we put some long long long text to see how the overwrap things are working. i.e. it should show SCROLLer automatically.",
      },
    },
    miniDef: {
      image: require("@/assets/cardset-mini.png"),
      sprite: "8x3",
      size: { width: "138px", height: "120px", radius: "10px" },
    },
  },
  centerCard: {
    image: require("@/assets/centerset.png"),
    sprite: "6x3",
    size: { width: "138px", height: "120px", radius: "10px" },
  },
};
