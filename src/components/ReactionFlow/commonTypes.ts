export type ManifestT = {
  id: number,
  region: RegionT,
  emojis: EmojisT
};

export type RegionT = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type EmojisT = {
  like?: number,
  angry?: number,
  happy?: number
};