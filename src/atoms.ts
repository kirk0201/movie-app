import { atom } from "recoil";

export const popularIndexState = atom<number>({
  key: "popularindex",
  default: 0,
});
export const nowPlayingIndexState = atom<number>({
  key: "nowplayingindex",
  default: 0,
});
export const motionLeave = atom<boolean>({
  key: "motionleave",
  default: false,
});

export const slideDirectionBack = atom<boolean>({
  key: "slideback",
  default: false,
});
