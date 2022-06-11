interface GridData {
  cardIDs?: Array<Array<string | undefined>>;
  selectable?: boolean[][];
  selected?: boolean[][];
  targetable?: boolean[][];
  targeted?: boolean[][];
  exclusiveSelect?: boolean;
  active?: boolean;
}

export { GridData };
