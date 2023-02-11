import { atom } from "jotai";

export const themeAtom = atom<string>("light");

themeAtom.debugLabel = "theme_atom";
