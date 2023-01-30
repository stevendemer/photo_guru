import { atom, useAtom } from "jotai";
import { IPhoto } from "../shared/IPhoto";
import { ITopic } from "../shared/ITopic";

export const postsAtom = atom<IPhoto[]>([]);

export const queryAtom = atom<string>("");

export const themeAtom = atom<string>("light");

export const topicsAtom = atom<string | undefined>(undefined);
