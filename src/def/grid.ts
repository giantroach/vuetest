import { GridDef } from "../type/GridDef.d";

export const gridDefs: { [cardType: string]: GridDef } = {
  table: {
    type: "square",
    layout: "3x5",
    size: { width: "138px", height: "120px", radius: "10px" },
    margin: { row: "5px", column: "10px" },
  },
};
