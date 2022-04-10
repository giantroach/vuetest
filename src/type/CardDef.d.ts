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

interface CardDetail {
  text: string;
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
