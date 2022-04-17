interface SizeDef {
  width: string;
  height: string;
  radius: string;
}

interface TextLayoutDef {
  offsetY: string;
  offsetX?: string;
  padding: string;
}

type Conditions = "handSelectable" | "targetAfterPlay" | "gridSelectable";

interface CardDetail {
  text: string;
  conditions?: any;
  // conditions?: {
  //   [key: Conditions]: Function;
  // };
}

interface CardDef {
  image: string;
  sprite: string;
  size: SizeDef;
  textDef?: TextLayoutDef;
  details?: {
    [id: number]: CardDetail;
  };
  miniDef?: {
    image: string;
    sprite: string;
    size: SizeDef;
  };
}

export { SizeDef, TextLayoutDef, CardDetail, CardDef };
