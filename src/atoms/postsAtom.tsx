import { atom, useAtom } from "jotai";
import { IPhoto } from "../shared/IPhoto";

export const postsAtom = atom<IPhoto[]>([]);

export const queryAtom = atom<string>("");

export const themeAtom = atom<string>("light");
