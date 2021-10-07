declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-native-dot-env" {
  export const BASE_URL: string;
}
