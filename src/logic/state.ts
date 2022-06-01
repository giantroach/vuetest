import { GridData } from "../type/Grid.d";
import { HandData } from "../type/Hand.d";
import { watch } from "vue";

type CurrentState =
  | "init"
  | "playerTurn:init"
  | "playerTurn:beforeCardSelect"
  | "playerTurn:afterCardSelect"
  | "playerTurn:beforeGridSelect"
  | "playerTurn:afterGridSelect"
  | "playerTurn:beforeTargetSelect"
  | "playerTurn:afterTargetSelect"
  | "otherPlayerTurn";

export class State {
  constructor(private gridData: GridData, private handData: HandData) {
    console.log("this.gridData", this.gridData);
    watch(this.gridData, () => {
      // FIXME: this may cause infinite loop
      this.refresh();
    });

    watch(this.handData, () => {
      // FIXME: this may cause infinite loop
      this.refresh();
    });
  }

  public current: CurrentState = "init";

  public refresh() {
    switch (this.current) {
      case "playerTurn:init":
        this.assign(this.handData, "active", true);
        this.current = "playerTurn:beforeCardSelect";
        break;

      case "playerTurn:beforeCardSelect":
        if (this.handData.selected?.includes(true)) {
          this.current = "playerTurn:afterCardSelect";
          this.refresh();
        }
        break;

      case "playerTurn:afterCardSelect":
        this.current = "playerTurn:beforeGridSelect";
        this.refresh();
        break;

      case "playerTurn:beforeGridSelect":
        if (!this.handData.selected?.includes(true)) {
          this.current = "playerTurn:beforeCardSelect";
          this.assign(this.gridData, "active", false);
          this.assign(this.gridData, "selected", []);
          break;
        }
        this.assign(this.gridData, "active", true);
        break;
    }

    console.log("debug", this.current, this.gridData, this.handData);
  }

  // avoid unnecessary update
  private assign(obj: any, key: string, val: any): void {
    if (obj[key] !== val) {
      obj[key] = val;
    }
  }
}
