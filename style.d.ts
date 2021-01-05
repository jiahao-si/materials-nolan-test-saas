
export type PX = number;
export type Percent = number;
export type Color = string;
export type URL = string;


export interface CommonStyle {
  size?: SizeStyle | boolean;
  transform?: TransformStyle | boolean;
  text?: TextStyle | boolean;
  border?: BorderStyle | boolean;
  background?: BackgroundStyle | boolean;
  zIndex?: number | boolean;
  margin?: DistanceStyle | boolean;
  padding?: DistanceStyle | boolean;
  position?: DistanceStyle | boolean;
}

export interface SizeStyle {
  autoWidth: boolean;
  width: PX;
  autoHeight: boolean;
  height: PX;
}

export interface TransformStyle {
  rotate: number;
  opacity: number;
  scale: number;
  radius: PX;
}

export interface TextStyle {
  color: Color;
  fontSize: PX;
  lineHeight: PX;
  textAlign: 'left' | 'center' | 'right';
  weight: 'lighter' | 'bolder' | 'normal';
}

export interface BorderStyle {
  type: 'none' | 'solid' | 'dashed';
  color: Color;
  width: PX;
}

export interface BackgroundStyle {
  color: Color;
  image: URL;
}

export interface DistanceStyle {
  top: PX;
  right: PX;
  bottom: PX;
  left: PX;
}

export interface LayoutStyle {
  zIndex?: number;
  position: 'static' | DistanceStyle;
  margin?: DistanceStyle;
  padding?: DistanceStyle;
}
