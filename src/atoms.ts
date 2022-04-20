import { atom } from "recoil";

export const sliderIndexState = atom<number>({
  key: "sliderindex",
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
