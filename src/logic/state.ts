import { GridData } from "../type/Grid.d";
import { watch } from "vue";

export class State {
  constructor(private gridData: GridData) {
    console.log("this.gridData", this.gridData);
    watch(this.gridData, () => {
      this.next();
    });
  }

  public current = "init";

  public next(state = "") {
    console.log("this.gridData", this.gridData);
  }
}
