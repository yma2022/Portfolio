/** Public assets must include the prefix used by the static export. */
export const assetPath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
