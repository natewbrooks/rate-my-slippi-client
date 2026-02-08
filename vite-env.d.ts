/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg?react" {
  import type { FunctionComponent, SVGProps } from "react";
  export const Component: FunctionComponent<SVGProps<SVGSVGElement>>;
}
