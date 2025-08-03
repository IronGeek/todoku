declare module '*.svg?url' {
  const src: string;

  export default src;
}

declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';

  export const ReactComponent: FunctionComponent<SVGProps<
    SVGSVGElement
  > & { title?: string }>;

  const src: string;

  export default src;
}
