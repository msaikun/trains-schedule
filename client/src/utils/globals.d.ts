/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
